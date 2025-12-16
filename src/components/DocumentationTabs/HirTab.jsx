import React, { useState, useEffect } from 'react'
import { useSysMLWasm } from '../../hooks/useSysMLWasm'
import { safeWasmCall, formatWasmError } from '../../utils/wasmErrorHandler'
import ErrorDisplay from './ErrorDisplay'
import './HirTab.css'

export default function HirTab({ code }) {
  const { wasm } = useSysMLWasm()
  const [hirData, setHirData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!code || code.trim().length === 0) {
      setHirData(null)
      return
    }

    const generateHir = async () => {
      setLoading(true)
      setError(null)

      if (wasm) {
        try {
          const hir = await safeWasmCall(wasm.generate_hir.bind(wasm), code, 'editor://current')
          setHirData(hir)
        } catch (err) {
          let errorMsg = formatWasmError(err, { 
            code, 
            functionName: 'generate_hir' 
          })
          if (errorMsg.includes('NoHirData') || errorMsg.includes('HIR')) {
            errorMsg = `HIR generation failed: ${errorMsg}. The code may need to be parsed first.`
          }
          setError(errorMsg)
        }
      } else {
        setError('WASM module is not available. Some features may be limited. The documentation view will still work with basic parsing.')
      }

      setLoading(false)
    }

    const timeoutId = setTimeout(generateHir, 300)
    return () => clearTimeout(timeoutId)
  }, [code, wasm])

  if (loading) {
    return (
      <div className="hir-tab">
        <div className="hir-loading">Generating HIR...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="hir-tab">
        <ErrorDisplay 
          error={error} 
          code={code} 
          functionName="generate_hir"
        />
        {error && error.includes('WASM') && (
          <div className="hir-error-hint">
            <p>⚠️ Advanced features require the WASM module. The basic documentation view is still available.</p>
            <p className="hir-error-note">Note: WASM is automatically built during deployment. If you see this message, the WASM files may not have been deployed correctly.</p>
          </div>
        )}
      </div>
    )
  }

  if (!hirData) {
    return (
      <div className="hir-tab">
        <div className="hir-empty">Start typing SysML v2 code to see the High-level Intermediate Representation.</div>
      </div>
    )
  }

  return (
    <div className="hir-tab">
      <div className="hir-header">
        <h3>HIR (High-level Intermediate Representation)</h3>
        {hirData.stats && (
          <div className="hir-stats">
            <span>Nodes: {hirData.stats.total_nodes || 0}</span>
            <span>Roots: {hirData.roots?.length || 0}</span>
          </div>
        )}
      </div>
      <div className="hir-content">
        <pre className="hir-tree">
          {JSON.stringify(hirData, null, 2)}
        </pre>
      </div>
    </div>
  )
}
