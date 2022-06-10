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