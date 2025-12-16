/**
 * Utility functions for handling WASM errors
 */

import wasmMutex from './wasmMutex'

/**
 * Safely call a WASM function and handle errors
 * Uses a mutex to ensure only one WASM call executes at a time
 * @param {Function} wasmFn - The WASM function to call (can be a function that returns a promise or a direct function)
 * @param {Array} args - Arguments to pass to the function (if wasmFn is a direct function)
 * @returns {Promise<any>} - The result of the function call
 */
export async function safeWasmCall(wasmFn, ...args) {
  // Use mutex to ensure only one WASM call at a time
  return wasmMutex.execute(async () => {
    try {
      // If wasmFn is a function that takes no args, call it directly
      // Otherwise, if args are provided, call wasmFn with args
      let result
      if (args.length > 0) {
        result = wasmFn(...args)
      } else if (typeof wasmFn === 'function') {
        // If wasmFn is a function that returns a promise or value, call it
        result = wasmFn()
      } else {
        throw new Error('Invalid wasmFn: must be a function')
      }
      
      // Check if result is a Promise
      if (result && typeof result.then === 'function') {
        return await result
      }
      
      return result
    } catch (err) {
    // Enhanced error logging
    console.group('🔴 WASM Function Call Error')
    console.error('Function:', wasmFn?.name || 'unknown')
    console.error('Arguments:', args)
    console.error('Error object:', err)
    console.error('Error type:', typeof err)
    console.error('Error constructor:', err?.constructor?.name)
    console.error('Error name:', err?.name)
    console.error('Error message:', err?.message)
    console.error('Error stack:', err?.stack)
    
    if (err?.toString) {
      console.error('Error toString():', err.toString())
    }
    
    if (err instanceof WebAssembly.RuntimeError) {
      console.error('⚠️ WASM RuntimeError detected')
      console.error('This usually indicates a Rust panic in the WASM module.')
      console.error('RuntimeError details:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      })
    }
    
    // Try to extract panic message if available
    if (err?.message) {
      const msg = err.message
      if (msg.includes('Panic:') || msg.includes('panicked')) {
        const panicMsg = msg.split('Panic:')[1] || msg.split('panicked')[1]
        console.error('Extracted panic message:', panicMsg?.trim())
      }
    }
    
    console.groupEnd()

    // Re-throw with enhanced error message
    throw err
    }
  })
}

/**
 * Format WASM error for display
 * @param {Error} err - The error object
 * @returns {string} - Formatted error message
 */
export function formatWasmError(err, context = {}) {
  const { code, functionName } = context
  
  if (err instanceof WebAssembly.RuntimeError) {
    let message = 'WASM RuntimeError: unreachable. This usually indicates a Rust panic in the WASM module.'
    
    // Add context if available
    if (functionName) {
      message += `\n\nFunction: ${functionName}`
    }
    
    if (code) {
      const codePreview = code.split('\n').slice(0, 5).join('\n')
      message += `\n\nCode preview:\n${codePreview}${code.split('\n').length > 5 ? '\n...' : ''}`
    }
    
    message += '\n\nCheck the browser console (F12) for full details and stack trace.'
    
    return message
  }
  
  if (err instanceof Error) {
    let msg = err.message || err.toString()
    
    // Extract panic messages
    if (msg.includes('Panic:')) {
      const panicMsg = msg.split('Panic:')[1]?.trim()
      if (panicMsg) {
        let result = `WASM panic: ${panicMsg}`
        if (functionName) {
          result += `\n\nFunction: ${functionName}`
        }
        return result
      }
    }
    
    // Handle specific error types
    if (msg.includes('unreachable')) {
      let result = 'WASM runtime error: unreachable.'
      if (functionName) {
        result += `\n\nFunction: ${functionName}`
      }
      if (code) {
        const codePreview = code.split('\n').slice(0, 3).join('\n')
        result += `\n\nCode preview:\n${codePreview}`
      }
      result += '\n\nCheck browser console (F12) for full details.'
      return result
    }
    
    if (msg.includes('panicked')) {
      let result = `WASM panic detected: ${msg}`
      if (functionName) {
        result += `\n\nFunction: ${functionName}`
      }
      return result
    }
    
    return msg
  }
  
  if (typeof err === 'string') {
    return err
  }
  
  try {
    return JSON.stringify(err)
  } catch {
    return String(err)
  }
}
