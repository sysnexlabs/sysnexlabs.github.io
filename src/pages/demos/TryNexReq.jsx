import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TryYourselfEditor from '../../components/TryYourselfEditor/TryYourselfEditor'
import RequirementsView from '../../components/RequirementsView/RequirementsView'
import '../Page.css'
import '../TryYourself.css'

const DEFAULT_REQUIREMENTS_EXAMPLE = `package 'Vehicle Safety Requirements' {
    doc /*
     * Safety and performance requirements for electric vehicle systems
     */

    private import ScalarValues::*;

    requirement def VehicleSafetyReq {
        doc /*
         * The vehicle must meet all applicable safety standards
         * and regulations for electric vehicles.
         */
        subject v : Vehicle;

        requirement def CrashSafety {
            doc /*
             * Vehicle must achieve 5-star NCAP rating
             */
        }

        requirement def BatteryIntegrity {
            doc /*
             * Battery pack must maintain structural integrity
             * during crash scenarios
             */
        }
    }

    requirement def PerformanceReq {
        doc /*
         * Performance specifications for the vehicle
         */
        subject v : Vehicle;

        requirement def Acceleration {
            doc /*
             * Vehicle must accelerate from 0-100 km/h in under 7.0 seconds
             */
            attribute targetTime : Real = 7.0;
        }

        requirement def Range {
            doc /*
             * Vehicle must achieve minimum range of 400km on single charge
             */
            attribute minRange : Real = 400.0;
        }
    }

    requirement def ChargingReq {
        doc /*
         * Battery charging specifications
         */

        requirement def FastCharge {
            doc /*
             * Must support DC fast charging to 80% in 30 minutes
             */
            attribute chargeTime : Real = 30.0;
            attribute chargeLevel : Real = 80.0;
        }
    }

    part def Vehicle {
        doc /* Electric vehicle definition */

        part battery : Battery;

        attribute topSpeed : Real;
        attribute mass : Real;
    }

    part def Battery {
        doc /* Battery pack definition */
        attribute capacity : Real = 75.0; // kWh
        attribute voltage : Real;
    }

    // Create requirement instances
    requirement vehicleSafety : VehicleSafetyReq;
    requirement performance : PerformanceReq;
    requirement charging : ChargingReq;

    // Create part instances
    part testVehicle : Vehicle;

    // Verification test cases
    verification def CrashTestVerification {
        doc /*
         * Verify crash safety through NCAP testing
         */
        subject v : Vehicle;
    }

    verification def PerformanceTestVerification {
        doc /*
         * Verify acceleration performance on test track
         */
        subject v : Vehicle;
    }

    verification def ChargingTestVerification {
        doc /*
         * Verify battery charging compliance
         */
        subject b : Battery;
    }

    // === REQUIREMENTS TRACEABILITY ===

    // Satisfaction links - connect requirements to implementations
    satisfy vehicleSafety by testVehicle;
    satisfy performance by testVehicle;
    satisfy charging by testVehicle.battery;

    // Verification links - connect requirements to test cases
    verify vehicleSafety by CrashTestVerification;
    verify performance by PerformanceTestVerification;
    verify charging by ChargingTestVerification;
}`

/**
 * NexReq Interactive Demo
 *
 * Requirements management with WASM-powered extraction
 */
export default function TryNexReq() {
  const [editorCode, setEditorCode] = useState(DEFAULT_REQUIREMENTS_EXAMPLE)

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img
              src="/assets/icon_nexreq.svg"
              alt="NexReq"
              style={{height: '60px', width: 'auto', maxWidth: '60px', objectFit: 'contain'}}
            />
            <h1>Try NexReq</h1>
          </div>
          <p className="page-hero-description">
            Experience requirements management with live extraction, traceability analysis, and verification tracking.
            Write SysML v2 requirements and see automatic relationship mapping using WASM parsing.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/products/nexreq" className="btn ghost">
              ← Back to NexReq Details
            </Link>
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="try-yourself-page-grid">
            <div className="editor-column">
              <TryYourselfEditor
                defaultCode={DEFAULT_REQUIREMENTS_EXAMPLE}
                defaultExample="Vehicle Safety Requirements"
                onCodeChange={setEditorCode}
              />
            </div>
            <div className="documentation-column">
              <RequirementsView code={editorCode} />
            </div>
          </div>

          <div className="try-yourself-footer">
            <p className="try-yourself-note">
              <strong>NexReq Features:</strong> WASM-powered requirements extraction, traceability matrix generation,
              satisfy/verify relationship tracking, coverage analysis, and hierarchical requirement views.
              For full requirements management with team collaboration, check out the{' '}
              <Link to="/platforms">VS Code Extension</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
