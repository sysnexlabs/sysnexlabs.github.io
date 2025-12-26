// Simple i18n utility for React components
// Integrates with the global i18n.js translations file

import { useState, useEffect, useMemo } from 'react'

let currentLang = 'en'
let listeners = []

// Minimal fallback translations for critical navigation items
// These are used only if the global translations fail to load
const fallbackTranslations = {
  en: {
    'nav.home': 'Home',
    'nav.product': 'Product',
    'nav.pricing': 'Pricing',
    'nav.consulting': 'Competences',
    'nav.methods': 'Methods',
    'nav.process': 'Process',
    'nav.tools': 'Tools',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.try-yourself': 'Try Yourself',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.product': 'Produkt',
    'nav.pricing': 'Preise',
    'nav.consulting': 'Beratung',
    'nav.methods': 'Methoden',
    'nav.process': 'Prozesse',
    'nav.tools': 'Werkzeuge',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.try-yourself': 'Selbst testen',
  }
}

// Load translations from the global i18n.js file
const getTranslations = () => {
  if (typeof window !== 'undefined') {
    // Check if global translations are available
    if (window.translations && window.translations[currentLang]) {
      return window.translations[currentLang]
    }
    // Fallback to English global translations
    if (window.translations && window.translations.en) {
      return window.translations.en
    }
  }
  // Use fallback translations only as last resort
  return fallbackTranslations[currentLang] || fallbackTranslations.en || {}
}

export const setLanguage = (lang) => {
  currentLang = lang

  // Save to localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('sysnex-lang', lang)
    } catch (e) {
      console.warn('Failed to save language preference:', e)
    }
  }

  // Update global i18n if available
  if (typeof window !== 'undefined' && window.setLanguage) {
    window.setLanguage(lang)
  }

  // Notify all listeners
  listeners.forEach(listener => listener(lang))

  // Dispatch custom event for cross-component communication
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }))
  }
}

export const getLanguage = () => {
  if (typeof window !== 'undefined' && window.getLanguage) {
    return window.getLanguage()
  }
  return currentLang
}

// Standalone translation function (for non-React contexts)
export const t = (key) => {
  const translations = getTranslations()

  if (translations && translations[key]) {
    return translations[key]
  }

  // Try fallback translations
  const fallback = fallbackTranslations[currentLang] || fallbackTranslations.en
  if (fallback && fallback[key]) {
    return fallback[key]
  }

  // Final fallback - return full key to help debugging
  // In development, this makes it obvious what's missing
  console.warn(`[i18n] Missing translation for key: ${key}`)
  return key
}

// React hook for translations with reactive updates
export const useTranslation = () => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        // Try to get from localStorage first
        const savedLang = localStorage.getItem('sysnex-lang')
        if (savedLang && (savedLang === 'en' || savedLang === 'de')) {
          currentLang = savedLang
          return savedLang
        }

        // Try to get from global i18n
        if (window.getLanguage) {
          const globalLang = window.getLanguage()
          currentLang = globalLang
          return globalLang
        }
      } catch (e) {
        console.warn('Failed to load language preference:', e)
      }
    }
    return 'en'
  })

  // Add a render counter to force re-renders when translations load
  const [, forceUpdate] = useState(0)

  // Memoized translation function that updates when lang changes
  const t = useMemo(() => {
    return (key) => {
      const translations = getTranslations()

      if (translations && translations[key]) {
        return translations[key]
      }

      // Try fallback translations
      const fallback = fallbackTranslations[lang] || fallbackTranslations.en
      if (fallback && fallback[key]) {
        return fallback[key]
      }

      // Final fallback - return full key to help debugging
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[i18n] Missing translation for key: ${key}`)
      }
      return key
    }
  }, [lang])

  useEffect(() => {
    // Sync currentLang with component state
    currentLang = lang

    // Force re-render when global translations become available
    const checkTranslationsLoaded = () => {
      if (window.translations && Object.keys(window.translations).length > 0) {
        const translationCount = Object.keys(window.translations[lang] || {}).length
        if (translationCount > 0) {
          console.log(`[i18n] Loaded ${translationCount} translations for language: ${lang}`)
          // Force re-render by updating the counter
          forceUpdate(n => n + 1)
        }
      }
    }

    // Check immediately
    checkTranslationsLoaded()

    // Also check after short delays in case translations load async
    const timeoutId1 = setTimeout(checkTranslationsLoaded, 50)
    const timeoutId2 = setTimeout(checkTranslationsLoaded, 150)

    // Listen for language changes from various sources
    const handleLanguageChange = (event) => {
      const newLang = event?.detail?.lang || localStorage.getItem('sysnex-lang') || 'en'
      if (newLang !== lang && (newLang === 'en' || newLang === 'de')) {
        setLang(newLang)
        currentLang = newLang
      }
    }

    // Add internal listener for programmatic changes
    const internalListener = (newLang) => {
      if (newLang !== lang && (newLang === 'en' || newLang === 'de')) {
        setLang(newLang)
      }
    }
    listeners.push(internalListener)

    // Listen to custom languagechange events
    window.addEventListener('languagechange', handleLanguageChange)

    // Listen to storage events for cross-tab synchronization
    const handleStorageChange = (e) => {
      if (e.key === 'sysnex-lang' && e.newValue) {
        const newLang = e.newValue
        if (newLang !== lang && (newLang === 'en' || newLang === 'de')) {
          setLang(newLang)
          currentLang = newLang
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)

    // Cleanup
    return () => {
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
      listeners = listeners.filter(l => l !== internalListener)
      window.removeEventListener('languagechange', handleLanguageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  return { t, lang, setLanguage }
}

// Initialize from localStorage on module load
if (typeof window !== 'undefined') {
  try {
    const savedLang = localStorage.getItem('sysnex-lang')
    if (savedLang && (savedLang === 'en' || savedLang === 'de')) {
      currentLang = savedLang
    }
  } catch (e) {
    console.warn('Failed to initialize language:', e)
    currentLang = 'en'
  }
}
