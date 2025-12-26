import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './Page.css'
import './Competences.css'

const Competences = () => {
  const { t } = useTranslation()

  const coreCompetences = [
    {
      icon: '🏗️',
      title: t('competences.core.systems.title'),
      description: t('competences.core.systems.description'),
      areas: [
        t('competences.core.systems.area1'),
        t('competences.core.systems.area2'),
        t('competences.core.systems.area3'),
        t('competences.core.systems.area4')
      ]
    },
    {
      icon: '🔬',
      title: t('competences.core.modeling.title'),
      description: t('competences.core.modeling.description'),
      areas: [
        t('competences.core.modeling.area1'),
        t('competences.core.modeling.area2'),
        t('competences.core.modeling.area3'),
        t('competences.core.modeling.area4')
      ]
    },
    {
      icon: '🛡️',
      title: t('competences.core.safety.title'),
      description: t('competences.core.safety.description'),
      areas: [
        t('competences.core.safety.area1'),
        t('competences.core.safety.area2'),
        t('competences.core.safety.area3'),
        t('competences.core.safety.area4')
      ]
    },
    {
      icon: '⚙️',
      title: t('competences.core.tooling.title'),
      description: t('competences.core.tooling.description'),
      areas: [
        t('competences.core.tooling.area1'),
        t('competences.core.tooling.area2'),
        t('competences.core.tooling.area3'),
        t('competences.core.tooling.area4')
      ]
    }
  ]

  const standards = [
    {
      name: 'ISO 15288',
      level: t('competences.standards.iso15288.level'),
      description: t('competences.standards.iso15288.description'),
      coverage: t('competences.standards.iso15288.coverage')
    },
    {
      name: 'ISO 26262',
      level: t('competences.standards.iso26262.level'),
      description: t('competences.standards.iso26262.description'),
      coverage: t('competences.standards.iso26262.coverage')
    },
    {
      name: 'ASPICE',
      level: t('competences.standards.aspice.level'),
      description: t('competences.standards.aspice.description'),
      coverage: t('competences.standards.aspice.coverage')
    },
    {
      name: 'SysML v2',
      level: t('competences.standards.sysmlv2.level'),
      description: t('competences.standards.sysmlv2.description'),
      coverage: t('competences.standards.sysmlv2.coverage')
    }
  ]

  const industries = [
    {
      icon: '🚗',
      title: t('competences.industries.automotive.title'),
      description: t('competences.industries.automotive.description'),
      expertise: [
        t('competences.industries.automotive.expertise1'),
        t('competences.industries.automotive.expertise2'),
        t('competences.industries.automotive.expertise3')
      ],
      futureAim: false
    },
    {
      icon: '✈️',
      title: t('competences.industries.aerospace.title'),
      description: t('competences.industries.aerospace.description'),
      expertise: [
        t('competences.industries.aerospace.expertise1'),
        t('competences.industries.aerospace.expertise2'),
        t('competences.industries.aerospace.expertise3')
      ],
      futureAim: true
    },
    {
      icon: '🚂',
      title: t('competences.industries.rail.title'),
      description: t('competences.industries.rail.description'),
      expertise: [
        t('competences.industries.rail.expertise1'),
        t('competences.industries.rail.expertise2'),
        t('competences.industries.rail.expertise3')
      ],
      futureAim: true
    },
    {
      icon: '⚡',
      title: t('competences.industries.energy.title'),
      description: t('competences.industries.energy.description'),
      expertise: [
        t('competences.industries.energy.expertise1'),
        t('competences.industries.energy.expertise2'),
        t('competences.industries.energy.expertise3')
      ],
      futureAim: true
    }
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
            className="competences-hero-content"
          >
            <div className="hero-badge">{t('competences.hero.badge')}</div>
            <h1>{t('competences.hero.title')}</h1>
            <p className="page-hero-description">
              {t('competences.hero.description')}
            </p>
            <div className="hero-cta">
              <Link to="/contact" className="btn primary">{t('competences.hero.cta.primary')}</Link>
              <Link to="/methods" className="btn ghost">{t('competences.hero.cta.secondary')}</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Competences Section */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('competences.core.heading')}</h2>
            <p className="section-subtitle">
              {t('competences.core.subtitle')}
            </p>
          </div>
          <div className="competences-grid">
            {coreCompetences.map((competence, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="competence-card">
                  <div className="competence-icon">{competence.icon}</div>
                  <h3 className="competence-title">{competence.title}</h3>
                  <p className="competence-description">{competence.description}</p>
                  <ul className="competence-areas">
                    {competence.areas.map((area, idx) => (
                      <li key={idx}>{area}</li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Expertise Section */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>{t('competences.standards.heading')}</h2>
            <p className="section-subtitle">
              {t('competences.standards.subtitle')}
            </p>
          </div>
          <div className="standards-grid">
            {standards.map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="standard-card"
              >
                <div className="standard-header">
                  <h3 className="standard-name">{standard.name}</h3>
                  <span className="standard-level">{standard.level}</span>
                </div>
                <p className="standard-description">{standard.description}</p>
                <div className="standard-coverage">
                  <strong>{t('competences.standards.coverage.label')}:</strong>
                  <span>{standard.coverage}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise Section */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('competences.industries.heading')}</h2>
            <p className="section-subtitle">
              {t('competences.industries.subtitle')}
            </p>
          </div>
          <div className="industries-grid">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard className="industry-card">
                  <div className="industry-icon">{industry.icon}</div>
                  <div className="industry-header">
                    <h3 className="industry-title">{industry.title}</h3>
                    {industry.futureAim && (
                      <span className="industry-future-badge">
                        {t('competences.industries.future.badge')}
                      </span>
                    )}
                  </div>
                  <p className="industry-description">{industry.description}</p>
                  <ul className="industry-expertise">
                    {industry.expertise.map((item, idx) => (
                      <li key={idx}>✓ {item}</li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-section-alt">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cta-content"
          >
            <h2>{t('competences.cta.heading')}</h2>
            <p>{t('competences.cta.subtitle')}</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn primary large">{t('competences.cta.primary')}</Link>
              <Link to="/methods" className="btn ghost large">{t('competences.cta.secondary')}</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Competences

