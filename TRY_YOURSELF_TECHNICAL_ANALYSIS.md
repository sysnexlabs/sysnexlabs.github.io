# "Try Yourself" Feature - Technische Analyse

## Übersicht

Dieses Dokument analysiert die technischen Optionen für die Implementierung eines interaktiven "Try Yourself" Editors auf der Sysnex Labs Homepage, der Besuchern ermöglicht, SysML v2 direkt im Browser auszuprobieren.

## Anforderungen

### Funktionale Anforderungen
- **Editor**: Code-Editor mit Syntax-Highlighting für SysML v2
- **Live-Vorschau**: Echtzeit-Feedback (Syntax-Validierung, Fehleranzeige)
- **Dokumentation**: Kontextuelle Hilfe und Beispiele
- **Beispiele**: Vordefinierte Beispiele zum Ausprobieren
- **Performance**: Schnelle Antwortzeiten (<200ms für grundlegende Operationen)

### Technische Constraints
- **Browser-only**: Keine Installation erforderlich
- **Responsive**: Funktioniert auf Desktop und Mobile
- **Offline-fähig (optional)**: Grundlegende Features sollten ohne Backend funktionieren
- **Wartbarkeit**: Sollte mit bestehender React/Vite-Architektur kompatibel sein

## Option 1: WebAssembly (WASM) - Empfohlen für Offline-Features

### Architektur
```
Browser
  ↓
React Editor Component
  ↓
WASM Module (Rust Parser/Analyzer)
  ↓
Syntax Tree + Diagnostics
  ↓
UI Updates (Highlighting, Errors, Documentation)
```

### Technologie-Stack
- **Frontend**: React + Monaco Editor (VS Code Editor im Browser)
- **Backend**: Rust → WebAssembly (via `wasm-pack` oder `wasm-bindgen`)
- **Parser**: Kompilierung des `sysml-syntax` Crates zu WASM
- **Analyzer**: Optional `sysml-hir` für erweiterte Features

### Vorteile
✅ **Offline-fähig**: Funktioniert komplett im Browser ohne Backend  
✅ **Schnell**: Native Performance im Browser  
✅ **Konsistent**: Verwendet denselben Parser wie die VS Code Extension  
✅ **Skalierbar**: Keine Server-Kosten bei hohem Traffic  
✅ **Privatsphäre**: Code verlässt nie den Browser  

### Nachteile
❌ **Initiale Bundle-Größe**: WASM-Module können 5-15 MB groß sein  
❌ **Kompilierungsaufwand**: Rust-Code muss für WASM angepasst werden  
❌ **Feature-Limitationen**: Nicht alle LSP-Features sind in WASM möglich  
❌ **Browser-Kompatibilität**: Ältere Browser unterstützen WASM nicht optimal  

### Implementierungsaufwand
- **Parser zu WASM**: 2-3 Wochen
- **Editor-Integration**: 1-2 Wochen
- **UI/UX**: 1-2 Wochen
- **Testing & Optimierung**: 1-2 Wochen
- **Gesamt**: ~6-9 Wochen

### Code-Beispiel (Konzept)
```rust
// crates/sysml-syntax-wasm/src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct SysMLParser {
    // Parser state
}

#[wasm_bindgen]
impl SysMLParser {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        SysMLParser {}
    }

    #[wasm_bindgen]
    pub fn parse(&self, source: &str) -> JsValue {
        // Parse SysML v2 source
        let tree = parse_sysml(source);
        serde_wasm_bindgen::to_value(&tree).unwrap()
    }

    #[wasm_bindgen]
    pub fn get_diagnostics(&self, source: &str) -> JsValue {
        // Return diagnostics/errors
        let diagnostics = validate_sysml(source);
        serde_wasm_bindgen::to_value(&diagnostics).unwrap()
    }
}
```

```typescript
// src/components/TryYourselfEditor.tsx
import { Editor } from '@monaco-editor/react';
import init, { SysMLParser } from '@sysnex/sysml-wasm';

export function TryYourselfEditor() {
  const [parser, setParser] = useState<SysMLParser | null>(null);
  const [code, setCode] = useState(defaultExample);
  const [diagnostics, setDiagnostics] = useState([]);

  useEffect(() => {
    init().then(() => {
      setParser(new SysMLParser());
    });
  }, []);

  const handleCodeChange = (value: string) => {
    setCode(value);
    if (parser) {
      const diags = parser.get_diagnostics(value);
      setDiagnostics(diags);
    }
  };

  return (
    <div className="try-yourself-container">
      <Editor
        language="sysml"
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
      />
      <DiagnosticsPanel diagnostics={diagnostics} />
      <DocumentationPanel />
    </div>
  );
}
```

---

## Option 2: Backend-Service (REST/WebSocket API)

### Architektur
```
Browser
  ↓
React Editor Component
  ↓
HTTP/WebSocket Client
  ↓
Backend Service (Rust LSP Server)
  ↓
Parser/Analyzer
  ↓
JSON Response
  ↓
UI Updates
```

