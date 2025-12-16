# SysML WASM Bridge

WebAssembly bridge für SysML v2 Tooling - nutzt alle bestehenden IDE Crates maximal.

## Features

- ✅ **Parser**: `sysml-syntax-v2` - Vollständiges AST-Parsing
- ✅ **Documentation**: `sysml-ide-documentation` - Vollständige Documentation-Generierung
- ✅ **CST**: `sysml-ide-cst-viewer` - Concrete Syntax Tree
- ✅ **HIR**: `sysml-ide-hir-viewer` - High-level Intermediate Representation
- ✅ **Analytics**: `sysml-ide-analytics` - Model Analytics & Statistics

## Build

```bash
cd crates/wasm-bridge
wasm-pack build --target web --out-dir ../../pages/sysnex-labs.github.io/src/wasm
```

## Usage in Browser

```javascript
import init, { SysMLWasm } from './wasm/sysml_wasm_bridge.js';

await init();

const sysml = new SysMLWasm();

// Parse and get diagnostics
const diagnostics = sysml.parse(sourceCode);

// Generate documentation
const documentation = sysml.generate_documentation(sourceCode, "file://example.sysml");

// Generate CST
const cst = sysml.generate_cst(sourceCode, "file://example.sysml");

// Generate HIR
const hir = sysml.generate_hir(sourceCode, "file://example.sysml");

// Generate analytics
const analytics = sysml.generate_analytics(sourceCode, "file://example.sysml");
```

## Integration in React

Siehe `pages/sysnex-labs.github.io/src/components/DocumentationView/DocumentationView.jsx` für Beispiel-Integration.
