import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'
import StatusBadge from '../../../components/product/StatusBadge/StatusBadge'
import SpotlightCard from '../../../components/SpotlightCard'
import { useTranslation } from '../../../utils/i18n'
import { useTheme } from '../../../contexts/ThemeContext'
import { getProductById } from '../../../data/product'
import '../../Page.css'
import '../../Product.css'

/**
 * NexTest Product Detail Page
 *
 * Test case management with requirements traceability and coverage analysis.
 */
const NexTest = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const product = getProductById('nextest')

  if (!product) {
    return <div>Product not found</div>
  }

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

      {/* Hero Section */}
      <section className="page-hero-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="product-hero-content"
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{product.icon}</div>
            <div className="hero-badge">{product.badge} Edition</div>
            <h1>{product.title}</h1>
            <p className="product-subtitle">{product.subtitle}</p>
            <StatusBadge status={product.status} />
            <p className="page-hero-description" style={{ marginTop: '1.5rem' }}>
              {product.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Key Features</h2>
            <p className="section-subtitle">
              Complete test lifecycle management integrated with requirements
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            {product.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '1.5rem',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✨</div>
                <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Breakdown */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Components</h2>
            <p className="section-subtitle">
              NexTest includes multiple components for comprehensive test management
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem', maxWidth: '800px', margin: '2rem auto 0' }}>
            {product.components.map((component, index) => (
              <SpotlightCard key={index}>
                <div style={{ padding: '2rem' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'var(--accent-primary)',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    {component.edition}
                  </div>
                  <h3 style={{ marginBottom: '0.5rem' }}>{component.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {component.description}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Test Workflow */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Test Workflow</h2>
            <p className="section-subtitle">
              End-to-end test management from planning to execution
            </p>
          </div>

          <div style={{ maxWidth: '1000px', margin: '2rem auto 0' }}>
            <SpotlightCard>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Complete Test Lifecycle</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
                    <h4>Test Planning</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      Define test strategies and create test cases
                    </p>
                  </div>

                  <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔗</div>
                    <h4>Traceability</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      Link test cases to requirements
                    </p>
                  </div>

                  <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>▶️</div>
                    <h4>Execution</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      Run tests manually or automated
                    </p>
                  </div>

                  <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                    <h4>Reporting</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      Generate coverage and status reports
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                  <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Continuous Integration</p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    NexTest integrates seamlessly with CI/CD pipelines. Automatically run tests on every commit,
                    track regression, and ensure all requirements remain verified.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Coverage Analysis */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Coverage Analysis</h2>
            <p className="section-subtitle">
              Real-time visibility into test coverage and verification status
            </p>
          </div>

          <div style={{ maxWidth: '900px', margin: '2rem auto 0' }}>
            <SpotlightCard>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Multi-Dimensional Coverage</h3>

                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>Requirements Coverage</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Track which requirements have test cases and which are untested. Automatically
                    identify coverage gaps and ensure 100% requirement verification.
                  </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>Test Execution Coverage</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Monitor which test cases have been executed and their pass/fail status.
                    Track regression test results over time.
                  </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>Code Coverage Integration</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Integrate with code coverage tools to ensure implementation is fully tested.
                    Link code coverage back to requirements and test cases.
                  </p>
                </div>

                <div>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>Compliance Reporting</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Generate compliance reports for ISO 26262, DO-178C, IEC 62304, and other standards.
                    Show full traceability from requirements through tests to results.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Use Cases</h2>
            <p className="section-subtitle">
              How NexTest fits into your workflow
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem', maxWidth: '900px', margin: '2rem auto 0' }}>
            {product.useCases.map((useCase, index) => (
              <div
                key={index}
                style={{
                  padding: '1.5rem',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📌</div>
                <p style={{ fontWeight: '500' }}>{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Availability */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Pricing & Availability</h2>
            <p className="section-subtitle">
              {product.pricing}
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              NexTest is available as part of the <strong>{product.badge} edition</strong>.
              Automated test execution requires the Platform edition.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/editions" className="btn primary large">
                View Editions →
              </Link>
              <Link to="/pricing" className="btn ghost large">
                See Pricing
              </Link>
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
            <h2>Ready to Try NexTest?</h2>
            <p>Experience comprehensive test management with full requirements traceability</p>
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

export default NexTest
