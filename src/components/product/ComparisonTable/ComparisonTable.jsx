import React from 'react'
import './ComparisonTable.css'

/**
 * ComparisonTable Component
 *
 * Generic comparison table for displaying features across multiple items.
 * Used for platform comparisons, edition comparisons, etc.
 *
 * @param {Array} items - Array of items to compare (e.g., platforms, editions)
 * @param {Array} rows - Array of row objects with { label, getValue }
 * @param {Function} getHeader - Function to render header for each item
 */
const ComparisonTable = ({ items, rows, getHeader }) => {
  return (
    <div className="comparison-table-wrapper">
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="comparison-table-header-label">Feature</th>
            {items.map((item, i) => (
              <th key={i} className="comparison-table-header-item">
                {getHeader ? getHeader(item) : (
                  <>
                    {item.icon}<br/>
                    <span className="comparison-table-header-title">{item.title}</span>
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="comparison-table-row-label">
                <strong>{row.label}</strong>
              </td>
              {items.map((item, itemIndex) => (
                <td key={itemIndex} className="comparison-table-cell">
                  {row.getValue(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonTable
