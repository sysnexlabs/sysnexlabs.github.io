import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './Page.css'
import './Contact.css'

const Contact = () => {
  const { t } = useTranslation()

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>{t('contact.heading')}</h1>
            <p className="page-hero-description">
              {t('contact.intro')}
            </p>
            <div className="contact-hero-cta">
              <Link to="/try-yourself" className="btn primary large">Try Yourself First</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="contact-info-wrapper"
            >
              <div className="contact-info">
                <SpotlightCard>
                  <div className="card-icon" aria-hidden="true">📧</div>
                  <h3 className="card-title">{t('contact.email.label')}</h3>
                  <p className="card-description">
                    <a href={`mailto:${t('contact.email.address')}`}>{t('contact.email.address')}</a>
                  </p>
                </SpotlightCard>

                <SpotlightCard>
                  <div className="card-icon" aria-hidden="true">💼</div>
                  <h3 className="card-title">{t('contact.enterprise.title')}</h3>
                  <p className="card-description">
                    {t('contact.enterprise.body')}
                  </p>
                </SpotlightCard>

                <SpotlightCard>
                  <div className="card-icon" aria-hidden="true">🤝</div>
                  <h3 className="card-title">{t('contact.partnership.title')}</h3>
                  <p className="card-description">
                    {t('contact.partnership.body')}
                  </p>
                </SpotlightCard>

                <SpotlightCard>
                  <div className="card-icon" aria-hidden="true"><img src="/assets/feature_performance.svg" alt="Performance" style={{width: "120px", height: "120px", objectFit: "contain"}} /></div>
                  <h3 className="card-title">{t('contact.response.title')}</h3>
                  <p className="card-description">
                    {t('contact.response.body')}
                  </p>
                </SpotlightCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
