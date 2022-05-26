/**
 * @typedef {[number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number]} Matrix4x4 A standard 4x4 transformation matrix.
 */
/**
 * @module
 * Creates an immutable 4x4 matrix.
 * @param {number[]} v values
 * @returns {Matrix4x4}
 */
function Mat4x4(...v) {
    const mat = Array(16).fill(0);
    if (v.length > 16)
        throw "Too many values!";
    for (let i = 0; i < v.length; i++) {
        mat[i] = v[i];
    }
    Object.freeze(mat);
    return mat;
}
/**
 * Returns the identity matrix.
 * @returns {Matrix4x4}
 */
Mat4x4.identity = () => Mat4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
/**
 * Returns a matrix with all elements set to zero.
 * @returns {Matrix4x4}
 */
Mat4x4.zero = () => Mat4x4();
/**
 * Returns the determinant of a given matrix.
 * @param {Matrix4x4} M matrix.
 * @returns {number}
 */
Mat4x4.det = (M) => -M[12] * (M[9] * (M[2] * M[7] - M[3] * M[6]) - M[10] * (M[1] * M[7] - M[3] * M[5]) + M[11] * (M[1] * M[6] - M[2] * M[5])) + M[13] * (M[8] * (M[2] * M[7] - M[3] * M[6]) - M[10] * (M[0] * M[7] - M[3] * M[4]) + M[11] * (M[0] * M[6] - M[2] * M[4])) - M[14] * (M[8] * (M[1] * M[7] - M[3] * M[5]) - M[9] * (M[0] * M[7] - M[3] * M[4]) + M[11] * (M[0] * M[5] - M[1] * M[4])) + M[15] * (M[8] * (M[1] * M[6] - M[2] * M[5]) - M[9] * (M[0] * M[6] - M[2] * M[4]) + M[10] * (M[0] * M[5] - M[1] * M[4]));
/**
 * Returns the transpose of a given matrix.
 * @param {Matrix4x4} M matrix.
 * @returns {Matrix4x4}
 */
Mat4x4.transpose = (A) => Mat4x4(A[0], A[4], A[8], A[12], A[1], A[5], A[9], A[13], A[2], A[6], A[10], A[14], A[3], A[7], A[11], A[15]);
/**
 * Returns the inverse of a given matrix.
 * @param {Matrix4x4} M matrix.
 * @returns {Matrix4x4}
 */
Mat4x4.inverse = (M) => 0;
/**
 * Checks whether the given matrix is an identity matrix.
 * @param {Matrix4x4} M matrix.
 * @returns {boolean}
 */
Mat4x4.isIdentity = (M) => M[0] === 1 && M[1] === 0 && M[2] === 0 && M[3] === 0 && M[4] === 0 && M[5] === 1 && M[6] === 0 && M[7] === 0 && M[8] === 0 && M[9] === 0 && M[10] === 1 && M[11] === 0 && M[12] === 0 && M[13] === 0 && M[14] === 0 && M[15] === 1;
