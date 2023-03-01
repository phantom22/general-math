/**
 * Creates a 3d axis, by normalizing a vector3.
 * @param {number} x first component.
 * @param {number} y second component.
 * @param {number} z third component.
 * @returns {Axis}
 */
const Ax = (x = 0, y = 0, z = 0) => Vec3.normalize([x, y, z]);
/**
 * Converts an Axis rotation to Quaternion.
 * @param {Axis} A axis.
 * @param {number} ang angle.
 * @returns {Quaternion}
 */
Ax.toQuat = (A, ang) => {
    const hf = ang / 2, s = Math.sin(hf);
    return [A[0] * s, A[1] * s, A[2] * s, Math.cos(hf)];
};
/**
 * Returns a formatted string for a given Axis.
 * @param {Axis} A axis.
 * @returns {string}
 */
Ax.toString = (A) => `Axis(${A[0]},${A[1]},${A[2]})`;
Object.freeze(Ax);
/**
 * @module
 * Creates a Vector3 containing the Euler Angles.
 * @param {number} x rotation around x axis.
 * @param {number} y rotation around y axis.
 * @param {number} z rotation around z axis.
 * @returns {EulerRotation}
 */
const Euler = (x = 0, y = 0, z = 0) => [x, y, z];
/**
 * Converts a given ZXY Euler Rotation to a Quaternion.
 * @param {EulerRotation} E euler rotation.
 * @returns {Quaternion}
 */
Euler.toQuat = (E) => {
    const s1 = Math.sin(E[0] * 0.5), s2 = Math.sin(E[1] * 0.5), s3 = Math.sin(E[2] * 0.5), c1 = Math.cos(E[0] * 0.5), c2 = Math.cos(E[1] * 0.5), c3 = Math.cos(E[2] * 0.5);
    return [s1 * c2 * c3 - c1 * s2 * s3, c1 * s2 * c3 + s1 * c2 * s3, c1 * c2 * s3 + s1 * s2 * c3, c1 * c2 * c3 - s1 * s2 * s3];
};
/**
 * Returns a formatted string for a given Euler Rotation.
 * @param {EulerRotation} E euler rotation.
 * @returns {string}
 */
Euler.toString = (E) => `Euler<ZXY>(${E[0]}°,${E[1]}°,${E[2]}°)`;
Object.freeze(Euler);
/**
 * @module
 * Creates a 3x3 matrix.
 * @returns {Matrix3}
 */
const Mat3 = (a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0) => [a, b, c, d, e, f, g, h, i];
/**
 * Returns a formatted string for a given Matrix3.
 * @param {Matrix3} M matrix3.
 * @returns {string}
 */
Mat3.toString = (M) => `Matrix3(\n  ${M[0]},${M[1]},${M[2]},\n  ${M[3]},${M[4]},${M[5]},\n  ${M[6]},${M[7]},${M[8]}\n)`;
/** Identity matrix. */
Mat3.identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
Object.freeze(Mat3.identity);
/** Matrix with all elements set to zero. */
Mat3.zero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
Object.freeze(Mat3.zero);
/**
 * Returns the determinant of a given Matrix3.
 * @param {Matrix3} M matrix3.
 * @returns {number}
 */
Mat3.det = (M) => M[6] * (M[1] * M[5] - M[2] * M[4]) - M[7] * (M[0] * M[5] - M[2] * M[3]) + M[8] * (M[0] * M[4] - M[1] * M[3]);
/**
 * Returns the transpose of a given Matrix3.
 * @param {Matrix3} M matrix3.
 * @returns {Matrix3}
 */
Mat3.transpose = (M) => [M[0], M[3], M[6], M[1], M[4], M[7], M[2], M[5], M[8]];
/**
 * Returns the inverse of a given Matrix3.
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
        (e * i - f * h) * det, (-b * i + c * h) * det, (b * f - c * e) * det,
        (-d * i + f * g) * det, (a * i - c * g) * det, (-a * f + c * d) * det,
        (d * h - e * g) * det, (-a * h + b * g) * det, (a * e - b * d) * det
    ];
};
/**
 * Checks whether the given Matrix3 is an identity matrix.
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
 * Creates a scaling Matrix3.
 * @param {Matrix3} M matrix3.
 * @param {Vector2} V vector2.
 * @returns {Matrix3}
 */
Mat3.scale = (M, V) => [M[0] * V[0], M[1] * V[0], M[2] * V[0], M[3] * V[1], M[4] * V[1], M[5] * V[1], M[6], M[7], M[8]];
/**
 * Get a column of the given Matrix3.
 * @param {Matrix3} M matrix3.
 * @param {number} i column index.
 * @returns {Vector3}
 */
Mat3.getCol = (M, i) => [M[i], M[3 + i], M[6 + i]];
/**
 * Get a row of the given Matrix3.
 * @param {Matrix3} M matrix3.
 * @param {number} i row index.
 * @returns {Vector3}
 */
Mat3.getRow = (M, i) => {
    const offs = i * 3;
    return [M[offs], M[offs + 1], M[offs + 2]];
};
/**
 * Returns all the columns of a given Matrix3 as an array of Vector3.
 * @param {Matrix3} M matrix3.
 * @returns {[Vector3,Vector3,Vector3]}
 */
