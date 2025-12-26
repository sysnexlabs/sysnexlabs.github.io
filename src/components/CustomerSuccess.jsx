import React from 'react'
import { motion } from 'framer-motion'
import SpotlightCard from './SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './CustomerSuccess.css'

const CustomerSuccess = () => {
  const { t } = useTranslation()

  const caseStudies = [
    {
      company: t('customers.case1.company'),
      industry: t('customers.case1.industry'),
      challenge: t('customers.case1.challenge'),
      solution: t('customers.case1.solution'),
      outcome: t('customers.case1.outcome'),
      icon: '🚗'
    },
    {
      company: t('customers.case2.company'),
      industry: t('customers.case2.industry'),
      challenge: t('customers.case2.challenge'),
      solution: t('customers.case2.solution'),
      outcome: t('customers.case2.outcome'),
      icon: '✈️'
    },
    {
      company: t('customers.case3.company'),
      industry: t('customers.case3.industry'),
      challenge: t('customers.case3.challenge'),
      solution: t('customers.case3.solution'),
      outcome: t('customers.case3.outcome'),
      icon: '🏥'
    }
  ]

  return (
    <section className="customer-success-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">{t('customers.heading')}</h2>
          <p className="section-subtitle">{t('customers.subtitle')}</p>
        </motion.div>
        <div className="case-studies-grid">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <SpotlightCard className="case-study-card">
                <div className="case-study-header">
                  <div className="case-study-icon">{study.icon}</div>
                  <div className="case-study-meta">
                    <h3 className="case-study-company">{study.company}</h3>
                    <span className="case-study-industry">{study.industry}</span>
                  </div>
                </div>
                <div className="case-study-content">
                  <div className="case-study-item">
                    <strong className="case-study-label">{t('customers.challenge.label')}</strong>
                    <p className="case-study-text">{study.challenge}</p>
                  </div>
                  <div className="case-study-item">
                    <strong className="case-study-label">{t('customers.solution.label')}</strong>
                    <p className="case-study-text">{study.solution}</p>
                  </div>
                  <div className="case-study-item">
                    <strong className="case-study-label">{t('customers.outcome.label')}</strong>
                    <p className="case-study-text">{study.outcome}</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CustomerSuccess

