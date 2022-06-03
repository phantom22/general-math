function Axis(x = 0, y = 0, z = 0) {
    return Vec3.normalize([x, y, z]);
}
/**
 * Converts angle-axis to a rotation representation.
 * @param {Axis} ax axis.
 * @param {number} an angle.
 * @returns {Quaternion}
 */
Axis.toQuat = (ax, an) => {
    const hf = an / 2, s = Math.sin(hf);
    return [ax[0] * s, ax[1] * s, ax[2] * s, Math.cos(hf)];
};
/**
 * Creates a Vector3 containing the euler angles.
 * @param x rotation around x axis.
 * @param y rotation around y axis.
 * @param z rotation around z axis.
 * @returns {EulerRotation}
 */
const Euler = (x = 0, y = 0, z = 0) => [x, y, z];
/**
 * Converts a given ZYX euler rotation to a quaternion.
 * @param {EulerRotation} E Euler rotation.
 * @returns {Quaternion}
 */
Euler.toQuat = (E) => {
    const s1 = Math.sin(E[0] * 0.5), s2 = Math.sin(E[1] * 0.5), s3 = Math.sin(E[2] * 0.5), c1 = Math.cos(E[0] * 0.5), c2 = Math.cos(E[1] * 0.5), c3 = Math.cos(E[2] * 0.5);
    return [s1 * c2 * c3 - c1 * s2 * s3, c1 * s2 * c3 + s1 * c2 * s3, c1 * c2 * s3 + s1 * s2 * c3, c1 * c2 * c3 - s1 * s2 * s3];
};
/** Roll/Pitch/Yaw angles. */
Euler.order = "ZXY";
Object.freeze(Euler.order);
// https://docs.unity3d.com/Packages/com.unity.tiny@0.13/rt/tiny_runtime/classes/_runtimefull_.utmath.matrix3.html
const Mat3 = (...v) => {
    const mat = Array(9).fill(0);
    for (let i = 0; i < Math.clamp(v.length, 0, 9); i++) {
        mat[i] = v[i];
    }
    return mat;
};
/**
 * Returns a formatted string for a given matrix.
 * @param {Matrix4} M matrix3.
 * @returns {string}
 */
Mat3.toString = (M) => `Matrix3(\n\t${M[0]},${M[1]},${M[2]},\n\t${M[3]},${M[4]},${M[5]},\n\t${M[6]},${M[7]},${M[8]}\n)`;
/** Identity matrix. */
Mat3.identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
Object.freeze(Mat3.identity);
/** Matrix with all elements set to zero. */
Mat3.zero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
Object.freeze(Mat3.zero);
/**
 * Returns the determinant of a given matrix.
 * @param {Matrix3} M matrix3.
 * @returns {number}
 */
Mat3.det = (M) => M[6] * (M[1] * M[5] - M[2] * M[4]) - M[7] * (M[0] * M[5] - M[2] * M[3]) + M[8] * (M[0] * M[4] - M[1] * M[3]);
/**
 * Returns the transpose of a given matrix.
 * @param {Matrix3} M matrix3.
 * @returns {Matrix3}
 */
Mat3.transpose = (M) => [M[0], M[3], M[6], M[1], M[4], M[7], M[2], M[5], M[8]];
/**
 * Returns the inverse of a given matrix.
 * @param {Matrix3} M matrix3.
 * @returns {Matrix3}
 */
Mat3.invert = (M) => {
    let det = Mat3.det(M);
    if (det === 0)
        return Mat3.zero;
    det = 1 / det;
    const [a, b, c, d, e, f, g, h, i] = M;
    return [
        e * f - h * i, -b * i + c * h, b * f - c * e,
        -d * i + f * g, a * i - c * g, -a * f + c * d,
        d * h - e * g, -a * h + b * g, a * e - b * d
    ];
};
/**
 * Checks whether the given matrix is an identity matrix.
 * @param {Matrix3} M matrix3.
 * @returns {boolean}
 */
Mat3.isIdentity = (M) => M[0] === 1 && M[1] === 0 && M[2] === 0 && M[3] === 0 && M[4] === 1 && M[5] === 0 && M[6] === 0 && M[7] === 0 && M[8] === 1;
/**
 * Multiplies two matrices.
 * @param {Matrix3} A matrix3 A.
 * @param {Matrix3} B matrix3 B.
 * @returns {Matrix3}
 */
Mat3.prod = (A, B) => {
    const [a, b, c, d, e, f, g, h, i] = A, [$, _, C, D, E, F, G, H, I] = B;
    return [
        a * $ + b * D + c * G, a * _ + b * E + c * H, a * C + b * F + c * I,
        d * $ + e * D + f * G, d * _ + e * E + f * H, d * C + e * F + f * I,
        g * $ + h * D + i * G, g * _ + h * E + i * H, g * C + h * F + i * I,
    ];
};
/**
 * Creates a scaling matrix.
 * @param {Matrix3} M matrix3.
 * @param {Vector2} V vector2.
 * @returns {Matrix3}
 */
Mat3.scale = (M, V) => [M[0] * V[0], M[1] * V[0], M[2] * V[0], M[3] * V[1], M[4] * V[1], M[5] * V[1], M[6], M[7], M[8]];
/**
 * Get a column of the given matrix.
 * @param {Matrix3} M matrix3.
 * @param {number} i column index.
 * @returns {Vector3}
 */
Mat3.getCol = (M, i) => [M[i], M[3 + i], M[6 + i]];
/**
 * Get a row of the given matrix.
 * @param {Matrix3} M matrix3.
 * @param {number} i row index.
 * @returns {Vector3}
 */
