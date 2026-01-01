import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import { useTranslation } from '../../utils/i18n'
import { useTheme } from '../../contexts/ThemeContext'
import { workspaces } from '../../data/workspaces/workspaces'
import '../Page.css'
import '../Product.css'

/**
 * Workspaces Page - A Workspace for Every Need
 *
 * Showcases 7 user groups and their personalized workflows.
 */
const Workspaces = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()


  return (
    <div className="page">
      <div className="container">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Overview', path: '/overview' },
          { label: 'Workspaces' }
        ]} />
      </div>

      {/* Hero Section */}
      <section className="page-hero-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="product-hero-content"
          >
            <div className="hero-badge">Personalized Workflows</div>
            <h1>A Workspace for Every Need</h1>
            <p className="page-hero-description">
              Whether you're a code-first developer, documentation specialist, visual modeler, or compliance engineer,
              NexSuite adapts to your workflow. Choose your workspace and get features tailored to how you work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="page-content-section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>7</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>User Workspaces</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>40+</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Tailored Features</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>100%</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Customizable</div>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Cards Grid */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Choose Your Workspace</h2>
            <p className="section-subtitle">
              Select the workspace that matches your role and workflow
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            {workspaces.map((workspace, index) => (
              <motion.div
                key={workspace.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '2rem',
                  background: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  border: '2px solid var(--border-color)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>{workspace.icon}</div>
                <h3 style={{ marginBottom: '0.5rem', textAlign: 'center', color: workspace.color }}>{workspace.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1rem' }}>
                  {workspace.subtitle}
                </p>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', textAlign: 'center' }}>
                  {workspace.description}
                </p>

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <Link
                    to={`/workspaces/${workspace.id}`}
                    className="btn primary"
                    style={{ fontSize: '0.85rem', padding: '0.75rem 1.5rem' }}
                  >
                    Explore Workspace →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose a Workspace */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Why Personalized Workspaces?</h2>
            <p className="section-subtitle">
              One size doesn't fit all - customize NexSuite for your workflow
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem', maxWidth: '1000px', margin: '2rem auto 0' }}>
            <div style={{ padding: '2rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Faster Workflow</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Get only the features you need, right where you need them. No clutter, just productivity.
              </p>
            </div>

            <div style={{ padding: '2rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Tailored Experience</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Each workspace is optimized for specific roles and workflows, from code editing to compliance.
              </p>
            </div>

            <div style={{ padding: '2rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Switch Anytime</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Change your workspace configuration anytime as your needs evolve. No lock-in.
              </p>
            </div>
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
            <h2>Find Your Perfect Workspace</h2>
            <p>Explore NexSuite with a workspace tailored to your needs</p>
            <div className="cta-buttons">
              <Link to="/try-yourself" className="btn primary large">Try Interactive Demo</Link>
              <Link to="/contact" className="btn ghost large">Contact Sales</Link>
            </div>
            <p className="cta-note">Configure your workspace during setup or switch anytime.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Workspaces
