/**
 * @module 
 * Creates a 4D vector.
 * @param {number} x first component.
 * @param {number} y second component.
 * @param {number} z third component.
 * @param {number} w third component.
 * @returns {Vector4}
 */
const Vec4 = (x=0,y=0,z=0,w=0): Vector4 => [x,y,z,w];
/**
 * Returns a formatted string for a given Quaternion.
 * @param {Vector4} V vector4.
 * @returns {string}
 */
Vec4.toString = (V:Vector4) => `Vector4(${V[0]},${V[1]},${V[2]},${V[3]})`;
/** Shorthand for writing Vec4(0, 1, 0, 0). */
Vec4.up = <Vector4>[0,1,0,0];
Object.freeze(Vec4.up);
/** Shorthand for writing Vec4(0, -1, 0, 0). */
Vec4.down = <Vector4>[0,-1,0,0];
Object.freeze(Vec4.down);
/** Shorthand for writing Vec4(-1, 0, 0, 0). */
Vec4.left = <Vector4>[-1,0,0,0];
Object.freeze(Vec4.left);
/** Shorthand for writing Vec4(1, 0, 0, 0). */
Vec4.right = <Vector4>[1,0,0,0];
Object.freeze(Vec4.right);
/** Shorthand for writing Vec4(0, 0, 1, 0). */
Vec4.forward = <Vector4>[0,0,1,0];
Object.freeze(Vec4.forward);
/** Shorthand for writing Vec4(0, 0, -1, 0). */
Vec4.back = <Vector4>[0,0,-1,0];
Object.freeze(Vec4.back);
/** Shorthand for writing Vec4(0, 0, 0, -1). */
Vec4.before = <Vector4>[0,0,0,-1];
Object.freeze(Vec4.before);
/** Shorthand for writing Vec4(0, 0, 0, 1). */
Vec4.after = <Vector4>[0,0,0,1];
Object.freeze(Vec4.after);
/** Shorthand for writing Vec4(1, 1, 1, 0). */
Vec4.one = <Vector4>[1,1,1,1];
Object.freeze(Vec4.one);
/** Shorthand for writing Vec4(0, 0, 0, 0). */
Vec4.zero = <Vector4>[0,0,0,0];
Object.freeze(Vec4.zero);
/**
 * Returns true if two vectors are exactly equal.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B.
 * @returns {boolean}
 */
Vec4.equals = (A:Vector4, B:Vector4) => A===B;
/**
 * Returns true if two vectors are approximately equal.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B.
 * @returns {boolean}
 */
Vec4.compare = (A:Vector4, B:Vector4) => A[0]===B[0] && A[1]===B[1] && A[2]===B[2] && A[3]===B[3];
/**
 * Returns true if any of the given vector components is not a number. 
 * @param {Vector4} V vector4.
 * @returns {boolean}
 */
Vec4.isNaN = (V:Vector4) => V[0]!==V[0] || V[1]!==V[1] || V[2]!==V[2] || V[3]!==V[3];
/**
 * Returns a copy of a given vector with all its NANS replaced by a default value.
 * @param {Vector4} V vector4.
 * @param {number} [d=0] default value.
 * @returns {Vector4}
 */
Vec4.repair = (V:Vector4, d=0): Vector4 => [V[0]||d, V[1]||d, V[2]||d, V[3]||d];
/**
 * Adds two vectors.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B. 
 * @returns {Vector4}
 */
Vec4.add = (A:Vector4, B:Vector4): Vector4 => [A[0]+B[0], A[1]+B[1], A[2]+B[2], A[3]+B[3]];
/**
 * Subtracts one vector from another.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B. 
 * @returns {Vector4}
 */
Vec4.sub = (A:Vector4, B:Vector4): Vector4 => [A[0]-B[0], A[1]-B[1], A[2]-B[2], A[3]-B[3]];
/**
 * Multiplies a vector by a number.
 * @param {Vector4} V vector4.
 * @param {number} s scalar. 
 * @returns {Vector4}
 */
Vec4.mul = (V:Vector4, s:number): Vector4 => [V[0]*s, V[1]*s, V[2]*s, V[3]*s];
/**
 * Dot Product of two vectors.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B. 
 * @returns {number}
 */
Vec4.dot = (A:Vector4, B:Vector4) => A[0]*B[0]+A[1]*B[1]+A[2]*B[2]+A[3]*B[3];
/**
 * Multiplies two vectors component-wise.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B. 
 * @returns {number}
 */
Vec4.scale = (A:Vector4, B:Vector4): Vector4 => [A[0]*B[0], A[1]*B[1], A[2]*B[2], A[3]*B[3]];
/**
 * Divides a vector by a number.
 * @param {Vector4} V vector4.
 * @param {number} s scalar. 
 * @returns {Vector3}
 */
Vec4.div = (V:Vector4, s:number): Vector4 => { const t=1/s; return [V[0]*t, V[1]*t, V[2]*t, V[3]*t] };
/**
 * Returns the length of a given vector.
 * @param {Vector4} V vector4.
 * @returns {number}
 */
Vec4.magnitude = (V:Vector4) => Math.hypot(V[0],V[1],V[2],V[3]);
/**
 * Returns the squared length of a given vector.
 * @param {Vector4} V vector4.
 * @returns {number}
 */
Vec4.sqrMagnitude = (V:Vector4) => V[0]**2+V[1]**2+V[2]**2+V[3]**2;
/**
 * Returns the given vector with a magnitude of 1.
 * @param {Vector4} V vector4.
 * @returns {Vector4}
 */