Mat3.getRow = (M, i) => {
    const offs = i * 3;
    return [M[offs], M[offs + 1], M[offs + 2]];
};
/**
 * Returns the normal matrix of a given matrix.
 * @param {Matrix4} M matrix4.
 * @returns {Matrix3}
 */
Mat3.toNormalMat = (M) => Mat3.transpose(Mat3.invert(Mat4.toMat3(M)));
/**
 * Converts a rotation matrix3 to ZXY euler angles (radians).
 * @param {Matrix3} M rotation matrix3.
 * @returns {EulerRotation}
 */
Mat3.toEuler = (M) => {
    const x = Math.asin(Math.clamp(M[7], -1, 1));
    return (Math.abs(M[7]) < 0.9999999)
        ? [x, Math.atan2(-M[6], M[8]), Math.atan2(-M[1], M[4])]
        : [x, 0, Math.atan2(M[3], M[1])];
};
/**
 * Converts a 3x3 matrix into a 4x4 one.
 * @param {Matrix3} M Matrix
 * @returns {Matrix4}
 */
Mat3.toMat4 = (M) => [M[0], M[3], M[6], 0, M[1], M[4], M[7], 0, M[2], M[5], M[8], 0, 0, 0, 0, 1];
Object.freeze(Mat3);
/**
 * @module
 * Creates a 4x4 matrix.
 * @param {number[]} v values
 * @returns {Matrix4}
 */
const Mat4 = (...v) => {
    const mat = Array(16).fill(0);
    for (let i = 0; i < Math.clamp(v.length, 0, 16); i++) {
        mat[i] = v[i];
    }
    return mat;
};
/**
 * Returns a formatted string for a given matrix.
 * @param {Matrix4} M matrix4.
 * @returns {string}
 */
Mat4.toString = (M) => `Matrix4(\n\t${M[0]},${M[1]},${M[2]},${M[3]},\n\t${M[4]},${M[5]},${M[6]},${M[7]},\n\t${M[8]},${M[9]},${M[10]},${M[11]},\n\t${M[12]},${M[13]},${M[14]},${M[15]}\n)`;
/** Identity matrix. */
Mat4.identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
Object.freeze(Mat4.identity);
/** Matrix with all elements set to zero. */
Mat4.zero = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
Object.freeze(Mat4.zero);
/**
 * Returns the determinant of a given matrix.
 * @param {Matrix4} M matrix4.
 * @returns {number}
 */
Mat4.det = (M) => -M[12] * (M[9] * (M[2] * M[7] - M[3] * M[6]) - M[10] * (M[1] * M[7] - M[3] * M[5]) + M[11] * (M[1] * M[6] - M[2] * M[5])) + M[13] * (M[8] * (M[2] * M[7] - M[3] * M[6]) - M[10] * (M[0] * M[7] - M[3] * M[4]) + M[11] * (M[0] * M[6] - M[2] * M[4])) - M[14] * (M[8] * (M[1] * M[7] - M[3] * M[5]) - M[9] * (M[0] * M[7] - M[3] * M[4]) + M[11] * (M[0] * M[5] - M[1] * M[4])) + M[15] * (M[8] * (M[1] * M[6] - M[2] * M[5]) - M[9] * (M[0] * M[6] - M[2] * M[4]) + M[10] * (M[0] * M[5] - M[1] * M[4]));
/**
 * Returns the transpose of a given matrix.
 * @param {Matrix4} M matrix4.
 * @returns {Matrix4}
 */
Mat4.transpose = (A) => [A[0], A[4], A[8], A[12], A[1], A[5], A[9], A[13], A[2], A[6], A[10], A[14], A[3], A[7], A[11], A[15]];
/**
 * Returns the inverse of a given matrix.
 * @param {Matrix4} M matrix4.
 * @returns {Matrix4}
 */
Mat4.invert = (M) => {
    let det = Mat4.det(M);
    if (det === 0)
        return Mat4.zero;
    det = 1 / det;
    const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = M, d1 = k * p - l * o, d2 = j * p - l * n, d3 = j * o - k * n, d4 = i * p - l * m, d5 = i * o - k * m, d6 = i * n - j * m, d7 = g * p - h * o, d8 = f * p - h * n, d9 = f * o - g * n, d10 = e * p - h * m, d11 = e * o - g * m, d12 = e * n - f * m, d13 = g * l - h * k, d14 = f * l - h * j, d15 = f * k - g * j, d16 = e * l - h * i, d17 = e * k - g * i, d18 = e * j - f * i;
    return [
        (f * d1 - g * d2 + h * d3) * det, (-b * d1 + c * d2 - d * d3) * det, (b * d7 - c * d8 + d * d9) * det, (-b * d13 + c * d14 - d * d15) * det,
        (-e * d1 + g * d4 - h * d5) * det, (a * d1 - c * d4 + d * d5) * det, (-a * d7 + c * d10 - d * d11) * det, (a * d13 - c * d16 + d * d17) * det,
        (e * d2 - g * d4 + h * d5) * det, (-a * d2 + b * d4 - d * d6) * det, (a * d8 - b * d10 + d * d12) * det, (-a * d14 + b * d16 - d * d18) * det,
        (-e * d3 + f * d5 - g * d6) * det, (a * d3 - b * d5 + c * d6) * det, (-a * d9 + b * d11 - c * d12) * det, (a * d15 - b * d17 + c * d18) * det
    ];
};
/**
 * Checks whether the given matrix is an identity matrix.
 * @param {Matrix4} M matrix4.
 * @returns {boolean}
 */
