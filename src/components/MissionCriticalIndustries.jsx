import React from 'react'
import { motion } from 'framer-motion'
import SpotlightCard from './SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './MissionCriticalIndustries.css'

const MissionCriticalIndustries = React.memo(() => {
  const { t } = useTranslation()

  const industries = [
    {
      name: t('home.industries.automotive'),
      icon: '/assets/industry_automotive.svg',
      description: 'Automotive systems engineering with ISO 26262, ASPICE, and ISO/SAE 21434 compliance.',
      link: '/industries/automotive'
    },
    {
      name: t('home.industries.aerospace'),
      icon: '/assets/industry_aerospace.svg',
      description: 'Aerospace and defense systems with DO-178C, ARP4754, and certification workflows.',
      link: '/industries/aerospace'
    },
    {
      name: t('home.industries.rail'),
      icon: '/assets/industry_rail.svg',
      description: 'Railway systems engineering with EN 50126, EN 50128, and EN 50129 compliance.',
      link: '/industries/rail'
    },
    {
      name: t('home.industries.defense'),
      icon: '/assets/industry_defense.svg',
      description: 'Defense and energy systems with MIL-STD, IEC 61508, and safety-critical workflows.',
      link: '/industries/defense'
    }
  ]

  return (
    <section className="mission-critical-industries-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">{t('home.industries.heading')}</h2>
          <p className="section-subtitle">{t('home.industries.subtitle')}</p>
        </motion.div>
        <div className="industries-list">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* TODO: Add industry pages later - links removed to prevent 404s */}
              <SpotlightCard className="industry-item">
                <div className="industry-item-icon">
                  <img
                    src={industry.icon}
                    alt={industry.name}
                    style={{height: '120px', width: 'auto', maxWidth: '120px', objectFit: 'contain'}}
                  />
                </div>
                <div className="industry-item-content">
                  <h3 className="industry-item-name">{industry.name}</h3>
                  <p className="industry-item-description">{industry.description}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

MissionCriticalIndustries.displayName = 'MissionCriticalIndustries'

export default MissionCriticalIndustries

