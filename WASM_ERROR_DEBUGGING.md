# WASM Error Debugging Guide

## 🔴 Enhanced Error Handling

The error handling has been significantly improved to provide better debugging information when WASM RuntimeErrors occur.

## ✅ What's New

### 1. Enhanced Error Messages
- **Function Context**: Shows which WASM function failed (generate_cst, generate_hir, generate_analytics, generate_documentation)
- **Code Preview**: Shows the first few lines of code that caused the error
- **Detailed Console Logging**: Full error details in browser console

### 2. ErrorDisplay Component
A new reusable component (`ErrorDisplay.jsx`) that provides:
- Clear error messages
- Function name display
- Code context preview
- Helpful troubleshooting tips
- Direct link to browser console

### 3. Improved Error Formatting
The `formatWasmError` function now accepts context:
```javascript
formatWasmError(err, { 
  code,           // The SysML code that caused the error
  functionName    // The WASM function name
})
```

## 🔍 How to Debug WASM Errors

### Step 1: Check the Error Display
When a WASM error occurs, you'll see:
- **Error message** with function name
- **Code preview** showing the problematic code
- **Help section** with troubleshooting tips
- **"Show in Console" button** for detailed debugging

### Step 2: Open Browser Console (F12)
The console will show:
```
🔴 WASM Function Call Error
  Function: generate_cst
  Arguments: [code, 'editor://current']
  Error object: WebAssembly.RuntimeError
  Error type: object
  Error constructor: RuntimeError
  Error name: RuntimeError
  Error message: unreachable
  Error stack: ...
  ⚠️ WASM RuntimeError detected
  This usually indicates a Rust panic in the WASM module.
```

### Step 3: Check the Code
- Look at the code preview in the error display
- Check for syntax errors
- Verify SysML v2 syntax compliance
- Try with simpler code

### Step 4: Common Causes

1. **Invalid SysML Syntax**
   - Unquoted package names
   - Missing type annotations
   - Syntax errors

2. **Unsupported Features**
   - Some advanced SysML v2 features might not be fully supported
   - Try with basic examples first

3. **WASM Module Issues**
   - Ensure WASM is built: `cd sysmlv2_rust_extension/crates/wasm-bridge && wasm-pack build --target web`
   - Check browser console for loading errors

## 🛠️ Troubleshooting

### Error: "WASM RuntimeError: unreachable"

**What it means**: A Rust panic occurred in the WASM module.

**What to do**:
1. Check the code preview in the error display
2. Open browser console (F12) for full details
3. Try with simpler code
4. Check if the code follows SysML v2 syntax

**Example fixes**:
```sysml
// ❌ Wrong
package UnquotedPackage {
    part def Test {}
}

// ✅ Correct
package 'Quoted Package' {
    part def Test {}
}
```

### Error: "WASM module not loaded"

**What it means**: The WASM module hasn't been built or isn't loading.

**What to do**:
1. Build WASM: `cd sysmlv2_rust_extension/crates/wasm-bridge && wasm-pack build --target web`
2. Check browser console for loading errors
3. Verify WASM files exist in `src/wasm/`

## 📝 Error Display Features

The new `ErrorDisplay` component shows:

1. **Error Header**
   - Error icon and title
   - Function name (if available)

2. **Error Message**
   - Formatted error message
   - Code preview (first 10 lines)
   - Function context

3. **Help Section**
   - What the error means
   - Common causes
   - Troubleshooting tips

4. **Code Context** (expandable)
   - Shows the code that caused the error
   - Line numbers for reference

5. **Actions**
   - "Show in Console" button
   - Opens detailed error info in console

## 🎯 Best Practices

1. **Always check the browser console** for detailed error information
2. **Start with simple code** to verify WASM is working
3. **Use the code preview** to identify problematic lines
4. **Check SysML v2 syntax** compliance
5. **Report errors** with console output for debugging

## 📊 Error Types

### RuntimeError (unreachable)
- **Cause**: Rust panic in WASM
- **Solution**: Check code syntax, simplify code, check console

### Serialization Error
- **Cause**: Data format issue
- **Solution**: Check WASM module version, rebuild

### Module Not Loaded
- **Cause**: WASM not built or not loading
- **Solution**: Build WASM module, check file paths

## 🔗 Related Files

- `src/utils/wasmErrorHandler.js` - Error handling utilities
- `src/components/DocumentationTabs/ErrorDisplay.jsx` - Error display component
- `src/components/DocumentationTabs/*Tab.jsx` - Tab components using error display
