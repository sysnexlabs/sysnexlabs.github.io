/**
 * Commercial Product Editions Data
 *
 * Defines commercial product editions (Essential, Standard, Platform, Platform-Full)
 * with pricing, features, and target markets.
 *
 * Source: /Users/schauanr/Documents/sysnex/sysmlv2_rust_extension/docs/features/06_BUILD_VARIANTS.md
 * Source: /Users/schauanr/Documents/sysnex/sysmlv2_rust_extension/docs/features/09_COMMERCIALIZATION.md
 */

export const editions = [
  {
    id: 'essential',
    badge: 'Free',
    icon: '🔹',
    title: 'Essential',
    size: '~25 MB',
    price: 'Free',
    priceDetail: 'Open Source',
    description: 'Core LSP features: completion, diagnostics, navigation, formatting. Perfect for CI/CD pipelines and lightweight environments.',
    features: [
      'Core LSP Protocol (9 features)',
      'Syntax Highlighting',
      'Code Navigation (go-to-definition, find references)',
      'Real-time Diagnostics (25+ collectors)',
      'Autocompletion (~10K library types)',
      'Hover Information',
      'Document Formatting',
      'Code Folding',
      'Document Symbols',
      'Semantic Tokens',
      'Inlay Hints',
      'Signature Help'
    ],
    status: '✅ Production-Ready',
    buildTime: '~2-3 minutes',
    target: 'CI/CD pipelines, students, lightweight environments',
    roi: {
      saving: 'Free alternative to commercial LSP servers',
      vs: 'Eclipse Papyrus support ($2K-$5K/year)'
    }
  },
  {
    id: 'standard',
    badge: 'Recommended',
    icon: '🔷',
    title: 'Standard',
    size: '~35-40 MB',
    price: '$2,500-$4,000',
    priceDetail: '/seat/year',
    description: 'Complete professional IDE: all LSP features, advanced documentation viewer, model explorer, requirements, diagrams, analytics.',
    features: [
      'Everything in Essential',
      'Advanced Documentation Viewer (cross-file nav, auto diagrams)',
      'Requirements Manager (traceability matrices)',
      'Diagram Editor (BDD, IBD, Activity, StateMachine, Requirement)',
      'Analytics Dashboard (quality metrics, coverage)',
      'Model Explorer (hierarchical navigation)',
      'Trade Study Analysis (MCDA, AHP, sensitivity analysis)',
      'Code Generation (C++, Python, Java)',
      'Call & Type Hierarchy',
      'Rename Symbol (multi-file)',
      'Code Actions & Quick Fixes',
      'MkDocs/Sphinx Documentation Generation'
    ],
    status: '✅ Production-Ready',
    buildTime: '~3-4 minutes',
    target: 'Professional developers, most users',
    roi: {
      saving: '$15K-$20K/year saved',
      payback: '2-3 months',
      vs: 'Eclipse Papyrus ($2K-$5K support) + tooling'
    },
    featured: true
  },
  {
    id: 'platform',
    badge: 'Enterprise',
    icon: '🔶',
    title: 'Platform',
    size: '~50-60 MB',
    price: '$5,000-$8,000',
    priceDetail: '/seat/year',
    description: 'Enterprise platform with domain extensions: VSS, YAML Architecture, UVL Variability Management, Python bindings.',
    features: [
      'Everything in Standard (including Trade Study Analysis)',
      'VSS (Vehicle Signal Specification) Support',
      'YAML Architecture (ADL/SUDL parsing)',
      'UVL Variability Management (feature models, SAT solving)',
      'Z3 Solver Integration (SMT solving, constraint validation)',
      'Python Bindings (API access)',
      'CST Viewer (concrete syntax tree)',
      'Trade Study Integration with Variability',
      'Enterprise Analytics',
      'API Server for Integration'
    ],
    status: '✅ Production-Ready',
    buildTime: '~4-5 minutes',
    target: 'Enterprise users, automotive, variability engineering, platform integrators',
    roi: {
      saving: '$25K-$35K/year saved',
      payback: '2.2-3.1 months',
      vs: 'Cameo ($8K-$15K/year)'
    }
  },
  {
    id: 'platform-full',
    badge: 'Default',
    icon: '🟣',
    title: 'Platform-Full',
    size: '~60-70 MB',
    price: 'Free',
    priceDetail: 'Open Source (Default Build)',
    description: 'All features including constraints, execution engine, ASPICE work products. Maximum compatibility and feature set.',
    features: [
      'Everything in Platform',
      'Constraint Solver (OCL 2.5 support)',
      'Execution Engine (action execution, simulation)',
      'ASPICE Work Products (20 templates)',
      'Package Management (Git integration)',
      'Advanced Simulation Support',
      'Complete Feature Set (21 features total)'
    ],
    status: '🟡 70% Ready',
    statusDetail: 'May have cross-compilation issues, active stabilization',
    buildTime: '~4-6 minutes',
    target: 'Development, testing, maximum compatibility',
    roi: {
      saving: 'Complete feature access at no cost',
      vs: 'Commercial tools with limited free tiers'
    }
  }
]

/**
 * Get production-ready editions
 */
export const getProductionReadyEditions = () => {
  return editions.filter(e => e.status.includes('✅'))
}

/**
 * Get commercial editions (excluding free ones)
 */
export const getCommercialEditions = () => {
  return editions.filter(e => e.price !== 'Free')
}

/**
 * Get free editions
 */
export const getFreeEditions = () => {
  return editions.filter(e => e.price === 'Free')
}

/**
 * Get edition by ID
 */
export const getEditionById = (id) => {
  return editions.find(e => e.id === id)
}

export default editions
