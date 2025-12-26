import { useState, useEffect, useRef } from 'react'
import { useSysMLWasm } from './useSysMLWasm'
import { safeWasmCall } from '../utils/wasmErrorHandler'

// Cache for CST results
const cstCache = new Map()

function getCacheKey(code, fileUri) {
  return `${fileUri}:${code.length}:${code.substring(0, 100).replace(/\s/g, '')}`
}

/**
 * Hook to generate CST from SysML code with caching
 */
export function useSysMLCst(code, fileUri = 'editor://current') {
  const { wasm } = useSysMLWasm()
  const [cstData, setCstData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const cacheKeyRef = useRef(null)

  useEffect(() => {
    if (!code || code.trim().length === 0) {
      setCstData(null)
      return
    }

    const generateCst = async () => {
      const cacheKey = getCacheKey(code, fileUri)
      
      // Check cache first
      if (cacheKeyRef.current === cacheKey && cstCache.has(cacheKey)) {
        console.log('📦 [useSysMLCst] Using cached CST')
        setCstData(cstCache.get(cacheKey))
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
        const cst = await safeWasmCall(wasm.generate_cst.bind(wasm), code, fileUri)
        setCstData(cst)
        // Cache the result
        cstCache.set(cacheKey, cst)
        cacheKeyRef.current = cacheKey
        // Limit cache size
        if (cstCache.size > 10) {
          const firstKey = cstCache.keys().next().value
          cstCache.delete(firstKey)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    // Debounce: 200ms for CST
    const timeoutId = setTimeout(generateCst, 200)
    return () => clearTimeout(timeoutId)
  }, [code, fileUri, wasm])

  return { cstData, loading, error }
}

