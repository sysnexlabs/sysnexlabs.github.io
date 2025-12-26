import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './SpotlightCard.css'

const SpotlightCard = React.memo(({ children, className = '' }) => {
  const cardRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const card = cardRef.current
    if (card) {
      card.addEventListener('mousemove', handleMouseMove)
      return () => card.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="spotlight"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 180, 216, 0.15), transparent 40%)`,
        }}
      />
      <div className="spotlight-content">
        {children}
      </div>
    </motion.div>
  )
})

SpotlightCard.displayName = 'SpotlightCard'

export default SpotlightCard

