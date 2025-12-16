/**
 * Test helper functions
 */

import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { vi } from 'vitest'

/**
 * Wait for async operations to complete
 */
export function waitForAsync() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

/**
 * Render with common providers (Theme + Router)
 */
export function renderWithProviders(ui, { route = '/' } = {}) {
  const wrap = (node) =>
    React.createElement(
      ThemeProvider,
      null,
      React.createElement(MemoryRouter, { initialEntries: [route] }, node)
    )

  const result = render(wrap(ui))

  // Ensure rerender keeps providers (tests often call rerender(ui))
  const originalRerender = result.rerender
  result.rerender = (nextUi) => originalRerender(wrap(nextUi))

  return result
}

/**
 * Wait for a specific condition
 */
export async function waitForCondition(condition, timeout = 5000) {
  const start = Date.now()
  while (!condition() && Date.now() - start < timeout) {
    await waitForAsync()
  }
  if (!condition()) {
    throw new Error('Condition not met within timeout')
  }
}

/**
 * Create a test wrapper that provides WASM context
 */
export function createWasmContext(mockWasm) {
  return {
    wasm: mockWasm,
    loading: false,
    error: null,
  }
}

/**
 * Mock WASM module - use this in beforeEach or test setup
 * Note: This is a helper for manual mocking, not automatic vi.mock
 */
export function getMockedHooks(mockWasm) {
  return {
    useSysMLWasm: () => createWasmContext(mockWasm),
    useSysMLParser: (code) => {
      if (!mockWasm) return []
      try {
        return mockWasm.parse(code) || []
      } catch {
        return []
      }
    },
    useSysMLDocumentation: (code) => {
      if (!mockWasm) {
        return {
          documentation: { chapters: [], file_uri: 'editor://current' },
          loading: false,
        }
      }
      try {
        const doc = mockWasm.generate_documentation(code, 'editor://current')
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
}

/**
 * Render component with WASM mock
 */
export function renderWithWasm(component, mockWasm) {
  mockWasmModule(mockWasm)
  return render(component)
}

/**
 * Create a mock Monaco editor
 */
export function createMockMonacoEditor() {
  return {
    getModel: vi.fn(() => ({
      getLineLength: vi.fn(() => 100),
    })),
    setPosition: vi.fn(),
    revealLineInCenter: vi.fn(),
    focus: vi.fn(),
  }
}
