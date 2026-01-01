import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Layers, Shield, CheckCircle } from 'lucide-react'
import AnimatedText from './AnimatedText'
import NexDocSlideDeck from './NexDocSlideDeck'
import { useTranslation } from '../utils/i18n'
import './SyscribeProduct.css'

const SyscribeProduct = React.memo(() => {
  const { t } = useTranslation()
  return (
    <>
      {/* Hero Section with Slide Deck */}
      <section className="nexdoc-hero-with-slide" aria-labelledby="nexdoc-hero-heading">
        <div className="nexdoc-hero-background-overlay"></div>
        <div className="nexdoc-hero-slide-container">
          {/* Left Side - Hero Content */}
          <div className="nexdoc-hero-left">
            <motion.div 
              className="nexdoc-hero-content"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="nexdoc-hero-kicker"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {t('nexdoc.hero.kicker')}
              </motion.span>
              <h1 id="nexdoc-hero-heading" className="nexdoc-hero-title">
                <AnimatedText variant="gradient">
                  {t('nexdoc.hero.title')}
                </AnimatedText>
              </h1>
              <motion.div
                className="nexdoc-hero-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p>{t('nexdoc.hero.description')}</p>
                <div className="nexdoc-hero-features">
                  <p className="features-intro">{t('nexdoc.hero.features.lsp.intro')}</p>
                  <ul className="features-list">
                    <li>{t('nexdoc.hero.features.lsp.codeCompletion')}</li>
                    <li>{t('nexdoc.hero.features.lsp.diagnostics')}</li>
                    <li>{t('nexdoc.hero.features.lsp.navigation')}</li>
                    <li>{t('nexdoc.hero.features.lsp.hover')}</li>
                    <li>{t('nexdoc.hero.features.lsp.formatting')}</li>
                    <li>{t('nexdoc.hero.features.lsp.symbolRename')}</li>
                    <li>{t('nexdoc.hero.features.documentation')}</li>
                    <li>{t('nexdoc.hero.features.explorer')}</li>
                  </ul>
                </div>
              </motion.div>
              <motion.div 
                className="nexdoc-hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link to="/try-yourself" className="btn-primary-large">
                  {t('nexdoc.cta.try')}
                </Link>
                <a 
                  href="https://marketplace.visualstudio.com/items?itemName=SYSNEXsystems.sysmlv2-lsp-viewer" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-large"
                >
                  {t('nexdoc.cta.download')}
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Slide Deck */}
          <div className="nexdoc-slide-right">
            <NexDocSlideDeck />
          </div>
        </div>
      </section>

      {/* Commercial Products Section */}
      <section className="nexdoc-commercial-section">
        <div className="container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="commercial-section-header"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {t('nexdoc.commercial.heading')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="commercial-section-subtitle"
            >
              {t('nexdoc.commercial.subtitle')}
            </motion.p>
          </motion.div>

          {/* Single Metric Above Fold - Moved to expandable section */}
          <div className="commercial-metrics-section" style={{ display: 'none' }}>
            <details className="metrics-details">
              <summary className="metrics-summary">Performance Metrics</summary>
              <div className="commercial-metrics-grid">
                {/* Metrics content would go here */}
              </div>
            </details>
          </div>

          {/* Commercial Products Grid */}
          <div className="commercial-products-grid">
            {[
              {
                badge: 'In Progress',
                badgeClass: 'badge-beta',
                title: 'Standard',
                icon: Star,
                size: '~35-40 MB',
                bestFor: 'Best for: Professional teams needing documentation and traceability',
                description: 'Scope: Professional IDE extending Essential with automated documentation generation, requirements traceability, and model analytics capabilities.',
                availability: 'Status: In progress - Beta testing with design partners',
                features: [
                  'All Essential LSP features',
                  'Documentation generation (MkDocs/Sphinx)',
                  'Requirements traceability matrix',
                  'Model analytics and metrics',
                  'Email support with SLA'
                ],
                cta: 'Apply for Beta',
                featured: true
              },
              {
                badge: 'Planned',
                badgeClass: 'badge-development',
                title: 'Platform',
                icon: Layers,
                size: '~50-60 MB',
                bestFor: 'Best for: Enterprise teams requiring domain-specific integrations',
                description: 'Scope: Enterprise platform adding domain extensions for automotive (VSS), variability management (UVL), architecture languages (YAML/ADL), constraint solving (Z3), and extensibility (Python API).',
                availability: 'Status: Planned for Q2 2025 - Pilot partners wanted',
                features: [
                  'Everything in Standard',
                  'VSS automotive signal integration',
                  'UVL variability modeling',
                  'YAML architecture definitions (ADL/SUDL)',
                  'Z3 constraint solver integration',
                  'Python API for custom workflows',
                  'Advanced CST viewer and debugging'
                ],
                cta: 'Join Waitlist',
                featured: false
              },
              {
                badge: 'Planned',
                badgeClass: 'badge-development',
                title: 'Automotive/Safety',
                icon: Shield,
                size: '~60-70 MB',
                bestFor: 'Best for: Automotive OEM/Tier-1 requiring safety and process compliance',
                description: 'Scope: Automotive compliance tooling adding ASPICE work product automation, ISO 26262 safety validation, cybersecurity templates (ISO/SAE 21434), and audit-ready documentation. Not certified for production use.',
                availability: 'Status: Planned for Q2 2025 - Pilot programs available',
                features: [
                  'Everything in Platform',
                  'ASPICE work product automation (20 templates)',
                  'ISO 26262 ASIL decomposition validation',
                  'ISO/SAE 21434 cybersecurity templates',
                  'Constraint and safety rule validation',
                  'Audit-ready documentation generation',
                  'Compliance traceability reporting'
                ],
                cta: 'Contact for Pilot',
                featured: false
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                className={`commercial-product-card ${product.featured ? 'product-featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="product-card-header">
                  <motion.div 
                    className={`product-badge ${product.badgeClass}`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    {product.badge}
                  </motion.div>
                </div>
                <div className="product-card-body">
                  <h3 className="product-title">
                    {product.icon && <product.icon size={20} className="product-title-icon" />}
                    {product.title}
                  </h3>
                  <p className="product-size">{product.size}</p>
                  {product.bestFor && (
                    <p className="product-best-for">{product.bestFor}</p>
                  )}
                  <p className="product-description">{product.description}</p>
                  {product.availability && (
                    <div className="product-availability" style={{
                      padding: '0.75rem',
                      marginTop: '0.75rem',
                      marginBottom: '0.75rem',
                      background: 'rgba(0, 180, 216, 0.1)',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: 'var(--brand-cyan)',
                      borderLeft: '3px solid var(--brand-cyan)'
                    }}>
                      {product.availability}
                    </div>
                  )}
                  <ul className="product-features">
                    {product.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.4 + idx * 0.05 }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="product-card-footer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/contact" className="product-cta">
                      {product.cta}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
})

SyscribeProduct.displayName = 'SyscribeProduct'

export default SyscribeProduct

