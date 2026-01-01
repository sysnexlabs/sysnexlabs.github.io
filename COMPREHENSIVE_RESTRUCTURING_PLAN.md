# Comprehensive Website Restructuring Plan

**Date:** January 1, 2026
**Status:** Proposed
**Current:** Single Product page (1,024 lines) with everything mixed together
**Goal:** Multi-page architecture with clear separation of Platforms, Products, and detailed sub-pages

---

## Current Problems

1. ❌ **Single Product page** contains everything (platforms, tools, features, compliance)
2. ❌ **No clear separation** between delivery platforms and product tools
3. ❌ **No detailed pages** for individual products (NexDocs, NexReq, etc.)
4. ❌ **User confusion** - hard to find specific information
5. ❌ **Hard to maintain** - 1,024 lines in single file
6. ❌ **Poor SEO** - all content on one URL
7. ❌ **No deep linking** - can't share direct links to specific products

---

## Proposed Site Structure

### Current Structure:
```
/
├── /                    (Home)
├── /product             (EVERYTHING mixed together)
├── /pricing
├── /contact
└── /try-yourself
```

### Proposed New Structure:
```
/
├── /                       (Home)
├── /overview              (Product overview - high-level pitch)
│
├── /platforms             (HOW you get NexSuite - delivery models)
│   ├── /platforms/vscode           (VS Code Extension)
│   ├── /platforms/desktop          (Tauri Desktop App)
│   ├── /platforms/cloud            (SaaS Cloud)
│   ├── /platforms/cli              (CLI & CI/CD)
│   └── /platforms/compare          (Platform comparison table)
│
├── /products              (WHAT NexSuite offers - tools & features)
│   ├── /products/nexdocs           (Documentation generation)
│   │   ├── /products/nexdocs/viewer
│   │   ├── /products/nexdocs/editor
│   │   └── /products/nexdocs/generator
│   ├── /products/nexreq            (Requirements management)
│   ├── /products/nextest           (Test management)
│   ├── /products/nexviz            (Visualization)
│   ├── /products/nexanalytics      (Analytics & metrics)
│   ├── /products/nextrade          (Trade studies)
│   ├── /products/nexvar            (Variability management)
│   ├── /products/nexsim            (Simulation)
│   └── /products/nexsuite          (Integration layer)
│
├── /editions              (BUILD variants - Essential/Standard/Platform)
│   ├── /editions/essential
│   ├── /editions/standard
│   ├── /editions/platform
│   └── /editions/platform-full
│
├── /compliance            (INDUSTRY-SPECIFIC variants)
│   ├── /compliance/systems-engineering
│   ├── /compliance/automotive-safety
│   ├── /compliance/automotive-security
│   ├── /compliance/automotive-complete
│   ├── /compliance/aviation
│   ├── /compliance/medical
│   ├── /compliance/railway
│   └── /compliance/compare         (Comparison table)
│
├── /features              (LSP & technical features)
│   └── /features/lsp               (LSP features grid)
│
├── /pricing               (Pricing & licensing)
├── /contact               (Contact form)
└── /try-yourself          (Interactive demo)
```

---

## Content Architecture

### 1. `/overview` - Product Overview (NEW)
**Purpose:** High-level product pitch and value proposition
**Content:**
- Hero section with value proposition
- Key differentiators (6 cards)
- Architecture diagram
- Quick links to Platforms, Products, Compliance
- CTA to /try-yourself

**Replaces:** Current /product hero section

---

### 2. `/platforms` - Platform Delivery Models (NEW)
**Purpose:** Show HOW users can get/deploy NexSuite
**Content:**
- Platform comparison table
- VS Code Extension (50M+ users)
- Desktop App (Tauri)
- Cloud/SaaS
- CLI & CI/CD
- Links to detailed sub-pages

**Sub-pages:**

#### `/platforms/vscode`
- Deep dive into VS Code extension
- Installation instructions
- Marketplace link
- Screenshots
- Feature list
- Integration with VS Code AI, Copilot

#### `/platforms/desktop`
- Tauri desktop app details
- Download links
- System requirements
- Offline capabilities
- Cross-platform support

#### `/platforms/cloud`
- SaaS offering details
- Real-time collaboration
- Cloud storage
- Enterprise SSO
- Waitlist signup

#### `/platforms/cli`
- CLI tool documentation
- CI/CD integration examples
- Automated validation
- Batch processing
- Docker images

---

### 3. `/products` - Product Tools & Features (NEW)
**Purpose:** Show WHAT NexSuite offers (individual tools)
**Content:**
- Product grid (9 products)
- Quick overview of each tool
- Links to detailed sub-pages

