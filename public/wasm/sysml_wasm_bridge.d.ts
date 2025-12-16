/* tslint:disable */
/* eslint-disable */
/**
 * Initialize panic hook for better error reporting in WASM
 * This should be called when the WASM module is loaded
 */
export function init_panic_hook(): void;
/**
 * Main SysML Parser and Documentation Provider
 */
export class SysMLWasm {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Generate CST (Concrete Syntax Tree)
   */
  generate_cst(source: string, file_uri: string): any;
  /**
   * Generate HIR (High-level Intermediate Representation)
   */
  generate_hir(source: string, file_uri: string): any;
  /**
   * Provide hover information
   */
  provide_hover(source: string, line: number, character: number): any;
  /**
   * Generate analytics and statistics
   */
  generate_analytics(source: string, file_uri: string): any;
  /**
   * Provide code completion at a given position
   * Returns completion items for Monaco editor
   */
  provide_completion(source: string, line: number, character: number): any;
  /**
   * Provide definition location for go-to-definition
   */
  provide_definition(source: string, line: number, character: number): any;
  /**
   * Find all references to a symbol
   */
  provide_references(source: string, line: number, character: number, include_declaration: boolean): any;
  /**
   * Provide inlay hints for type annotations
   */
  provide_inlay_hints(source: string, start_line: number, end_line: number): any;
  /**
   * Generate documentation from SysML code
   * Uses Salsa queries which automatically trigger HIR lowering via registered HirLowerer
   */
  generate_documentation(source: string, file_uri: string): any;
  /**
   * Provide folding ranges for code folding
   */
  provide_folding_ranges(source: string): any;
  /**
   * Provide signature help for function calls
   */
  provide_signature_help(source: string, line: number, character: number): any;
  /**
   * Provide semantic tokens for syntax highlighting
   * Returns array of semantic tokens in LSP format
   */
  provide_semantic_tokens(source: string): any;
  /**
   * Provide document symbols for outline view
   */
  provide_document_symbols(source: string): any;
  /**
   * Create a new SysML WASM instance
   */
  constructor();
  /**
   * Parse SysML v2 code and return diagnostics
   * Uses the full diagnostics pipeline including syntax, semantic, and style diagnostics
   */
  parse(source: string): any;
  /**
   * Parse UVL code and return feature model as JSON
   * Returns a JSON representation of the feature tree compatible with the React FeatureDiagram component
   */
  parse_uvl(source: string): any;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_sysmlwasm_free: (a: number, b: number) => void;
  readonly sysmlwasm_generate_analytics: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly sysmlwasm_generate_cst: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly sysmlwasm_generate_documentation: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly sysmlwasm_generate_hir: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly sysmlwasm_new: () => number;
  readonly sysmlwasm_parse: (a: number, b: number, c: number) => [number, number, number];
  readonly sysmlwasm_parse_uvl: (a: number, b: number, c: number) => [number, number, number];
  readonly sysmlwasm_provide_completion: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly sysmlwasm_provide_definition: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly sysmlwasm_provide_document_symbols: (a: number, b: number, c: number) => [number, number, number];
  readonly sysmlwasm_provide_folding_ranges: (a: number, b: number, c: number) => [number, number, number];
  readonly sysmlwasm_provide_hover: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly sysmlwasm_provide_inlay_hints: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly sysmlwasm_provide_references: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number];
  readonly sysmlwasm_provide_semantic_tokens: (a: number, b: number, c: number) => [number, number, number];
  readonly sysmlwasm_provide_signature_help: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly init_panic_hook: () => void;
  readonly __wbindgen_malloc_command_export: (a: number, b: number) => number;
  readonly __wbindgen_realloc_command_export: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free_command_export: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly __externref_table_dealloc_command_export: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
