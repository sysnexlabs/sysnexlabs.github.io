import { execSync } from 'child_process'
import { statSync, existsSync, copyFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const wasmPath = join(__dirname, '../src/wasm/sysml_wasm_bridge_bg.wasm')
const wasmOptPath = join(__dirname, '../src/wasm/sysml_wasm_bridge_bg.wasm.bak')
const optimizedPath = join(__dirname, '../src/wasm/sysml_wasm_bridge_bg.optimized.wasm')

/**
 * Optimize WASM file using wasm-opt
 *
 * Applies aggressive optimization flags:
 * - -O4: Maximum optimization level (includes -O3 + more aggressive opts)
 * - --strip-debug: Remove debug information
 * - --strip-producers: Remove producer section
 * - --strip-dwarf: Remove DWARF debug info
 * - --converge: Run optimizations until no more improvements
 * - --vacuum: Remove obviously unneeded code
 */
async function optimizeWasm() {
  console.log('🔄 Optimizing WASM file...\n')

  // Check if WASM file exists
  if (!existsSync(wasmPath)) {
    console.error(`❌ WASM file not found: ${wasmPath}`)
    console.error('Make sure the WASM file is in src/wasm/ directory')
    process.exit(1)
  }

  // Get original file size
  const statsBefore = statSync(wasmPath)
  const sizeBefore = statsBefore.size

  console.log(`📦 Original size: ${formatBytes(sizeBefore)}\n`)

  // Create backup
  copyFileSync(wasmPath, wasmOptPath)
  console.log(`✓ Created backup: ${wasmOptPath}\n`)

  try {
    console.log('🔧 Running wasm-opt with optimization flags...')
    console.log('   Flags: -O4 --strip-debug --strip-producers --strip-dwarf --converge --vacuum\n')

    // Run wasm-opt
    // Note: Using npx to run the locally installed wasm-opt
    execSync(
      `npx wasm-opt -O4 --strip-debug --strip-producers --strip-dwarf --converge --vacuum "${wasmPath}" -o "${optimizedPath}"`,
      { stdio: 'inherit' }
    )

    // Get optimized file size
    const statsAfter = statSync(optimizedPath)
    const sizeAfter = statsAfter.size

    const reduction = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1)
    const saved = sizeBefore - sizeAfter

    console.log('\n📊 Optimization Results:')
    console.log(`  Original:  ${formatBytes(sizeBefore)}`)
    console.log(`  Optimized: ${formatBytes(sizeAfter)}`)
    console.log(`  Saved:     ${formatBytes(saved)} (${reduction}% reduction)`)

    // Replace original with optimized
    copyFileSync(optimizedPath, wasmPath)
    console.log(`\n✅ Optimization complete!`)
    console.log(`   Optimized WASM saved to: ${wasmPath}`)
    console.log(`   Backup available at: ${wasmOptPath}`)
    console.log(`\n⚠️  To restore original: cp ${wasmOptPath} ${wasmPath}`)
  } catch (error) {
    console.error('\n❌ Optimization failed:', error.message)
    console.error('Restoring from backup...')
    copyFileSync(wasmOptPath, wasmPath)
    console.error('Original file restored')
    process.exit(1)
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Run optimization
optimizeWasm().catch(console.error)
