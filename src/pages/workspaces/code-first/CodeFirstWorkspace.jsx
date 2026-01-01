import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import SpotlightCard from '../../../components/SpotlightCard'
import { getWorkspaceById } from '../../../data/workspaces/workspaces'
import '../../Page.css'
import '../../Product.css'

const CodeFirstWorkspace = () => {
  const workspace = getWorkspaceById('code-first')
  if (!workspace) return <div>Workspace not found</div>

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

      <section className="page-hero-section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="product-hero-content">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{workspace.icon}</div>
            <div className="hero-badge">{workspace.subtitle}</div>
            <h1>{workspace.title} Workspace</h1>
            <p className="page-hero-description">{workspace.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Primary Features</h2>
            <p className="section-subtitle">Everything you need for code-first development</p>
          </div>
          <div style={{ maxWidth: '1000px', margin: '2rem auto 0' }}>
            <SpotlightCard>
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  {workspace.primaryFeatures.map((feature, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                      <span style={{ color: workspace.color, fontWeight: 'bold' }}>✓</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Typical Workflow</h2>
            <p className="section-subtitle">How code-first users work with NexSuite</p>
          </div>
          <div style={{ maxWidth: '900px', margin: '2rem auto 0' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {workspace.workflows.map((workflow, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: `4px solid ${workspace.color}` }}>
                  <div style={{ minWidth: '2rem', height: '2rem', borderRadius: '50%', background: workspace.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {i + 1}
                  </div>
                  <span>{workflow}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="cta-content">
            <h2>Ready to Try {workspace.title}?</h2>
            <p>Experience the power of code-first development with NexSuite</p>
            <div className="cta-buttons">
              <Link to="/try-yourself" className="btn primary large">Try Interactive Demo</Link>
              <Link to="/workspaces" className="btn ghost large">← Back to All Workspaces</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CodeFirstWorkspace
