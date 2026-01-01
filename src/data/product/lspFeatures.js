/**
 * LSP Features Data
 *
 * Complete list of Language Server Protocol features supported by NexSuite.
 * Each feature includes icon, title, description, and performance metric.
 */

export const lspFeatures = [
  {
    icon: '✨',
    title: 'Autocompletion',
    description: 'Context-aware completion with ~10K library types',
    metric: '~30ms'
  },
  {
    icon: '🔍',
    title: 'Code Navigation',
    description: 'Go-to-definition, find references, type hierarchy',
    metric: '~15-20ms'
  },
  {
    icon: '⚠️',
    title: 'Real-time Diagnostics',
    description: '25+ diagnostic collectors with live validation',
    metric: '~80ms'
  },
  {
    icon: '💡',
    title: 'Hover Information',
    description: 'Rich documentation with library integration',
    metric: '~15ms'
  },
  {
    icon: '🎨',
    title: 'Document Formatting',
    description: 'Full file and range formatting with preservation',
    metric: '~50ms'
  },
  {
    icon: '🔧',
    title: 'Code Actions',
    description: 'Quick fixes and refactoring assistance',
    metric: 'Instant'
  },
  {
    icon: '🎯',
    title: 'Semantic Highlighting',
    description: '43 token types with syntax classification',
    metric: '98%'
  },
  {
    icon: '📋',
    title: 'Document Symbols',
    description: 'Hierarchical outline with workspace search',
    metric: '~25ms'
  },
  {
    icon: '✏️',
    title: 'Rename Symbol',
    description: 'Multi-file renaming with conflict detection',
    metric: '~40ms'
  },
  {
    icon: '📝',
    title: 'Inlay Hints',
    description: 'Type annotations and parameter hints',
    metric: '~35ms'
  },
  {
    icon: '📞',
    title: 'Signature Help',
    description: 'Function signatures with full HIR traversal',
    metric: '90%'
  },
  {
    icon: '🌳',
    title: 'Call & Type Hierarchy',
    description: 'Relationship navigation and tree views',
    metric: '95%'
  }
]

/**
 * Get LSP features by category
 */
export const getCoreFeatures = () => {
  const coreFeatureNames = [
    'Autocompletion',
    'Code Navigation',
    'Real-time Diagnostics',
    'Hover Information',
    'Document Formatting'
  ]
  return lspFeatures.filter(f => coreFeatureNames.includes(f.title))
}

export const getAdvancedFeatures = () => {
  const advancedFeatureNames = [
    'Code Actions',
    'Semantic Highlighting',
    'Rename Symbol',
    'Call & Type Hierarchy'
  ]
  return lspFeatures.filter(f => advancedFeatureNames.includes(f.title))
}

/**
 * Get total feature count
 */
export const getTotalFeatureCount = () => {
  return lspFeatures.length
}

export default lspFeatures
