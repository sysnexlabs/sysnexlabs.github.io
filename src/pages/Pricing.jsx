import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '../utils/i18n'
import SpotlightCard from '../components/SpotlightCard'
import './Pricing.css'

const Pricing = () => {
  const { t } = useTranslation()

  const plans = [
    {
      name: 'Essential',
      badge: 'Free',
      price: 'Free',
      description: 'Read-only viewer for SysML v2 models',
      bestFor: 'Best for: Individual developers and teams exploring SysML v2',
      features: [
        'Read-only model viewing',
        'Syntax highlighting',
        'Navigation (go-to-definition)',
        'Documentation panel',
        'Model statistics',
        'Web-based access'
      ],
      cta: 'Try Viewer',
      link: '/try-yourself',
      featured: false
    },
    {
      name: 'Standard',
      badge: 'Recommended',
      price: 'Contact for pricing',
      description: 'Complete professional IDE with full LSP features',
      bestFor: 'Best for: Professional systems engineering teams requiring full IDE capabilities',
      features: [
        'Complete LSP implementation',
        'Requirements & Traceability',
        'Production-ready support'
      ],
      featuresExpanded: [
        'All Essential features',
        'Documentation Viewer',
        'Diagram Editor & Visualization',
        'Trade Study Analysis',
        'Model Analytics & Metrics'
      ],
      cta: 'Get License',
      link: '/contact',
      featured: true
    },
    {
      name: 'Platform',
      badge: 'Enterprise',
      price: 'Contact for pricing',
      description: 'Enterprise platform with domain extensions',
      bestFor: 'Best for: Enterprise teams requiring domain-specific integrations',
      features: [
        'Domain extensions',
        'VSS & YAML Architecture',
        'Python API & Bindings'
      ],
      featuresExpanded: [
        'Everything in Standard',
        'UVL Variability Management',
        'Z3 Solver Integration',
        'CST Viewer'
      ],
      cta: 'Contact Sales',
      link: '/contact',
      featured: false
    },
    {
      name: 'Automotive/Safety',
      badge: 'Automotive',
      price: 'Direct sales only',
      description: 'Automotive compliance variant with ASPICE and ISO 26262',
      bestFor: 'Best for: Automotive OEM/Tier-1 teams requiring ASPICE and ISO 26262 compliance',
      features: [
        'ASPICE audit-ready scope',
        'ISO 26262 ASIL validation',
        'ISO 15288 foundation'
      ],
      featuresExpanded: [
        'Everything in Platform',
        'Requirements & Traceability',
        'ASIL Decomposition Validator',
        'Change Impact Analysis'
      ],
      cta: 'Contact Sales',
      link: '/contact',
      featured: false
    }
  ]

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pricing-hero-content"
          >
            <h1>Pricing & Licensing</h1>
            <p className="pricing-hero-subtitle">
              Transparent pricing and flexible licensing options for teams of all sizes. 
              All plans include production-ready support and regular updates.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pricing-plans-section">
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`pricing-card ${plan.featured ? 'featured' : ''}`}
              >
                {plan.badge && (
                  <div className={`pricing-badge ${plan.badge.toLowerCase().replace(/\s+/g, '-')}`}>
                    {plan.badge}
                  </div>
                )}
                <h3 className="pricing-plan-name">{plan.name}</h3>
                <div className="pricing-price">{plan.price}</div>
                {plan.bestFor && (
                  <p className="pricing-best-for">{plan.bestFor}</p>
                )}
                <p className="pricing-description">{plan.description}</p>
                <ul className="pricing-features">
                  {plan.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx}>✅ {feature}</li>
                  ))}
                </ul>
                {plan.featuresExpanded && plan.featuresExpanded.length > 0 && (
                  <details className="pricing-features-expanded">
                    <summary>Additional capabilities</summary>
                    <ul className="pricing-features-expanded-list">
                      {plan.featuresExpanded.map((feature, idx) => (
                        <li key={idx}>✅ {feature}</li>
                      ))}
                    </ul>
                  </details>
                )}
                <div className="pricing-cta">
                  <Link to={plan.link} className="btn primary">
                    {plan.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-info-section">
        <div className="container">
          <div className="pricing-info-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3>Licensing Units</h3>
              <ul>
                <li><strong>Per-seat:</strong> Individual developer licenses</li>
                <li><strong>Organization:</strong> Unlimited users within your organization</li>
                <li><strong>Repository:</strong> Per-repository licensing for Git-based workflows</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3>Support Levels</h3>
              <ul>
                <li><strong>Essential:</strong> Community support via GitHub</li>
                <li><strong>Standard:</strong> Email support with SLA</li>
                <li><strong>Platform:</strong> Priority support with dedicated channel</li>
                <li><strong>Automotive:</strong> Enterprise support with on-site options</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>Evaluation Terms</h3>
              <ul>
                <li>30-day evaluation period available</li>
                <li>Full feature access during evaluation</li>
                <li>No credit card required</li>
                <li>Technical support included</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pricing-cta-section">
        <div className="container">
          <div className="pricing-cta-content">
            <h2>Need a Custom Solution?</h2>
            <p>We offer custom licensing and deployment options for enterprise customers with specific requirements.</p>
            <Link to="/contact" className="btn primary large">Contact Sales</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing


