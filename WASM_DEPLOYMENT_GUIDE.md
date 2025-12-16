# WASM Deployment Issues & Solutions

**Date**: December 16, 2025
**Issue**: UVL demo not working - WASM module returns 404

## Problem Analysis

### Error Message
```
Failed to load resource: the server responded with a status of 404
https://sysnexlabs.github.io/sysnex-labs.github.io/assets/wasm/sysml_wasm_bridge.js
```

### Root Cause
The WASM module is failing to load in the deployed GitHub Pages site. The files exist in `dist/wasm/` but the browser is trying to load from an incorrect path.

---

## Quick Test (Local Development)

First, test if the fixes work locally:

```bash
cd /Users/schauanr/Documents/sysnex/pages/sysnex-labs.github.io

# Start development server
npm run dev

# Open browser to:
# http://localhost:5173/try-yourself

# Check console for:
# - "[useUvlWasm] Calling parse_uvl with code length: XXX"
# - "[UvlSection] ✅ parseUvl returned: {root: {...}}"
# - Feature diagram should render
```

**Expected Result**: Feature diagram should display with Vehicle example (4 nodes)

---

## Diagnostic Tools

### 1. Debug Page
Open: `http://localhost:5173/debug-wasm.html` (or deployed version)

This page will:
- ✅ Test all possible WASM path combinations
- ✅ Try loading WASM module with different strategies
- ✅ Test `parse_uvl` function if module loads
- ✅ Display detailed error messages

### 2. Console Debugging
Check browser console for:
```javascript
[useUvlWasm] parse_uvl not available  // ← WASM not loaded
[UvlSection] 📝 Calling parseUvl...    // ← Parse triggered
[UvlSection] ⚠️ parseUvl returned null // ← Parse failed
[FeatureDiagram] No featureTree provided // ← No data to render
```

---

## Deployment Issues

### Issue 1: WASM Files in Wrong Location

**Symptom**: 404 error when loading WASM
**Cause**: Files in `dist/wasm/` but trying to load from `assets/wasm/`

**Solution**: Check vite.config.js build settings:
```javascript
build: {
  assetsDir: 'assets',
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        if (assetInfo.name && assetInfo.name.endsWith('.wasm')) {
          return 'wasm/[name][extname]'  // ← Keep WASM in wasm/
        }
        return 'assets/[name]-[hash][extname]'
      }
    }
  }
}
```

### Issue 2: GitHub Pages Base Path

**Symptom**: WASM loads locally but not on GitHub Pages
**Cause**: GitHub Pages serves from `/sysnex-labs.github.io/` subdirectory

**Current Config**:
```javascript
base: './',  // Relative paths (should work)
```

