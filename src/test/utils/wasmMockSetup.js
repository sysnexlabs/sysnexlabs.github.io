/**
 * Setup file for mocking WASM in tests
 * Import this in test files that need WASM mocking
 */

import { vi } from 'vitest'
import { MockSysMLWasm, MockSysMLWasmWithError } from './wasmMock'

/**
 * Setup WASM mocks for a test file
 * Call this in beforeEach or at the top of test files
 */
export function setupWasmMocks(mockWasm = null) {
  const wasmInstance = mockWasm || new MockSysMLWasm()

  // Mock the WASM module import
  vi.mock('../../hooks/useSysMLWasm', async () => {
    const actual = await vi.importActual('../../hooks/useSysMLWasm')
    return {
      ...actual,
      useSysMLWasm: () => ({
        wasm: wasmInstance,
        loading: false,
        error: null,
      }),
      useSysMLParser: (code) => {
        if (!wasmInstance) return []
        try {
          return wasmInstance.parse(code) || []
        } catch {
          return []
        }
      },
      useSysMLDocumentation: (code) => {
        if (!wasmInstance) {
          return {
            documentation: { chapters: [], file_uri: 'editor://current' },
            loading: false,
          }
        }
        try {
          const doc = wasmInstance.generate_documentation(code, 'editor://current')
          return {
            documentation: doc || { chapters: [], file_uri: 'editor://current' },
            loading: false,
          }
        } catch {
          return {
            documentation: { chapters: [], file_uri: 'editor://current' },
            loading: false,
          }
        }
      },
    }
  })

  return wasmInstance
}

/**
 * Create error scenario mocks
 */
export function setupErrorMocks(errorType = 'generic') {
  return setupWasmMocks(new MockSysMLWasmWithError(errorType))
}
