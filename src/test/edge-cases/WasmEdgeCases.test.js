/**
 * WASM Edge Case Tests
 *
 * Tests for edge cases that could cause panics:
 * - Empty files
 * - Moderately large files (reduced for memory efficiency)
 * - Deep nesting
 * - Invalid UTF-8
 * - Parse errors
 *
 * Uses shared WASM instance to reduce memory usage.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { getSharedWasmInstance, skipIfNoWasm as createSkipFn } from '../helpers/wasmTestHelper'

let wasmInstance
let skipIfNoWasm

beforeAll(async () => {
  wasmInstance = await getSharedWasmInstance()
  skipIfNoWasm = createSkipFn(it)
})

afterAll(() => {
  // Cleanup is handled globally by the helper
})

// Helper to generate deep nesting
function generateDeepNesting(depth) {
  let code = "package 'Deep' {\n"
  for (let i = 0; i < depth; i++) {
    code += '  '.repeat(i + 1) + `part def Level${i} {\n`
  }
  for (let i = depth - 1; i >= 0; i--) {
    code += '  '.repeat(i + 1) + '}\n'
  }
  code += '}'
  return code
}

describe('WASM Edge Cases', () => {
  const skipIfNoWasm = !wasmInstance ? it.skip : it

  const edgeCases = [
    {
      name: 'Empty file',
      code: '',
      shouldPanic: false,
    },
    {
      name: 'Single character',
      code: 'a',
      shouldPanic: false,
    },
    {
      name: 'Only whitespace',
      code: '   \n\t  \n  ',
      shouldPanic: false,
    },
    {
      name: 'Very long line',
      code: "package 'Test' { " + 'a'.repeat(10000) + ' }',
      shouldPanic: false,
    },
    {
      name: 'Deep nesting (50 levels)',
      code: generateDeepNesting(50),
      shouldPanic: false,
    },
    {
      name: 'Very deep nesting (200 levels)',
      code: generateDeepNesting(200),
      shouldPanic: false,
    },
    {
      name: 'Many parse errors',
      code: 'package invalid { part invalid attribute invalid }',
      shouldPanic: false,
    },
    {
      name: 'Unicode characters',
      code: "package 'Test' { part def Test { attribute name :> ScalarValues::String = '测试'; } }",
      shouldPanic: false,
    },
    {
      name: 'Special characters in strings',
      code: "package 'Test' { part def Test { attribute name :> ScalarValues::String = 'Hello\nWorld\tTab'; } }",
      shouldPanic: false,
    },
    {
      name: 'Moderately large file (50 parts)',
      code: "package 'Large' {\n" +
        Array(50).fill(0).map((_, i) =>
          `  part def Part${i} {\n    attribute id${i} :> ScalarValues::String;\n  }`
        ).join('\n') +
        '\n}',
      shouldPanic: false,
    },
  ]

  edgeCases.forEach(({ name, code, shouldPanic }) => {
    skipIfNoWasm(`should handle ${name} without panics`, async () => {
      try {
        const result = await wasmInstance.generate_cst(code, `test://${name.replace(/\s+/g, '-')}`)
        
        // Should not panic - either succeed or return error
        expect(result).toBeDefined()
        
        // If successful, verify structure
        if (result.root) {
          expect(result.root).toBeDefined()
          expect(() => JSON.parse(JSON.stringify(result))).not.toThrow()
        }
      } catch (err) {
        // Expected error, not panic
        expect(err).toBeInstanceOf(Error)
        expect(err.message).not.toContain('unreachable')
        
        if (!shouldPanic) {
          // Should be a proper error message, not a panic
          expect(err.message).toMatch(/error|empty|invalid/i)
        }
      }
    })
  })

  describe('Array Bounds Edge Cases', () => {
    skipIfNoWasm('should handle code with many attributes without bounds errors', async () => {
      // Reduced from 100 to 20 to save memory
      const attributes = Array(20).fill(0).map((_, i) =>
        `        attribute attr${i} :> ScalarValues::String;`
      ).join('\n')

      const code = `package 'ManyAttributes' {
    part def Test {
${attributes}
    }
}`

      const result = await wasmInstance.generate_cst(code, 'test://many-attributes')

      expect(result).toBeDefined()
      expect(result.root).toBeDefined()
    })

    skipIfNoWasm('should handle code with many nested parts without bounds errors', async () => {
      // Reduced from 50 to 15 to save memory
      const parts = Array(15).fill(0).map((_, i) =>
        `    part def Part${i} {\n        attribute id :> ScalarValues::String;\n    }`
      ).join('\n')

      const code = `package 'ManyParts' {\n${parts}\n}`

      const result = await wasmInstance.generate_cst(code, 'test://many-parts')
      
      expect(result).toBeDefined()
      expect(result.root).toBeDefined()
    })
  })

  describe('Line Index Edge Cases', () => {
    skipIfNoWasm('should handle single line code', async () => {
      const code = "package 'Test' { part def Test {} }"
      
      const result = await wasmInstance.generate_cst(code, 'test://single-line')
      
      expect(result).toBeDefined()
      expect(result.root).toBeDefined()
    })

    skipIfNoWasm('should handle code with only newlines', async () => {
      const code = '\n\n\n'
      
      try {
        const result = await wasmInstance.generate_cst(code, 'test://newlines')
        expect(result).toBeDefined()
      } catch (err) {
        expect(err.message).not.toContain('unreachable')
      }
    })

    skipIfNoWasm('should handle code with very long lines', async () => {
      const longLine = 'a'.repeat(10000)
      const code = `package 'Test' {\n    part def Test {\n        attribute name :> ScalarValues::String = '${longLine}';\n    }\n}`
      
      const result = await wasmInstance.generate_cst(code, 'test://long-lines')
      
      expect(result).toBeDefined()
    })
  })

  describe('Recursion Depth Edge Cases', () => {
    skipIfNoWasm('should handle deep recursion without stack overflow', async () => {
      const deepCode = generateDeepNesting(100)
      
      const result = await wasmInstance.generate_cst(deepCode, 'test://deep-recursion')
      
      expect(result).toBeDefined()
      expect(result.root).toBeDefined()
    })

    skipIfNoWasm('should handle very deep recursion (500 levels)', async () => {
      const veryDeepCode = generateDeepNesting(500)
      
      try {
        const result = await wasmInstance.generate_cst(veryDeepCode, 'test://very-deep')
        expect(result).toBeDefined()
      } catch (err) {
        // May hit recursion limit, but should not panic
        expect(err.message).not.toContain('unreachable')
        expect(err.message).toMatch(/depth|recursion|limit/i)
      }
    })
  })
})