**Alternative** (if relative paths don't work):
```javascript
base: '/sysnex-labs.github.io/',  // Absolute GitHub Pages path
```

Then update hooks to use:
```javascript
// In useSysMLWasm.js and useUvlWasm.js
if (import.meta.env.PROD) {
  wasmJsPath = '/sysnex-labs.github.io/wasm/sysml_wasm_bridge.js'
  wasmBinaryPath = '/sysnex-labs.github.io/wasm/sysml_wasm_bridge_bg.wasm'
}
```

### Issue 3: CORS / MIME Type Issues

**Symptom**: WASM loads but fails to initialize
**Cause**: Server not serving `.wasm` files with correct MIME type

**Solution**: Add `.nojekyll` file to disable Jekyll processing (already done)

Check response headers:
```
Content-Type: application/wasm  ← Should be present
```

---

## Rebuild & Redeploy

### Step 1: Rebuild WASM Module
```bash
cd /Users/schauanr/Documents/sysnex/sysmlv2_rust_extension/crates/wasm-bridge

# Clean build
rm -rf pkg/
wasm-pack build --target web --out-dir pkg

# Check output
ls -lh pkg/
# Should show:
# - sysml_wasm_bridge.js
# - sysml_wasm_bridge_bg.wasm (should be ~4MB)
# - sysml_wasm_bridge.d.ts
```

### Step 2: Copy WASM to Website
```bash
cd /Users/schauanr/Documents/sysnex/pages/sysnex-labs.github.io

# Copy from WASM bridge to website
cp -r /Users/schauanr/Documents/sysnex/sysmlv2_rust_extension/crates/wasm-bridge/pkg/* src/wasm/

# Also copy to public (for immediate use)
cp -r /Users/schauanr/Documents/sysnex/sysmlv2_rust_extension/crates/wasm-bridge/pkg/* public/wasm/
```

### Step 3: Rebuild Website
```bash
cd /Users/schauanr/Documents/sysnex/pages/sysnex-labs.github.io

# Clean build
rm -rf dist/
npm run build

# Verify WASM files copied
ls -lh dist/wasm/
# Should show:
# - sysml_wasm_bridge.js
# - sysml_wasm_bridge_bg.wasm (~4MB)
```

### Step 4: Test Locally Before Deploy
```bash
# Serve dist folder locally
npx serve dist

# Open browser to:
# http://localhost:3000/try-yourself

# Test UVL demo - should work now
```

### Step 5: Deploy to GitHub Pages
```bash
# Commit changes
git add .
git commit -m "fix: Update WASM deployment for UVL demo"
git push origin main

# GitHub Actions should auto-deploy
# Check deployment at: https://sysnexlabs.github.io/sysnex-labs.github.io/try-yourself
```

---

## Verification Checklist

After deployment, verify:

- [ ] Open https://sysnexlabs.github.io/sysnex-labs.github.io/try-yourself
- [ ] Check browser console - should NOT see 404 errors
- [ ] Check console for: `[useUvlWasm] Calling parse_uvl...`
- [ ] Feature diagram should render with Vehicle example
- [ ] Diagram should show 4 nodes: Vehicle → Engine → GasEngine/ElectricMotor
- [ ] Clicking nodes should select/deselect them
- [ ] Switching examples dropdown should work

---

## Fallback: Manual WASM Host

If GitHub Pages WASM loading continues to fail, host WASM files externally:

### Option 1: jsDelivr CDN
```javascript
// In useSysMLWasm.js and useUvlWasm.js
if (import.meta.env.PROD) {
  wasmJsPath = 'https://cdn.jsdelivr.net/gh/sysnex/sysml-wasm@latest/sysml_wasm_bridge.js'
  wasmBinaryPath = 'https://cdn.jsdelivr.net/gh/sysnex/sysml-wasm@latest/sysml_wasm_bridge_bg.wasm'
}
```

### Option 2: Separate GitHub Repository
Create `sysml-wasm` repository with just WASM files:
```
sysml-wasm/
├── sysml_wasm_bridge.js
├── sysml_wasm_bridge_bg.wasm
└── README.md
```

Enable GitHub Pages and reference:
```javascript
wasmJsPath = 'https://sysnexlabs.github.io/sysml-wasm/sysml_wasm_bridge.js'
```

---

## Debug Commands

### Check WASM File Size
```bash
ls -lh dist/wasm/sysml_wasm_bridge_bg.wasm
# Should be ~4MB (3.8MB - 4.2MB)
# If much smaller, WASM module is incomplete
```

### Check File Permissions
```bash
ls -la dist/wasm/
# All files should be readable (r-- permissions)
```

### Test WASM Binary Directly
```bash
# Download from deployed site
curl -I https://sysnexlabs.github.io/sysnex-labs.github.io/wasm/sysml_wasm_bridge_bg.wasm

# Should return:
# HTTP/2 200 OK
# content-type: application/wasm (or application/octet-stream)
# content-length: 4000000+ (should be ~4MB)
```

---

## Known Working Configuration

**Last Verified**: December 16, 2025 (local dev server)

**Environment**:
- Node.js: v18+
- npm: v9+
- Vite: v5.0+
- wasm-pack: v0.12+

**Files**:
- `vite.config.js`: base: './', WASM copy plugin enabled
- `useSysMLWasm.js`: Dynamic import with @vite-ignore
- `useUvlWasm.js`: Dynamic import with @vite-ignore
- `dist/wasm/`: WASM files copied by closeBundle hook

**Test Result**: ✅ Working in development mode (`npm run dev`)

---

## Next Steps

1. **Test locally first**: `npm run dev` → `http://localhost:5173/try-yourself`
2. **Check diagnostic page**: `/debug-wasm.html`
3. **Fix any local issues** before deployment
4. **Rebuild & redeploy** following steps above
5. **Verify on GitHub Pages** using checklist

If issues persist, check GitHub Actions logs for deployment errors.