Mat3.getCols = (M) => [[M[0], M[3], M[6]], [M[1], M[4], M[7]], [M[2], M[5], M[8]]];
/**
 * Returns all the rows of a given Matrix3 as an array of Vector3.
 * @param {Matrix3} M matrix3.
 * @returns {[Vector3,Vector3,Vector3]}
 */
Mat3.getRows = (M) => [[M[0], M[1], M[2]], [M[3], M[4], M[5]], [M[6], M[7], M[8]]];
/**
 * Returns the normal matrix of a given Matrix3.
 * @param {Matrix3} M matrix3.
 * @returns {Matrix3}
 */
Mat3.toNormalMat = (M) => Mat3.transpose(Mat3.invert(M));
/**
 * Converts a rotation Matrix3 to ZXY Euler Angles (radians).
 * @param {Matrix3} M matrix3.
 * @returns {EulerRotation}
 */
Mat3.toEuler = (M) => {
    const x = Math.asin(Utils.clamp(M[7], -1, 1));
    return (Math.abs(M[7]) < 0.9999999)
        ? [x, Math.atan2(-M[6], M[8]), Math.atan2(-M[1], M[4])]
        : [x, 0, Math.atan2(M[3], M[1])];
};
/**
 * Converts a given rotation Matrix3 to Matrix4.
 * @param {Matrix3} M matrix3.
 * @returns {Matrix4}
 */
Mat3.toMat4 = (M) => [M[0], M[3], M[6], 0, M[1], M[4], M[7], 0, M[2], M[5], M[8], 0, 0, 0, 0, 1];
/**
 * Creates a Matrix3 from three row vectors.
 * @param {Vector3} a vector3.
 * @param {Vector3} b vector3.
 * @param {Vector3} c vector3.
 * @param {Vector3} d vector3.
 * @returns {Matrix3}
 */
Mat3.fromRows = (a = Vec3.zero, b = Vec3.zero, c = Vec3.zero) => Mat3(...a, ...b, ...c);
/**
 * Creates a Matrix3 from three column vectors.
 * @param {Vector3} a vector3.
 * @param {Vector3} b vector3.
 * @param {Vector3} c vector3.
 * @param {Vector3} d vector3.
 * @returns {Matrix3}
 */
Mat3.fromCols = (a = Vec3.zero, b = Vec3.zero, c = Vec3.zero) => Mat3(a[0], b[0], c[0], a[1], b[1], c[1], a[2], b[2], c[2]);
Object.freeze(Mat3);
/**
 * @module
 * Creates a 4x4 matrix.
 * @returns {Matrix4}
 */
const Mat4 = (a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0) => [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p];
/**
 * Returns a formatted string for a given Matrix4.
 * @param {Matrix4} M matrix4.
 * @returns {string}
 */
Mat4.toString = (M) => `Matrix4(\n  ${M[0]},${M[1]},${M[2]},${M[3]},\n  ${M[4]},${M[5]},${M[6]},${M[7]},\n  ${M[8]},${M[9]},${M[10]},${M[11]},\n  ${M[12]},${M[13]},${M[14]},${M[15]}\n)`;
/** Identity matrix. */
Mat4.identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
Object.freeze(Mat4.identity);
/** Matrix with all elements set to zero. */
Mat4.zero = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
Object.freeze(Mat4.zero);
/**
 * Returns the determinant of a given Matrix4.
 * @param {Matrix4} M matrix4.
 * @returns {number}
 */
Mat4.det = (M) => -M[12] * (M[9] * (M[2] * M[7] - M[3] * M[6]) - M[10] * (M[1] * M[7] - M[3] * M[5]) + M[11] * (M[1] * M[6] - M[2] * M[5])) + M[13] * (M[8] * (M[2] * M[7] - M[3] * M[6]) - M[10] * (M[0] * M[7] - M[3] * M[4]) + M[11] * (M[0] * M[6] - M[2] * M[4])) - M[14] * (M[8] * (M[1] * M[7] - M[3] * M[5]) - M[9] * (M[0] * M[7] - M[3] * M[4]) + M[11] * (M[0] * M[5] - M[1] * M[4])) + M[15] * (M[8] * (M[1] * M[6] - M[2] * M[5]) - M[9] * (M[0] * M[6] - M[2] * M[4]) + M[10] * (M[0] * M[5] - M[1] * M[4]));
/**
 * Returns the transpose of a given Matrix4.
 * @param {Matrix4} M matrix4.
 * @returns {Matrix4}
 */
Mat4.transpose = (A) => [A[0], A[4], A[8], A[12], A[1], A[5], A[9], A[13], A[2], A[6], A[10], A[14], A[3], A[7], A[11], A[15]];
/**
 * Returns the inverse of a given Matrix4.
 * @param {Matrix4} M matrix4.
 * @returns {Matrix4}
 */
