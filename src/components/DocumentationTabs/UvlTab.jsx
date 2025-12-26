import React, { useState, useEffect, useMemo } from 'react'
import { useSysMLWasm } from '../../hooks/useSysMLWasm'
import './UvlTab.css'

export default function UvlTab({ code }) {
  const { wasm } = useSysMLWasm()
  const [uvlData, setUvlData] = useState(null)
  const [error, setError] = useState(null)
  const [expandedFeatures, setExpandedFeatures] = useState(new Set())

  useEffect(() => {
    if (!code || !wasm) {
      setUvlData(null)
      setError(null)
      return
    }

    const isUvlCode = code.trim().startsWith('namespace') || code.trim().startsWith('features')
    if (!isUvlCode) {
      setUvlData(null)
      setError(null)
      return
    }

    try {
      if (wasm.parse_uvl) {
        const result = wasm.parse_uvl(code)
        console.log('🌳 UVL parse result:', result)
        
        // Use WASM result if it has the expected structure
        if (result && result.root) {
          // Convert WASM result to our format
          const converted = convertWasmResultToUvlData(result, code)
          setUvlData(converted)
          setError(null)
        } else {
          // Fallback: parse manually if WASM result format is unexpected
          const parsed = parseUvlCode(code)
          setUvlData(parsed)
          setError(null)
        }
      } else {
        // Fallback: parse manually
        const parsed = parseUvlCode(code)
        setUvlData(parsed)
        setError(null)
      }
    } catch (err) {
      console.error('UVL parsing error:', err)
      setError(err.message || 'Failed to parse UVL code')
      setUvlData(null)
    }
  }, [code, wasm])

  const toggleFeature = (featureName) => {
    setExpandedFeatures(prev => {
      const next = new Set(prev)
      if (next.has(featureName)) {
        next.delete(featureName)
      } else {
        next.add(featureName)
      }
      return next
    })
  }

  const renderFeatureTree = (features, level = 0) => {
    if (!features || features.length === 0) return null

    return (
      <ul className="uvl-feature-tree" style={{ paddingLeft: level > 0 ? '1.5rem' : '0' }}>
        {features.map((feature, idx) => {
          const hasChildren = feature.children && feature.children.length > 0
          const isExpanded = expandedFeatures.has(feature.name)
          const indent = level * 20

          return (
            <li key={`${feature.name}-${idx}`} className="uvl-feature-item">
              <div 
                className="uvl-feature-node"
                style={{ paddingLeft: `${indent}px` }}
                onClick={() => hasChildren && toggleFeature(feature.name)}
              >
                {hasChildren && (
                  <span className="uvl-feature-toggle">
                    {isExpanded ? '▼' : '▶'}
                  </span>
                )}
                {!hasChildren && <span className="uvl-feature-spacer" />}
                <span className={`uvl-feature-type uvl-feature-type-${feature.type}`}>
                  {feature.type === 'mandatory' && '●'}
                  {feature.type === 'optional' && '○'}
                  {feature.type === 'alternative' && '⊕'}
                  {feature.type === 'or' && '⊞'}
                </span>
                <span className="uvl-feature-name">{feature.name}</span>
                {feature.type && (
                  <span className="uvl-feature-type-label">{feature.type}</span>
                )}
              </div>
              {hasChildren && isExpanded && (
                <div className="uvl-feature-children">
                  {renderFeatureTree(feature.children, level + 1)}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  if (error) {
    return (
      <div className="uvl-tab-error">
        <p>Error parsing UVL code:</p>
        <pre>{error}</pre>
      </div>
    )
  }

  if (!uvlData) {
    return (
      <div className="uvl-tab-empty">
        <p>No UVL feature model detected.</p>
        <p className="uvl-tab-hint">UVL code should start with <code>namespace</code> or <code>features</code>.</p>
      </div>
    )
  }

  return (
    <div className="uvl-tab">
      {uvlData.namespace && (
        <div className="uvl-namespace">
          <h3>Namespace</h3>
          <code>{uvlData.namespace}</code>
        </div>
      )}

      {uvlData.features && uvlData.features.length > 0 && (
        <div className="uvl-features">
          <h3>Feature Model</h3>
          <div className="uvl-legend">
            <span className="uvl-legend-item">
              <span className="uvl-feature-type uvl-feature-type-mandatory">●</span>
              <span>Mandatory</span>
            </span>
            <span className="uvl-legend-item">
              <span className="uvl-feature-type uvl-feature-type-optional">○</span>
              <span>Optional</span>
            </span>
            <span className="uvl-legend-item">
              <span className="uvl-feature-type uvl-feature-type-alternative">⊕</span>
              <span>Alternative</span>
            </span>
            <span className="uvl-legend-item">
              <span className="uvl-feature-type uvl-feature-type-or">⊞</span>
              <span>Or</span>
            </span>
          </div>
          {renderFeatureTree(uvlData.features)}
        </div>
      )}

      {uvlData.constraints && uvlData.constraints.length > 0 && (
        <div className="uvl-constraints">
          <h3>Constraints</h3>
          <ul className="uvl-constraints-list">
            {uvlData.constraints.map((constraint, idx) => (
              <li key={idx} className="uvl-constraint-item">
                <code>{constraint}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Convert WASM parse_uvl result to our UVL data format
function convertWasmResultToUvlData(wasmResult, code) {
  const result = {
    namespace: wasmResult.namespace || null,
    features: [],
    constraints: wasmResult.constraints || []
  }

  // Convert WASM root feature tree to our format
  if (wasmResult.root) {
    const convertFeature = (wasmFeature) => {
      const feature = {
        name: wasmFeature.name || wasmFeature.id || 'Unknown',
        type: wasmFeature.type || wasmFeature.group_type || 'mandatory',
        children: []
      }

      // Handle children array
      if (wasmFeature.children && Array.isArray(wasmFeature.children)) {
        feature.children = wasmFeature.children.map(convertFeature)
      }

      return feature
    }

    if (Array.isArray(wasmResult.root)) {
      result.features = wasmResult.root.map(convertFeature)
    } else {
      result.features = [convertFeature(wasmResult.root)]
    }
  }

  // Extract namespace from code if not in WASM result
  if (!result.namespace) {
    const namespaceMatch = code.match(/namespace\s+(\S+)/)
    if (namespaceMatch) {
      result.namespace = namespaceMatch[1]
    }
  }

  return result
}

// Simple UVL parser to extract feature model structure (fallback)
function parseUvlCode(code) {
  const lines = code.split('\n')
  const result = {
    namespace: null,
    features: [],
    constraints: []
  }

  let inFeatures = false
  let inConstraints = false
  let currentFeature = null
  let featureStack = []
  let indentLevel = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line || line.startsWith('//')) continue

    // Namespace detection
    if (line.startsWith('namespace ')) {
      result.namespace = line.replace('namespace', '').trim()
      continue
    }

    // Features section
    if (line === 'features') {
      inFeatures = true
      inConstraints = false
      continue
    }

    // Constraints section
    if (line === 'constraints') {
      inFeatures = false
      inConstraints = true
      continue
    }

    if (inFeatures) {
      // Calculate indent level
      const originalLine = lines[i]
      const leadingSpaces = originalLine.match(/^\s*/)?.[0].length || 0
      const currentIndent = Math.floor(leadingSpaces / 4) // Assuming 4 spaces per indent

      // Parse feature line
      const featureMatch = line.match(/^(\w+)(?:\s+(mandatory|optional|alternative|or))?$/)
      if (featureMatch) {
        const featureName = featureMatch[1]
        const featureType = featureMatch[2] || 'mandatory'

        const feature = {
          name: featureName,
          type: featureType,
          children: []
        }

        // Adjust stack based on indent level
        while (featureStack.length > 0 && featureStack[featureStack.length - 1].indent >= currentIndent) {
          featureStack.pop()
        }

        if (featureStack.length === 0) {
          // Root feature
          result.features.push(feature)
          featureStack.push({ feature, indent: currentIndent })
        } else {
          // Child feature
          const parent = featureStack[featureStack.length - 1].feature
          parent.children.push(feature)
          featureStack.push({ feature, indent: currentIndent })
        }
      }
    }

    if (inConstraints) {
      // Parse constraint (simple format: Feature => Feature or !Feature)
      if (line.includes('=>') || line.includes('<=>')) {
        result.constraints.push(line)
      }
    }
  }

  return result
}

