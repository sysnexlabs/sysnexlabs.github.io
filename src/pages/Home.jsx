import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import SyscribeProduct from '../components/SyscribeProduct'
import RoleBasedMessaging from '../components/RoleBasedMessaging'
import MissionCriticalIndustries from '../components/MissionCriticalIndustries'
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

      {/* Honest About What We're NOT Section */}
      <section className="honesty-section" style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2 className="section-title">Honest About What We're NOT</h2>
            <p className="section-subtitle">
              We're building in the open. You get to influence the direction. But you need to be comfortable with early-stage tooling.
            </p>
          </motion.div>
          <div className="pricing-info-grid" style={{ marginTop: '2rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SpotlightCard>
                <h3 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>✅ What We ARE</h3>
                <ul className="about-list">
                  <li>✅ Production-ready VS Code extension (18 LSP features)</li>
                  <li>✅ Extensively tested and actively developed</li>
                  <li>✅ Substantial codebase with proven reliability</li>
                  <li>✅ Open source core (MIT license - fork anytime)</li>
                  <li>✅ Early access for innovators shaping the future</li>
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
                <ul className="about-list no-bullets">
                  <li>❌ Not certified for safety-critical production (yet)</li>
                  <li>❌ Not a 100-person team (solo founder, for now)</li>
                  <li>❌ Not production-validated in automotive OEM workflows</li>
                  <li>❌ Not offering 24/7 enterprise support (community-first)</li>
                  <li>❌ Not claiming ROI metrics without real deployments</li>
                </ul>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Early Adopter Program Section */}
      <section className="early-adopter-section" style={{ padding: '4rem 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2 className="section-title">Early Adopter Program</h2>
            <p className="section-subtitle">
              We're looking for 10-20 innovators to help shape the future of SysML v2 tooling
            </p>
          </motion.div>
          <div className="pricing-info-grid" style={{ marginTop: '2rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SpotlightCard>
                <h3 style={{ marginBottom: '1rem' }}>What You Get</h3>
                <ul className="about-list">
                  <li>Free 6-month access to all beta features</li>
                  <li>Direct influence on roadmap priorities</li>
                  <li>Early access to compliance tooling</li>
                  <li>Co-marketing opportunities (if you want)</li>
                  <li>Priority support during beta period</li>
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
                <h3 style={{ marginBottom: '1rem' }}>Ideal Partners</h3>
                <ul className="about-list">
                  <li>Automotive systems engineers tired of slow tools</li>
                  <li>Academic research groups needing modern MBSE</li>
                  <li>Toolchain innovators building SysML v2 workflows</li>
                  <li>Early-stage companies with flexible processes</li>
                  <li>Anyone passionate about open-source tooling</li>
                </ul>
              </SpotlightCard>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginTop: '2rem', textAlign: 'center' }}
          >
            <Link to="/contact" className="btn primary large">Apply for Early Access</Link>
          </motion.div>
        </div>
      </section>



      <section className="cta-section-home">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Free tier is production-ready. Beta programs open for Standard & Platform tiers.</p>
            <div className="cta-buttons">
              <Link to="/try-yourself" className="btn primary large">Try Free Version</Link>
              <Link to="/contact" className="btn ghost large">Apply for Beta</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

