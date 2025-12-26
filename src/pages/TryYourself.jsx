import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TryYourselfEditor, { DEFAULT_EXAMPLE } from '../components/TryYourselfEditor/TryYourselfEditor'
import DocumentationTabs from '../components/DocumentationTabs/DocumentationTabs'
import './Page.css'
import './TryYourself.css'

const DEFAULT_UVL_EXAMPLE = `namespace Vehicle

features
    Vehicle
        mandatory
            Engine
                alternative
                    GasEngine
                    ElectricMotor
            Transmission
                alternative
                    Manual
                    Automatic
        optional
            AirConditioning
            Navigation

constraints
    ElectricMotor => Automatic
    GasEngine => !ElectricMotor`

export default function TryYourself() {
  const [editorCode, setEditorCode] = useState(DEFAULT_EXAMPLE)
  const [uvlCode, setUvlCode] = useState(DEFAULT_UVL_EXAMPLE)

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

          {/* UVL Demo Section */}
          <div className="try-yourself-uvl-section">
            <div className="try-yourself-uvl-header">
              <h2>UVL Variability Demo</h2>
              <p className="try-yourself-uvl-description">
                Try the Universal Variability Language (UVL) for feature modeling and variability management.
              </p>
            </div>
            <div className="try-yourself-uvl-grid">
              <div className="editor-column">
                <TryYourselfEditor 
                  defaultCode={DEFAULT_UVL_EXAMPLE}
                  defaultExample="UVL Variability"
                  onCodeChange={setUvlCode}
                />
              </div>
              <div className="documentation-column">
                <DocumentationTabs code={uvlCode} />
              </div>
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
