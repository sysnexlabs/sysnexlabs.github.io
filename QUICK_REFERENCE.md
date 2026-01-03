# Quick Reference Guide

Fast reference for common editing tasks.

---

## 🚀 Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 📝 Common Edits

### Edit Product Information

**File:** `src/data/product/products.js`

```javascript
{
  id: 'nexdocs',
  icon: '/assets/icon_nexdocs.svg',
  title: 'NexDocs',
  description: 'Your description here',
  features: ['Feature 1', 'Feature 2'],
  pricing: '$19/month'
}
```

### Edit Features/Differentiators

**File:** `src/data/product/differentiators.js`

```javascript
{
  icon: '/assets/feature_name.svg',
  title: 'Feature Title',
  description: 'Feature description'
}
```

### Edit Pricing/Editions

**File:** `src/data/product/editions.js`

```javascript
{
  name: 'Essential',
  price: 'Free',
  features: ['Feature 1', 'Feature 2']
}
```

### Edit Homepage Content

**File:** `src/pages/Home.jsx`

Look for these data arrays:
- `roles` - Find Your Path section
- `platforms` - Platform showcase
- `industries` - Mission-critical industries

### Edit Translations

**File:** `i18n.js`

```javascript
const translations = {
  en: { /* English translations */ },
  de: { /* German translations */ }
}
```

---

## 🎨 Icon Locations

```
/assets/
├── icon_*.svg           # Product icons (9)
├── feature_*.svg        # Feature icons (6)
├── capability_*.svg     # Capability icons (6)
├── role_*.svg           # Role icons (6)
├── industry_*.svg       # Industry icons (4)
├── platform_*.svg       # Platform icons (3)
├── misc_*.svg           # Misc icons (3)
└── hero_*.svg           # Hero backgrounds (7)
```

**Total: 88 files (44 PNG + 44 SVG)**

---

## 🖼️ Adding a New Icon

1. **Prepare:** 512×512px PNG with transparent background
2. **Optimize:**
```python
from PIL import Image

img = Image.open("input.png").convert("RGBA")
img.thumbnail((512, 512), Image.Resampling.LANCZOS)
img.save("assets/icon_name.png", "PNG", optimize=True)
```
3. **Copy:** `cp icon_name.png assets/`
4. **Use:** `icon: '/assets/icon_name.svg'`

---

## 📄 Page Components

```
src/pages/
├── Home.jsx              # Homepage
├── overview/Overview.jsx # Product overview
├── Product.jsx           # Product architecture
├── products/             # Individual product pages
│   ├── nexdocs/NexDocs.jsx
│   ├── nexreq/NexReq.jsx
│   └── ... (9 total)
├── Competences.jsx       # Tool capabilities
├── Tools.jsx             # Development tools
├── OwnTooling.jsx        # Office Suite
└── ...
```

---

## 🎯 Icon Rendering Pattern

```jsx
{typeof icon === 'string' && icon.startsWith('/assets/') ? (
  <img
    src={icon}
    alt="Description"
    style={{width: '120px', height: '120px', objectFit: 'contain'}}
  />
) : (
  icon
)}
```

Use this pattern everywhere for consistent icon display.

---

## 🏗️ Section Structure

```jsx
<section className="page-content-section">
  <div className="container">
    <div className="section-header">
      <h2 className="section-title">Title</h2>
      <p className="section-subtitle">Subtitle</p>
    </div>
    {/* Content */}
  </div>
</section>
```

**Background variants:**
- `page-content-section` - White/dark
- `page-section-alt` - Gray/darker

---

## 🎨 Hero Backgrounds

**CSS:** `src/pages/Page.css`

```css
.hero-overview::before {
  background-image: url('../assets/hero_overview.svg');
}
```

**Usage:**
```jsx
<section className="page-hero-section hero-overview">
```

**Available:**
- `hero-overview`
- `hero-products`
- `hero-platforms`
- `hero-compliance`
- `hero-workspaces`
- `hero-resources`
- `hero-solutions`

---

## 🔧 Troubleshooting

### Icons not showing?
```bash
ls assets/icon_name.svg    # Check file exists
grep -r "icon_name" src/   # Check usage
npm run build              # Rebuild
```

### Build fails?
```bash
rm -rf dist/ node_modules/
npm install
npm run build
```

### Styles not applying?
- Check CSS import: `import './Page.css'`
- Clear cache: `rm -rf dist/`
- Rebuild: `npm run build`

### Translation missing?
Add to `i18n.js`:
```javascript
en: { key: 'English text' },
de: { key: 'German text' }
```

---

## 📦 Build & Deploy

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Deploy (auto on git push to main)
npm run deploy
```

---

## 📊 File Sizes

| Category | PNG Size | SVG Size |
|----------|----------|----------|
| Product Icons | 42-96KB | 54-128KB |
| Feature Icons | 21-90KB | 29-118KB |
| Other Icons | 30-80KB | 40-106KB |
| Hero Backgrounds | 80-150KB | 105-198KB |

**All icons:** < 100KB average
**Total assets:** ~5-10MB

---

## 🚦 Pre-Commit Checklist

- [ ] `npm run build` succeeds
- [ ] No console errors (F12)
- [ ] All icons display (120×120px)
- [ ] Responsive (mobile/tablet/desktop)
- [ ] Translations work
- [ ] Links navigate correctly

---

## 📁 Key Directories

```
/assets/          # Icons and images (88 files)
/src/data/        # Centralized content data
/src/pages/       # Page components
/src/components/  # Reusable components
/src/styles/      # Global styles
i18n.js           # Translations
```

---

## 🔗 Important Files

| File | Purpose |
|------|---------|
| `src/data/product/products.js` | Product definitions |
| `src/data/product/differentiators.js` | Feature list |
| `src/data/product/editions.js` | Pricing tiers |
| `i18n.js` | Translations (EN/DE) |
| `src/pages/Page.css` | Hero backgrounds |
| `src/App.jsx` | Routes |
| `src/components/Header.jsx` | Navigation |

---

## 💡 Tips

- Keep dev server running for hot reload
- Use browser dev tools (F12) for debugging
- Test on multiple screen sizes
- Optimize images before adding (512×512px max)
- Commit often with clear messages

---

For detailed information, see [CONTRIBUTING.md](./CONTRIBUTING.md)
