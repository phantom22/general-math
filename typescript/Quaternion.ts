type Quaternion = [number,number,number,number];

/**
 * Creates an immutable quaternion.
 * @param {Vector3} v vector. 
 * @returns {Quaternion}
 */
function Quat(x=0, y=0, z=0, w=1): Quaternion {
    const o=<Quaternion>[x,y,z,w];
    Object.freeze(o);
    return o;
}
/**
 * The dot product between two rotations.
 * @param {Quaternion} A quaternion A.
 * @param {Quaternion} B quaternion B. 
 * @returns {number}
 */
Quat.dot = (A:Quaternion, B:Quaternion) => {
    return A[0]*B[0]+A[1]*B[1]+A[2]*B[2]+A[3]*B[3];
}
/**
 * Converts angle-axis to a rotation representation.
 * @param {Vector3} axis 
 * @param {number} angle 
 * @returns {Quaternion}
 */
Quat.fromAngleAxis = (axis:Vector3, angle:number) => {
    const hf=angle/2, s=Math.sin(hf);
    return Quat(axis[0]*s,axis[1]*s,axis[2]*s,Math.cos(hf));

}
/**
 * Identity rotation.
 */
Quat.identity = Quat(0,0,0,1);
/**
 * Returns the angle in degrees between two rotations a and b.
 * @param {Quaternion} A rotation A.
 * @param {Quaternion} B rotation B. 
 * @returns {number}
 */
Quat.angle = (A:Quaternion, B:Quaternion) => 2*Math.acos(Math.abs(Math.clamp(Quat.dot(A,B),-1,1)));
/**
 * Combines rotations A and B.
 * @param {Quaternion} A rotation A. 
 * @param {Quaternion} B rotation B.
 * @returns {Quaternion} 
 */
Quat.prod = (A:Quaternion, B:Quaternion) => Quat(A[0]*B[3]+A[3]*B[0]+A[1]*B[2]-A[2]*B[1],A[1]*B[3]+A[3]*B[1]+A[2]*B[2]-A[0]*B[2],A[2]*B[3]+A[3]*B[2]+A[0]*B[1]-A[1]*B[0],A[3]*B[3]+A[0]*B[0]+A[1]*B[1]-A[2]*B[2]);
/**
 * Returns true if two quaternions are exactly equal.
 * @param {Quaternion} A quaternion A. 
 * @param {Quaternion} B quaternion B.
 * @returns {boolean} 
 */
Quat.equals = (A:Quaternion, B:Quaternion) => A===B;
/**
 * Returns true if two quaternions are approximately equal.
 * @param {Quaternion} A quaternion A. 
 * @param {Quaternion} B quaternion B.
 * @returns {boolean} 
 */
Quat.compare = (A:Quaternion, B:Quaternion) => A[0]===B[0]&&A[1]===B[1]&&A[2]===B[2]&&A[3]===B[3];
/**
 * Returns the length of a given quaternion.
 * @param {Quaternion} Q quaternion. 
 * @returns {number}
 */
Quat.magnitude = (Q:Quaternion) => (Q[0]**2+Q[1]**2+Q[2]**2+Q[3]**2)**(0.5);
/**
 * Returns the squared length of a given quaternion.
 * @param {Quaternion} Q quaternion. 
 * @returns {number}
 */
Quat.sqrdMagnitude = (Q:Quaternion) => Q[0]**2+Q[1]**2+Q[2]**2+Q[3]**2;
/**
 * Returns the Inverse of a given rotation.
 * @param {Quaternion} Q rotation.
 * @returns {Quaternion}
 */
Quat.inverse = (Q:Quaternion) => { const m=1/Quat.sqrdMagnitude(Q); const q=[Q[0]*m,-Q[1]*m,-Q[2]*m,-Q[3]*m]; Object.freeze(q); return q };
Object.freeze(Quat);