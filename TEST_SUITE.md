# Comprehensive Test Suite - Try Yourself Feature

## Overview

This test suite provides comprehensive coverage for all IDE core features and the Documentation Viewer in WASM, ensuring full functionality and proper integration in the "Try Yourself" page.

## Test Infrastructure

### Technologies
- **Vitest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing
- **Coverage**: v8 coverage provider

### Installation

```bash
npm install
```

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode
```bash
npm test -- --watch
```

### UI Mode
```bash
npm run test:ui
```

### Coverage Report
```bash
npm run test:coverage
```

### E2E Tests
```bash
npm run test:e2e
```

## Test Structure

```
src/test/
├── setup.js                          # Global test setup
├── utils/
│   ├── wasmMock.js                   # WASM module mocks
│   ├── wasmMockSetup.js              # WASM mock setup utilities
│   ├── testData.js                   # Test data (SysML examples)
│   └── testHelpers.js                # Test helper functions
├── hooks/
│   └── useSysMLWasm.test.js          # Hook unit tests
├── components/
│   ├── DocumentationView.test.jsx    # Documentation view tests
│   ├── DocumentationTabs.test.jsx   # Tabs component tests
│   └── TryYourselfEditor.test.jsx    # Editor component tests
├── integration/
│   └── TryYourself.integration.test.jsx  # Integration tests
└── e2e/
    └── TryYourself.e2e.test.js      # E2E tests
```

## Test Coverage

### ✅ WASM Features

#### 1. Parsing (Diagnostics)
- ✅ Valid code parsing returns empty diagnostics
- ✅ Invalid code detection (unquoted packages, missing types)
- ✅ Line number accuracy
- ✅ Error severity levels (error, warning, info, hint)
- ✅ Fallback parser when WASM unavailable
- ✅ Error handling for WASM panics

#### 2. Documentation Generation
- ✅ Package extraction with metadata
- ✅ Part definition extraction
- ✅ Attribute extraction with types and defaults
- ✅ Doc comment extraction
- ✅ Nested element structure
- ✅ Error handling and fallback to simple parser
- ✅ Empty code handling
- ✅ Debouncing for performance

#### 3. CST (Concrete Syntax Tree)
- ✅ CST generation from source code
- ✅ Tree structure with root and children
- ✅ Statistics (nodes, tokens, depth)
- ✅ Error handling for invalid code
- ✅ WASM panic handling

#### 4. HIR (High-level Intermediate Representation)
- ✅ HIR generation from source code
- ✅ Root nodes extraction
- ✅ Statistics display
- ✅ NoHirData error handling
- ✅ WASM panic handling

#### 5. Analytics
- ✅ Metrics calculation (elements, packages, definitions, doc coverage)
- ✅ Complexity scores
- ✅ Quality scores
- ✅ Insights generation
- ✅ FileNotFound error handling
- ✅ WASM panic handling

### ✅ Component Tests

#### DocumentationView
- ✅ Empty state rendering
- ✅ Documentation display for valid code
- ✅ Package title display
- ✅ Part definitions display
- ✅ Attributes display
- ✅ Doc comments display
- ✅ Table of contents rendering
- ✅ Expand/collapse functionality
- ✅ Loading states
- ✅ Error handling with fallback

#### DocumentationTabs
- ✅ All tab buttons render
- ✅ Default tab (Documentation) active
- ✅ Tab switching functionality
- ✅ CST tab content display
- ✅ HIR tab content display
- ✅ Stats tab content display
- ✅ Active tab highlighting
- ✅ Code change updates
- ✅ Empty code handling

#### TryYourselfEditor
- ✅ Monaco editor rendering
- ✅ Example selector display
- ✅ Default example loading
- ✅ Example switching
- ✅ onCodeChange callback
- ✅ Diagnostics display
- ✅ Monaco markers setting
- ✅ Navigation to error lines

### ✅ Integration Tests

#### Try Yourself Page
- ✅ Editor and documentation side-by-side layout
- ✅ Real-time documentation updates
- ✅ Tab navigation
- ✅ Example switching
- ✅ WASM parser integration
- ✅ WASM documentation generator integration
- ✅ WASM CST generator integration
- ✅ WASM HIR generator integration
- ✅ WASM analytics generator integration
- ✅ Error handling across all features
- ✅ Fallback behavior

### ✅ E2E Tests

#### Full User Flow
- ✅ Page loads correctly
- ✅ Editor and documentation visible
- ✅ Default example displayed
- ✅ Tab switching works
- ✅ Example switching works
- ✅ WASM loads without errors
- ✅ Documentation updates on code change
- ✅ Error messages display correctly
- ✅ Responsive design on mobile

## Test Data

### Valid SysML v2 Examples
- **Simple**: Basic package with one part
- **Vehicle**: Complex system with multiple parts and attributes
- **Requirements**: Requirement definitions
- **Interfaces**: Interface definitions with ports
- **Complex**: Multi-level nested system

### Invalid SysML v2 Examples
- Unquoted package names
- Missing attribute types
- Syntax errors

## Mocking Strategy

### WASM Module Mocking
The `MockSysMLWasm` class simulates all WASM functions:
- `parse()`: Returns diagnostics array
- `generate_documentation()`: Returns documentation structure
- `generate_cst()`: Returns CST tree
- `generate_hir()`: Returns HIR structure
- `generate_analytics()`: Returns analytics data

### Error Scenarios
`MockSysMLWasmWithError` simulates various error conditions:
- Parse errors
- Documentation generation errors
- CST generation errors
- HIR generation errors
- Analytics generation errors

### Monaco Editor Mocking
Monaco editor is mocked for unit tests but tested in E2E:
- Editor instance creation
- Model access
- Marker setting
- Position navigation

## Continuous Integration

### GitHub Actions Integration
Tests can be integrated into CI/CD:
```yaml
- name: Run tests
  run: npm test

- name: Run E2E tests
  run: npm run test:e2e

- name: Generate coverage
  run: npm run test:coverage
```

## Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## Best Practices

1. **Isolation**: Each test is independent
2. **Mocking**: WASM and external dependencies are mocked
3. **Async Handling**: Proper use of `waitFor` for async operations
4. **Error Scenarios**: Both success and error paths are tested
5. **User Interactions**: Real user events are simulated
6. **Accessibility**: Components are tested for accessibility

## Troubleshooting

### Tests Failing
1. Check if WASM mocks are properly set up
2. Verify Monaco editor mocks
3. Ensure async operations are properly awaited
4. Check console for error messages

### E2E Tests Failing
1. Ensure dev server is running (`npm run dev`)
2. Check Playwright browser installation
3. Verify base URL in `playwright.config.js`

### Coverage Low
1. Check which files are excluded in `vitest.config.js`
2. Verify all code paths are tested
3. Check for untested error handlers

## Next Steps

1. Add visual regression tests
2. Add performance benchmarks
3. Add accessibility tests (a11y)
4. Add cross-browser compatibility tests
5. Add load testing for WASM operations
