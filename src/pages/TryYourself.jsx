import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TryYourselfEditor, { DEFAULT_EXAMPLE } from '../components/TryYourselfEditor/TryYourselfEditor'
import DocumentationTabs from '../components/DocumentationTabs/DocumentationTabs'
import './Page.css'
import './TryYourself.css'

export default function TryYourself() {
  const [editorCode, setEditorCode] = useState(DEFAULT_EXAMPLE)

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <h1>Try SysML v2 Yourself</h1>
          <p className="page-hero-description">
            Experience SysML v2 directly in your browser. Write code in the editor and see 
            the live documentation view update in real-time.
          </p>
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
              <strong>Note:</strong> This is a proof of concept. Full WASM-based parsing and 
              advanced features are coming soon. For production use, check out our{' '}
              <Link to="/contact">VS Code Extension</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
