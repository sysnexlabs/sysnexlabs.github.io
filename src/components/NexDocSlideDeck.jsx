import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { useTranslation } from '../utils/i18n'
import './NexDocSlideDeck.css'

const slides = [
  {
    id: 'documentation',
    image: '/assets/nexdoc_documentation.png',
    title: 'Documentation Viewer',
    description: 'Interactive documentation with model explorer, quick actions, and element info'
  },
  {
    id: 'cst',
    image: '/assets/nexdoc_cst.png',
    title: 'Concrete Syntax Tree',
    description: 'Deep dive into the CST structure with statistics and tree navigation'
  },
  {
    id: 'hir',
    image: '/assets/nexdoc_hir.png',
    title: 'High-level IR',
    description: 'Explore the High-level Intermediate Representation with stable IDs and ranges'
  },
  {
    id: 'stats',
    image: '/assets/nexdoc_stats.png',
    title: 'Model Statistics',
    description: 'Comprehensive metrics: elements, packages, definitions, and documentation coverage'
  },
  {
    id: 'analytics',
    image: '/assets/nexdoc_analytics.png',
    title: 'Quality Analytics',
    description: 'Quality score, complexity, coupling, cohesion, and maintainability insights'
  }
]

const NexDocSlideDeck = () => {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const intervalRef = useRef(null)

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000) // Change slide every 5 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsPlaying(false) // Pause when manually navigating
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsPlaying(false)
  }

  // Touch handlers for swipe
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsPlaying((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <section className="nexdoc-slide-deck" aria-label="NexDoc Features">
      <div className="slide-deck-container">
        {/* Main Slide Display */}
        <div 
          className="slide-viewport"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentSlide}
              className="slide-content"
              initial={{ opacity: 0, x: 300, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -300, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8
              }}
            >
              <div className="slide-info-top">
                <motion.div
                  key={`title-${currentSlide}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="slide-title"
                >
                  {slides[currentSlide].title}
                </motion.div>
                <motion.p
                  key={`desc-${currentSlide}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="slide-description"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </div>
              
              <div className="slide-image-wrapper">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="slide-image"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="slide-controls">
          <button
            className="slide-nav-button prev-button"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="slide-indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`slide-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                aria-current={index === currentSlide}
              >
                <span className="indicator-dot"></span>
                <span className="indicator-label">{slide.title}</span>
              </button>
            ))}
          </div>

          <button
            className="slide-nav-button next-button"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Play/Pause Control */}
        <div className="slide-play-control">
          <button
            className="play-pause-button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>

        {/* Slide Counter */}
        <div className="slide-counter">
          <span className="current-slide">{currentSlide + 1}</span>
          <span className="slide-separator">/</span>
          <span className="total-slides">{slides.length}</span>
        </div>
      </div>
    </section>
  )
}

export default NexDocSlideDeck

