import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import AnimatedText from './AnimatedText'
import { useTranslation } from '../utils/i18n'
import './Hero.css'

const Hero = React.memo(() => {
  const { t } = useTranslation()

  return (
    <AuroraBackground>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-background-overlay"></div>
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="hero-kicker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Model-Based Systems Engineering, Re-invented
            </motion.span>
            <h1 id="hero-heading" className="hero-title">
              <AnimatedText variant="gradient">
                Systems Engineering
                <br />
                for Innovators.
              </AnimatedText>
            </h1>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Production-ready SysML v2 Language Server, completely free for individuals.
              Everything you need to build the future, faster.
            </motion.p>
            <motion.div
              className="hero-metric"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ fontSize: '0.9rem', color: 'var(--brand-amber)', fontWeight: '600' }}
            >
              ✨ &nbsp; Free for Individuals & Open Source Projects
            </motion.div>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/contact" className="btn-primary-large">
                Get Early Access
              </Link>
              <Link to="/overview" className="btn-secondary-large">
                Explore Features
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </AuroraBackground>
  )
})

Hero.displayName = 'Hero'

export default Hero

