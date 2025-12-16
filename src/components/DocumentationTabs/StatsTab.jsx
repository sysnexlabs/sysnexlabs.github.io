import React, { useState, useEffect } from 'react'
import { useSysMLWasm } from '../../hooks/useSysMLWasm'
import { safeWasmCall, formatWasmError } from '../../utils/wasmErrorHandler'
import ErrorDisplay from './ErrorDisplay'
import './StatsTab.css'

export default function StatsTab({ code }) {
  const { wasm } = useSysMLWasm()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!code || code.trim().length === 0) {
      setAnalytics(null)
      return
    }

    const generateAnalytics = async () => {
      setLoading(true)
      setError(null)

      if (wasm) {
        try {
          const stats = await safeWasmCall(wasm.generate_analytics.bind(wasm), code, 'editor://current')
          setAnalytics(stats)
        } catch (err) {
          const errorMsg = formatWasmError(err, { 
            code, 
            functionName: 'generate_analytics' 
          })
          setError(errorMsg)
        }
      } else {
        setError('WASM module is not available. Some features may be limited. The documentation view will still work with basic parsing.')
      }

      setLoading(false)
    }

    const timeoutId = setTimeout(generateAnalytics, 300)
    return () => clearTimeout(timeoutId)
  }, [code, wasm])

  if (loading) {
    return (
      <div className="stats-tab">
        <div className="stats-loading">Generating analytics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="stats-tab">
        <ErrorDisplay 
          error={error} 
          code={code} 
          functionName="generate_analytics"
        />
        {error && error.includes('WASM') && (
          <div className="stats-error-hint">
            <p>⚠️ Advanced features require the WASM module. The basic documentation view is still available.</p>
            <p className="stats-error-note">Note: WASM is automatically built during deployment. If you see this message, the WASM files may not have been deployed correctly.</p>
          </div>
        )}
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="stats-tab">
        <div className="stats-empty">Start typing SysML v2 code to see analytics and statistics.</div>
      </div>
    )
  }

  return (
    <div className="stats-tab">
      <div className="stats-header">
        <h3>Analytics & Statistics</h3>
      </div>
      <div className="stats-content">
        {analytics.metrics && (
          <div className="stats-section">
            <h4>Metrics</h4>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Total Elements</div>
                <div className="stat-value">{analytics.metrics.total_elements || 0}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Packages</div>
                <div className="stat-value">{analytics.metrics.total_packages || 0}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Definitions</div>
                <div className="stat-value">{analytics.metrics.total_definitions || 0}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Doc Coverage</div>
                <div className="stat-value">{analytics.metrics.doc_coverage?.toFixed(1) || 0}%</div>
              </div>
            </div>
          </div>
        )}

        {analytics.complexity && (
          <div className="stats-section">
            <h4>Complexity</h4>
            <div className="stat-card">
              <div className="stat-label">Overall Score</div>
              <div className="stat-value">{analytics.complexity.overall_score?.toFixed(1) || 'N/A'}</div>
            </div>
          </div>
        )}

        {analytics.quality && (
          <div className="stats-section">
            <h4>Quality</h4>
            <div className="stat-card">
              <div className="stat-label">Overall Score</div>
              <div className="stat-value">{analytics.quality.overall_score?.toFixed(1) || 'N/A'}</div>
            </div>
          </div>
        )}

        {analytics.insights && analytics.insights.length > 0 && (
          <div className="stats-section">
            <h4>Insights</h4>
            <div className="insights-list">
              {analytics.insights.map((insight, index) => (
                <div key={index} className={`insight-item insight-${insight.severity}`}>
                  <div className="insight-category">{insight.category}</div>
                  <div className="insight-message">{insight.message}</div>
                  {insight.suggestion && (
                    <div className="insight-suggestion">{insight.suggestion}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
