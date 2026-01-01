import React from 'react'
import './StatusBadge.css'

/**
 * StatusBadge Component
 *
 * Displays a status badge with appropriate styling based on status type.
 * Supports: Production-Ready (✅), Planned (🟡), Coming Soon (⏳), etc.
 */
const StatusBadge = ({ status }) => {
  const getStatusStyle = () => {
    if (status.includes('✅')) {
      return {
        background: 'rgba(34, 197, 94, 0.1)',
        color: '#22c55e'
      }
    } else if (status.includes('🟡')) {
      return {
        background: 'rgba(251, 191, 36, 0.1)',
        color: '#fbbf24'
      }
    } else if (status.includes('⏳')) {
      return {
        background: 'rgba(148, 163, 184, 0.1)',
        color: '#94a3b8'
      }
    } else {
      return {
        background: 'rgba(148, 163, 184, 0.1)',
        color: '#94a3b8'
      }
    }
  }

  return (
    <div className="status-badge" style={getStatusStyle()}>
      {status}
    </div>
  )
}

export default StatusBadge
