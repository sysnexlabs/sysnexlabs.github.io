import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import './Page.css'

const Methods = () => {
  const highlights = [
    {
      title: 'From Vision to Reality',
      description: 'Precision engineering, customer-driven. We transform product requirements into robust physical architectures through structured, traceable workflows.'
    },
    {
      title: 'Mastering Complexity',
      description: 'Seamlessly bridging systems and software. Our methods connect functional architecture, concept design, and physical realization in one cohesive process.'
    },
    {
      title: 'Architecting the Future',
      description: 'Rigorous workflows, intelligent solutions. From use cases to hardware capabilities, we ensure every requirement is properly allocated and validated.'
    },
    {
      title: 'Innovation in Motion',
      description: 'Where functional excellence meets physical realization. Our tool-supported methodology enables rapid iteration from concept to implementation.'
    },
    {
      title: 'Empowering Development',
      description: 'Structured, traceable, and tool-supported. Every phase—from requirements refinement to software component allocation—is documented and verifiable.'
    },
    {
      title: 'Unlocking Potential',
      description: 'Transforming requirements into robust architectures. Experience the power of systematic decomposition from product use cases to deployable components.'
    }
  ]

  const approaches = [
    {
      title: 'Use Case to Architecture',
      description: 'Systematic transformation from stakeholder requirements through use cases to architectural models. Our approach ensures traceability at every step, from initial requirements capture to detailed system design.',
      items: [
        'Stakeholder analysis and requirements elicitation',
        'Use case modeling and scenario development',
        'Architectural decomposition and allocation',
        'Interface definition and contract specification'
      ]
    },
    {
      title: 'SysML v2 Migration',
      description: 'Structured approach for transitioning from SysML v1 to SysML v2, leveraging textual modeling and modern tooling. We provide transformation patterns and best practices for legacy model migration.',
      items: [
        'Model transformation strategies',
        'Textual vs. graphical modeling trade-offs',
        'Version control and collaboration workflows',
        'Tooling integration and automation'
      ]
    },
    {
      title: 'Functional Safety Integration',
      description: 'MBSE workflows aligned with safety standards including ISO 26262 (automotive), IEC 61508 (industrial), and DO-178C (aerospace). Our methods integrate hazard analysis, safety requirements, and compliance documentation directly into the modeling process.',
      items: [
        'Hazard Analysis and Risk Assessment (HARA)',
        'Safety requirements specification and traceability',
        'Fault tree analysis and FMEA integration',
        'Safety case development and documentation'
      ]
    },
    {
      title: 'Model-to-Code Workflows',
      description: 'Practical approaches for generating and maintaining code from SysML models, ensuring consistency between models and implementation throughout the development lifecycle.',
      items: [
        'Code generation patterns and templates',
        'Round-trip engineering strategies',
        'Model validation and consistency checking',
        'Continuous integration with model artifacts'
      ]
    },
    {
      title: 'AI-Assisted Modeling',
      description: 'Leveraging artificial intelligence to enhance model development, validation, and maintenance. Our methods incorporate AI for requirements analysis, consistency checking, and intelligent traceability.',
      items: [
        'Automated requirements extraction and analysis',
        'Model consistency and completeness validation',
        'Intelligent traceability link generation',
        'Pattern recognition and refactoring suggestions'
      ]
    }
  ]

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <div className="page-header-image">
            <img src="./assets/vmodel_diagram.svg" alt="V-Model with Git-Based SysML v2 Integration" className="header-image" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>MBSE Methodology</h1>
            <p className="page-hero-description">
              Sysnex Labs provides practical, proven methods for adopting Model-Based Systems Engineering 
              with SysML v2. Our methodology bridges the gap between traditional systems engineering and 
              modern software development practices.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <h2 className="section-title">Our Approach</h2>
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
          <h2 className="section-title">Core Methodological Approaches</h2>
          <div className="methods-grid">
            {approaches.map((approach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <h3 className="card-title">{approach.title}</h3>
                  <p className="card-description">{approach.description}</p>
                  <ul className="method-list">
                    {approach.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
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
          <h2 className="section-title">Implementation Approach</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h3 className="benefit-title">Incremental adoption</h3>
              <p className="benefit-description">Start small, scale gradually with proven patterns</p>
            </div>
            <div className="benefit-item">
              <h3 className="benefit-title">Developer-friendly</h3>
              <p className="benefit-description">Textual modeling, Git workflows, and IDE integration</p>
            </div>
            <div className="benefit-item">
              <h3 className="benefit-title">Standards-aligned</h3>
              <p className="benefit-description">Compatible with industry standards and best practices</p>
            </div>
            <div className="benefit-item">
              <h3 className="benefit-title">Tool-agnostic</h3>
              <p className="benefit-description">Methods that work across different toolchains</p>
            </div>
            <div className="benefit-item">
              <h3 className="benefit-title">Practical focus</h3>
              <p className="benefit-description">Real-world applicability over theoretical perfection</p>
            </div>
          </div>
          <p className="page-cta">
            <span>Interested in learning more about our methodology or discussing how it applies to your organization? </span>
            <Link to="/contact">Get in touch</Link>
            <span> to explore collaboration opportunities.</span>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Methods
