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
 * @param {Quaternion} B quaternion B.tt7uj
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
 * Converts a given quaternion to a ZYX euler rotation.
 * @param {Quaternion} Q Quaternion. 
 * @returns {EulerRotation}
 */
Quat.toEuler = (Q:Quaternion): EulerRotation => {
    const A = (Math.acos(Q[3]) * 2)/180*Math.PI,
          c = 1 - Math.cos(A),
          s1 = Math.sin(A)**2+Math.sin(A),
          s2 = Math.sin(A)**2-Math.sin(A);

    const y = Math.asin(Math.clamp((s2*(Q[0]*Q[2]-Q[2])),-1,1));
    
    return (Math.abs(y)<0.9999999) 
                ? [Math.atan2(s1*(Q[1]*Q[2]+Q[2]),1+(-(Q[0]**2)-(Q[1]**2))*c),y,Math.atan2(s1*(Q[0]*Q[1]-Q[2]),1+(-(Q[1]**2)-(Q[2]**2))*c)] 
                : [0,y,Math.atan2(-s2*(Q[0]*Q[1]-Q[2]),1+(-(Q[0]**2)-(Q[2]**2))*c)];
}
/**
 * Converts a quaternion into a rotation matrix4.
 * @param {Quaternion} Q quaternion. 
 * @returns {Matrix4}
 */
Quat.toMat4 = (Q:Quaternion): Matrix4 => {
    const [x,y,z,w] = Q,
          xx=2*x**2, yy=2*y**2, zz=2*z**2,
          xy=2*x*y, wz=2*w*z, xz=2*x*z, wy=2*w*y, yz=2*y*z, wx=2*w*x;
    return [
        (1-yy-zz), (xy+wz), (xz-wy), 0,
        (xy-wz), (1-xx-zz), (yz+wx), 0,
        (xz+wy), (yz-wx), (1-xx-yy), 0,
        0, 0, 0, 1
    ]
};
/**
 * Converts a quaternion into a rotation matrix3.
 * @param {Quaternion} Q quaternion. 
 * @returns {Matrix4}
 */
Quat.toMat3 = (Q:Quaternion): Matrix3 => {
    const [x,y,z,w] = Q,
          xx=2*x**2, yy=2*y**2, zz=2*z**2,
          xy=2*x*y, wz=2*w*z, xz=2*x*z, wy=2*w*y, yz=2*y*z, wx=2*w*x;

    return [
        (1-yy-zz), (xy-wz), (xz+wy),
        (xy+wz), (1-xx-zz), (yz-wx),
        (xz-wy), (yz+wx), (1-xx-yy)
    ]
};
/**
 * Converts a quaternion into ZXY euler angles.
 * @param {Quaternion} Q 
 * @returns {EulerRotation}
 */
Quat.toEuler = (Q:Quaternion): EulerRotation => Mat4.toEuler(Quat.toMat4(Q));
Object.freeze(Quat);