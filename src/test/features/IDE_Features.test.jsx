import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TryYourselfEditor from '../../components/TryYourselfEditor/TryYourselfEditor'
import DocumentationView from '../../components/DocumentationView/DocumentationView'
import DocumentationTabs from '../../components/DocumentationTabs/DocumentationTabs'
import { MockSysMLWasm } from '../utils/wasmMock'
import { VALID_SYSML_CODE, INVALID_SYSML_CODE } from '../utils/testData'
import { createMockMonacoEditor, renderWithProviders } from '../utils/testHelpers'

// Mock hooks
const mockWasm = new MockSysMLWasm()
const mockDiagnostics = [
  { line: 1, message: 'Package name must be quoted', severity: 'error' },
  { line: 3, message: 'Attribute missing type', severity: 'warning' },
]

vi.mock('../../hooks/useSysMLWasm', () => ({
  useSysMLParser: vi.fn(() => mockDiagnostics),
  useSysMLWasm: () => ({
    wasm: mockWasm,
    loading: false,
    error: null,
  }),
  useSysMLDocumentation: vi.fn((code) => {
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
  }),
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
    return <div data-testid="monaco-editor">Monaco Editor</div>
  },
}))

describe('IDE Core Features', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    if (typeof window !== 'undefined') {
      window.monaco = mockMonaco
    }
  })

  describe('Diagnostics', () => {
    it('should display diagnostics in editor', async () => {
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(screen.getByText(/Diagnostics/i)).toBeInTheDocument()
        expect(screen.getByText(/Line 1:/i)).toBeInTheDocument()
        expect(screen.getByText(/Line 3:/i)).toBeInTheDocument()
      })
    })

    it('should set Monaco markers for diagnostics', async () => {
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(mockMonaco.editor.setModelMarkers).toHaveBeenCalled()
      })

      const markers = mockMonaco.editor.setModelMarkers.mock.calls[0][2]
      expect(markers).toHaveLength(2)
      expect(markers[0].severity).toBe(mockMonaco.editor.MarkerSeverity.Error)
      expect(markers[1].severity).toBe(mockMonaco.editor.MarkerSeverity.Warning)
    })

    it('should show correct diagnostic severity', async () => {
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        const errorDiagnostic = screen.getByText(/Package name must be quoted/i)
        expect(errorDiagnostic).toBeInTheDocument()
        expect(errorDiagnostic.closest('li')).toHaveClass('diagnostic-error')
      })
    })
  })

  describe('Navigation', () => {
    it('should navigate to error line when diagnostic is clicked', async () => {
      const user = userEvent.setup()
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(screen.getByText(/Line 1:/i)).toBeInTheDocument()
      })

      const diagnosticItem = screen.getByText(/Line 1:/i).closest('li')
      await user.click(diagnosticItem)

      expect(mockEditor.setPosition).toHaveBeenCalledWith({ lineNumber: 1, column: 1 })
      expect(mockEditor.revealLineInCenter).toHaveBeenCalledWith(1)
      expect(mockEditor.focus).toHaveBeenCalled()
    })

    it('should navigate to warning line when diagnostic is clicked', async () => {
      const user = userEvent.setup()
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(screen.getByText(/Line 3:/i)).toBeInTheDocument()
      })

      const diagnosticItem = screen.getByText(/Line 3:/i).closest('li')
      await user.click(diagnosticItem)

      expect(mockEditor.setPosition).toHaveBeenCalledWith({ lineNumber: 3, column: 1 })
      expect(mockEditor.revealLineInCenter).toHaveBeenCalledWith(3)
    })

    it('should highlight diagnostic items as clickable', async () => {
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        const diagnosticItem = screen.getByText(/Line 1:/i).closest('li')
        expect(diagnosticItem).toHaveStyle({ cursor: 'pointer' })
        expect(diagnosticItem).toHaveAttribute('title', 'Click to navigate to this line')
      })
    })
  })

  describe('Syntax Highlighting', () => {
    it('should register SysML language for highlighting', async () => {
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(mockMonaco.languages.register).toHaveBeenCalledWith({ id: 'sysml' })
      })
    })

    it('should configure syntax highlighting tokens', async () => {
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(mockMonaco.languages.setMonarchTokensProvider).toHaveBeenCalledWith(
          'sysml',
          expect.objectContaining({
            tokenizer: expect.objectContaining({
              root: expect.arrayContaining([
                expect.arrayContaining([expect.any(RegExp), 'keyword']),
                expect.arrayContaining([expect.any(RegExp), 'comment']),
                expect.arrayContaining([expect.any(RegExp), 'string']),
                expect.arrayContaining([expect.any(RegExp), 'number']),
                expect.arrayContaining([expect.any(RegExp), 'type']),
              ]),
            }),
          })
        )
      })
    })

    it('should highlight keywords correctly', async () => {
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        const tokenizer = mockMonaco.languages.setMonarchTokensProvider.mock.calls[0][1]
        const rootRules = tokenizer.tokenizer.root

        // Check for keyword patterns
        const keywordRule = rootRules.find(rule => 
          Array.isArray(rule) && rule[1] === 'keyword'
        )
        expect(keywordRule).toBeDefined()
        expect(keywordRule[0]).toMatch(/package|part|attribute/)
      })
    })

    it('should apply custom theme', async () => {
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(mockMonaco.editor.defineTheme).toHaveBeenCalledWith(
          'sysml-dark',
          expect.objectContaining({
            base: 'vs-dark',
            rules: expect.arrayContaining([
              expect.objectContaining({ token: 'keyword' }),
              expect.objectContaining({ token: 'string' }),
              expect.objectContaining({ token: 'comment' }),
            ]),
          })
        )
        expect(mockMonaco.editor.setTheme).toHaveBeenCalledWith('sysml-dark')
      })
    })
  })

  describe('Documentation Viewer', () => {
    it('should display documentation for valid code', async () => {
      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        expect(screen.getByText('Vehicle System')).toBeInTheDocument()
      })
    })

    it('should display all parts in documentation', async () => {
      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        expect(screen.getByText('Vehicle')).toBeInTheDocument()
        expect(screen.getByText('Engine')).toBeInTheDocument()
        expect(screen.getByText('Wheel')).toBeInTheDocument()
      })
    })

    it('should display attributes with types', async () => {
      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        expect(screen.getByText('speed')).toBeInTheDocument()
        expect(screen.getByText('mass')).toBeInTheDocument()
      })
    })

    it('should display table of contents', async () => {
      renderWithProviders(<DocumentationView code={VALID_SYSML_CODE.vehicle} />)

      await waitFor(() => {
        expect(screen.getByText('Model Tree')).toBeInTheDocument()
      })
    })
  })

  describe('Documentation Tabs', () => {
    it('should switch between tabs', async () => {
      const user = userEvent.setup()
      renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

      const cstTab = screen.getByText('CST')
      await user.click(cstTab)

      await waitFor(() => {
        expect(cstTab).toHaveClass('active')
      })
    })

    it('should display CST when CST tab is active', async () => {
      const user = userEvent.setup()
      renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

      await user.click(screen.getByText('CST'))

      await waitFor(() => {
        expect(screen.getByText(/CST|Concrete Syntax Tree/i)).toBeInTheDocument()
      })
    })

    it('should display HIR when HIR tab is active', async () => {
      const user = userEvent.setup()
      renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

      await user.click(screen.getByText('HIR'))

      await waitFor(() => {
        expect(screen.getByText(/HIR|High-level Intermediate Representation/i)).toBeInTheDocument()
      })
    })

    it('should display Stats when Stats tab is active', async () => {
      const user = userEvent.setup()
      renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

      await user.click(screen.getByText('Stats'))

      await waitFor(() => {
        expect(screen.getByText(/Analytics|Statistics/i)).toBeInTheDocument()
      })
    })
  })

  describe('Integration', () => {
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

    it('should update diagnostics when code changes', async () => {
      const { useSysMLParser } = await import('../../hooks/useSysMLWasm')
      const parseSpy = vi.fn().mockReturnValue(mockDiagnostics)
      vi.mocked(useSysMLParser).mockImplementation(parseSpy)

      const { rerender } = renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(screen.getByText(/Diagnostics/i)).toBeInTheDocument()
      })

      // Change code
      rerender(<TryYourselfEditor />)

      // Parser should be called again
      expect(parseSpy).toHaveBeenCalled()
    })
  })
})
