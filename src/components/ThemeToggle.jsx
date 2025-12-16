import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import './ThemeToggle.css'

const SunIcon = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
)

const MoonIcon = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [particles, setParticles] = useState([])
  const [isAnimating, setIsAnimating] = useState(false)
  const toggleRef = useRef(null)
  
  const isDark = theme === 'dark'

  // Generate particles with different timing
  const generateParticles = () => {
    const newParticles = []
    const particleCount = 3

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        delay: i * 0.1,
        duration: 0.6 + i * 0.1,
      })
    }

    setParticles(newParticles)
    setIsAnimating(true)

    setTimeout(() => {
      setIsAnimating(false)
      setParticles([])
    }, 1000)
  }

  // Toggle handler - switches theme and triggers particles
  const handleToggle = () => {
    generateParticles()
    toggleTheme()
  }

  // Prevent hydration mismatch - show placeholder during SSR
  if (!mounted) {
    return (
      <div className="theme-toggle-container">
        <div className="theme-toggle-placeholder" />
      </div>
    )
  }

  return (
    <div className="theme-toggle-container">
      {/* SVG Filter for Film Grain Texture */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="grain-light">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="desaturatedNoise"
            />
            <feComponentTransfer in="desaturatedNoise" result="lightGrain">
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="lightGrain" mode="overlay" />
          </filter>
          
          <filter id="grain-dark">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="desaturatedNoise"
            />
            <feComponentTransfer in="desaturatedNoise" result="darkGrain">
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="darkGrain" mode="overlay" />
          </filter>
        </defs>
      </svg>

      {/* Pill-shaped track container */}
      <motion.button
        ref={toggleRef}
        onClick={handleToggle}
        className="theme-toggle-button"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at top left, #1e293b 0%, #0f172a 40%, #020617 100%)'
            : 'radial-gradient(ellipse at top left, #ffffff 0%, #f1f5f9 40%, #cbd5e1 100%)',
          boxShadow: isDark
            ? `
              inset 5px 5px 12px rgba(0, 0, 0, 0.9),
              inset -5px -5px 12px rgba(71, 85, 105, 0.4),
              inset 8px 8px 16px rgba(0, 0, 0, 0.7),
              inset -8px -8px 16px rgba(100, 116, 139, 0.2),
              inset 0 2px 4px rgba(0, 0, 0, 1),
              inset 0 -2px 4px rgba(71, 85, 105, 0.4),
              inset 0 0 20px rgba(0, 0, 0, 0.6),
              0 1px 1px rgba(255, 255, 255, 0.05),
              0 2px 4px rgba(0, 0, 0, 0.4),
              0 8px 16px rgba(0, 0, 0, 0.4),
              0 16px 32px rgba(0, 0, 0, 0.3),
              0 24px 48px rgba(0, 0, 0, 0.2)
            `
            : `
              inset 5px 5px 12px rgba(148, 163, 184, 0.5),
              inset -5px -5px 12px rgba(255, 255, 255, 1),
              inset 8px 8px 16px rgba(100, 116, 139, 0.3),
              inset -8px -8px 16px rgba(255, 255, 255, 0.9),
              inset 0 2px 4px rgba(148, 163, 184, 0.4),
              inset 0 -2px 4px rgba(255, 255, 255, 1),
              inset 0 0 20px rgba(203, 213, 225, 0.3),
              0 1px 2px rgba(255, 255, 255, 1),
              0 2px 4px rgba(0, 0, 0, 0.1),
              0 8px 16px rgba(0, 0, 0, 0.08),
              0 16px 32px rgba(0, 0, 0, 0.06),
              0 24px 48px rgba(0, 0, 0, 0.04)
            `,
          border: isDark 
            ? '2px solid rgba(51, 65, 85, 0.6)' 
            : '2px solid rgba(203, 213, 225, 0.6)',
        }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        role="switch"
        aria-checked={isDark}
        whileTap={{ scale: 0.98 }}
      >
        {/* Deep inner groove/rim effect */}
        <div 
          className="theme-toggle-groove"
          style={{
            boxShadow: isDark
              ? 'inset 0 2px 6px rgba(0, 0, 0, 0.9), inset 0 -1px 3px rgba(71, 85, 105, 0.3)'
              : 'inset 0 2px 6px rgba(100, 116, 139, 0.4), inset 0 -1px 3px rgba(255, 255, 255, 0.8)',
          }}
        />
        
        {/* Multi-layer glossy overlay */}
        <div 
          className="theme-toggle-overlay"
          style={{
            background: isDark
              ? `
                radial-gradient(ellipse at top, rgba(71, 85, 105, 0.15) 0%, transparent 50%),
                linear-gradient(to bottom, rgba(71, 85, 105, 0.2) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.3) 100%)
              `
              : `
                radial-gradient(ellipse at top, rgba(255, 255, 255, 0.8) 0%, transparent 50%),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 0%, transparent 30%, transparent 70%, rgba(148, 163, 184, 0.15) 100%)
              `,
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Ambient occlusion effect */}
        <div 
          className="theme-toggle-occlusion"
          style={{
            boxShadow: isDark
              ? 'inset 0 0 15px rgba(0, 0, 0, 0.5)'
              : 'inset 0 0 15px rgba(148, 163, 184, 0.2)',
          }}
        />
        
        {/* Background Icons */}
        <div className="theme-toggle-background-icons">
          <SunIcon 
            size={10} 
            style={{ color: isDark ? '#fef3c7' : '#d97706' }}
          />
          <MoonIcon 
            size={10} 
            style={{ color: isDark ? '#fef3c7' : '#334155' }}
          />
        </div>

        {/* Circular Thumb with Bouncy Spring Physics */}
        <motion.div
          className="theme-toggle-thumb"
          style={{
            background: isDark
              ? 'linear-gradient(145deg, #64748b 0%, #475569 50%, #334155 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #fefefe 50%, #f8fafc 100%)',
            boxShadow: isDark
              ? `
                inset 2px 2px 4px rgba(100, 116, 139, 0.4),
                inset -2px -2px 4px rgba(0, 0, 0, 0.8),
                inset 0 1px 1px rgba(255, 255, 255, 0.15),
                0 1px 2px rgba(255, 255, 255, 0.1),
                0 8px 32px rgba(0, 0, 0, 0.6),
                0 4px 12px rgba(0, 0, 0, 0.5),
                0 2px 4px rgba(0, 0, 0, 0.4)
              `
              : `
                inset 2px 2px 4px rgba(203, 213, 225, 0.3),
                inset -2px -2px 4px rgba(255, 255, 255, 1),
                inset 0 1px 2px rgba(255, 255, 255, 1),
                0 1px 2px rgba(255, 255, 255, 1),
                0 8px 32px rgba(0, 0, 0, 0.18),
                0 4px 12px rgba(0, 0, 0, 0.12),
                0 2px 4px rgba(0, 0, 0, 0.08)
              `,
            border: isDark
              ? '2px solid rgba(148, 163, 184, 0.3)'
              : '2px solid rgba(255, 255, 255, 0.9)',
          }}
          animate={{
            x: isDark ? 24 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          {/* Glossy shine overlay on thumb */}
          <div 
            className="theme-toggle-thumb-shine"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, transparent 40%, rgba(0, 0, 0, 0.1) 100%)',
              mixBlendMode: 'overlay',
            }}
          />
          
          {/* Particle Layer */}
          {isAnimating && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="theme-toggle-particle-container"
            >
              <motion.div
                className="theme-toggle-particle"
                style={{
                  width: '5px',
                  height: '5px',
                  background: isDark
                    ? 'radial-gradient(circle, rgba(147, 197, 253, 0.5) 0%, rgba(147, 197, 253, 0) 70%)'
                    : 'radial-gradient(circle, rgba(251, 191, 36, 0.7) 0%, rgba(251, 191, 36, 0) 70%)',
                  mixBlendMode: 'normal',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isDark ? 3 : 4, opacity: [0, 1, 0] }}
                transition={{
                  duration: isDark ? 0.5 : particle.duration,
                  delay: particle.delay,
                  ease: 'easeOut',
                }}
              >
                <div 
                  className="theme-toggle-particle-grain"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay',
                  }}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Icon */}
          <div className="theme-toggle-thumb-icon">
            {isDark ? (
              <MoonIcon size={10} style={{ color: '#fde68a' }} />
            ) : (
              <SunIcon size={10} style={{ color: '#f59e0b' }} />
            )}
          </div>
        </motion.div>
      </motion.button>
    </div>
  )
}

