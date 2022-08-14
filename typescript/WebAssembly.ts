const Wasm = () => void 0;

/** Where all wasm modules go. */
Wasm.imported = {};
/** Needed for debugging */
Wasm.rawBytes = {};
Wasm.fromBase64 = (moduleName:string, base64:string) => {
    try {
        const bin=atob(base64), bytes=new Uint8Array(bin.length);
        for (let i=0; i<bin.length; i++) {
            bytes[i] = bin.charCodeAt(i);
        }
        // @ts-ignore
        Wasm.rawBytes[moduleName] = bytes;
        return new Promise((resolve,reject) => { 
            WebAssembly.instantiate(bytes.buffer, {})
                .then(v => { 
                    Wasm.imported[moduleName] = {};
                    const k=Object.keys(v.instance.exports);
                    for (let i=0; i<k.length; i++) {
                        const ex = k[i];
                        // @ts-ignore
                        Wasm.imported[moduleName][ex] = v.instance.exports[ex];
                        resolve(null);
                    }
                })
                .catch(e => { reject(e+"\n\n"+Wasm.getMemoryDump(moduleName)) })
        });
    }
    catch (e) {
        return Promise.reject(`The module '${moduleName}' was not correctly encoded to base64!`);
    }
}
/**
 * Memory view of a module.
 * @param {string} moduleName
 */
Wasm.getMemoryDump = (moduleName:string): string => { 
    // @ts-ignore 
    const d = Wasm.rawBytes[moduleName]; return (Object(d).buffer instanceof ArrayBuffer ? new Uint8Array(d.buffer) : typeof d === 'string' ? (new TextEncoder('utf-8')).encode(d) : new Uint8ClampedArray(d)).reduce((p, c, i, a) => p + (i % 16 === 0 ? i.toString(16).padStart(6, 0) + '  ' : ' ') + c.toString(16).padStart(2, 0) + (i === a.length - 1 || i % 16 === 15 ? ' '.repeat((15 - i % 16) * 3) + Array.from(a).splice(i - i % 16, 16).reduce((r, v) => r + (v > 31 && v < 127 || v > 159 ? String.fromCharCode(v) : '.'), '  ') + '\n' : ''), '')
}