**Sub-pages:**

#### `/products/nexdocs` - Documentation Generation
- Viewer (free) - read-only documentation viewer
- Editor (platform) - full editing with quality indicators
- Generator (platform) - automated MkDocs/Sphinx generation
- Features:
  * MkDocs-style hierarchical docs
  * Cross-file navigation
  * Auto diagram generation (5 types)
  * HIR-based extraction
  * Export to HTML/PDF/Word
- Use cases
- Screenshots
- Pricing

#### `/products/nexreq` - Requirements Management
- Manager (standard) - traceability matrices
- Validator (automotive) - ASIL decomposition
- Features:
  * Bidirectional traceability
  * ASIL tracking
  * Change impact analysis
  * Requirement quality checking
  * Templates
- Use cases
- Screenshots
- Pricing

#### `/products/nextest` - Test Management
- Features
- Use cases
- Integration with requirements
- Coverage analysis

#### `/products/nexviz` - Visualization
- BDD, IBD, Activity, StateMachine, Requirement diagrams
- Interactive diagrams
- Export capabilities
- Bidirectional sync

#### `/products/nexanalytics` - Analytics Dashboard
- Quality metrics
- Coverage analytics
- Complexity analysis
- Power BI-style dashboards
- Real-time reporting

#### `/products/nextrade` - Trade Studies
- MCDA analysis
- AHP (Analytic Hierarchy Process)
- Sensitivity analysis
- UVL integration
- Decision support

#### `/products/nexvar` - Variability Management
- UVL feature models
- SAT solving
- Z3 solver integration
- Configuration management

#### `/products/nexsim` - Simulation
- State machine simulation
- Execution engine
- Action execution
- Debugging

#### `/products/nexsuite` - Integration Layer
- How all products work together
- Unified workflows
- Cross-product features

---

### 4. `/editions` - Build Variants (NEW)
**Purpose:** Show different BUILD configurations
**Content:**
- Edition comparison table
- Feature matrix
- Pricing for commercial editions

**Sub-pages:**

#### `/editions/essential` (Free)
- Core LSP only (~25 MB)
- CI/CD pipelines
- Download links
- Documentation

#### `/editions/standard` (Commercial $2.5-4K)
- Professional IDE (~35-40 MB)
- All products included
- Licensing
- Purchase

#### `/editions/platform` (Enterprise $5-8K)
- Enterprise features (~50-60 MB)
- VSS, YAML, UVL
- Contact sales

#### `/editions/platform-full` (Free Default)
- Everything (~60-70 MB)
- Constraints, execution
- Development/testing

---

### 5. `/compliance` - Industry Compliance Variants (ENHANCED)
**Purpose:** Show INDUSTRY-SPECIFIC compliance solutions
**Content:**
- Compliance variant comparison table
- Systems Engineering foundation
- Industry-specific variants
- Standards coverage

**Sub-pages:**

#### `/compliance/systems-engineering`
- ISO/IEC 15288 details
- Process templates
- Work products
- Pricing ($6-10K)
- ROI calculator

#### `/compliance/automotive-safety`
- ASPICE Level 2/3
- ISO 26262 details
- ASIL decomposition
- Safety case generation
- Pricing ($8-12K)
- Case studies

#### `/compliance/automotive-security`
- ISO/SAE 21434 details
- TARA (Threat analysis)
- UNECE WP.29
- Pricing ($6-10K)

#### `/compliance/automotive-complete`
- Bundle details (Safety + Security)
- 25-30% discount
- Pricing ($12-18K)
- Complete automotive compliance

#### `/compliance/aviation`
- DO-178C, DO-331, DO-330
- Software level compliance
- Tool qualification
- Pricing ($10-15K)

#### `/compliance/medical`
- IEC 62304, IEC 62366, ISO 14971
- FDA submission packages
- Risk management
- Pricing ($8-12K)

#### `/compliance/railway`
- EN 50128, EN 50126, EN 50129
- SIL management
- Safety cases
- Pricing ($8-12K)

---

### 6. `/features` - Technical Features (ENHANCED)
**Purpose:** Deep dive into LSP and technical capabilities
**Content:**

#### `/features/lsp`
- Complete LSP feature grid (18 features)
- Performance metrics
- Comparison with competitors
- Technical documentation

---

## Implementation Plan

### Phase 1: ✅ DONE - Data Separation
- [x] Extract data to src/data/product/
- [x] Centralized data management
- [x] Product.jsx reduced to 1,024 lines

