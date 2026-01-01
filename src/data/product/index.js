/**
 * Product Data Barrel Export
 *
 * Centralized export for all product-related data structures.
 */

// Compliance Variants
export { default as complianceVariants, getProductionReadyVariants, getPlannedVariants, getVariantsByIndustry } from './complianceVariants'

// Commercial Editions
export { default as editions, getProductionReadyEditions, getCommercialEditions, getFreeEditions, getEditionById } from './editions'

// Platform Variants (Delivery Models)
export { default as platformVariants, getFeaturedVariants, getProductionReadyPlatformVariants, getVariantByTitle } from './platformVariants'

// Product Differentiators
export { default as differentiators } from './differentiators'

// LSP Features
export { default as lspFeatures, getCoreFeatures, getAdvancedFeatures, getTotalFeatureCount } from './lspFeatures'

// Product Tools
export { default as products, getProductionReadyProducts, getPlannedProducts, getProductsByEdition, getProductById, getCoreProducts, getAdvancedProducts } from './products'
