# Contributing Guide - SysNex Website

This guide explains how to edit content, icons, and pages on the SysNex website.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Quick Start](#quick-start)
3. [Editing Icons](#editing-icons)
4. [Editing Page Content](#editing-page-content)
5. [Adding New Pages](#adding-new-pages)
6. [Translations](#translations)
7. [Building & Testing](#building--testing)
8. [Deployment](#deployment)
9. [Common Patterns](#common-patterns)
10. [Troubleshooting](#troubleshooting)

---

## Project Structure

```
sysnex-labs.github.io/
├── assets/                          # Icon and image assets
│   ├── icon_*.svg/png              # Product icons (9 products)
│   ├── feature_*.svg/png           # Feature icons (6 features)
│   ├── capability_*.svg/png        # Capability icons (6 capabilities)
│   ├── role_*.svg/png              # Role icons (6 roles)
│   ├── industry_*.svg/png          # Industry icons (4 industries)
│   ├── platform_*.svg/png          # Platform icons (3 platforms)
│   ├── misc_*.svg/png              # Miscellaneous icons (3 misc)
│   └── hero_*.svg/png              # Hero background images (7 pages)
├── src/
│   ├── components/                 # Reusable React components
│   ├── data/                       # Centralized data files
│   │   └── product/
│   │       ├── products.js         # Product definitions
│   │       ├── differentiators.js  # Feature differentiators
│   │       └── editions.js         # Edition/pricing data
│   ├── pages/                      # Page components
│   │   ├── Home.jsx                # Homepage
│   │   ├── overview/Overview.jsx   # Product overview
│   │   ├── Product.jsx             # Product architecture
│   │   ├── products/               # Individual product pages
│   │   ├── Competences.jsx         # Tool capabilities
│   │   ├── Tools.jsx               # Development tools
│   │   ├── OwnTooling.jsx          # Office Suite features
│   │   └── ...
│   ├── styles/                     # Global styles
│   └── utils/                      # Utility functions (i18n, etc.)
├── i18n.js                         # Translations (English/German)
├── package.json                    # Dependencies
└── vite.config.js                  # Build configuration
```

---

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed

### Setup

```bash
# Clone the repository
git clone https://github.com/sysnexlabs/sysnexlabs.github.io.git
cd sysnexlabs.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

---

## Editing Icons

### Icon Asset Locations

All icons are stored in `/assets/` with both PNG and SVG formats:

| Category | Path Pattern | Count | Usage |
|----------|-------------|-------|-------|
| Product Icons | `icon_*.svg` | 9 × 2 | Product cards, detail pages |
| Feature Icons | `feature_*.svg` | 6 × 2 | Differentiators, feature lists |
| Capability Icons | `capability_*.svg` | 6 × 2 | Modern dev experience |
| Role Icons | `role_*.svg` | 6 × 2 | User personas |
| Industry Icons | `industry_*.svg` | 4 × 2 | Target industries |
| Platform Icons | `platform_*.svg` | 3 × 2 | Platform showcase |
| Misc Icons | `misc_*.svg` | 3 × 2 | Safety, deployment, MBSE |
| Hero Backgrounds | `hero_*.svg` | 7 × 2 | Page hero sections |

**Total: 88 files (44 PNG + 44 SVG)**

### Adding a New Icon

1. **Prepare your icon:**
   - Size: 512×512px max
   - Format: PNG with transparent background
   - Naming: Use category prefix (e.g., `feature_`, `icon_`)

2. **Process the icon:**

```python
from PIL import Image

def optimize_icon(input_png, output_prefix, max_size=512):
    # Remove background
    img = Image.open(input_png).convert("RGBA")
    datas = img.getdata()
    new_data = []

    for item in datas:
        r, g, b, a = item
        # Make white/light backgrounds transparent
        if a < 200 or (r > 240 and g > 240 and b > 240):
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)

    # Save PNG
    img.save(f"assets/{output_prefix}.png", "PNG", optimize=True)

    # Create SVG wrapper
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{img.width}" height="{img.height}">
  <image width="{img.width}" height="{img.height}" xlink:href="{output_prefix}.png"/>
</svg>'''

    with open(f"assets/{output_prefix}.svg", "w") as f:
        f.write(svg_content)

# Example usage
optimize_icon("my_new_icon.png", "feature_new_feature")
```

3. **Copy to assets:**

```bash
cp feature_new_feature.png assets/
cp feature_new_feature.svg assets/
```

4. **Use in code:**

```jsx
// In your component
const icon = '/assets/feature_new_feature.svg'

// Render with standard pattern
{typeof icon === 'string' && icon.startsWith('/assets/') ? (
  <img
    src={icon}
    alt="New Feature"
    style={{height: '120px', width: 'auto', maxWidth: '120px', objectFit: 'contain'}}
  />
) : (
  icon
)}
```

### Replacing an Existing Icon

1. **Find the icon file:**
```bash
ls assets/ | grep icon_nexdocs
# Output: icon_nexdocs.png, icon_nexdocs.svg
```

2. **Replace with new version** (keep same name):
```bash
cp new_nexdocs_icon.png assets/icon_nexdocs.png
cp new_nexdocs_icon.svg assets/icon_nexdocs.svg
```

3. **Rebuild:**
```bash
npm run build
```

The icon will automatically update everywhere it's used.

---

## Editing Page Content

### Centralized Data Files

Most content is stored in data files for easy editing without touching React code:

#### Product Information (`src/data/product/products.js`)

```javascript
export const products = [
  {
    id: 'nexdocs',
    icon: '/assets/icon_nexdocs.svg',
    title: 'NexDocs',
    subtitle: 'Documentation Generator',
    badge: 'Professional',
    status: 'production',
    description: 'Generate professional MkDocs-style documentation...',
    features: [
      'Hierarchical documentation structure',
      'Automatic diagram generation',
      // Add more features here
    ],
    pricing: '$19/month (billed annually)',
    // ... more fields
  },
  // ... more products
]
```

**To edit a product:**
1. Open `src/data/product/products.js`
2. Find the product by `id`
3. Edit the fields (title, description, features, etc.)
4. Save and rebuild

#### Feature Differentiators (`src/data/product/differentiators.js`)

```javascript
export const differentiators = [
  {
    icon: '/assets/feature_multi_platform.svg',
    title: 'Multi-Platform Delivery',
    description: 'Deploy to VS Code Extension, Desktop App...',
    details: [
      'VS Code Extension (85% complete)',
      // Edit details here
    ]
  },
  // ... more differentiators
]
```

#### Pricing/Editions (`src/data/product/editions.js`)

```javascript
export const editions = [
  {
    name: 'Essential',
    price: 'Free',
    description: 'Free forever for individuals',
    features: [
      'Core SysML v2 IDE features',
      // Edit features here
    ]
  },
  // ... more editions
]
```

### Page-Specific Content

For content that's unique to a page, edit the page component directly:

#### Homepage (`src/pages/Home.jsx`)

```jsx
// Find Your Path section
const roles = [
  {
    icon: '/assets/role_developer.svg',
    title: 'Software Engineers',
    description: 'Code-first SysML v2 in VS Code...',
    link: '/tools'
  },
  // Edit roles here
]

// Platform section
const platforms = [
  {
    icon: '/assets/platform_vscode.svg',
    title: 'VS Code Extension',
    description: '85% complete. Full LSP integration...'
  },
  // Edit platforms here
]
```

#### Competences Page (`src/pages/Competences.jsx`)

```jsx
const coreCompetences = [
  {
    icon: '/assets/role_architects.svg',
    title: 'Systems Engineering',
    description: 'Tool capabilities for systems modeling',
    areas: [
      'Requirements engineering',
      // Edit areas here
    ]
  },
  // ... more competences
]
```

#### Tools Page (`src/pages/Tools.jsx`)

```jsx
const highlights = [
  {
    icon: '/assets/misc_deployment.svg',
    title: 'SysML v2 Modeling (Production)',
    description: 'Native SysML v2 support...'
  },
  // Edit highlights here
]
```

### Hero Backgrounds

Hero backgrounds are set via CSS classes:

**File:** `src/pages/Page.css`

```css
/* Hero background definitions */
.hero-overview::before {
  background-image: url('../assets/hero_overview.svg');
}

.hero-products::before {
  background-image: url('../assets/hero_products.svg');
}
```

**Usage in pages:**

```jsx
<section className="page-hero-section hero-overview">
  {/* Page header content */}
</section>
```

**Available hero classes:**
- `hero-overview`
- `hero-products`
- `hero-platforms`
- `hero-compliance`
- `hero-workspaces`
- `hero-resources`
- `hero-solutions`

---

## Adding New Pages

### 1. Create the Page Component

```jsx
// src/pages/NewPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import './Page.css'

const NewPage = () => {
  return (
    <div className="page">
      <section className="page-hero-section hero-yourpage">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Your Page Title</h1>
            <p className="page-hero-description">
              Page description here
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <h2 className="section-title">Section Title</h2>
          {/* Your content */}
        </div>
      </section>
    </div>
  )
}

export default NewPage
```

### 2. Add Route

**File:** `src/App.jsx`

```jsx
import NewPage from './pages/NewPage'

// In the Routes section:
<Route path="/new-page" element={<NewPage />} />
```

### 3. Add to Navigation

**File:** `src/components/Header.jsx`

```jsx
<Link to="/new-page" className="nav-link">New Page</Link>
```

### 4. Add Hero Background (Optional)

**Step 1:** Add hero image to `/assets/hero_newpage.svg`

**Step 2:** Add CSS in `src/pages/Page.css`:

```css
.hero-newpage::before {
  background-image: url('../assets/hero_newpage.svg');
}
```

**Step 3:** Use the class:

```jsx
<section className="page-hero-section hero-newpage">
```

---

## Translations

### Adding/Editing Translations

**File:** `i18n.js`

```javascript
const translations = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      // Add more nav items
    },
    home: {
      hero: {
        title: 'AI-Powered SysML v2 Tooling',
        // Add more home translations
      }
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      products: 'Produkte',
      // Add German translations
    },
    home: {
      hero: {
        title: 'KI-gestützte SysML v2-Tools',
        // Add more German translations
      }
    }
  }
}
```

### Using Translations in Components

```jsx
import { useTranslation } from '../utils/i18n'

const MyComponent = () => {
  const { t } = useTranslation()

  return (
    <h1>{t('home.hero.title')}</h1>
  )
}
```

---

## Building & Testing

### Development Server

```bash
# Start dev server (hot reload enabled)
npm run dev

# Access at http://localhost:5173
```

### Production Build

```bash
# Create optimized production build
npm run build

# Output directory: dist/
```

### Preview Production Build

```bash
# Build first
npm run build

# Preview the build
npm run preview

# Access at http://localhost:4173
```

### Build Verification

After building, verify:

1. **Assets copied correctly:**
```bash
ls dist/assets/ | wc -l
# Should show ~88+ files
```

2. **No errors in build output:**
```bash
npm run build 2>&1 | grep -i error
# Should show nothing
```

3. **File sizes reasonable:**
```bash
du -sh dist/
# Should be ~5-10MB total
```

---

## Deployment

### GitHub Pages (Current Setup)

The site auto-deploys on push to `main` branch via GitHub Actions.

**Manual deployment:**

```bash
# Build
npm run build

# Deploy to gh-pages branch
npm run deploy
```

### Deployment Checklist

Before pushing to main:

- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors in browser
- [ ] All icons display correctly
- [ ] Responsive design works (mobile/tablet/desktop)
- [ ] Translations work (toggle language in header)
- [ ] Links navigate correctly

### Post-Deployment Verification

After deployment, check:

1. **Live site:** https://sysnexlabs.github.io
2. **All assets load** (check browser console)
3. **Navigation works**
4. **No 404 errors**

---

## Common Patterns

### Icon Rendering Pattern

**Standard pattern used throughout the site:**

```jsx
{typeof icon === 'string' && icon.startsWith('/assets/') ? (
  <img
    src={icon}
    alt="Icon Description"
    style={{height: '120px', width: 'auto', maxWidth: '120px', objectFit: 'contain'}}
  />
) : (
  icon  // Fallback for emoji or JSX
)}
```

**Why this pattern?**
- Supports both image paths and emoji fallbacks
- Validates path format before rendering
- Consistent 120px height across all icons (width adjusts to maintain aspect ratio)
- Maximum width of 120px prevents very wide icons from being too large
- `objectFit: 'contain'` preserves aspect ratio

### Card Grid Pattern

```jsx
<div className="features-grid">
  {features.map((feature, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <SpotlightCard>
        <div className="card-icon">{feature.icon}</div>
        <h3 className="card-title">{feature.title}</h3>
        <p className="card-description">{feature.description}</p>
      </SpotlightCard>
    </motion.div>
  ))}
</div>
```

### Section Structure Pattern

```jsx
<section className="page-content-section">
  <div className="container">
    <div className="section-header">
      <h2 className="section-title">Section Title</h2>
      <p className="section-subtitle">Section description</p>
    </div>
    {/* Section content */}
  </div>
</section>
```

**Alternating background colors:**
- `page-content-section` - White/dark background
- `page-section-alt` - Light gray/darker background

---

## Troubleshooting

### Common Issues

#### 1. Icons Not Displaying

**Symptoms:** Broken image icons or emojis instead of custom icons

**Solution:**
```bash
# Check if icon file exists
ls assets/icon_name.svg

# Verify path in code
grep -r "icon_name" src/

# Rebuild
npm run build
```

#### 2. Build Fails with "Cannot resolve"

**Symptoms:** Error like `Could not resolve "./SomeFile.css"`

**Solution:**
```bash
# Check file exists
ls src/path/to/SomeFile.css

# Check import statement matches exact filename (case-sensitive)
# Rename file if needed
mv SomeFile.module.css SomeFile.css
```

#### 3. Styles Not Applying

**Symptoms:** Page looks unstyled or wrong

**Solution:**
```bash
# Check CSS import in component
# Should be: import './Page.css'

# Clear cache and rebuild
rm -rf dist/
npm run build
```

#### 4. Translation Missing

**Symptoms:** Shows translation key instead of text (e.g., "home.hero.title")

**Solution:**
```javascript
// Add missing translation to i18n.js
const translations = {
  en: {
    home: {
      hero: {
        title: 'Your Title Here'  // Add this
      }
    }
  }
}
```

#### 5. Page Not Found (404)

**Symptoms:** 404 error when navigating to a page

**Solution:**
```jsx
// Add route to App.jsx
<Route path="/your-page" element={<YourPage />} />

// Rebuild and redeploy
npm run build
```

### Getting Help

1. **Check browser console** for errors (F12)
2. **Check build output** for warnings
3. **Compare with working pages** for patterns
4. **Search codebase** for similar implementations:
   ```bash
   grep -r "pattern" src/
   ```

---

## Development Tips

### Fast Iteration

1. **Keep dev server running** (`npm run dev`) for hot reload
2. **Use browser dev tools** (F12) to test CSS changes
3. **Test on multiple screen sizes** (responsive design toggle in browser)

### Code Organization

- **Data files** for content that changes frequently
- **Components** for reusable UI elements
- **Pages** for route-specific content
- **Styles** for global CSS and themes

### Performance

- **Optimize images** before adding (512×512px max)
- **Use SVG** when possible (smaller than PNG)
- **Lazy load** large components if needed
- **Test build size** regularly (`du -sh dist/`)

### Quality Checks

Before committing:

```bash
# Build succeeds
npm run build

# No errors in browser console
# Check at http://localhost:5173

# Format is consistent
# (Add prettier/eslint if needed)
```

---

## Version Control

### Git Workflow

```bash
# Pull latest changes
git pull

# Make your changes
# ... edit files ...

# Check what changed
git status
git diff

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add new feature icon and update Tools page"

# Push to remote
git push
```

### Commit Message Format

```
<type>: <short description>

<longer description if needed>

- List of changes
- Another change
```

**Example:**
```
Add healthcare industry icon and update IndustrySolutions

- Created industry_healthcare.svg icon
- Updated IndustrySolutions.jsx with healthcare case study
- Optimized icon to 42KB with transparent background
```

---

## Asset Guidelines

### Icon Standards

- **Size:** 512×512px maximum
- **Format:** PNG (source) + SVG (wrapper)
- **Background:** Transparent
- **File size:** < 100KB per icon
- **Presentation:** 120×120px in browser

### Image Optimization

```python
from PIL import Image

def optimize_for_web(input_path, output_path, max_size=512):
    img = Image.open(input_path).convert("RGBA")
    img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
    img.save(output_path, "PNG", optimize=True)
```

### Naming Conventions

- **Products:** `icon_product_name.svg` (e.g., `icon_nexdocs.svg`)
- **Features:** `feature_name.svg` (e.g., `feature_ai_first.svg`)
- **Capabilities:** `capability_name.svg` (e.g., `capability_wasm.svg`)
- **Roles:** `role_name.svg` (e.g., `role_developer.svg`)
- **Industries:** `industry_name.svg` (e.g., `industry_automotive.svg`)
- **Platforms:** `platform_name.svg` (e.g., `platform_vscode.svg`)
- **Misc:** `misc_name.svg` (e.g., `misc_safety.svg`)
- **Heroes:** `hero_page_name.svg` (e.g., `hero_overview.svg`)

---

## Summary

**Key Files to Edit:**
- **Product info:** `src/data/product/products.js`
- **Features:** `src/data/product/differentiators.js`
- **Pricing:** `src/data/product/editions.js`
- **Translations:** `i18n.js`
- **Icons:** `/assets/` directory
- **Page content:** `src/pages/*.jsx`
- **Styles:** `src/pages/Page.css`, component-specific CSS

**Build Commands:**
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

**Deployment:**
- Push to `main` branch auto-deploys via GitHub Actions
- Manual: `npm run deploy`

---

For questions or issues, check the troubleshooting section or review similar implementations in the codebase.
