import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Card from '../components/Card'
import SpotlightCard from '../components/SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './Home.css'

const Home = () => {
  const location = useLocation()
  const { t } = useTranslation()

  // Scroll to top when navigating to home (including when already on home)
  useEffect(() => {
    if (location.state?.refresh) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.state])
  
  const insights = [
    {
      eyebrow: t('hero.insights.aerial.eyebrow'),
      title: t('hero.insights.aerial.title'),
      description: t('hero.insights.aerial.body'),
      variant: 'available'
    },
    {
      eyebrow: t('hero.insights.mobility.eyebrow'),
      title: t('hero.insights.mobility.title'),
      description: t('hero.insights.mobility.body'),
      variant: 'progress'
    },
    {
      eyebrow: t('hero.insights.infrastructure.eyebrow'),
      title: t('hero.insights.infrastructure.title'),
      description: t('hero.insights.infrastructure.body'),
      variant: 'roadmap'
    }
  ]

  const benefits = [
    {
      title: t('benefits.item1.title'),
      description: t('benefits.item1.body')
    },
    {
      title: t('benefits.item2.title'),
      description: t('benefits.item2.body')
    },
    {
      title: t('benefits.item3.title'),
      description: t('benefits.item3.body')
    },
    {
      title: t('benefits.item4.title'),
      description: t('benefits.item4.body')
    },
    {
      title: t('benefits.item5.title'),
      description: t('benefits.item5.body')
    },
    {
      title: t('benefits.item6.title'),
      description: t('benefits.item6.body')
    },
    {
      title: t('benefits.item7.title'),
      description: t('benefits.item7.body')
    }
  ]

  const features = [
    {
      icon: '⚙️',
      title: t('features.item1.title'),
      description: t('features.item1.body')
    },
    {
      icon: '📐',
      title: t('features.item2.title'),
      description: t('features.item2.body')
    },
    {
      icon: '🤖',
      title: t('features.item3.title'),
      description: t('features.item3.body')
    },
    {
      icon: '🛡️',
      title: t('features.item4.title'),
      description: t('features.item4.body')
    }
  ]

  const roadmapItems = [
    {
      title: t('roadmap.now.title'),
      items: [
        t('roadmap.now.item1'),
        t('roadmap.now.item2'),
        t('roadmap.now.item3')
      ]
    },
    {
      title: t('roadmap.inflight.title'),
      items: [
        t('roadmap.inflight.item1'),
        t('roadmap.inflight.item2'),
        t('roadmap.inflight.item3')
      ]
    },
    {
      title: t('roadmap.future.title'),
      items: [
        t('roadmap.future.item1'),
        t('roadmap.future.item2'),
        t('roadmap.future.item3')
      ]
    }
  ]

  return (
    <div className="home" style={{ minHeight: '100vh', width: '100%' }}>
      <Hero />

      <section className="insights-section">
        <div className="container">
          <div className="insights-grid">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard className={`insight-card insight-card--${insight.variant}`}>
                  <span className="insight-eyebrow">{insight.eyebrow}</span>
                  <h3 className="insight-title">{insight.title}</h3>
                  <p className="insight-description">{insight.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">{t('benefits.heading')}</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="benefits-cta">
            <Link to="/contact" className="btn primary">Request Demo</Link>
            <Link to="/try-yourself" className="btn ghost">Try Yourself</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title sr-only">Our Core Offerings</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <div className="card-icon" aria-hidden="true">{feature.icon}</div>
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-description">{feature.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="roadmap-section">
        <div className="container">
          <h2 className="section-title">{t('roadmap.heading')}</h2>
          <p className="section-subtitle">
            {t('roadmap.subtitle')}
          </p>
          <div className="roadmap-grid">
            {roadmapItems.map((item, index) => (
              <div key={index} className="roadmap-card">
                <h3 className="roadmap-card-title">{item.title}</h3>
                <ul className="roadmap-list">
                  {item.items.map((listItem, itemIndex) => (
                    <li key={itemIndex}>{listItem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="roadmap-note">
            {t('roadmap.note')}
          </p>
          <div className="roadmap-cta">
            <Link to="/contact" className="btn primary">Schedule Consultation</Link>
            <Link to="/contact" className="btn ghost">Get in Touch</Link>
          </div>
        </div>
      </section>

      <section className="cta-section-home">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Systems Engineering?</h2>
            <p>Join teams using enterprise-grade SysML v2 tooling. Start with a 30-day free trial.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn primary large">Request Demo</Link>
              <Link to="/try-yourself" className="btn ghost large">Try Yourself</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