### Phase 2: Routing & Page Structure (2-3 hours)
1. Update src/App.jsx with new routes
2. Create page directory structure:
```
src/pages/
├── overview/
│   └── Overview.jsx
├── platforms/
│   ├── Platforms.jsx
│   ├── PlatformVSCode.jsx
│   ├── PlatformDesktop.jsx
│   ├── PlatformCloud.jsx
│   └── PlatformCLI.jsx
├── products/
│   ├── Products.jsx              (overview)
│   ├── NexDocs/
│   │   ├── NexDocs.jsx
│   │   ├── NexDocsViewer.jsx
│   │   ├── NexDocsEditor.jsx
│   │   └── NexDocsGenerator.jsx
│   ├── NexReq.jsx
│   ├── NexTest.jsx
│   ├── NexViz.jsx
│   ├── NexAnalytics.jsx
│   ├── NexTrade.jsx
│   ├── NexVar.jsx
│   ├── NexSim.jsx
│   └── NexSuite.jsx
├── editions/
│   ├── Editions.jsx
│   ├── EditionEssential.jsx
│   ├── EditionStandard.jsx
│   ├── EditionPlatform.jsx
│   └── EditionPlatformFull.jsx
├── compliance/
│   ├── Compliance.jsx
│   ├── ComplianceSystemsEngineering.jsx
│   ├── ComplianceAutomotiveSafety.jsx
│   ├── ComplianceAutomotiveSecurity.jsx
│   ├── ComplianceAutomotiveComplete.jsx
│   ├── ComplianceAviation.jsx
│   ├── ComplianceMedical.jsx
│   └── ComplianceRailway.jsx
└── features/
    └── LSPFeatures.jsx
```

### Phase 3: Component Extraction (3-4 hours)
Extract reusable components:
```
src/components/product/
├── ProductCard/
│   ├── ProductCard.jsx
│   └── ProductCard.css
├── PlatformCard/
│   ├── PlatformCard.jsx
│   └── PlatformCard.css
├── ComplianceCard/
│   ├── ComplianceCard.jsx
│   └── ComplianceCard.css
├── EditionCard/
│   ├── EditionCard.jsx
│   └── EditionCard.css
├── FeatureGrid/
│   ├── FeatureGrid.jsx
│   └── FeatureGrid.css
├── ComparisonTable/
│   ├── ComparisonTable.jsx
│   └── ComparisonTable.css
└── ROICalculator/
    ├── ROICalculator.jsx
    └── ROICalculator.css
```

### Phase 4: Content Creation (4-6 hours)
1. Write detailed content for each sub-page
2. Create screenshots/diagrams for each product
3. Write use cases and examples
4. Add pricing calculators

### Phase 5: Navigation & UX (2-3 hours)
1. Update Header with mega-menu navigation
2. Add breadcrumbs to sub-pages
3. Add "Related Products" sections
4. Add search functionality
5. Update sitemap

### Phase 6: SEO & Metadata (1-2 hours)
1. Add meta tags for each page
2. Create SEO-friendly URLs
3. Add structured data (Schema.org)
4. Update robots.txt and sitemap.xml
5. Add Open Graph tags for social sharing

---

## Success Metrics

### Code Quality
- ✅ No page > 300 lines
- ✅ Reusable components > 10
- ✅ Data centralization 100%
- ✅ Clear separation of concerns

### User Experience
- ✅ Easy to find specific products
- ✅ Deep linking to specific content
- ✅ Clear navigation hierarchy
- ✅ Fast page loads (<2 seconds)

### SEO
- ✅ Each product has dedicated URL
- ✅ Improved search rankings
- ✅ Better social sharing
- ✅ Reduced bounce rate

### Business
- ✅ Higher conversion rates
- ✅ More accurate analytics
- ✅ Better lead qualification
- ✅ Clearer pricing information

---

## Estimated Timeline

| Phase | Description | Time | Status |
|-------|-------------|------|--------|
| Phase 1 | Data Separation | 1-2 hours | ✅ DONE |
| Phase 2 | Routing & Pages | 2-3 hours | ⏳ Ready |
| Phase 3 | Components | 3-4 hours | ⏳ Ready |
| Phase 4 | Content | 4-6 hours | ⏳ Ready |
| Phase 5 | Navigation | 2-3 hours | ⏳ Ready |
| Phase 6 | SEO | 1-2 hours | ⏳ Ready |
| **Total** | | **13-20 hours** | **5% Complete** |

---

## Next Steps

**Option A - Start Phase 2 Now (Recommended)**
1. Create routing structure
2. Create overview page
3. Create platforms index page
4. Create products index page
5. Test navigation flow

**Option B - Plan & Design First**
1. Create detailed wireframes
2. Design navigation menus
3. Write content outlines
4. Get stakeholder approval
5. Then implement

**Which would you prefer?**
