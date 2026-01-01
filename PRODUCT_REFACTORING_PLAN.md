# Product Page Refactoring Plan

**Date:** January 1, 2026
**Status:** Proposed
**Current File:** `src/pages/Product.jsx` (1,049 lines)

## Executive Summary

The Product page has grown to **1,049 lines** with mixed concerns (data + presentation + logic). This plan proposes a **phased refactoring approach** to:
- Reduce Product.jsx by **85%** (to ~100-150 lines)
- Extract **10+ reusable components**
- Separate **Tools** and **Features** for better UX
- Improve maintainability and testing

---

## Current State Analysis

### File Structure
- **Data Definitions** (lines 13-241): 4 large arrays
- **Sections** (lines 249-1049): 9 major sections

### Problems Identified
1. ❌ **Too Large**: 1,049 lines in single component
2. ❌ **Mixed Concerns**: Data + Presentation + Logic
3. ❌ **Hard to Maintain**: Changes require navigating huge file
4. ❌ **Duplication**: Repetitive product variant cards
5. ❌ **Poor Reusability**: No component extraction
6. ❌ **Testing Difficulty**: Hard to test individual sections

---

## Proposed Refactoring Strategy

### Phase 1: Data Separation (Priority: HIGH) ⭐

**Create:** `src/data/product/`
```
src/data/product/
├── index.js              # Export barrel
├── differentiators.js    # Key differentiators data
├── variants.js           # Platform variants data
├── lspFeatures.js        # LSP features data
├── editions.js           # Product editions data
└── products/
    ├── index.js          # Export all products
    ├── nexdocs.js        # NexDocs product data
    ├── nexreq.js         # NexReq product data
    ├── nextest.js        # NexTest product data
    ├── nexviz.js         # NexViz product data
    ├── nexanalytics.js   # NexAnalytics product data
    ├── nextrade.js       # NexTrade product data
    ├── nexvar.js         # NexVar product data
    ├── nexsim.js         # NexSim product data
    └── nexsuite.js       # NexSuite product data
```

**Benefits:**
- ✅ Centralized data management
- ✅ Easy to update features
- ✅ Reusable across pages
- ✅ Better version control (smaller diffs)

**Estimated Time:** 1-2 hours

---

### Phase 2: Component Extraction (Priority: HIGH) ⭐

**Create:** `src/components/product/`
```
src/components/product/
├── index.js                    # Export barrel
├── ProductHero/
│   ├── ProductHero.jsx
│   └── ProductHero.css
├── DifferentiatorsSection/
│   ├── DifferentiatorsSection.jsx
│   ├── DifferentiatorsSection.css
│   └── DifferentiatorCard.jsx
├── ArchitectureSection/
│   ├── ArchitectureSection.jsx
│   ├── ArchitectureSection.css
│   ├── ArchitectureModule.jsx
│   └── ArchitectureDiagram.jsx
├── VariantsSection/
│   ├── VariantsSection.jsx
│   ├── VariantsSection.css
│   └── VariantCard.jsx
├── LSPFeaturesSection/
│   ├── LSPFeaturesSection.jsx
│   ├── LSPFeaturesSection.css
│   └── LSPFeatureCard.jsx
├── EditionsSection/
│   ├── EditionsSection.jsx
│   ├── EditionsSection.css
│   └── EditionCard.jsx
├── ProductSuiteSection/
│   ├── ProductSuiteSection.jsx
│   ├── ProductSuiteSection.css
│   ├── ProductSuiteHeader.jsx
│   └── ProductVariantCard.jsx
└── CTASection/
    ├── CTASection.jsx
    └── CTASection.css
```

**Benefits:**
- ✅ Single Responsibility Principle
- ✅ Easier testing (unit tests per component)
- ✅ Better performance (lazy loading)
- ✅ Improved reusability

**Estimated Time:** 6-8 hours (incremental)

---

