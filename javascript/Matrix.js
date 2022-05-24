function Mat(m, n, v = []) {
    const o = {};
    o.dim = [m, n];
    const length = m * n;
    Object.freeze(o.dim);
    o.mat = Array(length).fill(0); // first fill all cells with 0
    for (let i = 0; i < v.length; i++) {
        o.mat[i] = v[i];
    }
    o.toString = () => {
        let s = `Mat(${m},${n})`;
        return s;
    };
    o.clone = () => Mat(m, n, o.mat);
    o.get = (x, y) => o.mat[x * n + y];
    o.set = (x, y, v) => o.mat[x * n + y] = v;
    o.submat = (x, y) => {
        let r = [];
        for (let a = 0; a < m; a++) { // rows
            for (let b = 0; b < n; b++) { // cols
                if (a !== x && b !== y)
                    r.push(o.mat[a * n + b]);
            }
        }
        return Mat(m - 1, n - 1, r);
    };
    o.isSquare = m === n;
    o.extract = (newDim, sel) => {
        let r = [];
        for (let i = 0; i < sel.length; i++) {
            r.push(o.mat[i]);
        }
        return Mat(...newDim, r);
    };
    o.sec2sel = (...sec) => {
        let r = [];
        for (let i = 0; i < sec.length; i++) {
            const { start, dim } = sec[i];
            for (let x = 0; x < dim[0]; x++) {
                for (let y = 0; y < dim[1]; y++) {
                    r.push((start[1] + y) * n + (start[0] + x));
                }
            }
        }
        return r;
    };
    o.sel2mat = (newDim, sel) => {
        let r = [];
        for (let i = 0; i < sel.length; i++) {
            r.push(o.mat[sel[i]]);
        }
        return Mat(...newDim, r);
    };
    o.squareSubmats = (order) => {
        let r = [];
        if (!order || order > m || order > n)
            throw "Invalid sub-matrix order!";
        const subX = m - order + 1, subY = n - order + 1;
        for (let x = 0; x < subX; x++) {
            for (let y = 0; y < subY; y++) {
                r.push(o.sec2sel({ start: [x, y], dim: [order, order] }));
            }
        }
        return r;
    };
    o.kroneckerMats = (sel) => {
        let r = [];
        // ...
        return r;
    };
    o.contains = (a) => {
        let r = true;
        for (let x = 0; x < n; x++) {
            for (let y = 0; y < m; y++) {
            }
        }
        return r;
    };
    o.isNull = () => {
        let f = true;
        for (let i = 0; i < length; i++) {
            if (o.mat[i] !== 0) {
                f = false;
                break;
            }
        }
        return f;
    };
    o.det = () => {
        if (!o.isSquare)
            throw "Incompatible matrix!";
        else if (m === 1)
            return o.mat[0]; // a
        else if (m === 2)
            return o.mat[0] * o.mat[3] - o.mat[1] * o.mat[2]; // ad - bc
        else {
            let t = 0;
            for (let i = 0; i < n; i++) {
                t += Math.pow(-1, i % 2) * o.mat[i] * o.submat(0, i).det(); // first row [x=0, y=i]
            }
            return t;
        }
    };
    o.rank = () => {
        if (o.isNull())
            return 0;
        else {
            let rk = Math.min(m, n);
            for (let i = rk; i > 0; i--) {
                const subs = o.squareSubmats(rk);
                let validMats = []; // all mats of order n, with det !== 0
                for (let j = 0; j < subs.length; j++) {
                    if (o.sel2mat([rk, rk], subs[j]).det() !== 0) {
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
    o.transpose = () => {
        let r = [];
        for (let x = 0; x < n; x++) {
            for (let y = 0; y < m; y++) {
                r.push(o.mat[y * n + x]);
            }
        }
        return Mat(n, m, r);
    };
    o.minors = () => {
        let r = [];
        for (let x = 0; x < m; x++) {
            for (let y = 0; y < n; y++) {
                r.push(o.submat(x, y).det());
            }
        }
        return Mat(m, n, r);
    };
    o.cofactors = () => {
        const r = [];
        for (let x = 0; x < n; x++) {
            for (let y = 0; y < m; y++) {
                r.push(o.mat[x * n + y] * ((x + y) % 2 === 0 ? 1 : -1));
            }
        }
        return Mat(m, n, r);
    };
    o.adjugate = () => {
        return o.minors().cofactors().transpose();
    };
    o.inverse = () => {
        const det = o.det(), t = o.adjugate();
        if (det === 0)
            throw "Matrix has null determinant!";
        return Mat.mul(t, 1 / det);
    };
    o.round = () => {
        let r = [];
        for (let i = 0; i < length; i++) {
            r.push(Math.round(o.mat[i]));
        }
        return Mat(m, n, r);
    };
    o.ceil = () => {
        let r = [];
        for (let i = 0; i < length; i++) {
            r.push(Math.ceil(o.mat[i]));
        }
        return Mat(m, n, r);
    };
    o.floor = () => {
        let r = [];
        for (let i = 0; i < length; i++) {
            r.push(Math.floor(o.mat[i]));
        }
        return Mat(m, n, r);
    };
    Object.freeze(o);
    return o;
}
Mat.identity = (n) => {
    let o = [];
    for (let i = 0; i < n * n; i++) {
        o.push(i % (n + 1) === 0 ? 1 : 0);
    }
    return Mat(n, n, o);
};
Mat.equalDims = (a, b) => a.dim[0] !== b.dim[0] || a.dim[1] !== b.dim[1];
Mat.sum = (a, b) => {
    if (!Mat.equalDims(a, b))
        throw "Incompatible matrices!";
    const l = a.dim[0] * a.dim[1];
    let o = [];
    for (let i = 0; i < l; i++) {
        o[i] = a.mat[i] + b.mat[i]; // o.push
    }
    return Mat(...a.dim, o);
};
Mat.sub = (a, b) => {
    if (!Mat.equalDims(a, b))
        throw "Incompatible matrices!";
    let o = [];
    for (let i = 0; i < a.mat.length; i++) {
        o.push(a.mat[i] - b.mat[i]);
    }
    return Mat(...a.dim, o);
};
Mat.mul = (a, s) => {
    let o = [];
    for (let i = 0; i < a.mat.length; i++) {
        o.push(a.mat[i] * s);
    }
    return Mat(...a.dim, o);
};
Mat.prod = (a, b) => {
    const [m1, n1] = a.dim, [m2, n2] = b.dim;
    if (n1 !== m2)
        throw "Incompatible matrices!";
    let o = [];
    for (let x = 0, z = 0; x < m1; x++) {
        let sum = 0;
        for (let y = 0; y < n1; y++) {
            sum += a.mat[x * n1 + y] * b.mat[y * n2 + z];
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
