import React from 'react'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import './Page.css'

const About = () => {
  const competencies = [
    {
      title: 'Model-Based Systems Engineering',
      description: 'Model-based systems engineering across safety-critical domains'
    },
    {
      title: 'Requirements & Process',
      description: 'Requirements, process, and tool harmonization (PMT)'
    },
    {
      title: 'End-to-End Toolchains',
      description: 'End-to-end toolchains, automation, and traceability'
    },
    {
      title: 'Standards Compliance',
      description: 'ISO 15288, ISO 26262, and ASPICE-aligned delivery'
    },
    {
      title: 'Simulation & Architecture',
      description: 'Simulation-led architecture and control integration'
    }
  ]

  const toolchain = [
    {
      title: 'SysML v2 Authoring',
      description: 'SysML v2 authoring in SysIDE with custom automation'
    },
    {
      title: 'CAMEO Systems Modeler',
      description: 'CAMEO Systems Modeler profiles and metamodels'
    },
    {
      title: 'JetBrains MPS / ArchE',
      description: 'JetBrains MPS / ArchE platform workflows'
    },
    {
      title: 'Enterprise Architect',
      description: 'Enterprise Architect integrations for safety and systems teams'
    },
    {
      title: 'ALM Orchestration',
      description: 'ALM orchestration with PTC Integrity, AVW, and Codebeamer'
    }
  ]

  const programming = [
    {
      title: 'Python Automation',
      description: 'Python-first automation for modeling and verification pipelines'
    },
    {
      title: 'Domain-Specific Languages',
      description: 'Domain-specific language development with JetBrains MPS'
    },
    {
      title: 'Enterprise Java',
      description: 'Enterprise-grade tooling and integration in Java'
    },
    {
      title: 'High-Performance Services',
      description: 'High-performance services and language tooling'
    },
    {
      title: 'C++ Integration',
      description: 'Model-to-code bridges and simulation scaffolding in C++'
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
          >
            <h1>About Sysnex Labs</h1>
            <p className="page-hero-description">
              Sysnex Labs unites software engineering excellence with model‑based systems engineering. 
              We design lightweight tooling and practical methods that help organizations adopt SysML v2 – 
              from textual modeling to intelligent analysis, with special focus on functional safety and compliance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="page-intro-grid">
            <SpotlightCard>
              <h3>SysML v2 Language Server</h3>
            </SpotlightCard>
            <SpotlightCard>
              <h3>VS Code integration &amp; Git workflows</h3>
            </SpotlightCard>
            <SpotlightCard>
              <h3>Methodology &amp; transformation from SysML v1 to v2</h3>
            </SpotlightCard>
            <SpotlightCard>
              <h3>AI‑assisted model analysis &amp; traceability</h3>
            </SpotlightCard>
            <SpotlightCard>
              <h3>Functional safety workflows for ISO 26262, IEC 61508, and DO-178C</h3>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <h2 className="section-title">Core Competencies</h2>
          <div className="features-grid">
            {competencies.map((item, index) => (
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
          <h2 className="section-title">Toolchain Expertise</h2>
          <div className="features-grid">
            {toolchain.map((item, index) => (
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

      <section className="page-section-alt">
        <div className="container">
          <h2 className="section-title">Programming &amp; Automation</h2>
          <div className="features-grid">
            {programming.map((item, index) => (
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
    </div>
  )
}

export default About
