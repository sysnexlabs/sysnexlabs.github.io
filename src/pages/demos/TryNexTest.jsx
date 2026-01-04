import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TryYourselfEditor from '../../components/TryYourselfEditor/TryYourselfEditor'
import TestingView from '../../components/TestingView/TestingView'
import '../Page.css'
import '../TryYourself.css'

const DEFAULT_TESTING_EXAMPLE = `package 'Battery Management Testing' {
    doc /*
     * Test suite for battery management system verification
     */

    private import ScalarValues::*;

    part def BatteryManagementSystem {
        doc /* BMS controls charging, monitoring, and safety */
        attribute voltage : Real;
        attribute current : Real;
        attribute temperature : Real;
        attribute stateOfCharge : Real; // 0-100%
    }

    // Safety requirements
    requirement def OverVoltageProtectionReq {
        doc /* BMS must disconnect at >4.2V per cell */
        subject bms : BatteryManagementSystem;
        attribute maxVoltage : Real = 4.2;
    }

    requirement def UnderVoltageProtectionReq {
        doc /* BMS must disconnect at <2.7V per cell */
        subject bms : BatteryManagementSystem;
        attribute minVoltage : Real = 2.7;
    }

    requirement def ThermalProtectionReq {
        doc /* BMS must shut down if temperature exceeds 60°C */
        subject bms : BatteryManagementSystem;
        attribute maxTemp : Real = 60.0;
    }

    requirement def ChargeCycleReq {
        doc /* BMS must complete full charge cycle safely */
        subject bms : BatteryManagementSystem;
    }

    // Requirement instances
    requirement overVoltageProtection : OverVoltageProtectionReq;
    requirement underVoltageProtection : UnderVoltageProtectionReq;
    requirement thermalProtection : ThermalProtectionReq;
    requirement chargeCycle : ChargeCycleReq;

    // Verification cases
    verification def OvervoltageProtectionTest {
        doc /*
         * Verify that BMS disconnects when cell voltage exceeds 4.2V
         *
         * Test procedure:
         * 1. Initialize BMS with nominal voltage (3.7V)
         * 2. Gradually increase voltage to 4.3V
         * 3. Assert that disconnect signal is triggered at 4.2V
         */
        subject testBMS : BatteryManagementSystem;

        objective {
            verify overVoltageProtection;
        }

        // Test steps as actions
        action def TestSetup {
            doc /* Initialize BMS with safe parameters */
        }

        action def ApplyOvervoltage {
            doc /* Apply voltage above threshold */
        }

        action def VerifyDisconnect {
            doc /* Confirm disconnect signal is active */
        }

        action testSetup : TestSetup;
        action applyOvervoltage : ApplyOvervoltage;
        action verifyDisconnect : VerifyDisconnect;
    }

    verification def ThermalShutdownTest {
        doc /*
         * Verify thermal protection activates at 60°C
         */
        subject testBMS : BatteryManagementSystem;

        objective {
            verify thermalProtection;
        }
    }

    verification def ChargeCycleTest {
        doc /*
         * Verify complete charge cycle from 20% to 100%
         *
         * Acceptance criteria:
         * - Charging completes without errors
         * - State of charge reaches 100%
         * - No voltage or temperature violations
         */
        subject testBMS : BatteryManagementSystem;

        objective {
            verify chargeCycle;
        }

        action def InitializeCharge {
            doc /* Set initial SOC to 20% */
        }

        action def PerformCharge {
            doc /* Execute charging algorithm */
        }

        action def ValidateResults {
            doc /* Check final state */
        }

        action initializeCharge : InitializeCharge;
        action performCharge : PerformCharge;
        action validateResults : ValidateResults;
    }

    verification def IntegrationTest {
        doc /*
         * Comprehensive integration test covering multiple scenarios
         */
        subject testBMS : BatteryManagementSystem;

        objective {
            verify overVoltageProtection;
            verify underVoltageProtection;
            verify thermalProtection;
        }
    }

    // Create test BMS instances
    part testBMS1 : BatteryManagementSystem;
    part testBMS2 : BatteryManagementSystem;

    // Satisfaction relationships
    satisfy overVoltageProtection by testBMS1;
    satisfy underVoltageProtection by testBMS1;
    satisfy thermalProtection by testBMS2;
    satisfy chargeCycle by testBMS2;
}`

/**
 * NexTest Interactive Demo
 *
 * Testing and verification with WASM-powered extraction
 */
export default function TryNexTest() {
  const [editorCode, setEditorCode] = useState(DEFAULT_TESTING_EXAMPLE)

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img
              src="/assets/icon_nextest.svg"
              alt="NexTest"
              style={{height: '60px', width: 'auto', maxWidth: '60px', objectFit: 'contain'}}
            />
            <h1>Try NexTest</h1>
          </div>
          <p className="page-hero-description">
            Experience model-based testing with live verification case extraction, test coverage analysis,
            and assertion tracking. Write SysML v2 test cases and see automatic test suite generation using WASM.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/products/nextest" className="btn ghost">
              ← Back to NexTest Details
            </Link>
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="try-yourself-page-grid">
            <div className="editor-column">
              <TryYourselfEditor
                defaultCode={DEFAULT_TESTING_EXAMPLE}
                defaultExample="Battery Management Testing"
                onCodeChange={setEditorCode}
              />
            </div>
            <div className="documentation-column">
              <TestingView code={editorCode} />
            </div>
          </div>

          <div className="try-yourself-footer">
            <p className="try-yourself-note">
              <strong>NexTest Features:</strong> WASM-powered verification extraction, test case generation,
              assertion validation, coverage metrics, scenario analysis, and automated test suite creation.
              For full test automation with CI/CD integration, check out the{' '}
              <Link to="/platforms">VS Code Extension</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