### Phase 3: Simplified Product.jsx (Priority: MEDIUM)

**New Product.jsx** (estimated ~100-150 lines):
```jsx
import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import {
  ProductHero,
  DifferentiatorsSection,
  ArchitectureSection,
  VariantsSection,
  LSPFeaturesSection,
  EditionsSection,
  ProductSuiteSection,
  CTASection
} from '../components/product'
import './Page.css'
import './Product.css'

const Product = () => {
  const { theme } = useTheme()

  return (
    <div className="page">
      <ProductHero />
      <DifferentiatorsSection />
      <ArchitectureSection theme={theme} />
      <VariantsSection />
      <LSPFeaturesSection />
      <EditionsSection />
      <ProductSuiteSection />
      <CTASection />
    </div>
  )
}

export default Product
```

**Benefits:**
- ✅ Clear page structure (10x smaller)
- ✅ Easy to understand flow
- ✅ Simple to modify order
- ✅ Better code navigation

**Estimated Time:** 1-2 hours

---

### Phase 4: Tools vs Features Separation (Priority: MEDIUM)

#### Option A: Split into Multiple Pages
```
/product          -> Overview page (simplified)
/product/features -> LSP features, editions
/product/tools    -> NexDocs, NexReq, NexTest, etc.
/product/variants -> Platform variants (VS Code, Desktop, Cloud, CLI)
```

**Pros:**
- Better SEO (separate URLs)
- Cleaner navigation
- Faster initial load

**Cons:**
- More complex routing
- More files to maintain

#### Option B: Tab-Based Navigation (Single Page) ⭐ Recommended
```jsx
<ProductPage>
  <Tabs defaultTab="overview">
    <Tab label="Overview">
      <ProductHero />
      <DifferentiatorsSection />
    </Tab>
    <Tab label="Features">
      <LSPFeaturesSection />
      <EditionsSection />
    </Tab>
    <Tab label="Tools">
      <ProductSuiteSection />
    </Tab>
    <Tab label="Variants">
      <VariantsSection />
    </Tab>
  </Tabs>
</ProductPage>
```

**Pros:**
- Better UX (no page reload)
- Easier to implement
- Single URL (good for sharing)

**Cons:**
- Larger initial bundle
- Requires tab component

**Estimated Time:** 2-3 hours

---

## Implementation Roadmap

### Step 1: Data Migration (1-2 hours)
1. Create `src/data/product/` directory structure
2. Move data arrays to separate files
3. Add JSDoc types for documentation
4. Update imports in Product.jsx
5. Test: Verify page still renders correctly

### Step 2: Component Extraction - Phase 1 (2-3 hours)
Start with most reusable components:
1. Create `ProductVariantCard` component
2. Create `LSPFeatureCard` component
3. Create `DifferentiatorCard` component
4. Update Product.jsx to use new components
5. Test: Visual regression testing

### Step 3: Component Extraction - Phase 2 (3-4 hours)
Extract section components:
1. Create `ProductHero` section
2. Create `DifferentiatorsSection`
3. Create `VariantsSection`
4. Create `LSPFeaturesSection`
5. Update Product.jsx
6. Test: Functionality + performance

### Step 4: Component Extraction - Phase 3 (3-4 hours)
Extract complex sections:
1. Create `ArchitectureSection` with diagram
2. Create `ProductSuiteSection` with 9 products
3. Create `EditionsSection`
4. Create `CTASection`
5. Simplify Product.jsx to ~100-150 lines
6. Test: End-to-end testing

### Step 5: Tools/Features Separation (2-3 hours)
1. Decide: Multi-page vs Tabs (Recommended: Tabs)
2. Implement tab component
3. Update navigation structure
4. Add tab content sections
5. Update Header navigation links
6. Test: Navigation + user flow

### Step 6: Optimization (1-2 hours)
1. Add lazy loading for heavy sections
2. Optimize images/assets
3. Add performance monitoring
4. Code splitting optimization
5. Test: Lighthouse scores

