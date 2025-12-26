import React, { useState } from 'react'
import { useSysMLHir } from '../../hooks/useSysMLHir'
import { formatWasmError } from '../../utils/wasmErrorHandler'
import ErrorDisplay from './ErrorDisplay'
import TreeView from './TreeView'
import './HirTab.css'

export default function HirTab({ code }) {
  const { hirData, loading, error } = useSysMLHir(code, 'editor://current')
  const [viewMode, setViewMode] = useState('tree')

  if (loading) {
    return (
      <div className="hir-tab">
        <div className="hir-loading">Generating HIR...</div>
      </div>
    )
  }

  if (error) {
    let errorMsg = formatWasmError(error, { 
      code, 
      functionName: 'generate_hir' 
    })
    if (errorMsg.includes('NoHirData') || errorMsg.includes('HIR')) {
      errorMsg = `HIR generation failed: ${errorMsg}. The code may need to be parsed first.`
    }
    return (
      <div className="hir-tab">
        <ErrorDisplay 
          error={errorMsg} 
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
        <div className="hir-view-toggle">
          <button 
            className={`hir-view-btn ${viewMode === 'tree' ? 'active' : ''}`}
            onClick={() => setViewMode('tree')}
          >
            Tree View
          </button>
          <button 
            className={`hir-view-btn ${viewMode === 'json' ? 'active' : ''}`}
            onClick={() => setViewMode('json')}
          >
            JSON View
          </button>
        </div>
        {viewMode === 'tree' ? (
          <div className="hir-tree-view">
            <TreeView data={hirData} rootKey="hir" maxDepth={8} />
          </div>
        ) : (
          <pre className="hir-json-view">
            {JSON.stringify(hirData, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
