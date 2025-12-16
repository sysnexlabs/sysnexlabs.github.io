const fs = require('fs')
const path = require('path')

const wasmPath = path.resolve(__dirname, 'public/wasm/sysml_wasm_bridge_bg.wasm')
const jsPath = path.resolve(__dirname, 'public/wasm/sysml_wasm_bridge.js')

async function testCST() {
  const code = `package 'Vehicle System' {
    doc /*
     * A simple vehicle system example demonstrating
     * SysML v2 structural modeling.
     */

    part def Vehicle {
        doc /* Here follow Vehicle description ... */
        doc Tip /* you can also write Tips */
    }
}`

  const module = await import(jsPath)

  // Initialize WASM module
  const wasmBuffer = fs.readFileSync(wasmPath)
  await module.default(wasmBuffer)

  // Create instance
  const wasm = new module.SysMLWasm()
  const result = wasm.generate_cst(code, 'test://file.sysml')

  console.log('CST result:')
  console.log(JSON.stringify(result, null, 2))
}

testCST().catch(console.error)
