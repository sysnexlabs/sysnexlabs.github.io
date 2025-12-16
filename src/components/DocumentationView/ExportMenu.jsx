import React, { useState, useRef, useEffect } from 'react'

/**
 * Export Menu Component for WASM
 * 
 * Dropdown menu for exporting documentation in various formats.
 * Supports PDF, HTML, Sphinx, and Markdown exports.
 */
export function ExportMenu({ onExport, stylePreference = 'metro' }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const exportOptions = [
    {
      id: 'pdf',
      label: 'Export as PDF',
      description: 'Generate PDF document',
      icon: '📄',
    },
    {
      id: 'html',
      label: 'Export as HTML',
      description: 'Generate HTML document',
      icon: '🌐',
    },
    {
      id: 'sphinx',
      label: 'Generate Sphinx Docs',
      description: 'Generate Sphinx documentation',
      icon: '📚',
    },
    {
      id: 'markdown',
      label: 'Export as Markdown',
      description: 'Export as Markdown file',
      icon: '📝',
    },
  ]

  const handleExport = (format) => {
    onExport(format)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1 text-sm rounded transition-colors flex items-center gap-1.5 ${
          stylePreference === 'metro'
            ? 'bg-gray-100 border border-gray-300 hover:bg-gray-200'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        } ${isOpen ? 'ring-2 ring-blue-500' : ''}`}
        title="Export Documentation"
        aria-label="Export documentation"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>📤</span>
        <span className="hidden sm:inline">Export</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-1 rounded shadow-lg z-50 min-w-[200px] ${
            stylePreference === 'metro'
              ? 'bg-white border border-gray-300'
              : 'bg-gray-800 border border-gray-700'
          } py-1`}
          role="menu"
          aria-orientation="vertical"
        >
          {exportOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleExport(option.id)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-start gap-3 ${
                stylePreference === 'metro'
                  ? 'hover:bg-gray-100 text-gray-800'
                  : 'hover:bg-gray-700 text-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              role="menuitem"
            >
              <span className="mt-0.5 flex-shrink-0">{option.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{option.label}</div>
                <div className={`text-xs mt-0.5 ${
                  stylePreference === 'metro'
                    ? 'text-gray-600'
                    : 'text-gray-400'
                }`}>
                  {option.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExportMenu
