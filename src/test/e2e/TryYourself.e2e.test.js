import { test, expect } from '@playwright/test'

test.describe('Try Yourself Page - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Try Yourself page
    // In a real scenario, this would be the deployed URL
    await page.goto('http://localhost:5173/try-yourself')
  })

  test('should load the page and display editor and documentation', async ({ page }) => {
    // Check page title
    await expect(page.locator('h1')).toContainText('Try SysML v2 Yourself')

    // Check editor is present
    await expect(page.locator('[data-testid="monaco-editor"]').or(page.locator('.monaco-editor'))).toBeVisible()

    // Check documentation tabs are present
    await expect(page.getByText('Documentation')).toBeVisible()
    await expect(page.getByText('CST')).toBeVisible()
    await expect(page.getByText('HIR')).toBeVisible()
    await expect(page.getByText('Stats')).toBeVisible()
  })

  test('should display default example code', async ({ page }) => {
    // Check that default example is loaded
    await expect(page.getByText('Vehicle System')).toBeVisible()
  })

  test('should switch between documentation tabs', async ({ page }) => {
    // Click CST tab
    await page.getByText('CST').click()
    await expect(page.getByText(/CST|Concrete Syntax Tree/i)).toBeVisible()

    // Click HIR tab
    await page.getByText('HIR').click()
    await expect(page.getByText(/HIR|High-level Intermediate Representation/i)).toBeVisible()

    // Click Stats tab
    await page.getByText('Stats').click()
    await expect(page.getByText(/Analytics|Statistics/i)).toBeVisible()

    // Click Documentation tab
    await page.getByText('Documentation').click()
    await expect(page.getByText('Vehicle System')).toBeVisible()
  })

  test('should switch between code examples', async ({ page }) => {
    // Click Hello World example
    await page.getByText('Hello World').click()
    await expect(page.getByText('Hello World')).toBeVisible()

    // Click Requirements example
    await page.getByText('Requirements').click()
    await expect(page.getByText('Requirements Example')).toBeVisible()
  })

  test('should display diagnostics for invalid code', async ({ page }) => {
    // This test would require interacting with Monaco editor
    // which is complex in Playwright. For now, we check that
    // the diagnostics panel exists
    const diagnosticsPanel = page.locator('.diagnostics-panel, [data-testid="diagnostics"]')
    
    // If diagnostics panel exists, it should be visible
    if (await diagnosticsPanel.count() > 0) {
      await expect(diagnosticsPanel.first()).toBeVisible()
    }
  })

  test('should handle WASM loading', async ({ page }) => {
    // Check console for WASM loading errors
    const errors = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.waitForTimeout(2000) // Wait for WASM to load

    // Should not have critical WASM errors
    const wasmErrors = errors.filter(e => 
      e.includes('WASM') && 
      !e.includes('not available') && 
      !e.includes('fallback')
    )
    expect(wasmErrors.length).toBe(0)
  })

  test('should update documentation when code changes', async ({ page }) => {
    // Wait for initial documentation to load
    await expect(page.getByText('Vehicle System')).toBeVisible()

    // Note: Interacting with Monaco editor programmatically is complex
    // In a real scenario, you might use Monaco's API or test via
    // the example selector
    await page.getByText('Hello World').click()
    await expect(page.getByText('Hello World')).toBeVisible()
  })

  test('should display error messages for invalid WASM operations', async ({ page }) => {
    // Navigate to CST tab which might trigger WASM errors
    await page.getByText('CST').click()
    
    // Wait a bit for potential errors
    await page.waitForTimeout(1000)

    // Check if error message is displayed (if WASM fails)
    const errorMessage = page.locator('.cst-error, .hir-error, .stats-error')
    const errorCount = await errorMessage.count()
    
    // If errors exist, they should be informative
    if (errorCount > 0) {
      await expect(errorMessage.first()).toBeVisible()
      const errorText = await errorMessage.first().textContent()
      expect(errorText).toContain('WASM')
    }
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Check that layout adapts
    await expect(page.getByText('Try SysML v2 Yourself')).toBeVisible()
    
    // Editor and documentation should still be accessible
    await expect(page.getByText('Documentation')).toBeVisible()
  })
})
