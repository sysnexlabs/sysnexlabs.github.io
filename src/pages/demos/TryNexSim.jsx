import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TryYourselfEditor from '../../components/TryYourselfEditor/TryYourselfEditor'
import SimulationView from '../../components/SimulationView/SimulationView'
import '../Page.css'
import '../TryYourself.css'

const DEFAULT_SIM_EXAMPLE = `package 'Battery Charging Simulation' {
    doc /*
     * Simulation of battery charging behavior
     */

    private import ScalarValues::*;

    calc def ChargingTime {
        in batteryCapacity : Real;
        in chargerPower : Real;
        return chargingTime : Real = batteryCapacity / chargerPower;
    }

    calc def StateOfCharge {
        in currentCharge : Real;
        in capacity : Real;
        return soc : Real = (currentCharge / capacity) * 100.0;
    }

    action def ChargingCycle {
        doc /* Simulate battery charging process */

        in initialSOC : Real = 20.0; // %
        in targetSOC : Real = 80.0; // %
        in chargePower : Real = 50.0; // kW

        action monitorVoltage {
            out voltage : Real;
        }

        action monitorCurrent {
            out current : Real;
        }

        action controlCharging {
            in targetPower : Real;
            out actualPower : Real;
        }

        // Simulation flow
        first start;
        then monitorVoltage;
        then monitorCurrent;
        then controlCharging;
    }

    state def ChargingState {
        doc /* State machine for charge controller */

        entry; then idle;

        state idle {
            doc /* Waiting for charging to begin */
        }

        state precharge {
            doc /* Initial precharge phase */
        }

        state constantCurrent {
            doc /* Constant current charging phase */
        }

        state constantVoltage {
            doc /* Constant voltage charging phase */
        }

        state complete {
            doc /* Charging complete */
        }

        transition first idle
            accept plugInDetected
            then precharge;

        transition precharge
            accept prechargeDone
            then constantCurrent;

        transition constantCurrent
            accept voltageReached
            then constantVoltage;

        transition constantVoltage
            accept chargeComplete
            then complete;
    }

    part def Battery {
        doc /* Battery system with charging simulation */
        attribute capacity : Real = 75.0; // kWh
        attribute currentCharge : Real;
        attribute voltage : Real;
        attribute current : Real;

        // Calculation usages
        calc chargingTime : ChargingTime;
        calc soc : StateOfCharge;
    }

    // Action instances for simulation
    action chargeCycle : ChargingCycle;

    // Part instances
    part mainBattery : Battery;
}`

export default function TryNexSim() {
  const [editorCode, setEditorCode] = useState(DEFAULT_SIM_EXAMPLE)

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img
              src="/assets/icon_nexsim.svg"
              alt="NexSim"
              style={{height: '60px', width: 'auto', maxWidth: '60px', objectFit: 'contain'}}
            />
            <h1>Try NexSim</h1>
          </div>
          <p className="page-hero-description">
            Experience behavioral simulation with calculation extraction, state machine visualization, and action flow analysis.
            Define calculations and behaviors to see WASM-powered simulation capabilities.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/products/nexsim" className="btn ghost">
              ← Back to NexSim Details
            </Link>
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="try-yourself-page-grid">
            <div className="editor-column">
              <TryYourselfEditor
                defaultCode={DEFAULT_SIM_EXAMPLE}
                defaultExample="Battery Charging Simulation"
                onCodeChange={setEditorCode}
              />
            </div>
            <div className="documentation-column">
              <SimulationView code={editorCode} />
            </div>
          </div>

          <div className="try-yourself-footer">
            <p className="try-yourself-note">
              <strong>NexSim Features:</strong> WASM-powered calculation extraction, behavioral analysis,
              state machine simulation, activity flow visualization, and parametric execution.
              Check out the{' '}
              <Link to="/platforms">VS Code Extension</Link> for advanced simulation features.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
