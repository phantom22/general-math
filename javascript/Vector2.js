/**
 * @typedef {[number,number]} Vector2 Representation of 2D vectors and points.
 */
/**
 * @module
 * Creates an immutable 2D vector.
 * @param {number} x first component.
 * @param {number} y second component.
 * @returns  {Vector2}
 */
const Vec2 = (x = 0, y = 0) => {
    let o = [x, y];
    o.toString = () => `Vector2(${o[0]},${o[1]})`;
    Object.freeze(o);
    return o;
};
/**
 * Shorthand for writing Vec2(0, 1).
 */
Vec2.up = Vec2(0, 1);
/**
 * Shorthand for writing Vec2(0, -1).
 */
Vec2.down = Vec2(0, -1);
/**
 *  Shorthand for writing Vec2(-1, 0).
 */
Vec2.left = Vec2(-1, 0);
/**
 *  Shorthand for writing Vec2(1, 0).
 */
Vec2.right = Vec2(1, 0);
/**
 *  Shorthand for writing Vec2(1, 1).
 */
Vec2.one = Vec2(1, 1);
/**
 *  Shorthand for writing Vec2(0, 0).
 */
Vec2.zero = Vec2(0, 0);
/**
 * Returns true if two vectors are exactly equal.
 * @param {Vector2} a vector A.
 * @param {Vector2} b vector B.
 * @returns {boolean}
 */
Vec2.equals = (a, b) => a === b;
/**
 * Returns true if two vectors are approximately equal.
 * @param {Vector2} a vector A.
 * @param {Vector2} b vector B.
 * @returns {boolean}
 */
Vec2.compare = (a, b) => a[0] === b[0] && a[1] === b[1];
/**
 * Returns true if any of the given vector components is not a number.
 * @param {Vector2} v vector.
 * @returns {boolean}
 */
Vec2.isNaN = (v) => v[0] !== v[0] || v[1] !== v[1];
/**
 * Returns a copy of a given vector with all its NANS replaced by a default value.
 * @param {Vector2} v vector.
 * @param {number} [d=0] default value.
 * @returns {Vector2}
 */
Vec2.repair = (v, d = 0) => [v[0] || d, v[1] || d];
/**
 * Adds two vectors.
 * @param {Vector2} a vector A.
 * @param {Vector2} b vector B.
 * @returns {Vector2}
 */
Vec2.add = (a, b) => [a[0] + b[0], a[1] + b[1]];
/**
 * Subtracts one vector from another.
 * @param {Vector2} a vector A.
 * @param {Vector2} b vector B.
 * @returns {Vector2}
 */
Vec2.sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
/**
 * Multiplies a vector by a number.
 * @param {Vector2} v vector.
 * @param {number} s scalar.
 * @returns {Vector2}
 */
Vec2.mul = (v, s) => [v[0] * s, v[1] * s];
/**
 * Dot Product of two vectors.
 * @param {Vector2} a vector A.
 * @param {Vector2} b vector B.
 * @returns {number}
 */
Vec2.dot = (a, b) => a[0] * b[0] + a[1] * b[1];
/**
 * Multiplies two vectors component-wise.
 * @param {Vector2} a vector A.
 * @param {Vector2} b vector B.
 * @returns {number}
 */
Vec2.scale = (a, b) => [a[0] * b[0], a[1] * b[1]];
/**
 * Divides a vector by a number.
 * @param {Vector2} a vector A.
 * @param {number} s scalar.
 * @returns {Vector2}
 */
Vec2.div = (v, s) => { const t = 1 / s; return [v[0] * t, v[1] * t]; };
/**
 * Returns the length of a given vector.
 * @param {Vector2} v vector.
 * @returns {number}
 */
Vec2.magnitude = (v) => (v[0] ** 2 + v[1] ** 2) ** (1 / 2);
/**
 * Returns the squared length of a given vector.
 * @param {Vector2} v vector.
 * @returns {number}
 */
Vec2.sqrMagnitude = (v) => v[0] ** 2 + v[1] ** 2;
/**
 * Returns the given vector with a magnitude of 1.
 * @param {Vector2} v vector.
 * @returns {Vector2}
 */
Vec2.normalize = (v) => { const t = 1 / Vec2.magnitude(v); return [v[0] * t, v[1] * t]; };
/**
 * Returns the distance between a and b.
 * @param {Vector2} a vector A.
 * @param {Vector2} b vector B.
 * @returns {number}
 */
Vec2.distance = (a, b) => ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) ** (1 / 2);
/**
 * Gets the unsigned angle in degrees between a and b.
 * @param {Vector2} a vector A.
 * @param {Vector2} b vector B.
 * @returns {number}
 */
Vec2.angle = (a, b) => Math.acos(Vec2.dot(a, b) / (Vec2.magnitude(a) * Vec2.magnitude(b)));
/**
 * Returns a copy of a given vector with its components clamped to their respective constraints.
 * @param {Vector2} v vector.
 * @param {Vector2} x min and max for the x component.
 * @param {Vector2} y min and max for the y component.
 * @returns {Vector2}
 */
Vec2.clamp = (v, x, y) => [Math.max(x[0], Math.min(v[0], x[1])), Math.max(y[0], Math.min(v[1], y[1]))];
/**
 * Returns a copy of a given vector with its components clamped between min and max.
 * @param {Vector2} v vector.
 * @param {number} min min value for both components.
 * @param {number} max max value for both components
 * @returns {Vector2}
 */
Vec2.simpleClamp = (v, min, max) => [Math.max(min, Math.min(v[0], max)), Math.max(min, Math.min(v[1], max))];
/**
 * Returns a vector that is made from the largest components of all the passed vectors.
 * @param {Vector2[]} v vectors.
 * @returns {Vector2}
 */
Vec2.max = (...v) => { let o = v[0]; for (let i = 0; i < v.length; i++) {
    o[0] = v[i][0] > o[0] ? v[i][0] : o[0];
    o[1] = v[i][1] > o[1] ? v[i][1] : o[1];
} return o; };
/**
 * Returns a vector that is made from the smallest components of all the passed vectors.
 * @param {Vector2[]} v vectors.
 * @returns {Vector2}
 */
Vec2.min = (...v) => { let o = v[0]; for (let i = 0; i < v.length; i++) {
    o[0] = v[i][0] < o[0] ? v[i][0] : o[0];
    o[1] = v[i][1] < o[1] ? v[i][1] : o[1];
} return o; };
/**
 * Linearly interpolates between vectors a and b by t.
 * @param {Vector2} a vector A.
 * @param {Vector2} b vector B.
 * @param {number} t blend value between 0 and 1.
 * @returns {Vector2}
 */
Vec2.lerp = (a, b, t) => Vec2(a[0] * (1 - t) + b[0] * t, a[1] * (1 - t) + b[1] * t);
/**
 * Converts a Vector2 to a Vector3.
 * @param {Vector2} v
 * @returns {Vector3}
 */
Vec2.toVec3 = (v) => Vec3(...v, 0);
Object.freeze(Vec2);