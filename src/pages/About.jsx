import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './Page.css'

const About = React.memo(() => {
  const { t } = useTranslation()

  const missionItems = [
    {
      title: t('about.mission.item1.title'),
      description: t('about.mission.item1.description')
    },
    {
      title: t('about.mission.item2.title'),
      description: t('about.mission.item2.description')
    },
    {
      title: t('about.mission.item3.title'),
      description: t('about.mission.item3.description')
    },
    {
      title: t('about.mission.item4.title'),
      description: t('about.mission.item4.description')
    }
  ]

  const productionReady = [
    t('about.status.ready.item1'),
    t('about.status.ready.item2'),
    t('about.status.ready.item3'),
    t('about.status.ready.item4')
  ]

  const activeDevelopment = [
    t('about.status.development.item1'),
    t('about.status.development.item2'),
    t('about.status.development.item3'),
    t('about.status.development.item4')
  ]

  const background = [
    t('about.background.item1'),
    t('about.background.item2'),
    t('about.background.item3'),
    t('about.background.item4')
  ]

  return (
    <div className="page">
      {/* Hero Section */}
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

      {/* Mission Section */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('about.mission.heading')}</h2>
            <p className="section-subtitle">{t('about.mission.subtitle')}</p>
          </div>
          <div className="founders-grid">
            {missionItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard className="founder-card">
                  <h3 className="founder-name">{item.title}</h3>
                  <p className="founder-background">{item.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Status Section */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('about.status.heading')}</h2>
            <p className="section-subtitle">{t('about.status.subtitle')}</p>
          </div>

          <div className="two-column-grid" style={{ marginTop: '3rem' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SpotlightCard>
                <h3 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>
                  ✅ {t('about.status.ready.title')}
                </h3>
                <ul className="about-list">
                  {productionReady.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SpotlightCard>
                <h3 style={{ color: 'var(--brand-amber)', marginBottom: '1rem' }}>
                  🚧 {t('about.status.development.title')}
                </h3>
                <ul className="about-list">
                  {activeDevelopment.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('about.background.heading')}</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <SpotlightCard>
              <ul className="about-list" style={{ fontSize: '1.1rem' }}>
                {background.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
              <Link to="/try-yourself" className="btn ghost large">Try It Now</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
})

About.displayName = 'About'

export default About
