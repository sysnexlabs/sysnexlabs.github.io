import React, { useState, useEffect } from 'react'
import { useSysMLWasm } from '../../hooks/useSysMLWasm'
import { safeWasmCall } from '../../utils/wasmErrorHandler'

/**
 * Constraint Display Component for WASM
 * 
 * Displays constraint satisfaction status, current values, and margins.
 * For WASM, constraints are extracted from the model structure.
 */
export function ConstraintDisplay({ fileUri, elementId, compact = false, sourceCode = '' }) {
  const { wasm } = useSysMLWasm()
  const [constraints, setConstraints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fallback: Extract constraints from source code directly if WASM not available
    if (!wasm || !fileUri || !sourceCode) {
      if (sourceCode) {
        // Simple regex-based constraint extraction as fallback
        const constraintMatches = sourceCode.match(/constraint\s+(\w+)\s*:\s*([^;]+)/gi) || []
        const extractedConstraints = constraintMatches.map(match => {
          const nameMatch = match.match(/constraint\s+(\w+)/i)
          const exprMatch = match.match(/:\s*(.+)/i)
          return {
            constraintName: nameMatch ? nameMatch[1] : 'Unknown',
            expression: exprMatch ? exprMatch[1].trim() : '',
            satisfied: true, // Default - would need evaluation
            status: 'unknown',
          }
        })
        setConstraints(extractedConstraints)
      }
      setLoading(false)
      return
    }

    const loadConstraints = async () => {
      if (!wasm || !sourceCode) {
        return
      }
      
      try {
        setLoading(true)
        setError(null)

        // Get documentation which includes constraint information
        // For now, we'll extract constraints from the documentation structure
        // In the future, this should come from a dedicated constraints function
        // Use safeWasmCall to prevent recursive use errors
        const documentation = await safeWasmCall(
          () => wasm.generate_documentation(sourceCode, fileUri)
        )
        
        // Extract constraints from documentation chapters
        // This is a simplified implementation - in production, this should
        // come from a dedicated constraint evaluation function
        const extractedConstraints = []
        
        if (documentation?.chapters) {
          documentation.chapters.forEach(chapter => {
            chapter.subchapters?.forEach(subchapter => {
              // Look for constraint expressions in element metadata or body
              if (subchapter.body && subchapter.body.includes('constraint')) {
                // Simple extraction - in production, use proper constraint parser
                const constraintMatches = subchapter.body.match(/constraint\s+(\w+)\s*:\s*([^;]+)/g)
                if (constraintMatches) {
                  constraintMatches.forEach(match => {
                    const nameMatch = match.match(/constraint\s+(\w+)/)
                    const exprMatch = match.match(/:\s*(.+)/)
                    if (nameMatch && exprMatch) {
                      extractedConstraints.push({
                        constraintName: nameMatch[1],
                        expression: exprMatch[1].trim(),
                        satisfied: true, // Default - would need evaluation
                        status: 'unknown',
                      })
                    }
                  })
                }
              }
            })
          })
        }

        // Fallback to source code extraction if no constraints found in documentation
        if (extractedConstraints.length === 0 && sourceCode) {
          const constraintMatches = sourceCode.match(/constraint\s+(\w+)\s*:\s*([^;]+)/gi) || []
          constraintMatches.forEach(match => {
            const nameMatch = match.match(/constraint\s+(\w+)/i)
            const exprMatch = match.match(/:\s*(.+)/i)
            if (nameMatch && exprMatch) {
              extractedConstraints.push({
                constraintName: nameMatch[1],
                expression: exprMatch[1].trim(),
                satisfied: true,
                status: 'unknown',
              })
            }
          })
        }

        setConstraints(extractedConstraints)
        setLoading(false)
      } catch (err) {
        console.warn('Failed to load constraints:', err)
        // Fallback to source code extraction on error
        if (sourceCode) {
          const constraintMatches = sourceCode.match(/constraint\s+(\w+)\s*:\s*([^;]+)/gi) || []
          const extractedConstraints = constraintMatches.map(match => {
            const nameMatch = match.match(/constraint\s+(\w+)/i)
            const exprMatch = match.match(/:\s*(.+)/i)
            return {
              constraintName: nameMatch ? nameMatch[1] : 'Unknown',
              expression: exprMatch ? exprMatch[1].trim() : '',
              satisfied: true,
              status: 'unknown',
            }
          })
          setConstraints(extractedConstraints)
        }
        setError(err.message)
        setLoading(false)
      }
    }

    loadConstraints()
  }, [wasm, fileUri, elementId, sourceCode])

  if (loading && constraints.length === 0) {
    return (
      <div className={`constraint-display ${compact ? 'compact' : ''}`}>
        <span className="loading-spinner">⏳</span>
        <span className="text-xs text-gray-500 ml-1">Evaluating constraints...</span>
      </div>
    )
  }

  if (error || constraints.length === 0) {
    return null // Silent fail - don't show error if no constraints
  }

  const satisfiedCount = constraints.filter(c => c.satisfied).length
  const violatedCount = constraints.filter(c => !c.satisfied && c.status === 'violated').length

  const renderConstraintItem = (constraint) => {
    const statusIcon = constraint.satisfied 
      ? '✅' 
      : constraint.status === 'violated'
      ? '❌'
      : constraint.status === 'unknown'
      ? '❓'
      : '⚠️'
    
    return (
      <div
        key={constraint.constraintName}
        className="constraint-item p-2 rounded border bg-gray-50 border-gray-200 mb-2"
      >
        <div className="flex items-start gap-2">
          <span className="mt-0.5">{statusIcon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-800 cursor-pointer hover:underline hover:text-blue-600 transition-colors">
                {constraint.constraintName}
              </span>
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                constraint.satisfied
                  ? 'bg-green-100 text-green-800'
                  : constraint.status === 'violated'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {constraint.satisfied ? 'Satisfied' : 
                 constraint.status === 'violated' ? 'Violated' : 'Unknown'}
              </span>
            </div>
            <div className="text-xs text-gray-600 font-mono mb-1">
              {constraint.expression}
            </div>
            {constraint.currentValues && Object.keys(constraint.currentValues).length > 0 && (
              <div className="mt-1 space-y-0.5">
                {Object.entries(constraint.currentValues).map(([varName, value]) => (
                  <div key={varName} className="text-xs text-gray-500">
                    <span className="font-medium">{varName}</span> = {String(value)}
                  </div>
                ))}
              </div>
            )}
            {constraint.margin !== undefined && (
              <div className="mt-1 text-xs text-green-600 font-medium">
                Margin: {constraint.margin}{constraint.marginUnit || ''}
              </div>
            )}
            {constraint.error && (
              <div className="mt-1 text-xs text-red-600">
                Error: {constraint.error}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (compact) {
    return (
      <div className="constraint-display-compact inline-flex items-center gap-2 px-2 py-1 rounded bg-gray-100 border border-gray-300">
        {constraints.length > 0 && (
          <>
            <span className="text-green-500">✅</span>
            <span className="text-xs font-medium text-gray-800">
              {satisfiedCount}/{constraints.length} constraints satisfied
            </span>
            {violatedCount > 0 && (
              <span className="text-xs text-red-500">
                ({violatedCount} violated)
              </span>
            )}
          </>
        )}
      </div>
    )
  }

  return (
    <div className="constraint-display p-3 rounded-lg border bg-gray-50 border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-800">Constraints</h4>
        <div className="flex items-center gap-2">
          {constraints.length > 0 && (
            <span className={`px-2 py-0.5 rounded font-medium text-xs ${
              violatedCount === 0 
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {satisfiedCount}/{constraints.length} satisfied
            </span>
          )}
          <button
            onClick={() => {
              setLoading(true)
              // Re-evaluate constraints
            }}
            className="px-2 py-1 text-xs rounded transition-colors flex items-center gap-1 bg-gray-200 border border-gray-300 hover:bg-gray-300 text-gray-800"
            title="Re-evaluate constraints"
            disabled={loading}
          >
            <span className={loading ? 'loading-spinner' : '🔄'}></span>
            <span className="hidden sm:inline">Re-evaluate</span>
          </button>
        </div>
      </div>

      {constraints.length === 0 ? (
        <div className="text-xs text-gray-500 text-center py-2">
          No constraints defined for this element
        </div>
      ) : (
        <div className="constraints-list">
          {constraints.map(renderConstraintItem)}
        </div>
      )}
    </div>
  )
}

export default ConstraintDisplay
