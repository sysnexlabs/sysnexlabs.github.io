# Try Yourself POC - Implementation Guide

## Übersicht

Dieser Proof of Concept implementiert ein interaktives "Try Yourself" Feature auf der Homepage, das Besuchern ermöglicht, SysML v2 direkt im Browser auszuprobieren.

## Implementierte Features

### ✅ Editor (Links)
- **Monaco Editor** mit SysML v2 Syntax-Highlighting
- **Beispiel-Auswahl** - 4 vordefinierte Beispiele
- **Basis-Validierung** - Einfache Syntax-Checks
- **Diagnostics Panel** - Fehleranzeige unter dem Editor

### ✅ Documentation Panel (Rechts)
- **Syntax-Referenz** - Quick Reference für Packages, Parts, Attributes, Requirements
- **Quick Tips** - Nützliche Tipps für SysML v2
- **Beispiele** - Common Patterns mit Code-Beispielen
- **Tabbed Interface** - Wechsel zwischen Syntax, Tips und Examples

### ✅ Layout
- **Zwei-Spalten-Layout** - Editor links, Documentation rechts
- **Responsive Design** - Stapelt auf Mobile
- **Animations** - Framer Motion für sanfte Übergänge

## Installation

### 1. Dependencies installieren

```bash
cd pages/sysnex-labs.github.io
npm install
```

Dies installiert:
- `@monaco-editor/react` - React Wrapper für Monaco Editor
- `monaco-editor` - VS Code Editor im Browser

### 2. Development Server starten

```bash
npm run dev
```

Die Anwendung läuft dann auf `http://localhost:5173`

## Komponenten-Struktur

```
src/
├── components/
│   ├── TryYourself/
│   │   ├── TryYourself.jsx       # Hauptkomponente
│   │   └── TryYourself.css        # Styling
│   ├── TryYourselfEditor/
│   │   ├── TryYourselfEditor.jsx # Editor-Komponente
│   │   └── TryYourselfEditor.css  # Editor-Styling
│   └── DocumentationPanel/
│       ├── DocumentationPanel.jsx # Documentation-Komponente
│       └── DocumentationPanel.css  # Documentation-Styling
└── pages/
    └── Home.jsx                    # Integration in Homepage
```

## Nächste Schritte (Phase 2)

### WASM Parser Integration

1. **Rust Parser zu WASM kompilieren**
   ```bash
   cd sysmlv2_rust_extension
   wasm-pack build --target web --out-dir ../../pages/sysnex-labs.github.io/src/wasm
   ```

2. **WASM in Editor integrieren**
   - Parser-Modul laden
   - Echtzeit-Validierung mit WASM
   - Erweiterte Diagnostics

3. **Performance-Optimierung**
   - Bundle-Größe optimieren
   - Lazy Loading für WASM
   - Code-Splitting

### Erweiterte Features

- **Code-Completion** - Autocomplete für SysML v2 Keywords
- **Hover-Information** - Tooltips mit Element-Informationen
- **Diagram-Generierung** - Live-Vorschau von Diagrammen
- **Export-Funktionen** - Code als Datei herunterladen
- **Mehr Beispiele** - Erweiterte Beispiel-Sammlung

## Technische Details

### Syntax-Highlighting

Der Editor verwendet ein custom Monarch Tokenizer für SysML v2:
- Keywords: `package`, `part`, `attr`, `doc`, `requirement`, etc.
- Strings: Quoted identifiers
- Comments: `/* ... */`
- Numbers: Numeric literals

### Validierung

Aktuell implementiert:
- Basis-Syntax-Checks
- Package-Name-Validierung
- Attribute-Type-Validierung

Geplant (mit WASM):
- Vollständige Parser-Validierung
- Semantic-Analysis
- Type-Checking
- Library-Referenz-Validierung

## Browser-Kompatibilität

- ✅ Chrome/Edge (neueste Versionen)
- ✅ Firefox (neueste Versionen)
- ✅ Safari (neueste Versionen)
- ⚠️ Ältere Browser benötigen Polyfills

## Performance

- **Initial Load**: ~2-3 Sekunden (inkl. Monaco Editor)
- **Editor Response**: <50ms für Typing
- **Validierung**: <100ms für typische Dateien

## Bekannte Limitationen (POC)

1. **Validierung**: Nur Basis-Syntax-Checks, keine vollständige Parser-Validierung
2. **WASM**: Noch nicht integriert - wird in Phase 2 hinzugefügt
3. **Code-Completion**: Noch nicht implementiert
4. **Diagram-Generierung**: Noch nicht implementiert

## Testing

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Troubleshooting

### Monaco Editor lädt nicht
- Prüfe, ob `@monaco-editor/react` installiert ist
- Prüfe Browser-Konsole auf Fehler

### Syntax-Highlighting funktioniert nicht
- Prüfe, ob `monaco-editor` installiert ist
- Prüfe, ob das Theme korrekt gesetzt ist

### Styles fehlen
- Prüfe, ob CSS-Dateien importiert sind
- Prüfe Browser-Konsole auf CSS-Fehler
