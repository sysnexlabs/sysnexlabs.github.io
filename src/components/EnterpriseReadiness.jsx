import React from 'react'
import { motion } from 'framer-motion'
import SpotlightCard from './SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './EnterpriseReadiness.css'

const EnterpriseReadiness = React.memo(() => {
  const { t } = useTranslation()

  const readinessItems = [
    {
      title: t('home.enterprise.support.title'),
      description: t('home.enterprise.support.description'),
      icon: '🔄'
    },
    {
      title: t('home.enterprise.compatibility.title'),
      description: t('home.enterprise.compatibility.description'),
      icon: '🔒'
    },
    {
      title: t('home.enterprise.governance.title'),
      description: t('home.enterprise.governance.description'),
      icon: '📋'
    },
    {
      title: 'Platform Governance',
      description: 'Long-term infrastructure commitment with clear versioning philosophy, upgrade paths, and deprecation policies.',
      icon: '🏛️'
    }
  ]

  return (
    <section className="enterprise-readiness-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">{t('home.enterprise.heading')}</h2>
          <p className="section-subtitle">{t('home.enterprise.subtitle')}</p>
        </motion.div>
        <div className="readiness-grid">
          {readinessItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <SpotlightCard className="readiness-card">
                <div className="readiness-icon">{item.icon}</div>
                <h3 className="readiness-title">{item.title}</h3>
                <p className="readiness-description">{item.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

EnterpriseReadiness.displayName = 'EnterpriseReadiness'

export default EnterpriseReadiness

