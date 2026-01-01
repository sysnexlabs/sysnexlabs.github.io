import React from 'react'
import { Link } from 'react-router-dom'
import './Breadcrumb.css'

/**
 * Breadcrumb Component
 *
 * Displays hierarchical navigation breadcrumbs.
 *
 * @param {Array} items - Array of breadcrumb items: [{ label, path }]
 *
 * Example:
 * <Breadcrumb items={[
 *   { label: 'Home', path: '/' },
 *   { label: 'Products', path: '/products' },
 *   { label: 'NexDocs' }
 * ]} />
 */
const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="breadcrumb-item">
              {!isLast && item.path ? (
                <>
                  <Link to={item.path} className="breadcrumb-link">
                    {item.label}
                  </Link>
                  <span className="breadcrumb-separator" aria-hidden="true">/</span>
                </>
              ) : (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
