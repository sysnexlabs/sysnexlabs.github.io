import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DocumentationTabs from '../../components/DocumentationTabs/DocumentationTabs'
import { MockSysMLWasm } from '../utils/wasmMock'
import { VALID_SYSML_CODE } from '../utils/testData'

// Mock hooks
const mockWasm = new MockSysMLWasm()

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

describe('DocumentationTabs', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all tab buttons', () => {
    render(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    expect(screen.getByText('Documentation')).toBeInTheDocument()
    expect(screen.getByText('CST')).toBeInTheDocument()
    expect(screen.getByText('HIR')).toBeInTheDocument()
    expect(screen.getByText('Stats')).toBeInTheDocument()
  })

  it('should show Documentation tab by default', () => {
    render(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    expect(screen.getByText('Documentation')).toHaveClass('active')
  })

  it('should switch to CST tab when clicked', async () => {
    const user = userEvent.setup()
    render(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    const cstTab = screen.getByText('CST')
    await user.click(cstTab)

    await waitFor(() => {
      expect(cstTab).toHaveClass('active')
    })
  })

  it('should switch to HIR tab when clicked', async () => {
    const user = userEvent.setup()
    render(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    const hirTab = screen.getByText('HIR')
    await user.click(hirTab)

    await waitFor(() => {
      expect(hirTab).toHaveClass('active')
    })
  })

  it('should switch to Stats tab when clicked', async () => {
    const user = userEvent.setup()
    render(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    const statsTab = screen.getByText('Stats')
    await user.click(statsTab)

    await waitFor(() => {
      expect(statsTab).toHaveClass('active')
    })
  })

  it('should display CST data when CST tab is active', async () => {
    const user = userEvent.setup()
    render(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    const cstTab = screen.getByText('CST')
    await user.click(cstTab)

    await waitFor(() => {
      expect(screen.getByText(/CST|Concrete Syntax Tree/i)).toBeInTheDocument()
    })
  })

  it('should display HIR data when HIR tab is active', async () => {
    const user = userEvent.setup()
    render(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    const hirTab = screen.getByText('HIR')
    await user.click(hirTab)

    await waitFor(() => {
      expect(screen.getByText(/HIR|High-level Intermediate Representation/i)).toBeInTheDocument()
    })
  })

  it('should display analytics data when Stats tab is active', async () => {
    const user = userEvent.setup()
    render(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    const statsTab = screen.getByText('Stats')
    await user.click(statsTab)

    await waitFor(() => {
      expect(screen.getByText(/Analytics|Statistics/i)).toBeInTheDocument()
    })
  })

  it('should handle empty code', () => {
    render(<DocumentationTabs code="" />)

    expect(screen.getByText(/Start typing/i)).toBeInTheDocument()
  })

  it('should update content when code changes', async () => {
    const { rerender } = render(<DocumentationTabs code={VALID_SYSML_CODE.simple} />)

    await waitFor(() => {
      expect(screen.getByText('Simple Example')).toBeInTheDocument()
    })

    rerender(<DocumentationTabs code={VALID_SYSML_CODE.vehicle} />)

    await waitFor(() => {
      expect(screen.getByText('Vehicle System')).toBeInTheDocument()
    })
  })
})
