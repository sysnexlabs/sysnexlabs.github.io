import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import './Page.css'

const Product = () => {
  const differentiators = [
    {
      icon: '🚀',
      title: 'Multi-Platform Delivery',
      description: 'Available as VS Code Extension (50M+ users), Tauri App, and SaaS by SysNex Systems. Choose the deployment that fits your workflow.',
      tags: ['50M+ Users', 'Zero Learning Curve', 'Cross-Platform']
    },
    {
      icon: '🤖',
      title: 'AI-First Architecture',
      description: 'Built-in GitHub Copilot, Claude Code, and VS Code AI integration. 40-60% faster model creation with intelligent assistance.',
      tags: ['GitHub Copilot', 'Claude Code', 'VS Code AI']
    },
    {
      icon: '⚡',
      title: '10x Performance',
      description: '<50ms LSP response vs. 200-500ms for legacy Java-based tools. Built for enterprise-scale performance with native compiled architecture.',
      tags: ['<50ms Response', 'Native Backend', '40x Faster Search']
    },
    {
      icon: '🔀',
      title: 'Git-Native Workflows',
      description: 'Native version control, branching, CI/CD workflows. Treat models like code with full Git support—no proprietary SCM required.',
      tags: ['Native Git', 'CI/CD Ready', 'Pull Requests']
    },
    {
      icon: '🛡️',
      title: 'Multi-Industry Compliance',
      description: '11 variants from Essential (free) to Automotive/Aviation/Medical/Railway. ISO 15288, ASPICE, ISO 26262, DO-178C support.',
      tags: ['ISO 15288', 'ASPICE 100%', 'ISO 26262']
    },
    {
      icon: '📊',
      title: 'Enterprise Analytics',
      description: 'Comprehensive quality metrics, coverage analytics, complexity analysis. Power BI-style dashboards with interactive drill-down.',
      tags: ['Quality Metrics', 'Coverage Analytics', 'Real-Time']
    }
  ]

  const platforms = [
    {
      icon: '💻',
      title: 'VS Code Extension',
      description: 'Native VS Code extension with full LSP integration. Seamlessly integrates into your existing development workflow.',
      features: [
        'Install from VS Code Marketplace',
        'Zero configuration required',
        'Works with 50M+ VS Code users',
        'Full Git integration',
        'AI integration (Copilot, Claude, VS Code AI)',
        'Cross-platform (Windows, macOS, Linux)'
      ],
      status: '✅ Production-Ready',
      featured: true
    },
    {
      icon: '🖥️',
      title: 'Tauri App',
      description: 'Native desktop application built with Tauri for maximum performance and offline capability.',
      features: [
        'Native desktop performance',
        'Fully offline capable',
        'No VS Code installation required',
        'Smaller footprint than Electron',
        'Same LSP backend as VS Code extension',
        'Cross-platform (Windows, macOS, Linux)'
      ],
      status: '🚧 Coming Soon'
    },
    {
      icon: '☁️',
      title: 'SaaS by SysNex Systems',
      description: 'Web-based IDE accessible from any browser. Real-time collaboration, cloud storage, and zero-install deployment.',
      features: [
        'Access from any browser',
        'Real-time collaboration',
        'Cloud-based model storage',
        'Zero installation required',
        'Same features as desktop versions',
        'Enterprise SSO integration'
      ],
      status: '🚧 Coming Soon'
    }
  ]

  const lspFeatures = [
    { icon: '✨', title: 'Autocompletion', description: 'Context-aware completion with ~10K library types', metric: '~30ms' },
    { icon: '🔍', title: 'Code Navigation', description: 'Go-to-definition, find references, type hierarchy', metric: '~15-20ms' },
    { icon: '⚠️', title: 'Real-time Diagnostics', description: '25+ diagnostic collectors with live validation', metric: '~80ms' },
    { icon: '💡', title: 'Hover Information', description: 'Rich documentation with library integration', metric: '~15ms' },
    { icon: '🎨', title: 'Document Formatting', description: 'Full file and range formatting with preservation', metric: '~50ms' },
    { icon: '🔧', title: 'Code Actions', description: 'Quick fixes and refactoring assistance', metric: 'Instant' },
    { icon: '🎯', title: 'Semantic Highlighting', description: '43 token types with syntax classification', metric: '98%' },
    { icon: '📋', title: 'Document Symbols', description: 'Hierarchical outline with workspace search', metric: '~25ms' },
    { icon: '✏️', title: 'Rename Symbol', description: 'Multi-file renaming with conflict detection', metric: '~40ms' },
    { icon: '📝', title: 'Inlay Hints', description: 'Type annotations and parameter hints', metric: '~35ms' },
    { icon: '📞', title: 'Signature Help', description: 'Function signatures with full HIR traversal', metric: '90%' },
    { icon: '🌳', title: 'Call & Type Hierarchy', description: 'Relationship navigation and tree views', metric: '95%' }
  ]

  const variants = [
    {
      badge: 'Free',
      title: '🔹 Essential',
      size: '~25 MB',
      description: 'Core LSP features: completion, diagnostics, navigation, formatting. Perfect for CI/CD pipelines and lightweight environments.',
      features: [
        'Core LSP Protocol',
        'Syntax Highlighting',
        'Code Navigation',
        'Real-time Diagnostics'
      ],
      status: '✅ Production-Ready',
      cta: 'Download Free',
      essential: true
    },
    {
      badge: 'Recommended',
      title: '🔷 Standard',
      size: '~35-40 MB',
      description: 'Complete professional IDE: all LSP features, documentation, model explorer, requirements, diagrams, analytics.',
      features: [
        'Everything in Essential',
        'Documentation Viewer',
        'Requirements Manager',
        'Diagram Editor',
        'Analytics Dashboard'
      ],
      status: '✅ Production-Ready',
      cta: 'Get License',
      featured: true
    },
    {
      badge: 'Enterprise',
      title: '🔶 Platform',
      size: '~50-60 MB',
      description: 'Enterprise platform with domain extensions: VSS, YAML Architecture, UVL variability, Python bindings.',
      features: [
        'Everything in Standard',
        'VSS Integration',
        'YAML Architecture',
        'UVL Variability',
        'Python Bindings'
      ],
      status: '✅ Production-Ready',
      cta: 'Contact Sales'
    },
    {
      badge: 'Default',
      title: '🟣 Platform-Full',
      size: '~60-70 MB',
      description: 'All features including constraints, execution engine, ASPICE work products. Maximum compatibility and feature set.',
      features: [
        'Everything in Platform',
        'Constraint Solver (OCL 2.5)',
        'Execution Engine',
        'ASPICE Work Products',
        'Simulation Support'
      ],
      status: '✅ Production-Ready',
      cta: 'Download Free'
    }
  ]

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="page-hero-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="product-hero-content"
          >
            <div className="hero-badge">Enterprise MBSE Tooling</div>
            <h1>SysML v2 Language Server</h1>
            <p className="page-hero-description">
              First enterprise-grade SysML v2 Language Server available as VS Code Extension, Tauri App, and SaaS by SysNex Systems. 
              Production-ready LSP with AI integration, Git workflows, and multi-industry compliance variants.
            </p>
            <div className="hero-cta">
              <Link to="/contact" className="btn primary">Get Started</Link>
              <Link to="#features" className="btn ghost">View Features</Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">50M+</div>
                <div className="stat-label">VSCode Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">&lt;50ms</div>
                <div className="stat-label">LSP Response</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">18/18</div>
                <div className="stat-label">LSP Features</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">11</div>
                <div className="stat-label">Build Variants</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Our Language Server</h2>
            <p className="section-subtitle">
              Built for modern systems engineering teams who demand performance, reliability, and compliance
            </p>
          </div>
          <div className="differentiators-grid">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <div className="differentiator-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul className="feature-tags">
                    {item.tags.map((tag, i) => (
                      <li key={i}>{tag}</li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Available on Three Platforms</h2>
            <p className="section-subtitle">
              Choose the deployment option that fits your workflow. All platforms share the same powerful native LSP backend.
            </p>
          </div>
          <div className="platforms-grid">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`platform-card ${platform.featured ? 'featured' : ''}`}
              >
                {platform.featured && <div className="platform-badge">Primary</div>}
                <div className="platform-icon">{platform.icon}</div>
                <h3>{platform.title}</h3>
                <p className="platform-description">{platform.description}</p>
                <ul className="platform-features">
                  {platform.features.map((feature, i) => (
                    <li key={i}>✅ {feature}</li>
                  ))}
                </ul>
                <div className="platform-status">{platform.status}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LSP Features */}
      <section id="features" className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Complete LSP Implementation</h2>
            <p className="section-subtitle">
              18/18 Language Server Protocol features (100% compliance) with production-ready performance
            </p>
          </div>
          <div className="lsp-features-grid">
            {lspFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="lsp-feature-card"
              >
                <div className="lsp-feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
                <div className="lsp-metric">{feature.metric}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Variants */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Choose Your Edition</h2>
            <p className="section-subtitle">
              Multiple variants optimized for different use cases—from lightweight CI/CD to enterprise compliance
            </p>
          </div>
          <div className="variants-grid">
            {variants.map((variant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`variant-card ${variant.featured ? 'featured' : ''} ${variant.essential ? 'essential' : ''}`}
              >
                <div className={`variant-badge ${variant.essential ? 'essential-badge' : variant.featured ? 'standard-badge' : 'platform-badge'}`}>
                  {variant.badge}
                </div>
                <h3>{variant.title}</h3>
                <div className="variant-size">{variant.size}</div>
                <p>{variant.description}</p>
                <ul className="variant-features">
                  {variant.features.map((feature, i) => (
                    <li key={i}>✅ {feature}</li>
                  ))}
                </ul>
                <div className="variant-status">{variant.status}</div>
                <Link to="/contact" className={`variant-cta ${variant.featured ? 'primary' : ''}`}>
                  {variant.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-content-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cta-content"
          >
            <h2>Ready to Transform Your Systems Engineering Workflow?</h2>
            <p>Join teams using enterprise-grade SysML v2 tooling with AI integration, Git workflows, and compliance support.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn primary large">Request Demo</Link>
              <Link to="/try-yourself" className="btn ghost large">Try Yourself</Link>
            </div>
            <p className="cta-note">Start with a 30-day free trial. No credit card required.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Product


