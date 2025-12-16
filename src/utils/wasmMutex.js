/**
 * WASM Mutex - Ensures only one WASM function call executes at a time
 * This prevents "memory access out of bounds" errors from concurrent WASM calls
 */

class WasmMutex {
  constructor() {
    this.queue = []
    this.locked = false
  }

  /**
   * Acquire the lock and execute a function
   * @param {Function} fn - The function to execute
   * @returns {Promise} - The result of the function
   */
  async execute(fn) {
    return new Promise((resolve, reject) => {
      // If locked, add to queue
      if (this.locked) {
        this.queue.push({ fn, resolve, reject })
        return
      }

      // Acquire lock and execute immediately
      this.locked = true
      this._executeNext(fn, resolve, reject)
    })
  }

  /**
   * Internal method to execute the next function in the queue
   * @private
   */
  async _executeNext(fn, resolve, reject) {
    try {
      // Execute the function
      const result = await fn()
      resolve(result)
    } catch (error) {
      reject(error)
    } finally {
      // Release lock
      this.locked = false

      // Process next item in queue
      if (this.queue.length > 0) {
        const next = this.queue.shift()
        // Execute asynchronously to avoid stack overflow
        setTimeout(() => {
          this.locked = true
          this._executeNext(next.fn, next.resolve, next.reject)
        }, 0)
      }
    }
  }

  /**
   * Check if the mutex is currently locked
   * @returns {boolean}
   */
  isLocked() {
    return this.locked
  }

  /**
   * Get the number of pending operations
   * @returns {number}
   */
  queueLength() {
    return this.queue.length
  }
}

// Create a singleton instance
const wasmMutex = new WasmMutex()

export default wasmMutex

