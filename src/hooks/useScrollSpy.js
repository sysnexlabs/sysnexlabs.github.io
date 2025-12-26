import { useState, useEffect, useRef } from 'react'

/**
 * Hook for scroll spy functionality
 * Tracks which section is currently visible in the viewport
 */
export function useScrollSpy(sections, options = {}) {
  const { offset = 0, rootMargin = '-20% 0px -80% 0px' } = options
  const [activeSection, setActiveSection] = useState(null)
  const observerRef = useRef(null)

  useEffect(() => {
    if (!sections || sections.length === 0) return

    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let maxRatio = 0
        let maxEntry = null

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            maxEntry = entry
          }
        })

        if (maxEntry) {
          const sectionId = maxEntry.target.getAttribute('data-section-id')
          if (sectionId) {
            setActiveSection(sectionId)
          }
        }
      },
      {
        rootMargin,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    observerRef.current = observer

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.querySelector(`[data-section-id="${sectionId}"]`)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [sections, rootMargin])

  return activeSection
}

