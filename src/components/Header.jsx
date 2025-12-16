import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { t } from '../utils/i18n'
import ThemeToggle from './ThemeToggle'
import './Header.css'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('home')
  const [lang, setLang] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [consultingOpen, setConsultingOpen] = useState(false)

  useEffect(() => {
    // Determine active page based on current pathname
    const path = location.pathname
    let page = 'home'
    
    if (path === '/' || path === '/index.html' || path === '') {
      page = 'home'
    } else if (path === '/contact' || path === '/contact.html') {
      page = 'contact'
    } else if (path === '/product' || path.includes('/try-yourself')) {
      page = 'product'
    } else if (path === '/methods' || path === '/process' || path === '/tools' || path === '/about') {
      page = 'consulting'
    }
    
    setActivePage(page)
  }, [location.pathname])

  useEffect(() => {
    // Close mobile menu & submenus on navigation
    setMenuOpen(false)
    setProductOpen(false)
    setConsultingOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setProductOpen(false)
        setConsultingOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    // Sync with static i18n if available
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem('sysnex-lang') || 'en'
        setLang(savedLang)
        
        // Listen for language changes from static i18n
        const handleLangChange = () => {
          try {
            const current = localStorage.getItem('sysnex-lang') || 'en'
            setLang(current)
          } catch (e) {
            // Ignore localStorage errors
          }
        }
        
        window.addEventListener('languagechange', handleLangChange)
        return () => window.removeEventListener('languagechange', handleLangChange)
      } catch (e) {
        // localStorage might not be available
        setLang('en')
      }
    }
  }, [])

  const isActive = (page) => {
    if (activePage === page) return true
    // Handle submenu items activating parent
    if (page === 'product' && (activePage === 'pricing')) return true
    if (page === 'consulting' && (activePage === 'methods' || activePage === 'process' || activePage === 'tools')) return true
    return false
  }
  
  const isSubmenuActive = (subPage) => {
    const path = location.pathname
    if (subPage === 'try-yourself' && path.includes('/try-yourself')) return true
    if (subPage === 'pricing' && path === '/contact') return true
    if (subPage === 'methods' && path === '/methods') return true
    if (subPage === 'process' && path === '/process') return true
    if (subPage === 'tools' && path === '/tools') return true
    if (subPage === 'about' && path === '/about') return true
    return false
  }

  const toggleLanguage = (e) => {
    // Prevent event bubbling and default behavior
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    const newLang = lang === 'en' ? 'de' : 'en'
    setLang(newLang)
    
    try {
      localStorage.setItem('sysnex-lang', newLang)
    } catch (err) {
      console.warn('Could not save language to localStorage:', err)
    }
    
    // Trigger static i18n if available
    if (typeof window !== 'undefined' && window.setLanguage) {
      try {
        window.setLanguage(newLang)
      } catch (err) {
        console.warn('Could not set language via window.setLanguage:', err)
      }
    }
    
    // Dispatch event for other components
    try {
      window.dispatchEvent(new CustomEvent('languagechange'))
    } catch (err) {
      console.warn('Could not dispatch languagechange event:', err)
    }
  }

  const handleHomeClick = (e) => {
    // Always close mobile navigation when navigating
    setMenuOpen(false)
    setProductOpen(false)
    setConsultingOpen(false)

    // If already on home page, scroll to top and force navigation
    if (location.pathname === '/' || location.pathname === '/index.html') {
      e.preventDefault()
      // Scroll to top immediately
      window.scrollTo({ top: 0, behavior: 'instant' })
      // Force navigation with state to trigger re-render
      navigate('/', { 
        replace: true, 
        state: { refresh: Date.now() },
        preventScrollReset: false
      })
      // Ensure scroll happens after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 50)
    }
  }

  return (
    <header className={`navbar ${menuOpen ? 'is-open' : ''}`} role="banner">
      <div className="brand">
        <Link 
          to="/" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          onClick={handleHomeClick}
        >
          <img src="./assets/logo_S_black2.svg" alt="Sysnex Labs" className="logo" />
          <span className="brand-text">
            <span className="brand-text-primary">SYSNEX</span>
            <span className="brand-text-secondary">Labs</span>
          </span>
        </Link>
      </div>
      
      <div className="navbar-actions">
        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="siteNav"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="nav-toggle-bars" aria-hidden="true"></span>
        </button>
        <div className="header-controls">
          <button 
            className="lang-toggle" 
            id="langToggle" 
            type="button" 
            aria-label="Switch language"
            onClick={toggleLanguage}
            onTouchStart={(e) => {
              // Ensure touch events work on mobile
              e.stopPropagation()
            }}
          >
            {lang === 'en' ? 'DE' : 'EN'}
          </button>
          <ThemeToggle />
        </div>
      </div>

      <nav id="siteNav" role="navigation" aria-label="Main navigation">
        <Link 
          to="/" 
          className={`nav-link ${isActive('home') ? 'active' : ''}`}
          data-page="home"
          onClick={handleHomeClick}
        >
          {t('nav.home')}
        </Link>
        
        <div className={`nav-dropdown ${productOpen ? 'is-open' : ''}`}>
          <div className="nav-dropdown-trigger">
            <Link 
              to="/product" 
              className={`nav-link-dropdown ${isActive('product') ? 'active' : ''}`}
              data-page="product"
            >
              {t('nav.product')}
            </Link>
            <button
              className="dropdown-toggle"
              type="button"
              aria-label="Toggle Product submenu"
              aria-expanded={productOpen}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setProductOpen((v) => !v)
              }}
            />
          </div>
          <div className="dropdown-menu">
            <Link to="/product" className={location.pathname === '/product' ? 'active' : ''} data-page="product">{t('nav.product') || 'Overview'}</Link>
            <Link to="/try-yourself" className={location.pathname.includes('try-yourself') ? 'active' : ''} data-page="try-yourself">{t('nav.try-yourself')}</Link>
            <Link to="/contact" className={isSubmenuActive('pricing') ? 'active' : ''} data-page="pricing">{t('nav.pricing')}</Link>
          </div>
        </div>
        
        <div className={`nav-dropdown ${consultingOpen ? 'is-open' : ''}`}>
          <div className="nav-dropdown-trigger">
            <Link 
              to="/methods" 
              className={`nav-link-dropdown ${isActive('consulting') ? 'active' : ''}`}
              data-page="consulting"
            >
              {t('nav.consulting') || 'Consulting'}
            </Link>
            <button
              className="dropdown-toggle"
              type="button"
              aria-label="Toggle Consulting submenu"
              aria-expanded={consultingOpen}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setConsultingOpen((v) => !v)
              }}
            />
          </div>
          <div className="dropdown-menu">
            <Link to="/methods" className={location.pathname === '/methods' ? 'active' : ''} data-page="methods">{t('nav.methods') || 'Methods'}</Link>
            <Link to="/process" className={location.pathname === '/process' ? 'active' : ''} data-page="process">{t('nav.process') || 'Process'}</Link>
            <Link to="/tools" className={location.pathname === '/tools' ? 'active' : ''} data-page="tools">{t('nav.tools') || 'Tools'}</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} data-page="about">{t('nav.about') || 'About'}</Link>
          </div>
        </div>
        
        <Link 
          to="/contact" 
          className={`nav-link ${isActive('contact') ? 'active' : ''}`}
          data-page="contact"
        >
          {t('nav.contact')}
        </Link>
      </nav>
    </header>
  )
}

export default Header

