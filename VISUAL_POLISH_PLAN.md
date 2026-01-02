# Visual Polish Plan

**Date**: 2026-01-01
**Status**: In Progress

---

## Completed Updates

### 1. Pricing Page ✅
- **Fixed**: Pricing inconsistency - now uses editions.js data
- **Improvement**: Added link to Editions page for comparison
- **Consistency**: All pricing matches editions.js ($2.5K-$4K/year for Standard, $5K-$8K/year for Platform)
- **Clarity**: Added Platform-Full as free edition
- **Build**: Successful (3.28s build time, no errors)

---

## Visual Polish Checklist

### Typography & Spacing
- [ ] Consistent heading sizes across all pages (h1, h2, h3)
- [ ] Consistent paragraph spacing
- [ ] Consistent section padding (4rem top/bottom)
- [ ] Consistent container max-width (1200px)

### Color & Theming
- [ ] Consistent use of CSS variables
- [ ] Proper dark/light theme support
- [ ] Consistent accent colors (--accent-primary, --brand-cyan)
- [ ] Consistent border colors and radii

### Components
- [ ] Consistent card styling
- [ ] Consistent button styles (primary, ghost, large)
- [ ] Consistent badge styles
- [ ] Consistent table styling
- [ ] Consistent breadcrumb styling

### Animations
- [ ] Consistent framer-motion animations
- [ ] Consistent initial/animate values
- [ ] Consistent stagger delays (0.1-0.2s)
- [ ] Smooth page transitions

### Responsiveness
- [ ] Mobile-first design
- [ ] Tablet breakpoints (768px)
- [ ] Desktop breakpoints (1024px)
- [ ] Proper grid wrapping

---

## Pages to Review

### High Priority
1. **Home.jsx** - Landing page (first impression)
2. **Overview.jsx** - Product overview
3. **Products.jsx** - Product listing
4. **Editions.jsx** - Edition comparison
5. **Workspaces.jsx** - Workspace overview
6. **TryYourself.jsx** - Interactive demo

### Medium Priority
7. **Compliance.jsx** - Standards compliance
8. **Platforms.jsx** - Platform variants
9. **Product.jsx** - Individual product pages
10. **Pricing.jsx** - ✅ Already updated

### Low Priority
11. **About.jsx** - About page
12. **Contact.jsx** - Contact form
13. **Legal.jsx** - Legal pages
14. **Methods.jsx** - Methods page
15. **Tools.jsx** - Tools page

---

## Key Visual Improvements Needed

### 1. Consistent Section Headers
**Current State**: Inconsistent styling
**Target**:
```jsx
<div className="section-header">
  <h2 className="section-title">Title</h2>
  <p className="section-subtitle">Subtitle</p>
</div>
```

### 2. Consistent Card Grid
**Current State**: Varying grid layouts
**Target**:
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

### 3. Consistent Hero Sections
**Current State**: Different hero styles
**Target**:
```jsx
<section className="page-hero-section">
  <div className="container">
    <div className="page-hero-content">
      <div className="hero-badge">Badge</div>
      <h1>Title</h1>
      <p className="page-hero-description">Description</p>
    </div>
  </div>
</section>
```

### 4. Consistent CTAs
**Current State**: Different button styles
**Target**:
```jsx
<div className="cta-content">
  <h2>CTA Heading</h2>
  <p>CTA description</p>
  <div className="cta-buttons">
    <Link to="/link" className="btn primary large">Primary CTA</Link>
    <Link to="/link" className="btn ghost large">Secondary CTA</Link>
  </div>
</div>
```

---

## CSS Variables Review

### Colors
```css
--accent-primary: #00b4d8
--brand-cyan: #00b4d8
--brand-purple: #9333ea
--text-primary: (theme-dependent)
--text-secondary: (theme-dependent)
--bg-primary: (theme-dependent)
--bg-secondary: (theme-dependent)
--border-color: (theme-dependent)
```

### Spacing
```css
--spacing-xs: 0.5rem
--spacing-sm: 1rem
--spacing-md: 2rem
--spacing-lg: 4rem
--spacing-xl: 6rem
```

### Typography
```css
--font-family-base: Inter, system-ui
--font-size-base: 1rem
--font-size-lg: 1.125rem
--font-size-xl: 1.25rem
--font-size-2xl: 1.5rem
--font-size-3xl: 2rem
--font-size-4xl: 2.5rem
```

---

## Animation Standards

### Page Entry
```jsx
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### Card Stagger
```jsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5, delay: index * 0.1 }}
```

### Hover Effects
```jsx
whileHover={{ scale: 1.02, y: -4 }}
transition={{ type: 'spring', stiffness: 300 }}
```

---

## Implementation Strategy

### Phase 1: Core Pages (High Priority) ✅
1. ~~Fix Pricing page~~ ✅ Completed
2. Review and polish Home.jsx
3. Review and polish Overview.jsx
4. Review and polish Products.jsx
5. Review and polish Editions.jsx
6. Review and polish Workspaces.jsx

### Phase 2: Feature Pages (Medium Priority)
7. Review Compliance.jsx
8. Review Platforms.jsx
9. Review TryYourself.jsx

### Phase 3: Supporting Pages (Low Priority)
10. Review About, Contact, Legal, etc.

---

## Success Metrics

- [ ] All pages use consistent section headers
- [ ] All pages use consistent card grids
- [ ] All pages use consistent hero sections
- [ ] All pages use consistent CTA sections
- [ ] All pages have smooth animations
- [ ] All pages are responsive (mobile, tablet, desktop)
- [ ] Build completes with no warnings
- [ ] Visual regression testing passes

---

**Next Steps**: Apply visual improvements to high-priority pages
