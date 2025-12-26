import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './Page.css'

const About = () => {
  const { t } = useTranslation()

  const founders = [
    {
      name: t('about.founders.alex.name'),
      role: t('about.founders.alex.role'),
      background: t('about.founders.alex.background')
    },
    {
      name: t('about.founders.priya.name'),
      role: t('about.founders.priya.role'),
      background: t('about.founders.priya.background')
    },
    {
      name: t('about.founders.lars.name'),
      role: t('about.founders.lars.role'),
      background: t('about.founders.lars.background')
    },
    {
      name: t('about.founders.sofia.name'),
      role: t('about.founders.sofia.role'),
      background: t('about.founders.sofia.background')
    }
  ]

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>{t('about.hero.title')}</h1>
            <p className="page-hero-description">
              {t('about.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('about.founders.heading')}</h2>
            <p className="section-subtitle">{t('about.founders.subtitle')}</p>
          </div>
          <div className="founders-grid">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard className="founder-card">
                  <h3 className="founder-name">{founder.name}</h3>
                  <div className="founder-role">{founder.role}</div>
                  <p className="founder-background">{founder.background}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>{t('about.cta.heading')}</h2>
            <p>{t('about.cta.subtitle')}</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn primary large">{t('about.cta.primary')}</Link>
              <Link to="/competences" className="btn ghost large">{t('about.cta.secondary')}</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
