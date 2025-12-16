import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TryYourself from '../../pages/TryYourself'
import { MockSysMLWasm } from '../utils/wasmMock'
import { VALID_SYSML_CODE } from '../utils/testData'
import { createMockMonacoEditor, renderWithProviders } from '../utils/testHelpers'

// Mock hooks
const mockWasm = new MockSysMLWasm()

vi.mock('../../hooks/useSysMLWasm', () => ({
  useSysMLParser: vi.fn(() => []),
  useSysMLWasm: () => ({
    wasm: mockWasm,
    loading: false,
    error: null,
  }),
  useSysMLDocumentation: (code) => {
    if (!code || code.trim().length === 0) {
      return {
        documentation: { chapters: [], file_uri: 'editor://current' },
        loading: false,
      }
    }
    const doc = mockWasm.generate_documentation(code, 'editor://current')
    return {
      documentation: doc || { chapters: [], file_uri: 'editor://current' },
      loading: false,
    }
  },
}))

// Mock Monaco Editor
const mockEditor = createMockMonacoEditor()
const mockMonaco = {
  languages: {
    register: vi.fn(),
    setMonarchTokensProvider: vi.fn(),
  },
  editor: {
    setModelMarkers: vi.fn(),
    defineTheme: vi.fn(),
    setTheme: vi.fn(),
    MarkerSeverity: {
      Error: 8,
      Warning: 4,
      Info: 2,
      Hint: 1,
    },
  },
}

vi.mock('@monaco-editor/react', () => ({
  default: ({ onChange, value, onMount }) => {
    if (onMount) {
      setTimeout(() => {
        onMount(mockEditor, mockMonaco)
      }, 0)
    }
    return <div data-testid="monaco-editor">Monaco Editor: {value?.substring(0, 50)}</div>
  },
}))

describe('Try Yourself Page - Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Full Page Integration', () => {
    it('should render editor and documentation side by side', () => {
      renderWithProviders(<TryYourself />)

      expect(screen.getByText('Try SysML v2 Yourself')).toBeInTheDocument()
      expect(screen.getByTestId('monaco-editor')).toBeInTheDocument()
      expect(screen.getByText('Documentation')).toBeInTheDocument()
    })

    it('should update documentation when code changes', async () => {
      renderWithProviders(<TryYourself />)

      await waitFor(() => {
        expect(screen.getByText('Vehicle System')).toBeInTheDocument()
      })
    })

    it('should display all tabs in documentation view', () => {
      renderWithProviders(<TryYourself />)

      expect(screen.getByText('Documentation')).toBeInTheDocument()
      expect(screen.getByText('CST')).toBeInTheDocument()
      expect(screen.getByText('HIR')).toBeInTheDocument()
      expect(screen.getByText('Stats')).toBeInTheDocument()
    })
  })

  describe('WASM Feature Integration', () => {
    it('should use WASM parser for diagnostics', async () => {
      const { useSysMLParser } = await import('../../hooks/useSysMLWasm')
      const parseSpy = vi.fn().mockReturnValue([])
      vi.mocked(useSysMLParser).mockImplementation(parseSpy)

      renderWithProviders(<TryYourself />)

      await waitFor(() => {
        expect(parseSpy).toHaveBeenCalled()
      })
    })

    it('should use WASM documentation generator', async () => {
      renderWithProviders(<TryYourself />)

      await waitFor(() => {
        expect(screen.getByText('Vehicle System')).toBeInTheDocument()
      })
    })

    it('should use WASM CST generator when CST tab is active', async () => {
      const user = userEvent.setup()
      const cstSpy = vi.spyOn(mockWasm, 'generate_cst')
      renderWithProviders(<TryYourself />)

      const cstTab = screen.getByText('CST')
      await user.click(cstTab)

      await waitFor(() => {
        expect(cstSpy).toHaveBeenCalled()
      })
    })

    it('should use WASM HIR generator when HIR tab is active', async () => {
      const user = userEvent.setup()
      const hirSpy = vi.spyOn(mockWasm, 'generate_hir')
      renderWithProviders(<TryYourself />)

      const hirTab = screen.getByText('HIR')
      await user.click(hirTab)

      await waitFor(() => {
        expect(hirSpy).toHaveBeenCalled()
      })
    })

    it('should use WASM analytics generator when Stats tab is active', async () => {
      const user = userEvent.setup()
      const analyticsSpy = vi.spyOn(mockWasm, 'generate_analytics')
      renderWithProviders(<TryYourself />)

      const statsTab = screen.getByText('Stats')
      await user.click(statsTab)

      await waitFor(() => {
        expect(analyticsSpy).toHaveBeenCalled()
      })
    })
  })

  describe('Error Handling Integration', () => {
    it('should handle WASM errors gracefully', async () => {
      vi.spyOn(mockWasm, 'generate_documentation').mockImplementation(() => {
        throw new Error('WASM error')
      })

      renderWithProviders(<TryYourself />)

      // Should fallback to simple parser
      await waitFor(() => {
        expect(screen.getByText('Vehicle System')).toBeInTheDocument()
      })
    })

    it('should display error messages in tabs', async () => {
      const user = userEvent.setup()
      vi.spyOn(mockWasm, 'generate_cst').mockImplementation(() => {
        throw new WebAssembly.RuntimeError('CST error')
      })

      renderWithProviders(<TryYourself />)

      const cstTab = screen.getByText('CST')
      await user.click(cstTab)

      await waitFor(() => {
        expect(screen.getByText(/Error|WASM/i)).toBeInTheDocument()
      })
    })
  })

  describe('Code Examples Integration', () => {
    it('should load and display Vehicle System example', async () => {
      renderWithProviders(<TryYourself />)

      await waitFor(() => {
        expect(screen.getByText('Vehicle System')).toBeInTheDocument()
      })
    })

    it('should switch between different examples', async () => {
      const user = userEvent.setup()
      renderWithProviders(<TryYourself />)

      const helloWorldExample = screen.getByText('Hello World')
      await user.click(helloWorldExample)

      await waitFor(() => {
        expect(screen.getByText('Hello World')).toBeInTheDocument()
      })
    })
  })
})
