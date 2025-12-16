# Fix WASM Panic - Action Plan

## 🔴 Current Situation

The `generate_cst` function is panicking with "unreachable" error. This is happening with the default "Vehicle System" example.

## ✅ What I've Done

1. **Enhanced Error Handling** - Better error messages with context
2. **Added Logging** - Detailed console logs to identify the issue
3. **Input Validation** - Validate code before WASM calls
4. **Improved Rust Code** - Better panic handling in WASM bridge

## 🎯 Immediate Actions Required

### Step 1: Rebuild WASM Module

The Rust code has been updated but needs to be rebuilt:

```bash
cd sysmlv2_rust_extension/crates/wasm-bridge
wasm-pack build --target web --out-dir ../../../pages/sysnex-labs.github.io/src/wasm
```

### Step 2: Check Browser Console

After rebuilding, check the browser console (F12) for:
- `🔍 Generating CST for code:` - Shows what code is being processed
- `🔴 CST Generation Failed:` - Shows detailed error information
- `🔴 CST Error Details:` - Shows full error context

### Step 3: Test with Simpler Code

Try the "Hello World" example first to see if it works:
- If it works → The issue is with specific features in "Vehicle System"
- If it fails → The issue is more fundamental

## 🔍 Root Cause Analysis

The panic is likely caused by one of these in the "Vehicle System" example:

1. **Multiplicity syntax**: `part wheels : Wheel[4];`
2. **Default values**: `= 1000.0`, `= 150.0`, `= 0.5`
3. **Nested parts**: `part engine : Engine;`
4. **Multi-line doc comments**: The `doc /* ... */` block

## 🛠️ Temporary Workaround

Until the panic is fixed, you can:

1. **Disable CST tab** temporarily
2. **Show a message** that CST is not available
3. **Use fallback** to show parse errors only

Or modify the default example to use simpler syntax:

```sysml
package 'Simple Vehicle' {
    part def Vehicle {
        attribute speed :> ScalarValues::Real;
        attribute mass :> ScalarValues::Real;
    }
}
```

## 📝 Next Steps

1. **Rebuild WASM** with the improved error handling
2. **Check console logs** to see what code causes the panic
3. **Test with simpler code** to isolate the issue
4. **Report findings** - Which specific feature causes the panic

## 🔗 Files Modified

- `src/components/DocumentationTabs/CstTab.jsx` - Enhanced logging
- `src/utils/wasmErrorHandler.js` - Better error formatting
- `sysmlv2_rust_extension/crates/wasm-bridge/src/lib.rs` - Better panic handling

## 💡 Alternative Solution

If the panic persists, we could:
1. Add a feature flag to disable CST generation
2. Show a "Coming soon" message for CST
3. Focus on other tabs (Documentation, HIR, Stats) that work
4. Add a bug report link for CST issues
