/**
 * Real WASM Integration Tests
 *
 * These tests make actual WASM calls to detect real issues like panics,
 * array bounds errors, and other runtime problems that mocks cannot catch.
 *
 * Uses shared WASM instance to reduce memory usage.
 */

import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { getSharedWasmInstance, cleanupWasm } from '../helpers/wasmTestHelper'

let wasmInstance

beforeAll(async () => {
  wasmInstance = await getSharedWasmInstance()
})

afterAll(() => {
  // Cleanup is handled globally by the helper
})

describe('Real WASM Integration Tests', () => {

  describe('CST Generation', () => {
    it('should generate CST without panics for valid code', async () => {
      const code = "package 'Test' { part def Test {} }"
      
      const result = await wasmInstance.generate_cst(code, 'test://file')
      
      expect(result).toBeDefined()
      expect(result.root).toBeDefined()
      expect(result.file_uri).toBe('test://file')
      
      // Should not throw when serializing
      expect(() => JSON.parse(JSON.stringify(result))).not.toThrow()
    })

    it('should handle empty code without panics', async () => {
      // Should return an error, not panic
      try {
        const result = await wasmInstance.generate_cst('', 'test://file')
        // If it doesn't throw, result should indicate error
        expect(result).toBeDefined()
      } catch (err) {
        // Expected: should throw an error, not panic
        expect(err).toBeInstanceOf(Error)
        expect(err.message).not.toContain('unreachable')
        expect(err.message).toMatch(/empty|error/i)
      }
    })

    it('should handle Vehicle System example without panics', async () => {
      const code = `package 'Vehicle System' {
    doc /*
     * A simple vehicle system example demonstrating
     * SysML v2 structural modeling.
     */
    
    part def Vehicle {
        attribute speed :> ScalarValues::Real;
        attribute mass :> ScalarValues::Real = 1000.0;
        
        part engine : Engine;
        part wheels : Wheel[4];
    }
    
    part def Engine {
        attribute power :> ScalarValues::Real = 150.0;
    }
    
    part def Wheel {
        attribute diameter :> ScalarValues::Real = 0.5;
    }
}`
      
      // This was the code that caused the panic - should work now
      const result = await wasmInstance.generate_cst(code, 'editor://current')
      
      expect(result).toBeDefined()
      expect(result.root).toBeDefined()
      expect(result.stats).toBeDefined()
      
      // Should not throw when serializing
      expect(() => JSON.parse(JSON.stringify(result))).not.toThrow()
    })

    it('should handle moderately sized files without panics', async () => {
      // Reduced from 100 to 20 to save memory
      const parts = Array(20).fill(0).map((_, i) =>
        `    part def Part${i} {\n        attribute id :> ScalarValues::String;\n    }`
      ).join('\n')

      const largeCode = `package 'Large System' {\n${parts}\n}`

      const result = await wasmInstance.generate_cst(largeCode, 'test://large')

      expect(result).toBeDefined()
      expect(result.root).toBeDefined()
    })

    it('should handle code with parse errors gracefully', async () => {
      const code = `package 'Test' {
    part def Test {
        attribute invalid :> 
    }
}`
      
      // Should handle parse errors without panicking
      try {
        const result = await wasmInstance.generate_cst(code, 'test://file')
        // May succeed with partial CST or return error
        expect(result).toBeDefined()
      } catch (err) {
        // Expected: should throw an error, not panic
        expect(err).toBeInstanceOf(Error)
        expect(err.message).not.toContain('unreachable')
      }
    })
  })

  describe('HIR Generation', () => {
    it('should generate HIR without panics', async () => {
      const code = "package 'Test' { part def Test {} }"
      
      const result = await wasmInstance.generate_hir(code, 'test://file')
      
      expect(result).toBeDefined()
      expect(() => JSON.parse(JSON.stringify(result))).not.toThrow()
    })

    it('should handle Vehicle System example for HIR', async () => {
      const code = `package 'Vehicle System' {
    part def Vehicle {
        attribute speed :> ScalarValues::Real;
    }
}`
      
      const result = await wasmInstance.generate_hir(code, 'editor://current')
      
      expect(result).toBeDefined()
      expect(() => JSON.parse(JSON.stringify(result))).not.toThrow()
    })
  })

  describe('Analytics Generation', () => {
    it('should generate analytics without panics', async () => {
      const code = "package 'Test' { part def Test {} }"
      
      const result = await wasmInstance.generate_analytics(code, 'test://file')
      
      expect(result).toBeDefined()
      expect(() => JSON.parse(JSON.stringify(result))).not.toThrow()
    })
  })

  describe('Panic Detection', () => {
    it('should catch panics and return errors instead of crashing', async () => {
      const problematicCode = `package 'Vehicle System' {
    part def Vehicle {
        attribute speed :> ScalarValues::Real;
        attribute mass :> ScalarValues::Real = 1000.0;
        
        part engine : Engine;
        part wheels : Wheel[4];
    }
    
    part def Engine {
        attribute power :> ScalarValues::Real = 150.0;
    }
    
    part def Wheel {
        attribute diameter :> ScalarValues::Real = 0.5;
    }
}`
      
      // This code previously caused "RuntimeError: unreachable"
      // Should now work or return a proper error
      try {
        const result = await wasmInstance.generate_cst(problematicCode, 'test://file')
        
        // If successful, verify it's valid
        expect(result).toBeDefined()
        expect(result.root).toBeDefined()
      } catch (err) {
        // If error, verify it's not a panic
        expect(err).toBeInstanceOf(Error)
        expect(err.message).not.toContain('unreachable')
        expect(err.message).toMatch(/error|panic/i)
      }
    })

    it('should handle array bounds errors gracefully', async () => {
      // Test with code that might cause array bounds issues
      const code = "package 'Test' { part def Test {} }"

      // Reduced from 10 to 3 concurrent calls to save memory
      const promises = Array(3).fill(0).map((_, i) =>
        wasmInstance.generate_cst(code, `test://file-${i}`)
      )

      const results = await Promise.allSettled(promises)

      // All should either succeed or fail gracefully (not panic)
      results.forEach((result) => {
        if (result.status === 'rejected') {
          expect(result.reason).toBeInstanceOf(Error)
          expect(result.reason.message).not.toContain('unreachable')
        } else {
          expect(result.value).toBeDefined()
        }
      })
    })
  })
})
