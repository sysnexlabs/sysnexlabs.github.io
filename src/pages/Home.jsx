import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import SyscribeProduct from '../components/SyscribeProduct'
import RoleBasedMessaging from '../components/RoleBasedMessaging'
import MissionCriticalIndustries from '../components/MissionCriticalIndustries'
import SpotlightCard from '../components/SpotlightCard'
import { useTranslation } from '../utils/i18n'
import { useTheme } from '../contexts/ThemeContext'
import './Home.css'
import './Product.css'

const Home = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { theme } = useTheme()

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
      description: 'Full-featured Language Server Protocol implementation with 18/18 LSP features (100% compliance), 491+ passing tests, and real-time diagnostics with <50ms response time.',
      variant: 'primary'
    },
    {
      eyebrow: 'Model-Driven',
      title: 'Advanced Tooling',
      description: 'Comprehensive documentation generation (MkDocs/Sphinx), bidirectional traceability matrices, interactive React Flow diagram visualization, and model analytics.',
      variant: 'secondary'
    },
    {
      eyebrow: 'Standards Compliant',
      title: 'ISO & ASPICE Ready',
      description: 'Built for automotive and aerospace with ISO 26262 ASIL decomposition validator, ASPICE work products (20/20 complete), and ISO 15288 foundation (83% complete, targeting 95% by Q1 2026).',
      variant: 'accent'
    }
  ]

  return (
    <div className="home" style={{ minHeight: '100vh', width: '100%' }}>
      <Hero />

      {/* Architecture Diagram Section */}
      <section className="architecture-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="architecture-diagram"
          >
            {/* Top: SysNex */}
            <div className="architecture-top">
              <div className="architecture-header-card">
                <div className="architecture-logo">
                  <img 
                    src={theme === 'light' ? "./assets/logo_new.svg" : "./assets/logo_white.svg"} 
                    alt="SysNex" 
                    className="architecture-logo-img"
                  />
                </div>
                <h2 className="architecture-title">SysNex</h2>
                <p className="architecture-subtitle">AI-native, open SysML v2 Engineering Platform</p>
              </div>
            </div>

            {/* Middle: Application Modules */}
            <div className="architecture-modules">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="architecture-module"
              >
                <div className="module-icon module-icon-doc">
                  <img src="./assets/nexdocs.svg" alt="NexDocs" style={{ width: '80px', height: '80px' }} />
                </div>
                <h3>NexDocs</h3>
                <p>Model-driven Documentation</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="architecture-module"
              >
                <div className="module-icon module-icon-req">
                  <img src="./assets/nexReq.svg" alt="NexReq" style={{ width: '80px', height: '80px' }} />
                </div>
                <h3>NexReq</h3>
                <p>Model-native Requirements</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="architecture-module"
              >
                <div className="module-icon module-icon-test">
                  <img src="./assets/nexTest.svg" alt="NexTest" style={{ width: '80px', height: '80px' }} />
                </div>
                <h3>NexTest</h3>
                <p>Model-driven Verification</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="architecture-module"
              >
                <div className="module-icon module-icon-viz">
                  <img src="./assets/nexViz.svg" alt="NexViz" style={{ width: '80px', height: '80px' }} />
                </div>
                <h3>NexViz</h3>
                <p>Interactive Visualization</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="architecture-module"
              >
                <div className="module-icon module-icon-analytics">
                  <img src="./assets/nexAnalytics.svg" alt="NexAnalytics" style={{ width: '80px', height: '80px' }} />
                </div>
                <h3>NexAnalytics</h3>
                <p>Model Analysis</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="architecture-module"
              >
                <div className="module-icon module-icon-trade">
                  <img src="./assets/nexTrade.svg" alt="NexTrade" style={{ width: '80px', height: '80px' }} />
                </div>
                <h3>NexTrade</h3>
                <p>Trade Study Analysis</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="architecture-module"
              >
                <div className="module-icon module-icon-var">
                  <img src="./assets/nexVar.svg" alt="NexVar" style={{ width: '80px', height: '80px' }} />
                </div>
                <h3>NexVar</h3>
                <p>Variability Management</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 }}
                className="architecture-module"
              >
                <div className="module-icon module-icon-sim">
                  <img src="./assets/nexSim.svg" alt="NexSim" style={{ width: '80px', height: '80px' }} />
                </div>
                <h3>NexSim</h3>
                <p>State Machine Simulation</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="architecture-module architecture-module-suite"
              >
                <div className="module-icon module-icon-suite">
                  <img src="./assets/nexSuite.svg" alt="NexSuite" style={{ width: '80px', height: '80px' }} />
                </div>
                <h3>NexSuite</h3>
                <p>Engineering Workflow Layer</p>
                <span className="module-badge">Integrates all Nex features</span>
              </motion.div>
            </div>

            {/* Bottom: SysNex Platform */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="architecture-platform"
            >
              <div className="architecture-platform-card">
                <div className="platform-logo">
                  <img 
                    src={theme === 'light' ? "./assets/logo_new.svg" : "./assets/logo_white.svg"} 
                    alt="SysNex Platform" 
                    className="platform-logo-img"
                  />
                </div>
                <h3 className="platform-title">SysNex Platform</h3>
                <ul className="platform-features-list">
                  <li>SysML v2 Core Engine</li>
                  <li>LSP (Rust, &lt;50ms)</li>
                  <li>AI / Copilot Integration</li>
                  <li>WASM Runtime (Browser / Docs)</li>
                  <li>Permission &amp; Licensing Layer</li>
                  <li>Compliance Modules (ASPICE, ISO, UNECE)</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Role-Based Messaging Section */}
      <RoleBasedMessaging />

      {/* Mission-Critical Industries Section */}
      <MissionCriticalIndustries />

      <section className="insights-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2 className="section-title">Enterprise Ready</h2>
            <p className="section-subtitle">
              Production-grade SysML v2 tooling built for mission-critical systems engineering
            </p>
          </motion.div>
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