Mat4.isIdentity = (M) => M[0] === 1 && M[1] === 0 && M[2] === 0 && M[3] === 0 && M[4] === 0 && M[5] === 1 && M[6] === 0 && M[7] === 0 && M[8] === 0 && M[9] === 0 && M[10] === 1 && M[11] === 0 && M[12] === 0 && M[13] === 0 && M[14] === 0 && M[15] === 1;
/**
 * Multiplies two matrices.
 * @param {Matrix4} A matrix4 A.
 * @param {Matrix4} B matrix4 B.
 * @returns {Matrix4}
 */
Mat4.prod = (A, B) => {
    const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = A, [$, _, C, D, E, F, G, H, I, J, K, L, M, N, O, P] = B;
    return [
        a * $ + b * E + c * I + d * M, a * _ + b * F + c * J + d * N, a * C + b * G + c * K + d * O, a * D + b * H + c * L + d * P,
        e * $ + f * E + g * I + h * M, e * _ + f * F + g * J + h * N, e * C + f * G + g * K + h * O, e * D + f * H + g * L + h * P,
        i * $ + j * E + k * I + l * M, i * _ + j * F + k * J + l * N, i * C + j * G + k * K + l * O, i * D + j * H + k * L + l * P,
        m * $ + n * E + o * I + p * M, m * _ + n * F + o * J + p * N, m * C + n * G + o * K + p * O, m * D + n * H + o * L + p * P,
    ];
};
/**
 * Creates a scaling matrix.
 * @param {Matrix4} M Matrix4.
 * @param {Vector3} V Vector3.
 * @returns {Matrix4}
 */
Mat4.scale = (M, V) => [M[0] * V[0], M[1] * V[0], M[2] * V[0], M[3] * V[0], M[4] * V[1], M[5] * V[1], M[6] * V[1], M[7] * V[1], M[8] * V[2], M[9] * V[2], M[10] * V[2], M[11] * V[2], M[12], M[13], M[14], M[15]];
/**
 * Get a column of the given matrix.
 * @param {Matrix4} M matrix4.
 * @param {number} i column index.
 * @returns {Vector4}
 */
Mat4.getCol = (M, i) => [M[i], M[4 + i], M[8 + i], M[12 + i]];
/**
 * Get a row of the given matrix.
 * @param {Matrix4} M matrix4.
 * @param {number} i row index.
 * @returns {Vector4}
 */
Mat4.getRow = (M, i) => {
    const offs = i * 4;
    return [M[offs], M[offs + 1], M[offs + 2], M[offs + 3]];
};
/**
 * Converts a quaternion into a matrix4.
 * @param {Vector3} p position.
 * @param {Quaternion} Q quaternion.
 * @param {Vector3} s scale.
 * @returns {Matrix4}
 */
Mat4.compose = (p, Q, s) => {
    const [x, y, z, w] = Q, xx = 2 * x ** 2, yy = 2 * y ** 2, zz = 2 * z ** 2, xy = 2 * x * y, wz = 2 * w * z, xz = 2 * x * z, wy = 2 * w * y, yz = 2 * y * z, wx = 2 * w * x, [sx, sy, sz] = s;
    return [
        (1 - yy - zz) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,
        (xy - wz) * sy, (1 - xx - zz) * sy, (yz + wx) * sy, 0,
        (xz + wy) * sz, (yz - wx) * sz, (1 - xx - yy) * sz, 0,
        ...p, 1
    ];
};
/**
 * Converts a rotation matrix4 to ZXY euler angles (radians).
 * @param {Matrix4} M rotation matrix4.
 * @returns {EulerRotation}
 */
Mat4.toEuler = (M) => {
    const x = Math.asin(Math.clamp(M[6], -1, 1));
    return (Math.abs(M[6]) < 0.9999999)
        ? [x, Math.atan2(-M[2], M[10]), Math.atan2(-M[4], M[5])]
        : [x, 0, Math.atan2(M[1], M[0])];
};
/**
 * Converts a 4x4 matrix into a 3x3 one.
 * @param {Matrix4} M matrix4.
 * @returns {Matrix3}
 */
Mat4.toMat3 = (M) => [M[0], M[4], M[8], M[1], M[5], M[9], M[2], M[6], M[10]];
Object.freeze(Mat4);
/**
 * Creates a quaternion.
 * @param {number} x first component.
 * @param {number} y second component.
 * @param {number} z third component.
 * @param {number} w forth component.
 * @returns {Quaternion}
 */
const Quat = (x = 0, y = 0, z = 0, w = 1) => [x, y, z, w];
/**
 * Returns a formatted string for a given Quaternion.
 * @param {Quaternion} Q Quaternion.
 * @returns {string}
 */
Quat.toString = (Q) => `Quaternion(${Q[0]},${Q[1]},${Q[2]},${Q[3]})`;
/**
 * The dot product between two rotations.
 * @param {Quaternion} A quaternion A.
 * @param {Quaternion} B quaternion B.
 * @returns {number}
 */
Quat.dot = (A, B) => A[0] * B[0] + A[1] * B[1] + A[2] * B[2] + A[3] * B[3];
/** Identity rotation. */
Quat.identity = [0, 0, 0, 1];
Object.freeze(Quat.identity);
/**
 * Returns the angle in degrees between two rotations A and B.
 * @param {Quaternion} A rotation A.
 * @param {Quaternion} B rotation B.
 * @returns {number}
 */
