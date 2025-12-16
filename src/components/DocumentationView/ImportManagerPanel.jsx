import React, { useState } from 'react'

/**
 * Import Manager Panel Component for WASM
 * 
 * Provides list of imports with visibility toggles and add/remove actions.
 * For WASM, imports are read-only (extracted from documentation).
 */
export function ImportManagerPanel({ 
  imports = [], 
  fileUri, 
  editModeEnabled = false,
  onNavigate,
  onAddImport,
  onRemoveImport,
}) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Group imports by visibility
  const standardImports = imports.filter((imp) => imp.visibility === 'Standard')
  const workspaceImports = imports.filter((imp) => imp.visibility !== 'Standard')

  const handleAddImport = async (params) => {
    if (!onAddImport) {
      console.warn('Import management not available in WASM mode')
      return
    }
    await onAddImport(params)
  }

  const handleRemoveImport = async (namespace) => {
    if (!onRemoveImport) {
      console.warn('Import removal not available in WASM mode')
      return
    }
    await onRemoveImport(namespace)
  }

  return (
    <div className="space-y-3">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          📥 Imports
        </h4>
        {editModeEnabled && onAddImport && (
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
            title="Add import"
          >
            <span className="text-xs">+</span>
            <span>Add</span>
          </button>
        )}
      </div>

      {/* Standard Library Imports */}
      {standardImports.length > 0 && (
        <div>
          <div className="text-xs text-gray-500 mb-1 px-2">
            Standard Library
          </div>
          <div className="space-y-1">
            {standardImports.map((imp, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100">
                  <span 
                    className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 hover:underline"
                    onClick={() => onNavigate?.(imp.target_package)}
                  >
                    {imp.target_package}
                    {imp.is_wildcard && '::*'}
                    {imp.alias && ` as ${imp.alias}`}
                  </span>
                  <span className="text-xs ml-2">
                    {imp.visibility === 'Public' && '🔓'}
                    {imp.visibility === 'Standard' && '📚'}
                    {imp.visibility === 'Private' && '🔒'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workspace Imports */}
      {workspaceImports.length > 0 && (
        <div>
          {standardImports.length > 0 && (
            <div className="text-xs text-gray-500 mb-1 px-2 mt-3">
              Workspace
            </div>
          )}
          <div className="space-y-1">
            {workspaceImports.map((imp, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100">
                  <span 
                    className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 hover:underline"
                    onClick={() => onNavigate?.(imp.target_package)}
                  >
                    {imp.target_package}
                    {imp.is_wildcard && '::*'}
                    {imp.alias && ` as ${imp.alias}`}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">
                      {imp.visibility === 'Public' && '🔓'}
                      {imp.visibility === 'Standard' && '📚'}
                      {imp.visibility === 'Private' && '🔒'}
                    </span>
                    {editModeEnabled && onRemoveImport && (
                      <button
                        onClick={() => handleRemoveImport(imp.target_package)}
                        className="text-xs text-red-600 hover:text-red-800"
                        title="Remove import"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {imports.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          <p>No imports</p>
          {editModeEnabled && onAddImport && (
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="mt-2 px-3 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add Import
            </button>
          )}
        </div>
      )}

      {/* Legend */}
      {imports.length > 0 && (
        <div className="pt-2 border-t border-gray-300 text-xs text-gray-500 flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1">
            <span>🔓</span>
            <span>Public</span>
          </span>
          <span className="flex items-center gap-1">
            <span>📚</span>
            <span>Standard</span>
          </span>
          <span className="flex items-center gap-1">
            <span>🔒</span>
            <span>Private</span>
          </span>
        </div>
      )}

      {/* Add Import Dialog - Simplified for WASM */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add Import</h3>
            <p className="text-sm text-gray-600 mb-4">
              Import management is read-only in WASM mode. To add imports, edit the source code directly.
            </p>
            <button
              onClick={() => setIsAddDialogOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImportManagerPanel
