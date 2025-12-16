# WASM Build Instructions

## Voraussetzungen

```bash
# wasm-pack installieren
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Oder via cargo
cargo install wasm-pack
```

## Build

```bash
cd sysmlv2_rust_extension/crates/wasm-bridge
wasm-pack build --target web --out-dir ../../../pages/sysnex-labs.github.io/src/wasm
```

## Frontend Integration

Nach dem Build wird das WASM-Modul in `src/wasm/` verfügbar sein.

### In React laden:

```typescript
import init, { SysMLWasm } from '../wasm/sysml_wasm_bridge.js';

// Beim App-Start
await init();
const sysml = new SysMLWasm();
```

### In DocumentationView verwenden:

```typescript
// Statt einfachem Parser
const documentation = sysml.generate_documentation(code, 'editor://current');
```

## Troubleshooting

### Build-Fehler
- Prüfe, ob alle Dependencies verfügbar sind
- Prüfe Rust-Version (sollte 1.70+ sein)

### WASM-Größe
- Bundle ist groß (~10-15 MB) - normal für vollständigen Parser
- Kann mit `wasm-opt` weiter optimiert werden

### Browser-Kompatibilität
- Moderne Browser (Chrome, Firefox, Safari neueste Versionen)
- Ältere Browser benötigen Polyfills
