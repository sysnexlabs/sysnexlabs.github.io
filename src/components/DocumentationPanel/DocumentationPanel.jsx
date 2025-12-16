import React, { useState } from 'react'
import './DocumentationPanel.css'

const SYNTAX_REFERENCE = {
  packages: {
    title: 'Packages',
    syntax: `package 'PackageName' {
    // Package contents
}`,
    description: 'Packages organize your model into logical groups.'
  },
  parts: {
    title: 'Parts',
    syntax: `part def PartName {
    attribute attributeName :> Type = value;
    part nestedPart : PartType;
}`,
    description: 'Parts represent structural elements in your system.'
  },
  attributes: {
    title: 'Attributes',
    syntax: `attribute name :> ScalarValues::Real = 0.0;`,
    description: 'Attributes define properties with types, multiplicities, and default values.'
  },
  requirements: {
    title: 'Requirements',
    syntax: `requirement def 'Requirement Name' {
    doc /* Requirement description */
}`,
    description: 'Requirements capture system needs and constraints.'
  }
}

const QUICK_TIPS = [
  {
    title: 'Type System',
    content: 'Use qualified names like `ScalarValues::Real` for standard library types.'
  },
  {
    title: 'Multiplicity',
    content: 'Specify cardinality with brackets: `[0..*]` for optional many, `[1]` for required single.'
  },
  {
    title: 'Documentation',
    content: 'Add documentation with `doc /* ... */` to describe your elements.'
  },
  {
    title: 'Specialization',
    content: 'Use `:>` for specialization: `part def Car :> Vehicle`'
  }
]

export default function DocumentationPanel({ selectedElement = null }) {
  const [activeTab, setActiveTab] = useState('syntax')

  return (
    <div className="documentation-panel">
      <div className="doc-header">
        <h3>Documentation</h3>
        <div className="doc-tabs">
          <button
            className={`doc-tab ${activeTab === 'syntax' ? 'active' : ''}`}
            onClick={() => setActiveTab('syntax')}
          >
            Syntax
          </button>
          <button
            className={`doc-tab ${activeTab === 'tips' ? 'active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            Tips
          </button>
          <button
            className={`doc-tab ${activeTab === 'examples' ? 'active' : ''}`}
            onClick={() => setActiveTab('examples')}
          >
            Examples
          </button>
        </div>
      </div>

      <div className="doc-content">
        {activeTab === 'syntax' && (
          <div className="syntax-reference">
            <h4>Quick Reference</h4>
            {Object.entries(SYNTAX_REFERENCE).map(([key, ref]) => (
              <div key={key} className="syntax-item">
                <h5>{ref.title}</h5>
                <p className="syntax-description">{ref.description}</p>
                <pre className="syntax-code">
                  <code>{ref.syntax}</code>
                </pre>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="tips-section">
            <h4>Quick Tips</h4>
            {QUICK_TIPS.map((tip, index) => (
              <div key={index} className="tip-item">
                <h5>{tip.title}</h5>
                <p>{tip.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="examples-section">
            <h4>Common Patterns</h4>
            
            <div className="example-item">
              <h5>Simple Package</h5>
              <pre className="example-code">
                <code>{`package 'MySystem' {
    doc /* System description */
}`}</code>
              </pre>
            </div>

            <div className="example-item">
              <h5>Part with Attributes</h5>
              <pre className="example-code">
                <code>{`part def Vehicle {
    attribute speed :> ScalarValues::Real = 0.0;
    attribute mass :> ScalarValues::Real = 1000.0;
}`}</code>
              </pre>
            </div>

            <div className="example-item">
              <h5>Nested Parts</h5>
              <pre className="example-code">
                <code>{`part def Car {
    part engine : Engine;
    part wheels : Wheel[4];
}`}</code>
              </pre>
            </div>

            <div className="example-item">
              <h5>Requirement</h5>
              <pre className="example-code">
                <code>{`requirement def 'Safety' {
    doc /* The system must be safe */
}`}</code>
              </pre>
            </div>
          </div>
        )}

        {selectedElement && (
          <div className="context-info">
            <h4>Element Info</h4>
            <p>Selected: <code>{selectedElement}</code></p>
          </div>
        )}
      </div>
    </div>
  )
}
