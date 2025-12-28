import React from 'react'
import { motion } from 'framer-motion'
import './AnimatedText.css'

const AnimatedText = React.memo(({ children, variant = 'gradient', className = '' }) => {
  const variants = {
    gradient: {
      background: 'linear-gradient(90deg, #00B4D8 0%, #00B4D8 25%, #FBBF24 50%, #FBBF24 75%, #00B4D8 100%)',
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'gradient-move 4s ease infinite',
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
})

AnimatedText.displayName = 'AnimatedText'

export default AnimatedText