**Total Estimated Time:** 13-19 hours

---

## Success Metrics

### Code Quality
- ✅ Product.jsx: 1,049 lines → ~100-150 lines (**85% reduction**)
- ✅ Max component size: <200 lines
- ✅ Reusable components: >10 extracted
- ✅ Data files: <100 lines each

### Developer Experience
- ✅ Time to find feature: <10 seconds
- ✅ Time to update feature: <2 minutes
- ✅ Build time: No regression
- ✅ Bundle size: No significant increase

### User Experience
- ✅ Page load time: <3 seconds
- ✅ Lighthouse score: >90
- ✅ Mobile responsive: 100%
- ✅ Accessibility: WCAG AA

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Breaking existing functionality | High | Medium | Incremental refactoring + comprehensive testing |
| CSS conflicts after extraction | Medium | Medium | Use CSS modules or scoped styles |
| Performance regression | Medium | Low | Lazy loading + code splitting |
| SEO impact (if multi-page) | Low | Low | Maintain same URLs + proper meta tags |
| Increased bundle size | Medium | Low | Code splitting + lazy loading |
| Team confusion during transition | Low | Medium | Good documentation + PR reviews |

---

## Recommended Approach

### Incremental Refactoring (Safest)

**Week 1: Data Separation**
- Day 1-2: Create data directory structure
- Day 3: Move differentiators & variants data
- Day 4: Move LSP features & editions data
- Day 5: Move product suite data

**Week 2: Component Extraction Phase 1**
- Day 1-2: Create card components
- Day 3-4: Test and refine
- Day 5: Code review and merge

**Week 3: Component Extraction Phase 2**
- Day 1-3: Create section components
- Day 4: Integration testing
- Day 5: Code review and merge

**Week 4: Finalization**
- Day 1-2: Simplify Product.jsx
- Day 3: Add tabs/navigation
- Day 4-5: Testing and optimization

---

## Extension Variant Alignment

### Current Website vs Extension Documentation Gap

**Website Shows** (simplified):
- 4 build variants (Essential, Standard, Platform, Platform-Full)
- 5 platform variants (VS Code, Desktop, Cloud, CLI, Compliance)
- Minimal compliance variant detail

**Extension Docs Show** (comprehensive):
- 🔹 **Essential** (Free) - Core LSP only (~25 MB)
- 🔷 **Standard** (Commercial $2.5-4K) - Professional IDE (~35-40 MB) - MISSING ON WEBSITE
- 🔶 **Platform** (Enterprise $5-8K) - Enterprise + domain extensions (~50-60 MB) - MISSING ON WEBSITE
- 🟣 **Platform-Full** (Free Default) - Everything (~60-70 MB)
- 🔧 **Systems Engineering** (Foundation $6-10K) - ISO/IEC 15288 - MISSING ON WEBSITE
- 🛡️ **Automotive/Safety** ($8-12K) - ASPICE + ISO 26262 - SIMPLIFIED ON WEBSITE
- 🔒 **Automotive Security** ($6-10K) - ISO/SAE 21434 - MISSING ON WEBSITE
- 🛡️🔒 **Automotive Complete** ($12-18K) - Bundle - MISSING ON WEBSITE
- 🛩️ **Aviation** ($10-15K) - DO-178C - MENTIONED BUT NOT DETAILED
- 🏥 **Medical** ($8-12K) - IEC 62304 - MENTIONED BUT NOT DETAILED
- 🚂 **Railway** ($8-12K) - EN 50128 - MENTIONED BUT NOT DETAILED

### Required Changes for Alignment

