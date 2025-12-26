import React, { useState } from 'react'
import './TreeView.css'

/**
 * TreeView component for displaying hierarchical data (CST, HIR)
 */
export default function TreeView({ data, rootKey = 'root', maxDepth = 10 }) {
  const [expanded, setExpanded] = useState(new Set([rootKey]))

  const toggle = (key) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpanded(newExpanded)
  }

  const renderNode = (node, key, depth = 0) => {
    if (depth > maxDepth) {
      return null
    }

    const isExpanded = expanded.has(key)
    const hasChildren = node && typeof node === 'object' && !Array.isArray(node) && Object.keys(node).length > 0

    // Determine node type and value
    let nodeType = 'unknown'
    let nodeValue = null
    let children = null

    if (Array.isArray(node)) {
      nodeType = 'array'
      nodeValue = `Array[${node.length}]`
      children = node.map((item, idx) => ({ key: `${key}[${idx}]`, value: item }))
    } else if (node && typeof node === 'object') {
      nodeType = 'object'
      const keys = Object.keys(node)
      if (keys.length === 0) {
        nodeValue = '{}'
      } else {
        nodeValue = keys.length === 1 ? keys[0] : `${keys.length} properties`
        children = keys.map(k => ({ key: `${key}.${k}`, value: node[k], name: k }))
      }
    } else {
      nodeType = 'primitive'
      nodeValue = String(node)
    }

    const displayKey = key.split('.').pop() || key.split('[')[0] || key

    return (
      <div key={key} className="tree-node" style={{ marginLeft: `${depth * 16}px` }}>
        <div 
          className="tree-node-header"
          onClick={() => hasChildren && toggle(key)}
          style={{ cursor: hasChildren ? 'pointer' : 'default' }}
        >
          {hasChildren && (
            <span className="tree-toggle">
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
          <span className="tree-key">{displayKey}:</span>
          <span className={`tree-value tree-value-${nodeType}`}>
            {nodeType === 'primitive' ? (
              <span className="tree-primitive">{nodeValue}</span>
            ) : (
              <span className="tree-type">{nodeValue}</span>
            )}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div className="tree-children">
            {children.map(({ key: childKey, value: childValue, name }) => 
              renderNode(childValue, childKey, depth + 1)
            )}
          </div>
        )}
      </div>
    )
  }

  if (!data) {
    return <div className="tree-view-empty">No data to display</div>
  }

  return (
    <div className="tree-view">
      {renderNode(data, rootKey)}
    </div>
  )
}

