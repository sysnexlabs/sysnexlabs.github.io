import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import ComplianceCard from '../../components/product/ComplianceCard/ComplianceCard'
import ComparisonTable from '../../components/product/ComparisonTable/ComparisonTable'
import StatsGrid from '../../components/StatsGrid/StatsGrid'
import { useTranslation } from '../../utils/i18n'
import { useTheme } from '../../contexts/ThemeContext'
import { complianceVariants, getProductionReadyVariants, getPlannedVariants, getVariantsByIndustry } from '../../data/product'
import '../Page.css'
import '../Product.css'

/**
 * Compliance Page - Industry Compliance Variants
 *
 * Shows industry-specific compliance solutions for automotive, aviation, medical, and railway.
 * Displays compliance variants with standards coverage, features, and ROI information.
 */
const Compliance = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [filter, setFilter] = useState('all')

  const getFilteredVariants = () => {
    switch (filter) {
      case 'ready':
        return getProductionReadyVariants()
      case 'planned':
        return getPlannedVariants()
      case 'automotive':
        return getVariantsByIndustry('Automotive')
      case 'aviation':
        return getVariantsByIndustry('Aviation')
      case 'medical':
        return getVariantsByIndustry('Medical')
      case 'railway':
        return getVariantsByIndustry('Railway')
      default:
        return complianceVariants
    }
  }

  const filteredVariants = getFilteredVariants()

  const comparisonRows = [
    {
      label: 'Standards',
      getValue: (variant) => variant.standards.join(', ')
    },
    {
      label: 'Price Range',
      getValue: (variant) => variant.price
    },
    {
      label: 'Package Size',
      getValue: (variant) => <small>{variant.size}</small>
    },
    {
      label: 'Status',
      getValue: (variant) => variant.status
    }
  ]

  return (
    <div className="page">
      <div className="container">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Overview', path: '/overview' },
          { label: 'Compliance' }
        ]} />
      </div>

      {/* Hero Section */}
      <section className="page-hero-section hero-compliance">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="product-hero-content"
          >
            <div className="hero-badge">Industry Solutions</div>
            <h1>Compliance Variants</h1>
            <p className="page-hero-description">
              Industry-specific compliance solutions built on NexSuite's foundation.
              From automotive safety (ISO 26262, ASPICE) to aviation (DO-178C), medical (IEC 62304),
              and railway (EN 50128) - we provide complete compliance toolchains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="page-content-section section-py-2">
        <div className="container">
          <StatsGrid
            stats={[
              { number: complianceVariants.length, label: 'Total Variants' },
              { number: getProductionReadyVariants().length, label: 'Production-Ready' },
              { number: 4, label: 'Industries Covered' },
              { number: '15+', label: 'Standards Supported' }
            ]}
            maxWidth="800px"
          />
        </div>
      </section>

      {/* Filter Section */}
      <section className="page-content-section" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setFilter('all')}
              className={`btn ${filter === 'all' ? 'primary' : 'ghost'}`}
              style={{ minWidth: '120px' }}
            >
              All Variants ({complianceVariants.length})
            </button>
            <button
              onClick={() => setFilter('ready')}
              className={`btn ${filter === 'ready' ? 'primary' : 'ghost'}`}
              style={{ minWidth: '120px' }}
            >
              ✅ Ready ({getProductionReadyVariants().length})
            </button>
            <button
              onClick={() => setFilter('planned')}
              className={`btn ${filter === 'planned' ? 'primary' : 'ghost'}`}
              style={{ minWidth: '120px' }}
            >
              🟡 Planned ({getPlannedVariants().length})
            </button>
            <button
              onClick={() => setFilter('automotive')}
              className={`btn ${filter === 'automotive' ? 'primary' : 'ghost'}`}
              style={{ minWidth: '120px' }}
            >
              🚗 Automotive
            </button>
            <button
              onClick={() => setFilter('aviation')}
              className={`btn ${filter === 'aviation' ? 'primary' : 'ghost'}`}
              style={{ minWidth: '120px' }}
            >
              ✈️ Aviation
            </button>
            <button
              onClick={() => setFilter('medical')}
              className={`btn ${filter === 'medical' ? 'primary' : 'ghost'}`}
              style={{ minWidth: '120px' }}
            >
              🏥 Medical
            </button>
            <button
              onClick={() => setFilter('railway')}
              className={`btn ${filter === 'railway' ? 'primary' : 'ghost'}`}
              style={{ minWidth: '120px' }}
            >
              🚆 Railway
            </button>
          </div>
        </div>
      </section>

      {/* Compliance Cards Grid */}
      <section className="page-content-section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="product-variants-grid" style={{ gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {filteredVariants.map((variant, index) => (
              <ComplianceCard key={variant.id} variant={variant} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Compliance Variant Comparison</h2>
            <p className="section-subtitle">
              Compare standards coverage and pricing across all compliance variants
            </p>
          </div>

          <ComparisonTable
            items={complianceVariants}
            rows={comparisonRows}
          />
        </div>
      </section>

      {/* Standards Overview */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Standards Supported</h2>
            <p className="section-subtitle">
              Comprehensive coverage of major industry standards
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '2px solid var(--accent-primary)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚙️</div>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>ISO/IEC 15288</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Systems Engineering Foundation</p>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Lifecycle processes for systems engineering. Foundation for all compliance variants.
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Status: 🟡 83% Complete
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚗</div>
              <h3 style={{ marginBottom: '0.5rem' }}>ASPICE</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Automotive Process Excellence</p>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Automotive SPICE process assessment model. Level 2/3 compliance support.
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Status: 🟡 45% Complete
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛡️</div>
              <h3 style={{ marginBottom: '0.5rem' }}>ISO 26262</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Functional Safety (Automotive)</p>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Road vehicles functional safety. ASIL decomposition, FFI analysis, safety case generation.
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Status: 🟡 45% Complete
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
              <h3 style={{ marginBottom: '0.5rem' }}>ISO/SAE 21434</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Cybersecurity (Automotive)</p>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Road vehicles cybersecurity engineering. TARA, attack tree modeling, UNECE WP.29 compliance.
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Status: ❌ Planned Q3 2026
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✈️</div>
              <h3 style={{ marginBottom: '0.5rem' }}>DO-178C / DO-331</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Aviation Software Certification</p>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Software considerations in airborne systems. Model-based development, tool qualification.
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Status: ❌ Planned Q4 2026
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏥</div>
              <h3 style={{ marginBottom: '0.5rem' }}>IEC 62304</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Medical Device Software</p>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Medical device software lifecycle. Safety classification, SOUP management, FDA submission support.
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Status: ❌ Planned Q2 2028
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚂</div>
              <h3 style={{ marginBottom: '0.5rem' }}>EN 50128</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Railway Safety Systems</p>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Railway control and protection systems. SIL management, RAMS compliance, CENELEC standards.
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Status: ❌ Planned Q3 2028
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Compliance Matters */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Industry Compliance Matters</h2>
            <p className="section-subtitle">
              Meeting regulatory requirements is critical for market access and product success
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚖️</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Regulatory Requirements</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Meet mandatory safety and quality standards for your industry.
                Avoid costly delays and market access issues.
              </p>
            </div>

            <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💰</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Cost Efficiency</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Reduce compliance costs by 40-60% through automation and
                integrated toolchains. Faster time to market.
              </p>
            </div>

            <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Quality Assurance</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Improve product quality through systematic requirements management,
                traceability, and verification.
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
            <h2>Ready to Ensure Compliance?</h2>
            <p>Contact our team to discuss your specific compliance requirements</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn primary large">Contact Sales</Link>
              <Link to="/try-yourself" className="btn ghost large">Try Interactive Demo</Link>
            </div>
            <p className="cta-note">Start with a compliance assessment. No obligation.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Compliance
