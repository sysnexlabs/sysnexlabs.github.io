import React, { useState } from 'react'
import { useSysMLCst } from '../../hooks/useSysMLCst'
import { formatWasmError } from '../../utils/wasmErrorHandler'
import ErrorDisplay from './ErrorDisplay'
import TreeView from './TreeView'
import './CstTab.css'

export default function CstTab({ code }) {
  const { cstData, loading, error } = useSysMLCst(code, 'editor://current')
  const [viewMode, setViewMode] = useState('tree')

  if (loading) {
    return (
      <div className="cst-tab">
        <div className="cst-loading">Generating CST...</div>
      </div>
    )
  }

  if (error) {
    const errorMsg = formatWasmError(error, { 
      code, 
      functionName: 'generate_cst' 
    })
    return (
      <div className="cst-tab">
        <ErrorDisplay 
          error={errorMsg} 
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
        <div className="cst-view-toggle">
          <button 
            className={`cst-view-btn ${viewMode === 'tree' ? 'active' : ''}`}
            onClick={() => setViewMode('tree')}
          >
            Tree View
          </button>
          <button 
            className={`cst-view-btn ${viewMode === 'json' ? 'active' : ''}`}
            onClick={() => setViewMode('json')}
          >
            JSON View
          </button>
        </div>
        {viewMode === 'tree' ? (
          <div className="cst-tree-view">
            <TreeView data={cstData.root || cstData} rootKey="root" maxDepth={8} />
          </div>
        ) : (
          <pre className="cst-json-view">
            {JSON.stringify(cstData.root || cstData, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
