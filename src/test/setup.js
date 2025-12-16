import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock Monaco Editor
global.monaco = {
  editor: {
    setModelMarkers: vi.fn(),
    MarkerSeverity: {
      Error: 8,
      Warning: 4,
      Info: 2,
      Hint: 1,
    },
  },
  languages: {
    setMonarchTokensProvider: vi.fn(),
  },
}

// Mock window.monaco
if (typeof window !== 'undefined') {
  window.monaco = global.monaco
}