Quat.angle = (A, B) => 2 * Math.acos(Math.abs(Math.clamp(Quat.dot(A, B), -1, 1)));
/**
 * Combines rotations A and B.
 * @param {Quaternion} A rotation A.
 * @param {Quaternion} B rotation B.
 * @returns {Quaternion}
 */
Quat.prod = (A, B) => [A[0] * B[3] + A[3] * B[0] + A[1] * B[2] - A[2] * B[1], A[1] * B[3] + A[3] * B[1] + A[2] * B[2] - A[0] * B[2], A[2] * B[3] + A[3] * B[2] + A[0] * B[1] - A[1] * B[0], A[3] * B[3] + A[0] * B[0] + A[1] * B[1] - A[2] * B[2]];
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
 * @param {Quaternion} B quaternion B.tt7uj
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
 * Returns the inverse of a given rotation.
 * @param {Quaternion} Q rotation.
 * @returns {Quaternion}
 */
Quat.inverse = (Q) => { const m = 1 / Quat.sqrdMagnitude(Q); return [Q[0] * m, -Q[1] * m, -Q[2] * m, -Q[3] * m]; };
/**
 * Converts a given quaternion to a ZYX euler rotation.
 * @param {Quaternion} Q Quaternion.
 * @returns {EulerRotation}
 */
Quat.toEuler = (Q) => {
    const A = (Math.acos(Q[3]) * 2) / 180 * Math.PI, c = 1 - Math.cos(A), s1 = Math.sin(A) ** 2 + Math.sin(A), s2 = Math.sin(A) ** 2 - Math.sin(A);
    const y = Math.asin(Math.clamp((s2 * (Q[0] * Q[2] - Q[2])), -1, 1));
    return (Math.abs(y) < 0.9999999)
        ? [Math.atan2(s1 * (Q[1] * Q[2] + Q[2]), 1 + (-(Q[0] ** 2) - (Q[1] ** 2)) * c), y, Math.atan2(s1 * (Q[0] * Q[1] - Q[2]), 1 + (-(Q[1] ** 2) - (Q[2] ** 2)) * c)]
        : [0, y, Math.atan2(-s2 * (Q[0] * Q[1] - Q[2]), 1 + (-(Q[0] ** 2) - (Q[2] ** 2)) * c)];
};
/**
 * Converts a quaternion into a rotation matrix4.
 * @param {Quaternion} Q quaternion.
 * @returns {Matrix4}
 */
Quat.toMat4 = (Q) => {
    const [x, y, z, w] = Q, xx = 2 * x ** 2, yy = 2 * y ** 2, zz = 2 * z ** 2, xy = 2 * x * y, wz = 2 * w * z, xz = 2 * x * z, wy = 2 * w * y, yz = 2 * y * z, wx = 2 * w * x;
    return [
        (1 - yy - zz), (xy + wz), (xz - wy), 0,
        (xy - wz), (1 - xx - zz), (yz + wx), 0,
        (xz + wy), (yz - wx), (1 - xx - yy), 0,
        0, 0, 0, 1
    ];
};
/**
 * Converts a quaternion into a rotation matrix3.
 * @param {Quaternion} Q quaternion.
 * @returns {Matrix4}
 */
Quat.toMat3 = (Q) => {
    const [x, y, z, w] = Q, xx = 2 * x ** 2, yy = 2 * y ** 2, zz = 2 * z ** 2, xy = 2 * x * y, wz = 2 * w * z, xz = 2 * x * z, wy = 2 * w * y, yz = 2 * y * z, wx = 2 * w * x;
    return [
        (1 - yy - zz), (xy - wz), (xz + wy),
        (xy + wz), (1 - xx - zz), (yz - wx),
        (xz - wy), (yz + wx), (1 - xx - yy)
    ];
};
/**
 * Converts a quaternion into ZXY euler angles.
 * @param {Quaternion} Q
 * @returns {EulerRotation}
 */
Quat.toEuler = (Q) => Mat4.toEuler(Quat.toMat4(Q));
Object.freeze(Quat);
/**
 * @module
 * Creates A 2D vector.
 * @param {number} x first component.
 * @param {number} y second component.
 * @returns {Vector2}
 */
const Vec2 = (x = 0, y = 0) => [x, y];
/**
 * Returns a formatted string for a given vector.
 * @param {Vector2} V vector2.
 * @returns {string}
 */
Vec2.toString = (V) => `Vector2(${V[0]},${V[1]})`;
/** Shorthand for writing Vec2(0, 1). */
Vec2.up = [0, 1];
Object.freeze(Vec2.up);
/** Shorthand for writing Vec2(0, -1). */
Vec2.down = [0, -1];
Object.freeze(Vec2.down);
/** Shorthand for writing Vec2(-1, 0). */
Vec2.left = [-1, 0];
Object.freeze(Vec2.left);
/** Shorthand for writing Vec2(1, 0). */
Vec2.right = [1, 0];
Object.freeze(Vec2.right);
/** Shorthand for writing Vec2(1, 1). */
Vec2.one = [1, 1];
Object.freeze(Vec2.one);
/** Shorthand for writing Vec2(0, 0). */
Vec2.zero = [0, 0];
Object.freeze(Vec2.zero);
/**
 * Returns true if two vectors are exactly equal.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {boolean}
 */
Vec2.equals = (A, B) => A === B;
/**
 * Returns true if two vectors are approximately equal.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {boolean}
 */
Vec2.compare = (A, B) => A[0] === B[0] && A[1] === B[1];
/**
 * Returns true if any of the given vector components is not A number.
 * @param {Vector2} V vector2.
 * @returns {boolean}
 */
