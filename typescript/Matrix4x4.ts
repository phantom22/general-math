type Matrix4x4 = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
]

function Mat4x4(...v:number[]) {
    const mat = <Matrix4x4>Array(16).fill(0);

    if (v.length > 16) throw "Too many values!";
    for (let i=0; i<v.length; i++) {
        mat[i] = v[i];
    }
    Object.freeze(mat);
    return mat;
}

Mat4x4.identity = () => Mat4x4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
Mat4x4.zero = () => Mat4x4();
Mat4x4.det = (A:Matrix4x4) => -A[12]*(A[9]*(A[2]*A[7]-A[3]*A[6])-A[10]*(A[1]*A[7]-A[3]*A[5])+A[11]*(A[1]*A[6]-A[2]*A[5]))+A[13]*(A[8]*(A[2]*A[7]-A[3]*A[6])-A[10]*(A[0]*A[7]-A[3]*A[4])+A[11]*(A[0]*A[6]-A[2]*A[4]))-A[14]*(A[8]*(A[1]*A[7]-A[3]*A[5])-A[9]*(A[0]*A[7]-A[3]*A[4])+A[11]*(A[0]*A[5]-A[1]*A[4]))+A[15]*(A[8]*(A[1]*A[6]-A[2]*A[5])-A[9]*(A[0]*A[6]-A[2]*A[4])+A[10]*(A[0]*A[5]-A[1]*A[4]))
Mat4x4.transpose = (A:Matrix4x4) => Mat4x4(A[0],A[4],A[8],A[12],A[1],A[5],A[9],A[13],A[2],A[6],A[10],A[14],A[3],A[7],A[11],A[15]);
Mat4x4.inverse = (A:Matrix4x4) => 0;
Mat4x4.isIdentity = (A:Matrix4x4) => false;