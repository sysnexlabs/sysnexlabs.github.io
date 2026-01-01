import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBadge from '../StatusBadge/StatusBadge'
import './EditionCard.css'

/**
 * EditionCard Component
 *
 * Displays a commercial edition with pricing, features, and CTA.
 * Used on the Editions page to show different build variants.
 */
const EditionCard = ({ edition, index = 0 }) => {
  const isRecommended = edition.badge === 'Recommended'
  const isFree = edition.badge === 'Free'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`edition-card ${isRecommended ? 'edition-card-recommended' : ''}`}
    >
      {edition.badge && (
        <div className={`edition-card-badge ${isFree ? 'edition-card-badge-free' : ''} ${isRecommended ? 'edition-card-badge-recommended' : ''}`}>
          {edition.badge}
        </div>
      )}

      <div className="edition-card-icon">
        {edition.icon}
      </div>

      <h3 className="edition-card-title">{edition.title}</h3>

      {edition.subtitle && (
        <p className="edition-card-subtitle">
          {edition.subtitle}
        </p>
      )}

      {/* Pricing */}
      <div className="edition-card-pricing">
        <div className="edition-card-price">{edition.price}</div>
        {edition.perSeat && (
          <div className="edition-card-price-note">per seat/year</div>
        )}
      </div>

      {/* Size */}
      <div className="edition-card-size">
        <div className="edition-card-size-label">Package Size:</div>
        <div className="edition-card-size-value">{edition.size}</div>
      </div>

      {/* Status */}
      <StatusBadge status={edition.status} />

      {/* Description */}
      {edition.description && (
        <p className="edition-card-description">
          {edition.description}
        </p>
      )}

      {/* Features */}
      <div className="edition-card-section">
        <h4 className="edition-card-section-title">Included Features:</h4>
        <ul className="edition-card-features">
          {edition.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Use Cases */}
      {edition.useCases && edition.useCases.length > 0 && (
        <details className="edition-card-details">
          <summary className="edition-card-details-summary">
            Best For ({edition.useCases.length})
          </summary>
          <ul className="edition-card-use-cases">
            {edition.useCases.map((useCase, i) => (
              <li key={i}>{useCase}</li>
            ))}
          </ul>
        </details>
      )}

      {/* CTA */}
      <div className="edition-card-cta">
        {isFree ? (
          <a
            href="https://marketplace.visualstudio.com/items?itemName=sysnex.sysmlv2"
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
          >
            Download Free →
          </a>
        ) : edition.status.includes('✅') ? (
          <Link to="/contact" className="btn primary">
            Contact Sales →
          </Link>
        ) : (
          <button className="btn ghost" disabled>
            Coming Soon
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default EditionCard
