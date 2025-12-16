import React from 'react'
import { motion } from 'framer-motion'
import './AnimatedText.css'

const AnimatedText = ({ children, variant = 'gradient', className = '' }) => {
  const variants = {
    gradient: {
      background: 'linear-gradient(135deg, var(--turquoise) 0%, var(--aubergine) 50%, var(--coral) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    shiny: {
      background: 'linear-gradient(90deg, var(--light-text) 0%, var(--turquoise) 50%, var(--light-text) 100%)',
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'shimmer 3s linear infinite',
    }
  }

  return (
    <motion.span
      className={`animated-text animated-text--${variant} ${className}`}
      style={variants[variant]}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.span>
  )
}

export default AnimatedText

