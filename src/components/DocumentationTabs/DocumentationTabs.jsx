import React, { useState } from 'react'
import DocumentationView from '../DocumentationView/DocumentationView'
import CstTab from './CstTab'
import HirTab from './HirTab'
import StatsTab from './StatsTab'
import './DocumentationTabs.css'

export default function DocumentationTabs({ code }) {
  const [activeTab, setActiveTab] = useState('documentation')

  return (
    <div className="documentation-tabs">
      <div className="doc-tabs-header">
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
      </div>

      <div className="doc-tabs-content">
        {activeTab === 'documentation' && <DocumentationView code={code} />}
        {activeTab === 'cst' && <CstTab code={code} />}
        {activeTab === 'hir' && <HirTab code={code} />}
        {activeTab === 'stats' && <StatsTab code={code} />}
      </div>
    </div>
  )
}
