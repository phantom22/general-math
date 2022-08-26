/**
 * @module
 * Creates a 64-bit float array, for the purpose of being used as a buffer.
 * @param {number} s size.
 * @returns {Float64Array}
 */
const Buffer = (s=5000) => new Float64Array(s);
/**
 * Returns a Vector2, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset. 
 * @returns {Vector2}
 */
Buffer.toVec2 = (B:Float64Array, o:number): Vector2 => Vec2(B[o],B[o+1]);
/**
 * Returns a Vector3, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset. 
 * @returns {Vector3}
 */
Buffer.toVec3 = (B:Float64Array, o:number): Vector3 => Vec3(B[o],B[o+1],B[o+2]);
/**
 * Returns an Axis, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset. 
 * @returns {Axis}
 */
Buffer.toAx = (B:Float64Array, o:number): Axis => Ax(B[o],B[o+1],B[o+2]);
/**
 * Returns an Euler Rotation, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset. 
 * @returns {EulerRotation}
 */
Buffer.toEuler = (B:Float64Array, o:number): EulerRotation => Euler(B[o],B[o+1],B[o+2]);
/**
 * Returns a Vector4, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset. 
 * @returns {Vector4}
 */
Buffer.toVec4 = (B:Float64Array, o:number): Vector4 => Vec4(B[o],B[o+1],B[o+2],B[o+3]);
/**
 * Returns a Quaterion, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset. 
 * @returns {Quaterion}
 */
Buffer.toQuat = (B:Float64Array, o:number): Quaternion => Quat(B[o],B[o+1],B[o+2],B[o+3]);
/**
 * Returns a Matrix3, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset. 
 * @returns {Matrix3}
 */
Buffer.toMat3 = (B:Float64Array, o:number): Matrix3 => Mat3(B[o],B[o+1],B[o+2],B[o+3],B[o+4],B[o+5],B[o+6],B[o+7],B[o+8]);
/**
 * Returns a Matrix4, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset. 
 * @returns {Matrix4}
 */
Buffer.toMat4 = (B:Float64Array, o:number): Matrix4 => Mat4(B[o],B[o+1],B[o+2],B[o+3],B[o+4],B[o+5],B[o+6],B[o+7],B[o+8],B[o+9],B[o+10],B[o+11],B[o+12],B[o+13],B[o+14],B[o+15]);
Buffer.dataTypes = {
    int8: 1,
    int16: 2,
    int32: 3,
    int64: 4,
    float32: 3,
    float64: 4,
    uint8: 1,
    uint16: 2,
    uint32: 3,
    uint64: 4,
};
Object.freeze(Buffer.dataTypes);
type BufferIndex = [offset:number, type:string, label?:string];
Buffer.scanner = class {
    end: Function;
    constructor(buffer:ArrayBuffer, checklist:BufferIndex[], refreshRate=10) {
        checklist = checklist.filter(v => v[0]+(Buffer.dataTypes[v[1]]||0) <= buffer.byteLength);
        const dw = new DataView(buffer);
        const br = "=".repeat(62) + "\n";
        const intervalId = setInterval(() => {
            let o = <string[]>[];
            for (let i=0; i<checklist.length; i++) {
                const [offset,type,label] = checklist[i];
                let t: unknown;
                switch (type) {
                    case "int8":
                        t = dw.getInt8(offset);
                        break;
                    case "int16":
                        t = dw.getInt16(offset);
                        break;
                    case "int32":
                        t = dw.getInt32(offset);
                        break;
                    case "int64":
                        t = dw.getBigInt64(offset);
                        break;
                    case "float32":
                        t = dw.getFloat32(offset);
                        break;
                    case "float64":
                        t = dw.getFloat64(offset);
                        break;
                    case "uint8":
                        t = dw.getUint8(offset);
                        break;
                    case "uint16":
                        t = dw.getUint16(offset);
                        break;
                    case "uint32":
                        t = dw.getUint32(offset);
                        break;
                    case "uint64":
                        t = dw.getBigUint64(offset);
                        break;
                    default:
                        t = -Infinity;
                        break;
                }
                o.push("| " + (label?label.slice(0,10).padEnd(12,"."):"var").padStart(12," ") + " | " + offset.toString().padStart(6," ") + " | " + t.toString().padStart(23," ") + " | " + type.padStart(8," ") + " |");
            }
            console.clear();
            console.log(br+"|    label     |  offs  |          value          |   type   |\n"+br+o.join("\n")+"\n"+br);
        }, 1000/refreshRate);
        this.end = function() {
            console.clear();
            clearInterval(intervalId);
        }
    }
};
Buffer.viewSnapshot = (b: ArrayBuffer) => {
    const a = new Uint8Array(b);
    Wasm.memoryView(a);
}