Mat4.invert = (M) => {
    let det = Mat4.det(M);
    if (det === 0)
        return Mat4.zero;
    det = 1 / det;
    const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = M, d1 = k * p - l * o, d2 = j * p - l * n, d3 = j * o - k * n, d4 = g * p - h * o, d5 = f * p - h * n, d6 = f * o - g * n, d7 = g * l - h * k, d8 = f * l - h * j, d9 = f * k - g * j, d10 = i * p - l * m, d11 = i * o - k * m, d12 = e * p - h * m, d13 = e * o - g * m, d14 = e * l - h * i, d15 = e * k - g * i, d16 = i * n - j * m, d17 = e * n - f * m, d18 = e * j - f * i;
    return [
        (f * d1 - g * d2 + h * d3) * det, (-b * d1 + c * d2 - d * d3) * det, (b * d4 - c * d5 + d * d6) * det, (-b * d7 + c * d8 - d * d9) * det,
        (-e * d1 + g * d10 - h * d11) * det, (a * d1 - c * d10 + d * d11) * det, (-a * d4 + c * d12 - d * d13) * det, (a * d7 - c * d14 + d * d15) * det,
        (e * d2 - f * d10 + h * d16) * det, (-a * d2 + b * d10 - d * d16) * det, (a * d5 - b * d12 + d * d17) * det, (-a * d8 + b * d14 - d * d18) * det,
        (-e * d3 + f * d11 - g * d16) * det, (a * d3 - b * d11 + c * d16) * det, (-a * d6 + b * d13 - c * d17) * det, (a * d9 - b * d15 + c * d18) * det
    ];
};
/**
 * Checks whether the given Matrix4 is an identity matrix.
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
 * Creates a scaling Matrix4.
 * @param {Matrix4} M matrix4.
 * @param {Vector3} V Vector3.
 * @returns {Matrix4}
 */
Mat4.scale = (M, V) => [M[0] * V[0], M[1] * V[0], M[2] * V[0], M[3] * V[0], M[4] * V[1], M[5] * V[1], M[6] * V[1], M[7] * V[1], M[8] * V[2], M[9] * V[2], M[10] * V[2], M[11] * V[2], M[12], M[13], M[14], M[15]];
/**
 * Get a column of the given Matrix4.
 * @param {Matrix4} M matrix4.
 * @param {number} i column index.
 * @returns {Vector4}
 */
Mat4.getCol = (M, i) => [M[i], M[4 + i], M[8 + i], M[12 + i]];
/**
 * Get a row of the given Matrix4.
 * @param {Matrix4} M matrix4.
 * @param {number} i row index.
 * @returns {Vector4}
 */
Mat4.getRow = (M, i) => {
    const offs = i * 4;
    return [M[offs], M[offs + 1], M[offs + 2], M[offs + 3]];
};
/**
 * Returns all the columns of a given Matrix4 as an array of Vector4.
 * @param {Matrix4} M matrix4.
 * @returns {[Vector4,Vector4,Vector4,Vector4]}
 */
Mat4.getCols = (M) => [[M[0], M[4], M[8], M[12]], [M[1], M[5], M[9], M[13]], [M[2], M[6], M[10], M[14]], [M[3], M[7], M[11], M[15]]];
/**
 * Returns all the rows of a given Matrix4 as an array of Vector4.
 * @param {Matrix4} M matrix4.
 * @returns {[Vector4,Vector4,Vector4,Vector4]}
 */
Mat4.getRows = (M) => [[M[0], M[1], M[2], M[3]], [M[4], M[5], M[6], M[7]], [M[8], M[9], M[10], M[11]], [M[12], M[13], M[14], M[15]]];
/**
 * Converts a Quaternion into a Matrix4.
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
 * Converts a rotation Matrix4 to ZXY Euler Angles (radians).
 * @param {Matrix4} M matrix4.
 * @returns {EulerRotation}
 */
