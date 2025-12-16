/**
 * Mock WASM module for testing
 * Simulates the SysMLWasm class behavior
 */

export class MockSysMLWasm {
  constructor() {
    this.initialized = true
  }

  parse(source) {
    // Mock parse function - returns diagnostics
    const diagnostics = []
    const lines = source.split('\n')
    
    lines.forEach((line, index) => {
      // Simple validation: check for common errors
      if (line.includes('package') && !line.includes("'")) {
        diagnostics.push({
          line: index + 1,
          message: "Package name must be quoted with single quotes",
          severity: 'error'
        })
      }
      
      if (line.includes('attribute') && !line.includes(':>')) {
        diagnostics.push({
          line: index + 1,
          message: "Attribute must have a type (use ':> Type')",
          severity: 'error'
        })
      }
    })
    
    return diagnostics
  }

  generate_documentation(source, fileUri) {
    // Mock documentation generation
    const chapters = []
    const lines = source.split('\n')
    
    let currentPackage = null
    let currentPart = null
    let inDocComment = false
    let docComment = ''
    
    lines.forEach((line, index) => {
      const trimmed = line.trim()
      
      if (trimmed.startsWith("package '")) {
        const match = trimmed.match(/package '([^']+)'/)
        if (match) {
          if (currentPackage) {
            chapters.push(currentPackage)
          }
          currentPackage = {
            title: match[1],
            kind: '[Package]',
            doc_comment: docComment.trim() || undefined,
            doc_declarations: docComment ? [[null, docComment.trim()]] : undefined,
            imports: [],
            subchapters: [],
            metadata: {
              subchapter_count: 0,
              has_doc: !!docComment,
              import_count: 0,
            },
            range: { start: index, end: index },
            file_uri: fileUri || 'editor://current',
            diagrams: [],
          }
          docComment = ''
          inDocComment = false
        }
      }
      
      if (trimmed.includes('doc /*')) {
        inDocComment = true
        docComment = ''
      } else if (inDocComment && trimmed.includes('*/')) {
        inDocComment = false
      } else if (inDocComment) {
        docComment += line.replace(/^\s*\*\s?/, '') + '\n'
      }
      
      if (trimmed.startsWith('part def ')) {
        const match = trimmed.match(/part def (\w+)/)
        if (match && currentPackage) {
          currentPart = {
            title: match[1],
            kind: '[PartDefinition]',
            doc_comment: docComment.trim() || undefined,
            doc_declarations: docComment ? [[null, docComment.trim()]] : undefined,
            stable_id: `def-${match[1].toLowerCase()}`,
            signature: trimmed,
            body: '',
            relationships: [],
            diagrams: [],
            nested_elements: [],
            metadata: {
              has_doc: !!docComment,
              nested_count: 0,
              relationship_count: 0,
            },
            range: { start: index, end: index },
            file_uri: fileUri || 'editor://current',
          }
          docComment = ''
          inDocComment = false
        }
      }
      
      if (trimmed.startsWith('attribute ') && currentPart) {
        const match = trimmed.match(/attribute\s+(\w+)\s*:>\s*([^=\[]+)(\[[^\]]*\])?\s*=?\s*(.*)?/)
        if (match) {
          const attrName = match[1]
          const attrType = match[2].trim()
          const multiplicity = match[3] || ''
          const defaultValue = match[4]?.trim() || undefined
          
          currentPart.nested_elements.push({
            title: attrName,
            kind: '[AttributeUsage]',
            stable_id: `attr-${attrName.toLowerCase()}`,
            signature: trimmed,
            body: '',
            type_name: attrType,
            default_value: defaultValue,
            multiplicity: multiplicity,
            relationships: [],
            diagrams: [],
            nested_elements: [],
            metadata: {
              has_doc: false,
              nested_count: 0,
              relationship_count: 0,
            },
            range: { start: index, end: index },
            file_uri: fileUri || 'editor://current',
          })
          currentPart.metadata.nested_count++
        }
      }
      
      if (trimmed === '}' && currentPart && currentPackage) {
        currentPackage.subchapters.push(currentPart)
        currentPackage.metadata.subchapter_count++
        currentPart = null
      }
    })
    
    if (currentPackage) {
      chapters.push(currentPackage)
    }
    
    return {
      chapters,
      file_uri: fileUri || 'editor://current',
    }
  }

  generate_cst(source, fileUri) {
    // Mock CST generation
    return {
      root: {
        type: 'Package',
        name: 'Mock Package',
        children: [
          {
            type: 'PartDefinition',
            name: 'MockPart',
            children: []
          }
        ]
      },
      stats: {
        total_nodes: 5,
        total_tokens: 20,
        depth: 3
      },
      file_uri: fileUri || 'editor://current'
    }
  }

  generate_hir(source, fileUri) {
    // Mock HIR generation
    return {
      roots: [
        {
          id: 'root-1',
          kind: 'Package',
          name: 'Mock Package',
          children: []
        }
      ],
      stats: {
        total_nodes: 3,
        total_roots: 1
      },
      file_uri: fileUri || 'editor://current'
    }
  }

  generate_analytics(source, fileUri) {
    // Mock analytics generation
    return {
      file_uri: fileUri || 'editor://current',
      timestamp: Date.now() / 1000,
      metrics: {
        total_elements: 5,
        total_packages: 1,
        total_definitions: 2,
        doc_coverage: 75.5
      },
      complexity: {
        overall_score: 3.5
      },
      quality: {
        overall_score: 4.0
      },
      insights: [
        {
          category: 'Documentation',
          message: 'Good documentation coverage',
          severity: 'info',
          suggestion: 'Consider adding more examples'
        }
      ],
      analysis_time_ms: 10
    }
  }
}

/**
 * Create a mock WASM module loader
 */
export function createMockWasmModule() {
  return {
    default: async () => {},
    SysMLWasm: MockSysMLWasm,
  }
}

/**
 * Mock WASM error scenarios
 */
export class MockSysMLWasmWithError extends MockSysMLWasm {
  constructor(errorType = 'generic') {
    super()
    this.errorType = errorType
  }

  parse() {
    if (this.errorType === 'parse_error') {
      throw new Error('Parse error occurred')
    }
    return super.parse(...arguments)
  }

  generate_documentation() {
    if (this.errorType === 'documentation_error') {
      throw new WebAssembly.RuntimeError('Documentation generation panicked')
    }
    return super.generate_documentation(...arguments)
  }

  generate_cst() {
    if (this.errorType === 'cst_error') {
      throw new WebAssembly.RuntimeError('CST generation panicked')
    }
    return super.generate_cst(...arguments)
  }

  generate_hir() {
    if (this.errorType === 'hir_error') {
      throw new WebAssembly.RuntimeError('HIR generation panicked')
    }
    return super.generate_hir(...arguments)
  }

  generate_analytics() {
    if (this.errorType === 'analytics_error') {
      throw new WebAssembly.RuntimeError('Analytics generation panicked')
    }
    return super.generate_analytics(...arguments)
  }
}
