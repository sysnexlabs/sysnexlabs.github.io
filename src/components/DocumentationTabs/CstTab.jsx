import React, { useState, useEffect } from 'react'
import { useSysMLWasm } from '../../hooks/useSysMLWasm'
import { safeWasmCall, formatWasmError } from '../../utils/wasmErrorHandler'
import ErrorDisplay from './ErrorDisplay'
import './CstTab.css'

export default function CstTab({ code }) {
  const { wasm } = useSysMLWasm()
  const [cstData, setCstData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!code || code.trim().length === 0) {
      setCstData(null)
      setError(null)
      return
    }

    const generateCst = async () => {
      setLoading(true)
      setError(null)

      if (!wasm) {
        // More user-friendly error message
        setError('WASM module is not available. Some features may be limited. The documentation view will still work with basic parsing.')
        setLoading(false)
        return
      }

      try {
        // Validate code before calling WASM
        if (!code || code.trim().length === 0) {
          setError('Please enter some SysML v2 code to generate CST')
          setLoading(false)
          return
        }

        // Log the code being processed for debugging
        console.group('🔍 CST Generation Debug')
        console.log('Code length:', code.length)
        console.log('Line count:', code.split('\n').length)
        console.log('First line:', code.split('\n')[0])
        console.log('Full code:', code)
        console.groupEnd()

        // Call WASM with additional error handling
        let cst
        try {
          cst = await safeWasmCall(wasm.generate_cst.bind(wasm), code, 'editor://current')
        } catch (wasmErr) {
          // Log detailed error information
          console.error('🔴 CST Generation Failed:', {
            error: wasmErr,
            codeLength: code.length,
            codePreview: code.substring(0, 200),
            errorType: wasmErr?.constructor?.name,
            errorMessage: wasmErr?.message
          })
          throw wasmErr
        }

        // Validate the result
        if (!cst) {
          throw new Error('CST generation returned null or undefined')
        }

        setCstData(cst)
      } catch (err) {
        console.error('🔴 CST Error Details:', {
          error: err,
          code: code?.substring(0, 500),
          stack: err?.stack
        })
        
        const errorMsg = formatWasmError(err, { 
          code, 
          functionName: 'generate_cst' 
        })
        setError(errorMsg)
      } finally {
        setLoading(false)
      }
    }

    // Debounce to avoid too many calls
    const timeoutId = setTimeout(generateCst, 300)
    return () => clearTimeout(timeoutId)
  }, [code, wasm])

  if (loading) {
    return (
      <div className="cst-tab">
        <div className="cst-loading">Generating CST...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="cst-tab">
        <ErrorDisplay 
          error={error} 
          code={code} 
          functionName="generate_cst"
        />
        {error && error.includes('WASM') && (
          <div className="cst-error-hint">
            <p>⚠️ Advanced features require the WASM module. The basic documentation view is still available.</p>
            <p className="cst-error-note">Note: WASM is automatically built during deployment. If you see this message, the WASM files may not have been deployed correctly.</p>
          </div>
        )}
      </div>
    )
  }

  if (!cstData) {
    return (
      <div className="cst-tab">
        <div className="cst-empty">Start typing SysML v2 code to see the Concrete Syntax Tree.</div>
      </div>
    )
  }

  return (
    <div className="cst-tab">
      <div className="cst-header">
        <h3>CST (Concrete Syntax Tree)</h3>
        {cstData.stats && (
          <div className="cst-stats">
            <span>Nodes: {cstData.stats.total_nodes}</span>
            <span>Tokens: {cstData.stats.total_tokens}</span>
            <span>Depth: {cstData.stats.depth}</span>
          </div>
        )}
      </div>
      <div className="cst-content">
        <pre className="cst-tree">
          {JSON.stringify(cstData.root, null, 2)}
        </pre>
      </div>
    </div>
  )
}
