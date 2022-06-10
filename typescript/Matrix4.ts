/**
 * @module
 * Creates a 4x4 matrix.
 * @returns {Matrix4}
 */
const Mat4 = (a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0): Matrix4 => [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p];
/**
 * Returns a formatted string for a given Matrix4.
 * @param {Matrix4} M matrix4.
 * @returns {string}
 */
Mat4.toString = (M:Matrix4) => `Matrix4(\n  ${M[0]},${M[1]},${M[2]},${M[3]},\n  ${M[4]},${M[5]},${M[6]},${M[7]},\n  ${M[8]},${M[9]},${M[10]},${M[11]},\n  ${M[12]},${M[13]},${M[14]},${M[15]}\n)`;
/** Identity matrix. */
Mat4.identity = <Matrix4>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
Object.freeze(Mat4.identity);
/** Matrix with all elements set to zero. */
Mat4.zero = <Matrix4>[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
Object.freeze(Mat4.zero);
/**
 * Returns the determinant of a given Matrix4.
 * @param {Matrix4} M matrix4.
 * @returns {number}
 */
Mat4.det = (M:Matrix4) => -M[12]*(M[9]*(M[2]*M[7]-M[3]*M[6])-M[10]*(M[1]*M[7]-M[3]*M[5])+M[11]*(M[1]*M[6]-M[2]*M[5]))+M[13]*(M[8]*(M[2]*M[7]-M[3]*M[6])-M[10]*(M[0]*M[7]-M[3]*M[4])+M[11]*(M[0]*M[6]-M[2]*M[4]))-M[14]*(M[8]*(M[1]*M[7]-M[3]*M[5])-M[9]*(M[0]*M[7]-M[3]*M[4])+M[11]*(M[0]*M[5]-M[1]*M[4]))+M[15]*(M[8]*(M[1]*M[6]-M[2]*M[5])-M[9]*(M[0]*M[6]-M[2]*M[4])+M[10]*(M[0]*M[5]-M[1]*M[4]))
/**
 * Returns the transpose of a given Matrix4.
 * @param {Matrix4} M matrix4. 
 * @returns {Matrix4}
 */
Mat4.transpose = (A:Matrix4): Matrix4 => [A[0],A[4],A[8],A[12],A[1],A[5],A[9],A[13],A[2],A[6],A[10],A[14],A[3],A[7],A[11],A[15]];
/**
 * Returns the inverse of a given Matrix4.
 * @param {Matrix4} M matrix4.
 * @returns {Matrix4}
 */
Mat4.invert = (M:Matrix4): Matrix4 => {
    let det = Mat4.det(M);
    if (det===0) return Mat4.zero;
    det = 1/det;
    const [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p] = M,
        d1=k*p-l*o, d2=j*p-l*n, d3=j*o-k*n, d4=g*p-h*o, d5=f*p-h*n, d6=f*o-g*n,d7=g*l-h*k, d8=f*l-h*j, d9=f*k-g*j, d10=i*p-l*m, d11=i*o-k*m, d12 =e*p-h*m,d13=e*o-g*m, d14=e*l-h*i, d15=e*k-g*i, d16=i*n-j*m, d17=e*n-f*m, d18=e*j-f*i;
        
    return [
        (f *d1-g*d2+h*d3)*det, (-b*d1+c*d2-d*d3)*det, (b*d4-c*d5+d*d6)*det, (-b*d7+c*d8-d*d9)*det,
        (-e*d1+g*d10-h*d11)*det, (a *d1-c*d10+d*d11)*det, (-a*d4+c*d12-d*d13)*det, (a *d7-c*d14+d*d15)*det,
        (e *d2-f*d10+h*d16)*det, (-a*d2+b*d10-d*d16)*det, (a *d5-b*d12+d*d17)*det, (-a*d8+b*d14-d*d18)*det,
        (-e*d3+f*d11-g*d16)*det, (a *d3-b*d11+c*d16)*det, (-a*d6+b*d13-c*d17)*det, (a *d9-b*d15+c*d18)*det
    ]
};
/**
 * Checks whether the given Matrix4 is an identity matrix.
 * @param {Matrix4} M matrix4.
 * @returns {boolean}
 */
Mat4.isIdentity = (M:Matrix4) => M[0]===1&&M[1]===0&&M[2]===0&&M[3]===0&&M[4]===0&&M[5]===1&&M[6]===0&&M[7]===0&&M[8]===0&&M[9]===0&&M[10]===1&&M[11]===0&&M[12]===0&&M[13]===0&&M[14]===0&&M[15]===1;
/**
 * Multiplies two matrices.
 * @param {Matrix4} A matrix4 A.
 * @param {Matrix4} B matrix4 B. 
 * @returns {Matrix4}
 */
Mat4.prod = (A:Matrix4, B:Matrix4): Matrix4 => {
    const [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p]=A,
          [$,_,C,D,E,F,G,H,I,J,K,L,M,N,O,P]=B;
    return [
        a*$+b*E+c*I+d*M, a*_+b*F+c*J+d*N, a*C+b*G+c*K+d*O, a*D+b*H+c*L+d*P,
        e*$+f*E+g*I+h*M, e*_+f*F+g*J+h*N, e*C+f*G+g*K+h*O, e*D+f*H+g*L+h*P,
        i*$+j*E+k*I+l*M, i*_+j*F+k*J+l*N, i*C+j*G+k*K+l*O, i*D+j*H+k*L+l*P,
        m*$+n*E+o*I+p*M, m*_+n*F+o*J+p*N, m*C+n*G+o*K+p*O, m*D+n*H+o*L+p*P,
    ]
}
/**
 * Creates a scaling Matrix4.
 * @param {Matrix4} M matrix4.
 * @param {Vector3} V Vector3.
 * @returns {Matrix4}
 */
Mat4.scale = (M:Matrix4, V:Vector3): Matrix4 => [M[0]*V[0],M[1]*V[0],M[2]*V[0],M[3]*V[0],M[4]*V[1],M[5]*V[1],M[6]*V[1],M[7]*V[1],M[8]*V[2],M[9]*V[2],M[10]*V[2],M[11]*V[2],M[12],M[13],M[14],M[15]];
/**
 * Get a column of the given Matrix4.
 * @param {Matrix4} M matrix4. 
 * @param {number} i column index.
 * @returns {Vector4}
 */
Mat4.getCol = (M:Matrix4, i:number): Vector4 => [M[i],M[4+i],M[8+i],M[12+i]];
 /**
  * Get a row of the given Matrix4.
  * @param {Matrix4} M matrix4. 
  * @param {number} i row index.
  * @returns {Vector4}
  */
Mat4.getRow = (M:Matrix4, i:number): Vector4 => {
    const offs = i*4;
    return [M[offs],M[offs+1],M[offs+2],M[offs+3]];
}
/**
 * Converts a Quaternion into a Matrix4.
 * @param {Vector3} p position. 
 * @param {Quaternion} Q quaternion. 
 * @param {Vector3} s scale.
 * @returns {Matrix4}
 */
Mat4.compose = (p:Vector3, Q:Quaternion, s:Vector3): Matrix4 => {
    const [x,y,z,w] = Q,
          xx=2*x**2, yy=2*y**2, zz=2*z**2,
          xy=2*x*y, wz=2*w*z, xz=2*x*z, wy=2*w*y, yz=2*y*z, wx=2*w*x,
          [sx,sy,sz] = s;
    return [
        (1-yy-zz)*sx, (xy+wz)*sx, (xz-wy)*sx, 0,
        (xy-wz)*sy, (1-xx-zz)*sy, (yz+wx)*sy, 0,
        (xz+wy)*sz, (yz-wx)*sz, (1-xx-yy)*sz, 0,
        ...p, 1
    ]
};
/**
 * Converts a rotation Matrix4 to ZXY Euler Angles (radians).
 * @param {Matrix4} M matrix4. 
 * @returns {EulerRotation}
 */
Mat4.toEuler = (M:Matrix4): EulerRotation => {
    const x = Math.asin(Utils.clamp(M[6],-1,1));
    return (Math.abs(M[6])<0.9999999) 
                ? [x,Math.atan2(-M[2],M[10]),Math.atan2(-M[4],M[5])]
                : [x,0,Math.atan2(M[1],M[0])];
}
/**
 * Converts a 4x4 matrix into a 3x3 one.
 * @param {Matrix4} M matrix4.
 * @returns {Matrix3}
 */
Mat4.toMat3 = (M:Matrix4): Matrix3 => [M[0],M[4],M[8],M[1],M[5],M[9],M[2],M[6],M[10]];
/**
 * Returns the normal matrix of a given Matrix4.
 * @param {Matrix4} M matrix4. 
 * @returns {Matrix3}
 */
Mat4.toNormalMat = (M:Matrix4): Matrix3 => Mat3.transpose(Mat3.invert(Mat4.toMat3(M)));
/**
 * Creates a Matrix4 from four row vectors.
 * @param {Vector4} a vector4.
 * @param {Vector4} b vector4.
 * @param {Vector4} c vector4.
 * @param {Vector4} d vector4.
 * @returns {Matrix4}
 */
Mat4.fromRows = (a=Vec4.zero, b=Vec4.zero, c=Vec4.zero, d=Vec4.zero): Matrix4 => Mat4(...a,...b,...c,...d);
/**
 * Creates a Matrix4 from four column vectors.
 * @param {Vector4} a vector4.
 * @param {Vector4} b vector4.
 * @param {Vector4} c vector4.
 * @param {Vector4} d vector4.
 * @returns {Matrix4}
 */
Mat4.fromCols = (a=Vec4.zero, b=Vec4.zero, c=Vec4.zero, d=Vec4.zero): Matrix4 => Mat4(a[0],b[0],c[0],d[0],a[1],b[1],c[1],d[1],a[2],b[2],c[2],d[2],a[3],b[3],c[3],d[3]);
Object.freeze(Mat4);