Mat4.toEuler = (M) => {
    const x = Math.asin(Utils.clamp(M[6], -1, 1));
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
/**
 * Returns the normal matrix of a given Matrix4.
 * @param {Matrix4} M matrix4.
 * @returns {Matrix3}
 */
Mat4.toNormalMat = (M) => Mat3.transpose(Mat3.invert(Mat4.toMat3(M)));
/**
 * Creates a Matrix4 from four row vectors.
 * @param {Vector4} a vector4.
 * @param {Vector4} b vector4.
 * @param {Vector4} c vector4.
 * @param {Vector4} d vector4.
 * @returns {Matrix4}
 */
Mat4.fromRows = (a = Vec4.zero, b = Vec4.zero, c = Vec4.zero, d = Vec4.zero) => Mat4(...a, ...b, ...c, ...d);
/**
 * Creates a Matrix4 from four column vectors.
 * @param {Vector4} a vector4.
 * @param {Vector4} b vector4.
 * @param {Vector4} c vector4.
 * @param {Vector4} d vector4.
 * @returns {Matrix4}
 */
Mat4.fromCols = (a = Vec4.zero, b = Vec4.zero, c = Vec4.zero, d = Vec4.zero) => Mat4(a[0], b[0], c[0], d[0], a[1], b[1], c[1], d[1], a[2], b[2], c[2], d[2], a[3], b[3], c[3], d[3]);
Object.freeze(Mat4);
/**
 * @module
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
 * @param {Quaternion} Q quaternion.
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
 * @param {Quaternion} A quaternion A.
 * @param {Quaternion} B quaternion B.
 * @returns {number}
 */
Quat.angle = (A, B) => 2 * Math.acos(Math.abs(Utils.clamp(Quat.dot(A, B), -1, 1)));
/**
 * Combines rotations A and B.
 * @param {Quaternion} A quaternion A.
 * @param {Quaternion} B quaternion B.
 * @returns {Quaternion}
 */
Quat.prod = (A, B) => [A[0] * B[3] + A[3] * B[0] + A[1] * B[2] - A[2] * B[1], A[1] * B[3] + A[3] * B[1] + A[2] * B[2] - A[0] * B[2], A[2] * B[3] + A[3] * B[2] + A[0] * B[1] - A[1] * B[0], A[3] * B[3] + A[0] * B[0] + A[1] * B[1] - A[2] * B[2]];
/**
 * Returns true if two Quaternions are exactly equal.
 * @param {Quaternion} A quaternion A.
 * @param {Quaternion} B quaternion B.
 * @returns {boolean}
 */
Quat.equals = (A, B) => A === B;
/**
 * Returns true if two Quaternions are approximately equal.
 * @param {Quaternion} A quaternion A.
 * @param {Quaternion} B quaternion B.
 * @returns {boolean}
 */
Quat.compare = (A, B) => A[0] === B[0] && A[1] === B[1] && A[2] === B[2] && A[3] === B[3];
/**
 * Returns the length of a given Quaternion.
 * @param {Quaternion} Q quaternion.
 * @returns {number}
 */
Quat.magnitude = (Q) => Math.hypot(Q[0], Q[1], Q[2], Q[3]);
/**
 * Returns the squared length of a given Quaternion.
 * @param {Quaternion} Q quaternion.
 * @returns {number}
 */
Quat.sqrdMagnitude = (Q) => Q[0] ** 2 + Q[1] ** 2 + Q[2] ** 2 + Q[3] ** 2;
/**
 * Returns the inverse of a given rotation.
 * @param {Quaternion} Q quaternion.
 * @returns {Quaternion}
 */
Quat.inverse = (Q) => { const m = 1 / Quat.sqrdMagnitude(Q); return [Q[0] * m, -Q[1] * m, -Q[2] * m, -Q[3] * m]; };
/**
 * Converts a given rotation to a ZYX Euler Rotation.
 * @param {Quaternion} Q quaternion.
 * @returns {EulerRotation}
 */
Quat.toEuler = (Q) => {
    const A = (Math.acos(Q[3]) * 2) / 180 * Math.PI, c = 1 - Math.cos(A), s1 = Math.sin(A) ** 2 + Math.sin(A), s2 = Math.sin(A) ** 2 - Math.sin(A);
    const y = Math.asin(Utils.clamp((s2 * (Q[0] * Q[2] - Q[2])), -1, 1));
    return (Math.abs(y) < 0.9999999)
        ? [Math.atan2(s1 * (Q[1] * Q[2] + Q[2]), 1 + (-(Q[0] ** 2) - (Q[1] ** 2)) * c), y, Math.atan2(s1 * (Q[0] * Q[1] - Q[2]), 1 + (-(Q[1] ** 2) - (Q[2] ** 2)) * c)]
        : [0, y, Math.atan2(-s2 * (Q[0] * Q[1] - Q[2]), 1 + (-(Q[0] ** 2) - (Q[2] ** 2)) * c)];
};
/**
 * Converts a Quaternion into a rotation Matrix4.
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
 * Converts a Quaternion into a rotation Matrix3.
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
 * Converts a quaternion into ZXY Euler Angles.
 * @param {Quaternion} Q
 * @returns {EulerRotation}
 */
Quat.toEuler = (Q) => Mat4.toEuler(Quat.toMat4(Q));
Object.freeze(Quat);
/**
 * @module
 * This module helps to create unique identifiers and store them in a registry.
 */
const Registry = () => void 0;
/** Object that contains all the uuid/value pairs. */
Registry.generated = {};
/** Lookup table, needed for uuid generation. */
Registry.lut = "000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475767778797a7b7c7d7e7f808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedfe0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfeff".match(/.{1,2}/g);
Object.freeze(Registry.lut);
/**
 * Retrieve the value of a given uuid.
 * @param {string} u uuid.
 */
Registry.get = (u) => Registry.generated[u];
/**
 * Retrieve all generated uuids.
 */
Registry.getKeys = () => Object.keys(Registry.generated);
/**
 * Deletes a given uuid from the registry.
 * @param {string} u uuid.
 */
Registry.delete = (u) => delete Registry.generated[u];
/**
 * Ties a given value to a randomized uuid.
 * @param {any} v value.
 * @returns {string}
 */
Registry.generateUUID = (v) => {
    const t = Registry.lut;
    const [a, b, c, d] = [Math.random() * 0xffffffff | 0, Math.random() * 0xffffffff | 0, Math.random() * 0xffffffff | 0, Math.random() * 0xffffffff | 0];
    const uuid = (t[a & 0xff] + t[a >> 8 & 0xff] + t[a >> 16 & 0xff] + t[a >> 24 & 0xff] + '-' + t[b & 0xff] + t[b >> 8 & 0xff] + '-' + t[b >> 16 & 0x0f | 0x40] + t[b >> 24 & 0xff] + '-' + t[c & 0x3f | 0x80] + t[c >> 8 & 0xff] + '-' + t[c >> 16 & 0xff] + t[c >> 24 & 0xff] + t[d & 0xff] + t[d >> 8 & 0xff] + t[d >> 16 & 0xff] + t[d >> 24 & 0xff]).toLowerCase();
    Registry.generated[uuid] = v;
    return uuid;
};
Object.freeze(Registry);
const Formatting = () => void 0;
Formatting.padStart = (s, targetLength, char) => {
    let t = "";
    for (let i = 0; i < (targetLength - s.length); i++) {
        t += char;
    }
    return t + s;
};
Formatting.padEnd = (s, targetLength, char) => {
    let t = "";
    for (let i = 0; i < (targetLength - s.length); i++) {
        t += char;
    }
    return s + t;
};
/**
 * Clamps the length of a string.
 * @param {string} s string to crop.
 * @param {number} maxLength
 * @returns
 */
Formatting.crop = (s, maxLength) => {
    maxLength = Math.max(maxLength, 3);
    return s.length > maxLength ? s.slice(0, maxLength - 3) + "..." : s;
};
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
Vec2.magnitude = (V) => Math.hypot(V[0], V[1]);
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
Vec2.distance = (A, B) => Math.hypot(A[0] - B[0], A[1] - B[1]);
/**
 * Cross Product of two vectors.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {Vector3}
 */
Vec2.cross = (A, B) => [0, 0, -A[0] * B[1] + A[1] * B[0]];
/**
 * Gets the unsigned angle in radians between A and B.
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
Vec2.clamp = (V, x, y) => [Utils.clamp(V[0], ...x), Utils.clamp(V[1], ...y)];
/**
 * Returns a copy of a given vector with its components clamped between min and max.
 * @param {Vector2} V vector2.
 * @param {number} min min value for both components.
 * @param {number} max max value for both components.
 * @returns {Vector2}
 */
Vec2.simpleClamp = (V, min, max) => [Utils.clamp(V[0], min, max), Utils.clamp(V[1], min, max)];
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
Vec2.lerp = (A, B, t) => [Utils.lerp(A[0], B[0], t), Utils.lerp(A[1], B[1], t)];
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
/**
 * Returns a copy of the vector with all of its components rounded to nearest integer.
 * @param {Vector2} V vector2.
 * @returns {Vector2}
 */
Vec2.round = (V) => [Math.round(V[0]), Math.round(V[1])];
/**
 * Returns a copy of the vector with all of its components rounded to the largest integer less than or equal to a given number.
 * @param {Vector2} V vector2.
 * @returns {Vector2}
 */
Vec2.floor = (V) => [Math.floor(V[0]), Math.floor(V[1])];
/**
 * Returns a copy of the vector with all of its components rounded to the largest integer higher than or equal to a given number.
 * @param {Vector2} V vector2.
 * @returns {Vector2}
 */
Vec2.ceil = (V) => [Math.ceil(V[0]), Math.ceil(V[1])];
/**
 * Returns a copy of the vector with all of its components converted to their absolute values.
 * @param {Vector2} V vector2.
 * @returns {Vector2}
 */
Vec2.abs = (V) => [Math.abs(V[0]), Math.abs(V[1])];
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
Vec3.magnitude = (V) => Math.hypot(V[0], V[1], V[2]);
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
Vec3.distance = (A, B) => Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2]);
/**
 * Cross Product of two vectors.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {Vector3}
 */
