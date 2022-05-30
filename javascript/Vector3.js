/**
 * @module
 * Creates a 3D vector.
 * @param {number} x first component.
 * @param {number} y second component.
 * @param {number} z third component.
 * @returns {Vector2}
 */
const Vec3 = (x = 0, y = 0, z = 0) => [x, y, z];
/**
 * Returns a formatted string for a given Quaternion.
 * @param {Vector3} V vector.
 * @returns {string}
 */
Vec3.toString = (V) => `Vector3(${V[0]},${V[1]},${V[2]})`;
/** Shorthand for writing Vec3(0, 1, 0). */
Vec3.up = Vec3(0, 1, 0);
Object.freeze(Vec3.up);
/** Shorthand for writing Vec3(0, -1, 0). */
Vec3.down = Vec3(0, -1, 0);
Object.freeze(Vec3.down);
/** Shorthand for writing Vec3(-1, 0, 0). */
Vec3.left = Vec3(-1, 0, 0);
Object.freeze(Vec3.left);
/** Shorthand for writing Vec3(1, 0, 0). */
Vec3.right = Vec3(1, 0, 0);
Object.freeze(Vec3.right);
/** Shorthand for writing Vec3(0, 0, 1). */
Vec3.forward = Vec3(0, 0, 1);
Object.freeze(Vec3.forward);
/** Shorthand for writing Vec3(0, 0, -1). */
Vec3.back = Vec3(0, 0, -1);
Object.freeze(Vec3.back);
/** Shorthand for writing Vec3(1, 1, 1). */
Vec3.one = Vec3(1, 1, 1);
Object.freeze(Vec3.one);
/** Shorthand for writing Vec3(0, 0, 0). */
Vec3.zero = Vec3(0, 0, 0);
Object.freeze(Vec3.zero);
/**
 * Returns true if two vectors are exactly equal.
 * @param {Vector3} a vector A.
 * @param {Vector3} b vector B.
 * @returns {boolean}
 */
Vec3.equals = (a, b) => a === b;
/**
 * Returns true if two vectors are approximately equal.
 * @param {Vector3} a vector A.
 * @param {Vector3} b vector B.
 * @returns {boolean}
 */
Vec3.compare = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
/**
 * Returns true if any of the given vector components is not a number.
 * @param {Vector3} v vector.
 * @returns {boolean}
 */
Vec3.isNaN = (v) => Number.isNaN(v[0]) || Number.isNaN(v[1]) || Number.isNaN(v[2]);
/**
 * Returns a copy of a given vector with all its NANS replaced by a default value.
 * @param {Vector3} v vector.
 * @param {number} [d=0] default value.
 * @returns {Vector3}
 */
Vec3.repair = (v, d = 0) => [v[0] || d, v[1] || d, v[2] || d];
/**
 * Adds two vectors.
 * @param {Vector3} a vector A.
 * @param {Vector3} b vector B.
 * @returns {Vector3}
 */
Vec3.add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
/**
 * Subtracts one vector from another.
 * @param {Vector3} a vector A.
 * @param {Vector3} b vector B.
 * @returns {Vector3}
 */
Vec3.sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
/**
 * Multiplies a vector by a number.
 * @param {Vector3} v vector.
 * @param {number} s scalar.
 * @returns {Vector3}
 */
Vec3.mul = (v, s) => [v[0] * s, v[1] * s, v[2] * s];
/**
 * Dot Product of two vectors.
 * @param {Vector3} a vector A.
 * @param {Vector3} b vector B.
 * @returns {number}
 */
Vec3.dot = (a, b) => a[0] * b[0] + a[1] * b[1];
/**
 * Multiplies two vectors component-wise.
 * @param {Vector3} a vector A.
 * @param {Vector3} b vector B.
 * @returns {number}
 */
