import React, { useState, useEffect } from 'react'
import UvlEditor, { DEFAULT_UVL_EXAMPLE } from '../UvlEditor/UvlEditor'
import FeatureDiagram from '../FeatureDiagram/FeatureDiagram'
import { useUvlWasm } from '../../hooks/useUvlWasm'
import '../../pages/Page.css'
import './UvlSection.css'

export default function UvlSection() {
  const [uvlCode, setUvlCode] = useState(DEFAULT_UVL_EXAMPLE)
  const [featureTree, setFeatureTree] = useState(null)
  const [currentConfiguration, setCurrentConfiguration] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { wasm, parseUvl } = useUvlWasm()

  // Parse UVL code when it changes
  useEffect(() => {
    // Early return if no code
    if (!uvlCode) {
      setFeatureTree(null)
      setError(null)
      setLoading(false)
      return
    }

    // Only try to parse if wasm is available AND has parse_uvl function
    const hasUvlSupport = wasm && typeof wasm.parse_uvl === 'function'

    if (!hasUvlSupport) {
      // WASM not available or UVL support not built yet
      setFeatureTree(null)
      setError(null)
      setLoading(false)
      return
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true)
      setError(null)

      try {
        
        console.log('[UvlSection] 📝 Calling parseUvl with code:', uvlCode.substring(0, 100))
        const result = await parseUvl(uvlCode)
        console.log('[UvlSection] ✅ parseUvl returned:', result)
        console.log('[UvlSection] 🔍 Result type:', typeof result, 'has root:', result?.root ? 'yes' : 'no')

        if (result) {
          // Check if result has the expected structure
          if (result.root) {
            console.log('[UvlSection] ✅ Setting featureTree with root:', result.root)
            console.log('[UvlSection] 🌳 Root structure:', {
              id: result.root.id,
              name: result.root.name,
              hasChildren: result.root.children ? 'yes' : 'no',
              childrenCount: result.root.children?.length || 0
            })
            setFeatureTree(result)
            setError(null)
          } else {
            console.warn('[UvlSection] ⚠️ Result missing root property:', result)
            setFeatureTree(null)
            setError('Invalid feature tree structure')
          }
        } else {
          // Parsing returned null - don't show error, just show empty diagram
          console.log('[UvlSection] ⚠️ parseUvl returned null')
          setFeatureTree(null)
          setError(null)
        }
      } catch (err) {
        // Log errors for debugging
        console.error('[UvlSection] Error in useEffect:', err)
        setFeatureTree(null)
        setError(err.message || 'Failed to parse UVL')
      } finally {
        setLoading(false)
      }
    }, 500) // Debounce parsing

    return () => clearTimeout(timeoutId)
  }, [uvlCode, wasm, parseUvl])

  const handleFeatureClick = (featureId) => {
    setCurrentConfiguration(prev => {
      const newConfig = { ...prev }
      if (newConfig[featureId] === true) {
        delete newConfig[featureId] // Toggle off
      } else {
        newConfig[featureId] = true // Toggle on
      }
      return newConfig
    })
  }

  return (
    <section className="uvl-section">
      <div className="page-hero-section">
        <div className="container">
          <h1>Try UVL Yourself</h1>
          <p className="page-hero-description">
            Experience UVL (Universal Variability Language) directly in your browser. 
            Write UVL code in the editor and see the feature model diagram update in real-time.
          </p>
          {!wasm && (
            <p className="uvl-section-note" style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.7 }}>
              Note: UVL parsing will be available after the WASM module is built.
            </p>
          )}
        </div>
      </div>

      <div className="page-content-section">
        <div className="container">
        <div className="uvl-section-grid">
          <div className="uvl-editor-column">
            <UvlEditor onCodeChange={setUvlCode} />
            {error && (
              <div className="uvl-error-message">
                <strong>Error:</strong> {error}
              </div>
            )}
            {loading && (
              <div className="uvl-loading-message">
                Parsing UVL...
              </div>
            )}
          </div>
          <div className="uvl-diagram-column">
            <FeatureDiagram
              featureTree={featureTree}
              currentConfiguration={currentConfiguration}
              onFeatureClick={handleFeatureClick}
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

