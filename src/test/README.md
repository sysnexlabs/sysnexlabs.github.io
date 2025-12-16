# Test Suite - Try Yourself Feature

Comprehensive test suite for all IDE core features and Documentation Viewer in WASM.

## Test Structure

```
src/test/
├── setup.js                    # Test setup and global mocks
├── utils/
│   ├── wasmMock.js             # WASM module mocks
│   ├── testData.js             # Test data (SysML code examples)
│   └── testHelpers.js          # Test helper functions
├── hooks/
│   └── useSysMLWasm.test.js    # Unit tests for hooks
├── components/
│   ├── DocumentationView.test.jsx
│   ├── DocumentationTabs.test.jsx
│   └── TryYourselfEditor.test.jsx
├── integration/
│   └── TryYourself.integration.test.jsx
└── e2e/
    └── TryYourself.e2e.test.js
```

## Running Tests

### Unit and Integration Tests (Vitest)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### E2E Tests (Playwright)

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e -- --ui
```

## Test Coverage

### ✅ WASM Features Tested

1. **Parsing (Diagnostics)**
   - ✅ Valid code parsing
   - ✅ Invalid code error detection
   - ✅ Line number accuracy
   - ✅ Error severity levels
   - ✅ Fallback parser behavior

2. **Documentation Generation**
   - ✅ Package extraction
   - ✅ Part definition extraction
   - ✅ Attribute extraction
   - ✅ Doc comment extraction
   - ✅ Error handling and fallback

3. **CST (Concrete Syntax Tree)**
   - ✅ CST generation
   - ✅ Tree structure
   - ✅ Statistics display
   - ✅ Error handling

4. **HIR (High-level Intermediate Representation)**
   - ✅ HIR generation
   - ✅ Root nodes
   - ✅ Statistics display
   - ✅ Error handling

5. **Analytics**
   - ✅ Metrics calculation
   - ✅ Complexity scores
   - ✅ Quality scores
   - ✅ Insights generation
   - ✅ Error handling

### ✅ Component Tests

1. **DocumentationView**
   - ✅ Empty state
   - ✅ Documentation display
   - ✅ Table of contents
   - ✅ Expand/collapse
   - ✅ Loading states
   - ✅ Error handling

2. **DocumentationTabs**
   - ✅ Tab switching
   - ✅ Tab content display
   - ✅ Active tab highlighting
   - ✅ Code change updates

3. **TryYourselfEditor**
   - ✅ Monaco editor integration
   - ✅ Example selector
   - ✅ Diagnostics display
   - ✅ Monaco markers
   - ✅ Navigation to errors

### ✅ Integration Tests

1. **Try Yourself Page**
   - ✅ Editor and documentation layout
   - ✅ Real-time updates
   - ✅ Tab switching
   - ✅ Example switching
   - ✅ WASM feature integration
   - ✅ Error handling

### ✅ E2E Tests

1. **Full User Flow**
   - ✅ Page loading
   - ✅ Editor display
   - ✅ Documentation display
   - ✅ Tab navigation
   - ✅ Example switching
   - ✅ WASM loading
   - ✅ Error handling
   - ✅ Responsive design

## Test Data

Test data includes:
- Valid SysML v2 code examples (simple, vehicle, requirements, interfaces, complex)
- Invalid SysML v2 code examples (for error testing)
- Expected diagnostics
- Expected documentation structures

## Mocking

- **WASM Module**: Fully mocked with `MockSysMLWasm` class
- **Monaco Editor**: Mocked with test utilities
- **Error Scenarios**: `MockSysMLWasmWithError` for error testing

## Continuous Integration

Tests are designed to run in CI/CD pipelines:
- Unit tests: Fast, no external dependencies
- Integration tests: Mocked dependencies
- E2E tests: Playwright with browser automation

## Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## Notes

- E2E tests require a running dev server (`npm run dev`)
- WASM mocks simulate real WASM behavior but don't require actual WASM build
- Monaco editor is mocked for unit tests but tested in E2E
- Error scenarios test both WASM errors and fallback behavior
