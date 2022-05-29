/**
 * @typedef {[number,number]} Vector2 Representation of 2D vectors and points.
 * @typedef {[number,number,number]} Vector3 Representation of 3D vectors and points.
 * @typedef {[number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number]} Matrix4 A standard 4x4 transformation matrix.
 * @typedef {[number,number,number,number]} Quaternion Quaternions are used to represent rotations.
 */
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