Vec3.cross = (A, B) => [A[1] * B[2] - A[2] * B[1], A[0] * B[2] - A[2] * B[0], A[0] * B[1] - A[1] * B[0]];
/**
 * Gets the unsigned angle in radians between A and B.
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
Vec3.clamp = (V, x, y, z) => [Utils.clamp(V[0], ...x), Utils.clamp(V[1], ...y), Utils.clamp(V[2], ...z)];
/**
 * Returns a copy of a given vector with its components clamped between min and max.
 * @param {Vector3} V vector3.
 * @param {number} min min value for both components.
 * @param {number} max max value for both components.
 * @returns {Vector3}
 */
Vec3.simpleClamp = (V, min, max) => [Utils.clamp(V[0], min, max), Utils.clamp(V[1], min, max), Utils.clamp(V[2], min, max),];
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
Vec3.lerp = (A, B, t) => Vec3(Utils.lerp(A[0], B[0], t), Utils.lerp(A[1], B[1], t), Utils.lerp(A[2], B[2], t));
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
/**
 * Returns a copy of the vector with all of its components rounded to nearest integer.
 * @param {Vector3} V vector3.
 * @returns {Vector3}
 */
Vec3.round = (V) => [Math.round(V[0]), Math.round(V[1]), Math.round(V[2])];
/**
 * Returns a copy of the vector with all of its components rounded to the largest integer less than or equal to a given number.
 * @param {Vector3} V vector3.
 * @returns {Vector3}
 */
