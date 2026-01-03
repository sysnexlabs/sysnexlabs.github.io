import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import './Page.css'

const Tools = () => {
  const highlights = [
    {
      icon: '/assets/misc_deployment.svg',
      title: 'SysML v2 Modeling (Production)',
      description: 'Native SysML v2 support with syntax highlighting, IntelliSense, and real-time validation. Define systems in textual format with LSP features. 18/18 LSP features implemented.'
    },
    {
      icon: '/assets/feature_ai_first.svg',
      title: 'AI Integration (Works with Copilot)',
      description: 'Compatible with GitHub Copilot, Claude Code, and VS Code AI. Works with standard AI assistants—no proprietary AI. Leverage existing tooling, not custom solutions.'
    },
    {
      icon: '📦',
      title: 'Language Server (Production)',
      description: 'Complete SysML v2 Language Server Protocol implementation. Sub-50ms response time in internal benchmarks. Autocomplete, diagnostics, navigation all working.'
    },
    {
      icon: '🔗',
      title: 'Git Integration (Native)',
      description: 'SysML v2 files are plain text—use Git naturally. Branch, merge, PR review workflows just work. No proprietary SCM required.'
    },
    {
      icon: '/assets/feature_performance.svg',
      title: 'Real-Time Feedback (Production)',
      description: 'Instant validation, syntax checking, and error detection. 25+ diagnostic collectors. Markers show exactly where issues are.'
    },
    {
      icon: '🎯',
      title: 'Multi-Format Support (Experimental)',
      description: 'Experimenting with UVL variability, YAML architecture, VSS signals. SysML v2 is production-ready, domain extensions are beta.'
    }
  ]

  const features = [
    {
      title: 'VS Code Integration (Production)',
      description: 'Built as a VS Code extension. No custom IDE—just extends the editor you already use. Works wherever VS Code works.',
      items: [
        'Native VS Code extension with full LSP support (18/18 features)',
        'Syntax highlighting and code formatting for SysML v2',
        'Standard VS Code file explorer, search, Git integration',
        'Multi-panel layout using VS Code webviews',
        'Status bar shows diagnostics, language mode, encoding'
      ]
    },
    {
      title: 'AI Assistant Compatibility (Works with Standard Tools)',
      description: 'No proprietary AI. Works with GitHub Copilot, Claude Code, VS Code AI extensions. Just a language server—AI works naturally.',
      items: [
        'GitHub Copilot autocomplete for SysML v2 (if you have Copilot)',
        'Claude Code integration (if you use Claude)',
        'Standard LSP means any AI tool can use it',
        'No vendor lock-in to our AI—bring your own',
        'Completions work with or without AI assistance'
      ]
    },
    {
      title: 'SysML v2 Language Server (Production)',
      description: 'Complete LSP implementation. Sub-50ms response in internal benchmarks. All 18 LSP features working.',
      items: [
        'Real-time syntax validation (25+ diagnostic collectors)',
        'IntelliSense autocomplete with ~10K library types',
        'Go-to-definition, find-references, type hierarchy',
        'Semantic highlighting (43 token types, HIR-based)',
        'Hover, rename, folding, inlay hints, signature help'
      ]
    },
    {
      title: 'Git-Based Workflows (Native Support)',
      description: "SysML v2 files are plain text. Git just works—no special tooling needed. Use standard Git workflows.",
      items: [
        'Branch-based development (files are .sysml text)',
        'Pull request reviews show line-by-line diffs',
        'Merge conflicts are text-based (resolve in editor)',
        'Commit history and blame work naturally',
        'Use GitHub/GitLab/Bitbucket—no special integration'
      ]
    },
    {
      title: 'Code Generation (Experimental)',
      description: 'Early prototypes for model-to-code generation. Not production-ready. Experimenting with templates and validation.',
      items: [
        'Prototype code generation from SysML models',
        'Template-based approach (alpha)',
        'Validation of generated code (experimental)',
        'CI/CD integration (planned)',
        'Round-trip engineering (research stage)'
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
      <section className="page-hero-section hero-resources">
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
              SysNex builds AI-augmented SysML v2 tooling for VS Code.
              Our extension integrates with Git and modern development workflows, bringing
              systems engineering into the developer experience. Early-stage product, not enterprise-validated.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Key Features</h2>
          </div>
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
                  <div className="card-icon" aria-hidden="true">
                    {typeof highlight.icon === 'string' && highlight.icon.startsWith('/assets/') ? (
                      <img
                        src={highlight.icon}
                        alt={highlight.title}
                        style={{height: '120px', width: 'auto', maxWidth: '120px', objectFit: 'contain'}}
                      />
                    ) : (
                      highlight.icon
                    )}
                  </div>
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
          <div className="section-header">
            <h2 className="section-title">IDE Features</h2>
          </div>
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
          <div className="section-header">
            <h2 className="section-title">Development Experience</h2>
            <p className="section-subtitle">
              Our tools are designed for the modern systems engineer who wants to work like a software developer:
            </p>
          </div>
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
            <span>Ready to try it? </span>
            <Link to="/try-yourself">Try the demo</Link>
            <span> or </span>
            <Link to="/contact">apply for beta access</Link>
            <span> to advanced features.</span>
          </p>
        </div>
      </section>

      {/* Honest Disclaimers Section */}
      <section className="page-section-alt" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We ARE vs What We're NOT</h2>
            <p className="section-subtitle">
              We're building a VS Code extension, not an enterprise platform. Here's the reality:
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
                  <li>✅ VS Code extension for SysML v2 (production-ready LSP)</li>
                  <li>✅ Compatible with standard AI tools (Copilot, Claude)</li>
                  <li>✅ Plain text files that work with Git naturally</li>
                  <li>✅ Early-stage product with beta features</li>
                  <li>✅ Open source core (fork and extend anytime)</li>
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
                  <li>❌ Not claiming 50M+ users (that's VS Code, not us)</li>
                  <li>❌ Not enterprise-validated or production-tested</li>
                  <li>❌ Not offering proprietary AI or custom IDE</li>
                  <li>❌ Not replacing CATIA/Cameo/Rhapsody (yet)</li>
                  <li>❌ Not certified for safety-critical use</li>
                </ul>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tools
