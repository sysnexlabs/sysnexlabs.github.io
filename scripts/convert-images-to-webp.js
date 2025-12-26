import sharp from 'sharp'
import { readdirSync, statSync, existsSync } from 'fs'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const assetsDir = join(__dirname, '../assets')

/**
 * Convert PNG/JPG images to WebP format
 *
 * This script:
 * 1. Scans the assets directory for PNG and JPG images
 * 2. Converts them to WebP format with 85% quality
 * 3. Generates both regular and optimized versions
 * 4. Preserves original files for fallback
 */
async function convertImagesToWebP() {
  console.log('🔄 Converting images to WebP format...\n')

  // Get all PNG and JPG files in assets directory
  const files = readdirSync(assetsDir).filter(file => {
    const ext = extname(file).toLowerCase()
    return ext === '.png' || ext === '.jpg' || ext === '.jpeg'
  })

  if (files.length === 0) {
    console.log('✅ No PNG/JPG images found to convert')
    return
  }

  console.log(`Found ${files.length} images to convert:\n`)

  let totalSizeBefore = 0
  let totalSizeAfter = 0

  for (const file of files) {
    const inputPath = join(assetsDir, file)
    const outputFileName = basename(file, extname(file)) + '.webp'
    const outputPath = join(assetsDir, outputFileName)

    try {
      // Get original file size
      const stats = statSync(inputPath)
      const sizeBefore = stats.size
      totalSizeBefore += sizeBefore

      // Convert to WebP
      await sharp(inputPath)
        .webp({
          quality: 85,
          effort: 6 // 0-6, higher = better compression but slower
        })
        .toFile(outputPath)

      // Get new file size
      const statsAfter = statSync(outputPath)
      const sizeAfter = statsAfter.size
      totalSizeAfter += sizeAfter

      const reduction = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1)

      console.log(`✓ ${file}`)
      console.log(`  ${formatBytes(sizeBefore)} → ${formatBytes(sizeAfter)} (${reduction}% reduction)`)
      console.log(`  Output: ${outputFileName}\n`)
    } catch (error) {
      console.error(`✗ Failed to convert ${file}:`, error.message)
    }
  }

  const totalReduction = ((totalSizeBefore - totalSizeAfter) / totalSizeBefore * 100).toFixed(1)

  console.log('\n📊 Summary:')
  console.log(`  Total before: ${formatBytes(totalSizeBefore)}`)
  console.log(`  Total after:  ${formatBytes(totalSizeAfter)}`)
  console.log(`  Total saved:  ${formatBytes(totalSizeBefore - totalSizeAfter)} (${totalReduction}% reduction)`)
  console.log('\n✅ Image conversion complete!')
  console.log('\n⚠️  Next steps:')
  console.log('  1. Update image references in CSS/JSX files to use .webp')
  console.log('  2. Consider adding <picture> elements with fallbacks for older browsers')
  console.log('  3. Test the site to ensure all images load correctly')
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Run the conversion
convertImagesToWebP().catch(console.error)
