const Vec2 = (x, y) => {
    let o = [x, y];
    o.toString = () => `Vector2(${o[0]},${o[1]})`;
    return o;
};
Vec2.up = [0, 1];
Vec2.down = [0, -1];
Vec2.left = [-1, 0];
Vec2.right = [1, 0];
Vec2.one = [1, 1];
Vec2.zero = [0, 0];
Vec2.equals = (a, b) => a === b;
Vec2.compare = (a, b) => a[0] === b[0] && a[1] === b[1];
Vec2.isNaN = (v) => Number.isNaN(v[0]) || Number.isNaN(v[1]);
Vec2.repair = (v, d = 0) => [v[0] || d, v[1] || d];
Vec2.clone = (v) => [...v];
Vec2.add = (a, b) => [a[0] + b[0], a[1] + b[1]];
Vec2.sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
Vec2.mul = (v, s) => [v[0] * s, v[1] * s];
Vec2.dot = (a, b) => a[0] * b[0] + a[1] * b[1];
Vec2.scale = (a, b) => [a[0] * b[0], a[1] * b[1]];
Vec2.div = (v, s) => { const t = 1 / s; return [v[0] * t, v[1] * t]; };
Vec2.magnitude = (v) => (v[0] ** 2 + v[1] ** 2) ** (1 / 2);
Vec2.sqrMagnitude = (v) => v[0] ** 2 + v[1] ** 2;
Vec2.normalize = (v) => { const t = 1 / Vec2.magnitude(v); return [v[0] * t, v[1] * t]; };
Vec2.distance = (a, b) => ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) ** (1 / 2);
Vec2.angle = (a, b) => Math.acos(Vec2.dot(a, b) / (Vec2.magnitude(a) * Vec2.magnitude(b)));
Vec2.clamp = (v, x, y) => [Math.max(x[0], Math.min(v[0], x[1])), Math.max(y[0], Math.min(v[1], y[1]))];
Vec2.simpleClamp = (v, min, max) => [Math.max(min, Math.min(v[0], max)), Math.max(min, Math.min(v[1], max))];
Vec2.max = (...v) => { let o = v[0]; for (let i = 0; i < v.length; i++) {
    o[0] = v[i][0] > o[0] ? v[i][0] : o[0];
    o[1] = v[i][1] > o[1] ? v[i][1] : o[1];
} return o; };
Vec2.min = (...v) => { let o = v[0]; for (let i = 0; i < v.length; i++) {
    o[0] = v[i][0] < o[0] ? v[i][0] : o[0];
    o[1] = v[i][1] < o[1] ? v[i][1] : o[1];
} return o; };
Vec2.lerp = (a, b, t) => Vec2(a[0] * (1 - t) + b[0] * t, a[1] * (1 - t) + b[1] * t);
Object.freeze(Vec2);
