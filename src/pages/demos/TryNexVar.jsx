import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TryYourselfEditor from '../../components/TryYourselfEditor/TryYourselfEditor'
import UvlView from '../../components/UvlView/UvlView'
import '../Page.css'
import '../TryYourself.css'

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
            GPS
            HeatedSeats

constraints
    ElectricMotor => Automatic
    GasEngine => !ElectricMotor
    GPS => Navigation
    HeatedSeats => AirConditioning`

/**
 * NexVar Interactive Demo
 *
 * Try UVL variability modeling with feature configuration
 */
export default function TryNexVar() {
  const [uvlCode, setUvlCode] = useState(DEFAULT_UVL_EXAMPLE)

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img
              src="/assets/icon_nexvar.svg"
              alt="NexVar"
              style={{height: '60px', width: 'auto', maxWidth: '60px', objectFit: 'contain'}}
            />
            <h1>Try NexVar</h1>
          </div>
          <p className="page-hero-description">
            Experience UVL (Universal Variability Language) for feature modeling and product line engineering.
            Define feature models with mandatory, optional, and alternative features, plus constraints.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/products/nexvar" className="btn ghost">
              ← Back to NexVar Details
            </Link>
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="try-yourself-page-grid">
            <div className="editor-column">
              <TryYourselfEditor
                defaultCode={DEFAULT_UVL_EXAMPLE}
                defaultExample="UVL Variability"
                onCodeChange={setUvlCode}
              />
            </div>
            <div className="documentation-column">
              <UvlView code={uvlCode} />
            </div>
          </div>

          <div className="try-yourself-footer">
            <p className="try-yourself-note">
              <strong>NexVar Features:</strong> UVL variability modeling, feature dependencies, constraint validation,
              configuration generation, and product line analysis. For full variability management capabilities,
              check out the{' '}
              <Link to="/contact">VS Code Extension</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
