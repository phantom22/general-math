function Mat(m, n, v = []) {
    const o = {};
    o.dim = [m, n];
    Object.freeze(o.dim);
    o.mat = Array(m * n).fill(0); // first fill all cells with 0
    if (v.length > m * n)
        throw "The number of provided values exceeds the matrix capacity!";
    for (let i = 0; i < v.length; i++) {
        o.mat[i] = v[i];
    }
    Object.freeze(o.mat);
    o.toString = () => {
        let r = [];
        for (let i = 0; i < o.mat.length; i += n) {
            r.push("  " + o.mat.slice(i, i + n).join(" "));
        }
        return `Mat(${o.dim.join(",")})\n${r.join("\n")}`;
    };
    o.contains = (A) => {
        let r = true;
        const [m, n] = A.dim;
        for (let x = 0; x < n; x++) {
            for (let y = 0; y < m; y++) {
            }
        }
        return r;
    };
    Object.freeze(o);
    return o;
}
Mat.equals = (A, B) => A === B;
Mat.compare = (A, B) => {
    let eq = true;
    for (let i = 0; i < A.mat.length; i++) {
        if (A.mat[i] !== B.mat[i]) {
            eq = false;
            break;
        }
    }
    return eq;
};
Mat.equalDims = (A, B) => A.dim[0] === B.dim[0] && A.dim[1] === B.dim[1];
Mat.isNull = (A) => {
    let f = true;
    for (let i = 0; i < length; i++) {
        if (A.mat[i] !== 0) {
            f = false;
            break;
        }
    }
    return f;
};
Mat.isSquare = (A) => A.dim[0] === A.dim[1];
Mat.identity = (n) => {
    let o = [];
    for (let i = 0; i < n * n; i++) {
        o.push(i % (n + 1) === 0 ? 1 : 0);
    }
    return Mat(n, n, o);
};
Mat.add = (A, B) => {
    if (!Mat.equalDims(A, B))
        throw "Incompatible matrices!";
    const l = A.dim[0] * A.dim[1];
    let o = [];
    for (let i = 0; i < l; i++) {
        o[i] = A.mat[i] + B.mat[i]; // o.push
    }
    return Mat(...A.dim, o);
};
Mat.sub = (A, B) => {
    if (!Mat.equalDims(A, B))
        throw "Incompatible matrices!";
    let o = [];
    for (let i = 0; i < A.mat.length; i++) {
        o.push(A.mat[i] - B.mat[i]);
    }
    return Mat(...A.dim, o);
};
Mat.mul = (A, s) => {
    let o = [];
    for (let i = 0; i < A.mat.length; i++) {
        o.push(A.mat[i] * s);
    }
    return Mat(...A.dim, o);
};
Mat.prod = (A, B) => {
    const [m1, n1] = A.dim, [m2, n2] = B.dim;
    if (n1 !== m2)
        throw "Incompatible matrices!";
    let o = [];
    for (let x = 0, z = 0; x < m1; x++) {
        let sum = 0;
        for (let y = 0; y < n1; y++) {
            sum += A.mat[x * n1 + y] * B.mat[y * n2 + z];
        }
        o.push(sum);
        if (z < n2 - 1) {
            z++;
            x--;
        }
        else
            z = 0;
    }
    return Mat(m1, n2, o);
};
Mat.submat = (A, cell) => {
    let r = [];
    const [m, n] = A.dim;
    for (let y = 0; y < m; y++) { // rows
        for (let x = 0; x < n; x++) { // cols
            if (y !== cell[0] && x !== cell[1])
                r.push(A.mat[y * n + x]);
        }
    }
    return Mat(m - 1, n - 1, r);
};
Mat.sec2sel = (A, ...sec) => {
    let r = [];
    for (let i = 0; i < sec.length; i++) {
        const { start, dim } = sec[i];
        for (let y = 0; y < dim[0]; y++) {
            for (let x = 0; x < dim[1]; x++) {
                r.push((start[1] + y) * A.dim[1] + (start[0] + x));
            }
        }
    }
    return r;
};
Mat.sel2mat = (A, newDim, sel) => {
    let r = [];
    for (let i = 0; i < sel.length; i++) {
        r.push(A.mat[sel[i]]);
    }
    return Mat(...newDim, r);
};
Mat.squareSubmats = (A, order) => {
    let r = [];
    const [m, n] = A.dim;
    if (!order || order > m || order > n)
        throw "Invalid sub-matrix order!";
    const subY = m - order + 1, subX = n - order + 1;
    for (let x = 0; x < subY; x++) {
        for (let y = 0; y < subX; y++) {
            r.push(Mat.sec2sel(A, { start: [x, y], dim: [order, order] }));
        }
    }
    return r;
};
Mat.kroneckerMats = (sel) => {
    let r = [];
    // ...
    return r;
};
Mat.det = (A) => {
    const m = A.dim[0];
    if (!Mat.isSquare(A))
        throw "Incompatible matrix!";
    else if (m === 0)
        return 1;
    else if (m === 1)
        return A.mat[0]; // A
    else if (m === 2)
        return A.mat[0] * A.mat[3] - A.mat[1] * A.mat[2]; // ad - bc
    else {
        let t = 0;
        for (let i = 0; i < A.dim[1]; i++) {
            t += Math.pow(-1, i % 2) * A.mat[i] * Mat.det(Mat.submat(A, [0, i])); // first row [x=0, y=i]
        }
        return t;
    }
};
Mat.rank = (A) => {
    if (Mat.isNull(A))
        return 0;
    else {
        let rk = Math.min(...A.dim);
        for (let i = rk; i > 0; i--) {
            const subs = Mat.squareSubmats(A, rk);
            let validMats = []; // all mats of order n, with det !== 0
            for (let j = 0; j < subs.length; j++) {
                if (Mat.det(Mat.sel2mat(A, [rk, rk], subs[j])) !== 0) {
                    validMats.push(subs[j]);
                }
            }
            for (let j = 0; j < validMats.length; j++) {
                // const allSquareMats = o.kroneckerMats();
                // foreach, if allSquareMats[i].det() !== 0 => return rk;
            }
        }
    }
};
Mat.transpose = (A) => {
    let r = [];
    const [m, n] = A.dim;
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
            r.push(A.mat[y * n + x]);
        }
    }
    return Mat(n, m, r);
};
Mat.minors = (A) => {
    let r = [];
    for (let x = 0; x < A.dim[0]; x++) {
        for (let y = 0; y < A.dim[1]; y++) {
            r.push(Mat.det(Mat.submat(A, [x, y])));
        }
    }
    return Mat(...A.dim, r);
};
Mat.cofactors = (A) => {
    const r = [];
    const [m, n] = A.dim;
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
            r.push(A.mat[x * n + y] * ((x + y) % 2 === 0 ? 1 : -1));
        }
    }
    return Mat(m, n, r);
};
Mat.adjugate = (A) => {
    return Mat.transpose(Mat.cofactors(Mat.minors(A)));
};
Mat.inverse = (A) => {
    const det = Mat.det(A), t = Mat.adjugate(A);
    if (det === 0)
        throw "Matrix has null determinant!";
    return Mat.mul(t, 1 / det);
};
Mat.round = (A) => {
    let r = [];
    for (let i = 0; i < length; i++) {
        r.push(Math.round(A.mat[i]));
    }
    return Mat(...A.dim, r);
};
Mat.ceil = (A) => {
    let r = [];
    for (let i = 0; i < length; i++) {
        r.push(Math.ceil(A.mat[i]));
    }
    return Mat(...A.dim, r);
};
Mat.floor = (A) => {
    let r = [];
    for (let i = 0; i < length; i++) {
        r.push(Math.floor(A.mat[i]));
    }
    return Mat(...A.dim, r);
};
