/**
 * @typedef {[number,number]} Vector2 Representation of 2D vectors and points.
 * @typedef {[number,number,number]} Vector3 Representation of 3D vectors and points.
 * @typedef {[number,number,number,number]} Vector4 Representation of 4D vectors and points.
 * @typedef {[number,number,number]} Axis Representation of an axis.
 * @typedef {[number,number,number]} EulerRotation Representation of rotation in euler angles.
 * @typedef {[number,number,number,number,number,number,number,number,number]} Matrix3 A standard 3x3 rotation matrix.
 * @typedef {[number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number]} Matrix4 A standard 4x4 transformation matrix.
 * @typedef {[number,number,number,number]} Quaternion Quaternions are used to represent rotations.
 */
/** Representation of 2D vectors and points. */
type Vector2 = [number,number];
/** Representation of 3D vectors and points. */
type Vector3 = [number,number,number];
/** Representation of 4D vectors and points. */
type Vector4 = [number,number,number,number];
/** Representation of an axis. */
type Axis = [number,number,number];
/** Representation of rotation in euler angles. */
type EulerRotation = [number,number,number];
/** A standard 3x3 rotation matrix. */
type Matrix3 = [number,number,number,number,number,number,number,number,number];
/** A standard 4x4 transformation matrix. */
type Matrix4 = [number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number];
/** Quaternions are used to represent rotations.  1*/
type Quaternion = [number,number,number,number];

interface Math {
    factorial(n:number): number;
    clamp(v:number, min:number, max:number): number;
    lerp(a:number, b:number, t:number): number;
    lerpUnclamped(a:number, b:number, t:number): number;
}

Math.factorial = (n:number) => {
    let sum=1;
    while (n > 0) {
        sum *= n;
        n--
    }
    return sum
}

Math.clamp = (v:number, m:number, M:number) => Math.max(m, Math.min(v, M));
Math.lerp = (a:number, b:number, t:number) => { t=Math.clamp(t,0,1); return a*(1-t)+b*t };
Math.lerpUnclamped = (a:number, b:number, t:number) => a*(1-t)+b*t;