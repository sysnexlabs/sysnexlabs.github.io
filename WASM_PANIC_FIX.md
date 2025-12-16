# WASM Panic Fix - generate_cst

## 🔴 Issue

The `generate_cst` function is panicking with "unreachable" error. This happens when the Rust code encounters an unexpected condition.

## ✅ Fixes Applied

### 1. Input Validation
Added validation before calling the CST provider:
- Check if source code is empty
- Validate input parameters

### 2. Better Panic Handling
Improved panic message extraction:
- Try multiple methods to extract panic message
- Include context (code length, file_uri) if panic message can't be extracted
- Better error messages for debugging

### 3. Parse Validation
Added parse check before CST generation:
- Parse the code first to catch syntax errors early
- Log warnings for parse errors but still attempt CST generation
- This helps identify problematic code before it causes a panic

### 4. Frontend Validation
Added validation in the frontend:
- Check if code is empty before calling WASM
- Provide user-friendly error messages

## 🔍 Debugging Steps

If you still see the error:

1. **Check the code you're trying to parse**
   - Open browser console (F12)
   - Look at the "Code preview" in the error display
   - Verify SysML v2 syntax

2. **Try with simpler code**
   - Start with the "Hello World" example
   - Gradually add complexity
   - Identify which part causes the panic

3. **Check browser console**
   - Full error details are logged
   - Stack trace shows where the panic occurred
   - Code preview shows the problematic code

4. **Common causes**:
   - Invalid SysML syntax
   - Unsupported features
   - Empty or malformed code
   - Special characters or encoding issues

## 📝 Code Changes

### Rust (wasm-bridge/src/lib.rs)
- Added input validation
- Improved panic message extraction
- Added parse check before CST generation

### Frontend (CstTab.jsx)
- Added code validation before WASM call
- Better error messages

## 🎯 Next Steps

If the error persists:
1. Check the exact code that causes the panic
2. Try with minimal code to isolate the issue
3. Check if it's a specific SysML feature causing the problem
4. Report with the exact code and error message
