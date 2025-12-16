import { useState, useEffect, useRef } from 'react'
import { safeWasmCall, formatWasmError } from '../utils/wasmErrorHandler'

/**
 * Hook to load and use SysML WASM module
 * Falls back to simple parser if WASM is not available
 */
export function useSysMLWasm() {
  const [wasm, setWasm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    const loadWasm = async () => {
      try {
        // Try to load WASM module dynamically at runtime
        // Use a template literal to prevent Vite from statically analyzing the path
        // In production (GitHub Pages), use relative paths since base: './' is set
        // In development, WASM files are in src/wasm/ relative to src/hooks/
        let wasmJsPath, wasmBinaryPath
        if (import.meta.env.PROD) {
          // In production, use Vite's BASE_URL which includes the configured base path
          // This ensures paths work correctly for subdirectory deployments (e.g., GitHub Pages)
          const base = import.meta.env.BASE_URL || '/'
          wasmJsPath = `${base}wasm/sysml_wasm_bridge.js`
          wasmBinaryPath = `${base}wasm/sysml_wasm_bridge_bg.wasm`
          console.log('🔍 [WASM] Production paths:', { base, wasmJsPath, wasmBinaryPath })
        } else {
          // In development, WASM files are in src/wasm/ relative to src/hooks/
          wasmJsPath = new URL('../wasm/sysml_wasm_bridge.js', import.meta.url).href
          wasmBinaryPath = new URL('../wasm/sysml_wasm_bridge_bg.wasm', import.meta.url).href
        }
        
        // Try to load WASM module - catch import errors gracefully
        let wasmModule
        try {
          console.log('🔍 [WASM] Attempting to load from:', wasmJsPath)
          wasmModule = await import(/* @vite-ignore */ wasmJsPath)
        } catch (importErr) {
          // WASM file doesn't exist - this is expected in development
          console.info('WASM module not found, using fallback parser:', importErr.message)
          setError(importErr.message)
          setLoading(false)
          return // Exit early, continue with fallback parser
        }
        
        // Initialize WASM module
        // Pass the WASM file path explicitly so wasm-bindgen can find the .wasm file
        if (wasmModule.default) {
          if (wasmBinaryPath) {
            await wasmModule.default({ module_or_path: wasmBinaryPath })
          } else {
            // Fallback: let wasm-bindgen use default path resolution
            await wasmModule.default()
          }
        }
        
        // Initialize panic hook for better error reporting
        if (wasmModule.init_panic_hook) {
          wasmModule.init_panic_hook()
        }
        
        const SysMLWasm = wasmModule.SysMLWasm
        if (!SysMLWasm) {
          throw new Error('SysMLWasm class not found in WASM module')
        }
        
        // Try to create instance - will throw if placeholder
        const instance = new SysMLWasm()
        
        setWasm(instance)
        setLoading(false)
      } catch (err) {
        // Check if it's the placeholder error or a real error
        if (err.message && err.message.includes('WASM module not built yet')) {
          console.info('WASM module placeholder detected, using fallback parser')
        } else {
          console.warn('WASM module not available, using fallback parser:', err)
        }
        setError(err.message)
        setLoading(false)
        // Continue with fallback parser
      }
    }

    loadWasm()
  }, [])

  return { wasm, loading, error }
}

/**
 * Parse SysML code and return diagnostics
 */
