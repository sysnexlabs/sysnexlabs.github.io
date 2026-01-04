import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TryYourselfEditor, { DEFAULT_EXAMPLE } from '../../components/TryYourselfEditor/TryYourselfEditor'
import DocumentationTabs from '../../components/DocumentationTabs/DocumentationTabs'
import '../Page.css'
import '../TryYourself.css'

/**
 * NexDocs Interactive Demo
 *
 * Try the documentation viewer with live SysML v2 editing
 */
export default function TryNexDocs() {
  const [editorCode, setEditorCode] = useState(DEFAULT_EXAMPLE)

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img
              src="/assets/icon_nexdocs.svg"
              alt="NexDocs"
              style={{height: '60px', width: 'auto', maxWidth: '60px', objectFit: 'contain'}}
            />
            <h1>Try NexDocs</h1>
          </div>
          <p className="page-hero-description">
            Experience the NexDocs documentation viewer in your browser. Write SysML v2 code and see
            live hierarchical documentation with cross-file navigation, auto-generated diagrams, and smart import resolution.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/products/nexdocs" className="btn ghost">
              ← Back to NexDocs Details
            </Link>
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="try-yourself-page-grid">
            <div className="editor-column">
              <TryYourselfEditor onCodeChange={setEditorCode} />
            </div>
            <div className="documentation-column">
              <DocumentationTabs code={editorCode} />
            </div>
          </div>

          <div className="try-yourself-footer">
            <p className="try-yourself-note">
              <strong>NexDocs Features:</strong> MkDocs-style hierarchical documentation, cross-file navigation,
              automatic diagram generation (BDD, IBD, Activity, State Machine, Requirement), smart import resolution,
              and HIR-based extraction. For the full experience, check out the{' '}
              <Link to="/contact">VS Code Extension</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
