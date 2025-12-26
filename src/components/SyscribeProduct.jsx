import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedText from './AnimatedText'
import { useTranslation } from '../utils/i18n'
import './SyscribeProduct.css'

const SyscribeProduct = () => {
  const { t } = useTranslation()
  return (
    <>
      {/* Hero Section */}
      <section className="syscribe-hero" aria-labelledby="syscribe-hero-heading">
        <div className="syscribe-hero-background-overlay"></div>
        <div className="syscribe-hero-container">
          <motion.div 
            className="syscribe-hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              className="syscribe-hero-kicker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t('syscribe.hero.kicker')}
            </motion.span>
            <h1 id="syscribe-hero-heading" className="syscribe-hero-title">
              <AnimatedText variant="gradient">
                {t('syscribe.hero.title')}
              </AnimatedText>
            </h1>
            <motion.p 
              className="syscribe-hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {t('syscribe.hero.description')}
            </motion.p>
            <motion.div 
              className="syscribe-hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/try-yourself" className="btn-primary-large">
                {t('syscribe.cta.try')}
              </Link>
              <a 
                href="https://marketplace.visualstudio.com/items?itemName=SYSNEXsystems.sysmlv2-lsp-viewer" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-large"
              >
                {t('syscribe.cta.download')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Commercial Products Section */}
      <section className="syscribe-commercial-section">
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
              {t('syscribe.commercial.heading')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="commercial-section-subtitle"
            >
              {t('syscribe.commercial.subtitle')}
            </motion.p>
          </motion.div>

          {/* Metrics Section */}
          <div className="commercial-metrics-grid">
            {[
              {
                badge: 'Recommended',
                badgeClass: 'badge-featured',
                title: '🔷 Standard',
                size: '~35-40 MB',
                description: 'Complete professional IDE: all LSP features, documentation viewer, model explorer, requirements tracking, diagram visualization, trade study analysis, and quality analytics.',
                features: [
                  'All Essential features',
                  'Documentation Viewer (MkDocs/Sphinx)',
                  'Requirements Manager & Traceability',
                  'Diagram Editor & Visualization',
                  'Trade Study Analysis (MCDA)',
                  'Model Analytics & Metrics',
                  'Production-Ready'
                ],
                cta: 'Get License',
                featured: true
              },
              {
                badge: 'Enterprise',
                badgeClass: 'badge-enterprise',
                title: '🔶 Platform',
                size: '~50-60 MB',
                description: 'Enterprise platform with domain extensions: VSS (Vehicle Signal Specification), YAML Architecture (ADL/SUDL), UVL variability management with Z3 solver, and Python bindings.',
                features: [
                  'Everything in Standard',
                  'VSS Integration & Synchronization',
                  'YAML Architecture (ADL/SUDL)',
                  'UVL Variability Management',
                  'Z3 Solver Integration (SMT)',
                  'Python API & Bindings',
                  'CST Viewer'
                ],
                cta: 'Contact Sales',
                featured: false
              },
              {
                badge: 'Automotive',
                badgeClass: 'badge-automotive',
                title: '🛡️ Automotive/Safety',
                size: '~80-90 MB',
                description: 'Automotive compliance variant: ASPICE Level 2/3 compliance, ISO 26262 functional safety (ASIL decomposition validation), ISO 15288 systems engineering foundation. Direct sales only.',
                features: [
                  'Everything in Platform',
                  'ASPICE Work Products (5/20 types)',
                  'ISO 26262 ASIL Validation',
                  'ISO 15288 Foundation (80%)',
                  'Requirements & Traceability',
                  'ASIL Decomposition Validator',
                  'Change Impact Analysis'
                ],
                cta: 'Contact Sales',
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
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-size">{product.size}</p>
                  <p className="product-description">{product.description}</p>
                  <ul className="product-features">
                    {product.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.4 + idx * 0.05 }}
                      >
                        ✅ {feature}
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
}

export default SyscribeProduct

