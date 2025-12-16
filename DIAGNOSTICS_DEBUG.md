# Diagnostics Debugging Guide

## 🔍 Problem

Diagnostics werden nicht angezeigt, wenn ungültige Syntax im Monaco Editor verwendet wird.

## ✅ Fixes Implementiert

### 1. **WASM Parse Handling korrigiert**
- `wasm.parse()` ist **synchron** (kein Promise)
- Gibt direkt ein Array zurück oder wirft einen Fehler
- Logging hinzugefügt für Debugging

### 2. **Marker-Setting verbessert**
- Marker werden bei Code-Änderungen aktualisiert
- Logging für Debugging
- Marker-Verifizierung nach dem Setzen

### 3. **Debug-Logging hinzugefügt**
- Code-Änderungen werden geloggt
- Diagnostics-Änderungen werden geloggt
- Marker-Setting wird geloggt

## 🧪 Testen

1. **Browser-Cache leeren** (Hard Refresh: Cmd+Shift+R)
2. **Browser-Konsole öffnen** (F12)
3. **Ungültige Syntax eingeben**, z.B.:
   ```sysml
   package UnquotedPackage {
     part def Test {
       attribute name;
     }
   }
   ```
4. **Konsole prüfen** für:
   - `🔍 Calling WASM parse with code length: X`
   - `📦 WASM parse returned: ...`
   - `✅ Diagnostics received: X items`
   - `📌 Setting X markers in Monaco editor`

## 📝 Erwartete Logs

Wenn alles funktioniert, solltest du sehen:
```
🔍 Calling WASM parse with code length: 123
📦 WASM parse returned: [...] isArray: true
✅ Diagnostics received: 2 items [...]
📝 Code changed, length: 123 lines: 5
📊 Diagnostics updated: 2 items [...]
📌 Setting 2 markers in Monaco editor: [...]
✅ Monaco markers after setting: 2
```

## ⚠️ Wenn es nicht funktioniert

1. **Prüfe Browser-Konsole** - gibt es Fehler?
2. **Prüfe ob WASM geladen ist** - `wasm` sollte nicht `null` sein
3. **Prüfe ob Diagnostics empfangen werden** - Logs sollten erscheinen
4. **Prüfe ob Marker gesetzt werden** - "Setting X markers" sollte erscheinen

## 🔧 Weitere Debugging-Schritte

Falls Diagnostics immer noch nicht erscheinen:
1. Prüfe ob `wasm.parse()` überhaupt aufgerufen wird
2. Prüfe was `wasm.parse()` zurückgibt
3. Prüfe ob Marker in Monaco gesetzt werden
4. Prüfe ob die Diagnostics-Panel angezeigt wird
