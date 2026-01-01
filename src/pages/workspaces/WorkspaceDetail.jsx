import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import SpotlightCard from '../../components/SpotlightCard'
import { getWorkspaceById } from '../../data/workspaces/workspaces'
import '../Page.css'
import '../Product.css'

/**
 * WorkspaceDetail - Generic workspace detail page
 *
 * Displays details for any workspace based on URL parameter
 */
const WorkspaceDetail = () => {
  const { workspaceId } = useParams()
  const workspace = getWorkspaceById(workspaceId)

  if (!workspace) {
    return (
      <div className="page">
        <div className="container">
          <h1>Workspace Not Found</h1>
          <p>The requested workspace could not be found.</p>
          <Link to="/workspaces" className="btn primary">← Back to Workspaces</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Overview', path: '/overview' },
          { label: 'Workspaces', path: '/workspaces' },
          { label: workspace.title }
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{workspace.icon}</div>
            <div className="hero-badge">{workspace.subtitle}</div>
            <h1>{workspace.title} Workspace</h1>
            <p className="page-hero-description">{workspace.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Primary Features */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Primary Features</h2>
            <p className="section-subtitle">
              Everything you need for {workspace.title.toLowerCase()} workflows
            </p>
          </div>
          <div style={{ maxWidth: '1000px', margin: '2rem auto 0' }}>
            <SpotlightCard>
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {workspace.primaryFeatures.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}
                    >
                      <span style={{ color: workspace.color, fontWeight: 'bold', fontSize: '1.2rem' }}>✓</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Typical Workflow */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Typical Workflow</h2>
            <p className="section-subtitle">
              How {workspace.title.toLowerCase()} users work with NexSuite
            </p>
          </div>
          <div style={{ maxWidth: '900px', margin: '2rem auto 0' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {workspace.workflows.map((workflow, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${workspace.color}`
                  }}
                >
                  <div style={{
                    minWidth: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '50%',
                    background: workspace.color,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.95rem'
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{workflow}</span>
                </motion.div>
              ))}
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
            <h2>Ready to Try {workspace.title}?</h2>
            <p>Experience personalized workflows tailored to your needs</p>
            <div className="cta-buttons">
              <Link to="/try-yourself" className="btn primary large">Try Interactive Demo</Link>
              <Link to="/workspaces" className="btn ghost large">← Back to All Workspaces</Link>
            </div>
            <p className="cta-note">Configure your workspace during setup or switch anytime.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default WorkspaceDetail
