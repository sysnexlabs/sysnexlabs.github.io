import React from 'react'

/**
 * Comment Annotation Component
 * 
 * Renders comment annotations (comment blocks) with proper styling
 */
export function CommentAnnotation({ 
  commentText, 
  isChapter = false 
}) {
  if (!commentText) {
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

  const containerClass = isChapter ? 'doc-chapter-doc' : 'doc-element-doc'
  
  return (
    <div className={containerClass}>
      <div className="doc-declaration my-4 p-4 rounded-lg border-l-4 bg-gray-50 dark:bg-gray-900/20 border-gray-400">
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0" title="Comment">
            💭
          </span>
          <div className="flex-1">
            <div
              className="text-sm text-gray-700 dark:text-gray-300 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(commentText) }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentAnnotation

