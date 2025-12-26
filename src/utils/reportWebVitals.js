import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

/**
 * Report Web Vitals metrics to console and analytics
 *
 * Core Web Vitals:
 * - LCP (Largest Contentful Paint): < 2.5s (good), 2.5-4s (needs improvement), > 4s (poor)
 * - INP (Interaction to Next Paint): < 200ms (good), 200-500ms (needs improvement), > 500ms (poor)
 * - CLS (Cumulative Layout Shift): < 0.1 (good), 0.1-0.25 (needs improvement), > 0.25 (poor)
 *
 * Other metrics:
 * - FCP (First Contentful Paint): < 1.8s (good), 1.8-3s (needs improvement), > 3s (poor)
 * - TTFB (Time to First Byte): < 800ms (good), 800-1800ms (needs improvement), > 1800ms (poor)
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Report Core Web Vitals
    onCLS(onPerfEntry)
    onINP(onPerfEntry)
    onFCP(onPerfEntry)
    onLCP(onPerfEntry)
    onTTFB(onPerfEntry)
  }
}

/**
 * Console reporter for development
 */
export const consoleReporter = (metric) => {
  const { name, value, rating, delta } = metric

  // Color code based on rating
  const color = rating === 'good' ? '32' : rating === 'needs-improvement' ? '33' : '31'

  console.log(
    `%c${name}%c: ${Math.round(value)}ms (${rating})`,
    `font-weight: bold; color: #${color === '32' ? '3FB950' : color === '33' ? 'FBBF24' : 'E5533D'}`,
    'color: inherit'
  )

  // Log to performance mark for debugging
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(`web-vitals-${name}`)
  }
}

/**
 * Analytics reporter for production
 * Can be connected to Google Analytics, DataDog, etc.
 */
export const analyticsReporter = (metric) => {
  const { name, value, rating, id } = metric

  // Send to analytics endpoint (placeholder)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(value),
      rating,
      non_interaction: true
    })
  }

  // Log to console in development
  if (import.meta.env.DEV) {
    consoleReporter(metric)
  }
}

export default reportWebVitals
