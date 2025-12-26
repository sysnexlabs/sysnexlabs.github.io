import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '../utils/i18n'
import SpotlightCard from '../components/SpotlightCard'
import './Pricing.css'

const Pricing = React.memo(() => {
  const { t } = useTranslation()

  const plans = [
    {
      name: 'Essential (Free)',
      badge: 'Available Now',
      badgeClass: 'badge-available',
      price: '$0 forever',
      description: 'Full SysML v2 LSP for VS Code',
      bestFor: 'Best for: Individual developers and teams exploring SysML v2',
      features: [
        '18 LSP features (completion, navigation, diagnostics)',
        'Syntax highlighting & formatting',
        'Hover information & symbol rename',
        'MIT license (commercial use OK)',
        'Community support (GitHub)',
        'Web-based model viewer'
      ],
      cta: 'Download Free',
      link: '/try-yourself',
      featured: false,
      availability: 'Production ready. Download from VS Code Marketplace.'
    },
    {
      name: 'Standard',
      badge: 'Beta Testing',
      badgeClass: 'badge-beta',
      price: 'TBD ($50-100/user/mo)',
      description: 'Professional IDE with documentation & traceability',
      bestFor: 'Best for: Professional teams requiring advanced IDE capabilities',
      features: [
        'All Essential features',
        'Documentation generator (MkDocs/Sphinx)',
        'Requirements traceability matrix',
        'Model analytics dashboard',
        'Email support with SLA',
        '6-month beta trial available'
      ],
      cta: 'Apply for Beta',
      link: '/contact',
      featured: true,
      availability: 'Beta testing now. Seeking design partners.'
    },
    {
      name: 'Platform',
      badge: 'Q2 2025',
      badgeClass: 'badge-development',
      price: 'TBD ($200-500/user/mo)',
      description: 'Enterprise platform with domain extensions',
      bestFor: 'Best for: Enterprise teams requiring domain integrations',
      features: [
        'Everything in Standard',
        'UVL variability management',
        'VSS/YAML architecture integration',
        'Z3 solver integration',
        'Python API for custom workflows',
        'CST viewer & advanced debugging'
      ],
      cta: 'Join Waitlist',
      link: '/contact',
      featured: false,
      availability: 'Active development. Pilot partners wanted.'
    },
    {
      name: 'Automotive/Safety',
      badge: 'Q2 2025',
      badgeClass: 'badge-development',
      price: 'Contact for pricing',
      description: 'Automotive compliance with ASPICE & ISO 26262',
      bestFor: 'Best for: Automotive OEM/Tier-1 requiring safety compliance',
      features: [
        'Everything in Platform',
        'ASPICE work product automation (20 templates)',
        'ISO 26262 ASIL decomposition validator',
        'ISO/SAE 21434 cybersecurity templates',
        'Audit-ready documentation',
        'Enterprise support & on-site training'
      ],
      cta: 'Contact Sales',
      link: '/contact',
      featured: false,
      availability: 'In development. Pilot program available.'
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
            <h1>Pricing & Availability</h1>
            <p className="pricing-hero-subtitle">
              Honest, transparent pricing. Free tier is genuinely useful. No bait-and-switch. No lock-in.
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
                  <div className={`pricing-badge ${plan.badgeClass}`}>
                    {plan.badge}
                  </div>
                )}
                <h3 className="pricing-plan-name">{plan.name}</h3>
                <div className="pricing-price">{plan.price}</div>
                {plan.bestFor && (
                  <p className="pricing-best-for">{plan.bestFor}</p>
                )}
                <p className="pricing-description">{plan.description}</p>

                {/* Availability status */}
                <div className="pricing-availability" style={{
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  background: 'rgba(0, 180, 216, 0.1)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: 'var(--brand-cyan)'
                }}>
                  {plan.availability}
                </div>

                <ul className="pricing-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>✅ {feature}</li>
                  ))}
                </ul>

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

      {/* What's Honest About Our Pricing */}
      <section className="pricing-honesty-section" style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What's Honest About Our Pricing</h2>
          </div>
          <div className="pricing-info-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SpotlightCard>
                <h3 style={{ color: 'var(--color-success)' }}>✅ What We Deliver</h3>
                <ul className="about-list">
                  <li>✅ Free tier is genuinely useful (full LSP)</li>
                  <li>✅ Open core = fork anytime (MIT license)</li>
                  <li>✅ Fair pricing for compliance features</li>
                  <li>✅ Clear about what's available vs in development</li>
                </ul>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SpotlightCard>
                <h3 style={{ color: 'var(--color-error)' }}>❌ What We Don't Offer (Yet)</h3>
                <ul className="about-list no-bullets">
                  <li>❌ 24/7 support (one-person team)</li>
                  <li>❌ SLA guarantees (early-stage product)</li>
                  <li>❌ Audit-certified toolchain (not validated)</li>
                  <li>❌ Production customer references</li>
                </ul>
              </SpotlightCard>
            </motion.div>
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
              <h3>Licensing Options</h3>
              <ul>
                <li><strong>Per-seat:</strong> Individual developer licenses</li>
                <li><strong>Team:</strong> Small team (5-20 users)</li>
                <li><strong>Organization:</strong> Unlimited users</li>
                <li><strong>Educational:</strong> Free for academic use</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3>Evaluation Terms</h3>
              <ul>
                <li>Essential: Free forever, no evaluation needed</li>
                <li>Standard: 6-month beta trial (no credit card)</li>
                <li>Platform: Pilot program with design partners</li>
                <li>Automotive: Custom evaluation terms</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>Support</h3>
              <ul>
                <li><strong>Essential:</strong> Community (GitHub Discussions)</li>
                <li><strong>Standard:</strong> Email support</li>
                <li><strong>Platform:</strong> Priority support</li>
                <li><strong>Automotive:</strong> Dedicated support + training</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pricing-cta-section">
        <div className="container">
          <div className="pricing-cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Free tier is production-ready. Beta programs open for Standard & Platform tiers.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/try-yourself" className="btn primary large">Try Free Version</Link>
              <Link to="/contact" className="btn ghost large">Apply for Beta</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
})

Pricing.displayName = 'Pricing'

export default Pricing
