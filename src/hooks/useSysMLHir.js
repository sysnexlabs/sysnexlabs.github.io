import { useState, useEffect, useRef } from 'react'
import { useSysMLWasm } from './useSysMLWasm'
import { safeWasmCall } from '../utils/wasmErrorHandler'

// Cache for HIR results
const hirCache = new Map()

function getCacheKey(code, fileUri) {
  return `${fileUri}:${code.length}:${code.substring(0, 100).replace(/\s/g, '')}`
}

/**
 * Hook to generate HIR from SysML code with caching
 */
export function useSysMLHir(code, fileUri = 'editor://current') {
  const { wasm } = useSysMLWasm()
  const [hirData, setHirData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const cacheKeyRef = useRef(null)

  useEffect(() => {
    if (!code || code.trim().length === 0) {
      setHirData(null)
      return
    }

    const generateHir = async () => {
      const cacheKey = getCacheKey(code, fileUri)
      
      // Check cache first
      if (cacheKeyRef.current === cacheKey && hirCache.has(cacheKey)) {
        console.log('📦 [useSysMLHir] Using cached HIR')
        setHirData(hirCache.get(cacheKey))
        return
      }

      setLoading(true)
      setError(null)

      if (!wasm) {
        setError('WASM module is not available')
        setLoading(false)
        return
      }

      try {
        const hir = await safeWasmCall(wasm.generate_hir.bind(wasm), code, fileUri)
        setHirData(hir)
        // Cache the result
        hirCache.set(cacheKey, hir)
        cacheKeyRef.current = cacheKey
        // Limit cache size
        if (hirCache.size > 10) {
          const firstKey = hirCache.keys().next().value
          hirCache.delete(firstKey)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    // Debounce: 200ms for HIR
    const timeoutId = setTimeout(generateHir, 200)
    return () => clearTimeout(timeoutId)
  }, [code, fileUri, wasm])

  return { hirData, loading, error }
}

