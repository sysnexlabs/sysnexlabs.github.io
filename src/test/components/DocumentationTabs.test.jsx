import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DocumentationTabs from '../../components/DocumentationTabs/DocumentationTabs'
import { MockSysMLWasm } from '../utils/wasmMock'
import { VALID_SYSML_CODE } from '../utils/testData'
import { renderWithProviders } from '../utils/testHelpers'

// Mock hooks
const mockWasm = new MockSysMLWasm()
const docCache = new Map()
const EMPTY_DOC = { chapters: [], file_uri: 'editor://current', _empty: true }

vi.mock('../../hooks/useSysMLWasm', () => ({
  useSysMLWasm: () => ({
    wasm: mockWasm,
    loading: false,
    error: null,
  }),
  useSysMLParser: () => [],
  useSysMLDocumentation: (code) => {
    if (!code || code.trim().length === 0) {
      return {
        documentation: EMPTY_DOC,
        loading: false,
      }
    }
    let doc = docCache.get(code)
    if (!doc) {
      doc = mockWasm.generate_documentation(code, 'editor://current')
      docCache.set(code, doc)
    }
    return {
      documentation: doc || { chapters: [], file_uri: 'editor://current' },
      loading: false,
    }
  },
}))

describe('DocumentationTabs', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all tab buttons', () => {
    renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    expect(screen.getByRole('button', { name: 'Documentation' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'CST' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'HIR' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Stats' })).toBeInTheDocument()
  })

  it('should show Documentation tab by default', () => {
    renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    expect(screen.getByRole('button', { name: 'Documentation' })).toHaveClass('active')
  })

  it('should switch to CST tab when clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    const cstTab = screen.getByRole('button', { name: 'CST' })
    await user.click(cstTab)

    await waitFor(() => {
      expect(cstTab).toHaveClass('active')
    })
  })

  it('should switch to HIR tab when clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    const hirTab = screen.getByRole('button', { name: 'HIR' })
    await user.click(hirTab)

    await waitFor(() => {
      expect(hirTab).toHaveClass('active')
    })
  })

  it('should switch to Stats tab when clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    const statsTab = screen.getByRole('button', { name: 'Stats' })
    await user.click(statsTab)

    await waitFor(() => {
      expect(statsTab).toHaveClass('active')
    })
  })

  it('should display CST data when CST tab is active', async () => {
    const user = userEvent.setup()
    renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    const cstTab = screen.getByRole('button', { name: 'CST' })
    await user.click(cstTab)

    await waitFor(() => {
      expect(screen.getByText('CST (Concrete Syntax Tree)')).toBeInTheDocument()
    })
  })

  it('should display HIR data when HIR tab is active', async () => {
    const user = userEvent.setup()
    renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    const hirTab = screen.getByRole('button', { name: 'HIR' })
    await user.click(hirTab)

    await waitFor(() => {
      expect(screen.getByText('HIR (High-level Intermediate Representation)')).toBeInTheDocument()
    })
  })

  it('should display analytics data when Stats tab is active', async () => {
    const user = userEvent.setup()
    renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    const statsTab = screen.getByRole('button', { name: 'Stats' })
    await user.click(statsTab)

    await waitFor(() => {
      expect(screen.getByText('Analytics & Statistics')).toBeInTheDocument()
    })
  })

  it('should handle empty code', () => {
    renderWithProviders(<DocumentationTabs code="" />)

    expect(screen.getByText(/Start typing/i)).toBeInTheDocument()
  })

  it('should update content when code changes', async () => {
    const { rerender } = renderWithProviders(<DocumentationTabs code={VALID_SYSML_CODE.simple} />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2, name: /Simple Example/i })).toBeInTheDocument()
    })

    rerender(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2, name: /Vehicle System/i })).toBeInTheDocument()
    })
  })
})
