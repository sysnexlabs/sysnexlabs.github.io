import React from 'react'

/**
 * Doc Declarations Component for WASM
 * 
 * Renders doc declarations with proper markdown rendering
 */
export function DocDeclarations({ 
  docDeclarations = [], 
  isChapter = false,
  stylePreference = 'metro' 
}) {
  if (!docDeclarations || docDeclarations.length === 0) {
    return null
  }

  // Simple markdown to HTML converter (basic)
  const renderMarkdown = (content) => {
    if (!content) return ''
    
    // Convert markdown-like syntax to HTML
    let html = content
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
      // Line breaks
      .replace(/\n/gim, '<br>')
    
    return html
  }

  return (
    <>
      {docDeclarations.map(([name, content], index) => {
        const docName = name || null
        const isTip = docName === 'Tip' || docName === 'tip'
        const isWarning = docName === 'Warning' || docName === 'warning'
        const isAttention = docName === 'Attention' || docName === 'attention'
        // Filter out anonymous/empty names
        const isNamed = docName !== null &&
                       docName !== undefined &&
                       docName !== '' &&
                       !docName.includes('<anonymous>') &&
                       docName !== 'None'
        
        // Determine icon and styling based on doc name
        // Use appropriate icons for different documentation types
        let icon = '📄' // Default documentation icon
        let bgColor = 'bg-blue-50 dark:bg-blue-900/20'
        let borderColor = 'border-blue-400'
        
        if (isTip) {
          icon = '💡' // Light bulb for tips
          bgColor = 'bg-green-50 dark:bg-green-900/20'
          borderColor = 'border-green-400'
        } else if (isWarning) {
          icon = '⚠️' // Warning triangle for warnings
          bgColor = 'bg-orange-50 dark:bg-orange-900/20'
          borderColor = 'border-orange-400'
        } else if (isAttention) {
          icon = '🚨' // Red alert for attention/critical
          bgColor = 'bg-red-50 dark:bg-red-900/20'
          borderColor = 'border-red-400'
        } else if (isNamed && docName) {
          // For other named doc declarations, use context-appropriate icons
          // Safe to call toLowerCase() here because we've checked docName is not null/undefined
          const lowerName = String(docName).toLowerCase()
          if (lowerName.includes('note') || lowerName.includes('info')) {
            icon = 'ℹ️' // Information icon
          } else if (lowerName.includes('example') || lowerName.includes('demo')) {
            icon = '💻' // Code/example icon
          } else if (lowerName.includes('description') || lowerName.includes('overview')) {
            icon = '📝' // Document icon
          } else if (lowerName.includes('important') || lowerName.includes('critical')) {
            icon = '❗' // Exclamation mark
          } else if (lowerName.includes('best') || lowerName.includes('practice')) {
            icon = '⭐' // Star for best practices
          } else if (lowerName.includes('deprecated') || lowerName.includes('obsolete')) {
            icon = '🗑️' // Trash for deprecated
          } else {
            icon = '📋' // Clipboard for other named docs
          }
        }
        
        const title = isNamed ? docName : 'Documentation'

        // Determine border color based on type
        let borderColorClass = 'border-turquoise'
        if (isTip) {
          borderColorClass = 'border-green-400'
        } else if (isWarning) {
          borderColorClass = 'border-orange-400'
        } else if (isAttention) {
          borderColorClass = 'border-red-400'
        }

        return (
          <div
            key={index}
            className={`doc-declaration ${borderColorClass}`}
          >
            <div className="doc-declaration-content">
              <span className="doc-declaration-icon" title={title}>
                {icon}
              </span>
              <div className="doc-declaration-text">
                {isNamed && (
                  <h4 className="doc-declaration-title">
                    {title}
                  </h4>
                )}
                <div
                  className="doc-declaration-body"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default DocDeclarations
