import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './Page.css'

const About = () => {
  const { t } = useTranslation()

  const competencies = [
    {
      title: t('about.competencies.item1.title'),
      description: t('about.competencies.item1.description')
    },
    {
      title: t('about.competencies.item2.title'),
      description: t('about.competencies.item2.description')
    },
    {
      title: t('about.competencies.item3.title'),
      description: t('about.competencies.item3.description')
    },
    {
      title: t('about.competencies.item4.title'),
      description: t('about.competencies.item4.description')
    },
    {
      title: t('about.competencies.item5.title'),
      description: t('about.competencies.item5.description')
    }
  ]

  const toolchain = [
    {
      title: t('about.toolchain.item1.title'),
      description: t('about.toolchain.item1.description')
    },
    {
      title: t('about.toolchain.item2.title'),
      description: t('about.toolchain.item2.description')
    },
    {
      title: t('about.toolchain.item3.title'),
      description: t('about.toolchain.item3.description')
    },
    {
      title: t('about.toolchain.item4.title'),
      description: t('about.toolchain.item4.description')
    },
    {
      title: t('about.toolchain.item5.title'),
      description: t('about.toolchain.item5.description')
    }
  ]

  const programming = [
    {
      title: t('about.programming.item1.title'),
      description: t('about.programming.item1.description')
    },
    {
      title: t('about.programming.item2.title'),
      description: t('about.programming.item2.description')
    },
    {
      title: t('about.programming.item3.title'),
      description: t('about.programming.item3.description')
    },
    {
      title: t('about.programming.item4.title'),
      description: t('about.programming.item4.description')
    },
    {
      title: t('about.programming.item5.title'),
      description: t('about.programming.item5.description')
    }
  ]

  const capabilities = [
    {
      title: t('about.capabilities.item1.title'),
      description: t('about.capabilities.item1.description')
    },
    {
      title: t('about.capabilities.item2.title'),
      description: t('about.capabilities.item2.description')
    },
    {
      title: t('about.capabilities.item3.title'),
      description: t('about.capabilities.item3.description')
    },
    {
      title: t('about.capabilities.item4.title'),
      description: t('about.capabilities.item4.description')
    },
    {
      title: t('about.capabilities.item5.title'),
      description: t('about.capabilities.item5.description')
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
            <h2 className="section-title">{t('about.capabilities.heading')}</h2>
            <p className="section-subtitle">{t('about.capabilities.subtitle')}</p>
          </div>
          <div className="features-grid">
            {capabilities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('about.competencies.heading')}</h2>
            <p className="section-subtitle">{t('about.competencies.subtitle')}</p>
          </div>
          <div className="features-grid">
            {competencies.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('about.toolchain.heading')}</h2>
            <p className="section-subtitle">{t('about.toolchain.subtitle')}</p>
          </div>
          <div className="features-grid">
            {toolchain.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('about.programming.heading')}</h2>
            <p className="section-subtitle">{t('about.programming.subtitle')}</p>
          </div>
          <div className="features-grid">
            {programming.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-content-section">
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
              <Link to="/product" className="btn ghost large">{t('about.cta.secondary')}</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
