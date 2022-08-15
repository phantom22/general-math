const Wasm = () => void 0;

/** Where all wasm modules go. */
Wasm.imported = {};
Wasm.fromBase64 = (moduleName:string, base64:string) => {
    try {
        const bin=atob(base64), bytes=new Uint8Array(bin.length);
        for (let i=0; i<bin.length; i++) {
            bytes[i] = bin.charCodeAt(i);
        }
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
                .catch(e => { 
                    console.error(`Couldn't import '${moduleName}'!\n   ${e}`);
                    Wasm.getMemoryView(bytes, e.toString().match(/[0-9]+/g)?.map(Number)[0]);
                })
        });
    }
    catch (e) {
        return Promise.reject(`The module '${moduleName}' was not correctly encoded to base64!`);
    }
}

/**
 * Memory view of an array of bytes.
 * @param {Uint8Array} mem
 */
Wasm.getMemoryView = (mem: Uint8Array, errorOffset=-1) => {
    const hex = 16, br = "=".repeat(115) + "\n",
          err = "color:#ff751a;font-weight:bold;", def= "color:#ffffff;font-weight:normal;"
    let styles = [def], 
        o = "%c\n"+br+"|  decimal  |  hexad  |    01  02  03  04  05  06  07  08  09  10  11  12  13  14  15  16    |      decoded       |"+"\n"+br;
    for (let offset=0; offset<mem.length; offset+=hex) {
        let t = "| ", bytes = Array.from(mem.slice(offset,offset+hex));
        t += offset.toString().padStart(9," ") + " | "; // decimal offset
        t += "0x"+offset.toString(hex).padStart(5,"0") + " |    "; // hexadecimal offset

        let errFlag = false, first = true;
        t += bytes.map((v,i) => {
            let _ = "";
            if (!errFlag&&errorOffset!==-1&&offset+i>=errorOffset) {
                styles.push(err);
                errFlag = true;
                _ = "%c";
            }
            else if (errFlag&&i===bytes.length-1) {
                styles.push(def);
            }
            return _+v.toString(16).padStart(2,"0")+(errFlag&&i===bytes.length-1?"%c":"") 
        }).join("  ").padEnd(errFlag?66:62," ") + "    |  "; // single bytes
        errFlag = false;
        t += bytes.map(v => v>31&&v<127||v>159?String.fromCharCode(v):".").join("").padEnd(hex," ") + "  |" + (offset<=errorOffset&&offset+15>=errorOffset?"  <---- Something went wrong!":"") + "\n"; // decoded to string
        o += t;
    }
    o += br;
    console.log(o,...styles);
}