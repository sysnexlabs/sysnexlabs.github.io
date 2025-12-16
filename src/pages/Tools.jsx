import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import './Page.css'

const Tools = () => {
  const highlights = [
    {
      icon: '🚀',
      title: 'Advanced System Modeling',
      description: 'Native SysML v2 support with syntax highlighting, IntelliSense, and real-time validation. Define complex systems with precise component specifications, interaction points, and bounding boxes—all in textual format.'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Assistant',
      description: 'Integrated AI copilot for planning, context-aware suggestions, and command generation. Automate workflows, generate code, and get intelligent assistance throughout your development process.'
    },
    {
      icon: '📦',
      title: 'Language Server',
      description: 'Lightning-fast SysML v2 Language Server Protocol (LSP). Get instant autocomplete, error detection, and semantic understanding of your models as you type.'
    },
    {
      icon: '🔗',
      title: 'Git Integration',
      description: 'Full version control for SysML models. Branch-based workflows, pull requests for model reviews, and seamless collaboration. Your models are code—treat them as such.'
    },
    {
      icon: '⚡',
      title: 'Real-Time Feedback',
      description: 'Instant validation, syntax checking, and error detection. See line numbers, encoding info, and warnings in real-time. Know immediately when something needs attention.'
    },
    {
      icon: '🎯',
      title: 'Multi-Language Support',
      description: 'Support for SysML, Sphinx Docs, Prettier, and more. One environment for modeling, documentation, and code generation—no context switching required.'
    }
  ]

  const features = [
    {
      title: 'VS Code Integration',
      description: 'Our tools are built as first-class VS Code extensions, providing a seamless development experience. The familiar interface you know, enhanced with systems engineering superpowers.',
      items: [
        'Native VS Code extension with full LSP support',
        'Syntax highlighting and code formatting for SysML v2',
        'Integrated file explorer for project navigation',
        'Multi-panel layout for code, AI assistant, and documentation',
        'Status bar integration showing language, encoding, and Git status'
      ]
    },
    {
      title: 'AI Assistant &amp; Copilot',
      description: 'Intelligent assistance that understands your SysML models and helps you build better systems faster. Plan, generate, and iterate with AI-powered suggestions.',
      items: [
        'Context-aware code generation and suggestions',
        'Command generation for common workflows',
        'Planning assistance for system architecture',
        'Chat interface for interactive development',
        'Past chat history for workflow continuity'
      ]
    },
    {
      title: 'SysML v2 Language Server',
      description: 'Our LSP provides lightning-fast language support for SysML v2, bringing modern IDE features to systems modeling.',
      items: [
        'Real-time syntax validation and error detection',
        'IntelliSense autocomplete for SysML v2 keywords and types',
        'Go-to-definition and find-references navigation',
        'Semantic understanding of models and relationships',
        'Quick fixes and refactoring suggestions'
      ]
    },
    {
      title: 'Git-Based Workflows',
      description: "Version control isn't just for code—it's essential for models too. Our tools make Git workflows natural for SysML v2 development.",
      items: [
        'Branch-based development for model features',
        'Pull request workflows for model reviews',
        'Merge conflict resolution for textual models',
        'Commit history and blame for traceability',
        'Integration with GitHub, GitLab, and other platforms'
      ]
    },
    {
      title: 'Code Generation &amp; Round-Trip',
      description: 'Generate code from models and maintain consistency. Our tools support model-to-code workflows with validation and synchronization.',
      items: [
        'Automated code generation from SysML models',
        'Round-trip engineering support',
        'Template-based code generation',
        'Validation of generated code against models',
        'CI/CD integration for automated builds'
      ]
    }
  ]

  const experience = [
    {
      title: 'Textual Modeling',
      description: 'Write SysML v2 in plain text files—no complex GUI tools required'
    },
    {
      title: 'IDE-Native',
      description: 'All the features you expect from a modern IDE: autocomplete, error checking, refactoring'
    },
    {
      title: 'AI-Enhanced',
      description: 'Get intelligent suggestions and automation throughout your workflow'
    },
    {
      title: 'Version Controlled',
      description: 'Use Git for branching, merging, and collaboration on models'
    },
    {
      title: 'Fast &amp; Responsive',
      description: 'Built for performance that keeps up with your thinking'
    },
    {
      title: 'Extensible',
      description: 'Plugin architecture for custom tools and integrations'
    }
  ]

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <div className="page-header-image">
            <img src="./assets/tools_header.svg" alt="VS Code Development Environment" className="header-image" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Development Tools &amp; Environment</h1>
            <p className="page-hero-description">
              SysNex Systems provides a complete, AI-augmented development environment for SysML v2 modeling. 
              Our tooling integrates seamlessly with VS Code, Git, and modern development workflows, bringing 
              systems engineering into the 21st century.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
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
                  <div className="card-icon" aria-hidden="true">{highlight.icon}</div>
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
          <h2 className="section-title">IDE Features</h2>
          <div className="methods-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
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

      <section className="page-content-section">
        <div className="container">
          <h2 className="section-title">Development Experience</h2>
          <p className="section-subtitle">
            Our tools are designed for the modern systems engineer who wants to work like a software developer:
          </p>
          <div className="benefits-grid">
            {experience.map((item, index) => (
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
            <span>Ready to experience modern MBSE tooling? </span>
            <Link to="/contact">Get in touch</Link>
            <span> to learn more about our tools and how they can transform your systems engineering workflow.</span>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Tools
