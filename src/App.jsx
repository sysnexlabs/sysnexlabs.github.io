import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import TryYourself from './pages/TryYourself'
import Product from './pages/Product'
import About from './pages/About'
import Methods from './pages/Methods'
import Process from './pages/Process'
import Tools from './pages/Tools'
import './styles/App.css'

function App() {
  // Get base URL - handle both development and production
  // For GitHub Pages with base './', we need to normalize it
  const baseUrl = import.meta.env.BASE_URL === './' ? '' : (import.meta.env.BASE_URL || '')
  
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
    <ThemeProvider>
      <Router basename={baseUrl}>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/try-yourself" element={<TryYourself />} />
              <Route path="/try-yourself" element={<TryYourself />} />
              <Route path="/about" element={<About />} />
              <Route path="/methods" element={<Methods />} />
              <Route path="/process" element={<Process />} />
              <Route path="/tools" element={<Tools />} />
              {/* Catch-all route - show home for any unmatched path */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App


