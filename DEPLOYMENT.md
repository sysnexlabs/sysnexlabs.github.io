# Deployment Guide - GitHub Pages

## 🎯 Wichtig: Kein Server nötig!

Die "Try Yourself" Seite verwendet **WebAssembly (WASM)**, das komplett im Browser läuft. **Kein LSP-Server, kein Backend, kein WebSocket nötig!**

## Build-Prozess

### Option 1: WASM-Dateien committen (Empfohlen für GitHub Pages)

**Vorteil**: Einfach, keine zusätzliche Konfiguration nötig

1. **WASM Build** (lokal):
```bash
cd sysmlv2_rust_extension/crates/wasm-bridge
wasm-pack build --target web --out-dir ../../../pages/sysnex-labs.github.io/src/wasm
```

2. **WASM-Dateien committen**:
```bash
cd pages/sysnex-labs.github.io
git add src/wasm/
git commit -m "Update WASM module"
git push
```

3. **Frontend Build** (automatisch via GitHub Actions oder lokal):
```bash
npm install
npm run build
```

### Option 2: WASM in CI/CD bauen

**Vorteil**: Immer aktuell, keine manuellen Builds

Die GitHub Actions Workflow-Datei (`.github/workflows/deploy-pages.yml`) versucht automatisch, WASM zu bauen, benötigt aber Zugriff auf das `sysmlv2_rust_extension` Repository.

**Für separate Repositories**: Es ist einfacher, die WASM-Dateien zu committen (Option 1).

**Für Monorepos**: Die Workflow-Datei kann das Parent-Repository checken und WASM automatisch bauen.

### 3. Deployment zu GitHub Pages

#### Option A: Automatisch (GitHub Actions) - Wenn WASM-Dateien committed sind

Die Workflow-Datei ist bereits erstellt: `.github/workflows/deploy-pages.yml`

**Wichtig**: Diese Workflow-Datei funktioniert nur, wenn die WASM-Dateien bereits in `src/wasm/` committed sind.

Wenn du WASM in CI/CD bauen willst, musst du die Workflow-Datei anpassen, um das `sysmlv2_rust_extension` Repository zu checken.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
    paths:
      - 'pages/sysnex-labs.github.io/**'
      - 'sysmlv2_rust_extension/crates/wasm-bridge/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Rust
        uses: dtolnay/rust-toolchain@stable
        with:
          targets: wasm32-unknown-unknown
      
      - name: Install wasm-pack
        run: curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
      
      - name: Build WASM
        run: |
          cd sysmlv2_rust_extension/crates/wasm-bridge
          wasm-pack build --target web --out-dir ../../../pages/sysnex-labs.github.io/src/wasm
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: pages/sysnex-labs.github.io/package-lock.json
      
      - name: Install dependencies
        run: |
          cd pages/sysnex-labs.github.io
          npm ci
      
      - name: Build
        run: |
          cd pages/sysnex-labs.github.io
          npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './pages/sysnex-labs.github.io/dist'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Option B: Manuell

1. **WASM bauen** (siehe oben)
2. **Frontend bauen**: `npm run build`
3. **GitHub Pages konfigurieren**:
   - Repository Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` oder `main` (mit `/dist` als root)
   - Oder: `dist/` Ordner manuell hochladen

## Dateistruktur nach Build

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── wasm/
│   ├── sysml_wasm_bridge.js
│   ├── sysml_wasm_bridge_bg.wasm
│   ├── sysml_wasm_bridge.d.ts
│   └── package.json
└── ... (andere statische Dateien)
```

## Wichtige Konfigurationen

### Vite Config

- `base: './'` - Relative Pfade für GitHub Pages
- WASM-Dateien werden automatisch kopiert
- CORS-Header für WASM (wird automatisch gesetzt)

### WASM Loading

- **Development**: `../wasm/sysml_wasm_bridge.js`
- **Production**: `./wasm/sysml_wasm_bridge.js` (relativ zur Root)

## Browser-Kompatibilität

✅ Chrome/Edge (ab Version 57)  
✅ Firefox (ab Version 52)  
✅ Safari (ab Version 11)  
✅ Mobile Browser (iOS Safari, Chrome Mobile)  

## Performance

- **WASM Binary**: ~1.6MB (komprimiert auf ~600KB mit gzip)
- **Ladezeit**: ~1-2 Sekunden (erste Ladung)
- **Parsing**: <100ms für typische Dateien
- **Memory**: ~10-50MB im Browser

## Troubleshooting

### WASM lädt nicht

1. Prüfe Browser-Konsole (F12)
2. Prüfe, ob WASM-Dateien in `dist/wasm/` vorhanden sind
3. Prüfe Network-Tab für 404-Fehler
4. Prüfe CORS-Header (sollten automatisch gesetzt sein)

### "unreachable" Fehler

- Siehe Browser-Konsole für Details
- Möglicherweise ungültiger SysML-Code
- Fallback-Parser sollte weiterhin funktionieren

## Zusammenfassung

✅ **Kein Server nötig** - Alles läuft im Browser  
✅ **GitHub Pages kompatibel** - Statische Dateien  
✅ **Automatisches Deployment** - Via GitHub Actions  
✅ **Offline-fähig** - Nach erstem Laden  

Die WASM-Version ist perfekt für GitHub Pages geeignet!
