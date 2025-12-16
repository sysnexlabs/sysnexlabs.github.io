import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import './Page.css'

const OwnTooling = () => {
  const officeFeatures = [
    {
      icon: '📝',
      title: 'Word → Documentation Editor',
      description: 'Click-to-edit descriptions, form-based part creation, drag-and-drop reordering, PDF/HTML export, and ASPICE work product templates. 92% complete with 53 React components.',
      items: [
        'Word-style inline editing',
        'Insert → Table style forms',
        '20/20 ASPICE work products',
        'Export to PDF/HTML/Word'
      ]
    },
    {
      icon: '📊',
      title: 'Excel → Requirements Manager',
      description: 'Codebeamer-level features with table views, traceability matrices, analytics dashboards, workflow management, and Excel/CSV/ReqIF export. 93% complete with 62.9K lines of backend code.',
      items: [
        'Excel-like sort, filter, search',
        'Pivot table traceability',
        'Workflow state management',
        'Export to Excel/CSV/ReqIF'
      ]
    },
    {
      icon: '📊',
      title: 'Excel → Test Management',
      description: 'Test case tracking with execution status, coverage matrices, test suite management, and requirement linking. 95% complete with full backend and frontend.',
      items: [
        'Excel test plan sheets',
        'Pass/Fail/In Progress tracking',
        'Coverage matrix visualization',
        'Test suite organization'
      ]
    },
    {
      icon: '📊',
      title: 'Excel → Trade Study Analysis',
      description: 'Compare design alternatives with ranking charts, Pareto frontiers, AHP weight calculation, and live recalculation. 95% complete with interactive visualizations.',
      items: [
        'Alternative comparison tables',
        'Ranking charts with objectives',
        'Pareto frontier visualization',
        'What-if analysis with live updates'
      ]
    },
    {
      icon: '📊',
      title: 'Power BI → Analytics Dashboard',
      description: 'Comprehensive quality metrics, coverage analytics, complexity analysis, and relationship metrics with interactive drill-down. 100% complete with all LSP commands working.',
      items: [
        'Quality KPIs and metrics',
        'Coverage pie/bar charts',
        'Complexity analysis',
        'Interactive drill-down'
      ]
    },
    {
      icon: '🎨',
      title: 'Visio → Diagram Editor',
      description: 'Professional diagramming with 7 diagram types, interactive canvas, bidirectional sync, ELK.js layouts, and Cameo Modeler-level features. 95% complete.',
      items: [
        '7 diagram types (BDD, IBD, Activity, etc.)',
        'Drag-and-drop canvas editing',
        'Bidirectional code sync',
        'Export PNG/SVG/PDF/SysON'
      ]
    },
    {
      icon: '📔',
      title: 'OneNote → Hub Manager',
      description: 'Browse and organize model elements with tree navigation, quick actions, search, and recent items. 100% complete.',
      items: [
        'Tree navigation (OneNote sections)',
        'Quick actions and shortcuts',
        'Global element search',
        'Recent items quick access'
      ]
    },
    {
      icon: '📋',
      title: 'Project → Workflow Management',
      description: 'Track requirement and test workflows with state machines, transitions, history, and approval workflows. 100% complete.',
      items: [
        'Visual workflow states',
        'State transitions with approvals',
        'Complete change history',
        'Draft → Review → Approved → Verified'
      ]
    }
  ]

  const threeClickTasks = [
    { task: 'Add requirement', office: 'Excel: Insert row', clicks: '2', how: '[+ Add] → Type → Done' },
    { task: 'Edit description', office: 'Word: Click text', clicks: '2', how: 'Click → Type → Auto-save' },
    { task: 'Create diagram', office: 'Visio: New diagram', clicks: '3', how: '[+ Diagram] → Pick type → Done' },
    { task: 'Link requirement', office: 'Excel: Link cells', clicks: '2', how: 'Click → Drag to target' },
    { task: 'Track test', office: 'Excel: Update status', clicks: '2', how: 'Click status → Select' }
  ]

  const statusPhases = [
    {
      title: 'Phase 1: Core Office Suite',
      badge: '✅ 100% Complete',
      description: 'All standard Office application mappings (Word, Excel, Power BI, Visio, OneNote, Project) are working.'
    },
    {
      title: 'Phase 2: Advanced Excel Features',
      badge: '✅ 100% Complete',
      description: 'Test Management and Trade Study Analysis frontend UIs are fully implemented.'
    },
    {
      title: 'Phase 3: Office Extensions',
      badge: '✅ 95% Complete',
      description: 'VS Code integration, simulation engine, constraint solver, ISO 15288 frameworks, and ASPICE work products.'
    },
    {
      title: 'Phase 4: Syntax Killers',
      badge: '✅ 100% Complete',
      description: 'All 10 advanced form widgets implemented (Type Picker, Multiplicity Editor, Unit Selector, etc.).'
    }
  ]

  const architectureItems = [
    {
      title: 'Backend Infrastructure',
      items: [
        '43 production-ready crates (271K lines)',
        'LSP protocol integration',
        'Salsa incremental computation',
        'Full SysML v2 library support (~10K types)'
      ]
    },
    {
      title: 'React Frontend',
      items: [
        '100+ React components',
        'Shared design system',
        'Bidirectional LSP sync',
        'Office-like UX patterns'
      ]
    },
    {
      title: 'Multi-Platform',
      items: [
        'VS Code Extension (85% complete)',
        'Tauri Desktop App (75% parity)',
        'SaaS by SysNex Systems (40% foundation)'
      ]
    }
  ]

  const beyondFeatures = [
    {
      icon: '⚡',
      title: 'Simulation Engine',
      description: 'State machine execution, action execution, time-based simulation, and debugging support. 95% complete.'
    },
    {
      icon: '🔒',
      title: 'Constraint Solver',
      description: 'Full OCL 2.5 compliance with Z3 integration for constraint validation and satisfaction analysis. 100% complete.'
    },
    {
      icon: '💻',
      title: 'Code Generation',
      description: 'Template-based generation for C++, Python, Simulink, and build configs. 85% complete with LSP integration.'
    },
    {
      icon: '🔧',
      title: 'ISO 15288 Frameworks',
      description: '6 systems engineering frameworks (Analysis, Risk, Decision, Design, Implementation, Planning). 80-95% complete.'
    },
    {
      icon: '🔧',
      title: 'ASPICE Work Products',
      description: 'All 20 ASPICE work products with template engine, HIR extraction, and multi-format export. 100% complete.'
    },
    {
      icon: '🔧',
      title: 'Domain Extensions',
      description: 'VSS, YAML Architecture, UVL variability, and Python bindings. 90-95% complete across extensions.'
    }
  ]

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="office-suite-hero"
          >
            <div className="page-header-image">
              <img src="./assets/tools_header.svg" alt="SysML v2 Office Suite" className="header-image" />
            </div>
            <h1>SysML v2 Office Suite</h1>
            <p className="page-hero-description">
              Make SysML v2 as Easy as Microsoft Office. Transform systems modeling into familiar Office Suite interfaces—Word, Excel, Power BI, Visio, OneNote, and Project—where every common task takes 3 clicks or fewer.
            </p>
            <div className="vision-statement">
              <blockquote>
                <p>"Because systems engineers should focus on systems, not syntax."</p>
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <h2 className="section-title">Office Suite Feature Mapping</h2>
          <div className="features-grid">
            {officeFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <div className="card-icon" aria-hidden="true">{feature.icon}</div>
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-description">{feature.description}</p>
                  <ul className="method-list">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <h2 className="section-title">The 3-Click Rule</h2>
          <p className="section-subtitle">
            Every common task takes 3 clicks or fewer, just like Office:
          </p>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Office Equivalent</th>
                  <th>Clicks</th>
                  <th>How</th>
                </tr>
              </thead>
              <tbody>
                {threeClickTasks.map((row, index) => (
                  <tr key={index}>
                    <td>{row.task}</td>
                    <td>{row.office}</td>
                    <td>{row.clicks}</td>
                    <td>{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <h2 className="section-title">Implementation Status</h2>
          <p className="section-subtitle">
            The SysML v2 Office Suite is 95% production-ready with all core Office application mappings complete:
          </p>
          <div className="status-grid">
            {statusPhases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <h3 className="card-title">{phase.title}</h3>
                  <p className="status-badge">{phase.badge}</p>
                  <p className="card-description">{phase.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <h2 className="section-title">Technical Architecture</h2>
          <p className="section-subtitle">
            Built on our infrastructure with 90% leverage of existing components:
          </p>
          <div className="architecture-grid">
            {architectureItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <h3 className="card-title">{item.title}</h3>
                  <ul className="method-list">
                    {item.items.map((listItem, itemIndex) => (
                      <li key={itemIndex}>{listItem}</li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <h2 className="section-title">Beyond Office: Advanced Features</h2>
          <p className="section-subtitle">
            SysML v2 requires capabilities beyond standard Office applications:
          </p>
          <div className="features-grid">
            {beyondFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <div className="card-icon" aria-hidden="true">{feature.icon}</div>
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-description">{feature.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <h2 className="section-title">Performance Targets</h2>
          <p className="section-subtitle">
            Office-like responsiveness with professional-grade performance:
          </p>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h3 className="benefit-title">Common operations</h3>
              <p className="benefit-description">&lt;50ms (P95)</p>
            </div>
            <div className="benefit-item">
              <h3 className="benefit-title">Complex analysis</h3>
              <p className="benefit-description">&lt;200ms (P95)</p>
            </div>
            <div className="benefit-item">
              <h3 className="benefit-title">Diagram rendering (50 nodes)</h3>
              <p className="benefit-description">&lt;300ms</p>
            </div>
            <div className="benefit-item">
              <h3 className="benefit-title">Export generation</h3>
              <p className="benefit-description">&lt;2s for typical files</p>
            </div>
          </div>
          <p className="page-cta">
            <span>Ready to experience SysML v2 as easy as Office? </span>
            <Link to="/contact">Get in touch</Link>
            <span> to learn more about the Office Suite Vision and how it can transform your systems engineering workflow.</span>
          </p>
        </div>
      </section>
    </div>
  )
}

export default OwnTooling

