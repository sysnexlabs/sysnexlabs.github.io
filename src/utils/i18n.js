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
    'hero.kicker': 'SysML v2 in Production',
    'hero.headline': 'MBSE Platform for Engineering Teams',
    'hero.paragraph': 'Deliver production-ready SysML v2 language tooling, ISO 15288-aligned workflows, and AI-assisted automation. Compliance extensions advance along a transparent roadmap you can track.',
    'hero.cta.primary': 'Get in touch',
    'hero.cta.secondary': 'Learn more',
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
    'hero.kicker': 'SysML v2 in Produktion',
    'hero.headline': 'MBSE-Plattform für Ingenieurteams',
    'hero.paragraph': 'Liefern Sie produktionsreife SysML v2-Sprachtools, ISO-15288-konforme Workflows und KI-gestützte Automatisierung. Compliance-Erweiterungen entwickeln sich entlang einer transparenten Roadmap, die Sie verfolgen können.',
    'hero.cta.primary': 'Kontakt aufnehmen',
    'hero.cta.secondary': 'Mehr erfahren',
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
        return localStorage.getItem('sysnex-lang') || 'en'
      } catch (e) {
        return 'en'
      }
    }
    return 'en'
  })

  useEffect(() => {
    // Update currentLang
    currentLang = lang
    
    // Listen for language changes
    const handleLanguageChange = () => {
      if (typeof window !== 'undefined') {
        try {
          const newLang = localStorage.getItem('sysnex-lang') || 'en'
          if (newLang !== lang) {
            setLang(newLang)
            currentLang = newLang
          }
        } catch (e) {
          // Ignore
        }
      }
    }
    
    // Add listener
    const listener = (newLang) => {
      if (newLang !== lang) {
        setLang(newLang)
      }
    }
    listeners.push(listener)
    
    // Listen to custom events
    window.addEventListener('languagechange', handleLanguageChange)
    
    return () => {
      listeners = listeners.filter(l => l !== listener)
      window.removeEventListener('languagechange', handleLanguageChange)
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

