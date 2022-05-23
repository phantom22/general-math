/**
 * Helps to quickly check if a function converges or diverges.
 * @param {Function} mathFunction 
 * @param {number} start n=start
 * @param {number} end  final n val
 * @param  {...any} args args for the math function.
 * @returns 
 */
function summation(mathFunction, startX, endX, ...args) {
    let sum = 0;
    for (let x = startX; x < endX; x++) {
      sum += mathFunction(x, ...args);
    }
    return sum
  }
  
/**
 * quickly check f(x), by default will use a very high x value.
 * @param {Function} mathFunction
 * @param {number} x the value that will be used in the math function
 * @param  {...any} args additional args for the math function
 * @returns 
 */
function limit(mathFunction, x, ...args) {
  return mathFunction(x ?? 100000, ...args);
}

function factorial(n) {
  let sum=1;
  while (n > 0) {
    sum *= n;
    n--
  }
  return sum
}

const e = Math.E, 
  ln = Math.log, 
  sqrt = Math.sqrt, 
  pow = Math.pow, 
  abs = Math.abs, 
  sin = Math.sin, 
  cos = Math.cos, 
  tg = Math.tan, 
  asin = Math.asin, 
  acos = Math.acos, 
  sin2 = (x) => Math.sin(x) ** 2, 
  cos2 = (x) => Math.cos(x) ** 2, 
  pi = Math.PI;