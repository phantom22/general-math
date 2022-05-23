

type Matrix = {
    dim: Vector2;
    mat: number[];
    toString(): string;
    get(x:number, y:number): number;
    set(x:number, y:number, v:number): void;
    submat(x:number, y:number): Matrix;
    isSquared(): boolean;
    det(): number;
    transpose(): Matrix;
    minors(): Matrix;
    cofactors(): Matrix;
    adjugate(): Matrix;
    inverse(): Matrix;
    round(): Matrix;
    ceil(): Matrix;
    floor(): Matrix;
}

function Mat(m:number, n:number, v=<number[]>[]) {
    const o=<Matrix>{};

    o.dim=<Vector2>[m,n];
    Object.freeze(o.dim);

    o.mat = Array(m*n).fill(0); // first fill all cells with 0
    for (let i=0; i<v.length; i++) {
        o.mat[i] = v[i];
    }

    o.toString = () => {
        let s=`Mat(${m},${n})`;
        return s;
    }
    o.get = (x:number, y:number) => o.mat[x*n+y];
    o.set = (x:number, y:number, v:number) => o.mat[x*n+y] = v;
    o.submat = (x:number, y:number) => {
        let v=[];
        for (let i=0; i<m*n; i++) {
            let row=Math.floor(i/n), col=i%n;
            if (x===row||y===col) continue;
            v.push(o.mat[row*n+col]);
        }
        return Mat(m-1,n-1,v)
    }
    o.isSquared = () => m===n;
    o.det = () => {
        if (!o.isSquared()) throw "Incompatible matrix!";
        else if (m===1) return o.mat[0]; // a
        else if (m===2) return o.mat[0]*o.mat[3]-o.mat[1]*o.mat[2]; // ad - bc
        else {
            let t = 0;
            for (let i=0; i<n; i++) {
                t += Math.pow(-1,i%2) * o.mat[i] * o.submat(0,i).det(); // first row [x=0, y=i]
            }
            return t;
        }
    }
    // https://en.wikipedia.org/wiki/Transpose
    o.transpose = () => {
        let r=[];
        for (let x=0; x<n; x++) {
            for (let y=0; y<m; y++) {
                r.push(o.mat[y*n+x]);
            }
        }
        return Mat(n,m,r);
    }
    o.minors = () => {
        let r=[];
        for (let x=0; x<m; x++) {
            for (let y=0; y<n; y++) {
                r.push(o.submat(x,y).det());
            }
        }
        return Mat(m,n,r);
    }
    // https://www.cuemath.com/algebra/cofactor-matrix/
    // ovvero Aij * (-1)**(i+j)
    // cioè cambiare solo i segni degli elementi dispari
    o.cofactors = () => {
        const b = o.minors();
        for (let x=0; x<n; x++) {
            for (let y=0; y<m; y++) {
                b.mat[x*n+y] *= (x+y)%2===0?1:-1;
            }
        }
        return b;
    }
    // https://en.wikipedia.org/wiki/Adjugate_matrix
    o.adjugate = () => {
        // 1. minors matrix
        // 2. Mat.cofactor(minors matrix)
        const b = o.cofactors();
        // invert diagonal ?????
        return b.transpose();
        // 3. Mat.transpose(cofactos matrix)
    }
    // https://www.youtube.com/watch?v=kWorj5BBy9k
    o.inverse = () => {
        const det = o.det(), t = o.adjugate();
        if (det===0) throw "Matrix has null determinant!";
        return Mat.mul(t, 1/det); // qualcosa non va (segno)
    }
    o.round = () => {
        for (let i=0; i<o.mat.length; i++) {
            o.mat[i] = Math.round(o.mat[i]);
        }
        return o;
    };
    o.ceil = () => {
        for (let i=0; i<o.mat.length; i++) {
            o.mat[i] = Math.ceil(o.mat[i]);
        }
        return o;
    };
    o.floor = () => {
        for (let i=0; i<o.mat.length; i++) {
            o.mat[i] = Math.floor(o.mat[i]);
        }
        return o;
    };
    Object.freeze(o);
    return o;
}
Mat.identity = (n:number) => {
    let o=[];
    for (let i=0; i<n*n; i++) {
        o.push(i%(n+1)===0?1:0);
    }
    return Mat(n,n,o);
}
Mat.equalDims = (a,b) => a.dim[0]!==b.dim[0]||a.dim[1]!==b.dim[1];

Mat.sum = (a:Matrix, b:Matrix) => {
    if (!Mat.equalDims(a,b))throw "Incompatible matrices!";
    const l=a.dim[0]*a.dim[1];
    let o=[];
    for (let i=0; i<l; i++) {
        o[i] = a.mat[i] + b.mat[i]; // o.push
    }
    return Mat(...a.dim, o);
}
Mat.sub = (a:Matrix, b:Matrix) => {
    if (!Mat.equalDims(a,b))throw "Incompatible matrices!";
    let o=[];
    for (let i=0; i<a.mat.length; i++) {
        o.push(a.mat[i] - b.mat[i]);
    }
    return Mat(...a.dim, o);
}
Mat.mul = (a:Matrix, s:number) => {
    let o=[];
    for (let i=0; i<a.mat.length; i++) {
        o.push(a.mat[i] * s);
    }
    return Mat(...a.dim, o);
}
Mat.prod = (a:Matrix, b:Matrix) => {
    const [m1,n1] = a.dim,
          [m2,n2] = b.dim;
    if (n1!==m2)throw "Incompatible matrices!";
    let o=[];
    for (let x=0, z=0; x<m1; x++) {
        let sum=0;
        for (let y=0; y<n1; y++) {
            sum+=a.mat[x*n1+y]*b.mat[y*n2+z];
        }
        o.push(sum);
        if (z<n2-1) {
            z++;
            x--;
        }
        else z=0;
    }
    return Mat(m1,n2,o);
}

const x=Mat(3,2,[
    0, 1, 
    2, 3, 
    4, 5
])
const y=Mat(4,4,[
    1, 2, 3, 4,
    5, 6, 10, 8,
    9, 10, 11, 12,
    13, 14, 15, 0
])
const z=Mat(3,3,[
    12, 13, 2,
    14, 15, 2,
    1, 2, 5
])
const w=Mat(2,2,[
    -7.5, 6.5,
    7, -6
])
//const test = Mat.inverse(y)