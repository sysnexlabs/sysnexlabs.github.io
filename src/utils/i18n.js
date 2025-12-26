// Simple i18n utility for React components
// Uses the same translations as the static i18n.js file

import { useState, useEffect } from 'react'

let currentLang = 'en'
let listeners = []

// Fallback translations for critical navigation items and hero content
const fallbackTranslations = {
  en: {
    'nav.home': 'Home',
    'nav.product': 'Product',
    'nav.product.overview': 'Overview',
    'nav.pricing': 'Pricing',
    'nav.consulting': 'Consulting',
    'nav.methods': 'Methods',
    'nav.process': 'Process',
    'nav.tools': 'Tools',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.try-yourself': 'Try Yourself',
    'hero.kicker': 'Enterprise SysML v2 Tooling',
    'hero.headline': 'Syscribe: SysML v2 Platform for Modern Systems Engineering',
    'hero.paragraph': 'Syscribe delivers production-ready SysML v2 Language Server technology with VS Code integration, AI assistance, and compliance variants. Built for OEM/Tier-1 teams who demand performance, reliability, and regulatory compliance.',
    'hero.cta.primary': 'Get Started',
    'hero.cta.secondary': 'View Features',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.product': 'Produkt',
    'nav.product.overview': 'Übersicht',
    'nav.pricing': 'Preise',
    'nav.consulting': 'Beratung',
    'nav.methods': 'Methoden',
    'nav.process': 'Prozesse',
    'nav.tools': 'Werkzeuge',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.try-yourself': 'Selbst testen',
    'hero.kicker': 'Enterprise SysML v2 Tooling',
    'hero.headline': 'Syscribe: SysML v2 Plattform für moderne Systems Engineering',
    'hero.paragraph': 'Syscribe bietet produktionsreife SysML v2 Language Server Technologie mit VS Code Integration, KI-Unterstützung und Compliance-Varianten. Entwickelt für OEM/Tier-1 Teams, die Performance, Zuverlässigkeit und regulatorische Compliance fordern.',
    'hero.cta.primary': 'Kostenlos starten',
    'hero.cta.secondary': 'Features ansehen',
  }
}

// Load translations from the global i18n.js file
const getTranslations = () => {
  if (typeof window !== 'undefined' && window.translations) {
    return window.translations[currentLang] || window.translations.en || {}
  }
  // Use fallback translations if window.translations not loaded yet
  return fallbackTranslations[currentLang] || fallbackTranslations.en || {}
}

export const setLanguage = (lang) => {
  currentLang = lang
  if (typeof window !== 'undefined' && window.setLanguage) {
    window.setLanguage(lang)
  }
  // Notify all listeners
  listeners.forEach(listener => listener(lang))
}

export const getLanguage = () => {
  if (typeof window !== 'undefined' && window.getLanguage) {
    return window.getLanguage()
  }
  return currentLang
}

// Note: This standalone t function is kept for backwards compatibility
// but components should use useTranslation hook to get reactive translations
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
  // Final fallback - return key or a readable version
  const parts = key.split('.')
  return parts[parts.length - 1] || key
}

// React hook for translations
export const useTranslation = () => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem('sysnex-lang') || 'en'
        currentLang = savedLang
        return savedLang
      } catch (e) {
        return 'en'
      }
    }
    return 'en'
  })

  // Create a memoized t function that depends on lang
  const t = (key) => {
    const translations = getTranslations()
    if (translations && translations[key]) {
      return translations[key]
    }
    // Try fallback translations
    const fallback = fallbackTranslations[currentLang] || fallbackTranslations.en
    if (fallback && fallback[key]) {
      return fallback[key]
    }
    // Final fallback - return key or a readable version
    const parts = key.split('.')
    return parts[parts.length - 1] || key
  }

  useEffect(() => {
    // Update currentLang to match state
    currentLang = lang
    
    // Listen for language changes from localStorage or events
    const handleLanguageChange = () => {
      if (typeof window !== 'undefined') {
        try {
          const newLang = localStorage.getItem('sysnex-lang') || 'en'
          if (newLang !== lang) {
            currentLang = newLang
            setLang(newLang)
          }
        } catch (e) {
          // Ignore
        }
      }
    }
    
    // Add listener for programmatic changes
    const listener = (newLang) => {
      if (newLang !== lang) {
        currentLang = newLang
        setLang(newLang)
      }
    }
    listeners.push(listener)
    
    // Listen to custom events (from static i18n or Header)
    window.addEventListener('languagechange', handleLanguageChange)
    
    // Also listen to storage events (for cross-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === 'sysnex-lang') {
        const newLang = e.newValue || 'en'
        if (newLang !== lang) {
          currentLang = newLang
          setLang(newLang)
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      listeners = listeners.filter(l => l !== listener)
      window.removeEventListener('languagechange', handleLanguageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [lang])

  return { t, lang }
}

// Initialize from localStorage or default to 'en'
if (typeof window !== 'undefined') {
  try {
    const savedLang = localStorage.getItem('sysnex-lang') || 'en'
    currentLang = savedLang
    
    // Listen for language changes from static i18n
    window.addEventListener('languagechange', () => {
      const newLang = localStorage.getItem('sysnex-lang') || 'en'
      if (newLang !== currentLang) {
        currentLang = newLang
        listeners.forEach(listener => listener(newLang))
      }
    })
  } catch (e) {
    // localStorage might not be available
    currentLang = 'en'
  }
}