### Technologie-Stack
- **Frontend**: React + Monaco Editor
- **Backend**: Rust LSP Server mit HTTP/WebSocket Wrapper
- **API**: REST für einfache Requests, WebSocket für Live-Updates
- **Hosting**: Cloud-Service (AWS, GCP, Azure) oder eigenes Backend

### Vorteile
✅ **Vollständige Features**: Zugriff auf alle LSP-Features  
✅ **Kleine Bundle-Größe**: Frontend bleibt schlank  
✅ **Einfache Updates**: Backend kann unabhängig aktualisiert werden  
✅ **Erweiterbar**: Kann später um AI-Features, Diagram-Generierung etc. erweitert werden  

### Nachteile
❌ **Server-Kosten**: Benötigt laufenden Server  
❌ **Latenz**: Netzwerk-Roundtrip (50-200ms)  
❌ **Offline nicht möglich**: Benötigt Internet-Verbindung  
❌ **Skalierung**: Muss bei hohem Traffic skalieren  
❌ **Privatsphäre**: Code wird an Server gesendet (DSGVO-relevant)  

### Implementierungsaufwand
- **HTTP/WebSocket Wrapper**: 1-2 Wochen
- **API-Design**: 1 Woche
- **Frontend-Integration**: 1-2 Wochen
- **Backend-Hosting Setup**: 1 Woche
- **Testing & Deployment**: 1-2 Wochen
- **Gesamt**: ~5-8 Wochen

### Code-Beispiel (Konzept)
```rust
// Backend: HTTP Wrapper für LSP
use axum::{Router, extract::Json, response::Json as ResponseJson};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct ParseRequest {
    source: String,
}

#[derive(Serialize)]
struct ParseResponse {
    diagnostics: Vec<Diagnostic>,
    syntax_tree: Value,
}

async fn parse_handler(Json(req): Json<ParseRequest>) -> ResponseJson<ParseResponse> {
    let db = SysMLDatabase::default();
    let file_id = FileId::new(1);
    // Parse and analyze
    let diagnostics = get_diagnostics(&db, file_id);
    ResponseJson(ParseResponse { diagnostics, syntax_tree })
}
```

```typescript
// Frontend: API Client
const API_BASE = 'https://api.sysnex-labs.com/v1';

export async function parseSysML(source: string) {
  const response = await fetch(`${API_BASE}/parse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source }),
  });
  return response.json();
}
```

---

## Option 3: Hybrid-Ansatz (WASM + Backend Fallback)

### Architektur
```
Browser
  ↓
React Editor Component
  ↓
WASM Parser (Grundfunktionen)
  ↓
[Optional] Backend Service (Erweiterte Features)
```

### Strategie
- **Grundfunktionen** (Parsing, Syntax-Validierung): WASM im Browser
- **Erweiterte Features** (Code-Completion, Diagram-Generierung): Backend-Service
- **Fallback**: Wenn Backend nicht verfügbar, nur WASM-Features

### Vorteile
✅ **Beste Performance**: Schnelle Grundfunktionen via WASM  
✅ **Erweiterbar**: Backend für komplexe Features  
✅ **Robust**: Funktioniert auch bei Backend-Ausfall  
✅ **Skalierbar**: Backend nur für erweiterte Features nötig  

### Nachteile
❌ **Komplexität**: Zwei Systeme müssen koordiniert werden  
❌ **Höherer Aufwand**: Kombination beider Ansätze  
❌ **Größere Bundle-Größe**: WASM + API-Client  

### Implementierungsaufwand
- **WASM Parser**: 2-3 Wochen
- **Backend-Service**: 2-3 Wochen
- **Hybrid-Integration**: 1-2 Wochen
- **UI/UX**: 1-2 Wochen
- **Testing**: 1-2 Wochen
- **Gesamt**: ~7-12 Wochen

---

## Option 4: Monaco Editor + Client-Side Parser (JavaScript/TypeScript)

### Architektur
```
Browser
  ↓
Monaco Editor (Syntax Highlighting)
  ↓
JavaScript/TypeScript Parser (vereinfacht)
  ↓
