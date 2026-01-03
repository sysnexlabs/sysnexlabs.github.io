import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import EditionCard from '../../components/product/EditionCard/EditionCard'
import ComparisonTable from '../../components/product/ComparisonTable/ComparisonTable'
import StatsGrid from '../../components/StatsGrid/StatsGrid'
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
      <div className="container">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Overview', path: '/overview' },
          { label: 'Editions' }
        ]} />
      </div>

      {/* Hero Section */}
      <section className="page-hero-section hero-products">
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
      <section className="page-content-section section-py-2">
        <div className="container">
          <StatsGrid
            stats={[
              { number: editions.length, label: 'Total Editions' },
              { number: free.length, label: 'Free Editions' },
              { number: commercial.length, label: 'Commercial Editions' },
              { number: productionReady.length, label: 'Production-Ready' }
            ]}
            maxWidth="800px"
          />
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

      {/* ROI Section */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Return on Investment</h2>
            <p className="section-subtitle">
              Fast payback periods with significant cost savings
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem', maxWidth: '1200px', margin: '2rem auto 0' }}>
            {commercial.map((edition, index) => (
              <motion.div
                key={edition.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  padding: '2rem',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  border: edition.featured ? '2px solid var(--accent-primary)' : '2px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '1.5rem' }}>{edition.icon}</div>
                  <h3 style={{ margin: 0 }}>{edition.title}</h3>
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  {edition.price} {edition.priceDetail}
                </div>

                {edition.roi && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(0, 180, 216, 0.1)', borderRadius: '6px' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Annual Savings</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{edition.roi.saving}</div>
                    </div>

                    <div style={{ padding: '0.75rem', background: 'rgba(59, 179, 80, 0.1)', borderRadius: '6px' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Payback Period</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#3fb950' }}>{edition.roi.payback}</div>
                    </div>

                    <div style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Compared to</div>
                      <div style={{ fontSize: '0.9rem' }}>{edition.roi.vs}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', maxWidth: '800px', margin: '2rem auto 0' }}>
            <h4 style={{ marginBottom: '0.75rem', color: 'var(--accent-primary)' }}>💡 ROI Calculation Methodology</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              ROI calculations are based on typical enterprise scenarios with 5-10 engineers. Savings include reduced tooling costs,
              decreased manual compliance work (40-60% time savings), and avoided delays from late-stage compliance issues.
              Actual savings vary based on team size, project complexity, and compliance requirements.
            </p>
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
