const Formatting = () => void 0;

Formatting.padStart = (s:string, targetLength:number, char:string) => {
    let t = "";
    for (let i=0; i<(targetLength-s.length); i++) {
        t += char;
    }
    return t + s;
}


Formatting.padEnd = (s:string, targetLength:number, char:string) => {
    let t = "";
    for (let i=0; i<(targetLength-s.length); i++) {
        t += char;
    }
    return s + t;
}

/**
 * Clamps the length of a string.
 * @param {string} s string to crop. 
 * @param {number} maxLength 
 * @returns
 */
Formatting.crop = (s:string, maxLength:number) => {
    maxLength = Math.max(maxLength,3);
    return s.length>maxLength ? s.slice(0,maxLength-3)+"..." : s;
}