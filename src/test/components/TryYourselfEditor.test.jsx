import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TryYourselfEditor from '../../components/TryYourselfEditor/TryYourselfEditor'
import { MockSysMLWasm } from '../utils/wasmMock'
import { VALID_SYSML_CODE, INVALID_SYSML_CODE } from '../utils/testData'
import { createMockMonacoEditor, renderWithProviders } from '../utils/testHelpers'

// Mock useSysMLParser hook
vi.mock('../../hooks/useSysMLWasm', () => ({
  useSysMLParser: vi.fn((code) => {
    const mockWasm = new MockSysMLWasm()
    return mockWasm.parse(code)
  }),
  useSysMLWasm: () => ({
    wasm: new MockSysMLWasm(),
    loading: false,
    error: null,
  }),
  useSysMLDocumentation: () => ({
    documentation: { chapters: [], file_uri: 'editor://current' },
    loading: false,
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
    // Simulate editor mount
    if (onMount) {
      setTimeout(() => {
        onMount(mockEditor, mockMonaco)
      }, 0)
    }
    return <div data-testid="monaco-editor">Monaco Editor: {value?.substring(0, 50)}</div>
  },
}))

describe('TryYourselfEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset global monaco
    if (typeof window !== 'undefined') {
      window.monaco = mockMonaco
    }
  })

  describe('Rendering', () => {
    it('should render Monaco editor', () => {
      renderWithProviders(<TryYourselfEditor />)
      expect(screen.getByTestId('monaco-editor')).toBeInTheDocument()
    })

    it('should display example selector', () => {
      renderWithProviders(<TryYourselfEditor />)
      expect(screen.getByText('Hello World')).toBeInTheDocument()
      expect(screen.getByText('Vehicle System')).toBeInTheDocument()
      expect(screen.getByText('Requirements')).toBeInTheDocument()
      expect(screen.getByText('Interfaces')).toBeInTheDocument()
    })

    it('should load default example', () => {
      renderWithProviders(<TryYourselfEditor />)
      const select = screen.getByLabelText(/example/i)
      expect(select).toHaveValue('Vehicle System')
    })
  })

  describe('Example Selection', () => {
    it('should switch examples when selected', async () => {
      const user = userEvent.setup()
      renderWithProviders(<TryYourselfEditor />)

      const select = screen.getByLabelText(/example/i)
      await user.selectOptions(select, 'Hello World')

      expect(select).toHaveValue('Hello World')
    })

    it('should call onCodeChange when example changes', async () => {
      const user = userEvent.setup()
      const onCodeChange = vi.fn()
      renderWithProviders(<TryYourselfEditor onCodeChange={onCodeChange} />)

      const select = screen.getByLabelText(/example/i)
      await user.selectOptions(select, 'Hello World')

      await waitFor(() => {
        expect(onCodeChange).toHaveBeenCalled()
      })
    })
  })

  describe('Syntax Highlighting', () => {
    it('should register SysML language', async () => {
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(mockMonaco.languages.register).toHaveBeenCalledWith({ id: 'sysml' })
      })
    })

    it('should set Monarch tokenizer for syntax highlighting', async () => {
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(mockMonaco.languages.setMonarchTokensProvider).toHaveBeenCalledWith(
          'sysml',
          expect.objectContaining({
            tokenizer: expect.objectContaining({
              root: expect.any(Array),
            }),
          })
        )
      })
    })

    it('should define SysML dark theme', async () => {
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(mockMonaco.editor.defineTheme).toHaveBeenCalledWith(
          'sysml-dark',
          expect.objectContaining({
            base: 'vs-dark',
            rules: expect.any(Array),
            colors: expect.any(Object),
          })
        )
      })
    })

    it('should apply SysML dark theme', async () => {
      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(mockMonaco.editor.setTheme).toHaveBeenCalledWith('sysml-dark')
      })
    })
  })

  describe('Diagnostics', () => {
    it('should display diagnostics panel when errors exist', async () => {
      // Mock parser to return diagnostics
      const { useSysMLParser } = await import('../../hooks/useSysMLWasm')
      vi.mocked(useSysMLParser).mockReturnValue([
        { line: 1, message: 'Test error', severity: 'error' },
      ])

      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(screen.getByText(/Diagnostics/i)).toBeInTheDocument()
      })
    })

    it('should set Monaco markers for diagnostics', async () => {
      const diagnostics = [
        { line: 1, message: 'Test error', severity: 'error' },
        { line: 2, message: 'Test warning', severity: 'warning' },
      ]

      const { useSysMLParser } = await import('../../hooks/useSysMLWasm')
      vi.mocked(useSysMLParser).mockReturnValue(diagnostics)

      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(mockMonaco.editor.setModelMarkers).toHaveBeenCalled()
      })

      const callArgs = mockMonaco.editor.setModelMarkers.mock.calls[0]
      expect(callArgs[0]).toBe(mockEditor.getModel())
      expect(callArgs[1]).toBe('sysml')
      expect(callArgs[2]).toHaveLength(2)
      expect(callArgs[2][0].severity).toBe(mockMonaco.editor.MarkerSeverity.Error)
      expect(callArgs[2][1].severity).toBe(mockMonaco.editor.MarkerSeverity.Warning)
    })

    it('should convert diagnostic severity to Monaco marker severity', async () => {
      const diagnostics = [
        { line: 1, message: 'Error', severity: 'error' },
        { line: 2, message: 'Warning', severity: 'warning' },
        { line: 3, message: 'Info', severity: 'info' },
        { line: 4, message: 'Hint', severity: 'hint' },
      ]

      const { useSysMLParser } = await import('../../hooks/useSysMLWasm')
      vi.mocked(useSysMLParser).mockReturnValue(diagnostics)

      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        const markers = mockMonaco.editor.setModelMarkers.mock.calls[0][2]
        expect(markers[0].severity).toBe(mockMonaco.editor.MarkerSeverity.Error)
        expect(markers[1].severity).toBe(mockMonaco.editor.MarkerSeverity.Warning)
        expect(markers[2].severity).toBe(mockMonaco.editor.MarkerSeverity.Info)
        expect(markers[3].severity).toBe(mockMonaco.editor.MarkerSeverity.Hint)
      })
    })

    it('should not display diagnostics panel when no errors', async () => {
      const { useSysMLParser } = vi.mocked(await import('../../hooks/useSysMLWasm'))
      useSysMLParser.mockReturnValue([])

      renderWithProviders(<TryYourselfEditor />)

      expect(screen.queryByText(/Diagnostics/i)).not.toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('should navigate to diagnostic line when clicked', async () => {
      const user = userEvent.setup()
      const diagnostics = [
        { line: 5, message: 'Test error', severity: 'error' },
      ]

      const { useSysMLParser } = await import('../../hooks/useSysMLWasm')
      vi.mocked(useSysMLParser).mockReturnValue(diagnostics)

      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        expect(screen.getByText(/Line 5:/i)).toBeInTheDocument()
      })

      const diagnosticItem = screen.getByText(/Line 5:/i).closest('li')
      await user.click(diagnosticItem)

      expect(mockEditor.setPosition).toHaveBeenCalledWith({ lineNumber: 5, column: 1 })
      expect(mockEditor.revealLineInCenter).toHaveBeenCalledWith(5)
      expect(mockEditor.focus).toHaveBeenCalled()
    })

    it('should make diagnostic items clickable', async () => {
      const diagnostics = [
        { line: 3, message: 'Test error', severity: 'error' },
      ]

      const { useSysMLParser } = await import('../../hooks/useSysMLWasm')
      vi.mocked(useSysMLParser).mockReturnValue(diagnostics)

      renderWithProviders(<TryYourselfEditor />)

      await waitFor(() => {
        const diagnosticItem = screen.getByText(/Line 3:/i).closest('li')
        expect(diagnosticItem).toHaveStyle({ cursor: 'pointer' })
        expect(diagnosticItem).toHaveAttribute('title', 'Click to navigate to this line')
      })
    })
  })

  describe('Code Changes', () => {
    it('should call onCodeChange when code changes', async () => {
      const onCodeChange = vi.fn()
      renderWithProviders(<TryYourselfEditor onCodeChange={onCodeChange} />)

      await waitFor(() => {
        expect(onCodeChange).toHaveBeenCalled()
      })
    })

    it('should update diagnostics when code changes', async () => {
      const { useSysMLParser } = await import('../../hooks/useSysMLWasm')
      const parseSpy = vi.fn().mockReturnValue([])
      vi.mocked(useSysMLParser).mockImplementation(parseSpy)

      const { rerender } = renderWithProviders(<TryYourselfEditor />)

      // Change code (simulated by rerendering with different props)
      rerender(<TryYourselfEditor />)

      // Parser should be called with updated code
      expect(parseSpy).toHaveBeenCalled()
    })
  })
})
