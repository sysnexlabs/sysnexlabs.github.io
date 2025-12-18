import React, { useState, useMemo } from 'react'
import { useSysMLDocumentation, useSysMLWasm } from '../../hooks/useSysMLWasm'
import QualityIndicator from './QualityIndicator'
import ConstraintDisplay from './ConstraintDisplay'
import ExportMenu from './ExportMenu'
import ImportManagerPanel from './ImportManagerPanel'
import TechnicalDetails from './TechnicalDetails'
import AttributeTable from './AttributeTable'
import RelationshipsList from './RelationshipsList'
import DocDeclarations from './DocDeclarations'
import CommentAnnotation from './CommentAnnotation'
import TypeInfo from './TypeInfo'
import './DocumentationView.css'

// Fallback: Einfacher Parser für SysML v2 Code → Documentation
// (wird nur verwendet, wenn WASM nicht verfügbar ist)
const parseSysMLToDocumentation = (code) => {
  const chapters = []
  const lines = code.split('\n')
  
  let currentPackage = null
  let currentPart = null
  let currentRequirement = null
  let inDocComment = false
  let docComment = ''
  let docDeclarations = [] // Track multiple doc declarations for current element
  let currentDocName = null // Track current doc declaration name
  let currentDocContent = '' // Track current doc declaration content
  let inDocDeclaration = false // Track if we're in a doc declaration
  let braceDepth = 0 // Track brace depth to know when we're inside an element body
  let elementDocDeclarations = [] // Track doc declarations for the current element (inside body)
  
  lines.forEach((line, index) => {
    const trimmed = line.trim()
    
    // Package detection
    if (trimmed.startsWith("package '")) {
      const match = trimmed.match(/package '([^']+)'/)
      if (match) {
        if (currentPackage) {
          chapters.push(currentPackage)
        }
        // Finalize any pending doc declarations
        if (currentDocContent.trim()) {
          docDeclarations.push([currentDocName, currentDocContent.trim()])
        }
        currentPackage = {
          title: match[1],
          kind: '[Package]',
          doc_comment: docComment.trim() || undefined,
          doc_declarations: docDeclarations.length > 0 ? docDeclarations : (docComment ? [[null, docComment.trim()]] : undefined),
          imports: [],
          subchapters: [],
          metadata: {
            subchapter_count: 0,
            has_doc: !!docComment || docDeclarations.length > 0,
            import_count: 0,
          },
          range: { start: index, end: index },
          file_uri: 'editor://current',
          diagrams: [],
        }
        docComment = ''
        docDeclarations = []
        currentDocName = null
        currentDocContent = ''
        inDocComment = false
        inDocDeclaration = false
      }
    }
    
    // Import detection: "import Package::*;" or "private import Package::*;" or "public import Package::*;"
    // Also handles file imports: "import 'file.adl';"
    // Process imports first and skip other processing for this line
    let isImportLine = false
    if (currentPackage && /^\s*(?:private|public)?\s*import\s+/i.test(trimmed)) {
      // Match import statement
      // Pattern: [private|public] import <target> [as alias];
      const importMatch = trimmed.match(/^\s*(private|public)?\s*import\s+(.+?)(?:\s+as\s+(\w+))?\s*;?$/i)
      if (importMatch) {
        isImportLine = true
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
        
        // Check if it's a wildcard import
        const isWildcard = target.endsWith('::*') || target.endsWith('::**')
        
        // Determine if it's a standard library import
        const firstPart = target.split('::')[0]
        const isStandard = ['ScalarValues', 'Quantities', 'ISQ', 'SI', 'Shapes', 'Parts', 
                           'Items', 'Actions', 'States', 'Requirements', 'Analysis', 
                           'Verification', 'Views', 'Metadata'].includes(firstPart)
        
        const importVisibility = isStandard ? 'Standard' : (visibility === 'public' ? 'Public' : 'Private')
        
        currentPackage.imports.push({
          text: trimmed,
          target_package: target,
          target_file: isStandard ? `std::${target}` : null,
          visibility: importVisibility,
          is_wildcard: isWildcard,
          alias: alias || null
        })
        currentPackage.metadata.import_count = currentPackage.imports.length
      }
    }
    
    // Track brace depth (needed for all lines) - do this BEFORE doc declaration detection
    const openBraces = (trimmed.match(/\{/g) || []).length
    const closeBraces = (trimmed.match(/\}/g) || []).length
    braceDepth += openBraces - closeBraces
    
    // When we close an element (braceDepth goes back to previous level), finalize its doc declarations
    if (closeBraces > 0 && (currentPart || currentRequirement)) {
      // Finalize any pending doc declaration
      if (inDocDeclaration && currentDocContent.trim()) {
        elementDocDeclarations.push([currentDocName, currentDocContent.trim()])
        currentDocName = null
        currentDocContent = ''
        inDocDeclaration = false
      }
      // Attach collected doc declarations to the element
      const element = currentPart || currentRequirement
      if (element && elementDocDeclarations.length > 0) {
        // Merge with any existing doc_declarations
        if (!element.doc_declarations) {
          element.doc_declarations = []
        }
        element.doc_declarations.push(...elementDocDeclarations)
        element.metadata.has_doc = true
      }
      // Reset for next element
      elementDocDeclarations = []
    }
    
    // Doc declaration detection: "doc [Name] /* ... */" or "doc /* ... */"
    // Skip doc declaration processing for import lines to avoid conflicts
    if (!isImportLine) {
      const docNamedMatch = trimmed.match(/^\s*doc\s+(\w+)\s*\/\*/) // Named: "doc Tip /*"
      const docAnonymousMatch = !docNamedMatch && trimmed.match(/^\s*doc\s*\/\*/) // Anonymous: "doc /*"
      
      if (docNamedMatch || docAnonymousMatch) {
        // Determine which array to use: elementDocDeclarations if inside element body, otherwise docDeclarations
        const targetArray = ((currentPart || currentRequirement) && braceDepth > 0) ? elementDocDeclarations : docDeclarations
        
        // Finalize previous doc declaration if any (before starting a new one)
        if (inDocDeclaration && currentDocContent.trim()) {
          targetArray.push([currentDocName, currentDocContent.trim()])
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
          targetArray.push([currentDocName, currentDocContent.trim()])
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
      // Determine which array to use
      const targetArray = ((currentPart || currentRequirement) && braceDepth > 0) ? elementDocDeclarations : docDeclarations
      
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
        targetArray.push([currentDocName, currentDocContent.trim()])
        currentDocName = null
        currentDocContent = ''
      } else {
        // Middle of doc declaration
        currentDocContent += line.replace(/^\s*\*\s?/, '').trim() + '\n'
      }
    } else {
      // Legacy doc comment detection (for backward compatibility)
      if (trimmed.includes('doc /*')) {
        inDocComment = true
        docComment = ''
      } else if (inDocComment && trimmed.includes('*/')) {
        inDocComment = false
      } else if (inDocComment) {
        docComment += line.replace(/^\s*\*\s?/, '') + '\n'
      }
    }
    } // End of if (!isImportLine) block
    
    // Requirement Definition detection
    if (trimmed.startsWith('requirement def ')) {
      // Match: requirement def <'ID'> 'Name' or requirement def 'Name'
      const match = trimmed.match(/requirement def\s+(?:<'([^']+)'>\s+)?'([^']+)'/)
      if (match && currentPackage) {
        // Finalize any pending doc declarations for the requirement (before the requirement def line)
        if (inDocDeclaration && currentDocContent.trim()) {
          docDeclarations.push([currentDocName, currentDocContent.trim()])
          currentDocName = null
          currentDocContent = ''
          inDocDeclaration = false
        }
        // Copy doc declarations that appeared before this requirement definition
        const reqDocDeclarations = [...docDeclarations]
        // Only use docComment if there are no doc declarations (they're mutually exclusive)
        if (docComment.trim() && reqDocDeclarations.length === 0) {
          reqDocDeclarations.push([null, docComment.trim()])
        }
        const reqId = match[1] || undefined
        const reqName = match[2]
        currentRequirement = {
          title: reqName,
          kind: '[RequirementDefinition]',
          doc_comment: reqDocDeclarations.length === 0 ? (docComment.trim() || undefined) : undefined,
          doc_declarations: reqDocDeclarations.length > 0 ? reqDocDeclarations : undefined,
          stable_id: reqId || `def-${reqName.toLowerCase()}`,
          signature: trimmed,
          body: '',
          relationships: [],
          diagrams: [],
          nested_elements: [],
          metadata: {
            has_doc: !!docComment || reqDocDeclarations.length > 0,
            nested_count: 0,
            relationship_count: 0,
          },
          range: { start: index, end: index },
          file_uri: 'editor://current',
        }
        docComment = ''
        docDeclarations = []
        currentDocName = null
        currentDocContent = ''
        inDocComment = false
        inDocDeclaration = false
      }
    }
    
    // Requirement Usage detection (with or without ID)
    if (trimmed.startsWith('requirement ') && !trimmed.startsWith('requirement def ')) {
      // Match: requirement <'ID'> 'Name' : Type or requirement 'Name' : Type
      const match = trimmed.match(/requirement\s+(?:<'([^']+)'>\s+)?'([^']+)'\s*:\s*(\w+)/)
      if (match && currentPackage) {
        // Finalize any pending doc declarations for the requirement (before the requirement line)
        if (inDocDeclaration && currentDocContent.trim()) {
          docDeclarations.push([currentDocName, currentDocContent.trim()])
          currentDocName = null
          currentDocContent = ''
          inDocDeclaration = false
        }
        // Copy doc declarations that appeared before this requirement usage
        const reqDocDeclarations = [...docDeclarations]
        // Only use docComment if there are no doc declarations (they're mutually exclusive)
        if (docComment.trim() && reqDocDeclarations.length === 0) {
          reqDocDeclarations.push([null, docComment.trim()])
        }
        const reqId = match[1] || match[2] // Use ID if present, otherwise use name as ID
        const reqName = match[2]
        const reqType = match[3]
        currentRequirement = {
          title: reqName,
          kind: '[RequirementUsage]',
          doc_comment: reqDocDeclarations.length === 0 ? (docComment.trim() || undefined) : undefined,
          doc_declarations: reqDocDeclarations.length > 0 ? reqDocDeclarations : undefined,
          stable_id: reqId || `req-${reqName.toLowerCase()}`,
          signature: trimmed,
          body: '',
          type_name: reqType,
          relationships: [],
          diagrams: [],
          nested_elements: [],
          metadata: {
            has_doc: !!docComment || reqDocDeclarations.length > 0,
            nested_count: 0,
            relationship_count: 0,
          },
          range: { start: index, end: index },
          file_uri: 'editor://current',
        }
        docComment = ''
        docDeclarations = []
        currentDocName = null
        currentDocContent = ''
        inDocComment = false
        inDocDeclaration = false
      }
    }
    
    // Part detection
    if (trimmed.startsWith('part def ')) {
      const match = trimmed.match(/part def (\w+)/)
      if (match && currentPackage) {
        // Finalize any pending doc declarations that appeared before this part definition
        if (inDocDeclaration && currentDocContent.trim()) {
          docDeclarations.push([currentDocName, currentDocContent.trim()])
          currentDocName = null
          currentDocContent = ''
          inDocDeclaration = false
        }
        // Copy doc declarations that appeared before this part definition
        const partDocDeclarations = [...docDeclarations]
        // Only use docComment if there are no doc declarations (they're mutually exclusive)
        if (docComment.trim() && partDocDeclarations.length === 0) {
          partDocDeclarations.push([null, docComment.trim()])
        }
        currentPart = {
          title: match[1],
          kind: '[PartDefinition]',
          doc_comment: partDocDeclarations.length === 0 ? (docComment.trim() || undefined) : undefined,
          doc_declarations: partDocDeclarations.length > 0 ? partDocDeclarations : undefined,
          stable_id: `def-${match[1].toLowerCase()}`,
          signature: trimmed,
          body: '',
          relationships: [],
          diagrams: [],
          nested_elements: [],
          metadata: {
            has_doc: !!docComment || partDocDeclarations.length > 0,
            nested_count: 0,
            relationship_count: 0,
          },
          range: { start: index, end: index },
          file_uri: 'editor://current',
        }
        // Reset for collecting doc declarations inside this part body
        docComment = ''
        docDeclarations = []
        elementDocDeclarations = []
        currentDocName = null
        currentDocContent = ''
        inDocComment = false
        inDocDeclaration = false
      }
    }
    
    // If we're inside an element body (braceDepth > 0 for current element), collect doc declarations there
    if ((currentPart || currentRequirement) && braceDepth > 0) {
      // Doc declarations inside element body should go to elementDocDeclarations
      if (inDocDeclaration && currentDocContent.trim() && trimmed.includes('*/')) {
        // Finalize current doc declaration
        elementDocDeclarations.push([currentDocName, currentDocContent.trim()])
        currentDocName = null
        currentDocContent = ''
        inDocDeclaration = false
      }
    }
    
    // Attribute detection (for parts and requirements)
    if (trimmed.startsWith('attribute ') && (currentPart || currentRequirement)) {
      const currentElement = currentPart || currentRequirement
      const match = trimmed.match(/attribute\s+(\w+)\s*:>\s*([^=\[]+)(\[[^\]]*\])?\s*=?\s*(.*)?/)
      if (match) {
        const attrName = match[1]
        const attrType = match[2].trim()
        const multiplicity = match[3] || ''
        const defaultValue = match[4]?.trim() || undefined
        
        if (currentElement) {
          currentElement.nested_elements.push({
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
          currentElement.metadata.nested_count++
        }
      }
    }
    
    // Nested part detection
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
    
    // Close requirement definition
    if (trimmed === '}' && currentRequirement && currentPackage) {
      currentPackage.subchapters.push(currentRequirement)
      currentPackage.metadata.subchapter_count++
      currentRequirement = null
    }
    
    // Close part definition
    if (trimmed === '}' && currentPart && currentPackage && !currentRequirement) {
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

// Table of Contents Generator
const generateTOC = (documentation) => {
  const nodes = []
  
  documentation.chapters.forEach((chapter, chapterIndex) => {
    const chapterNode = {
      id: `chapter-${chapterIndex}`,
      title: chapter.title,
      level: 1,
      kind: chapter.kind,
      range: chapter.range,
      file_uri: chapter.file_uri,
      children: [],
    }
    
    chapter.subchapters.forEach((subchapter, subIndex) => {
      const subNode = {
        id: `chapter-${chapterIndex}-sub-${subIndex}`,
        title: subchapter.title,
        level: 2,
        kind: subchapter.kind,
        range: subchapter.range,
        file_uri: subchapter.file_uri,
        children: [],
      }
      
      subchapter.nested_elements.forEach((element, elemIndex) => {
        subNode.children.push({
          id: `chapter-${chapterIndex}-sub-${subIndex}-elem-${elemIndex}`,
          title: element.title,
          level: 3,
          kind: element.kind,
          range: element.range,
          file_uri: element.file_uri,
          children: [],
        })
      })
      
      chapterNode.children.push(subNode)
    })
    
    nodes.push(chapterNode)
  })
  
  return nodes
}

// Element Symbol Helper
const getElementSymbol = (kind) => {
  const kindLower = kind.toLowerCase()
  if (kindLower.includes('package')) return '📦'
  if (kindLower.includes('part')) return '🔧'
  if (kindLower.includes('attribute')) return '📊'
  if (kindLower.includes('requirement')) return '✅'
  if (kindLower.includes('interface')) return '🔌'
  return '📄'
}

export default function DocumentationView({ code }) {
  const [selectedTocId, setSelectedTocId] = useState(null)
  const [expandedChapters, setExpandedChapters] = useState(new Set())
  const [expandedElements, setExpandedElements] = useState(new Set())
  const [selectedElement, setSelectedElement] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const { wasm, loading: wasmLoading } = useSysMLWasm()
  
  // Use WASM documentation generator (with fallback)
  // Add refreshKey to force regeneration when refresh button is clicked
  const { documentation: wasmDocumentation, loading: docLoading } = useSysMLDocumentation(code, 'editor://current', refreshKey)
  
  // Fallback to simple parser if WASM not available
  const fallbackDocumentation = useMemo(() => {
    if (!code || code.trim().length === 0) {
      return { chapters: [], file_uri: 'editor://current' }
    }
    return parseSysMLToDocumentation(code)
  }, [code])
  
  // Use WASM documentation if available and WASM is loaded, otherwise fallback
  // WASM documentation should always be preferred when WASM is available, even if empty
  // (empty might mean parsing errors, but we still want to show WASM structure)
  // Only use fallback if WASM is not loaded or still loading
  // Priority: WASM > Loading state > Fallback (only as last resort)
  const documentation = React.useMemo(() => {
    // If WASM is loaded and we have documentation, use it (even if empty - indicates parse errors)
    if (wasm && !wasmLoading && wasmDocumentation && wasmDocumentation.chapters !== undefined) {
      return wasmDocumentation
    }
    // If WASM is still loading, show loading state (don't use fallback yet)
    if (wasmLoading) {
      return { chapters: [], file_uri: 'editor://current', _loading: true }
    }
    // Only use fallback if WASM failed to load completely
    return fallbackDocumentation
  }, [wasm, wasmLoading, wasmDocumentation, fallbackDocumentation])
  
  // Track code changes to trigger updates
  const prevCodeRef = React.useRef(code)
  React.useEffect(() => {
    if (prevCodeRef.current !== code) {
      console.log('📝 [DocumentationView] Code changed, documentation will update...')
      prevCodeRef.current = code
    }
  }, [code])

  // Debug: Log which documentation source is being used
  React.useEffect(() => {
    if (wasm && !wasmLoading) {
      console.log('🔍 [DocumentationView] Using WASM documentation:', wasmDocumentation?.chapters?.length || 0, 'chapters')
    } else if (wasmLoading) {
      console.log('⏳ [DocumentationView] WASM loading, showing loading state...')
    } else {
      console.warn('⚠️ [DocumentationView] Using fallback parser (WASM not available)')
      console.warn('   This is less accurate. Consider fixing WASM loading issues.')
    }
  }, [wasm, wasmLoading, wasmDocumentation])
  
  // Only show enhanced features if WASM is available
  const hasWasm = wasm && !wasmLoading
  const showQualityMetrics = hasWasm
  const showConstraints = hasWasm
  
  const tocNodes = useMemo(() => generateTOC(documentation), [documentation])
  
  // Auto-expand all chapters
  React.useEffect(() => {
    const chapterIds = new Set()
    const elementIds = new Set()
    
    documentation.chapters.forEach((_, chapterIndex) => {
      chapterIds.add(`chapter-${chapterIndex}`)
      documentation.chapters[chapterIndex].subchapters.forEach((_, subIndex) => {
        elementIds.add(`chapter-${chapterIndex}-sub-${subIndex}`)
      })
    })
    
    setExpandedChapters(chapterIds)
    setExpandedElements(elementIds)
  }, [documentation])
  
  const handleTocSelect = (node) => {
    setSelectedTocId(node.id)
    // Scroll to element (simplified)
    const element = document.querySelector(`[data-element-id="${node.id}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
  
  const renderElement = (element, level = 0) => {
    const elementId = `element-${element.title}-${level}`
    const isExpanded = expandedElements.has(elementId)
    
    // Separate attributes from other nested elements
    const attributes = element.nested_elements?.filter(el => el.kind?.includes('Attribute')) || []
    const otherNested = element.nested_elements?.filter(el => !el.kind?.includes('Attribute')) || []
    
    return (
      <div
        key={elementId}
        data-element-id={elementId}
        className={`doc-element doc-element-level-${level}`}
      >
        <div
          className="doc-element-header"
          onClick={() => {
            const newExpanded = new Set(expandedElements)
            if (isExpanded) {
              newExpanded.delete(elementId)
            } else {
              newExpanded.add(elementId)
            }
            setExpandedElements(newExpanded)
          }}
        >
          <span className="doc-element-icon">{getElementSymbol(element.kind)}</span>
          <span className="doc-element-title">{element.title}</span>
          <span className="doc-element-kind">{element.kind}</span>
          {(element.nested_elements?.length > 0 || element.relationships?.length > 0) && (
            <span className="doc-element-toggle">{isExpanded ? '▼' : '▶'}</span>
          )}
        </div>
        
        {/* Doc Declarations */}
        {element.doc_declarations && element.doc_declarations.length > 0 && (
          <div className="doc-element-doc">
            {console.log('🔍 [DocumentationView] Rendering doc_declarations for element:', element.title, 'count:', element.doc_declarations.length, 'declarations:', element.doc_declarations.map(([name, content]) => ({ name, contentPreview: content?.substring(0, 50) })))}
            <DocDeclarations 
              docDeclarations={element.doc_declarations}
              isChapter={false}
            />
          </div>
        )}
        
        {/* Doc Comment (fallback) */}
        {!element.doc_declarations && element.doc_comment && (
          <div className="doc-element-doc">
            <div className="doc-comment">{element.doc_comment}</div>
          </div>
        )}
        
        {/* Comment Annotation */}
        {element.comment_text && (
          <CommentAnnotation 
            commentText={element.comment_text}
            isChapter={false}
          />
        )}
        
        {/* Type Info */}
        <TypeInfo element={element} />
        
        {/* Attributes Table */}
        {isExpanded && attributes.length > 0 && (
          <div className="doc-element-nested">
            <AttributeTable attributes={attributes} />
          </div>
        )}
        
        {/* Signature (simple display) */}
        {element.signature && !isExpanded && (
          <div className="doc-element-signature">
            <code>{element.signature}</code>
          </div>
        )}
        
        {/* Technical Details (expanded view with signature and body) */}
        {isExpanded && (element.signature || element.body) && (
          <div className="doc-element-nested">
            <TechnicalDetails
              signature={element.signature || ''}
              body={element.body || element.signature || ''}
              initialExpanded={true}
            />
          </div>
        )}
        
        {/* Relationships */}
        {isExpanded && element.relationships && element.relationships.length > 0 && (
          <div className="doc-element-nested">
            <RelationshipsList 
              relationships={element.relationships}
              onNavigate={(fileUri) => console.log('Navigate to:', fileUri)}
            />
          </div>
        )}
        
        {/* Other Nested Elements */}
        {isExpanded && otherNested.length > 0 && (
          <div className="doc-element-nested">
            {otherNested.map((nested, index) => 
              renderElement(nested, level + 1)
            )}
          </div>
        )}
      </div>
    )
  }
  
  if (documentation.chapters.length === 0) {
    return (
      <div className="documentation-view">
        <div className="doc-header">
          <h3>Documentation</h3>
          {wasmLoading && <span className="doc-loading">Loading...</span>}
        </div>
        <div className="doc-empty">
          <p>Start typing SysML v2 code in the editor to see documentation here.</p>
        </div>
      </div>
    )
  }
  
  const handleExport = async (format) => {
    console.log(`Exporting documentation as ${format}`)
    
    // Export works with both WASM and fallback documentation
    // Use current documentation (either WASM or fallback)
    try {
      let exportContent = ''
      let mimeType = 'text/plain'
      let extension = 'txt'
      
      switch (format) {
        case 'markdown':
          exportContent = generateMarkdown(documentation)
          mimeType = 'text/markdown'
          extension = 'md'
          break
        case 'html':
          exportContent = generateHTML(documentation)
          mimeType = 'text/html'
          extension = 'html'
          break
        case 'pdf':
          // Generate HTML first, then convert to PDF using browser print
          const htmlContent = generateHTML(documentation)
          const printWindow = window.open('', '_blank')
          printWindow.document.write(htmlContent)
          printWindow.document.close()
          // Wait for content to load, then trigger print
          setTimeout(() => {
            printWindow.print()
          }, 250)
          return
        case 'sphinx':
          // Sphinx export would require RST generation
          exportContent = generateRST(documentation)
          mimeType = 'text/x-rst'
          extension = 'rst'
          break
        default:
          alert(`Export format ${format} not yet implemented`)
          return
      }
      
      // Download the file
      const blob = new Blob([exportContent], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `documentation.${extension}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export failed:', err)
      alert(`Export failed: ${err.message}`)
    }
  }

  // Helper functions for export formats - Enhanced with full element details
  const generateMarkdown = (doc) => {
    let md = '# SysML v2 Documentation\n\n'
    md += `*Generated from: ${doc.file_uri || 'editor://current'}*\n\n`
    md += '---\n\n'
    
    doc.chapters.forEach((chapter, chapterIndex) => {
      md += `## ${chapterIndex + 1}. ${chapter.title}\n\n`
      
      // Chapter documentation
      if (chapter.doc_comment) {
        md += `${chapter.doc_comment}\n\n`
      }
      if (chapter.doc_declarations && chapter.doc_declarations.length > 0) {
        chapter.doc_declarations.forEach(([name, content]) => {
          if (name) md += `**${name}:**\n\n`
          md += `${content}\n\n`
        })
      }
      
      // Chapter imports
      if (chapter.imports && chapter.imports.length > 0) {
        md += '### Imports\n\n'
        chapter.imports.forEach(imp => {
          const visibilityLabel = imp.visibility === 'Public' ? '(public)' : 
                                  imp.visibility === 'Standard' ? '(standard library)' : '(private)'
          const importText = `${imp.target_package}${imp.is_wildcard ? '::*' : ''}${imp.alias ? ` as ${imp.alias}` : ''}`
          md += `- \`${importText}\` ${visibilityLabel}\n`
        })
        md += '\n'
      }
      
      // Subchapters (elements)
      chapter.subchapters.forEach((subchapter, subIndex) => {
        md += `### ${chapterIndex + 1}.${subIndex + 1} ${subchapter.title}\n\n`
        
        // Element kind badge
        md += `*Type: \`${subchapter.kind}\`*\n\n`
        
        // Element documentation
        if (subchapter.doc_comment) {
          md += `${subchapter.doc_comment}\n\n`
        }
        if (subchapter.doc_declarations && subchapter.doc_declarations.length > 0) {
          subchapter.doc_declarations.forEach(([name, content]) => {
            if (name) md += `**${name}:**\n\n`
            md += `${content}\n\n`
          })
        }
        
        // Signature
        if (subchapter.signature) {
          md += '**Signature:**\n\n'
          md += `\`\`\`sysml\n${subchapter.signature}\n\`\`\`\n\n`
        }
        
        // Type information
        if (subchapter.type_name) {
          md += `**Type:** \`${subchapter.type_name}\`${subchapter.multiplicity ? ` ${subchapter.multiplicity}` : ''}\n\n`
        }
        
        // Default value
        if (subchapter.default_value) {
          md += `**Default Value:** \`${subchapter.default_value}\`\n\n`
        }
        
        // Attributes table
        const attributes = subchapter.nested_elements?.filter(el => el.kind?.includes('Attribute')) || []
        if (attributes.length > 0) {
          md += '#### Attributes\n\n'
          md += '| Name | Type | Value | Redefines |\n'
          md += '|------|------|-------|----------|\n'
          attributes.forEach(attr => {
            const type = attr.type_name || '—'
            const value = attr.default_value || '—'
            const redefines = attr.signature?.includes(':>>') ? attr.title : '—'
            md += `| ${attr.title} | \`${type}\` | ${value} | ${redefines} |\n`
          })
          md += '\n'
        }
        
        // Relationships
        if (subchapter.relationships && subchapter.relationships.length > 0) {
          md += '#### Relationships\n\n'
          subchapter.relationships.forEach(rel => {
            const symbol = rel.kind?.includes('specializ') ? ':>' : 
                          rel.kind?.includes('redefin') ? ':>>' : '→'
            md += `- ${symbol} **${rel.kind}** → \`${rel.target_name || rel.target || rel.target_package || 'Unknown'}\`\n`
          })
          md += '\n'
        }
        
        // Nested elements (non-attributes)
        const nested = subchapter.nested_elements?.filter(el => !el.kind?.includes('Attribute')) || []
        if (nested.length > 0) {
          md += '#### Nested Elements\n\n'
          nested.forEach(nestedEl => {
            md += `- **${nestedEl.title}** (\`${nestedEl.kind}\`)\n`
            if (nestedEl.type_name) {
              md += `  - Type: \`${nestedEl.type_name}\`\n`
            }
            if (nestedEl.doc_comment) {
              md += `  - ${nestedEl.doc_comment.substring(0, 100)}${nestedEl.doc_comment.length > 100 ? '...' : ''}\n`
            }
          })
          md += '\n'
        }
        
        // Body/Definition
        if (subchapter.body) {
          md += '#### Definition\n\n'
          md += `\`\`\`sysml\n${subchapter.body}\n\`\`\`\n\n`
        }
        
        md += '---\n\n'
      })
    })
    
    md += '\n*End of Documentation*\n'
    return md
  }

  const generateHTML = (doc) => {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SysML v2 Documentation</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .header {
      border-bottom: 3px solid #00ccff;
      padding-bottom: 1rem;
      margin-bottom: 2rem;
    }
    h1 { color: #00ccff; font-size: 2.5rem; margin-bottom: 0.5rem; }
    h2 { color: #00ccff; font-size: 2rem; margin-top: 3rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e0e0e0; }
    h3 { color: #555; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; }
    h4 { color: #777; font-size: 1.2rem; margin-top: 1.5rem; margin-bottom: 0.75rem; }
    .meta { color: #666; font-size: 0.9rem; font-style: italic; }
    .element-card {
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-left: 4px solid #00ccff;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 1.5rem 0;
    }
    .element-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .element-kind {
      background: #00ccff;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .doc-comment {
      background: #f0f8ff;
      border-left: 3px solid #00ccff;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 4px;
      white-space: pre-wrap;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.9em;
    }
    pre {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
      margin: 1rem 0;
    }
    pre code {
      background: transparent;
      padding: 0;
      color: #d4d4d4;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    th {
      background: #00ccff;
      color: white;
      padding: 0.75rem;
      text-align: left;
      font-weight: 600;
    }
    td {
      padding: 0.75rem;
      border-bottom: 1px solid #e0e0e0;
    }
    tr:hover {
      background: #f5f5f5;
    }
    .relationship-list {
      list-style: none;
      padding: 0;
    }
    .relationship-item {
      padding: 0.5rem;
      margin: 0.5rem 0;
      background: #f9f9f9;
      border-left: 3px solid #00ccff;
      border-radius: 4px;
    }
    .relationship-symbol {
      font-weight: bold;
      color: #00ccff;
      margin-right: 0.5rem;
    }
    .footer {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 2px solid #e0e0e0;
      text-align: center;
      color: #666;
      font-size: 0.9rem;
    }
    @media print {
      body { max-width: 100%; }
      .element-card { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>SysML v2 Documentation</h1>
    <p class="meta">Generated from: ${doc.file_uri || 'editor://current'}</p>
    <p class="meta">Generated on: ${new Date().toLocaleString()}</p>
  </div>
`
    
    doc.chapters.forEach((chapter, chapterIndex) => {
      html += `  <section class="chapter">
    <h2>${chapterIndex + 1}. ${chapter.title}</h2>\n`
      
      if (chapter.doc_comment) {
        html += `    <div class="doc-comment">${chapter.doc_comment.replace(/\n/g, '<br>')}</div>\n`
      }
      
      if (chapter.doc_declarations && chapter.doc_declarations.length > 0) {
        chapter.doc_declarations.forEach(([name, content]) => {
          html += `    <div class="doc-comment">
      ${name ? `<strong>${name}:</strong><br>` : ''}
      ${content.replace(/\n/g, '<br>')}
    </div>\n`
        })
      }
      
      if (chapter.imports && chapter.imports.length > 0) {
        html += `    <h4>Imports</h4>
    <ul>\n`
        chapter.imports.forEach(imp => {
          const visibilityLabel = imp.visibility === 'Public' ? '<span style="color: green;">(public)</span>' : 
                                  imp.visibility === 'Standard' ? '<span style="color: blue;">(standard library)</span>' : 
                                  '<span style="color: orange;">(private)</span>'
          const importText = `${imp.target_package}${imp.is_wildcard ? '::*' : ''}${imp.alias ? ` as ${imp.alias}` : ''}`
          html += `      <li><code>${importText}</code> ${visibilityLabel}</li>\n`
        })
        html += `    </ul>\n`
      }
      
      chapter.subchapters.forEach((subchapter, subIndex) => {
        html += `    <div class="element-card">
      <div class="element-header">
        <h3>${chapterIndex + 1}.${subIndex + 1} ${subchapter.title}</h3>
        <span class="element-kind">${subchapter.kind}</span>
      </div>\n`
        
        if (subchapter.doc_comment) {
          html += `      <div class="doc-comment">${subchapter.doc_comment.replace(/\n/g, '<br>')}</div>\n`
        }
        
        if (subchapter.doc_declarations && subchapter.doc_declarations.length > 0) {
          subchapter.doc_declarations.forEach(([name, content]) => {
            html += `      <div class="doc-comment">
        ${name ? `<strong>${name}:</strong><br>` : ''}
        ${content.replace(/\n/g, '<br>')}
      </div>\n`
          })
        }
        
        if (subchapter.signature) {
          html += `      <h4>Signature</h4>
      <pre><code>${subchapter.signature}</code></pre>\n`
        }
        
        if (subchapter.type_name) {
          html += `      <p><strong>Type:</strong> <code>${subchapter.type_name}</code>${subchapter.multiplicity ? ` <code>${subchapter.multiplicity}</code>` : ''}</p>\n`
        }
        
        if (subchapter.default_value) {
          html += `      <p><strong>Default Value:</strong> <code>${subchapter.default_value}</code></p>\n`
        }
        
        const attributes = subchapter.nested_elements?.filter(el => el.kind?.includes('Attribute')) || []
        if (attributes.length > 0) {
          html += `      <h4>Attributes</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Value</th>
            <th>Redefines</th>
          </tr>
        </thead>
        <tbody>\n`
          attributes.forEach(attr => {
            const type = attr.type_name || '—'
            const value = attr.default_value || '—'
            const redefines = attr.signature?.includes(':>>') ? attr.title : '—'
            html += `          <tr>
            <td><code>${attr.title}</code>${attr.is_inherited ? ' <span style="color: #666;">(inherited)</span>' : ''}</td>
            <td><code>${type}</code></td>
            <td>${value !== '—' ? `<code>${value}</code>` : '—'}</td>
            <td>${redefines !== '—' ? `<code>${redefines}</code>` : '—'}</td>
          </tr>\n`
          })
          html += `        </tbody>
      </table>\n`
        }
        
        if (subchapter.relationships && subchapter.relationships.length > 0) {
          html += `      <h4>Relationships</h4>
      <ul class="relationship-list">\n`
          subchapter.relationships.forEach(rel => {
            const symbol = rel.kind?.includes('specializ') ? ':>' : 
                          rel.kind?.includes('redefin') ? ':>>' : '→'
            html += `        <li class="relationship-item">
          <span class="relationship-symbol">${symbol}</span>
          <strong>${rel.kind}</strong> → <code>${rel.target_name || rel.target || rel.target_package || 'Unknown'}</code>
        </li>\n`
          })
          html += `      </ul>\n`
        }
        
        if (subchapter.body) {
          html += `      <h4>Definition</h4>
      <pre><code>${subchapter.body}</code></pre>\n`
        }
        
        html += `    </div>\n`
      })
      
      html += `  </section>\n\n`
    })
    
    html += `  <div class="footer">
    <p>End of Documentation</p>
    <p>Generated by SysML v2 Language Server</p>
  </div>
</body>
</html>`
    return html
  }

  const generateRST = (doc) => {
    let rst = 'Documentation\n=============\n\n'
    doc.chapters.forEach(chapter => {
      rst += `${chapter.title}\n${'='.repeat(chapter.title.length)}\n\n`
      if (chapter.doc_comment) {
        rst += `${chapter.doc_comment}\n\n`
      }
      chapter.subchapters.forEach(subchapter => {
        rst += `${subchapter.title}\n${'-'.repeat(subchapter.title.length)}\n\n`
        if (subchapter.doc_comment) {
          rst += `${subchapter.doc_comment}\n\n`
        }
        if (subchapter.signature) {
          rst += `.. code-block:: sysml\n\n   ${subchapter.signature.replace(/\n/g, '\n   ')}\n\n`
        }
      })
    })
    return rst
  }

  const fileUri = documentation.file_uri || 'editor://current'

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
    console.log('🔄 Refreshing documentation view...')
  }

  return (
    <div className="documentation-view">
      <div className="doc-header">
        <div className="flex items-center justify-between">
          <h3>Documentation</h3>
          <div className="flex items-center gap-2">
            {(docLoading || wasmLoading) && (
              <span className="doc-loading-indicator">
                <span className="spinner" style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  border: '2px solid #f3f3f3',
                  borderTop: '2px solid #00ccff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></span>
                Updating...
              </span>
            )}
            <button
              onClick={handleRefresh}
              className="doc-refresh-button"
              title="Refresh documentation view"
              disabled={docLoading || wasmLoading}
            >
              <span style={{ fontSize: '1rem' }}>🔄</span>
              {docLoading ? 'Loading...' : 'Refresh'}
            </button>
            <ExportMenu onExport={handleExport} />
          </div>
        </div>
      </div>
      
      <div className="doc-layout">
        <aside className="doc-toc">
          <h4>Model Tree</h4>
          <nav className="doc-toc-nav">
            {tocNodes.map((node) => (
              <div key={node.id} className="doc-toc-item">
                <button
                  className={`doc-toc-link ${selectedTocId === node.id ? 'active' : ''}`}
                  onClick={() => handleTocSelect(node)}
                >
                  <span className="doc-toc-icon">{getElementSymbol(node.kind)}</span>
                  <span className="doc-toc-title">{node.title}</span>
                </button>
                {node.children && node.children.length > 0 && (
                  <div className="doc-toc-children">
                    {node.children.map((child) => (
                      <button
                        key={child.id}
                        className={`doc-toc-link doc-toc-link-level-2 ${selectedTocId === child.id ? 'active' : ''}`}
                        onClick={() => handleTocSelect(child)}
                      >
                        <span className="doc-toc-icon">{getElementSymbol(child.kind)}</span>
                        <span className="doc-toc-title">{child.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Quality Metrics Panel - only if WASM available */}
          {showQualityMetrics && hasWasm && code && (
            <div className="doc-toc-section mt-4 pt-4 border-t border-gray-300">
              <QualityIndicator fileUri={fileUri} sourceCode={code} compact={false} />
            </div>
          )}

          {/* Import Management Panel - show imports for all chapters */}
          {documentation.chapters.length > 0 && documentation.chapters.some(ch => ch.imports && ch.imports.length > 0) && (
            <div className="doc-toc-section mt-4 pt-4 border-t border-gray-300">
              {documentation.chapters.map((chapter, idx) => 
                chapter.imports && chapter.imports.length > 0 ? (
                  <div key={idx} className={idx > 0 ? "mt-4" : ""}>
                    {documentation.chapters.length > 1 && (
                      <div className="text-xs text-gray-500 mb-2 px-2">
                        {chapter.title}
                      </div>
                    )}
                    <ImportManagerPanel
                      imports={chapter.imports}
                      fileUri={fileUri}
                      editModeEnabled={false}
                    />
                  </div>
                ) : null
              )}
            </div>
          )}
        </aside>
        
        <main className="doc-content">
          {/* Quality Metrics at top - only if WASM available */}
          {showQualityMetrics && hasWasm && code && (
            <div className="mb-4">
              <QualityIndicator fileUri={fileUri} sourceCode={code} compact={false} />
            </div>
          )}

          {documentation.chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="doc-chapter">
              <div className="flex items-center justify-between mb-2">
                <h2 className="doc-chapter-title">
                  <span className="doc-chapter-icon">{getElementSymbol(chapter.kind)}</span>
                  {chapter.title}
                </h2>
                {chapter.imports && chapter.imports.length > 0 && (
                  <div className="text-xs text-gray-500">
                    {chapter.imports.length} import{chapter.imports.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
              
              {/* Chapter Doc Declarations */}
              {chapter.doc_declarations && chapter.doc_declarations.length > 0 && (
                <div className="doc-chapter-doc">
                  <DocDeclarations 
                    docDeclarations={chapter.doc_declarations}
                    isChapter={true}
                  />
                </div>
              )}
              
              {/* Chapter Doc Comment (fallback) */}
              {!chapter.doc_declarations && chapter.doc_comment && (
                <div className="doc-chapter-doc">
                  <div className="doc-comment">{chapter.doc_comment}</div>
                </div>
              )}
              
              {/* Chapter Comment Annotation */}
              {chapter.comment_text && (
                <CommentAnnotation 
                  commentText={chapter.comment_text}
                  isChapter={true}
                />
              )}
              
              {/* Chapter Imports */}
              {chapter.imports && chapter.imports.length > 0 && (
                <div className="doc-chapter-imports mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Imports</h4>
                  <div className="flex flex-wrap gap-2">
                    {chapter.imports.map((imp, idx) => {
                      const visibilityIcon = imp.visibility === 'Public' ? '🔓' : 
                                            imp.visibility === 'Standard' ? '📚' : '🔒'
                      const visibilityLabel = imp.visibility === 'Public' ? 'public' : 
                                            imp.visibility === 'Standard' ? 'standard' : 'private'
                      return (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono flex items-center gap-1"
                          title={`${imp.target_package} (${visibilityLabel})${imp.is_wildcard ? ' - wildcard' : ''}${imp.alias ? ` as ${imp.alias}` : ''}`}
                        >
                          {imp.target_package}
                          {imp.is_wildcard && '::*'}
                          {imp.alias && ` as ${imp.alias}`}
                          <span className="ml-1">{visibilityIcon}</span>
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Constraints for chapter */}
              {showConstraints && hasWasm && code && (
                <div className="mb-4">
                  <ConstraintDisplay fileUri={fileUri} sourceCode={code} compact={false} />
                </div>
              )}
              
              {chapter.subchapters.map((subchapter, subIndex) => (
                <div key={subIndex} className="doc-subchapter">
                  {renderElement(subchapter, 0)}
                  
                  {/* Element Detail Panel - show constraints and quality for selected element - only if WASM available */}
                  {selectedElement === subchapter && showConstraints && hasWasm && code && (
                    <div className="mt-2 ml-4">
                      <ConstraintDisplay 
                        fileUri={fileUri} 
                        elementId={subchapter.stable_id}
                        sourceCode={code}
                        compact={false} 
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </main>
      </div>
    </div>
  )
}
