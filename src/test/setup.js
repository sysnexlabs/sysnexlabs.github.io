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

// Silence noisy debug logs during tests.
// Important: don't use vi.spyOn here (it records every call + args, which can OOM).
if (!globalThis.__VITEST_CONSOLE_SILENCED__) {
  globalThis.__VITEST_CONSOLE_SILENCED__ = true
  console.log = () => {}
  console.info = () => {}
  console.debug = () => {}
}

// Mock matchMedia used by ThemeProvider
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

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
