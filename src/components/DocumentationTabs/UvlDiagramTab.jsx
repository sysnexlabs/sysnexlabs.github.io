import React, { useState, useEffect, useMemo } from 'react'
import { useSysMLWasm } from '../../hooks/useSysMLWasm'
import FeatureDiagram from '../FeatureDiagram/FeatureDiagram'
import './UvlDiagramTab.css'

export default function UvlDiagramTab({ code }) {
  const { wasm } = useSysMLWasm()
  const [featureTree, setFeatureTree] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!code || !wasm) {
      setFeatureTree(null)
      setError(null)
      return
    }

    const isUvlCode = code.trim().startsWith('namespace') || code.trim().startsWith('features')
    if (!isUvlCode) {
      setFeatureTree(null)
      setError(null)
      return
    }

    try {
      if (wasm.parse_uvl) {
        const result = wasm.parse_uvl(code)
        console.log('🌳 UVL diagram parse result:', result)
        
        // Use WASM result directly if it has the expected structure
        if (result && result.root) {
          setFeatureTree(result)
          setError(null)
        } else {
          // Fallback: convert manual parse to feature tree format
          const parsed = parseUvlCode(code)
          const converted = convertToFeatureTree(parsed)
          setFeatureTree(converted)
          setError(null)
        }
      } else {
        // Fallback: parse manually
        const parsed = parseUvlCode(code)
        const converted = convertToFeatureTree(parsed)
        setFeatureTree(converted)
        setError(null)
      }
    } catch (err) {
      console.error('UVL parsing error:', err)
      setError(err.message || 'Failed to parse UVL code')
      setFeatureTree(null)
    }
  }, [code, wasm])

  if (error) {
    return (
      <div className="uvl-diagram-error">
        <p>Error parsing UVL code:</p>
        <pre>{error}</pre>
      </div>
    )
  }

  if (!featureTree) {
    return (
      <div className="uvl-diagram-empty">
        <p>No UVL feature model detected.</p>
        <p className="uvl-diagram-hint">UVL code should start with <code>namespace</code> or <code>features</code>.</p>
      </div>
    )
  }

  return (
    <div className="uvl-diagram-tab">
      <FeatureDiagram featureTree={featureTree} />
    </div>
  )
}

// Convert parsed UVL data to FeatureDiagram format
function convertToFeatureTree(parsed) {
  const convertFeature = (feature, parentGroupType = null) => {
    // Separate feature type (mandatory/optional) from group type (and/or/alternative)
    let groupType = 'and'  // Default group type for children
    let isOptional = false

    // Check if this feature is optional
    if (feature.type === 'optional') {
      isOptional = true
      groupType = 'and'  // Optional features can still have 'and' group for their children
    } else if (feature.type === 'alternative') {
      groupType = 'alternative'  // This is a group type, not a feature type
    } else if (feature.type === 'or') {
      groupType = 'or'  // This is a group type, not a feature type
    } else if (feature.type === 'mandatory') {
      isOptional = false
      groupType = 'and'
    }

    const node = {
      id: feature.name,
      name: feature.name,
      groupType: groupType,
      group_type: groupType,
      is_optional: isOptional,
      optional: isOptional,
      children: []
    }

    if (feature.children && feature.children.length > 0) {
      node.children = feature.children.map(child => convertFeature(child, groupType))
    }

    return node
  }

  // Create root node if we have features
  if (parsed.features && parsed.features.length > 0) {
    // If multiple root features, create a virtual root
    if (parsed.features.length > 1) {
      return {
        root: {
          id: 'root',
          name: 'Root',
          groupType: 'and',
          children: parsed.features.map(f => convertFeature(f))
        },
        constraints: parsed.constraints || []
      }
    } else {
      return {
        root: convertFeature(parsed.features[0]),
        constraints: parsed.constraints || []
      }
    }
  }

  return { root: null, constraints: [] }
}

// Simple UVL parser (fallback)
function parseUvlCode(code) {
  const lines = code.split('\n')
  const result = {
    namespace: null,
    features: [],
    constraints: []
  }

  let inFeatures = false
  let inConstraints = false
  let featureStack = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line || line.startsWith('//')) continue

    if (line.startsWith('namespace ')) {
      result.namespace = line.replace('namespace', '').trim()
      continue
    }

    if (line === 'features') {
      inFeatures = true
      inConstraints = false
      continue
    }

    if (line === 'constraints') {
      inFeatures = false
      inConstraints = true
      continue
    }

    if (inFeatures) {
      const originalLine = lines[i]
      const leadingSpaces = originalLine.match(/^\s*/)?.[0].length || 0
      const currentIndent = Math.floor(leadingSpaces / 4)

      // Check if this is a group keyword (mandatory, optional, alternative, or)
      const groupKeywords = ['mandatory', 'optional', 'alternative', 'or']
      const isGroupKeyword = groupKeywords.includes(line.trim())
      
      if (isGroupKeyword) {
        // This is a group keyword - set the current group type for children
        // Adjust stack to find the parent feature
        while (featureStack.length > 0 && featureStack[featureStack.length - 1].indent >= currentIndent) {
          featureStack.pop()
        }
        
        if (featureStack.length > 0) {
          // Set the group type on the parent feature
          const parent = featureStack[featureStack.length - 1].feature
          parent.currentGroupType = line.trim()
        }
      } else {
        // Parse feature line
        const featureMatch = line.match(/^(\w+)(?:\s+(mandatory|optional|alternative|or))?$/)
        if (featureMatch) {
          const featureName = featureMatch[1]
          
          // Determine feature type based on parent's current group type
          let featureType = 'mandatory' // default
          
          // Adjust stack based on indent level
          while (featureStack.length > 0 && featureStack[featureStack.length - 1].indent >= currentIndent) {
            featureStack.pop()
          }
          
          // Check parent's current group type
          if (featureStack.length > 0) {
            const parent = featureStack[featureStack.length - 1].feature
            if (parent.currentGroupType) {
              featureType = parent.currentGroupType
            }
          }

          const feature = {
            name: featureName,
            type: featureType,
            children: [],
            currentGroupType: null // Will be set if this feature has group children
          }

          if (featureStack.length === 0) {
            result.features.push(feature)
            featureStack.push({ feature, indent: currentIndent })
          } else {
            const parent = featureStack[featureStack.length - 1].feature
            parent.children.push(feature)
            featureStack.push({ feature, indent: currentIndent })
          }
        }
      }
    }

    if (inConstraints) {
      if (line.includes('=>') || line.includes('<=>')) {
        result.constraints.push(line)
      }
    }
  }

  return result
}