export function useSysMLParser(code) {
  const { wasm } = useSysMLWasm()
  const [diagnostics, setDiagnostics] = useState([])

  useEffect(() => {
    if (!code) {
      setDiagnostics([])
      return
    }

    const parseCode = async () => {
      if (wasm) {
        try {
          console.log('🔍 Calling WASM parse with code length:', code.length)
          console.log('🔍 Code preview:', code.substring(0, 200))
          
          // Test with invalid syntax to see if parser finds errors
          const testInvalidCode = "package UnquotedPackage { part def Test { attribute name; } }"
          console.log('🧪 Testing with invalid code:', testInvalidCode)
          const testDiags = wasm.parse(testInvalidCode)
          console.log('🧪 Test diagnostics:', testDiags, 'length:', testDiags?.length)
          
          // Use WASM parser - parse is synchronous and returns Result directly
          // wasm-bindgen converts Result<T, E> to throw on Err, return value on Ok
          const diags = wasm.parse(code)
          
          console.log('📦 WASM parse returned:', diags, 'type:', typeof diags, 'isArray:', Array.isArray(diags))
          console.log('📦 Diagnostics details:', JSON.stringify(diags, null, 2))
          console.log('📦 Diagnostics length:', diags?.length, 'first item:', diags?.[0])
          
          // Ensure it's an array
          if (Array.isArray(diags)) {
            console.log('✅ Diagnostics received:', diags.length, 'items', diags)
            setDiagnostics(diags)
          } else {
            console.warn('⚠️ WASM parse returned non-array:', diags, typeof diags, diags?.constructor?.name)
            // Try to convert if it's a JsValue or similar
            if (diags && typeof diags === 'object') {
              try {
                const array = Array.from(diags)
                if (Array.isArray(array)) {
                  console.log('✅ Converted to array:', array)
                  setDiagnostics(array)
                  return
                }
              } catch (e) {
                console.warn('⚠️ Could not convert to array:', e)
              }
            }
            setDiagnostics([])
          }
        } catch (err) {
          // Result was an error (Err variant) - wasm-bindgen throws on Err
          console.error('❌ WASM parse error:', err)
          // Try to extract error message
          const errorMsg = err?.message || String(err)
          console.warn('⚠️ Parse failed, using fallback parser. Error:', errorMsg)
          // Fall through to fallback parser
          const errors = []
          const lines = code.split('\n')
          
          lines.forEach((line, index) => {
            if (line.includes('package') && !line.includes("'")) {
              errors.push({
                line: index + 1,
                message: "Package name must be quoted with single quotes",
                severity: 'error'
              })
            }
            
            if (line.includes('attribute') && !line.includes(':>')) {
              errors.push({
                line: index + 1,
                message: "Attribute must have a type (use ':> Type')",
                severity: 'error'
              })
            }
          })
          
          setDiagnostics(errors)
        }
      } else {
        // Fallback: simple regex-based validation
        const errors = []
        const lines = code.split('\n')
        
        lines.forEach((line, index) => {
          if (line.includes('package') && !line.includes("'")) {
            errors.push({
              line: index + 1,
              message: "Package name must be quoted with single quotes",
              severity: 'error'
            })
          }
          
          if (line.includes('attribute') && !line.includes(':>')) {
            errors.push({
              line: index + 1,
              message: "Attribute must have a type (use ':> Type')",
              severity: 'error'
            })
          }
        })
        
        setDiagnostics(errors)
      }
    }

    parseCode()
  }, [code, wasm])

  return diagnostics
}

/**
 * Generate documentation from SysML code
 */
