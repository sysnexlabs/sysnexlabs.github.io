import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import './Page.css'

const Process = () => {
  const highlights = [
    {
      title: 'ISO 15288 Foundation',
      description: 'Strong understanding of system life cycle processes across Agreement, Organizational Project-Enabling, Technical Management, and Technical processes. Our tooling supports these processes in MBSE workflows.'
    },
    {
      title: 'ISO 26262 Understanding',
      description: 'Good knowledge of automotive functional safety standard covering concept phase through production, including ASIL classification, safety goals, and verification methods. Not certified or audit-validated.'
    },
    {
      title: 'Integrated Tooling Approach',
      description: 'Building tooling that combines ISO 15288 system life cycle processes with ISO 26262 functional safety requirements in a model-based framework. Early-stage implementation, not production-validated.'
    },
    {
      title: 'Tool-Supported Compliance (Beta)',
      description: 'Our SysML v2 tooling is designed to support standards compliance through traceability, documentation generation, and automated verification workflows. Features in development, not audit-ready.'
    }
  ]

  const implementations = [
    {
      title: 'Standards Alignment (In Development)',
      description: 'Scope: Building tooling to map ISO 15288 technical processes to ISO 26262 safety life cycle phases. Goal is traceability from stakeholder needs through safety goals to implementation. Not validated in production programs.'
    },
    {
      title: 'Model-Based Compliance (Beta)',
      description: 'Scope: SysML models can capture functional and safety requirements with ASIL classification. Experimenting with safety mechanism modeling, HARA result capture, and traceability. Not audit-tested or certified for compliance use.'
    },
    {
      title: 'Tool Support (Planned Features)',
      description: 'Scope: Working on automated traceability management, ASIL propagation support, documentation generation for safety plans, and change impact analysis. Early prototypes exist, not production-ready for audits.'
    }
  ]

  const value = [
    {
      title: 'Tooling for Compliant Workflows',
      description: 'Building MBSE tools designed to align with standards (not consulting services)'
    },
    {
      title: 'Safety Modeling Features',
      description: 'Tools to capture safety goals and ASIL handling in models (experimental)'
    },
    {
      title: 'Documentation Generation',
      description: 'Automated evidence and documentation for compliance workflows (beta)'
    },
    {
      title: 'Self-Service Standards Support',
      description: 'Tool features and documentation, not training or consulting'
    },
    {
      title: 'Workflow Automation',
      description: 'Features to streamline compliance processes through tooling (in development)'
    },
    {
      title: 'Standards-Aware IDE',
      description: 'LSP and editor features that understand standards structures (production-ready)'
    }
  ]

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <div className="page-header-image">
            <img src="./assets/process_header.svg" alt="Process Landscape" className="header-image" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Standards-Aware Tooling</h1>
            <p className="page-hero-description">
              <span>SysNex Systems builds SysML v2 tooling designed with </span>
              <strong>ISO 15288</strong>
              <span> (Systems and Software Engineering) and </span>
              <strong>ISO 26262</strong>
              <span> (Automotive Functional Safety) awareness. Our tools help teams model compliant systems—we're not consultants or auditors, just building better MBSE tooling with standards support.</span>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <h2 className="section-title">Standards Expertise</h2>
          <div className="features-grid">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <h3 className="card-title">{highlight.title}</h3>
                  <p className="card-description">{highlight.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <h2 className="section-title">Our Standards Support Approach</h2>
          <p className="section-subtitle">
            We're building tooling features to support these standards, not offering consulting. Here's what we're working on:
          </p>
          <div className="methods-grid">
            {implementations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <h2 className="section-title">Tool Capabilities (Not Services)</h2>
          <p className="section-subtitle">
            Our understanding of ISO 15288 and ISO 26262 enables us to build tools that:
          </p>
          <div className="benefits-grid">
            {value.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="benefit-item">
                  <h3 className="benefit-title">{item.title}</h3>
                  <p className="benefit-description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="page-cta">
            <span>Interested in trying our standards-aware tooling? </span>
            <Link to="/try-yourself">Try it yourself</Link>
            <span> or </span>
            <Link to="/contact">apply for beta access</Link>
            <span> to our compliance features.</span>
          </p>
        </div>
      </section>

      {/* Honest Disclaimers Section */}
      <section className="page-section-alt" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We ARE vs What We're NOT</h2>
            <p className="section-subtitle">
              We're a tooling company, not a consulting firm. Here's what that means:
            </p>
          </div>
          <div className="methods-grid" style={{ marginTop: '2rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SpotlightCard>
                <h3 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>✅ What We ARE</h3>
                <ul className="method-list">
                  <li>✅ Building SysML v2 IDE with standards awareness</li>
                  <li>✅ Researching ISO 15288 and ISO 26262 to build better tools</li>
                  <li>✅ Creating features for traceability and documentation</li>
                  <li>✅ Early-stage beta testing with design partners</li>
                  <li>✅ Open about limitations and development status</li>
                </ul>
              </SpotlightCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SpotlightCard>
                <h3 style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>❌ What We're NOT</h3>
                <ul className="method-list no-bullets">
                  <li>❌ Not certified ASPICE assessors or ISO 26262 auditors</li>
                  <li>❌ Not offering consulting or training services</li>
                  <li>❌ Not validated by TÜV or compliance authorities</li>
                  <li>❌ Not claiming production-tested compliance tooling</li>
                  <li>❌ Not experts—just good understanding from research</li>
                </ul>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Process
