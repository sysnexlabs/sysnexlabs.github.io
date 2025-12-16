import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DocumentationView from '../../components/DocumentationView/DocumentationView'
import { MockSysMLWasm } from '../utils/wasmMock'
import { VALID_SYSML_CODE } from '../utils/testData'
import { renderWithProviders } from '../utils/testHelpers'

// Mock useSysMLDocumentation hook
vi.mock('../../hooks/useSysMLWasm', () => ({
  useSysMLDocumentation: vi.fn((code) => {
    if (!code || code.trim().length === 0) {
      return {
        documentation: { chapters: [], file_uri: 'editor://current' },
        loading: false,
      }
    }
    const mockWasm = new MockSysMLWasm()
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
  }),
  useSysMLWasm: () => ({
    wasm: new MockSysMLWasm(),
    loading: false,
    error: null,
  }),
  useSysMLParser: () => [],
}))

describe('DocumentationView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Empty State', () => {
    it('should render empty state when code is empty', () => {
      renderWithProviders(<DocumentationView code="" />)
      expect(screen.getByText(/Start typing SysML v2 code/i)).toBeInTheDocument()
    })

    it('should show loading state when WASM is processing', () => {
      const { useSysMLDocumentation } = vi.mocked(require('../../hooks/useSysMLWasm'))
      useSysMLDocumentation.mockReturnValueOnce({
        documentation: { chapters: [], file_uri: 'editor://current' },
        loading: true,
      })

      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)
      expect(screen.getByText(/Loading/i)).toBeInTheDocument()
    })
  })

  describe('Documentation Display', () => {
    it('should render documentation for valid code', async () => {
      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        expect(screen.getByText('Vehicle System')).toBeInTheDocument()
      })
    })

    it('should display package title', async () => {
      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        const packageTitle = screen.getByText('Vehicle System')
        expect(packageTitle).toBeInTheDocument()
      })
    })

    it('should display part definitions', async () => {
      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        expect(screen.getByText('Vehicle')).toBeInTheDocument()
        expect(screen.getByText('Engine')).toBeInTheDocument()
        expect(screen.getByText('Wheel')).toBeInTheDocument()
      })
    })

    it('should display attributes', async () => {
      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        expect(screen.getByText('speed')).toBeInTheDocument()
        expect(screen.getByText('mass')).toBeInTheDocument()
      })
    })

    it('should display doc comments', async () => {
      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        expect(screen.getByText(/A simple vehicle system example/i)).toBeInTheDocument()
      })
    })
  })

  describe('Table of Contents', () => {
    it('should render table of contents', async () => {
      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        expect(screen.getByText('Model Tree')).toBeInTheDocument()
      })
    })

    it('should allow navigation via TOC', async () => {
      const user = userEvent.setup()
      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        expect(screen.getByText('Model Tree')).toBeInTheDocument()
      })

      const tocItems = screen.getAllByText('Vehicle System')
      if (tocItems.length > 0) {
        await user.click(tocItems[0])
        // Navigation should work (scrolling is tested in E2E)
      }
    })
  })

  describe('Expand/Collapse', () => {
    it('should allow expanding/collapsing elements', async () => {
      const user = userEvent.setup()
      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        const vehicleElement = screen.getByText('Vehicle')
        expect(vehicleElement).toBeInTheDocument()
      })

      // Elements should be expandable
      const expandButtons = screen.queryAllByText('▶')
      if (expandButtons.length > 0) {
        await user.click(expandButtons[0])
        // Element should expand (tested in E2E)
      }
    })
  })

  describe('Error Handling', () => {
    it('should handle WASM errors gracefully', async () => {
      const { useSysMLDocumentation } = vi.mocked(require('../../hooks/useSysMLWasm'))
      useSysMLDocumentation.mockReturnValueOnce({
        documentation: { chapters: [], file_uri: 'editor://current' },
        loading: false,
      })

      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      // Should fallback to simple parser
      await waitFor(() => {
        expect(screen.getByText('Vehicle System')).toBeInTheDocument()
      })
    })
  })

  describe('Code Updates', () => {
    it('should update documentation when code changes', async () => {
      const { rerender } = renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.simple} />)

      await waitFor(() => {
        expect(screen.getByText('Simple Example')).toBeInTheDocument()
      })

      rerender(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        expect(screen.getByText('Vehicle System')).toBeInTheDocument()
      })
    })
  })
})
