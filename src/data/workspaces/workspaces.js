/**
 * Workspace Data
 *
 * Defines 7 personalized workspaces for different user groups.
 * Based on FEATURE_USER_GROUP_MAPPING.md
 */

export const workspaces = [
  {
    id: 'code-first',
    icon: '👨‍💻',
    title: 'Code-First',
    subtitle: 'For Developers & Engineers',
    description: 'Native code editing with full LSP support, code navigation, and refactoring tools.',
    color: '#3b82f6',
    primaryFeatures: [
      'Definition Body Provider - Double-click to view definitions',
      'Autocompletion with context-aware suggestions',
      'Go-to-Definition and Find References',
      'Rename Symbol across entire codebase',
      'Code Actions for quick fixes',
      'Inlay Hints for type information',
      'Real-time Diagnostics',
      'Native Git Integration'
    ],
    workflows: [
      'Edit SysML files in native VS Code editor',
      'Use Definition Body Provider to explore elements',
      'Navigate with Go-to-Definition and Find References',
      'Refactor models with Rename Symbol',
      'Validate with real-time diagnostics',
      'Commit changes via Git'
    ]
  },
  {
    id: 'office-style',
    icon: '📊',
    title: 'Office-Style',
    subtitle: 'For Business Analysts & Managers',
    description: 'Documentation-focused workflows with rich visual presentations and report generation.',
    color: '#10b981',
    primaryFeatures: [
      'Documentation Viewer with interactive content',
      'Visual Documentation Editing',
      'Requirements Manager for tracking',
      'Traceability Matrix visualization',
      'ASPICE Work Products generation',
      'Trade Study Analysis',
      'Export to PDF/HTML/Markdown',
      'Model Explorer navigation'
    ],
    workflows: [
      'Open files in Documentation Viewer by default',
      'Edit models visually in documentation view',
      'Manage requirements with Requirements Manager',
      'Generate ASPICE compliance reports',
      'Export documentation to PDF/HTML',
      'Track traceability across projects'
    ]
  },
  {
    id: 'visual-modelers',
    icon: '🎨',
    title: 'Visual Modelers',
    subtitle: 'For Systems Architects',
    description: 'Diagram-first workflows with interactive editing and auto-layout capabilities.',
    color: '#8b5cf6',
    primaryFeatures: [
      'Interactive Diagram Editor with React Flow',
      'Diagram Viewer for navigation',
      'Drag-and-drop Relationship Creation',
      'ELK.js Auto-Layout engine',
      'Layout Persistence',
      'SysON Bridge for bidirectional sync',
      'UVL Variability Management',
      'Visual Feature Model Editing'
    ],
    workflows: [
      'Edit models visually in Diagram Editor',
      'Create relationships via drag-and-drop',
      'Auto-layout diagrams with ELK.js',
      'Sync with SysON for graphical editing',
      'Manage variability with UVL feature models',
      'Generate documentation from diagrams'
    ]
  },
  {
    id: 'compliance',
    icon: '✅',
    title: 'Compliance & Audit',
    subtitle: 'For Quality Engineers',
    description: 'Standards compliance, audit trails, and validation for regulated industries.',
    color: '#f59e0b',
    primaryFeatures: [
      'ASPICE Work Products - All 20 documents',
      'ISO 26262 Validation (ASIL decomposition)',
      'ASIL Decomposition Validator (ISO 26262-9)',
      'Traceability Matrix for requirements',
      'Requirements Quality Checks',
      'Compliance Validation',
      'Git-based Audit Trail',
      'Model Analytics for compliance scores'
    ],
    workflows: [
      'Validate models for standards compliance',
      'Generate work products automatically',
      'Track traceability with Matrix',
      'Review audit trails via Git history',
      'Generate compliance reports for audits',
      'Validate ASIL decomposition in real-time'
    ]
  },
  {
    id: 'analysis',
    icon: '🔬',
    title: 'Analysis & Simulation',
    subtitle: 'For Systems Analysts',
    description: 'Model analysis, execution, simulation, and decision support tools.',
    color: '#06b6d4',
    primaryFeatures: [
      'Model Analytics - Quality & complexity metrics',
      'OCL 2.5 Constraint System',
      'Trade Study Analysis (MCDA)',
      'UVL Variability Analysis',
      'Execution Engine for simulation',
      'Dependency Analysis',
      'Completeness Checking',
      'Model Validation'
    ],
    workflows: [
      'Analyze models for quality and complexity',
      'Validate constraints with OCL 2.5',
      'Execute models for simulation',
      'Perform trade studies for decisions',
      'Analyze variability with UVL',
      'Generate analysis reports'
    ]
  },
  {
    id: 'documentation',
    icon: '📚',
    title: 'Documentation-Focused',
    subtitle: 'For Technical Writers',
    description: 'Professional documentation generation with customizable templates and export formats.',
    color: '#ec4899',
    primaryFeatures: [
      'Rich Interactive Documentation Viewer',
      'Documentation Editing in-place',
      'Automated Documentation Generation',
      'Export to PDF/HTML/Markdown/Sphinx',
      'MkDocs Integration',
      'Sphinx Integration',
      'Customizable Template System',
      'Diagram Embedding'
    ],
    workflows: [
      'Generate documentation from models automatically',
      'Edit documentation in Documentation Viewer',
      'Customize templates for different audiences',
      'Export to multiple formats',
      'Embed diagrams in documentation',
      'Maintain versioning via Git'
    ]
  },
  {
    id: 'collaborative',
    icon: '👥',
    title: 'Collaborative Teams',
    subtitle: 'For Team Leads & Project Managers',
    description: 'Multi-user workflows, version control, and team collaboration features.',
    color: '#ef4444',
    primaryFeatures: [
      'Native Git Integration',
      'Multi-User Concurrent Editing',
      'Code Review workflows',
      'Shared Model Explorer',
      'Team-wide Traceability Matrix',
      'Collaborative Requirements Manager',
      'Shared Documentation Access',
      'SysON Bridge for team collaboration'
    ],
    workflows: [
      'Collaborate via Git (branch, merge, review)',
      'Share models via version control',
      'Track changes with Git history',
      'Review changes via pull requests',
      'Maintain traceability across team',
      'Sync with SysON for graphical collaboration'
    ]
  }
]

/**
 * Get workspace by ID
 */
export const getWorkspaceById = (id) => {
  return workspaces.find(w => w.id === id)
}

export default workspaces