Vec2.isNaN = (V) => V[0] !== V[0] || V[1] !== V[1];
/**
 * Returns a copy of a given vector with all its NANS replaced by a default value.
 * @param {Vector2} V vector2.
 * @param {number} [d=0] default value.
 * @returns {Vector2}
 */
Vec2.repair = (V, d = 0) => [V[0] || d, V[1] || d];
/**
 * Adds two vectors.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {Vector2}
 */
Vec2.add = (A, B) => [A[0] + B[0], A[1] + B[1]];
/**
 * Subtracts one vector from another.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {Vector2}
 */
Vec2.sub = (A, B) => [A[0] - B[0], A[1] - B[1]];
/**
 * Multiplies a vector by a number.
 * @param {Vector2} V vector2.
 * @param {number} s scalar.
 * @returns {Vector2}
 */
Vec2.mul = (V, s) => [V[0] * s, V[1] * s];
/**
 * Dot Product of two vectors.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {number}
 */
Vec2.dot = (A, B) => A[0] * B[0] + A[1] * B[1];
/**
 * Multiplies two vectors component-wise.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {number}
 */
Vec2.scale = (A, B) => [A[0] * B[0], A[1] * B[1]];
/**
 * Divides a vector by a number.
 * @param {Vector2} V vector2.
 * @param {number} s scalar.
 * @returns {Vector2}
 */
Vec2.div = (V, s) => { const t = 1 / s; return [V[0] * t, V[1] * t]; };
/**
 * Returns the length of a given vector.
 * @param {Vector2} V vector2.
 * @returns {number}
 */
Vec2.magnitude = (V) => (V[0] ** 2 + V[1] ** 2) ** (1 / 2);
/**
 * Returns the squared length of a given vector.
 * @param {Vector2} V vector2.
 * @returns {number}
 */
Vec2.sqrMagnitude = (V) => V[0] ** 2 + V[1] ** 2;
/**
 * Returns the given vector with a magnitude of 1.
 * @param {Vector2} V vector2.
 * @returns {Vector2}
 */
Vec2.normalize = (V) => { const t = 1 / Vec2.magnitude(V); return [V[0] * t, V[1] * t]; };
/**
 * Returns the distance between A and B.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {number}
 */
Vec2.distance = (A, B) => ((A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2) ** (1 / 2);
/**
 * Cross Product of two vectors.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {Vector3}
 */
Vec2.cross = (A, B) => [0, 0, -A[0] * B[1] + A[1] * B[0]];
/**
 * Gets the unsigned angle in degrees between A and B.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {number}
 */
Vec2.angle = (A, B) => Math.acos(Vec2.dot(A, B) / (Vec2.magnitude(A) * Vec2.magnitude(B)));
/**
 * Returns a copy of a given vector with its components clamped to their respective constraints.
 * @param {Vector2} V vector2.
 * @param {Vector2} x min and max for the x component.
 * @param {Vector2} y min and max for the y component.
 * @returns {Vector2}
 */
Vec2.clamp = (V, x, y) => [Math.clamp(V[0], ...x), Math.clamp(V[1], ...y)];
/**
 * Returns a copy of a given vector with its components clamped between min and max.
 * @param {Vector2} V vector2.
 * @param {number} min min value for both components.
 * @param {number} max max value for both components.
 * @returns {Vector2}
 */
Vec2.simpleClamp = (V, min, max) => [Math.clamp(V[0], min, max), Math.clamp(V[1], min, max)];
/**
 * Returns a vector that is made from the largest components of all the passed vectors.
 * @param {Vector2[]} V 2d vectors.
 * @returns {Vector2}
 */
Vec2.max = (...V) => { let o = V[0]; for (let i = 0; i < V.length; i++) {
    o[0] = V[i][0] > o[0] ? V[i][0] : o[0];
    o[1] = V[i][1] > o[1] ? V[i][1] : o[1];
} return o; };
/**
 * Returns a vector that is made from the smallest components of all the passed vectors.
 * @param {Vector2[]} V 2d vectors.
 * @returns {Vector2}
 */
Vec2.min = (...V) => { let o = V[0]; for (let i = 0; i < V.length; i++) {
    o[0] = V[i][0] < o[0] ? V[i][0] : o[0];
    o[1] = V[i][1] < o[1] ? V[i][1] : o[1];
} return o; };
/**
 * Linearly interpolates between vectors A and B by t.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @param {number} t blend value between 0 and 1.
 * @returns {Vector2}
 */
Vec2.lerp = (A, B, t) => [Math.lerp(A[0], B[0], t), Math.lerp(A[1], B[1], t)];
/**
 * Converts a Vector2 to Vector3.
 * @param {Vector2} V vector2.
 * @returns {Vector3}
 */
Vec2.toVec3 = (V) => [...V, 0];
/**
 * Converts a Vector2 to Vector4.
 * @param {Vector2} V vector2.
 * @returns {Vector4}
 */
Vec2.toVec4 = (V) => [...V, 0, 0];
Object.freeze(Vec2);
/**
 * @module
 * Creates a 3D vector.
 * @param {number} x first component.
 * @param {number} y second component.
 * @param {number} z third component.
 * @returns {Vector3}
 */
const Vec3 = (x = 0, y = 0, z = 0) => [x, y, z];
/**
 * Returns a formatted string for a given Quaternion.
 * @param {Vector3} V vector3.
 * @returns {string}
 */
Vec3.toString = (V) => `Vector3(${V[0]},${V[1]},${V[2]})`;
/** Shorthand for writing Vec3(0, 1, 0). */
Vec3.up = [0, 1, 0];
Object.freeze(Vec3.up);
/** Shorthand for writing Vec3(0, -1, 0). */
Vec3.down = [0, -1, 0];
Object.freeze(Vec3.down);
/** Shorthand for writing Vec3(-1, 0, 0). */
Vec3.left = [-1, 0, 0];
Object.freeze(Vec3.left);
/** Shorthand for writing Vec3(1, 0, 0). */
Vec3.right = [1, 0, 0];
Object.freeze(Vec3.right);
/** Shorthand for writing Vec3(0, 0, 1). */
Vec3.forward = [0, 0, 1];
Object.freeze(Vec3.forward);
/** Shorthand for writing Vec3(0, 0, -1). */
Vec3.back = [0, 0, -1];
Object.freeze(Vec3.back);
/** Shorthand for writing Vec3(1, 1, 1). */
Vec3.one = [1, 1, 1];
Object.freeze(Vec3.one);
/** Shorthand for writing Vec3(0, 0, 0). */
Vec3.zero = [0, 0, 0];
Object.freeze(Vec3.zero);
/**
 * Returns true if two vectors are exactly equal.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {boolean}
 */
Vec3.equals = (A, B) => A === B;
/**
 * Returns true if two vectors are approximately equal.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {boolean}
 */
Vec3.compare = (A, B) => A[0] === B[0] && A[1] === B[1] && A[2] === B[2];
/**
 * Returns true if any of the given vector components is not a number.
 * @param {Vector3} V vector3.
 * @returns {boolean}
 */
Vec3.isNaN = (V) => V[0] !== V[0] || V[1] !== V[1] || V[2] !== V[2];
/**
 * Returns a copy of a given vector with all its NANS replaced by a default value.
 * @param {Vector3} V vector3.
 * @param {number} [d=0] default value.
 * @returns {Vector3}
 */
Vec3.repair = (V, d = 0) => [V[0] || d, V[1] || d, V[2] || d];
/**
 * Adds two vectors.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {Vector3}
 */
Vec3.add = (A, B) => [A[0] + B[0], A[1] + B[1], A[2] + B[2]];
/**
 * Subtracts one vector from another.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {Vector3}
 */
Vec3.sub = (A, B) => [A[0] - B[0], A[1] - B[1], A[2] - B[2]];
/**
 * Multiplies a vector by a number.
 * @param {Vector3} V vector3.
 * @param {number} s scalar.
 * @returns {Vector3}
 */
Vec3.mul = (V, s) => [V[0] * s, V[1] * s, V[2] * s];
/**
 * Dot Product of two vectors.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {number}
 */
Vec3.dot = (A, B) => A[0] * B[0] + A[1] * B[1] + A[2] * B[2];
/**
 * Multiplies two vectors component-wise.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {number}
 */
Vec3.scale = (A, B) => [A[0] * B[0], A[1] * B[1], A[2] * B[2]];
/**
 * Divides a vector by a number.
 * @param {Vector3} V vector3.
 * @param {number} s scalar.
 * @returns {Vector3}
 */
Vec3.div = (V, s) => { const t = 1 / s; return [V[0] * t, V[1] * t, V[2] * t]; };
/**
 * Returns the length of a given vector.
 * @param {Vector3} V vector3.
 * @returns {number}
 */
Vec3.magnitude = (V) => (V[0] ** 2 + V[1] ** 2 + V[2] ** 2) ** (1 / 2);
/**
 * Returns the squared length of a given vector.
 * @param {Vector3} V vector3.
 * @returns {number}
 */
Vec3.sqrMagnitude = (V) => V[0] ** 2 + V[1] ** 2 + V[2] ** 2;
/**
 * Returns the given vector with a magnitude of 1.
 * @param {Vector3} V vector3.
 * @returns {Vector3}
 */
Vec3.normalize = (V) => { const t = 1 / Vec3.magnitude(V); return [V[0] * t, V[1] * t, V[2] * t]; };
/**
 * Returns the distance between A and B.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {number}
 */
Vec3.distance = (A, B) => ((A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2 + (A[2] - B[2]) ** 2) ** (1 / 2);
/**
 * Cross Product of two vectors.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {Vector3}
 */
Vec3.cross = (A, B) => [A[1] * B[2] - A[2] * B[1], A[0] * B[2] - A[2] * B[0], A[0] * B[1] - A[1] * B[0]];
/**
 * Gets the unsigned angle in degrees between A and B.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {number}
 */
Vec3.angle = (A, B) => Math.acos(Vec3.dot(A, B) / (Vec3.magnitude(A) * Vec3.magnitude(B)));
/**
 * Returns a copy of a given vector with its components clamped to their respective constraints.
 * @param {Vector3} V vector3.
 * @param {Vector2} x min and max for the x component.
 * @param {Vector2} y min and max for the y component.
 * @param {Vector2} z min and max for the z component.
 * @returns {Vector3}
 */
Vec3.clamp = (V, x, y, z) => [Math.clamp(V[0], ...x), Math.clamp(V[1], ...y), Math.clamp(V[2], ...z)];
/**
 * Returns a copy of a given vector with its components clamped between min and max.
 * @param {Vector3} V vector3.
 * @param {number} min min value for both components.
 * @param {number} max max value for both components.
 * @returns {Vector3}
 */
Vec3.simpleClamp = (V, min, max) => [Math.clamp(V[0], min, max), Math.clamp(V[1], min, max), Math.clamp(V[2], min, max),];
/**
 * Returns a vector that is made from the largest components of all the passed vectors.
 * @param {Vector3[]} V 3d vectors.
 * @returns {Vector3}
 */
Vec3.max = (...V) => { let o = V[0]; for (let i = 0; i < V.length; i++) {
    o[0] = V[i][0] > o[0] ? V[i][0] : o[0];
    o[1] = V[i][1] > o[1] ? V[i][1] : o[1];
    o[2] = V[i][2] > o[2] ? V[i][2] : o[2];
} return o; };
/**
 * Returns a vector that is made from the smallest components of all the passed vectors.
 * @param {Vector3[]} V 3d vectors.
 * @returns {Vector3}
 */
Vec3.min = (...V) => { let o = V[0]; for (let i = 0; i < V.length; i++) {
    o[0] = V[i][0] < o[0] ? V[i][0] : o[0];
    o[1] = V[i][1] < o[1] ? V[i][1] : o[1];
    o[2] = V[i][2] < o[2] ? V[i][2] : o[2];
} return o; };
/**
 * Linearly interpolates between vectors A and B by t.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @param {number} t blend value between 0 and 1.
 * @returns {Vector3}
 */
Vec3.lerp = (A, B, t) => Vec3(Math.lerp(A[0], B[0], t), Math.lerp(A[1], B[1], t), Math.lerp(A[2], B[2], t));
/**
 * Converts a Vector3 to Vector2.
 * @param {Vector3} V vector3.
 * @returns {Vector2}
 */
Vec3.toVec2 = (V) => [V[0], V[1]];
/**
 * Converts a Vector3 to Vector4.
 * @param {Vector3} V vector3.
 * @returns {Vector4}
 */
Vec3.toVec4 = (V) => [...V, 0];
Object.freeze(Vec3);
/**
 * @module
 * Creates a 4D vector.
 * @param {number} x first component.
 * @param {number} y second component.
 * @param {number} z third component.
 * @param {number} w third component.
 * @returns {Vector4}
 */
const Vec4 = (x = 0, y = 0, z = 0, w = 0) => [x, y, z, w];
/**
 * Returns a formatted string for a given Quaternion.
 * @param {Vector4} V vector4.
 * @returns {string}
 */
Vec4.toString = (V) => `Vector4(${V[0]},${V[1]},${V[2]},${V[3]})`;
/** Shorthand for writing Vec4(0, 1, 0, 0). */
Vec4.up = [0, 1, 0, 0];
Object.freeze(Vec4.up);
/** Shorthand for writing Vec4(0, -1, 0, 0). */
Vec4.down = [0, -1, 0, 0];
Object.freeze(Vec4.down);
/** Shorthand for writing Vec4(-1, 0, 0, 0). */
Vec4.left = [-1, 0, 0, 0];
Object.freeze(Vec4.left);
/** Shorthand for writing Vec4(1, 0, 0, 0). */
Vec4.right = [1, 0, 0, 0];
Object.freeze(Vec4.right);
/** Shorthand for writing Vec4(0, 0, 1, 0). */
Vec4.forward = [0, 0, 1, 0];
Object.freeze(Vec4.forward);
/** Shorthand for writing Vec4(0, 0, -1, 0). */
Vec4.back = [0, 0, -1, 0];
Object.freeze(Vec4.back);
/** Shorthand for writing Vec4(0, 0, 0, -1). */
Vec4.before = [0, 0, 0, -1];
Object.freeze(Vec4.before);
/** Shorthand for writing Vec4(0, 0, 0, 1). */
Vec4.after = [0, 0, 0, 1];
Object.freeze(Vec4.after);
/** Shorthand for writing Vec4(1, 1, 1, 0). */
Vec4.one = [1, 1, 1, 1];
Object.freeze(Vec4.one);
/** Shorthand for writing Vec4(0, 0, 0, 0). */
Vec4.zero = [0, 0, 0, 0];
Object.freeze(Vec4.zero);
/**
 * Returns true if two vectors are exactly equal.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B.
 * @returns {boolean}
 */
Vec4.equals = (A, B) => A === B;
/**
 * Returns true if two vectors are approximately equal.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B.
 * @returns {boolean}
 */
Vec4.compare = (A, B) => A[0] === B[0] && A[1] === B[1] && A[2] === B[2] && A[3] === B[3];
/**
 * Returns true if any of the given vector components is not a number.
 * @param {Vector4} V vector4.
 * @returns {boolean}
 */
Vec4.isNaN = (V) => V[0] !== V[0] || V[1] !== V[1] || V[2] !== V[2] || V[3] !== V[3];
/**
 * Returns a copy of a given vector with all its NANS replaced by a default value.
 * @param {Vector4} V vector4.
 * @param {number} [d=0] default value.
 * @returns {Vector4}
 */
Vec4.repair = (V, d = 0) => [V[0] || d, V[1] || d, V[2] || d, V[3] || d];
/**
 * Adds two vectors.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B.
 * @returns {Vector4}
 */
Vec4.add = (A, B) => [A[0] + B[0], A[1] + B[1], A[2] + B[2], A[3] + B[3]];
/**
 * Subtracts one vector from another.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B.
 * @returns {Vector4}
 */
Vec4.sub = (A, B) => [A[0] - B[0], A[1] - B[1], A[2] - B[2], A[3] - B[3]];
/**
 * Multiplies a vector by a number.
 * @param {Vector4} V vector4.
 * @param {number} s scalar.
 * @returns {Vector4}
 */
Vec4.mul = (V, s) => [V[0] * s, V[1] * s, V[2] * s, V[3] * s];
/**
 * Dot Product of two vectors.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B.
 * @returns {number}
 */
Vec4.dot = (A, B) => A[0] * B[0] + A[1] * B[1] + A[2] * B[2] + A[3] * B[3];
/**
 * Multiplies two vectors component-wise.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B.
 * @returns {number}
 */
Vec4.scale = (A, B) => [A[0] * B[0], A[1] * B[1], A[2] * B[2], A[3] * B[3]];
/**
 * Divides a vector by a number.
 * @param {Vector4} V vector4.
 * @param {number} s scalar.
 * @returns {Vector3}
 */
Vec4.div = (V, s) => { const t = 1 / s; return [V[0] * t, V[1] * t, V[2] * t, V[3] * t]; };
/**
 * Returns the length of a given vector.
 * @param {Vector4} V vector4.
 * @returns {number}
 */
Vec4.magnitude = (V) => (V[0] ** 2 + V[1] ** 2 + V[2] ** 2 + V[3] ** 2) ** (1 / 2);
/**
 * Returns the squared length of a given vector.
 * @param {Vector4} V vector4.
 * @returns {number}
 */
Vec4.sqrMagnitude = (V) => V[0] ** 2 + V[1] ** 2 + V[2] ** 2 + V[3] ** 2;
/**
 * Returns the given vector with a magnitude of 1.
 * @param {Vector4} V vector4.
 * @returns {Vector4}
 */
Vec4.normalize = (V) => { const t = 1 / Vec4.magnitude(V); return [V[0] * t, V[1] * t, V[2] * t, V[3] * t]; };
/**
 * Returns the distance between A and B.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B.
 * @returns {number}
 */
Vec4.distance = (A, B) => ((A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2 + (A[2] - B[2]) ** 2 + (A[3] - B[3]) ** 2) ** (1 / 2);
/**
 * Gets the unsigned angle in degrees between A and B.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B.
 * @returns {number}
 */
Vec4.angle = (A, B) => Math.acos(Vec4.dot(A, B) / (Vec4.magnitude(A) * Vec4.magnitude(B)));
/**
 * Returns a copy of a given vector with its components clamped to their respective constraints.
 * @param {Vector4} V vector4.
 * @param {Vector2} x min and max for the x component.
 * @param {Vector2} y min and max for the y component.
 * @param {Vector2} z min and max for the z component.
 * @param {Vector2} w min and max for the w component.
 * @returns {Vector4}
 */
Vec4.clamp = (V, x, y, z, w) => [Math.clamp(V[0], ...x), Math.clamp(V[1], ...y), Math.clamp(V[2], ...z), Math.clamp(V[3], ...w)];
/**
 * Returns a copy of a given vector with its components clamped between min and max.
 * @param {Vector4} V vector4.
 * @param {number} min min value for both components.
 * @param {number} max max value for both components.
 * @returns {Vector4}
 */
Vec4.simpleClamp = (V, min, max) => [Math.clamp(V[0], min, max), Math.clamp(V[1], min, max), Math.clamp(V[2], min, max), Math.clamp(V[3], min, max)];
/**
 * Returns a vector that is made from the largest components of all the passed vectors.
 * @param {Vector4[]} V 4d vectors.
 * @returns {Vector4}
 */
Vec4.max = (...V) => { let o = V[0]; for (let i = 0; i < V.length; i++) {
    o[0] = V[i][0] > o[0] ? V[i][0] : o[0];
    o[1] = V[i][1] > o[1] ? V[i][1] : o[1];
    o[2] = V[i][2] > o[2] ? V[i][2] : o[2];
    o[3] = V[i][3] > o[3] ? V[i][3] : o[3];
} return o; };
/**
 * Returns a vector that is made from the smallest components of all the passed vectors.
 * @param {Vector4[]} V 4d vectors.
 * @returns {Vector4}
 */
Vec4.min = (...V) => { let o = V[0]; for (let i = 0; i < V.length; i++) {
    o[0] = V[i][0] < o[0] ? V[i][0] : o[0];
    o[1] = V[i][1] < o[1] ? V[i][1] : o[1];
    o[2] = V[i][2] < o[2] ? V[i][2] : o[2];
    o[3] = V[i][3] < o[3] ? V[i][3] : o[3];
} return o; };
/**
 * Linearly interpolates between vectors A and B by t.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B.
 * @param {number} t blend value between 0 and 1.
 * @returns {Vector4}
 */
Vec4.lerp = (A, B, t) => [Math.lerp(A[0], B[0], t), Math.lerp(A[1], B[1], t), Math.lerp(A[2], B[2], t), Math.lerp(A[3], B[3], t)];
/**
 * Converts a Vector4 to Vector2.
 * @param {Vector4} V vector4.
 * @returns {Vector2}
 */
Vec4.toVec2 = (V) => [V[0], V[1]];
/**
 * Converts a Vector4 to Vector3.
 * @param {Vector4} V vector4.
 * @returns {Vector3}
 */
Vec4.toVec3 = (V) => [V[0], V[1], V[2]];
Object.freeze(Vec3);
Math.factorial = (n) => {
    let sum = 1;
    while (n > 0) {
        sum *= n;
        n--;
    }
    return sum;
};
Math.clamp = (v, m, M) => Math.max(m, Math.min(v, M));
Math.lerp = (a, b, t) => { t = Math.clamp(t, 0, 1); return a * (1 - t) + b * t; };
Math.lerpUnclamped = (a, b, t) => a * (1 - t) + b * t;