/**
 * Shared WASM Test Helper
 *
 * Provides a singleton WASM instance for all tests to reduce memory usage.
 * Tests should import this helper instead of loading WASM individually.
 */

let sharedWasmInstance = null
let wasmModule = null
let loadPromise = null

/**
 * Load WASM module once and return shared instance
 */
export async function getSharedWasmInstance() {
  // Return existing instance if already loaded
  if (sharedWasmInstance) {
    return sharedWasmInstance
  }

  // Wait for existing load if in progress
  if (loadPromise) {
    return loadPromise
  }

  // Load WASM module
  loadPromise = (async () => {
    try {
      const wasmPath = new URL('../../wasm/sysml_wasm_bridge.js', import.meta.url).href
      wasmModule = await import(/* @vite-ignore */ wasmPath)

      if (wasmModule.default) {
        await wasmModule.default()
      }

      // Initialize panic hook if available
      if (wasmModule.init_panic_hook) {
        wasmModule.init_panic_hook()
      }

      const SysMLWasm = wasmModule.SysMLWasm

      if (SysMLWasm) {
        sharedWasmInstance = new SysMLWasm()
        console.log('✅ Shared WASM instance loaded for tests')
      } else {
        console.warn('⚠️ SysMLWasm class not found in WASM module')
      }
    } catch (err) {
      console.warn('⚠️ WASM module not available for testing:', err.message)
      console.warn('   Build WASM: cd sysmlv2_rust_extension/crates/wasm-bridge && wasm-pack build --target web')
    }

    return sharedWasmInstance
  })()

  return loadPromise
}

/**
 * Check if WASM is available
 */
export function isWasmAvailable() {
  return sharedWasmInstance !== null
}

/**
 * Cleanup WASM instance (call in afterAll)
 */
export function cleanupWasm() {
  if (sharedWasmInstance) {
    try {
      // Call free() if available
      if (typeof sharedWasmInstance.free === 'function') {
        sharedWasmInstance.free()
      }
    } catch (err) {
      // Ignore cleanup errors
    }
    sharedWasmInstance = null
    wasmModule = null
    loadPromise = null
  }
}

/**
 * Create a skipIfNoWasm function for use in tests
 * Returns it if WASM is available, it.skip if not
 * @param {Function} it - The test function from vitest
 * @returns {Function} Either it or it.skip
 */
export function skipIfNoWasm(it) {
  return sharedWasmInstance ? it : it.skip
}