Vec3.floor = (V) => [Math.floor(V[0]), Math.floor(V[1]), Math.floor(V[2])];
/**
 * Returns a copy of the vector with all of its components rounded to the largest integer higher than or equal to a given number.
 * @param {Vector3} V vector3.
 * @returns {Vector3}
 */
Vec3.ceil = (V) => [Math.ceil(V[0]), Math.ceil(V[1]), Math.ceil(V[2])];
/**
 * Returns a copy of the vector with all of its components converted to their absolute values.
 * @param {Vector3} V vector3.
 * @returns {Vector3}
 */
Vec3.abs = (V) => [Math.abs(V[0]), Math.abs(V[1]), Math.abs(V[2])];
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
Vec4.magnitude = (V) => Math.hypot(V[0], V[1], V[2], V[3]);
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
Vec4.distance = (A, B) => Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2], A[3] - B[3]);
/**
 * Gets the unsigned angle in radians between A and B.
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
Vec4.clamp = (V, x, y, z, w) => [Utils.clamp(V[0], ...x), Utils.clamp(V[1], ...y), Utils.clamp(V[2], ...z), Utils.clamp(V[3], ...w)];
/**
 * Returns a copy of a given vector with its components clamped between min and max.
 * @param {Vector4} V vector4.
 * @param {number} min min value for both components.
 * @param {number} max max value for both components.
 * @returns {Vector4}
 */
Vec4.simpleClamp = (V, min, max) => [Utils.clamp(V[0], min, max), Utils.clamp(V[1], min, max), Utils.clamp(V[2], min, max), Utils.clamp(V[3], min, max)];
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
Vec4.lerp = (A, B, t) => [Utils.lerp(A[0], B[0], t), Utils.lerp(A[1], B[1], t), Utils.lerp(A[2], B[2], t), Utils.lerp(A[3], B[3], t)];
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
/**
 * Returns a copy of the vector with all of its components rounded to nearest integer.
 * @param {Vector4} V vector4.
 * @returns {Vector4}
 */
Vec4.round = (V) => [Math.round(V[0]), Math.round(V[1]), Math.round(V[2]), Math.round(V[3])];
/**
 * Returns a copy of the vector with all of its components rounded to the largest integer less than or equal to a given number.
 * @param {Vector4} V vector4.
 * @returns {Vector4}
 */
Vec4.floor = (V) => [Math.floor(V[0]), Math.floor(V[1]), Math.floor(V[2]), Math.floor(V[3])];
/**
 * Returns a copy of the vector with all of its components rounded to the largest integer higher than or equal to a given number.
 * @param {Vector4} V vector4.
 * @returns {Vector4}
 */
Vec4.ceil = (V) => [Math.ceil(V[0]), Math.ceil(V[1]), Math.ceil(V[2]), Math.ceil(V[3])];
/**
 * Returns a copy of the vector with all of its components converted to their absolute values.
 * @param {Vector4} V vector4.
 * @returns {Vector4}
 */
Vec4.abs = (V) => [Math.abs(V[0]), Math.abs(V[1]), Math.abs(V[2]), Math.abs(V[3])];
Object.freeze(Vec3);
const Wasm = () => void 0;
/** Where all wasm modules go. */
Wasm.imported = {};
/**
 * Tries to import a wasm module.
 * @param {string} moduleName
 * @param {string} base64
 * @returns
 */
