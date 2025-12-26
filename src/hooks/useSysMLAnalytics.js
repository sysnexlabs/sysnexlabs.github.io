import { useState, useEffect, useRef } from 'react'
import { useSysMLWasm } from './useSysMLWasm'
import { safeWasmCall } from '../utils/wasmErrorHandler'

// Cache for analytics results
const analyticsCache = new Map()

function getCacheKey(code, fileUri) {
  return `${fileUri}:${code.length}:${code.substring(0, 100).replace(/\s/g, '')}`
}

/**
 * Hook to generate analytics from SysML code with caching
 */
export function useSysMLAnalytics(code, fileUri = 'editor://current') {
  const { wasm } = useSysMLWasm()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const cacheKeyRef = useRef(null)

  useEffect(() => {
    if (!code || code.trim().length === 0) {
      setAnalytics(null)
      return
    }

    const generateAnalytics = async () => {
      const cacheKey = getCacheKey(code, fileUri)
      
      // Check cache first
      if (cacheKeyRef.current === cacheKey && analyticsCache.has(cacheKey)) {
        console.log('📦 [useSysMLAnalytics] Using cached analytics')
        setAnalytics(analyticsCache.get(cacheKey))
        return
      }

      setLoading(true)
      setError(null)

      if (wasm) {
        try {
          const stats = await safeWasmCall(wasm.generate_analytics.bind(wasm), code, fileUri)
          setAnalytics(stats)
          // Cache the result
          analyticsCache.set(cacheKey, stats)
          cacheKeyRef.current = cacheKey
          // Limit cache size
          if (analyticsCache.size > 10) {
            const firstKey = analyticsCache.keys().next().value
            analyticsCache.delete(firstKey)
          }
        } catch (err) {
          setError(err.message)
        }
      } else {
        setError('WASM module is not available')
      }

      setLoading(false)
    }

    // Debounce: 200ms for analytics (less frequent than documentation)
    const timeoutId = setTimeout(generateAnalytics, 200)
    return () => clearTimeout(timeoutId)
  }, [code, fileUri, wasm])

  return { analytics, loading, error }
}

