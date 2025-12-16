import React from 'react'

/**
 * Relationships List Component for WASM
 * 
 * Shows relationships between elements with SysML notation symbols
 */
export function RelationshipsList({ relationships = [], onNavigate, stylePreference = 'metro' }) {
  if (!relationships || relationships.length === 0) {
    return null
  }

  const getRelationshipSymbol = (kind) => {
    const kindLower = kind?.toLowerCase() || ''
    
    // Specialization relationships
    if (kindLower.includes('specializ') || kindLower.includes('generalization')) return ':>'
    if (kindLower.includes('subset')) return ':>'
    if (kindLower.includes('redefin')) return ':>>'
    if (kindLower.includes('typing') || kindLower.includes('feature_typing')) return ':'
    if (kindLower.includes('referencing') || kindLower === 'references') return '::>'
    
    // Ownership relationships
    if (kindLower === 'owned_by') return '◀'
    if (kindLower.startsWith('owns_') || kindLower.includes('composition') || kindLower.includes('containment')) return '◆'
    if (kindLower.includes('aggregation')) return '◇'
    
    // Traceability relationships
    if (kindLower.includes('satisfy')) return '«satisfy»'
    if (kindLower.includes('verify')) return '«verify»'
    if (kindLower.includes('refine')) return '«refine»'
    if (kindLower.includes('trace')) return '«trace»'
    if (kindLower.includes('derive')) return '«derive»'
    
    // Connection and flow relationships
    if (kindLower.includes('connection')) return '↔'
    if (kindLower.includes('flow')) return '→'
    if (kindLower.includes('binding')) return '='
    
    // General relationships
    if (kindLower.includes('association')) return '—'
    if (kindLower.includes('dependency')) return '⟶'
    if (kindLower === 'constraint') return '{}'
    
    return '→' // Default arrow
  }

  return (
    <div className="relationships-list-container my-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">🔗</span>
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Relationships</h4>
      </div>
      <ul className="list-none p-0 m-0 space-y-2">
        {relationships.map((rel, index) => {
          const symbol = getRelationshipSymbol(rel.kind)
          const target = rel.target_name || rel.target || rel.target_package || 'Unknown'
          
          return (
            <li
              key={index}
              className="py-2 px-3 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-semibold min-w-[3rem] text-center px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {symbol}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                  {rel.kind || 'Relationship'}
                </span>
                {target && (
                  <span
                    className={`text-sm font-medium ${
                      onNavigate
                        ? 'text-blue-600 dark:text-blue-400 cursor-pointer hover:underline'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                    onClick={() => onNavigate && onNavigate(rel.target_file_uri || target)}
                    title={rel.target_file_uri || target}
                  >
                    {target}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RelationshipsList
