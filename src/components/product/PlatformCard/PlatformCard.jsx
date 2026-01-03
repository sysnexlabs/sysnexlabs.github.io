import React from 'react'
import { motion } from 'framer-motion'
import StatusBadge from '../StatusBadge/StatusBadge'
import './PlatformCard.css'

/**
 * PlatformCard Component
 *
 * Displays a platform delivery model with icon, title, features, and link.
 * Used on the Platforms page to show different deployment options.
 */
const PlatformCard = ({ variant, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`platform-card ${variant.featured ? 'platform-card-featured' : ''}`}
    >
      {variant.badge && (
        <div className={`platform-card-badge ${variant.featured ? 'platform-card-badge-featured' : ''}`}>
          {variant.badge}
        </div>
      )}

      <div className="platform-card-icon">
        {typeof variant.icon === 'string' && variant.icon.startsWith('/assets/') ? (
          <img
            src={variant.icon}
            alt={variant.title}
            style={{height: '120px', width: 'auto', maxWidth: '120px', objectFit: 'contain'}}
          />
        ) : (
          variant.icon
        )}
      </div>

      <h3 className="platform-card-title">{variant.title}</h3>

      {variant.subtitle && (
        <p className="platform-card-subtitle">
          {variant.subtitle}
        </p>
      )}

      <StatusBadge status={variant.status} />

      <ul className="platform-card-features">
        {variant.features.slice(0, 5).map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
        {variant.features.length > 5 && (
          <li className="platform-card-features-more">
            +{variant.features.length - 5} more features...
          </li>
        )}
      </ul>

      {variant.link && (
        <a
          href={variant.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn primary platform-card-cta"
        >
          Learn More →
        </a>
      )}
    </motion.div>
  )
}

export default PlatformCard