Vec3.scale = (a, b) => [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
/**
 * Divides a vector by a number.
 * @param {Vector3} a vector A.
 * @param {number} s scalar.
 * @returns {Vector3}
 */
Vec3.div = (v, s) => { const t = 1 / s; return [v[0] * t, v[1] * t, v[2] * t]; };
/**
 * Returns the length of a given vector.
 * @param {Vector3} v vector.
 * @returns {number}
 */
Vec3.magnitude = (v) => (v[0] ** 2 + v[1] ** 2 + v[2] ** 2) ** (1 / 2);
/**
 * Returns the squared length of a given vector.
 * @param {Vector3} v vector.
 * @returns {number}
 */
Vec3.sqrMagnitude = (v) => v[0] ** 2 + v[1] ** 2 + v[2] ** 2;
/**
 * Returns the given vector with a magnitude of 1.
 * @param {Vector3} v vector.
 * @returns {Vector3}
 */
Vec3.normalize = (v) => { const t = 1 / Vec3.magnitude(v); return [v[0] * t, v[1] * t, v[2] * t]; };
/**
 * Returns the distance between a and b.
 * @param {Vector3} a vector A.
 * @param {Vector3} b vector B.
 * @returns {number}
 */
Vec3.distance = (a, b) => ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2) ** (1 / 2);
/**
 * Gets the unsigned angle in degrees between a and b.
 * @param {Vector3} a vector A.
 * @param {Vector3} b vector B.
 * @returns {number}
 */
Vec3.angle = (a, b) => Math.acos(Vec3.dot(a, b) / (Vec3.magnitude(a) * Vec3.magnitude(b)));
/**
 * Returns a copy of a given vector with its components clamped to their respective constraints.
 * @param {Vector3} v vector.
 * @param {Vector2} x min and max for the x component.
 * @param {Vector2} y min and max for the y component.
 * @returns {Vector3}
 */
Vec3.clamp = (v, x, y, z) => [Math.clamp(v[0], ...x), Math.clamp(v[1], ...y), Math.clamp(v[2], ...z)];
/**
 * Returns a copy of a given vector with its components clamped between min and max.
 * @param {Vector3} v vector.
 * @param {number} min min value for both components.
 * @param {number} max max value for both components
 * @returns {Vector3}
 */
Vec3.simpleClamp = (v, min, max) => [Math.clamp(v[0], min, max), Math.clamp(v[1], min, max), Math.clamp(v[2], min, max),];
/**
 * Returns a vector that is made from the largest components of all the passed vectors.
 * @param {Vector3[]} v vectors.
 * @returns {Vector3}
 */
Vec3.max = (...v) => { let o = v[0]; for (let i = 0; i < v.length; i++) {
    o[0] = v[i][0] > o[0] ? v[i][0] : o[0];
    o[1] = v[i][1] > o[1] ? v[i][1] : o[1];
    o[2] = v[i][2] > o[2] ? v[i][2] : o[2];
} return o; };
/**
 * Returns a vector that is made from the smallest components of all the passed vectors.
 * @param {Vector3[]} v vectors.
 * @returns {Vector3}
 */
Vec3.min = (...v) => { let o = v[0]; for (let i = 0; i < v.length; i++) {
    o[0] = v[i][0] < o[0] ? v[i][0] : o[0];
    o[1] = v[i][1] < o[1] ? v[i][1] : o[1];
    o[2] = v[i][2] < o[2] ? v[i][2] : o[2];
} return o; };
/**
 * Linearly interpolates between vectors a and b by t.
 * @param {Vector3} a vector A.
 * @param {Vector3} b vector B.
 * @param {number} t blend value between 0 and 1.
 * @returns {Vector3}
 */
Vec3.lerp = (a, b, t) => Vec3(Math.lerp(a[0], b[0], t), Math.lerp(a[1], b[1], t), Math.lerp(a[2], b[2], t));
/**
 * Converts a Vector3 to a Vector2.
 * @param {Vector3} v
 * @returns {Vector2}
 */
Vec3.toVec2 = (v) => Vec2(v[0], v[1]);
Object.freeze(Vec3);
