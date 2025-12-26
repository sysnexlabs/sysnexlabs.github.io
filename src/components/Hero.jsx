import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import AnimatedText from './AnimatedText'
import { useTranslation } from '../utils/i18n'
import './Hero.css'

const Hero = () => {
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
                {t('hero.kicker')}
              </motion.span>
              <h1 id="hero-heading" className="hero-title">
                <AnimatedText variant="gradient">
                  {t('hero.headline')}
                </AnimatedText>
              </h1>
              <motion.p 
                className="hero-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {t('hero.paragraph')}
              </motion.p>
              <motion.div 
                className="hero-metric"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {t('hero.metric')}
              </motion.div>
              <motion.div 
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link to="/try-yourself" className="btn-primary-large">
                  {t('hero.cta.primary')}
                </Link>
                <Link to="/contact" className="btn-secondary-large">
                  {t('hero.cta.secondary')}
                </Link>
              </motion.div>
            </motion.div>
        </div>
      </section>
    </AuroraBackground>
  )
}

export default Hero