Vec4.normalize = (V:Vector4): Vector4 => { const t=1/Vec4.magnitude(V); return [V[0]*t, V[1]*t, V[2]*t, V[3]*t] };
/**
 * Returns the distance between A and B.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B. 
 * @returns {number}
 */
Vec4.distance = (A:Vector4, B:Vector4) => Math.hypot(A[0]-B[0],A[1]-B[1],A[2]-B[2],A[3]-B[3]);
/**
 * Gets the unsigned angle in radians between A and B.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B. 
 * @returns {number}
 */
Vec4.angle = (A:Vector4, B:Vector4) => Math.acos(Vec4.dot(A,B) / (Vec4.magnitude(A) * Vec4.magnitude(B)));
/**
 * Returns a copy of a given vector with its components clamped to their respective constraints.
 * @param {Vector4} V vector4.
 * @param {Vector2} x min and max for the x component.
 * @param {Vector2} y min and max for the y component.
 * @param {Vector2} z min and max for the z component.
 * @param {Vector2} w min and max for the w component.
 * @returns {Vector4}
 */
Vec4.clamp = (V:Vector4, x:Vector2, y:Vector2, z:Vector2, w:Vector2): Vector4 => [Utils.clamp(V[0],...x), Utils.clamp(V[1],...y), Utils.clamp(V[2],...z), Utils.clamp(V[3],...w)];
/**
 * Returns a copy of a given vector with its components clamped between min and max.
 * @param {Vector4} V vector4.
 * @param {number} min min value for both components.
 * @param {number} max max value for both components.
 * @returns {Vector4}
 */
Vec4.simpleClamp = (V:Vector4, min:number, max:number): Vector4 => [Utils.clamp(V[0],min,max), Utils.clamp(V[1],min,max), Utils.clamp(V[2],min,max), Utils.clamp(V[3],min,max)];
/**
 * Returns a vector that is made from the largest components of all the passed vectors.
 * @param {Vector4[]} V 4d vectors.
 * @returns {Vector4}
 */
Vec4.max = (...V:Vector4[]) => { let o=V[0]; for (let i=0;i<V.length;i++) { o[0]=V[i][0]>o[0]?V[i][0]:o[0]; o[1]=V[i][1]>o[1]?V[i][1]:o[1]; o[2]=V[i][2]>o[2]?V[i][2]:o[2]; o[3]=V[i][3]>o[3]?V[i][3]:o[3] } return o };
/**
 * Returns a vector that is made from the smallest components of all the passed vectors.
 * @param {Vector4[]} V 4d vectors.
 * @returns {Vector4}
 */
Vec4.min = (...V:Vector4[]) => { let o=V[0]; for (let i=0;i<V.length;i++) { o[0]=V[i][0]<o[0]?V[i][0]:o[0]; o[1]=V[i][1]<o[1]?V[i][1]:o[1]; o[2]=V[i][2]<o[2]?V[i][2]:o[2]; o[3]=V[i][3]<o[3]?V[i][3]:o[3]; } return o };
/**
 * Linearly interpolates between vectors A and B by t.
 * @param {Vector4} A vector4 A.
 * @param {Vector4} B vector4 B.
 * @param {number} t blend value between 0 and 1.
 * @returns {Vector4}
 */
Vec4.lerp = (A:Vector4, B:Vector4, t:number): Vector4 => [Utils.lerp(A[0],B[0],t), Utils.lerp(A[1],B[1],t), Utils.lerp(A[2],B[2],t), Utils.lerp(A[3],B[3],t)];
/**
 * Converts a Vector4 to Vector2.
 * @param {Vector4} V vector4.
 * @returns {Vector2}
 */
Vec4.toVec2 = (V:Vector4): Vector2 => [V[0],V[1]];
/**
 * Converts a Vector4 to Vector3.
 * @param {Vector4} V vector4.
 * @returns {Vector3}
 */
Vec4.toVec3 = (V:Vector4): Vector3 => [V[0],V[1],V[2]];
/**
 * Returns a copy of the vector with all of its components rounded to nearest integer.
 * @param {Vector4} V vector4. 
 * @returns {Vector4}
 */
Vec4.round = (V:Vector4): Vector4 => [Math.round(V[0]),Math.round(V[1]),Math.round(V[2]),Math.round(V[3])];
 /**
  * Returns a copy of the vector with all of its components rounded to the largest integer less than or equal to a given number.
  * @param {Vector4} V vector4. 
  * @returns {Vector4}
  */
Vec4.floor = (V:Vector4): Vector4 => [Math.floor(V[0]),Math.floor(V[1]),Math.floor(V[2]),Math.floor(V[3])];
 /**
  * Returns a copy of the vector with all of its components rounded to the largest integer higher than or equal to a given number.
  * @param {Vector4} V vector4. 
  * @returns {Vector4}
  */
Vec4.ceil = (V:Vector4): Vector4 => [Math.ceil(V[0]),Math.ceil(V[1]),Math.ceil(V[2]),Math.ceil(V[3])];
 /**
  * Returns a copy of the vector with all of its components converted to their absolute values.
  * @param {Vector4} V vector4. 
  * @returns {Vector4}
  */
Vec4.abs = (V:Vector4): Vector4 => [Math.abs(V[0]),Math.abs(V[1]),Math.abs(V[2]),Math.abs(V[3])];
Object.freeze(Vec3);
