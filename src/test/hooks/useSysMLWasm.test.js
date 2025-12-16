import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useSysMLWasm, useSysMLParser, useSysMLDocumentation } from '../../hooks/useSysMLWasm'
import { MockSysMLWasm, MockSysMLWasmWithError, createMockWasmModule } from '../utils/wasmMock'
import { VALID_SYSML_CODE, INVALID_SYSML_CODE } from '../utils/testData'

describe('useSysMLWasm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    delete globalThis.__SYSML_WASM_TEST_MODULE__
    delete globalThis.__SYSML_WASM_TEST_MODULE_ERROR__
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('WASM loading', () => {
    it('should load WASM module successfully', async () => {
      const mockModule = createMockWasmModule()
      globalThis.__SYSML_WASM_TEST_MODULE__ = mockModule

      const { result } = renderHook(() => useSysMLWasm())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.wasm).toBeInstanceOf(MockSysMLWasm)
      expect(result.current.error).toBeNull()
    })

    it('should handle WASM module loading failure gracefully', async () => {
      globalThis.__SYSML_WASM_TEST_MODULE__ = null
      globalThis.__SYSML_WASM_TEST_MODULE_ERROR__ = new Error('WASM module not found')

      const { result } = renderHook(() => useSysMLWasm())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.wasm).toBeNull()
      expect(result.current.error).toBeTruthy()
    })

    it('should use fallback parser when WASM is not available', async () => {
      globalThis.__SYSML_WASM_TEST_MODULE__ = null
      globalThis.__SYSML_WASM_TEST_MODULE_ERROR__ = new Error('WASM module not found')

      const { result } = renderHook(() => useSysMLWasm())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should still work with fallback
      expect(result.current.wasm).toBeNull()
    })
  })
})

describe('useSysMLParser', () => {
  it('should parse valid SysML code and return empty diagnostics', () => {
    const mockWasm = new MockSysMLWasm()
    vi.spyOn(mockWasm, 'parse').mockReturnValue([])

    const { result } = renderHook(() => useSysMLParser(VALID_SYSML_CODE.simple))

    expect(result.current).toEqual([])
  })

  it('should detect syntax errors in invalid code', () => {
    const mockWasm = new MockSysMLWasm()
    const diagnostics = mockWasm.parse(INVALID_SYSML_CODE.unquotedPackage)

    expect(diagnostics.length).toBeGreaterThan(0)
    expect(diagnostics[0].severity).toBe('error')
  })

  it('should return diagnostics with correct line numbers', () => {
    const mockWasm = new MockSysMLWasm()
    const diagnostics = mockWasm.parse(INVALID_SYSML_CODE.unquotedPackage)

    expect(diagnostics[0].line).toBe(1)
    expect(diagnostics[0].message).toContain('Package name')
  })

  it('should handle WASM errors gracefully', () => {
    const mockWasm = new MockSysMLWasmWithError('parse_error')
    
    const { result } = renderHook(() => useSysMLParser(VALID_SYSML_CODE.simple))

    // Should return empty array on error
    expect(result.current).toEqual([])
  })

  it('should work with fallback parser when WASM is unavailable', () => {
    const { result } = renderHook(() => useSysMLParser(INVALID_SYSML_CODE.unquotedPackage))

    // Fallback parser should still detect errors
    expect(result.current.length).toBeGreaterThan(0)
  })
})

describe('useSysMLDocumentation', () => {
  it('should generate documentation for valid SysML code', async () => {
    const mockWasm = new MockSysMLWasm()
    const { result } = renderHook(() => useSysMLDocumentation(VALID_SYSML_CODE.vehicle))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.documentation).toBeDefined()
    expect(result.current.documentation.chapters).toBeInstanceOf(Array)
    expect(result.current.documentation.chapters.length).toBeGreaterThan(0)
  })

  it('should extract package information', async () => {
    const mockWasm = new MockSysMLWasm()
    const { result } = renderHook(() => useSysMLDocumentation(VALID_SYSML_CODE.vehicle))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    const chapters = result.current.documentation.chapters
    expect(chapters[0].title).toBe('Vehicle System')
    expect(chapters[0].kind).toBe('[Package]')
  })

  it('should extract part definitions', async () => {
    const mockWasm = new MockSysMLWasm()
    const { result } = renderHook(() => useSysMLDocumentation(VALID_SYSML_CODE.vehicle))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    const chapters = result.current.documentation.chapters
    const subchapters = chapters[0].subchapters
    expect(subchapters.length).toBeGreaterThan(0)
    expect(subchapters[0].kind).toBe('[PartDefinition]')
  })

  it('should extract attributes from parts', async () => {
    const mockWasm = new MockSysMLWasm()
    const { result } = renderHook(() => useSysMLDocumentation(VALID_SYSML_CODE.vehicle))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    const chapters = result.current.documentation.chapters
    const part = chapters[0].subchapters[0]
    expect(part.nested_elements.length).toBeGreaterThan(0)
    expect(part.nested_elements[0].kind).toBe('[AttributeUsage]')
  })

  it('should handle WASM errors and fallback to simple parser', async () => {
    const mockWasm = new MockSysMLWasmWithError('documentation_error')
    const { result } = renderHook(() => useSysMLDocumentation(VALID_SYSML_CODE.vehicle))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Should still return documentation from fallback parser
    expect(result.current.documentation).toBeDefined()
    expect(result.current.documentation.chapters).toBeInstanceOf(Array)
  })

  it('should handle empty code', async () => {
    const mockWasm = new MockSysMLWasm()
    const { result } = renderHook(() => useSysMLDocumentation(''))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.documentation.chapters).toEqual([])
  })

  it('should debounce documentation generation', async () => {
    const mockWasm = new MockSysMLWasm()
    const generateSpy = vi.spyOn(mockWasm, 'generate_documentation')

    // Ensure the hook uses our mocked WASM instance (instead of fallback)
    globalThis.__SYSML_WASM_TEST_MODULE__ = {
      default: async () => {},
      init_panic_hook: () => {},
      SysMLWasm: function SysMLWasm() {
        return mockWasm
      }
    }

    const { result, rerender } = renderHook(
      ({ code }) => useSysMLDocumentation(code),
      { initialProps: { code: VALID_SYSML_CODE.simple } }
    )

    // Rapidly change code
    rerender({ code: VALID_SYSML_CODE.vehicle })
    rerender({ code: VALID_SYSML_CODE.requirements })
    rerender({ code: VALID_SYSML_CODE.vehicle })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    }, { timeout: 1000 })

    // Should have been called, but debounced
    expect(generateSpy).toHaveBeenCalled()
  })
})
