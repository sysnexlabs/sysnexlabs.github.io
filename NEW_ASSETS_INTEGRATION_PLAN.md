# New Assets Integration Plan

## Generated Assets Summary

Location: `/assets/sysnex_new_backgrounds_right_oriented/`

### Hero Backgrounds (PNG & SVG available)
Based on filenames, we have approximately 18 background images. Need to identify which corresponds to which page.

**Required Backgrounds (from DALLE_PROMPTS.md):**
1. Overview Page Hero Background
2. Solutions Page Hero Background
3. Products Page Hero Background
4. Platforms Page Hero Background
5. Compliance Page Hero Background
6. Resources Page Hero Background
7. Workspaces Page Hero Background

### Product Icons (PNG & SVG available)
10 icon files found in `icons/` subdirectory.

**Required Icons (from DALLE_PROMPTS.md):**
1. NexDocs - Documentation generation
2. NexReq - Requirements management
3. NexTest - Test management
4. NexViz - Diagram visualization
5. NexAnalytics - Analytics and metrics
6. NexTrade - Trade study analysis
7. NexVar - Variant management
8. NexSim - Simulation and modeling

## Integration Steps

### Step 1: Identify and Rename Assets
- [ ] Map generated backgrounds to pages
- [ ] Map generated icons to products
- [ ] Copy to main `/assets` directory with proper names

### Step 2: Update Components
- [ ] Update hero sections to use new backgrounds
- [ ] Replace product icon badges with actual icons
- [ ] Update image paths in components

### Step 3: Optimize Assets
- [ ] Use WebP versions for better performance where supported
- [ ] Keep PNG/SVG as fallbacks
- [ ] Verify responsive behavior

### Step 4: Test
- [ ] Verify all pages load backgrounds correctly
- [ ] Check dark mode compatibility
- [ ] Test on mobile devices
- [ ] Verify build passes

## Recommended Naming Convention

**Hero Backgrounds:**
- `hero_overview.png` / `hero_overview.svg`
- `hero_solutions.png` / `hero_solutions.svg`
- `hero_products.png` / `hero_products.svg`
- `hero_platforms.png` / `hero_platforms.svg`
- `hero_compliance.png` / `hero_compliance.svg`
- `hero_resources.png` / `hero_resources.svg`
- `hero_workspaces.png` / `hero_workspaces.svg`

**Product Icons:**
- `icon_nexdocs.svg` / `icon_nexdocs.png`
- `icon_nexreq.svg` / `icon_nexreq.png`
- `icon_nextest.svg` / `icon_nextest.png`
- `icon_nexviz.svg` / `icon_nexviz.svg`
- `icon_nexanalytics.svg` / `icon_nexanalytics.png`
- `icon_nextrade.svg` / `icon_nextrade.png`
- `icon_nexvar.svg` / `icon_nexvar.png`
- `icon_nexsim.svg` / `icon_nexsim.png`

## Next Actions

**Immediate:** Please review the generated images and provide guidance on:
1. Which background image should be used for which page
2. Which icon should map to which product
3. Any adjustments needed before integration

**After mapping confirmed:**
1. Copy and rename files to main `/assets` directory
2. Update component imports
3. Add CSS for background positioning
4. Test and verify

## Current Status

- ✅ German translations completed (65 missing keys added + 5 critical hero translations updated)
- ✅ Build verified (6.59s)
- ⏳ Awaiting image mapping guidance from user