export function useSysMLDocumentation(code, fileUri = 'editor://current') {
  const { wasm } = useSysMLWasm()
  const [documentation, setDocumentation] = useState(null) // null indicates not yet generated
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!code || code.trim().length === 0) {
      setDocumentation({ chapters: [], file_uri: fileUri, _empty: true })
      setLoading(false)
      return
    }

    const generateDoc = async () => {
      setLoading(true)
      // Don't reset documentation to null - keep previous documentation while generating new one
      // This prevents flickering between WASM and fallback
      
      if (wasm) {
        try {
          console.log('🔍 [JS] Calling WASM generate_documentation with code length:', code.length)
          const doc = await safeWasmCall(wasm.generate_documentation.bind(wasm), code, fileUri)
          console.log('🔍 [JS] WASM generate_documentation returned:', doc)
          // Always use WASM result, even if empty (empty might indicate parse errors, but structure is correct)
          if (doc && doc.chapters !== undefined) {
            console.log('✅ WASM documentation extracted:', doc.chapters.length, 'chapters')
            if (doc.chapters.length > 0) {
              console.log('📊 WASM chapters details:', doc.chapters.map(c => ({
                title: c.title,
                subchapters: c.subchapters?.length || 0,
                kinds: c.subchapters?.map(s => s.kind) || [],
                subchapterTitles: c.subchapters?.map(s => s.title) || [],
                hasRequirements: c.subchapters?.some(s => s.kind?.includes('Requirement')) || false
              })))
              
              // Debug: Log all subchapters in detail
              doc.chapters.forEach((chapter, idx) => {
                console.log(`📖 Chapter ${idx + 1} "${chapter.title}":`, {
                  subchapterCount: chapter.subchapters?.length || 0,
                  hasDocDeclarations: !!(chapter.doc_declarations && chapter.doc_declarations.length > 0),
                  docDeclarationsCount: chapter.doc_declarations?.length || 0,
                  hasCommentText: !!chapter.comment_text,
                  hasDocComment: !!chapter.doc_comment,
                  importsCount: chapter.imports?.length || 0,
                  imports: chapter.imports?.map(imp => ({
                    target_package: imp.target_package,
                    visibility: imp.visibility,
                    is_wildcard: imp.is_wildcard,
                    alias: imp.alias
                  })) || [],
                  subchapters: chapter.subchapters?.map((s, i) => ({
                    index: i + 1,
                    title: s.title,
                    kind: s.kind,
                    hasDocComment: !!s.doc_comment,
                    hasDocDeclarations: !!(s.doc_declarations && s.doc_declarations.length > 0),
                    docDeclarationsCount: s.doc_declarations?.length || 0,
                    hasCommentText: !!s.comment_text,
                    docPreview: s.doc_comment?.substring(0, 50) || (s.doc_declarations?.[0]?.[1]?.substring(0, 50)) || 'no doc'
                  })) || []
                })
              })
            } else {
              console.warn('⚠️ WASM returned 0 chapters - this might indicate:')
              console.warn('  1. No packages found in code')
              console.warn('  2. HIR generation failed silently')
              console.warn('  3. Code has syntax errors preventing HIR generation')
              console.warn('  Code preview:', code.substring(0, 200))
            }
            setDocumentation(doc)
          } else {
            console.error('❌ WASM returned invalid documentation structure:', doc)
            setDocumentation({ chapters: [], file_uri: fileUri })
          }
        } catch (err) {
          // Only fallback on actual errors, not empty results
          console.error('❌ WASM documentation generation failed:', formatWasmError(err, { 
            code, 
            functionName: 'generate_documentation' 
          }))
          console.warn('Falling back to simple parser due to WASM error')
          const simpleDoc = parseSysMLToDocumentationSimple(code)
          setDocumentation(simpleDoc)
        }
      } else {
        // Fallback: simple parser when WASM not available
        console.info('ℹ️ WASM not available, using fallback parser')
        const simpleDoc = parseSysMLToDocumentationSimple(code)
        setDocumentation(simpleDoc)
      }
      
      setLoading(false)
    }

    // Debounce to avoid too many calls
    const timeoutId = setTimeout(generateDoc, 300)
    return () => clearTimeout(timeoutId)
  }, [code, fileUri, wasm])

  return { documentation, loading }
}

