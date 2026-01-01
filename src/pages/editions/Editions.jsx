import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import EditionCard from '../../components/product/EditionCard/EditionCard'
import ComparisonTable from '../../components/product/ComparisonTable/ComparisonTable'
import { useTranslation } from '../../utils/i18n'
import { useTheme } from '../../contexts/ThemeContext'
import { editions, getProductionReadyEditions, getCommercialEditions, getFreeEditions } from '../../data/product'
import '../Page.css'
import '../Product.css'

/**
 * Editions Page - Build Variants
 *
 * Shows different BUILD configurations and commercial editions.
 * Displays Essential (Free), Standard, Platform, and Platform-Full editions.
 */
const Editions = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const productionReady = getProductionReadyEditions()
  const commercial = getCommercialEditions()
  const free = getFreeEditions()

  const comparisonRows = [
    {
      label: 'Core LSP (18 features)',
      getValue: () => '✅'
    },
    {
      label: 'Documentation Viewer',
      getValue: (edition) => edition.id === 'essential' ? '➖' : '✅'
    },
    {
      label: 'Requirements Management',
      getValue: (edition) => edition.id === 'essential' ? '➖' : '✅'
    },
    {
      label: 'Advanced Analytics',
      getValue: (edition) => ['platform', 'platform-full'].includes(edition.id) ? '✅' : '➖'
    },
    {
      label: 'Variability & Constraints',
      getValue: (edition) => edition.id === 'platform-full' ? '✅' : '➖'
    },
    {
      label: 'Package Size',
      getValue: (edition) => <small>{edition.size}</small>
    },
    {
      label: 'Pricing',
      getValue: (edition) => <strong>{edition.price}</strong>
    }
  ]

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
            <div className="hero-badge">Build Variants</div>
            <h1>NexSuite Editions</h1>
            <p className="page-hero-description">
              Choose the right edition for your needs. From free Essential edition for CI/CD pipelines
              to enterprise Platform editions with advanced features. All editions include the same
              high-performance LSP core.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="page-content-section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{editions.length}</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Total Editions</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{free.length}</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Free Editions</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{commercial.length}</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Commercial Editions</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{productionReady.length}</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Production-Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Edition Cards Grid */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Available Editions</h2>
            <p className="section-subtitle">
              All editions share the same high-performance LSP core with varying feature sets
            </p>
          </div>

          <div className="product-variants-grid" style={{ gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {editions.map((edition, index) => (
              <EditionCard key={edition.id} edition={edition} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Edition Comparison Table */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Edition Comparison</h2>
            <p className="section-subtitle">
              Compare features across all editions
            </p>
          </div>

          <ComparisonTable
            items={editions}
            rows={comparisonRows}
          />
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
            <h2>Need Help Choosing?</h2>
            <p>Contact our team for personalized recommendations based on your needs</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn primary large">Contact Sales</Link>
              <Link to="/try-yourself" className="btn ghost large">Try Interactive Demo</Link>
            </div>
            <p className="cta-note">Start with a 30-day free trial of any commercial edition.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Editions