**1. Add Missing Commercial Variants to Website:**
```jsx
// src/data/product/editions.js (NEW FILE)
export const commercialEditions = [
  {
    id: 'essential',
    badge: 'Free',
    title: '🔹 Essential',
    size: '~25 MB',
    price: 'Free',
    description: 'Core LSP features for CI/CD pipelines and lightweight environments.',
    features: [...],
    status: '✅ Production-Ready'
  },
  {
    id: 'standard',
    badge: 'Recommended',
    title: '🔷 Standard',
    size: '~35-40 MB',
    price: '$2,500-$4,000/seat/year',
    description: 'Complete professional IDE with documentation, requirements, analytics.',
    features: [...],
    status: '✅ Production-Ready'
  },
  {
    id: 'platform',
    badge: 'Enterprise',
    title: '🔶 Platform',
    size: '~50-60 MB',
    price: '$5,000-$8,000/seat/year',
    description: 'Enterprise platform with VSS, YAML Architecture, UVL Variability.',
    features: [...],
    status: '✅ Production-Ready'
  },
  {
    id: 'platform-full',
    badge: 'Default',
    title: '🟣 Platform-Full',
    size: '~60-70 MB',
    price: 'Free (Open Source)',
    description: 'All features including constraints, execution engine, ASPICE work products.',
    features: [...],
    status: '🟡 70% Ready'
  }
]
```

**2. Add Compliance Variants:**
```jsx
// src/data/product/complianceVariants.js (NEW FILE)
export const complianceVariants = [
  {
    id: 'systems-engineering',
    badge: 'Foundation',
    title: '🔧 Systems Engineering',
    size: '~75-80 MB',
    price: '$6,000-$10,000/seat/year',
    description: 'ISO/IEC 15288 foundation for all compliance variants.',
    standards: ['ISO/IEC 15288'],
    features: [...],
    status: '🟡 80% Ready (Phase 0 Complete, 53% → 95% by Q1 2026)',
    industries: ['All compliance variant users', 'Systems engineering consultancies']
  },
  {
    id: 'automotive-safety',
    badge: 'Automotive',
    title: '🛡️ Automotive/Safety',
    size: '~80-90 MB',
    price: '$8,000-$12,000/seat/year',
    description: 'ASPICE Level 2/3 compliance + ISO 26262 functional safety.',
    standards: ['ISO 15288', 'ASPICE', 'ISO 26262'],
    features: [...],
    status: '🟡 45% Ready',
    industries: ['Automotive OEMs', 'Tier 1 Suppliers', 'EV Manufacturers', 'Autonomous Vehicle Companies']
  },
  {
    id: 'automotive-security',
    badge: 'Automotive',
    title: '🔒 Automotive Security',
    size: '~85-95 MB',
    price: '$6,000-$10,000/seat/year',
    description: 'ISO/SAE 21434 cybersecurity + UNECE WP.29 compliance.',
    standards: ['ISO 15288', 'ISO/SAE 21434', 'UNECE WP.29'],
    features: [...],
    status: '❌ Planned Q3 2026',
    industries: ['Automotive OEMs (cybersecurity)', 'Automotive Cybersecurity Consultancies', 'V2X Providers']
  },
  {
    id: 'automotive-complete',
    badge: 'Bundle',
    title: '🛡️🔒 Automotive Complete',
    size: '~95-105 MB',
    price: '$12,000-$18,000/seat/year (25-30% bundle discount)',
    description: 'Complete automotive compliance: Safety + Security + ASPICE.',
    standards: ['ISO 15288', 'ASPICE', 'ISO 26262', 'ISO/SAE 21434'],
    features: [...],
    status: '❌ Planned Q1 2027',
    industries: ['Automotive OEMs (Full)', 'Tier 1 Suppliers (Full)']
  },
  {
    id: 'aviation',
    badge: 'Aviation',
    title: '🛩️ Aviation',
    size: '~90-100 MB',
    price: '$10,000-$15,000/seat/year',
    description: 'DO-178C, DO-331, DO-330 compliance for avionics and aircraft systems.',
    standards: ['ISO 15288', 'DO-178C', 'DO-331', 'DO-330'],
    features: [...],
    status: '❌ Planned Q4 2026',
    industries: ['Avionics Suppliers', 'Aircraft OEMs', 'UAV Manufacturers', 'Military Aerospace']
  },
  {
    id: 'medical',
    badge: 'Medical',
    title: '🏥 Medical',
    size: '~85-95 MB',
    price: '$8,000-$12,000/seat/year',
    description: 'IEC 62304, IEC 62366, ISO 14971 for medical device development.',
    standards: ['ISO 15288', 'IEC 62304', 'IEC 62366', 'ISO 14971'],
    features: [...],
    status: '❌ Planned Q2 2028',
    industries: ['Medical Device Manufacturers', 'IVD Companies', 'Digital Health Startups']
  },
  {
    id: 'railway',
    badge: 'Railway',
    title: '🚂 Railway',
    size: '~85-95 MB',
    price: '$8,000-$12,000/seat/year',
    description: 'EN 50128, EN 50126, EN 50129 for railway signaling and control systems.',
    standards: ['ISO 15288', 'EN 50128', 'EN 50126', 'EN 50129'],
    features: [...],
    status: '❌ Planned Q3 2028',
    industries: ['Railway Signaling', 'Train Control Systems', 'Metro Operators']
  }
]
```

