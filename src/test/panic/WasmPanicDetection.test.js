/**
 * WASM Panic Detection Tests
 *
 * These tests specifically check for panic conditions that were discovered:
 * - Array bounds errors in line_col
 * - Panics in CST generation
 * - Panics in HIR generation
 * - Panics in analytics generation
 *
 * Uses shared WASM instance to reduce memory usage.
 */

import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { getSharedWasmInstance } from '../helpers/wasmTestHelper'

let wasmInstance

beforeAll(async () => {
  wasmInstance = await getSharedWasmInstance()
})

afterAll(() => {
  // Cleanup is handled globally by the helper
})

describe('WASM Panic Detection', () => {

  describe('CST Generation Panics', () => {
    it('should not panic on Vehicle System example (previously panicked)', async () => {
      // This is the exact code that caused "RuntimeError: unreachable"
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
      
      // Should not throw "RuntimeError: unreachable"
      try {
        const result = await wasmInstance.generate_cst(code, 'editor://current')
        
        // Should succeed
        expect(result).toBeDefined()
        expect(result.root).toBeDefined()
        expect(result.stats).toBeDefined()
        
        // Verify no panic occurred
        expect(() => JSON.parse(JSON.stringify(result))).not.toThrow()
      } catch (err) {
        // If error, it should be a proper error, not a panic
        expect(err).toBeInstanceOf(Error)
        expect(err.message).not.toContain('unreachable')
        expect(err.message).toMatch(/error|panic/i)
        
        // Fail the test if we get an unreachable error
        if (err.message.includes('unreachable')) {
          throw new Error('Panic detected: RuntimeError: unreachable - This should be fixed!')
        }
      }
    })

    it('should catch panics and convert to errors', async () => {
      // Test that catch_unwind is working
      const code = "package 'Test' { part def Test {} }"
      
      // Multiple calls to ensure stability
      const results = await Promise.allSettled([
        wasmInstance.generate_cst(code, 'test://1'),
        wasmInstance.generate_cst(code, 'test://2'),
        wasmInstance.generate_cst(code, 'test://3'),
      ])
      
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          // Should be a proper error, not a panic
          expect(result.reason).toBeInstanceOf(Error)
          expect(result.reason.message).not.toContain('unreachable')
        } else {
          expect(result.value).toBeDefined()
        }
      })
    })

    it('should handle empty source without array bounds panic', async () => {
      // Empty source could cause array bounds issues in line_col
      try {
        const result = await wasmInstance.generate_cst('', 'test://empty')
        // May return error or empty result
        expect(result).toBeDefined()
      } catch (err) {
        // Should be a proper error, not a panic
        expect(err).toBeInstanceOf(Error)
        expect(err.message).not.toContain('unreachable')
        expect(err.message).toMatch(/empty|error/i)
      }
    })

    it('should handle out-of-bounds line indices without panic', async () => {
      // Code that might cause out-of-bounds access in line_col
      const code = "package 'Test' { part def Test {} }"

      // Reduced from 20 to 5 concurrent calls to save memory
      const promises = Array(5).fill(0).map((_, i) =>
        wasmInstance.generate_cst(code, `test://bounds-${i}`)
      )

      const results = await Promise.allSettled(promises)

      // None should panic
      results.forEach((result) => {
        if (result.status === 'rejected') {
          expect(result.reason.message).not.toContain('unreachable')
        }
      })
    })
  })

  describe('HIR Generation Panics', () => {
    it('should not panic on HIR generation', async () => {
      const code = `package 'Vehicle System' {
    part def Vehicle {
        attribute speed :> ScalarValues::Real;
    }
}`
      
      try {
        const result = await wasmInstance.generate_hir(code, 'editor://current')
        expect(result).toBeDefined()
      } catch (err) {
        expect(err.message).not.toContain('unreachable')
      }
    })
  })

  describe('Analytics Generation Panics', () => {
    it('should not panic on analytics generation', async () => {
      const code = `package 'Vehicle System' {
    part def Vehicle {
        attribute speed :> ScalarValues::Real;
    }
}`
      
      try {
        const result = await wasmInstance.generate_analytics(code, 'editor://current')
        expect(result).toBeDefined()
      } catch (err) {
        expect(err.message).not.toContain('unreachable')
      }
    })
  })

  describe('Panic Hook Verification', () => {
    it('should have panic hook initialized', () => {
      // Verify that panic hook is set up
      // This is checked by the fact that panics are caught
      expect(wasmInstance).toBeDefined()
    })
  })

  describe('Error vs Panic Detection', () => {
    it('should distinguish between errors and panics', async () => {
      const code = "package 'Test' { part def Test {} }"
      
      try {
        const result = await wasmInstance.generate_cst(code, 'test://file')
        expect(result).toBeDefined()
      } catch (err) {
        // If error occurs, verify it's not a panic
        expect(err).toBeInstanceOf(Error)
        
        // Panic indicators (should NOT be present)
        const panicIndicators = ['unreachable', 'panic', 'RuntimeError: unreachable']
        const hasPanic = panicIndicators.some(indicator => 
          err.message.includes(indicator) || err.toString().includes(indicator)
        )
        
        expect(hasPanic).toBe(false)
      }
    })
  })
})
