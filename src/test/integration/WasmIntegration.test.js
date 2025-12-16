/**
 * Real WASM Integration Tests
 * 
 * These tests make actual WASM calls to detect real issues like panics,
 * array bounds errors, and other runtime problems that mocks cannot catch.
 */

import { describe, it, expect, beforeAll } from 'vitest'

// Import real WASM module (not mocked)
let SysMLWasm
let wasmInstance

beforeAll(async () => {
  try {
    // Try to load real WASM module
    // Use dynamic import with path resolution
    const wasmPath = new URL('../../wasm/sysml_wasm_bridge.js', import.meta.url).href
    const wasmModule = await import(/* @vite-ignore */ wasmPath)
    
    if (wasmModule.default) {
      await wasmModule.default()
    }
    
    // Initialize panic hook if available
    if (wasmModule.init_panic_hook) {
      wasmModule.init_panic_hook()
    }
    
    SysMLWasm = wasmModule.SysMLWasm
    
    if (SysMLWasm) {
      wasmInstance = new SysMLWasm()
      console.log('✅ Real WASM module loaded for testing')
    } else {
      console.warn('⚠️ SysMLWasm class not found in WASM module')
    }
  } catch (err) {
    console.warn('⚠️ Real WASM module not available for testing:', err.message)
    console.warn('   Tests will be skipped. Build WASM first: cd sysmlv2_rust_extension/crates/wasm-bridge && wasm-pack build --target web')
    // Tests will be skipped if WASM is not available
  }
})

describe('Real WASM Integration Tests', () => {
  const skipIfNoWasm = !wasmInstance ? it.skip : it

  describe('CST Generation', () => {
    skipIfNoWasm('should generate CST without panics for valid code', async () => {
      const code = "package 'Test' { part def Test {} }"
      
      const result = await wasmInstance.generate_cst(code, 'test://file')
      
      expect(result).toBeDefined()
      expect(result.root).toBeDefined()
      expect(result.file_uri).toBe('test://file')
      
      // Should not throw when serializing
      expect(() => JSON.parse(JSON.stringify(result))).not.toThrow()
    })

    skipIfNoWasm('should handle empty code without panics', async () => {
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

    skipIfNoWasm('should handle Vehicle System example without panics', async () => {
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

    skipIfNoWasm('should handle large files without panics', async () => {
      const parts = Array(100).fill(0).map((_, i) => 
        `    part def Part${i} {\n        attribute id :> ScalarValues::String;\n    }`
      ).join('\n')
      
      const largeCode = `package 'Large System' {\n${parts}\n}`
      
      const result = await wasmInstance.generate_cst(largeCode, 'test://large')
      
      expect(result).toBeDefined()
      expect(result.root).toBeDefined()
    })

    skipIfNoWasm('should handle code with parse errors gracefully', async () => {
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
    skipIfNoWasm('should generate HIR without panics', async () => {
      const code = "package 'Test' { part def Test {} }"
      
      const result = await wasmInstance.generate_hir(code, 'test://file')
      
      expect(result).toBeDefined()
      expect(() => JSON.parse(JSON.stringify(result))).not.toThrow()
    })

    skipIfNoWasm('should handle Vehicle System example for HIR', async () => {
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
    skipIfNoWasm('should generate analytics without panics', async () => {
      const code = "package 'Test' { part def Test {} }"
      
      const result = await wasmInstance.generate_analytics(code, 'test://file')
      
      expect(result).toBeDefined()
      expect(() => JSON.parse(JSON.stringify(result))).not.toThrow()
    })
  })

  describe('Panic Detection', () => {
    skipIfNoWasm('should catch panics and return errors instead of crashing', async () => {
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

    skipIfNoWasm('should handle array bounds errors gracefully', async () => {
      // Test with code that might cause array bounds issues
      const code = "package 'Test' { part def Test {} }"
      
      // Multiple rapid calls to test for bounds issues
      const promises = Array(10).fill(0).map(() => 
        wasmInstance.generate_cst(code, 'test://file')
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
