import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import StatusBadge from '../../../components/product/StatusBadge/StatusBadge'
import SpotlightCard from '../../../components/SpotlightCard'
import { getProductById } from '../../../data/product'
import '../../Page.css'
import '../../Product.css'

const NexSim = () => {
  const product = getProductById('nexsim')
  if (!product) return <div>Product not found</div>

  return (
    <div className="page">
      <div className="container">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Overview', path: '/overview' },
          { label: 'Products', path: '/products' },
          { label: product.title }
        ]} />
      </div>

      <section className="page-hero-section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="product-hero-content">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{product.icon}</div>
            <div className="hero-badge">{product.badge} Edition</div>
            <h1>{product.title}</h1>
            <p className="product-subtitle">{product.subtitle}</p>
            <StatusBadge status={product.status} />
            <p className="page-hero-description" style={{ marginTop: '1.5rem' }}>{product.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Key Features</h2>
            <p className="section-subtitle">Interactive simulation and debugging for SysML v2</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            {product.features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✨</div>
                <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Components</h2>
            <p className="section-subtitle">NexSim components for simulation and execution</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem', maxWidth: '800px', margin: '2rem auto 0' }}>
            {product.components.map((component, index) => (
              <SpotlightCard key={index}>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--accent-primary)', color: 'white', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1rem' }}>
                    {component.edition}
                  </div>
                  <h3 style={{ marginBottom: '0.5rem' }}>{component.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{component.description}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Use Cases</h2>
            <p className="section-subtitle">How NexSim fits into your workflow</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem', maxWidth: '900px', margin: '2rem auto 0' }}>
            {product.useCases.map((useCase, index) => (
              <div key={index} style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📌</div>
                <p style={{ fontWeight: '500' }}>{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Pricing & Availability</h2>
            <p className="section-subtitle">{product.pricing}</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              NexSim is available as part of the <strong>{product.badge} edition</strong>.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/editions" className="btn primary large">View Editions →</Link>
              <Link to="/pricing" className="btn ghost large">See Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="cta-content">
            <h2>Ready to Try NexSim?</h2>
            <p>Simulate and debug your SysML v2 models interactively</p>
            <div className="cta-buttons">
              <Link to="/try-yourself" className="btn primary large">Try Interactive Demo</Link>
              <Link to="/contact" className="btn ghost large">Contact Sales</Link>
            </div>
            <p className="cta-note">Start with a 30-day free trial. No credit card required.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default NexSim
