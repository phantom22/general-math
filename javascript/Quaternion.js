/**
 * @typedef {[number,number,number,number]} Quaternion Quaternions are used to represent rotations.
 */
/**
 * Creates an immutable quaternion.
 * @param {Vector3} v vector.
 * @param {number} a angle in radians.
 * @returns {Quaternion}
 */
function Quat(v, a) {
    const t = a * 0.5, s = Math.sin(t), o = [Math.cos(t), v[0] * s, v[1] * s, v[2] * s];
    Object.freeze(o);
    return o;
}
/**
 * The dot product between two rotations.
 * @param {Quaternion} A quaternion A.
 * @param {Quaternion} B quaternion B.
 * @returns {number}
 */
Quat.dot = (A, B) => {
    return A[0] * B[0] + A[1] * B[1] + A[2] * B[2] + A[3] * B[3];
};
// rotation P -> Q P Q**-1
// Q = prev rotation
/**
 * Combines rotations A and B.
 * @param {Quaternion} A rotation A.
 * @param {Quaternion} B rotation B.
 * @returns {Quaternion}
 */
Quat.prod = (A, B) => {
};
/**
 * Returns true if two quaternions are exactly equal.
 * @param {Quaternion} A quaternion A.
 * @param {Quaternion} B quaternion B.
 * @returns {boolean}
 */
Quat.equals = (A, B) => A === B;
/**
 * Returns true if two quaternions are approximately equal.
 * @param {Quaternion} A quaternion A.
 * @param {Quaternion} B quaternion B.
 * @returns {boolean}
 */
Quat.compare = (A, B) => A[0] === B[0] && A[1] === B[1] && A[2] === B[2] && A[3] === B[3];
/**
 * Returns the length of a given quaternion.
 * @param {Quaternion} Q quaternion.
 * @returns {number}
 */
Quat.magnitude = (Q) => (Q[0] ** 2 + Q[1] ** 2 + Q[2] ** 2 + Q[3] ** 2) ** (0.5);
/**
 * Returns the squared length of a given quaternion.
 * @param {Quaternion} Q quaternion.
 * @returns {number}
 */
Quat.sqrdMagnitude = (Q) => Q[0] ** 2 + Q[1] ** 2 + Q[2] ** 2 + Q[3] ** 2;
/**
 * Returns the Inverse of a given rotation.
 * @param {Quaternion} Q rotation.
 * @returns {Quaternion}
 */
Quat.inverse = (Q) => { const m = 1 / Quat.sqrdMagnitude(Q); const q = [Q[0] * m, -Q[1] * m, -Q[2] * m, -Q[3] * m]; Object.freeze(q); return q; };
Quat.applyRotation = (A, p) => {
};
