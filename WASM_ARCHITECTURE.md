# WASM Architecture - Kein Server nötig!

## 🎯 Wichtig: Kein LSP-Server erforderlich!

Die "Try Yourself" Seite verwendet **WebAssembly (WASM)**, was bedeutet:

✅ **Alles läuft im Browser** - Kein Server nötig!  
✅ **GitHub Pages kompatibel** - Statische Dateien, kein Backend  
✅ **100% Client-Side** - Alle Parser, HIR, Analytics laufen lokal  

## Architektur

```
┌─────────────────────────────────────────┐
│         Browser (GitHub Pages)          │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │   React App (Vite Build)          │  │
│  │   - Monaco Editor                 │  │
│  │   - Documentation View            │  │
│  │   - Tabs (CST, HIR, Stats)        │  │
│  └──────────────────────────────────┘  │
│              │                          │
│              ▼                          │
│  ┌──────────────────────────────────┐  │
│  │   WASM Module                     │  │
│  │   - sysml_wasm_bridge.js          │  │
│  │   - sysml_wasm_bridge_bg.wasm     │  │
│  │                                    │  │
│  │   Nutzt direkt:                   │  │
│  │   - sysml-syntax-v2 (Parser)      │  │
│  │   - sysml-base-db (Salsa DB)      │  │
│  │   - sysml-ide-documentation       │  │
│  │   - sysml-ide-cst-viewer           │  │
│  │   - sysml-ide-hir-viewer          │  │
│  │   - sysml-ide-analytics            │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ❌ KEIN LSP-Server nötig!              │
│  ❌ KEIN Backend nötig!                 │
│  ❌ KEIN WebSocket nötig!               │
└─────────────────────────────────────────┘
```

## Build-Prozess

### 1. WASM Build (einmalig)
```bash
cd sysmlv2_rust_extension/crates/wasm-bridge
wasm-pack build --target web --out-dir ../../../pages/sysnex-labs.github.io/src/wasm
```

Dies erstellt:
- `sysml_wasm_bridge.js` - JavaScript Bindings
- `sysml_wasm_bridge_bg.wasm` - WebAssembly Binary (~1.6MB)
- `sysml_wasm_bridge.d.ts` - TypeScript Definitions

### 2. Frontend Build (für GitHub Pages)
```bash
cd pages/sysnex-labs.github.io
npm run build
```

Dies erstellt:
- `dist/` - Statische Dateien für GitHub Pages
- Enthält alle WASM-Dateien
- Kein Server nötig!

## GitHub Pages Deployment

### Option 1: Automatisch (GitHub Actions)
Erstelle `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Rust
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          target: wasm32-unknown-unknown
      
      - name: Install wasm-pack
        run: curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
      
      - name: Build WASM
        run: |
          cd sysmlv2_rust_extension/crates/wasm-bridge
          wasm-pack build --target web --out-dir ../../../pages/sysnex-labs.github.io/src/wasm
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Build Frontend
        run: |
          cd pages/sysnex-labs.github.io
          npm ci
          npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./pages/sysnex-labs.github.io/dist
```

### Option 2: Manuell
1. WASM bauen (siehe oben)
2. Frontend bauen: `npm run build`
3. `dist/` Ordner zu GitHub Pages hochladen

## Vorteile von WASM

✅ **Kein Server** - Alles läuft im Browser  
✅ **Schnell** - Native Performance  
✅ **Offline-fähig** - Funktioniert ohne Internet (nach erstem Laden)  
✅ **Sicher** - Keine Server-Kommunikation, keine Datenübertragung  
✅ **Skalierbar** - Keine Server-Kosten, unbegrenzte Nutzer  

## Unterschied zu LSP

| Feature | LSP (VS Code Extension) | WASM (Try Yourself) |
|---------|-------------------------|---------------------|
| **Laufzeit** | VS Code Process | Browser |
| **Server** | Ja (LSP Server) | Nein |
| **Kommunikation** | JSON-RPC über stdio | Direkt (WASM) |
| **Deployment** | VS Code Extension | GitHub Pages |
| **Features** | Vollständig | Core Features |

## Was funktioniert im Browser

✅ **Parser** - Vollständiges AST-Parsing  
✅ **Documentation** - Vollständige Documentation-Generierung  
✅ **CST** - Concrete Syntax Tree  
✅ **HIR** - High-level Intermediate Representation  
✅ **Analytics** - Model Analytics & Statistics  
✅ **Diagnostics** - Fehler und Warnungen  

## Was fehlt (benötigt Server)

❌ **Code Completion** - Benötigt LSP Server  
❌ **Hover Information** - Benötigt LSP Server  
❌ **Go to Definition** - Benötigt LSP Server  
❌ **Workspace-wide Features** - Benötigt LSP Server  

## Performance

- **WASM Binary**: ~1.6MB (komprimiert)
- **Ladezeit**: ~1-2 Sekunden (erste Ladung)
- **Parsing**: <100ms für typische Dateien
- **Memory**: ~10-50MB im Browser

## Browser-Kompatibilität

✅ Chrome/Edge (ab Version 57)  
✅ Firefox (ab Version 52)  
✅ Safari (ab Version 11)  
✅ Mobile Browser (iOS Safari, Chrome Mobile)  

## Zusammenfassung

**Kein Server nötig!** Die WASM-Version läuft komplett im Browser und ist perfekt für GitHub Pages geeignet. Alle Core-Features (Parser, Documentation, CST, HIR, Analytics) funktionieren ohne Backend.
