Math.factorial = (n) => {
    let sum = 1;
    while (n > 0) {
        sum *= n;
        n--;
    }
    return sum;
};
Math.clamp = (v, m, M) => Math.max(m, Math.min(v, M));
Math.lerp = (a, b, t) => { t = Math.clamp(t, 0, 1); return a * (1 - t) + b * t; };
Math.lerpUnclamped = (a, b, t) => a * (1 - t) + b * t;
