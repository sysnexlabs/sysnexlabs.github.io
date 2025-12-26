import React, { useState, useMemo, useEffect } from 'react'
import DocumentationView from '../DocumentationView/DocumentationView'
import CstTab from './CstTab'
import HirTab from './HirTab'
import StatsTab from './StatsTab'
import UvlTab from './UvlTab'
import UvlDiagramTab from './UvlDiagramTab'
import './DocumentationTabs.css'

export default function DocumentationTabs({ code }) {
  // Detect if code is UVL
  const isUvlCode = useMemo(() => {
    if (!code) return false
    const trimmed = code.trim()
    return trimmed.startsWith('namespace') || trimmed.startsWith('features')
  }, [code])
  
  const [activeTab, setActiveTab] = useState(() => {
    // Default to UVL tab if UVL code detected
    return isUvlCode ? 'uvl' : 'documentation'
  })
  
  // Update active tab when code type changes
  useEffect(() => {
    if (isUvlCode && !['uvl', 'uvl-diagram'].includes(activeTab)) {
      setActiveTab('uvl')
    } else if (!isUvlCode && ['uvl', 'uvl-diagram'].includes(activeTab)) {
      setActiveTab('documentation')
    }
  }, [isUvlCode, activeTab])

  return (
    <div className="documentation-tabs">
      <div className="doc-tabs-header">
        {isUvlCode ? (
          <>
            <button
              className={`doc-tab-button ${activeTab === 'uvl' ? 'active' : ''}`}
              onClick={() => setActiveTab('uvl')}
            >
              Feature Model
            </button>
            <button
              className={`doc-tab-button ${activeTab === 'uvl-diagram' ? 'active' : ''}`}
              onClick={() => setActiveTab('uvl-diagram')}
            >
              Diagram
            </button>
          </>
        ) : (
          <>
            <button
              className={`doc-tab-button ${activeTab === 'documentation' ? 'active' : ''}`}
              onClick={() => setActiveTab('documentation')}
            >
              Documentation
            </button>
            <button
              className={`doc-tab-button ${activeTab === 'cst' ? 'active' : ''}`}
              onClick={() => setActiveTab('cst')}
            >
              CST
            </button>
            <button
              className={`doc-tab-button ${activeTab === 'hir' ? 'active' : ''}`}
              onClick={() => setActiveTab('hir')}
            >
              HIR
            </button>
            <button
              className={`doc-tab-button ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              Stats
            </button>
          </>
        )}
      </div>

      <div className="doc-tabs-content">
        {isUvlCode ? (
          <>
            {activeTab === 'uvl' && <UvlTab code={code} />}
            {activeTab === 'uvl-diagram' && <UvlDiagramTab code={code} />}
          </>
        ) : (
          <>
            {activeTab === 'documentation' && <DocumentationView code={code} />}
            {activeTab === 'cst' && <CstTab code={code} />}
            {activeTab === 'hir' && <HirTab code={code} />}
            {activeTab === 'stats' && <StatsTab code={code} />}
          </>
        )}
      </div>
    </div>
  )
}