Wasm.fromBase64 = (moduleName, base64) => {
    try {
        const bin = atob(base64), bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) {
            bytes[i] = bin.charCodeAt(i);
        }
        Wasm.imported[moduleName] = { sourceCode: bytes };
        return new Promise((resolve, reject) => {
            WebAssembly.instantiate(bytes.buffer, {})
                .then(v => {
                const k = Object.keys(v.instance.exports);
                for (let i = 0; i < k.length; i++) {
                    const ex = k[i];
                    Wasm.imported[moduleName][ex] = v.instance.exports[ex];
                }
                resolve(moduleName);
            })
                .catch(e => {
                const errByte = e.toString().match(/[0-9]+/g)?.map(Number)[0] || 0;
                console.error(`Couldn't import '${moduleName}'!\n    ${e}. See below.`);
                Wasm.memoryView(bytes, errByte);
                Wasm.imported[moduleName].errByte = errByte;
                reject(moduleName);
            });
        });
    }
    catch (e) {
        console.error(`The module '${moduleName}' was not correctly encoded to base64!`);
        return Promise.reject(moduleName);
    }
};
/** A table of all opcodes of the wasm assembly language. */
Wasm.opcodes = ["unreachable", "nop", "block", "loop", "if", "else", "try", "catch", "throw", "rethrow", "", "end", "br", "br_if", "br_table", "return", "call", "call_indirect", "return_call", "return_call_indirect", "", "", "", "", "delegate", "catch_all", "drop", "select", "select t", "", "", "", "local.get", "local.set", "local.tee", "global.get", "global.set", "table.get", "table.set", "i32.load", "i64.load", "f32.load", "f64.load", "i32.load8_s", "i32.load8_u", "i32.load16_s", "i32.load16_u", "i64.load8_s", "i64.load8_u", "i64.load16_s", "i64.load16_u", "i64.load32_s", "i64.load32_u", "i32.store", "i64.store", "f32.store", "f64.store", "i32.store8", "i32.store16", "i64.store8", "i64.store16", "i64.store32", "memory.size", "memory.grow", "i32.const", "i64.const", "f32.const", "f64.const", "i32.eqz", "i32.eq", "i32.ne", "i32.it_s", "i32.it_u", "i32.gt_s", "i32.gt_u", "i32.le_s", "i32.le_u", "i32.ge_s", "i32.ge_u", "i64.eqz", "i64.eq", "i64.ne", "i64.it_s", "i64.it_u", "i64.gt_s", "i64.gt_u", "i64.le_s", "i64.le_u", "i64.ge_s", "i64.ge_u", "f32.eq", "f32.ne", "f32.it", "f32.gt", "f32.le", "f32.ge", "f64.eq", "f64.ne", "f64.it", "f64.gt", "f64.le", "f64.ge", "i32.clz", "i32.ctz", "i32.popcnt", "i32.add", "i32.sub", "i32.mul", "i32.div_s", "i32.div_u", "i32.rem_s", "i32.rem_u", "i32.and", "i32.or", "i32.xor", "i32.shl", "i32.shr_s", "i32.shr_u", "i32.rotl", "i32.rotr", "i64.clz", "i64.ctz", "i64.popcnt", "i64.add", "i64.sub", "i64.mul", "i64.div_s", "i64.div_u", "i64.rem_s", "i64.rem_u", "i64.and", "i64.or", "i64.xor", "i64.shl", "i64.shr_s", "i64.shr_u", "i64.rotl", "i64.rotr", "f32.abs", "f32.neg", "f32.ceil", "f32.floor", "f32.trunc", "f32.nearest", "f32.sqrt", "f32.add", "f32.sub", "f32.mul", "f32.div", "f32.min", "f32.max", "f32.copysign", "f64.abs", "f64.neg", "f64.ceil", "f64.floor", "f64.trunc", "f64.nearest", "f64.sqrt", "f64.add", "f64.sub", "f64.mul", "f64.div", "f64.min", "f64.max", "f64.copysign", "i32.wrap_i64", "i32.trunc_f32_s", "i32.trunc_f32_u", "i32.trunc_f64_s", "i32.trunc_f64_u", "i64.extend_i32_s", "i64.extend_i32_u", "i64.trunc_f32_s", "i64.trunc_f32_u", "i64.trunc_f64_s", "i64.trunc_f64_u", "f32.convert_i32_s", "f32.convert_i32_u", "f32.convert_i64_s", "f32.convert_i64_u", "f32.demote_f64", "f64.convert_i32_s", "f64.convert_i32_u", "f64.convert_i64_s", "f64.convert_i64_u", "f64.promote_f32", "i32.reinterpret_f32", "i64.reinterpret_f64", "f32.reinterpret_i32", "f64.reinterpret_i64", "i32.extend8_s", "i32.extends16_s", "i64,extend8_s", "i64.extends16_s", "i64.extend32_s", "", "", "", "", "", "", "", "", "", "", "", "ref.null", "ref.is_null", "ref.func", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "**", "SIMD", "", ""];
Object.freeze(Wasm.opcodes);
/**
 * Prints to console the standard memory view of a program.
 * @param {Uint8Array} mem
 * @param {number} errByte error offset.
 */
Wasm.memoryView = (mem, errByte = -1) => {
    const br = "=".repeat(115) + "\n", err = "color:#ff751a;font-weight:bold;", def = "color:#ffffff;font-weight:normal;", format = () => "";
    let styles = [def], o = "%c\n" + br + "|  decimal  |  hexa   |    01  02  03  04  05  06  07  08  09  10  11  12  13  14  15  16    |        text        |" + "\n" + br;
    for (let offset = 0; offset < mem.length; offset += 16) {
        let t = "| ", bytes = Array.from(mem.slice(offset, offset + 16));
        t += offset.toString().padStart(9, " ") + " | "; // decimal offset
        t += "0x" + offset.toString(16).padStart(5, "0") + " |    "; // hexadecimal offset
        const containsErr = errByte > -1 && (offset >= errByte || offset <= errByte && offset + 15 >= errByte), firstErrLine = offset <= errByte && offset + 15 >= errByte;
        t += bytes.map((v, i) => {
            let _ = v.toString(16).padStart(2, "0");
            if (containsErr && offset + i >= errByte) {
                if (i === 0 || offset + i === errByte) {
                    styles.push(err);
                    _ = "%c" + _;
                }
                else if (i === bytes.length - 1) {
                    styles.push(def);
                    _ = _ + "%c";
                }
            }
            return _;
        }).join("  ").padEnd(containsErr ? 66 : 62, " ") + "    |  "; // single bytes
        t += bytes.map((v, i) => {
            let _ = v > 31 && v < 127 || v > 160 && v !== 173 ? String.fromCharCode(v) : ".";
            if (containsErr && offset + i >= errByte) {
                if (i === 0 || offset + i === errByte) {
                    styles.push(err);
                    _ = "%c" + _;
                }
                else if (i === bytes.length - 1) {
                    styles.push(def);
                    _ = _ + "%c";
                }
            }
            return _;
        }).join("").padEnd(containsErr ? 20 : 16, " ") + "  |" + (firstErrLine ? "  %c<---- Something went wrong!%c" : "") + "\n"; // decoded to string
        if (firstErrLine)
            styles.push(err, def);
        o += t;
    }
    o += br;
    console.log(o, ...styles);
};
Object.freeze(Wasm);
/**
 * @module
 * Creates a 64-bit float array, for the purpose of being used as a buffer.
 * @param {number} s size.
 * @returns {Float64Array}
 */