// Simple fallback parser (existing implementation)
function parseSysMLToDocumentationSimple(code) {
  const chapters = []
  const lines = code.split('\n')

  let currentPackage = null
  let currentPart = null
  let inDocComment = false
  let docComment = ''
  let docDeclarations = [] // Support multiple doc declarations
  let currentDocName = null // Current doc declaration name
  let currentDocContent = '' // Current doc declaration content
  let inDocDeclaration = false // Are we in a doc declaration?
  let hasSeenFirstElement = false // Have we seen the first element after package?

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    // Doc declaration detection: "doc [Name] /* ... */" or "doc /* ... */"
    const docNamedMatch = trimmed.match(/^\s*doc\s+(\w+)\s*\/\*/) // Named: "doc Tip /*"
    const docAnonymousMatch = !docNamedMatch && trimmed.match(/^\s*doc\s*\/\*/) // Anonymous: "doc /*"

    if (docNamedMatch || docAnonymousMatch) {
      // Finalize previous doc declaration if any
      if (inDocDeclaration && currentDocContent.trim()) {
        docDeclarations.push([currentDocName, currentDocContent.trim()])
        currentDocName = null
        currentDocContent = ''
      }
      // Start new doc declaration
      inDocDeclaration = true
      inDocComment = false // Disable legacy doc comment tracking
      currentDocName = docNamedMatch ? docNamedMatch[1] : null
      currentDocContent = ''
      // Extract content from same line if comment ends on same line
      if (trimmed.includes('*/')) {
        const contentMatch = trimmed.match(/\/\*([^*]|\*(?!\/))*\*\//)
        if (contentMatch) {
          currentDocContent = contentMatch[0]
            .replace(/^\/\*/, '')
            .replace(/\*\/$/, '')
            .split('\n')
            .map(l => l.replace(/^\s*\*\s?/, '').trim())
            .filter(l => l.length > 0)
            .join('\n')
          inDocDeclaration = false
          docDeclarations.push([currentDocName, currentDocContent.trim()])
          currentDocName = null
          currentDocContent = ''
        }
      } else {
        // Multi-line doc declaration - extract first line content if present
        const startMatch = trimmed.match(/\/\*\s*(.*)/)
        if (startMatch && startMatch[1]) {
          currentDocContent = startMatch[1].trim() + '\n'
        }
      }
    } else if (inDocDeclaration) {
      // Continue collecting doc declaration content
      if (trimmed.includes('*/')) {
        // End of doc declaration
        const endMatch = trimmed.match(/^(.*?)\*\//)
        if (endMatch) {
          currentDocContent += endMatch[1].replace(/^\s*\*\s?/, '').trim()
        } else {
          currentDocContent += line.replace(/^\s*\*\s?/, '').replace(/\*\/.*$/, '').trim()
        }
        inDocDeclaration = false
        docDeclarations.push([currentDocName, currentDocContent.trim()])
        currentDocName = null
        currentDocContent = ''
      } else {
        // Middle of doc declaration
        currentDocContent += line.replace(/^\s*\*\s?/, '').trim() + '\n'
      }
    }

    if (trimmed.startsWith("package '")) {
      const match = trimmed.match(/package '([^']+)'/)
      if (match) {
        if (currentPackage) {
          chapters.push(currentPackage)
        }
        // Finalize any pending doc declaration
        if (inDocDeclaration && currentDocContent.trim()) {
          docDeclarations.push([currentDocName, currentDocContent.trim()])
        }
        // Use doc declarations if available, otherwise fall back to legacy docComment
        const packageDocs = docDeclarations.length > 0 ? docDeclarations : (docComment.trim() ? [[null, docComment.trim()]] : [])
        currentPackage = {
          title: match[1],
          kind: '[Package]',
          doc_comment: packageDocs.length === 0 ? (docComment.trim() || undefined) : undefined,
          doc_declarations: packageDocs.length > 0 ? packageDocs : undefined,
          imports: [],
          subchapters: [],
          metadata: {
            subchapter_count: 0,
            has_doc: docDeclarations.length > 0 || !!docComment,
            import_count: 0,
          },
          range: { start: index, end: index },
          file_uri: 'editor://current',
          diagrams: [],
        }
        docComment = ''
        docDeclarations = []
        inDocComment = false
        inDocDeclaration = false
        hasSeenFirstElement = false
      }
    }
    
    // Import detection: "import Package::*;" or "private import Package::*;" or "public import Package::*;"
    // Also handles file imports: "import 'file.adl';"
    if (currentPackage && /^\s*(?:private|public)?\s*import\s+/i.test(trimmed)) {
      // Match import statement
      // Pattern: [private|public] import <target> [as alias];
      const importMatch = trimmed.match(/^\s*(private|public)?\s*import\s+(.+?)(?:\s+as\s+(\w+))?\s*;?$/i)
      if (importMatch) {
        const visibility = importMatch[1]?.toLowerCase() || 'private'
        let target = importMatch[2]?.trim()
        const alias = importMatch[3] || null
        
        // Remove quotes if it's a file import
        if ((target.startsWith("'") && target.endsWith("'")) || 
            (target.startsWith('"') && target.endsWith('"'))) {
          target = target.slice(1, -1)
        }
        
        // Remove trailing semicolon if present
        target = target.replace(/;+$/, '').trim()
        
        // Check if it's a wildcard import (::* or ::**)
        const isWildcard = target.endsWith('::*') || target.endsWith('::**')
        
        // Remove wildcard suffix from target_package for cleaner display
        // We'll add it back when displaying if is_wildcard is true
        let targetPackage = target
        if (isWildcard) {
          // Remove ::* or ::** from the end
          targetPackage = target.replace(/::\*+$/, '')
        }
        
        // Determine if it's a standard library import
        const firstPart = targetPackage.split('::')[0]
        const isStandard = ['ScalarValues', 'Quantities', 'ISQ', 'SI', 'Shapes', 'Parts', 
                           'Items', 'Actions', 'States', 'Requirements', 'Analysis', 
                           'Verification', 'Views', 'Metadata'].includes(firstPart)
        
        const importVisibility = isStandard ? 'Standard' : (visibility === 'public' ? 'Public' : 'Private')
        
        currentPackage.imports.push({
          text: trimmed,
          target_package: targetPackage, // Store without wildcard suffix
          target_file: isStandard ? `std::${targetPackage}` : null,
          visibility: importVisibility,
          is_wildcard: isWildcard,
          alias: alias || null
        })
        currentPackage.metadata.import_count = currentPackage.imports.length
      }
    }
    
    if (trimmed.startsWith('part def ')) {
      const match = trimmed.match(/part def (\w+)/)
      if (match && currentPackage) {
        // Finalize any pending doc declaration
        if (inDocDeclaration && currentDocContent.trim()) {
          docDeclarations.push([currentDocName, currentDocContent.trim()])
          currentDocName = null
          currentDocContent = ''
          inDocDeclaration = false
        }

        // If we haven't seen first element yet, remaining docs go to package, not part
        if (!hasSeenFirstElement && docDeclarations.length > 0) {
          // Add doc declarations to package
          if (!currentPackage.doc_declarations) {
            currentPackage.doc_declarations = []
          }
          currentPackage.doc_declarations.push(...docDeclarations)
          currentPackage.metadata.has_doc = true
          docDeclarations = []
          docComment = '' // Clear to prevent bleeding into part
        }

        // Use doc declarations if available, otherwise fall back to legacy docComment
        const partDocs = docDeclarations.length > 0 ? docDeclarations : (docComment.trim() ? [[null, docComment.trim()]] : [])
        hasSeenFirstElement = true

        currentPart = {
          title: match[1],
          kind: '[PartDefinition]',
          doc_comment: partDocs.length === 0 ? (docComment.trim() || undefined) : undefined,
          doc_declarations: partDocs.length > 0 ? partDocs : undefined,
          stable_id: `def-${match[1].toLowerCase()}`,
          signature: trimmed,
          body: '',
          relationships: [],
          diagrams: [],
          nested_elements: [],
          metadata: {
            has_doc: docDeclarations.length > 0 || !!docComment,
            nested_count: 0,
            relationship_count: 0,
          },
          range: { start: index, end: index },
          file_uri: 'editor://current',
        }
        docComment = ''
        docDeclarations = []
        inDocComment = false
        inDocDeclaration = false
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
          file_uri: 'editor://current',
        })
        currentPart.metadata.nested_count++
      }
    }
    
    if (trimmed.startsWith('part ') && currentPart && !trimmed.includes('def')) {
      const match = trimmed.match(/part\s+(\w+)\s*:\s*(\w+)(\[[^\]]*\])?/)
      if (match) {
        const partName = match[1]
        const partType = match[2]
        const multiplicity = match[3] || ''
        
        currentPart.nested_elements.push({
          title: partName,
          kind: '[PartUsage]',
          stable_id: `part-${partName.toLowerCase()}`,
          signature: trimmed,
          body: '',
          type_name: partType,
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
          file_uri: 'editor://current',
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
    file_uri: 'editor://current',
  }
}
