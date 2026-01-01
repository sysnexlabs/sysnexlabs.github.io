import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBadge from '../StatusBadge/StatusBadge'
import './ComplianceCard.css'

/**
 * ComplianceCard Component
 *
 * Displays a compliance variant with standards, features, industries, and ROI.
 * Used on the Compliance page to show industry-specific solutions.
 */
const ComplianceCard = ({ variant, index = 0 }) => {
  const isFoundation = variant.badge === 'Foundation'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`compliance-card ${isFoundation ? 'compliance-card-foundation' : ''}`}
    >
      {variant.badge && (
        <div className={`compliance-card-badge ${isFoundation ? 'compliance-card-badge-foundation' : ''}`}>
          {variant.badge}
        </div>
      )}

      <div className="compliance-card-icon">
        {variant.icon}
      </div>

      <h3 className="compliance-card-title">{variant.title}</h3>

      {/* Size and Price */}
      <div className="compliance-card-meta">
        <div className="compliance-card-size">
          <span className="compliance-card-meta-label">Size:</span>
          <span className="compliance-card-meta-value">{variant.size}</span>
        </div>
        <div className="compliance-card-price">
          <span className="compliance-card-meta-label">Price:</span>
          <span className="compliance-card-meta-value">{variant.price}</span>
        </div>
      </div>

      <StatusBadge status={variant.status} />

      <p className="compliance-card-description">
        {variant.description}
      </p>

      {/* Standards */}
      {variant.standards && variant.standards.length > 0 && (
        <div className="compliance-card-section">
          <h4 className="compliance-card-section-title">Standards Covered:</h4>
          <div className="compliance-card-tags">
            {variant.standards.map((standard, i) => (
              <span key={i} className="compliance-card-tag">{standard}</span>
            ))}
          </div>
        </div>
      )}

      {/* Key Features */}
      {variant.features && variant.features.length > 0 && (
        <div className="compliance-card-section">
          <h4 className="compliance-card-section-title">Key Features:</h4>
          <ul className="compliance-card-features">
            {variant.features.slice(0, 4).map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
            {variant.features.length > 4 && (
              <li className="compliance-card-features-more">
                +{variant.features.length - 4} more features...
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Industries */}
      {variant.industries && variant.industries.length > 0 && (
        <details className="compliance-card-details">
          <summary className="compliance-card-details-summary">
            Target Industries ({variant.industries.length})
          </summary>
          <div className="compliance-card-tags">
            {variant.industries.map((industry, i) => (
              <span key={i} className="compliance-card-tag compliance-card-tag-secondary">
                {industry}
              </span>
            ))}
          </div>
        </details>
      )}

      {/* ROI */}
      {variant.roi && (
        <details className="compliance-card-details">
          <summary className="compliance-card-details-summary">
            ROI Information
          </summary>
          <div className="compliance-card-roi">
            <div className="compliance-card-roi-item">
              <strong>Time Savings:</strong> {variant.roi.timeSavings}
            </div>
            <div className="compliance-card-roi-item">
              <strong>Cost Reduction:</strong> {variant.roi.costReduction}
            </div>
            <div className="compliance-card-roi-item">
              <strong>Quality Improvement:</strong> {variant.roi.qualityImprovement}
            </div>
          </div>
        </details>
      )}

      {/* CTA */}
      <div className="compliance-card-cta">
        {variant.status.includes('✅') ? (
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

export default ComplianceCard
