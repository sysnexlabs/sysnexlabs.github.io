import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import SyscribeProduct from '../components/SyscribeProduct'
import RoleBasedMessaging from '../components/RoleBasedMessaging'
import MissionCriticalIndustries from '../components/MissionCriticalIndustries'
import EnterpriseReadiness from '../components/EnterpriseReadiness'
import SpotlightCard from '../components/SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './Home.css'

const Home = () => {
  const location = useLocation()
  const { t } = useTranslation()

  // Scroll to top when navigating to home (including when already on home)
  useEffect(() => {
    if (location.state?.refresh) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.state])

  const insights = [
    {
      eyebrow: 'Enterprise Ready',
      title: 'Production-Grade LSP',
      description: 'Full-featured Language Server Protocol implementation with 90%+ test coverage and real-time diagnostics.',
      variant: 'primary'
    },
    {
      eyebrow: 'Model-Driven',
      title: 'Advanced Tooling',
      description: 'Comprehensive documentation generation, traceability matrices, and diagram visualization.',
      variant: 'secondary'
    },
    {
      eyebrow: 'Standards Compliant',
      title: 'ISO & ASPICE Ready',
      description: 'Built for automotive and aerospace with ISO 26262, ASPICE, and ISO 15288 support.',
      variant: 'accent'
    }
  ]

  return (
    <div className="home" style={{ minHeight: '100vh', width: '100%' }}>
      <Hero />

      {/* Role-Based Messaging Section */}
      <RoleBasedMessaging />

      {/* Mission-Critical Industries Section */}
      <MissionCriticalIndustries />

      {/* Enterprise Readiness Section */}
      <EnterpriseReadiness />

      {/* See It In Action Section */}
      <section className="see-it-in-action-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2 className="section-title">See It In Action</h2>
            <p className="section-subtitle">
              Experience production-ready SysML v2 Language Server with real-time diagnostics, navigation, and traceability
            </p>
          </motion.div>
          
          <div className="action-demo-grid">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="action-demo-visual"
            >
              <div className="demo-screenshot-wrapper">
                <div className="demo-screenshot">
                  <div className="screenshot-header">
                    <div className="screenshot-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="screenshot-label">VS Code Extension</div>
                  </div>
                  <div className="screenshot-content">
                    <div className="code-preview">
                      <div className="code-line"><span className="code-keyword">package</span> <span className="code-type">SysML</span>;</div>
                      <div className="code-line"><span className="code-keyword">part</span> <span className="code-variable">engine</span> : <span className="code-type">Engine</span>;</div>
                      <div className="code-line"><span className="code-keyword">part</span> <span className="code-variable">transmission</span> : <span className="code-type">Transmission</span>;</div>
                      <div className="code-line highlight-line"><span className="code-keyword">part</span> <span className="code-variable">control</span> : <span className="code-type">ControlUnit</span>;</div>
                      <div className="code-line"><span className="code-comment">// Real-time diagnostics active</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="action-demo-content"
            >
              <div className="demo-features">
                <h3 className="demo-features-title">Key Capabilities</h3>
                <ul className="demo-features-list">
                  <li className="demo-feature-item">
                    <span className="feature-icon">✏️</span>
                    <div className="feature-content">
                      <strong>Text-based modeling</strong>
                      <span>Native SysML v2 syntax with real-time validation</span>
                    </div>
                  </li>
                  <li className="demo-feature-item">
                    <span className="feature-icon">⚡</span>
                    <div className="feature-content">
                      <strong>Real-time diagnostics</strong>
                      <span>Instant error detection and intelligent suggestions</span>
                    </div>
                  </li>
                  <li className="demo-feature-item">
                    <span className="feature-icon">🧭</span>
                    <div className="feature-content">
                      <strong>Advanced navigation</strong>
                      <span>Go-to-definition, find references, symbol search</span>
                    </div>
                  </li>
                  <li className="demo-feature-item">
                    <span className="feature-icon">🔗</span>
                    <div className="feature-content">
                      <strong>Traceability</strong>
                      <span>Requirements linking and bidirectional traceability</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="demo-cta">
                <Link to="/try-yourself" className="btn primary large">
                  Try Live Demo
                </Link>
                <p className="demo-cta-note">No installation required • Works in your browser</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="insights-section">
        <div className="container">
          <div className="insights-grid">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard className={`insight-card insight-card--${insight.variant}`}>
                  <span className="insight-eyebrow">{insight.eyebrow}</span>
                  <h3 className="insight-title">{insight.title}</h3>
                  <p className="insight-description">{insight.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <SyscribeProduct />

      {/* Integrations Section */}
      <section className="integrations-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2 className="section-title">{t('home.integrations.heading')}</h2>
            <p className="section-subtitle">
              {t('home.integrations.subtitle')}
            </p>
          </motion.div>
          <div className="integrations-grid">
            {[
              {
                name: t('home.integrations.vscode.name'),
                description: t('home.integrations.vscode.description'),
                icon: '💻',
                badge: 'Native'
              },
              {
                name: t('home.integrations.git.name'),
                description: t('home.integrations.git.description'),
                icon: '🔀',
                badge: 'Native'
              },
              {
                name: t('home.integrations.copilot.name'),
                description: t('home.integrations.copilot.description'),
                icon: '🤖',
                badge: 'AI-First'
              },
              {
                name: t('home.integrations.claude.name'),
                description: t('home.integrations.claude.description'),
                icon: '🧠',
                badge: 'Advanced'
              }
            ].map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <div className="integration-header">
                    <div className="integration-icon">{integration.icon}</div>
                    <span className="integration-badge">{integration.badge}</span>
                  </div>
                  <h3 className="integration-name">{integration.name}</h3>
                  <p className="integration-description">{integration.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* External Validation Section */}
      <section className="external-validation-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2 className="section-title">{t('home.socialproof.heading')}</h2>
            <p className="section-subtitle">
              {t('home.socialproof.subtitle')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="validation-content"
          >
            <div className="validation-item">
              <div className="validation-label">Research Partnership</div>
              <div className="validation-text">
                Validated in pilot programs with research institutions. Infrastructure verified for production use.
              </div>
            </div>
            <div className="validation-item">
              <div className="validation-label">Industry Validation</div>
              <div className="validation-text">
                German automotive OEM programs evaluating infrastructure for ISO 26262 and ASPICE compliance workflows.
              </div>
            </div>
            <div className="validation-item">
              <div className="validation-label">Milestone-Based Updates</div>
              <div className="validation-text">
                Progress published as validation milestones are reached. No marketing claims without evidence.
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      <section className="cta-section-home">
        <div className="container">
          <div className="cta-content">
            <h2>{t('home.cta.heading')}</h2>
            <p>{t('home.cta.subtitle')}</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn primary large">Schedule Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

