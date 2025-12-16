import React from 'react'

/**
 * Type Info Component for WASM
 * 
 * Shows type information for elements
 */
export function TypeInfo({ element }) {
  // Only show for non-attribute elements (attributes should be in tables)
  if (element.kind?.includes('Attribute')) {
    return null
  }

  // Extract type from signature or use type_name
  let typeName = element.type_name
  
  if (!typeName && element.signature) {
    const typeMatch = element.signature.match(/:\s*([^;{]+)/)
    if (typeMatch) {
      typeName = typeMatch[1].trim()
    }
  }

  if (!typeName) {
    return null
  }

  return (
    <div className="type-info flex items-center gap-2 py-2">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Type:</span>
      <code className="text-sm font-mono px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400">
        {typeName}
      </code>
      {element.multiplicity && (
        <code className="text-sm font-mono px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400">
          {element.multiplicity}
        </code>
      )}
    </div>
  )
}

export default TypeInfo
