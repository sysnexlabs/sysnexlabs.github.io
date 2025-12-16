import React from 'react'

/**
 * Attribute Table Component for WASM
 * 
 * Renders attributes in a clean table format with type, value, and redefines information
 */
export function AttributeTable({ attributes = [], stylePreference = 'metro' }) {
  if (!attributes || attributes.length === 0) {
    return null
  }

  const renderAttributeRow = (attr, index) => {
    const isInherited = attr.is_inherited === true
    const sig = attr.signature || ''
    const name = attr.title || ''

    // Extract type from type_name or signature
    let type = '—'
    if (attr.type_name) {
      type = attr.type_name
    } else {
      const typeMatch = sig.match(/:\s*>?\s*([A-Za-z][A-Za-z0-9:]*)\s*(?:=|;)/)
      if (typeMatch) {
        type = typeMatch[1]
      }
    }

    // Extract value from default_value or signature
    let value = '—'
    if (attr.default_value) {
      value = attr.default_value
    } else {
      const valueMatch = sig.match(/=\s*([^;]+);?/)
      if (valueMatch) {
        value = valueMatch[1].trim()
      }
    }

    // Check if redefining
    const isRedefining = sig.includes(':>>')
    const redefines = isRedefining ? name : '—'

    return (
      <tr
        key={index}
        className={`${isInherited ? 'opacity-70 italic' : ''} hover:bg-gray-50 dark:hover:bg-gray-800`}
      >
        <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {isInherited && (
              <span className="text-xs" title="Inherited">⬆️</span>
            )}
            <code className="font-mono text-sm text-gray-900 dark:text-gray-100">{name}</code>
            {isInherited && attr.inherited_from && (
              <span className="ml-2 text-xs text-gray-500 italic" title={`From ${attr.inherited_from}`}>
                from {attr.inherited_from}
              </span>
            )}
          </div>
        </td>
        <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          {type !== '—' ? (
            <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-mono">
              {type}
            </span>
          ) : (
            <span className="text-gray-400 italic">—</span>
          )}
        </td>
        <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          {value !== '—' ? (
            <code className="font-mono text-sm text-green-600 dark:text-green-400">{value}</code>
          ) : (
            <span className="text-gray-400 italic">—</span>
          )}
        </td>
        <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          {isRedefining ? (
            <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs" title="Redefines attribute from parent">
              ↗ {redefines}
            </span>
          ) : (
            <span className="text-gray-400 italic">—</span>
          )}
        </td>
      </tr>
    )
  }

  return (
    <div className="attribute-table-container my-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">📋</span>
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Attributes</h4>
      </div>
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                Value
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                Redefines
              </th>
            </tr>
          </thead>
          <tbody>
            {attributes.map(renderAttributeRow)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttributeTable
