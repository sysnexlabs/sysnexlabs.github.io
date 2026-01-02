import React from 'react'
import './StatsGrid.css'

/**
 * Reusable Stats Grid Component
 *
 * Displays statistics in a responsive grid layout.
 * Used across Workspaces, Editions, Compliance, and other pages.
 *
 * @param {Object} props
 * @param {Array<{number: string|number, label: string}>} props.stats - Array of statistics to display
 * @param {string} [props.maxWidth='900px'] - Maximum width of the grid
 */
const StatsGrid = ({ stats, maxWidth = '900px' }) => {
  return (
    <div className="stats-grid" style={{ maxWidth }}>
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-number">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid
