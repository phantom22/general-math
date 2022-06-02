/**
 * Creates a quaternion.
 * @param {number} x first component.
 * @param {number} y second component.
 * @param {number} z third component.
 * @param {number} w forth component. 
 * @returns {Quaternion}
 */
const Quat = (x=0, y=0, z=0, w=1): Quaternion => [x,y,z,w];
/**
 * Returns a formatted string for a given Quaternion.
 * @param {Quaternion} Q Quaternion.
 * @returns {string}
 */
Quat.toString = (Q:Quaternion) => `Quaternion(${Q[0]},${Q[1]},${Q[2]},${Q[3]})`;
/**
 * The dot product between two rotations.
 * @param {Quaternion} A quaternion A.
 * @param {Quaternion} B quaternion B. 
 * @returns {number}
 */
Quat.dot = (A:Quaternion, B:Quaternion) => A[0]*B[0]+A[1]*B[1]+A[2]*B[2]+A[3]*B[3];
/**
 * Converts angle-axis to a rotation representation.
 * @param {Axis} ax axis.
 * @param {number} an angle. 
 * @returns {Quaternion}
 */
Quat.fromAngleAxis = (ax:Axis, an:number): Quaternion => {
    const hf=an/2, s=Math.sin(hf);
    return [ax[0]*s,ax[1]*s,ax[2]*s,Math.cos(hf)];

}
/** Identity rotation. */
Quat.identity = <Quaternion>[0,0,0,1];
Object.freeze(Quat.identity);
/**
 * Returns the angle in degrees between two rotations A and B.
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
Quat.prod = (A:Quaternion, B:Quaternion): Quaternion => [A[0]*B[3]+A[3]*B[0]+A[1]*B[2]-A[2]*B[1],A[1]*B[3]+A[3]*B[1]+A[2]*B[2]-A[0]*B[2],A[2]*B[3]+A[3]*B[2]+A[0]*B[1]-A[1]*B[0],A[3]*B[3]+A[0]*B[0]+A[1]*B[1]-A[2]*B[2]];
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
 * Returns the inverse of a given rotation.
 * @param {Quaternion} Q rotation.
 * @returns {Quaternion}
 */
Quat.inverse = (Q:Quaternion): Quaternion => { const m=1/Quat.sqrdMagnitude(Q); return [Q[0]*m,-Q[1]*m,-Q[2]*m,-Q[3]*m] };
/**
 * Converts a given quaternion to a ZXY euler rotation.
 * @param {Quaternion} Q Quaternion. 
 * @returns {EulerRotation}
 */
Quat.toEuler = (Q:Quaternion): EulerRotation => {
    const a = 2*(Q[3]*Q[0]+Q[1]*Q[2]),
          b = 1 - 2*(Q[0]**2+Q[1]**2),
          c = 2*(Q[3]*Q[1]-Q[2]*Q[0]),
          d = 2*(Q[3]*Q[2]+Q[0]*Q[1]),
          e = 1 - 2*(Q[1]**2+Q[2]**2);
    return [Math.atan2(a, b),Math.abs(c)>=1?Math.PI/2*Math.sign(c):Math.asin(c),Math.atan2(d,e)];
}
Object.freeze(Quat);