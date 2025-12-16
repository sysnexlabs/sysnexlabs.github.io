# Debugging WASM Panic in generate_cst

## 🔴 Current Issue

The `generate_cst` function is panicking with "unreachable" error. The panic is happening deep in the WASM module, likely in the CST provider.

## 📊 Error Analysis

From the console logs:
- **Function**: `generate_cst`
- **Error**: `RuntimeError: unreachable`
- **Location**: WASM function `wasm-function[569]` at `0x142408`
- **Stack**: Multiple WASM function calls deep

## 🔍 Debugging Steps

### Step 1: Check What Code is Being Processed

The enhanced error handler now logs:
- Code length
- First line of code
- Line count
- Code preview

**Check the browser console** for:
```
🔍 Generating CST for code: { length: ..., firstLine: ..., lineCount: ... }
```

### Step 2: Identify the Problematic Code

The error occurs with the default "Vehicle System" example. Let's check if there's a specific issue:

```sysml
package 'Vehicle System' {
    doc /*
     * A simple vehicle system example demonstrating
     * SysML v2 structural modeling.
     */
    
    part def Vehicle {
        attribute speed :> ScalarValues::Real;
        attribute mass :> ScalarValues::Real = 1000.0;
        
        part engine : Engine;
        part wheels : Wheel[4];
    }
    
    part def Engine {
        attribute power :> ScalarValues::Real = 150.0;
    }
    
    part def Wheel {
        attribute diameter :> ScalarValues::Real = 0.5;
    }
}
```

### Step 3: Possible Causes

1. **Multiplicity syntax `[4]`** - Might not be fully supported
2. **Default values** - `= 1000.0` might cause issues
3. **Nested parts** - `part engine : Engine` might need different syntax
4. **Doc comments** - Multi-line doc comments might cause parsing issues

### Step 4: Test with Simpler Code

Try with the "Hello World" example first:
```sysml
package 'Hello World' {
    doc /* A simple SysML v2 package */
    
    part def Greeting {
        attribute message :> ScalarValues::String = "Hello, SysML v2!";
    }
}
```

## 🛠️ Immediate Fixes

### Option 1: Rebuild WASM with Better Error Handling

The Rust code has been updated with:
- Input validation
- Parse checks before CST generation
- Better panic message extraction

**Rebuild WASM**:
```bash
cd sysmlv2_rust_extension/crates/wasm-bridge
wasm-pack build --target web --out-dir ../../../pages/sysnex-labs.github.io/src/wasm
```

### Option 2: Add Fallback for CST

If CST generation fails, we could:
- Show a message that CST is not available
- Fall back to showing parse errors only
- Provide a link to report the issue

### Option 3: Validate Code Before CST Generation

Add more validation:
- Check for unsupported features
- Validate syntax more strictly
- Provide helpful error messages

## 📝 Enhanced Logging

The code now logs:
1. **Before WASM call**: Code length, first line, line count
2. **On error**: Full error details, code preview, error type
3. **In console**: Detailed error information

## 🎯 Next Steps

1. **Check browser console** for the detailed logs
2. **Try simpler code** to isolate the issue
3. **Rebuild WASM** if you haven't already
4. **Report the exact code** that causes the panic

## 🔗 Related Files

- `src/components/DocumentationTabs/CstTab.jsx` - Enhanced with better logging
- `src/utils/wasmErrorHandler.js` - Error handling utilities
- `sysmlv2_rust_extension/crates/wasm-bridge/src/lib.rs` - Rust error handling
