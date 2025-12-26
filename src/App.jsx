import React, { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
// Lazy load heavy components for better code splitting
const TryYourself = lazy(() => import('./pages/TryYourself'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Legal = lazy(() => import('./pages/Legal'))
const HeroAlternative = lazy(() => import('./pages/HeroAlternative'))
// Competences pages
const About = lazy(() => import('./pages/About'))
const Methods = lazy(() => import('./pages/Methods'))
const Process = lazy(() => import('./pages/Process'))
const Tools = lazy(() => import('./pages/Tools'))
const Competences = lazy(() => import('./pages/Competences'))
import './styles/App.css'

function AppContent() {
  const location = useLocation()
  const isAlternativeHero = location.pathname === '/hero-alternative'
  
  // Handle redirect from 404.html fallback (GitHub Pages)
  useEffect(() => {
    // Check if we have a redirect path stored from 404.html
    const redirectPath = sessionStorage.getItem('redirectPath')
    if (redirectPath && redirectPath !== window.location.pathname + window.location.search + window.location.hash) {
      // Clear the redirect path
      sessionStorage.removeItem('redirectPath')
      // Navigate to the stored path
      window.history.replaceState(null, '', redirectPath)
      // Trigger a navigation event to update React Router
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }, [])
  
  return (
    <div className="app">
      {!isAlternativeHero && <Header />}
      <main>
        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/legal/privacy" element={<Legal type="privacy" />} />
            <Route path="/legal/terms" element={<Legal type="terms" />} />
            <Route path="/legal/license" element={<Legal type="license" />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/try-yourself" element={<TryYourself />} />
            <Route path="/try-yourself" element={<TryYourself />} />
            <Route path="/hero-alternative" element={<HeroAlternative />} />
            {/* Competences pages */}
            <Route path="/about" element={<About />} />
            <Route path="/methods" element={<Methods />} />
            <Route path="/process" element={<Process />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/competences" element={<Competences />} />
            {/* Catch-all route - show home for any unmatched path */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      {!isAlternativeHero && <Footer />}
    </div>
  )
}

function App() {
  // Get base URL - handle both development and production
  // For GitHub Pages with base './', we need to normalize it
  const baseUrl = import.meta.env.BASE_URL === './' ? '' : (import.meta.env.BASE_URL || '')
  
  return (
    <ThemeProvider>
      <Router basename={baseUrl}>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
