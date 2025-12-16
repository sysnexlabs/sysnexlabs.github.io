# WASM Integration Plan - Maximale Nutzung bestehender Crates

## Übersicht

Dieser Plan nutzt **alle bestehenden IDE Crates** maximal, anstatt neue Implementierungen zu schreiben. Wir kompilieren die bestehenden Crates zu WASM und wrappen sie für Browser-Nutzung.

## Architektur

```
Browser (React)
  ↓
WASM Bridge (sysml-wasm-bridge)
  ↓
Bestehende Crates (100% Code-Reuse):
  - sysml-syntax-v2 (Parser)
  - sysml-ide-documentation (Documentation)
  - sysml-ide-cst-viewer (CST)
  - sysml-ide-hir-viewer (HIR)
  - sysml-ide-analytics (Analytics)
```

## Phase 2: WASM Bridge Setup

### 2.1 WASM Crate erstellt ✅
- `crates/wasm-bridge/Cargo.toml` - Nutzt alle bestehenden Crates
- `crates/wasm-bridge/src/lib.rs` - Wrapper für alle Features

### 2.2 Build Pipeline
```bash
cd sysmlv2_rust_extension/crates/wasm-bridge
wasm-pack build --target web --out-dir ../../pages/sysnex-labs.github.io/src/wasm
```

### 2.3 Frontend Integration
- WASM-Modul in React laden
- Alle Features verfügbar: Documentation, CST, HIR, Analytics

## Verfügbare Features (durch bestehende Crates)

### ✅ Documentation
- **Crate**: `sysml-ide-documentation`
- **Funktion**: `extract_all_chapters(db, file_id, file_uri)`
- **Output**: `Vec<ChapterData>` - Vollständige Documentation-Struktur

### ✅ CST (Concrete Syntax Tree)
- **Crate**: `sysml-ide-cst-viewer`
- **Funktion**: `CstProvider::generate_cst_from_text(source, file_uri)`
- **Output**: `CstResponse` - Vollständiger Syntax Tree

### ✅ HIR (High-level Intermediate Representation)
- **Crate**: `sysml-ide-hir-viewer`
- **Funktion**: `HirViewerProvider::generate_hir_from_db(db, file_id, source, file_uri)`
- **Output**: `HirResponse` - Semantische Repräsentation

### ✅ Analytics
- **Crate**: `sysml-ide-analytics`
- **Funktion**: `AnalyticsEngine::analyze_file(db, file_id, file_uri)`
- **Output**: `ModelAnalysis` - Statistiken und Quality Metrics

## Nächste Schritte

1. **WASM Build** - Crates zu WASM kompilieren
2. **Frontend Integration** - WASM in React App laden
3. **Documentation View** - Vollständige Documentation mit echten Daten
4. **Erweiterte Tabs** - CST, HIR, Stats Tabs implementieren

## Vorteile dieser Architektur

✅ **100% Code-Reuse** - Keine Duplikation  
✅ **Konsistenz** - Gleiche Logik wie VS Code Extension  
✅ **Wartbarkeit** - Änderungen in Crates automatisch verfügbar  
✅ **Vollständigkeit** - Alle Features sofort verfügbar  
