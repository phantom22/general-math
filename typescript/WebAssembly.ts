const Wasm = () => void 0;

type importRegistry = {
    [moduleName: string]: {
        sourceCode: Uint8Array,
        errByte?: number;
        [importedFunc: string]: unknown,
    }
};

/** Where all wasm modules go. */
Wasm.imported = <importRegistry>{};
/**
 * Tries to import a wasm module.
 * @param {string} moduleName 
 * @param {string} base64 
 * @returns 
 */
Wasm.fromBase64 = (moduleName:string, base64:string) => {
    try {
        const bin=atob(base64), bytes=new Uint8Array(bin.length);
        for (let i=0; i<bin.length; i++) {
            bytes[i] = bin.charCodeAt(i);
        }
        Wasm.imported[moduleName] = { sourceCode: bytes };
        return new Promise((resolve,reject) => {
            WebAssembly.instantiate(bytes.buffer, {})
                .then(v => { 
                    const k=Object.keys(v.instance.exports);
                    for (let i=0; i<k.length; i++) {
                        const ex = k[i];
                        Wasm.imported[moduleName][ex] = v.instance.exports[ex];
                    }
                    resolve(moduleName);
                })
                .catch(e => {
                    const errByte = e.toString().match(/[0-9]+/g)?.map(Number)[0]||0;
                    console.error(`Couldn't import '${moduleName}'!\n    ${e}. See below.`);
                    Wasm.memoryView(bytes, errByte);
                    Wasm.imported[moduleName].errByte = errByte;
                    reject(moduleName);
                })
        });
    }
    catch (e) {
        console.error(`The module '${moduleName}' was not correctly encoded to base64!`);
        return Promise.reject(moduleName);
    }
}
/** A table of all opcodes of the wasm assembly language. */
Wasm.opcodes = ["unreachable","nop","block","loop","if","else","try","catch","throw","rethrow","","end","br","br_if","br_table","return","call","call_indirect","return_call","return_call_indirect","","","","","delegate","catch_all","drop","select","select t","","","","local.get","local.set","local.tee","global.get","global.set","table.get","table.set","i32.load","i64.load","f32.load","f64.load","i32.load8_s","i32.load8_u","i32.load16_s","i32.load16_u","i64.load8_s","i64.load8_u","i64.load16_s","i64.load16_u","i64.load32_s","i64.load32_u","i32.store","i64.store","f32.store","f64.store","i32.store8","i32.store16","i64.store8","i64.store16","i64.store32","memory.size","memory.grow","i32.const","i64.const","f32.const","f64.const","i32.eqz","i32.eq","i32.ne","i32.it_s","i32.it_u","i32.gt_s","i32.gt_u","i32.le_s","i32.le_u","i32.ge_s","i32.ge_u","i64.eqz","i64.eq","i64.ne","i64.it_s","i64.it_u","i64.gt_s","i64.gt_u","i64.le_s","i64.le_u","i64.ge_s","i64.ge_u","f32.eq","f32.ne","f32.it","f32.gt","f32.le","f32.ge","f64.eq","f64.ne","f64.it","f64.gt","f64.le","f64.ge","i32.clz","i32.ctz","i32.popcnt","i32.add","i32.sub","i32.mul","i32.div_s","i32.div_u","i32.rem_s","i32.rem_u","i32.and","i32.or","i32.xor","i32.shl","i32.shr_s","i32.shr_u","i32.rotl","i32.rotr","i64.clz","i64.ctz","i64.popcnt","i64.add","i64.sub","i64.mul","i64.div_s","i64.div_u","i64.rem_s","i64.rem_u","i64.and","i64.or","i64.xor","i64.shl","i64.shr_s","i64.shr_u","i64.rotl","i64.rotr","f32.abs","f32.neg","f32.ceil","f32.floor","f32.trunc","f32.nearest","f32.sqrt","f32.add","f32.sub","f32.mul","f32.div","f32.min","f32.max","f32.copysign","f64.abs","f64.neg","f64.ceil","f64.floor","f64.trunc","f64.nearest","f64.sqrt","f64.add","f64.sub","f64.mul","f64.div","f64.min","f64.max","f64.copysign","i32.wrap_i64","i32.trunc_f32_s","i32.trunc_f32_u","i32.trunc_f64_s","i32.trunc_f64_u","i64.extend_i32_s","i64.extend_i32_u","i64.trunc_f32_s","i64.trunc_f32_u","i64.trunc_f64_s","i64.trunc_f64_u","f32.convert_i32_s","f32.convert_i32_u","f32.convert_i64_s","f32.convert_i64_u","f32.demote_f64","f64.convert_i32_s","f64.convert_i32_u","f64.convert_i64_s","f64.convert_i64_u","f64.promote_f32","i32.reinterpret_f32","i64.reinterpret_f64","f32.reinterpret_i32","f64.reinterpret_i64","i32.extend8_s","i32.extends16_s","i64,extend8_s","i64.extends16_s","i64.extend32_s","","","","","","","","","","","","ref.null","ref.is_null","ref.func","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","**","SIMD","",""];
Object.freeze(Wasm.opcodes);
/**
 * Prints to console the standard memory view of a program.
 * @param {Uint8Array} mem
 * @param {number} errByte error offset.
 */
Wasm.memoryView = (mem: Uint8Array, errByte=-1) => {
    const br = "=".repeat(115) + "\n",
          err = "color:#ff751a;font-weight:bold;", def= "color:#ffffff;font-weight:normal;",
          format = () => "";
    let styles = [def], 
        o = "%c\n"+br+"|  decimal  |  hexa   |    01  02  03  04  05  06  07  08  09  10  11  12  13  14  15  16    |        text        |"+"\n"+br;
    for (let offset=0; offset<mem.length; offset+=16) {
        let t = "| ", bytes = Array.from(mem.slice(offset,offset+16));
        t += offset.toString().padStart(9," ") + " | "; // decimal offset
        t += "0x"+offset.toString(16).padStart(5,"0") + " |    "; // hexadecimal offset

        const containsErr = errByte>-1&&(offset>=errByte||offset<=errByte&&offset+15>=errByte),
              firstErrLine = offset<=errByte&&offset+15>=errByte;
        t += bytes.map((v,i) => {
            let _ = v.toString(16).padStart(2,"0");
            if (containsErr&&offset+i>=errByte) {
                if (i===0||offset+i===errByte) {
                    styles.push(err);
                    _ = "%c"+_;
                }
                else if (i===bytes.length-1) {
                    styles.push(def);
                    _ = _+"%c";
                }
            }
            return _;
        }).join("  ").padEnd(containsErr?66:62," ") + "    |  "; // single bytes
        t += bytes.map((v,i) => {
            let _ = v>31&&v<127||v>160&&v!==173?String.fromCharCode(v):".";
            if (containsErr&&offset+i>=errByte) {
                if (i===0||offset+i===errByte) {
                    styles.push(err);
                    _ = "%c"+_;
                }
                else if (i===bytes.length-1) {
                    styles.push(def);
                    _ = _+"%c";
                }
            }
            return _;
        }).join("").padEnd(containsErr?20:16," ") + "  |" + (firstErrLine?"  %c<---- Something went wrong!%c":"") + "\n"; // decoded to string
        if (firstErrLine) styles.push(err,def);
        o += t;
    }
    o += br;
    console.log(o,...styles);
}
Object.freeze(Wasm);