**3. Update Website Sections:**
- **Editions Section**: Show all 4 commercial editions (Essential, Standard, Platform, Platform-Full)
- **Compliance Section**: NEW section showing 7 compliance variants
- **Pricing Page**: Add detailed pricing table with ROI calculations
- **Features Page**: Add compliance-specific features

### Refactoring Priority Update

**Phase 0: Variant Alignment (Priority: CRITICAL) ⭐⭐⭐**
- Create `src/data/product/complianceVariants.js`
- Update `src/data/product/editions.js` with commercial pricing
- Add compliance section to Product page
- Update pricing page with variant comparison table
- **Estimated Time:** 2-3 hours
- **Impact:** HIGH - Critical for sales alignment

**Then proceed with original phases 1-4...**

---

## Questions for Decision

1. **Timing**: Start now or schedule for later?
2. **Scope**: Start with variant alignment (Phase 0) or go straight to refactoring?
3. **Navigation**: Multi-page or tab-based for Tools/Features? (Recommend: Tabs)
4. **Compliance Variants**: Show all 7 variants or only production-ready ones?
5. **Pricing**: Display prices publicly or "Contact Sales"?

---

## Next Steps

### Option A - Start with Variant Alignment (Recommended) ⭐
**Today:**
1. Create `src/data/product/complianceVariants.js`
2. Update website to show all 11 variants (4 commercial + 7 compliance)
3. Add compliance section to Product page
4. Test and commit

**Benefits:** Critical for sales alignment, enables accurate marketing

### Option B - Full Refactoring
**Today:**
1. Do variant alignment (Phase 0)
2. Then proceed with data separation (Phase 1)
3. Extract components (Phase 2)
4. Test frequently, commit often

**Benefits:** Complete overhaul, best long-term outcome

### Option C - Plan First
**Today:**
1. Review this updated plan
2. Adjust priorities based on business needs
3. Schedule dedicated refactoring session

**Benefits:** More thorough planning, stakeholder alignment

---

## Conclusion

This refactoring will transform the Product page from a **1,049-line monolith** into a **well-organized, maintainable architecture** with:
- **Clean separation of concerns**
- **Accurate variant representation** (11 total variants aligned with extension docs)
- **Reusable components**
- **Better developer experience**
- **Sales-ready compliance information**
- **Improved performance**
- **Easier testing**

**Recommended First Step:**
1. **Phase 0: Variant Alignment** (2-3 hours) - Critical for accurate sales/marketing
2. **Phase 1: Data Separation** (1-2 hours) - Low-risk, high-value foundation

**Ready to begin?** Let me know which approach you prefer!
