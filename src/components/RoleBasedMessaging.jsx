import React from 'react'
import { motion } from 'framer-motion'
import SpotlightCard from './SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './RoleBasedMessaging.css'

const RoleBasedMessaging = React.memo(() => {
  const { t } = useTranslation()

  const roles = [
    {
      title: t('home.roles.leadership.title'),
      description: t('home.roles.leadership.description'),
      focus: t('home.roles.leadership.focus'),
      icon: '/assets/role_executive.svg',
      gradient: 'leadership'
    },
    {
      title: t('home.roles.architects.title'),
      description: t('home.roles.architects.description'),
      focus: t('home.roles.architects.focus'),
      icon: '/assets/role_architects.svg',
      gradient: 'architects'
    },
    {
      title: t('home.roles.softwareArchitects.title'),
      description: t('home.roles.softwareArchitects.description'),
      focus: t('home.roles.softwareArchitects.focus'),
      icon: '/assets/role_developer.svg',
      gradient: 'softwareArchitects'
    },
    {
      title: t('home.roles.toolchain.title'),
      description: t('home.roles.toolchain.description'),
      focus: t('home.roles.toolchain.focus'),
      icon: '/assets/role_toolchain.svg',
      gradient: 'toolchain'
    }
  ]

  return (
    <section className="roles-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">{t('home.roles.heading')}</h2>
          <p className="section-subtitle">{t('home.roles.subtitle')}</p>
        </motion.div>
        <div className="roles-grid">
          {roles.map((role, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <SpotlightCard className="role-card">
                <div className="role-icon">
                  <img
                    src={role.icon}
                    alt={role.title}
                    style={{width: '120px', height: '120px', objectFit: 'contain'}}
                  />
                </div>
                <h3 className="role-title">{role.title}</h3>
                <p className="role-description">{role.description}</p>
                <div className="role-focus">
                  <span className="role-focus-label">Focus:</span>
                  <span className="role-focus-tags">{role.focus}</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

RoleBasedMessaging.displayName = 'RoleBasedMessaging'

export default RoleBasedMessaging

