import React from 'react'
import './AuroraBackground.css'

const AuroraBackground = ({ children, className = '' }) => {
  return (
    <div className={`aurora-background ${className}`}>
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
      <div className="aurora-orb aurora-orb-3" />
      <div className="aurora-content">
        {children}
      </div>
    </div>
  )
}

export default AuroraBackground





