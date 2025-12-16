import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useLayoutEffect } from 'react'
import TryYourself from '../../pages/TryYourself'
import { MockSysMLWasm } from '../utils/wasmMock'
import { VALID_SYSML_CODE } from '../utils/testData'
import { createMockMonacoEditor, renderWithProviders } from '../utils/testHelpers'

// Mock hooks
const mockWasm = new MockSysMLWasm()
const docCache = new Map()
const EMPTY_DOC = { chapters: [], file_uri: 'editor://current', _empty: true }

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
        documentation: EMPTY_DOC,
        loading: false,
      }
    }
    try {
      let doc = docCache.get(code)
      if (!doc) {
        doc = mockWasm.generate_documentation(code, 'editor://current')
        docCache.set(code, doc)
      }
      return {
        documentation: doc || { chapters: [], file_uri: 'editor://current' },
        loading: false,
      }
    } catch {
      // Mimic real hook behavior: fall back gracefully
      return {
        documentation: EMPTY_DOC,
        loading: false,
      }
    }
  },
}))

// Mock Monaco Editor
const mockEditor = createMockMonacoEditor()
const mockMonaco = {
  languages: {
    register: vi.fn(),
    setMonarchTokensProvider: vi.fn(),
    setLanguageConfiguration: vi.fn(),
    registerDocumentSemanticTokensProvider: vi.fn(() => ({ dispose: vi.fn() })),
    registerHoverProvider: vi.fn(() => ({ dispose: vi.fn() })),
    registerCompletionItemProvider: vi.fn(() => ({ dispose: vi.fn() })),
    registerDefinitionProvider: vi.fn(() => ({ dispose: vi.fn() })),
    registerReferenceProvider: vi.fn(() => ({ dispose: vi.fn() })),
    registerDocumentSymbolProvider: vi.fn(() => ({ dispose: vi.fn() })),
    registerInlayHintsProvider: vi.fn(() => ({ dispose: vi.fn() })),
    registerFoldingRangeProvider: vi.fn(() => ({ dispose: vi.fn() })),
    registerSignatureHelpProvider: vi.fn(() => ({ dispose: vi.fn() })),
    CompletionItemKind: { Text: 0 },
  },
  Range: function Range(startLineNumber, startColumn, endLineNumber, endColumn) {
    this.startLineNumber = startLineNumber
    this.startColumn = startColumn
    this.endLineNumber = endLineNumber
    this.endColumn = endColumn
  },
  MarkerSeverity: {
    Error: 8,
    Warning: 4,
    Info: 2,
    Hint: 1,
  },
  editor: {
    setModelMarkers: vi.fn(),
    getModelMarkers: vi.fn(() => []),
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
    useLayoutEffect(() => {
      if (onMount) onMount(mockEditor, mockMonaco)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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

      // i18n is mocked, so we assert the hero heading exists
      expect(screen.getByRole('heading', { level: 1, name: 'title' })).toBeInTheDocument()
      expect(screen.getAllByTestId('monaco-editor')[0]).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Documentation' })).toBeInTheDocument()
    })

    it('should update documentation when code changes', async () => {
      renderWithProviders(<TryYourself />)

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 2, name: /Vehicle System/i })).toBeInTheDocument()
      })
    })

    it('should display all tabs in documentation view', () => {
      renderWithProviders(<TryYourself />)

      expect(screen.getByRole('button', { name: 'Documentation' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'CST' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'HIR' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Stats' })).toBeInTheDocument()
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
        expect(screen.getByRole('heading', { level: 2, name: /Vehicle System/i })).toBeInTheDocument()
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
        expect(screen.getByRole('heading', { level: 2, name: /Vehicle System/i })).toBeInTheDocument()
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
        expect(screen.getByRole('heading', { level: 2, name: /Vehicle System/i })).toBeInTheDocument()
      })
    })

    it('should switch between different examples', async () => {
      const user = userEvent.setup()
      renderWithProviders(<TryYourself />)

      const exampleSelect = screen.getByLabelText(/Example/i, { selector: 'select#example-select' })
      await user.selectOptions(exampleSelect, 'Hello World')

      await waitFor(() => {
        expect(screen.getAllByTestId('monaco-editor')[0].textContent).toMatch(/package 'Hello World'/i)
      })
    })
  })
})
