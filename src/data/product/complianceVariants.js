/**
 * Compliance Variants Data
 *
 * Defines all compliance-specific product variants with industry standards,
 * pricing, features, and target markets.
 *
 * Source: /Users/schauanr/Documents/sysnex/sysmlv2_rust_extension/docs/features/06_BUILD_VARIANTS.md
 * Source: /Users/schauanr/Documents/sysnex/sysmlv2_rust_extension/docs/features/09_COMMERCIALIZATION.md
 */

export const complianceVariants = [
  {
    id: 'systems-engineering',
    badge: 'Foundation',
    icon: '/assets/capability_foundation.svg',
    title: 'Systems Engineering',
    size: '~75-80 MB',
    price: '$6,000-$10,000/seat/year',
    description: 'ISO/IEC 15288 systems engineering foundation for all compliance variants. Provides comprehensive systems engineering processes and work products.',
    standards: ['ISO/IEC 15288'],
    features: [
      'Everything in Platform',
      'ISO/IEC 15288 compliance framework',
      'Systems engineering process templates',
      'Lifecycle documentation generation',
      'Stakeholder requirements tracking',
      'System architecture modeling',
      'Verification & validation workflows',
      'Configuration management integration'
    ],
    status: '🟡 80% Ready',
    statusDetail: 'Phase 0 Complete (53% → 95% by Q1 2026)',
    industries: [
      'All compliance variant users',
      'Systems engineering consultancies',
      'Large enterprises with multi-domain compliance',
      'Automotive, Aviation, Medical, Railway industries'
    ],
    roi: {
      saving: '$30K-$50K/year saved',
      payback: '1.5-2.5 months',
      vs: 'Manual systems engineering processes + scattered tooling'
    }
  },
  {
    id: 'automotive-safety',
    badge: 'Automotive',
    icon: '/assets/misc_safety.svg',
    title: 'Automotive/Safety',
    size: '~80-90 MB',
    price: '$8,000-$12,000/seat/year',
    description: 'ASPICE Level 2/3 compliance + ISO 26262 functional safety for automotive OEMs and Tier 1 suppliers.',
    standards: ['ISO 15288', 'ASPICE', 'ISO 26262'],
    features: [
      'Everything in Systems Engineering',
      'ASPICE Level 2/3 audit-ready scope',
      'ISO 26262 ASIL decomposition validation',
      'ASIL independence checking',
      'Freedom from interference (FFI) analysis',
      'Requirements traceability matrices',
      'Safety case documentation generation',
      'ASPICE work product templates (20 templates)',
      'Automated compliance reporting',
      'Change impact analysis with safety assessment'
    ],
    status: '🟡 45% Ready',
    statusDetail: 'Active development, production by Q2 2026',
    industries: [
      'Automotive OEMs (VW, BMW, Mercedes, GM, Ford, Toyota)',
      'Tier 1 Suppliers (Bosch, Continental, Denso, Aptiv)',
      'Electric Vehicle Manufacturers (Tesla, BYD, Rivian, Lucid)',
      'Autonomous Vehicle Companies (Waymo, Cruise, Mobileye)'
    ],
    roi: {
      saving: '$40K-$80K/year saved',
      payback: '1.5-3.0 months',
      vs: 'Rhapsody ($6K-$12K) + ASPICE consulting ($50K+)'
    }
  },
  {
    id: 'automotive-security',
    badge: 'Automotive',
    icon: '/assets/feature_compliance.svg',
    title: 'Automotive Security',
    size: '~85-95 MB',
    price: '$6,000-$10,000/seat/year',
    description: 'ISO/SAE 21434 cybersecurity + UNECE WP.29 compliance for automotive cybersecurity engineering.',
    standards: ['ISO 15288', 'ISO/SAE 21434', 'UNECE WP.29'],
    features: [
      'Everything in Systems Engineering',
      'ISO/SAE 21434 cybersecurity engineering',
      'UNECE WP.29 R155/R156 compliance',
      'Threat analysis and risk assessment (TARA)',
      'Cybersecurity requirements management',
      'Attack tree modeling and analysis',
      'Cybersecurity validation workflows',
      'Vulnerability management integration',
      'Security concept documentation'
    ],
    status: '❌ Planned Q3 2026',
    statusDetail: 'Design phase, development starts Q1 2026',
    industries: [
      'Automotive OEMs (cybersecurity teams)',
      'Tier 1 Suppliers (cybersecurity divisions)',
      'Automotive Cybersecurity Consultancies',
      'V2X Communication Providers',
      'Connected Vehicle Service Providers'
    ],
    roi: {
      saving: '$35K-$60K/year saved',
      payback: '1.8-3.4 months',
      vs: 'Specialized cybersecurity tooling + consulting'
    }
  },
  {
    id: 'automotive-complete',
    badge: 'Bundle',
    icon: '/assets/misc_safety.svg',
    title: 'Automotive Complete',
    size: '~95-105 MB',
    price: '$12,000-$18,000/seat/year',
    discount: '25-30% bundle discount',
    description: 'Complete automotive compliance suite: Safety + Security + ASPICE. Maximum coverage for automotive development.',
    standards: ['ISO 15288', 'ASPICE', 'ISO 26262', 'ISO/SAE 21434', 'UNECE WP.29'],
    features: [
      'Everything in Automotive/Safety',
      'Everything in Automotive Security',
      'Unified compliance dashboard',
      'Cross-domain traceability (safety + security)',
      'Co-engineering workflows (safety-security interaction)',
      'Integrated risk assessment (ASIL + CAL)',
      'Complete automotive work product suite',
      'Multi-standard compliance reporting',
      'Bundle discount (25-30% savings)'
    ],
    status: '❌ Planned Q1 2027',
    statusDetail: 'Depends on Safety + Security variants',
    industries: [
      'Automotive OEMs (Full compliance teams)',
      'Tier 1 Suppliers (Integrated development)',
      'Autonomous vehicle companies (Complete stack)',
      'EV manufacturers (Safety + Security critical)'
    ],
    roi: {
      saving: '$70K-$130K/year saved',
      payback: '1.4-2.6 months',
      vs: 'Cameo + Rhapsody ($14K-$27K) + consulting ($80K+)'
    }
  },
  {
    id: 'aviation',
    badge: 'Aviation',
    icon: '/assets/industry_aerospace.svg',
    title: 'Aviation',
    size: '~90-100 MB',
    price: '$10,000-$15,000/seat/year',
    description: 'DO-178C, DO-331, DO-330 compliance for avionics and aircraft systems development.',
    standards: ['ISO 15288', 'DO-178C', 'DO-331', 'DO-330'],
    features: [
      'Everything in Systems Engineering',
      'DO-178C software considerations',
      'DO-331 model-based development',
      'DO-330 tool qualification',
      'Software level compliance (A, B, C, D)',
      'Structural coverage analysis',
      'Traceability to high-level requirements',
      'Verification & validation workflows',
      'Certification documentation generation',
      'Tool qualification data package (TQP)'
    ],
    status: '❌ Planned Q4 2026',
    statusDetail: 'Requirements defined, development starts Q2 2026',
    industries: [
      'Avionics Suppliers (Collins, Honeywell, Thales, Garmin)',
      'Aircraft OEMs (Boeing, Airbus, Embraer, Bombardier)',
      'UAV/Drone Manufacturers',
      'Military Aerospace Contractors'
    ],
    roi: {
      saving: '$50K-$100K/year saved',
      payback: '1.5-3.0 months',
      vs: 'Cameo + DO-178C plugins ($15K-$25K) + consulting'
    }
  },
  {
    id: 'medical',
    badge: 'Medical',
    icon: '🏥',
    title: 'Medical',
    size: '~85-95 MB',
    price: '$8,000-$12,000/seat/year',
    description: 'IEC 62304, IEC 62366, ISO 14971 compliance for medical device software development.',
    standards: ['ISO 15288', 'IEC 62304', 'IEC 62366', 'ISO 14971'],
    features: [
      'Everything in Systems Engineering',
      'IEC 62304 software lifecycle processes',
      'IEC 62366 usability engineering',
      'ISO 14971 risk management',
      'Software safety classification (A, B, C)',
      'SOUP (Software of Unknown Provenance) management',
      'Design & development documentation',
      'Risk analysis and mitigation tracking',
      'Verification & validation protocols',
      'FDA/MDR submission packages'
    ],
    status: '❌ Planned Q2 2028',
    statusDetail: 'Long-term roadmap, market validation in progress',
    industries: [
      'Medical Device Manufacturers',
      'IVD (In Vitro Diagnostic) Companies',
      'Digital Health Startups',
      'Medical Software Companies'
    ],
    roi: {
      saving: '$35K-$70K/year saved',
      payback: '1.7-4.1 months',
      vs: 'Specialized medical device tooling + regulatory consulting'
    }
  },
  {
    id: 'railway',
    badge: 'Railway',
    icon: '/assets/industry_rail.svg',
    title: 'Railway',
    size: '~85-95 MB',
    price: '$8,000-$12,000/seat/year',
    description: 'EN 50128, EN 50126, EN 50129 compliance for railway signaling and train control systems.',
    standards: ['ISO 15288', 'EN 50128', 'EN 50126', 'EN 50129'],
    features: [
      'Everything in Systems Engineering',
      'EN 50128 software for railway control',
      'EN 50126 RAMS (Reliability, Availability, Maintainability, Safety)',
      'EN 50129 safety-related electronic systems',
      'SIL (Safety Integrity Level) management',
      'Software verification & validation',
      'Safety case documentation',
      'Hazard analysis and risk assessment',
      'Technical safety report generation'
    ],
    status: '❌ Planned Q3 2028',
    statusDetail: 'Long-term roadmap, market assessment pending',
    industries: [
      'Railway Signaling (Siemens Mobility, Alstom, Hitachi Rail)',
      'Train Control Systems',
      'Metro/Subway Operators',
      'Railway Safety Equipment Suppliers'
    ],
    roi: {
      saving: '$35K-$70K/year saved',
      payback: '1.7-4.1 months',
      vs: 'Legacy railway-specific tooling + CENELEC consulting'
    }
  }
]

/**
 * Get compliance variants by status
 */
export const getProductionReadyVariants = () => {
  return complianceVariants.filter(v => v.status.includes('✅') || v.status.includes('🟡'))
}

export const getPlannedVariants = () => {
  return complianceVariants.filter(v => v.status.includes('❌'))
}

/**
 * Get compliance variants by industry
 */
export const getVariantsByIndustry = (industry) => {
  return complianceVariants.filter(v =>
    v.industries.some(i => i.toLowerCase().includes(industry.toLowerCase()))
  )
}

export default complianceVariants
