import React, { useState } from 'react'

/**
 * Technical Details Component for WASM
 * 
 * Shows signature and body/definition code for elements
 */
export function TechnicalDetails({ 
  signature, 
  body, 
  headingLevel = 4,
  hideTrivial = false,
  initialExpanded = true 
}) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  // Check if signature and body are identical (trivial case)
  const isTrivial = signature && body && signature.trim() === body.trim()
  const hasBody = body && (body.includes('{') || body.split('\n').length > 1)

  // Filter trivial details only if hideTrivial is enabled
  if (hideTrivial && isTrivial && !hasBody) {
    return null
  }

  const HeadingTag = `h${Math.min(headingLevel, 6)}`

  return (
    <div className="technical-details">
      <button
        className="technical-details-trigger flex items-center gap-2 w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>⚙️</span>
        <span className="font-medium">Technical Details</span>
        <span className="ml-auto">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="technical-details-content mt-2 space-y-4">
          {!isTrivial && signature && (
            <div>
              <HeadingTag className="text-sm font-semibold mb-2">Signature</HeadingTag>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm font-mono">
                <code>{signature}</code>
              </pre>
            </div>
          )}

          {body && (
            <div>
              <HeadingTag className="text-sm font-semibold mb-2">
                {hasBody ? 'Definition' : 'Code'}
              </HeadingTag>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm font-mono">
                <code>{body}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TechnicalDetails
