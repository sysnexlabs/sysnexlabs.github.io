import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Hook for UVL parsing using WASM
 * Reuses the same WASM module as SysML (which includes UVL support)
 */
export function useUvlWasm() {
  const [wasm, setWasm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    const loadWasm = async () => {
      try {
        // Use the same WASM module as SysML (it includes UVL support)
        let wasmJsPath, wasmBinaryPath
        if (import.meta.env.PROD) {
          // In production, use Vite's BASE_URL which includes the configured base path
          // This ensures paths work correctly for subdirectory deployments (e.g., GitHub Pages)
          const base = import.meta.env.BASE_URL || '/'
          wasmJsPath = `${base}wasm/sysml_wasm_bridge.js`
          wasmBinaryPath = `${base}wasm/sysml_wasm_bridge_bg.wasm`
        } else {
          // In development, WASM files are in src/wasm/ relative to src/hooks/
          wasmJsPath = new URL('../wasm/sysml_wasm_bridge.js', import.meta.url).href
          wasmBinaryPath = new URL('../wasm/sysml_wasm_bridge_bg.wasm', import.meta.url).href
        }
        
        // Try to load WASM module
        let wasmModule
        try {
          wasmModule = await import(/* @vite-ignore */ wasmJsPath)
        } catch (importErr) {
          // WASM module not available - this is expected if not built yet
          setError(null) // Don't show error, just mark as not available
          setLoading(false)
          return
        }
        
        // Initialize WASM module
        if (wasmModule.default) {
          if (wasmBinaryPath) {
            await wasmModule.default({ module_or_path: wasmBinaryPath })
          } else {
            await wasmModule.default()
          }
        }
        
        // Initialize panic hook
        if (wasmModule.init_panic_hook) {
          wasmModule.init_panic_hook()
        }
        
        const SysMLWasm = wasmModule.SysMLWasm
        if (!SysMLWasm) {
          throw new Error('SysMLWasm class not found in WASM module')
        }
        
        const instance = new SysMLWasm()
        
        // Check if parse_uvl function exists
        const hasParseUvl = instance && typeof instance.parse_uvl === 'function'
        
        if (hasParseUvl) {
          setWasm(instance)
        } else {
          // UVL support not yet built in WASM - don't set wasm
          setWasm(null)
        }
        setLoading(false)
      } catch (err) {
        // WASM module not available - expected if not built
        setError(null)
        setLoading(false)
      }
    }

    loadWasm()
  }, [])

  // Memoize parseUvl to prevent infinite re-renders in components that use it
  const parseUvl = useCallback(async (uvlCode) => {
    // Early return if wasm is not available or doesn't have parse_uvl
    if (!wasm || typeof wasm.parse_uvl !== 'function') {
      console.log('[useUvlWasm] parse_uvl not available')
      return null
    }

    try {
      console.log('[useUvlWasm] Calling parse_uvl with code length:', uvlCode.length)
      // Call the function - wrap in try-catch to handle any errors gracefully
      const result = wasm.parse_uvl(uvlCode)
      console.log('[useUvlWasm] parse_uvl returned:', result)
      console.log('[useUvlWasm] Result type:', typeof result)
      console.log('[useUvlWasm] Result keys:', result && typeof result === 'object' ? Object.keys(result) : 'N/A')
      return result
    } catch (err) {
      // Log errors for debugging
      console.error('[useUvlWasm] Error calling parse_uvl:', err)
      return null
    }
  }, [wasm]) // Only recreate if wasm instance changes

  return { wasm, loading, error, parseUvl }
}

