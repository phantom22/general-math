/**
 * @module
 * Creates a 4x4 matrix.
 * @param {number[]} v values
 * @returns {Matrix4}
 */
function Mat4(...v) {
    const mat = Array(16).fill(0);
    for (let i = 0; i < 16; i++) {
        mat[i] = v[i];
    }
    return mat;
}
/**
 * Returns a formatted string for a given matrix.
 * @param {Matrix4} M matrix.
 * @returns {string}
 */
Mat4.toString = (M) => `Matrix4(\n\t${M[0]},${M[1]},${M[2]},${M[3]},\n\t${M[4]},${M[5]},${M[6]},${M[7]},\n\t${M[8]},${M[9]},${M[10]},${M[11]},\n\t${M[12]},${M[13]},${M[14]},${M[15]}\n\n)`;
/** Identity matrix. */
Mat4.identity = Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
Object.freeze(Mat4.identity);
/** Matrix with all elements set to zero. */
Mat4.zero = Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
Object.freeze(Mat4.zero);
/**
 * Returns the determinant of a given matrix.
 * @param {Matrix4} M matrix.
 * @returns {number}
 */
Mat4.det = (M) => -M[12] * (M[9] * (M[2] * M[7] - M[3] * M[6]) - M[10] * (M[1] * M[7] - M[3] * M[5]) + M[11] * (M[1] * M[6] - M[2] * M[5])) + M[13] * (M[8] * (M[2] * M[7] - M[3] * M[6]) - M[10] * (M[0] * M[7] - M[3] * M[4]) + M[11] * (M[0] * M[6] - M[2] * M[4])) - M[14] * (M[8] * (M[1] * M[7] - M[3] * M[5]) - M[9] * (M[0] * M[7] - M[3] * M[4]) + M[11] * (M[0] * M[5] - M[1] * M[4])) + M[15] * (M[8] * (M[1] * M[6] - M[2] * M[5]) - M[9] * (M[0] * M[6] - M[2] * M[4]) + M[10] * (M[0] * M[5] - M[1] * M[4]));
/**
 * Returns the transpose of a given matrix.
 * @param {Matrix4} M matrix.
 * @returns {Matrix4}
 */
Mat4.transpose = (A) => Mat4(A[0], A[4], A[8], A[12], A[1], A[5], A[9], A[13], A[2], A[6], A[10], A[14], A[3], A[7], A[11], A[15]);
/**
 * Returns the inverse of a given matrix.
 * @param {Matrix4} M matrix.
 * @returns {Matrix4}
 */
Mat4.inverse = (M) => {
    let det = Mat4.det(M);
    if (det === 0)
        return Mat4.zero;
    det = 1 / det;
    const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = M, d1 = k * p - l * o, d2 = j * p - l * n, d3 = j * o - k * n, d4 = i * p - l * m, d5 = i * o - k * m, d6 = i * n - j * m, d7 = g * p - h * o, d8 = f * p - h * n, d9 = f * o - g * n, d10 = e * p - h * m, d11 = e * o - g * m, d12 = e * n - f * m, d13 = g * l - h * k, d14 = f * l - h * j, d15 = f * k - g * j, d16 = e * l - h * i, d17 = e * k - g * i, d18 = e * j - f * i;
    return Mat4((f * d1 - g * d2 + h * d3) * det, (-b * d1 + c * d2 - d * d3) * det, (b * d7 - c * d8 + d * d9) * det, (-b * d13 + c * d14 - d * d15) * det, (-e * d1 + g * d4 - h * d5) * det, (a * d1 - c * d4 + d * d5) * det, (-a * d7 + c * d10 - d * d11) * det, (a * d13 - c * d16 + d * d17) * det, (e * d2 - g * d4 + h * d5) * det, (-a * d2 + b * d4 - d * d6) * det, (a * d8 - b * d10 + d * d12) * det, (-a * d14 + b * d16 - d * d18) * det, (-e * d3 + f * d5 - g * d6) * det, (a * d3 - b * d5 + c * d6) * det, (-a * d9 + b * d11 - c * d12) * det, (a * d15 - b * d17 + c * d18) * det);
};
/**
 * Checks whether the given matrix is an identity matrix.
 * @param {Matrix4} M matrix.
 * @returns {boolean}
 */
Mat4.isIdentity = (M) => M[0] === 1 && M[1] === 0 && M[2] === 0 && M[3] === 0 && M[4] === 0 && M[5] === 1 && M[6] === 0 && M[7] === 0 && M[8] === 0 && M[9] === 0 && M[10] === 1 && M[11] === 0 && M[12] === 0 && M[13] === 0 && M[14] === 0 && M[15] === 1;
/**
 * Multiplies two matrices.
 * @param {Matrix4} M1 matrix 1.
 * @param {Matrix4} M2 matrix 2.
 * @returns {Matrix4}
 */
Mat4.prod = (M1, M2) => {
    const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = M1, [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P] = M2;
    return Mat4(a * A + b * E + c * I + d * M, a * B + b * F + c * J + d * N, a * C + b * G + c * K + d * O, a * D + b * H + c * L + d * P, e * A + f * E + g * I + h * M, e * B + f * F + g * J + h * N, e * C + f * G + g * K + h * O, e * D + f * H + g * L + h * P, i * A + j * E + k * I + l * M, i * B + j * F + k * J + l * N, i * C + j * G + k * K + l * O, i * D + j * H + k * L + l * P, m * A + n * E + o * I + p * M, m * B + n * F + o * J + p * N, m * C + n * G + o * K + p * O, m * D + n * H + o * L + p * P);
};
/**
 * Creates a scaling matrix.
 * @param {Matrix4} M Matrix.
 * @param {Vector3} V Vector3.
 * @returns {Matrix4}
 */
Mat4.scale = (M, V) => Mat4(M[0] * V[0], M[1] * V[0], M[2] * V[0], M[3] * V[0], M[4] * V[1], M[5] * V[1], M[6] * V[1], M[7] * V[1], M[8] * V[2], M[9] * V[2], M[10] * V[2], M[11] * V[2], M[12], M[13], M[14], M[15]);
Object.freeze(Mat4);
