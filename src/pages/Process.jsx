import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import './Page.css'

const Process = () => {
  const highlights = [
    {
      title: 'ISO 15288 Mastery',
      description: 'Comprehensive understanding of all 30 process groups across Agreement, Organizational Project-Enabling, Technical Management, and Technical processes. We implement these processes systematically in MBSE workflows.'
    },
    {
      title: 'ISO 26262 Expertise',
      description: 'Deep knowledge of automotive functional safety standard covering all 10 parts from concept phase through production, including ASIL classification, safety goals, and verification methods.'
    },
    {
      title: 'Integrated Approach',
      description: 'Seamlessly combining ISO 15288 system life cycle processes with ISO 26262 functional safety requirements in a unified model-based framework that ensures both engineering rigor and safety compliance.'
    },
    {
      title: 'Tool-Supported Compliance',
      description: 'Our SysML v2 tooling and methodologies are designed to support standards compliance through traceability, documentation generation, and automated verification workflows.'
    }
  ]

  const implementations = [
    {
      title: 'Standards Alignment',
      description: 'We map ISO 15288 technical processes to ISO 26262 safety life cycle phases, ensuring complete traceability from stakeholder needs through safety goals to implementation. Our MBSE approach maintains artifact traceability and supports integrated verification and validation activities.'
    },
    {
      title: 'Model-Based Compliance',
      description: 'SysML models capture both functional and safety requirements with ASIL classification. System architectures show safety mechanisms and their allocation. HARA results are captured in models with traceability to safety goals. Test cases, verification results, and safety metrics are linked to requirements, enabling structured safety case development.'
    },
    {
      title: 'Tool Support',
      description: 'Our tooling provides automated traceability management, ASIL propagation and allocation support, automated documentation generation for safety plans and compliance reports, integrated verification workflows, and change impact analysis for safety requirements.'
    }
  ]

  const value = [
    {
      title: 'Design Compliant Processes',
      description: 'Develop MBSE workflows that align with both standards'
    },
    {
      title: 'Implement Safety Requirements',
      description: 'Translate safety goals into model-based designs with proper ASIL handling'
    },
    {
      title: 'Support Audits and Assessments',
      description: 'Provide evidence and documentation for compliance verification'
    },
    {
      title: 'Train Teams',
      description: 'Educate organizations on standards requirements and best practices'
    },
    {
      title: 'Optimize Workflows',
      description: 'Identify opportunities to streamline processes while maintaining compliance'
    },
    {
      title: 'Integrate Tools',
      description: 'Ensure tooling supports standards requirements effectively'
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
            <h1>Process Excellence &amp; Standards Compliance</h1>
            <p className="page-hero-description">
              <span>SysNex Systems brings deep expertise in international systems engineering and functional safety standards. Our process knowledge spans </span>
              <strong>ISO 15288</strong>
              <span> (Systems and Software Engineering — System Life Cycle Processes) and </span>
              <strong>ISO 26262</strong>
              <span> (Road Vehicles — Functional Safety), enabling organizations to build compliant, safe, and reliable systems through model-based approaches.</span>
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
          <h2 className="section-title">Our Process Implementation Approach</h2>
          <p className="section-subtitle">
            Rather than listing every process detail (which you can find in the standards themselves), we focus on practical implementation:
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
          <h2 className="section-title">What We Bring</h2>
          <p className="section-subtitle">
            Our deep knowledge of ISO 15288 and ISO 26262 enables us to:
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
            <span>Interested in leveraging our process expertise for your organization? </span>
            <Link to="/contact">Contact us</Link>
            <span> to discuss how we can help you achieve ISO 15288 and ISO 26262 compliance through model-based systems engineering.</span>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Process
