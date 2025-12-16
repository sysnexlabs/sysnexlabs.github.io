import React from 'react'
import './ErrorDisplay.css'

/**
 * Enhanced error display component for WASM errors
 * Shows detailed error information with code context
 */
export default function ErrorDisplay({ error, code, functionName }) {
  if (!error) return null

  const isRuntimeError = error.includes('RuntimeError') || error.includes('unreachable')
  const hasCodeContext = code && code.trim().length > 0

  return (
    <div className="error-display">
      <div className="error-header">
        <h4>⚠️ Error</h4>
        {functionName && (
          <span className="error-function">Function: {functionName}</span>
        )}
      </div>
      
      <div className="error-message">
        <p>{error}</p>
      </div>

      {isRuntimeError && (
        <div className="error-help">
          <h5>What does this mean?</h5>
          <ul>
            <li>This error usually indicates a Rust panic in the WASM module</li>
            <li>The code you entered might have syntax errors or unsupported features</li>
            <li>Check the browser console (F12) for detailed error information</li>
            <li>Try simplifying your code or using a different example</li>
          </ul>
        </div>
      )}

      {hasCodeContext && (
        <details className="error-code-context">
          <summary>Show code context</summary>
          <pre className="error-code-preview">
            {code.split('\n').slice(0, 10).map((line, i) => (
              <div key={i} className="error-code-line">
                <span className="error-line-number">{i + 1}</span>
                <span className="error-line-content">{line}</span>
              </div>
            ))}
            {code.split('\n').length > 10 && (
              <div className="error-code-more">...</div>
            )}
          </pre>
        </details>
      )}

      <div className="error-actions">
        <button
          onClick={() => {
            console.group('🔴 WASM Error Details')
            console.error('Error:', error)
            console.error('Function:', functionName)
            console.error('Code:', code)
            console.error('Full error object:', error)
            console.groupEnd()
          }}
          className="error-console-button"
        >
          Show in Console (F12)
        </button>
      </div>
    </div>
  )
}
