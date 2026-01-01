/**
 * Platform Variants Data
 *
 * Different deployment platforms and delivery models for NexSuite.
 * Includes VS Code Extension, Desktop, Cloud, CLI, and Compliance variants.
 */

export const platformVariants = [
  {
    icon: '👁️',
    title: 'NexDocs Viewer',
    badge: 'Free',
    description: 'Advanced web-based documentation viewer with cross-file navigation, smart import resolution, and automatic diagram generation.',
    features: [
      'MkDocs-style hierarchical documentation',
      'Cross-file navigation with clickable imports',
      'Smart import resolution (standard library detection)',
      'Automatic diagram generation (BDD, IBD, Activity, StateMachine, Requirement)',
      'Relationship extraction (specialization, typing, satisfaction)',
      'HIR-based extraction (single source of truth)',
      'Theme integration with smooth animations',
      'Zero installation—browser-based WASM performance'
    ],
    status: '✅ Available Now',
    featured: false,
    cta: 'Try Viewer',
    link: '/try-yourself'
  },
  {
    icon: '💻',
    title: 'NexSuite IDE',
    badge: 'VS Code Extension',
    description: 'Production-ready VS Code extension with advanced documentation viewer, complete LSP implementation, and professional features.',
    features: [
      'Complete LSP implementation (18/18 features)',
      '<50ms LSP response (10x faster than legacy)',
      'Advanced documentation viewer (cross-file nav, auto diagrams)',
      'AI integration (Copilot, Claude, VS Code AI)',
      'Diagram editor with bidirectional sync',
      'Requirements manager & analytics dashboard',
      'HIR-based tooling (single source of truth)',
      'Git-native workflows & CI/CD support'
    ],
    status: '✅ Production-Ready',
    featured: true,
    cta: 'Get Extension',
    link: '/contact'
  },
  {
    icon: '🖥️',
    title: 'NexSuite Desktop',
    badge: 'Tauri App',
    description: 'Native desktop application built with Tauri. Standalone app with full LSP features, no VS Code required. Fast, secure, and offline-capable.',
    features: [
      'Same LSP backend as VS Code extension',
      'Native desktop performance',
      'Smaller footprint than Electron',
      'Fully offline capable',
      'No VS Code installation required',
      'Cross-platform (Windows, macOS, Linux)'
    ],
    status: '✅ Production-Ready',
    featured: false,
    cta: 'Download Desktop',
    link: '/contact'
  },
  {
    icon: '☁️',
    title: 'NexSuite Cloud',
    badge: 'SaaS Solution',
    description: 'Cloud-based SysML v2 IDE accessible from any browser. Real-time collaboration, cloud storage, and zero installation required.',
    features: [
      'Access from any browser',
      'Real-time collaboration',
      'Cloud-based model storage',
      'Zero installation required',
      'Same features as desktop versions',
      'Enterprise SSO integration'
    ],
    status: '🚧 Coming Soon',
    featured: false,
    cta: 'Join Waitlist',
    link: '/contact'
  },
  {
    icon: '⚙️',
    title: 'NexSuite CLI + Compliance',
    badge: 'Enterprise',
    description: 'CLI tool for CI/CD validation and compliance packs (ASPICE, ISO 26262) for regulated domain engineering.',
    features: [
      'CLI validation for CI/CD pipelines',
      'ASPICE compliance pack (20 work products)',
      'ISO 26262 validation rules',
      'Automated compliance reporting',
      'Batch processing & export capabilities',
      'Enterprise license management'
    ],
    status: '🚧 Coming Soon',
    featured: false,
    cta: 'Contact Sales',
    link: '/contact'
  },
  {
    icon: '🛡️',
    title: 'NexSuite Automotive/Safety',
    badge: 'Enterprise',
    description: 'Automotive compliance variant: ASPICE Level 2/3 compliance, ISO 26262 functional safety (ASIL decomposition validation), ISO 15288 systems engineering foundation.',
    features: [
      'Everything in Platform',
      'ASPICE audit-ready scope',
      'ISO 26262 ASIL Validation',
      'ISO 15288 Foundation',
      'Requirements & Traceability',
      'ASIL Decomposition Validator',
      'Change Impact Analysis'
    ],
    status: '🚧 Coming Soon',
    featured: false,
    cta: 'Contact Sales',
    link: '/contact'
  }
]

/**
 * Get featured platform variants
 */
export const getFeaturedVariants = () => {
  return platformVariants.filter(v => v.featured)
}

/**
 * Get production-ready platform variants
 */
export const getProductionReadyPlatformVariants = () => {
  return platformVariants.filter(v => v.status.includes('✅'))
}

/**
 * Get platform variant by title
 */
export const getVariantByTitle = (title) => {
  return platformVariants.find(v => v.title === title)
}

export default platformVariants
