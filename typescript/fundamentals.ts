interface Math {
    factorial(n:number): number;
    clamp(v:number, min:number, max:number): number;
    lerp(a:number, b:number, t:number): number;
    lerpUnclamped(a:number, b:number, t:number): number;
}

Math.factorial = (n:number) => {
    let sum=1;
    while (n > 0) {
        sum *= n;
        n--
    }
    return sum
}

Math.clamp = (v:number, m:number, M:number) => Math.max(m, Math.min(v, M));
Math.lerp = (a:number, b:number, t:number) => { t=Math.clamp(t,0,1); return a*(1-t)+b*t };
Math.lerpUnclamped = (a:number, b:number, t:number) => a*(1-t)+b*t;