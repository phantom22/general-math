/**
 * Creates a 3d axis, by normalizing a vector3.
 * @param {number} x first component.
 * @param {number} y second component.
 * @param {number} z third component. 
 * @returns 
 */
const Ax = (x=0,y=0,z=0): Axis => Vec3.normalize([x,y,z]);
/**
 * Converts angle-axis to a rotation representation.
 * @param {Axis} A axis.
 * @param {number} ang angle. 
 * @returns {Quaternion}
 */
Ax.toQuat = (A:Axis, ang:number): Quaternion => {
    const hf=ang/2, s=Math.sin(hf);
    return [A[0]*s,A[1]*s,A[2]*s,Math.cos(hf)];
}
/**
 * Returns a formatted string for a given axis.
 * @param {Axis} A axis.
 * @returns {string}
 */
Ax.toString = (A:Axis) => `Axis(${A[0]},${A[1]},${A[2]})`;
Object.freeze(Ax);