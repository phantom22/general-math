// https://docs.unity3d.com/Packages/com.unity.tiny@0.13/rt/tiny_runtime/classes/_runtimefull_.utmath.matrix3.html
const Mat3 = (...v:number[]): Matrix3 => {
    const mat = <Matrix3>Array(9).fill(0);
    for (let i=0; i<Math.clamp(v.length,0,9); i++) {
        mat[i] = v[i];
    }
    return mat;
}

/**
 * Returns a formatted string for a given matrix.
 * @param {Matrix4} M matrix3.
 * @returns {string}
 */
Mat3.toString = (M:Matrix4) => `Matrix3(\n\t${M[0]},${M[1]},${M[2]},\n\t${M[3]},${M[4]},${M[5]},\n\t${M[6]},${M[7]},${M[8]}\n)`;
/** Identity matrix. */
Mat3.identity = <Matrix3>[1,0,0,0,1,0,0,0,1];
Object.freeze(Mat3.identity);
/** Matrix with all elements set to zero. */
Mat3.zero = <Matrix3>[0,0,0,0,0,0,0,0,0];
Object.freeze(Mat3.zero);
/**
 * Returns the determinant of a given matrix.
 * @param {Matrix3} M matrix3.
 * @returns {number}
 */
Mat3.det = (M:Matrix3) => M[6]*(M[1]*M[5]-M[2]*M[4])-M[7]*(M[0]*M[5]-M[2]*M[3])+M[8]*(M[0]*M[4]-M[1]*M[3]);
/**
 * Returns the transpose of a given matrix.
 * @param {Matrix3} M matrix3. 
 * @returns {Matrix3}
 */
Mat3.transpose = (M:Matrix3): Matrix3 => [M[0],M[3],M[6],M[1],M[4],M[7],M[2],M[5],M[8]];
/**
 * Returns the inverse of a given matrix.
 * @param {Matrix3} M matrix3.
 * @returns {Matrix3}
 */
Mat3.invert = (M:Matrix3): Matrix3 => {
    let det = Mat3.det(M);
    if (det===0) return Mat3.zero;
    det = 1/det;
    const [a,b,c,d,e,f,g,h,i] = M;
        
    return [
        e*f-h*i, -b*i+c*h, b*f-c*e,
        -d*i+f*g, a*i-c*g, -a*f+c*d,
        d*h-e*g, -a*h+b*g, a*e-b*d 
    ];
};
/**
 * Checks whether the given matrix is an identity matrix.
 * @param {Matrix3} M matrix3.
 * @returns {boolean}
 */
Mat3.isIdentity = (M:Matrix3) => M[0]===1&&M[1]===0&&M[2]===0&&M[3]===0&&M[4]===1&&M[5]===0&&M[6]===0&&M[7]===0&&M[8]===1;
/**
 * Multiplies two matrices.
 * @param {Matrix3} A matrix3 A.
 * @param {Matrix3} B matrix3 B. 
 * @returns {Matrix3}
 */
Mat3.prod = (A:Matrix3, B:Matrix3): Matrix3 => {
    const [a,b,c,d,e,f,g,h,i]=A,
          [$,_,C,D,E,F,G,H,I]=B;
    return [
        a*$+b*D+c*G, a*_+b*E+c*H, a*C+b*F+c*I,
        d*$+e*D+f*G, d*_+e*E+f*H, d*C+e*F+f*I,
        g*$+h*D+i*G, g*_+h*E+i*H, g*C+h*F+i*I,
    ];
}
/**
 * Creates a scaling matrix.
 * @param {Matrix3} M matrix3.
 * @param {Vector2} V vector2.
 * @returns {Matrix3}
 */
Mat3.scale = (M:Matrix3, V:Vector2) => [M[0]*V[0],M[1]*V[0],M[2]*V[0],M[3]*V[1],M[4]*V[1],M[5]*V[1],M[6],M[7],M[8]];
/**
 * Get a column of the given matrix.
 * @param {Matrix3} M matrix3. 
 * @param {number} i column index.
 * @returns {Vector3}
 */
Mat3.getCol = (M:Matrix3, i:number): Vector3 => [M[i],M[3+i],M[6+i]];
/**
 * Get a row of the given matrix.
 * @param {Matrix3} M matrix3. 
 * @param {number} i row index.
 * @returns {Vector3}
 */
Mat3.getRow = (M:Matrix4, i:number): Vector3 => {
    const offs = i*3;
    return [M[offs],M[offs+1],M[offs+2]];
}
/**
 * Returns the normal matrix of a given matrix.
 * @param {Matrix3} M matrix3. 
 * @returns {Matrix3}
 */
Mat3.toNormalMat = (M:Matrix3): Matrix3 => Mat3.transpose(Mat3.invert(M));
/**
 * Converts a rotation matrix3 to ZXY euler angles (radians).
 * @param {Matrix3} M rotation matrix3. 
 * @returns {EulerRotation}
 */
Mat3.toEuler = (M:Matrix3): EulerRotation => {
    const x = Math.asin(Math.clamp(M[7],-1,1));
    return (Math.abs(M[7])<0.9999999) 
                ? [x,Math.atan2(-M[6],M[8]),Math.atan2(-M[1],M[4])]
                : [x,0,Math.atan2(M[3],M[1])];
};
/**
 * Converts a 3x3 matrix into a 4x4 one.
 * @param {Matrix3} M matrix3. 
 * @returns {Matrix4}
 */
Mat3.toMat4 = (M:Matrix3): Matrix4 => [M[0],M[3],M[6],0,M[1],M[4],M[7],0,M[2],M[5],M[8],0,0,0,0,1];
Object.freeze(Mat3);