const Buffer = (s = 5000) => new Float64Array(s);
/**
 * Returns a Vector2, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset.
 * @returns {Vector2}
 */
Buffer.toVec2 = (B, o) => Vec2(B[o], B[o + 1]);
/**
 * Returns a Vector3, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset.
 * @returns {Vector3}
 */
Buffer.toVec3 = (B, o) => Vec3(B[o], B[o + 1], B[o + 2]);
/**
 * Returns an Axis, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset.
 * @returns {Axis}
 */
Buffer.toAx = (B, o) => Ax(B[o], B[o + 1], B[o + 2]);
/**
 * Returns an Euler Rotation, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset.
 * @returns {EulerRotation}
 */
Buffer.toEuler = (B, o) => Euler(B[o], B[o + 1], B[o + 2]);
/**
 * Returns a Vector4, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset.
 * @returns {Vector4}
 */
Buffer.toVec4 = (B, o) => Vec4(B[o], B[o + 1], B[o + 2], B[o + 3]);
/**
 * Returns a Quaterion, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset.
 * @returns {Quaterion}
 */
Buffer.toQuat = (B, o) => Quat(B[o], B[o + 1], B[o + 2], B[o + 3]);
/**
 * Returns a Matrix3, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset.
 * @returns {Matrix3}
 */
Buffer.toMat3 = (B, o) => Mat3(B[o], B[o + 1], B[o + 2], B[o + 3], B[o + 4], B[o + 5], B[o + 6], B[o + 7], B[o + 8]);
/**
 * Returns a Matrix4, given a Buffer and an offset.
 * @param {Float64Array} B buffer.
 * @param {number} o offset.
 * @returns {Matrix4}
 */
Buffer.toMat4 = (B, o) => Mat4(B[o], B[o + 1], B[o + 2], B[o + 3], B[o + 4], B[o + 5], B[o + 6], B[o + 7], B[o + 8], B[o + 9], B[o + 10], B[o + 11], B[o + 12], B[o + 13], B[o + 14], B[o + 15]);
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
Buffer.scanner = class {
    end;
    constructor(buffer, checklist, refreshRate = 10) {
        checklist = checklist.filter(v => v[0] + (Buffer.dataTypes[v[1]] || 0) <= buffer.byteLength);
        const dw = new DataView(buffer);
        const br = "=".repeat(62) + "\n";
        const intervalId = setInterval(() => {
            let o = [];
            for (let i = 0; i < checklist.length; i++) {
                const [offset, type, label] = checklist[i];
                let t;
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
                o.push("| " + (label ? label.slice(0, 10).padEnd(12, ".") : "var").padStart(12, " ") + " | " + offset.toString().padStart(6, " ") + " | " + t.toString().padStart(23, " ") + " | " + type.padStart(8, " ") + " |");
            }
            console.clear();
            console.log(br + "|    label     |  offs  |          value          |   type   |\n" + br + o.join("\n") + "\n" + br);
        }, 1000 / refreshRate);
        this.end = function () {
            console.clear();
            clearInterval(intervalId);
        };
    }
};
Buffer.viewSnapshot = (b) => {
    const a = new Uint8Array(b);
    Wasm.memoryView(a);
};
/**
 * @module
 * A module that contains fundamental math functions.
 */
const Utils = () => void 0;
/**
 * Returns the factorial of a number.
 * @param {number} n number
 * @returns {number}
 */
Utils.factorial = (n) => {
    let sum = 1;
    while (n > 0) {
        sum *= n;
        n--;
    }
    return sum;
};
/**
 * Clamps a value between min and max.
 * @param {number} v value.
 * @param {number} m min value.
 * @param {number} M max value.
 * @returns {number}
 */
Utils.clamp = (v, m, M) => Math.max(m, Math.min(v, M));
/**
 * Linearly interpolates between A and B by t.
 * @param {number} a value A.
 * @param {number} b value B.
 * @param {number} t blend value (clamped between 0 and 1).
 * @returns {number}
 */
Utils.lerp = (a, b, t) => { t = Utils.clamp(t, 0, 1); return a * (1 - t) + b * t; };
/**
 * Linearly interpolates between A and B by t.
 * @param {number} a value A.
 * @param {number} b value B.
 * @param {number} t blend value.
 * @returns {number}
 */
Utils.lerpUnclamped = (a, b, t) => a * (1 - t) + b * t;
/** Constant for easy conversion from degrees to radians. */
Utils.deg2rad = 1 / 180 * Math.PI;
/** Constant for easy conversion from radians to degrees. */
Utils.rad2deg = 1 / Math.PI * 180;
Object.freeze(Utils);
