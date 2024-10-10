import fs from 'fs-extra'

const src = 'node_modules/three/examples/jsm/libs/draco/gltf'
const output = 'public/draco'

// Copy draco decoder from three.js into the public directory
fs.copy(`${src}/draco_decoder.wasm`, `${output}/draco_decoder.wasm`, err => {
	if (err) throw new Error(err)
})

fs.copy(`${src}/draco_wasm_wrapper.js`, `${output}/draco_wasm_wrapper.js`, err => {
	if (err) throw new Error(err)
})
