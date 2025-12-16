# Quick Start - Try Yourself Deployment

## 🎯 Wichtig: Kein Server nötig!

Die "Try Yourself" Seite läuft **komplett im Browser** mit WebAssembly. **Kein LSP-Server, kein Backend nötig!**

## Schnellstart

### 1. WASM bauen (einmalig)

```bash
cd sysmlv2_rust_extension/crates/wasm-bridge
wasm-pack build --target web --out-dir ../../../pages/sysnex-labs.github.io/src/wasm
```

### 2. WASM-Dateien committen

```bash
cd pages/sysnex-labs.github.io
git add src/wasm/
git commit -m "Add WASM module"
git push
```

### 3. Frontend bauen & deployen

**Automatisch** (via GitHub Actions):
- Push zu `main` Branch → Automatisches Deployment

**Manuell**:
```bash
npm install
npm run build
# dist/ zu GitHub Pages hochladen
```

## Architektur

```
Browser (GitHub Pages)
  ├── React App
  │   ├── Monaco Editor
  │   └── Documentation View
  └── WASM Module (sysml_wasm_bridge)
      ├── Parser (sysml-syntax-v2)
      ├── Documentation (sysml-ide-documentation)
      ├── CST Viewer (sysml-ide-cst-viewer)
      ├── HIR Viewer (sysml-ide-hir-viewer)
      └── Analytics (sysml-ide-analytics)
```

**Kein Server nötig!** Alles läuft im Browser.

## Dateien

- **WASM-Dateien**: `src/wasm/` (sollten committed werden)
- **Workflow**: `.github/workflows/deploy-pages.yml`
- **Build Output**: `dist/` (wird zu GitHub Pages deployed)

## Troubleshooting

**WASM lädt nicht?**
- Prüfe, ob `src/wasm/sysml_wasm_bridge.js` existiert
- Prüfe Browser-Konsole (F12)
- Prüfe Network-Tab für 404-Fehler

**"unreachable" Fehler?**
- Siehe Browser-Konsole für Details
- Möglicherweise ungültiger SysML-Code
- Fallback-Parser sollte weiterhin funktionieren
