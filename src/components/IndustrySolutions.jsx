import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from './SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './IndustrySolutions.css'

const IndustrySolutions = () => {
  const { t } = useTranslation()

  const industries = [
    {
      icon: '🚗',
      title: t('industries.automotive.title'),
      description: t('industries.automotive.description'),
      benefits: [
        t('industries.automotive.benefit1'),
        t('industries.automotive.benefit2'),
        t('industries.automotive.benefit3')
      ],
      standards: ['ISO 26262', 'ASPICE', 'ISO/SAE 21434'],
      gradient: 'automotive'
    },
    {
      icon: '✈️',
      title: t('industries.aerospace.title'),
      description: t('industries.aerospace.description'),
      benefits: [
        t('industries.aerospace.benefit1'),
        t('industries.aerospace.benefit2'),
        t('industries.aerospace.benefit3')
      ],
      standards: ['DO-178C', 'ARP4754', 'DO-254'],
      gradient: 'aerospace'
    },
    {
      icon: '🏥',
      title: t('industries.medical.title'),
      description: t('industries.medical.description'),
      benefits: [
        t('industries.medical.benefit1'),
        t('industries.medical.benefit2'),
        t('industries.medical.benefit3')
      ],
      standards: ['IEC 62304', 'ISO 14971', 'FDA 21 CFR'],
      gradient: 'medical'
    }
  ]

  return (
    <section className="industry-solutions-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">{t('industries.heading')}</h2>
          <p className="section-subtitle">{t('industries.subtitle')}</p>
        </motion.div>
        <div className="industries-grid">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <SpotlightCard className={`industry-card industry-card--${industry.gradient}`}>
                <div className="industry-icon">{industry.icon}</div>
                <h3 className="industry-title">{industry.title}</h3>
                <p className="industry-description">{industry.description}</p>
                <div className="industry-benefits">
                  <h4 className="industry-benefits-title">{t('industries.benefits.label')}</h4>
                  <ul className="industry-benefits-list">
                    {industry.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div className="industry-standards">
                  <h4 className="industry-standards-title">{t('industries.standards.label')}</h4>
                  <div className="industry-standards-tags">
                    {industry.standards.map((standard, idx) => (
                      <span key={idx} className="industry-standard-tag">{standard}</span>
                    ))}
                  </div>
                </div>
                <Link to="/product" className="industry-cta">
                  {t('industries.cta')} →
                </Link>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustrySolutions

