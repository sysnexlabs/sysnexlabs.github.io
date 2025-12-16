import React, { useState, useEffect } from 'react'
import { useSysMLWasm } from '../../hooks/useSysMLWasm'
import { safeWasmCall } from '../../utils/wasmErrorHandler'

/**
 * Quality Indicator Component for WASM
 * 
 * Displays documentation coverage, quality score, and actionable recommendations.
 * Uses analytics data from WASM to calculate quality metrics.
 */
export function QualityIndicator({ fileUri, elementId, compact = false, sourceCode = '' }) {
  const { wasm } = useSysMLWasm()
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!wasm || !fileUri || !sourceCode) {
      // Fallback: Use simple calculation from source code
      if (sourceCode) {
        const lines = sourceCode.split('\n')
        const totalElements = (sourceCode.match(/(part|attribute|interface|requirement)\s+(def|usage)?/gi) || []).length || 1
        const documentedElements = (sourceCode.match(/doc\s+\/\*/gi) || []).length
        const documentationCoverage = Math.min(100, (documentedElements / totalElements) * 100)
        const qualityScore = documentationCoverage * 0.8 // Simplified score
        
        const grade = qualityScore >= 90 ? 'A' : 
                     qualityScore >= 75 ? 'B' : 
                     qualityScore >= 60 ? 'C' : 
                     qualityScore >= 40 ? 'D' : 'F'
        
        setMetrics({
          documentationCoverage,
          qualityScore,
          grade,
          undocumentedCount: totalElements - documentedElements,
          suggestions: [],
        })
      }
      setLoading(false)
      return
    }

    const loadMetrics = async () => {
      if (!wasm || !sourceCode) {
        return
      }
      
      try {
        setLoading(true)
        setError(null)

        // Get analytics data which includes quality metrics
        // Use safeWasmCall to handle errors gracefully and prevent recursive use errors
        const analytics = await safeWasmCall(
          () => wasm.generate_analytics(sourceCode, fileUri)
        )
        
        // Calculate quality metrics from analytics
        // Analytics includes: element_counts, complexity_metrics, quality_metrics
        const qualityMetrics = analytics?.quality_metrics || analytics?.quality || {}
        const elementCounts = analytics?.element_counts || analytics?.metrics?.element_counts || {}
        
        // Calculate documentation coverage
        const totalElements = elementCounts.total || 1
        const documentedElements = elementCounts.with_documentation || 0
        const documentationCoverage = (documentedElements / totalElements) * 100
        
        // Calculate quality score (combination of coverage, complexity, etc.)
        const complexityScore = qualityMetrics.complexity_score || qualityMetrics.score || 100
        const qualityScore = (documentationCoverage * 0.6) + (complexityScore * 0.4)
        const grade = qualityScore >= 90 ? 'A' : 
                     qualityScore >= 75 ? 'B' : 
                     qualityScore >= 60 ? 'C' : 
                     qualityScore >= 40 ? 'D' : 'F'

        setMetrics({
          documentationCoverage,
          qualityScore,
          grade,
          undocumentedCount: totalElements - documentedElements,
          suggestions: qualityMetrics.suggestions || [],
        })
        setLoading(false)
      } catch (err) {
        console.warn('Failed to load quality metrics:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    loadMetrics()
  }, [wasm, fileUri, elementId, sourceCode])

  if (loading && !metrics) {
    return (
      <div className={`quality-indicator ${compact ? 'compact' : ''}`}>
        <span className="loading-spinner">⏳</span>
        <span className="text-xs text-gray-500 ml-1">Loading quality metrics...</span>
      </div>
    )
  }

  if (error || !metrics) {
    return null // Silent fail - don't show error in production
  }

  const renderProgressBar = (percentage, label) => {
    const width = Math.max(0, Math.min(100, percentage))
    const colorClass = percentage >= 80 ? 'bg-green-500' : 
                       percentage >= 60 ? 'bg-yellow-500' : 
                       'bg-red-500'
    
    return (
      <div className="quality-progress-container mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-600">{label}</span>
          <span className="text-xs font-semibold text-gray-800">{Math.round(percentage)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${colorClass}`}
            style={{ width: `${width}%` }}
          />
        </div>
      </div>
    )
  }

  const renderStars = (score) => {
    const fullStars = Math.floor(score / 20)
    const hasHalfStar = (score % 20) >= 10
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400 text-sm">★</span>
        ))}
        {hasHalfStar && (
          <span className="text-yellow-400 text-sm">☆</span>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-sm">☆</span>
        ))}
      </div>
    )
  }

  if (compact) {
    return (
      <div className="quality-indicator-compact inline-flex items-center gap-2 px-2 py-1 rounded bg-gray-100 border border-gray-300">
        {renderStars(metrics.qualityScore)}
        <span className="text-xs font-medium text-gray-800">
          {metrics.documentationCoverage.toFixed(0)}% documented
        </span>
      </div>
    )
  }

  return (
    <div className="quality-indicator p-3 rounded-lg border bg-gray-50 border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-800">Quality Metrics</h4>
        <div className="flex items-center gap-2">
          {renderStars(metrics.qualityScore)}
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
            metrics.grade === 'A' ? 'bg-green-500 text-white' :
            metrics.grade === 'B' ? 'bg-blue-500 text-white' :
            metrics.grade === 'C' ? 'bg-yellow-500 text-black' :
            metrics.grade === 'D' ? 'bg-orange-500 text-white' :
            'bg-red-500 text-white'
          }`}>
            {metrics.grade}
          </span>
        </div>
      </div>

      {renderProgressBar(metrics.documentationCoverage, 'Documentation Coverage')}

      {metrics.undocumentedCount !== undefined && metrics.undocumentedCount > 0 && (
        <div className="mt-2 text-xs text-gray-600">
          {metrics.undocumentedCount} undocumented {metrics.undocumentedCount === 1 ? 'element' : 'elements'}
        </div>
      )}

      {metrics.suggestions && metrics.suggestions.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-300 space-y-2">
          <button
            className="w-full text-xs text-left px-2 py-1 rounded transition-colors flex items-center gap-1 hover:bg-gray-200 text-blue-600"
          >
            <span>💡</span>
            <span>View improvement suggestions ({metrics.suggestions.length})</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default QualityIndicator
