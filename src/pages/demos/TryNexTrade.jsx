import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TryYourselfEditor from '../../components/TryYourselfEditor/TryYourselfEditor'
import TradeStudyView from '../../components/TradeStudyView/TradeStudyView'
import '../Page.css'
import '../TryYourself.css'

const DEFAULT_TRADE_EXAMPLE = `package 'Vehicle Powertrain Trade Study' {
    doc /*
     * Trade study comparing electric vs hybrid powertrains
     */

    private import ScalarValues::*;

    // Base powertrain definition
    part def Powertrain {
        doc /* Base powertrain system */
        attribute cost : Real;
        attribute range : Real;
        attribute power : Real;
        attribute emissions : Real;
    }

    // Variant 1: Electric Powertrain
    part def ElectricPowertrain :> Powertrain {
        doc /*
         * Pure electric configuration
         * Zero emissions, higher upfront cost
         */
        :>> cost = 35000.0; // USD
        :>> range = 400.0; // km
        :>> power = 150.0; // kW
        :>> emissions = 0.0; // g CO2/km

        part battery {
            attribute capacity : Real = 75.0; // kWh
        }
        part motor {
            attribute efficiency : Real = 0.92;
        }
    }

    // Variant 2: Hybrid Powertrain
    part def HybridPowertrain :> Powertrain {
        doc /*
         * Hybrid electric configuration
         * Lower upfront cost, reduced emissions
         */
        :>> cost = 28000.0; // USD
        :>> range = 600.0; // km
        :>> power = 130.0; // kW
        :>> emissions = 95.0; // g CO2/km

        part battery {
            attribute capacity : Real = 10.0; // kWh
        }
        part electricMotor {
            attribute power : Real = 50.0; // kW
        }
        part combustionEngine {
            attribute power : Real = 80.0; // kW
        }
    }

    // Analysis case for trade study
    analysis def PowertrainTradeStudy {
        doc /*
         * Evaluate electric and hybrid options across
         * cost, range, performance, and sustainability metrics
         */

        subject vehicle : Vehicle;

        objective costObjective {
            doc /* Minimize total cost of ownership */
        }

        objective rangeObjective {
            doc /* Maximize driving range */
        }

        objective performanceObjective {
            doc /* Maximize power output */
        }

        objective emissionsObjective {
            doc /* Minimize CO2 emissions */
        }
    }

    // Vehicle definition using powertrain variants
    part def Vehicle {
        doc /* Vehicle with alternative powertrain options */
        part powertrain : Powertrain;
    }

    // Create variant instances
    part electricVehicle : Vehicle {
        part redefines powertrain : ElectricPowertrain;
    }

    part hybridVehicle : Vehicle {
        part redefines powertrain : HybridPowertrain;
    }

    // Analysis instance
    analysis tradeStudy : PowertrainTradeStudy;
}`

export default function TryNexTrade() {
  const [editorCode, setEditorCode] = useState(DEFAULT_TRADE_EXAMPLE)

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img
              src="/assets/icon_nextrade.svg"
              alt="NexTrade"
              style={{height: '60px', width: 'auto', maxWidth: '60px', objectFit: 'contain'}}
            />
            <h1>Try NexTrade</h1>
          </div>
          <p className="page-hero-description">
            Experience trade study management with variant extraction, objective tracking, and decision analysis.
            Define trade studies and variants to see WASM-powered analysis capabilities.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/products/nextrade" className="btn ghost">
              ← Back to NexTrade Details
            </Link>
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="try-yourself-page-grid">
            <div className="editor-column">
              <TryYourselfEditor
                defaultCode={DEFAULT_TRADE_EXAMPLE}
                defaultExample="Vehicle Powertrain Trade Study"
                onCodeChange={setEditorCode}
              />
            </div>
            <div className="documentation-column">
              <TradeStudyView code={editorCode} />
            </div>
          </div>

          <div className="try-yourself-footer">
            <p className="try-yourself-note">
              <strong>NexTrade Features:</strong> WASM-powered trade study extraction, variant analysis,
              objective tracking, decision matrix generation, and automated trade-off analysis.
              Check out the{' '}
              <Link to="/platforms">VS Code Extension</Link> for advanced features.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
