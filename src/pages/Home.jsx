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

      {/* NexDocs Viewer Section - Second Section */}
      <SyscribeProduct />

      {/* Role-Based Messaging Section */}
      <RoleBasedMessaging />

      {/* Mission-Critical Industries Section */}
      <MissionCriticalIndustries />

      {/* Enterprise Readiness Section */}
      <EnterpriseReadiness />

      {/* Product Reality Proof Section */}
      <section className="product-proof-section">
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
              Production-ready SysML v2 Language Server with real-time diagnostics, navigation, and traceability
            </p>
          </motion.div>
          <div className="product-proof-content">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="product-screenshot-container"
            >
              <div className="product-screenshot">
                <div className="screenshot-placeholder">
                  <div className="screenshot-label">VS Code Extension</div>
                  <p className="screenshot-note">Real screenshot of SysML v2 LSP in VS Code showing syntax highlighting, diagnostics, and go-to-definition</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="product-proof-features"
            >
              <h3>Key Capabilities Demonstrated</h3>
              <ul className="proof-features-list">
                <li>
                  <strong>Text-based modeling:</strong> Native SysML v2 syntax with real-time validation
                </li>
                <li>
                  <strong>Diagnostics:</strong> Instant error detection and suggestions
                </li>
                <li>
                  <strong>Navigation:</strong> Go-to-definition, find references, symbol search
                </li>
                <li>
                  <strong>Traceability:</strong> Requirements linking and bidirectional traceability
                </li>
              </ul>
              <div className="proof-cta">
                <Link to="/try-yourself" className="btn primary">Try Live Demo</Link>
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

