import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../../components/SpotlightCard'
import { useTranslation } from '../../utils/i18n'
import { useTheme } from '../../contexts/ThemeContext'
import { products, getProductionReadyProducts, getPlannedProducts, getCoreProducts, getAdvancedProducts } from '../../data/product'
import '../Page.css'
import '../Product.css'

/**
 * Products Page - Product Tools & Features
 *
 * Shows WHAT NexSuite offers - individual tools and capabilities.
 * Displays 9 products: NexDocs, NexReq, NexTest, NexViz, NexAnalytics, NexTrade, NexVar, NexSim, NexSuite.
 */
const Products = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [filter, setFilter] = useState('all')

  const getFilteredProducts = () => {
    switch (filter) {
      case 'ready':
        return getProductionReadyProducts()
      case 'planned':
        return getPlannedProducts()
      case 'core':
        return getCoreProducts()
      case 'advanced':
        return getAdvancedProducts()
      default:
        return products
    }
  }

  const filteredProducts = getFilteredProducts()

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
            <div className="hero-badge">Tools & Features</div>
            <h1>NexSuite Products</h1>
            <p className="page-hero-description">
              Comprehensive suite of tools for SysML v2 development, from documentation and requirements
              to testing, visualization, analytics, and simulation. Each tool integrates seamlessly
              for unified workflows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="page-content-section" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setFilter('all')}
              className={`btn ${filter === 'all' ? 'primary' : 'ghost'}`}
              style={{ minWidth: '120px' }}
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => setFilter('ready')}
              className={`btn ${filter === 'ready' ? 'primary' : 'ghost'}`}
              style={{ minWidth: '120px' }}
            >
              ✅ Ready ({getProductionReadyProducts().length})
            </button>
            <button
              onClick={() => setFilter('planned')}
              className={`btn ${filter === 'planned' ? 'primary' : 'ghost'}`}
              style={{ minWidth: '120px' }}
            >
              🟡 Planned ({getPlannedProducts().length})
            </button>
            <button
              onClick={() => setFilter('core')}
              className={`btn ${filter === 'core' ? 'primary' : 'ghost'}`}
              style={{ minWidth: '120px' }}
            >
              Core Tools ({getCoreProducts().length})
            </button>
            <button
              onClick={() => setFilter('advanced')}
              className={`btn ${filter === 'advanced' ? 'primary' : 'ghost'}`}
              style={{ minWidth: '120px' }}
            >
              Advanced ({getAdvancedProducts().length})
            </button>
          </div>
        </div>
      </section>

      {/* Product Cards Grid */}
      <section className="page-content-section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="product-variants-grid" style={{ gap: '2rem' }}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="product-variant-card"
              >
                {product.badge && (
                  <div
                    className="variant-badge"
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {product.badge}
                  </div>
                )}

                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {product.icon}
                </div>

                <h3>{product.title}</h3>

                {product.subtitle && (
                  <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    {product.subtitle}
                  </p>
                )}

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {product.description}
                </p>

                <div
                  className="variant-status"
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                    background: product.status.includes('✅')
                      ? 'rgba(34, 197, 94, 0.1)'
                      : product.status.includes('🟡')
                      ? 'rgba(251, 191, 36, 0.1)'
                      : 'rgba(148, 163, 184, 0.1)',
                    color: product.status.includes('✅')
                      ? '#22c55e'
                      : product.status.includes('🟡')
                      ? '#fbbf24'
                      : '#94a3b8'
                  }}
                >
                  {product.status}
                </div>

                {/* Key Features */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    Key Features:
                  </h4>
                  <ul className="variant-features">
                    {product.features.slice(0, 4).map((feature, i) => (
                      <li key={i} style={{ fontSize: '0.9rem' }}>{feature}</li>
                    ))}
                    {product.features.length > 4 && (
                      <li style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.85rem' }}>
                        +{product.features.length - 4} more features...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Components */}
                {product.components && product.components.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      Components:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {product.components.map((comp, i) => (
                        <div key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          <strong>{comp.name}</strong> ({comp.edition}): {comp.description}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Use Cases */}
                {product.useCases && product.useCases.length > 0 && (
                  <details style={{ marginBottom: '1rem' }}>
                    <summary style={{ cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                      Use Cases ({product.useCases.length})
                    </summary>
                    <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                      {product.useCases.map((useCase, i) => (
                        <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                {/* Pricing */}
                {product.pricing && (
                  <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Pricing:</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{product.pricing}</div>
                  </div>
                )}

                {/* CTA */}
                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  {product.status.includes('✅') ? (
                    <Link
                      to={product.link}
                      className="btn primary"
                      style={{ width: '100%' }}
                    >
                      Learn More →
                    </Link>
                  ) : (
                    <button
                      className="btn ghost"
                      style={{ width: '100%', cursor: 'not-allowed', opacity: 0.6 }}
                      disabled
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Integrated Workflows</h2>
            <p className="section-subtitle">
              All NexSuite products work together seamlessly through the NexSuite integration layer
            </p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <SpotlightCard>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔗</div>
                <h3>NexSuite Integration Layer</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Unified workspace management, cross-product data sharing, and integrated workflows
                  ensure all tools work together as a cohesive system.
                </p>
                <ul style={{ textAlign: 'left', display: 'inline-block', marginBottom: '1.5rem' }}>
                  <li>Unified workspace management</li>
                  <li>Cross-product data sharing</li>
                  <li>Integrated workflows</li>
                  <li>Single sign-on (SSO)</li>
                  <li>Centralized configuration</li>
                  <li>Plugin architecture</li>
                </ul>
                <div>
                  <Link to="/products/nexsuite" className="btn primary">
                    Learn About Integration →
                  </Link>
                </div>
              </div>
            </SpotlightCard>
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
            <h2>Ready to Explore NexSuite?</h2>
            <p>Try our products today or contact our team for a personalized demo</p>
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

export default Products