Basic Validation
```

### Technologie-Stack
- **Frontend**: Monaco Editor mit SysML v2 Syntax-Definition
- **Parser**: JavaScript/TypeScript Parser (vereinfacht, nicht vollständig)
- **Kein Backend**: Alles im Browser

### Vorteile
✅ **Einfach**: Keine WASM-Kompilierung nötig  
✅ **Schnell zu implementieren**: 1-2 Wochen  
✅ **Kleine Bundle-Größe**: Nur JavaScript  

### Nachteile
❌ **Limitiert**: Kann nicht alle SysML v2 Features parsen  
❌ **Nicht konsistent**: Anderer Parser als Production-Tool  
❌ **Wartungsaufwand**: Parser muss separat gepflegt werden  

### Empfehlung
**Nicht empfohlen** - Zu limitiert und nicht konsistent mit dem Production-Tool.

---

## Empfehlung: Option 1 (WASM) oder Option 3 (Hybrid)

### Für MVP: Option 1 (WASM)
- **Schnellste Implementierung** für grundlegende Features
- **Offline-fähig** und **privacy-friendly**
- **Konsistent** mit Production-Tool
- **Skalierbar** ohne Backend-Kosten

### Für Langfristig: Option 3 (Hybrid)
- **Beste User Experience** mit erweiterten Features
- **Zukunftssicher** für AI-Features, Diagram-Generierung etc.
- **Robust** durch Fallback-Mechanismus

---

## UI/UX Design-Vorschlag

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  SysML v2 Try Yourself                                  │
├──────────────────────┬──────────────────────────────────┤
│                      │                                   │
│   Editor (Links)     │   Documentation (Rechts)         │
│   - Code Editor      │   - Syntax-Hilfe                 │
│   - Syntax Errors    │   - Beispiele                    │
│   - Line Numbers     │   - Quick Reference              │
│                      │                                   │
│   [Beispiele ▼]      │   [Live Preview]                 │
│                      │                                   │
└──────────────────────┴──────────────────────────────────┘
```

### Features
1. **Editor-Panel (Links)**
   - Monaco Editor mit SysML v2 Syntax-Highlighting
   - Live-Validierung mit Fehleranzeige
   - Code-Completion (wenn verfügbar)
   - Beispiel-Dropdown

2. **Documentation-Panel (Rechts)**
   - Kontextuelle Hilfe basierend auf Cursor-Position
   - Syntax-Referenz
   - Beispiele und Tutorials
   - Quick Reference Guide

3. **Beispiele**
   - "Hello World" - Einfaches Package
   - "Parts & Attributes" - Strukturelle Modellierung
   - "Requirements" - Requirements-Modellierung
   - "Behavior" - Verhaltens-Modellierung

---

## Nächste Schritte

### Phase 1: Proof of Concept (2-3 Wochen)
1. **WASM Parser Setup**
   - `sysml-syntax` zu WASM kompilieren
   - Basis-Parsing im Browser testen
   - Bundle-Größe optimieren

2. **Editor-Integration**
   - Monaco Editor einrichten
   - Syntax-Highlighting für SysML v2
   - Basis-Validierung anzeigen

3. **UI-Prototyp**
   - Zwei-Spalten-Layout
   - Basis-Dokumentation
   - Ein Beispiel

### Phase 2: Feature-Erweiterung (2-3 Wochen)
1. **Erweiterte Validierung**
   - Mehr Diagnostik-Features
   - Bessere Fehlermeldungen

2. **Dokumentation**
   - Vollständige Syntax-Referenz
   - Mehr Beispiele
   - Interaktive Tutorials

3. **UX-Verbesserungen**
   - Responsive Design
   - Mobile-Optimierung
   - Performance-Optimierung

### Phase 3: Integration (1-2 Wochen)
1. **Homepage-Integration**
   - In Homepage einbetten
   - Styling anpassen
   - Analytics einrichten

2. **Testing & Deployment**
   - Cross-Browser-Testing
   - Performance-Testing
   - Deployment auf Production

---

## Technische Dependencies

### Frontend
```json
{
  "dependencies": {
    "@monaco-editor/react": "^4.6.0",
    "monaco-editor": "^0.45.0"
  }
}
```

### Backend (für WASM)
- `wasm-pack` oder `wasm-bindgen`
- `wasm-opt` für Bundle-Optimierung
- `@sysnex/sysml-wasm` (zu erstellendes Package)

### Optional (für Backend-Service)
- `axum` oder `actix-web` (Rust Web Framework)
- `tokio` für Async
- `serde` für Serialisierung

---

## Performance-Ziele

- **Initial Load**: < 3 Sekunden (inkl. WASM-Download)
- **Parse Response**: < 100ms für typische Dateien (< 1000 Zeilen)
- **Diagnostics Update**: < 200ms nach Code-Änderung
- **Bundle Size**: < 10 MB (komprimiert < 3 MB)

---

## Sicherheit & Privatsphäre

### WASM-Ansatz
- ✅ Code verlässt nie den Browser
- ✅ Keine Server-Logs
- ✅ DSGVO-konform

### Backend-Ansatz
- ⚠️ Code wird an Server gesendet
- ⚠️ Server-Logs erforderlich
- ⚠️ DSGVO-Hinweise nötig
- ✅ Option: Code nicht speichern, nur verarbeiten

---

## Fazit

**Empfohlener Ansatz**: **Option 1 (WASM)** für MVP, später **Option 3 (Hybrid)** für erweiterte Features.

Dies bietet:
- Schnelle Implementierung
- Gute Performance
- Privacy-friendly
- Konsistenz mit Production-Tool
- Skalierbarkeit ohne Backend-Kosten

Die Implementierung ist in **6-9 Wochen** für ein vollständiges MVP möglich.

