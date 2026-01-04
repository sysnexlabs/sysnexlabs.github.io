import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TryYourselfEditor from '../../components/TryYourselfEditor/TryYourselfEditor'
import DiagramView from '../../components/DiagramView/DiagramView'
import '../Page.css'
import '../TryYourself.css'

const DEFAULT_DIAGRAM_EXAMPLE = `package 'Autonomous Vehicle System' {
    doc /*
     * Block definition diagram example for autonomous vehicle
     */

    private import ScalarValues::*;

    // Interface definitions for connections
    interface def DataInterface {
        end dataIn;
        end dataOut;
    }

    interface def PowerInterface {
        end powerIn;
        end powerOut;
    }

    part def AutonomousVehicle {
        doc /* Main vehicle system with autonomous capabilities */

        part perceptionSystem : PerceptionSystem;
        part planningSystem : PlanningSystem;
        part controlSystem : ControlSystem;
        part powerSystem : PowerSystem;
    }

    part def PerceptionSystem {
        doc /* Sensor fusion and environment perception */

        part lidarSensor : LidarSensor;
        part cameraSensor : CameraSensor;
        part radarSensor : RadarSensor;

        port sensorData : DataInterface;

        attribute range : Real = 200.0; // meters
    }

    part def PlanningSystem {
        doc /* Path planning and decision making */

        port environmentData : DataInterface;
        port trajectory : DataInterface;

        part routePlanner : RoutePlanner;
        part behaviorPlanner : BehaviorPlanner;
        part motionPlanner : MotionPlanner;
    }

    part def ControlSystem {
        doc /* Vehicle dynamics control */

        port pathInput : DataInterface;

        part steering : SteeringControl;
        part throttle : ThrottleControl;
        part braking : BrakingControl;
    }

    part def PowerSystem {
        doc /* Electric powertrain */

        part battery : Battery;
        part motor : Motor;
        part inverter : Inverter;
    }

    // Supporting definitions
    part def LidarSensor {
        doc /* Light Detection and Ranging sensor */
    }

    part def CameraSensor {
        doc /* Visual perception camera */
    }

    part def RadarSensor {
        doc /* Radio Detection and Ranging sensor */
    }

    part def RoutePlanner {
        doc /* High-level route planning */
    }

    part def BehaviorPlanner {
        doc /* Behavioral decision making */
    }

    part def MotionPlanner {
        doc /* Low-level motion planning */
    }

    part def SteeringControl {
        doc /* Steering actuator control */
    }

    part def ThrottleControl {
        doc /* Throttle control system */
    }

    part def BrakingControl {
        doc /* Brake system control */
    }

    part def Battery {
        doc /* High-voltage battery pack */
        port output : PowerInterface;
        attribute capacity : Real = 75.0; // kWh
    }

    part def Motor {
        doc /* Electric propulsion motor */
        port input : PowerInterface;
        attribute power : Real = 150.0; // kW
    }

    part def Inverter {
        doc /* DC to AC power inverter */
        port input : PowerInterface;
        port output : PowerInterface;
    }

    // State machine for autonomous mode
    state def AutonomousMode {
        doc /* Autonomous driving operational modes */

        entry; then initialization;

        state initialization {
            doc /* System initialization and self-tests */
        }

        state ready {
            doc /* Ready to drive, waiting for command */
        }

        state driving {
            doc /* Active autonomous driving */
        }

        state parking {
            doc /* Parking maneuver in progress */
        }

        state emergency {
            doc /* Emergency stop activated */
        }

        transition first initialization
            accept systemsReady
            then ready;

        transition ready
            accept startDriving
            then driving;

        transition driving
            accept destinationReached
            then parking;

        transition driving
            accept obstacleDetected
            then emergency;
    }

    // Activity diagram for planning cycle
    action def PlanningCycle {
        doc /* Main planning loop */

        action acquireSensorData {
            out sensorData;
        }

        action processSensorData {
            in rawData;
            out environmentModel;
        }

        action planPath {
            in environment;
            out trajectory;
        }

        action executeControl {
            in trajectory;
        }

        // Control flow
        first start;
        then acquireSensorData;
        then processSensorData;
        then planPath;
        then executeControl;
    }
}`

/**
 * NexViz Interactive Demo
 *
 * Diagram visualization with WASM-powered element extraction
 */
export default function TryNexViz() {
  const [editorCode, setEditorCode] = useState(DEFAULT_DIAGRAM_EXAMPLE)

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img
              src="/assets/icon_nexviz.svg"
              alt="NexViz"
              style={{height: '60px', width: 'auto', maxWidth: '60px', objectFit: 'contain'}}
            />
            <h1>Try NexViz</h1>
          </div>
          <p className="page-hero-description">
            Experience SysML v2 diagram visualization with live element extraction and relationship mapping.
            Write structural or behavioral models and see automatic diagram data generation using WASM.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/products/nexviz" className="btn ghost">
              ← Back to NexViz Details
            </Link>
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="try-yourself-page-grid">
            <div className="editor-column">
              <TryYourselfEditor
                defaultCode={DEFAULT_DIAGRAM_EXAMPLE}
                defaultExample="Autonomous Vehicle System"
                onCodeChange={setEditorCode}
              />
            </div>
            <div className="documentation-column">
              <DiagramView code={editorCode} />
            </div>
          </div>

          <div className="try-yourself-footer">
            <p className="try-yourself-note">
              <strong>NexViz Features:</strong> WASM-powered element extraction, automatic BDD/IBD/State/Activity diagram generation,
              relationship mapping, interactive graph visualization, and export to multiple formats.
              For full diagram editing with drag-and-drop and bidirectional sync, check out the{' '}
              <Link to="/platforms">VS Code Extension</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
