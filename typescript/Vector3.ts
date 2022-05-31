/**
 * @module 
 * Creates a 3D vector.
 * @param {number} x first component.
 * @param {number} y second component.
 * @param {number} z third component.
 * @returns {Vector3}
 */
const  Vec3 = (x=0, y=0, z=0): Vector3 => [x,y,z];
/**
 * Returns a formatted string for a given Quaternion.
 * @param {Vector3} V vector3.
 * @returns {string}
 */
Vec3.toString = (V:Vector3) => `Vector3(${V[0]},${V[1]},${V[2]})`;
/** Shorthand for writing Vec3(0, 1, 0). */
Vec3.up = <Vector3>[0,1,0];
Object.freeze(Vec3.up);
/** Shorthand for writing Vec3(0, -1, 0). */
Vec3.down = <Vector3>[0,-1,0];
Object.freeze(Vec3.down);
/** Shorthand for writing Vec3(-1, 0, 0). */
Vec3.left = <Vector3>[-1,0,0];
Object.freeze(Vec3.left);
/** Shorthand for writing Vec3(1, 0, 0). */
Vec3.right = <Vector3>[1,0,0];
Object.freeze(Vec3.right);
/** Shorthand for writing Vec3(0, 0, 1). */
Vec3.forward = <Vector3>[0,0,1];
Object.freeze(Vec3.forward);
/** Shorthand for writing Vec3(0, 0, -1). */
Vec3.back = <Vector3>[0,0,-1];
Object.freeze(Vec3.back);
/** Shorthand for writing Vec3(1, 1, 1). */
Vec3.one = <Vector3>[1,1,1];
Object.freeze(Vec3.one);
/** Shorthand for writing Vec3(0, 0, 0). */
Vec3.zero = <Vector3>[0,0,0];
Object.freeze(Vec3.zero);
/**
 * Returns true if two vectors are exactly equal.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {boolean}
 */
Vec3.equals = (A:Vector3, B:Vector3) => A===B;
/**
 * Returns true if two vectors are approximately equal.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {boolean}
 */
Vec3.compare = (A:Vector3, B:Vector3) => A[0]===B[0] && A[1]===B[1] && A[2]===B[2];
/**
 * Returns true if any of the given vector components is not a number. 
 * @param {Vector3} V vector3.
 * @returns {boolean}
 */
Vec3.isNaN = (V:Vector3) => V[0]!==V[0] || V[1]!==V[1] || V[2]!==V[2];
/**
 * Returns a copy of a given vector with all its NANS replaced by a default value.
 * @param {Vector3} V vector3.
 * @param {number} [d=0] default value.
 * @returns {Vector3}
 */
Vec3.repair = (V:Vector3, d=0): Vector3 => [V[0]||d, V[1]||d, V[2]||d];
/**
 * Adds two vectors.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B. 
 * @returns {Vector3}
 */
Vec3.add = (A:Vector3, B:Vector3): Vector3 => [A[0]+B[0], A[1]+B[1], A[2]+B[2]];
/**
 * Subtracts one vector from another.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B. 
 * @returns {Vector3}
 */
Vec3.sub = (A:Vector3, B:Vector3): Vector3 => [A[0]-B[0], A[1]-B[1], A[2]-B[2]];
/**
 * Multiplies a vector by a number.
 * @param {Vector3} V vector3.
 * @param {number} s scalar. 
 * @returns {Vector3}
 */
Vec3.mul = (V:Vector3, s:number): Vector3 => [V[0]*s, V[1]*s, V[2]*s];
/**
 * Dot Product of two vectors.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B. 
 * @returns {number}
 */
Vec3.dot = (A:Vector3, B:Vector3) => A[0]*B[0]+A[1]*B[1]+A[2]*B[2];
/**
 * Multiplies two vectors component-wise.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B. 
 * @returns {number}
 */
Vec3.scale = (A:Vector3, B:Vector3): Vector3 => [A[0]*B[0], A[1]*B[1], A[2]*B[2]];
/**
 * Divides a vector by a number.
 * @param {Vector3} V vector3.
 * @param {number} s scalar. 
 * @returns {Vector3}
 */
Vec3.div = (V:Vector3, s:number): Vector3 => { const t=1/s; return [V[0]*t, V[1]*t, V[2]*t] };
/**
 * Returns the length of a given vector.
 * @param {Vector3} V vector3.
 * @returns {number}
 */
Vec3.magnitude = (V:Vector3) => (V[0]**2+V[1]**2+V[2]**2)**(1/2);
/**
 * Returns the squared length of a given vector.
 * @param {Vector3} V vector3.
 * @returns {number}
 */
Vec3.sqrMagnitude = (V:Vector3) => V[0]**2+V[1]**2+V[2]**2;
/**
 * Returns the given vector with a magnitude of 1.
 * @param {Vector3} V vector3.
 * @returns {Vector3}
 */
Vec3.normalize = (V:Vector3): Vector3 => { const t=1/Vec3.magnitude(V); return [V[0]*t, V[1]*t, V[2]*t] };
/**
 * Returns the distance between A and B.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B. 
 * @returns {number}
 */
Vec3.distance = (A:Vector3, B:Vector3) => ((A[0]-B[0])**2 + (A[1]-B[1])**2 + (A[2]-B[2])**2)**(1/2);
/**
 * Cross Product of two vectors.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @returns {Vector3}
 */
Vec3.cross = (A:Vector3, B:Vector3): Vector3 => [A[1]*B[2]-A[2]*B[1], A[0]*B[2]-A[2]*B[0], A[0]*B[1]-A[1]*B[0]];
/**
 * Gets the unsigned angle in degrees between A and B.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B. 
 * @returns {number}
 */
Vec3.angle = (A:Vector3, B:Vector3) => Math.acos(Vec3.dot(A,B) / (Vec3.magnitude(A) * Vec3.magnitude(B)));
/**
 * Returns a copy of a given vector with its components clamped to their respective constraints.
 * @param {Vector3} V vector3.
 * @param {Vector2} x min and max for the x component.
 * @param {Vector2} y min and max for the y component.
 * @param {Vector2} z min and max for the z component.
 * @returns {Vector3}
 */
Vec3.clamp = (V:Vector3, x:Vector2, y:Vector2, z:Vector2): Vector3 => [Math.clamp(V[0],...x), Math.clamp(V[1],...y), Math.clamp(V[2],...z)];
/**
 * Returns a copy of a given vector with its components clamped between min and max.
 * @param {Vector3} V vector3.
 * @param {number} min min value for both components.
 * @param {number} max max value for both components.
 * @returns {Vector3}
 */
Vec3.simpleClamp = (V:Vector3, min:number, max:number): Vector3 => [Math.clamp(V[0],min,max), Math.clamp(V[1],min,max), Math.clamp(V[2],min,max),];
/**
 * Returns a vector that is made from the largest components of all the passed vectors.
 * @param {Vector3[]} V 3d vectors.
 * @returns {Vector3}
 */
Vec3.max = (...V:Vector3[]) => { let o=V[0]; for (let i=0;i<V.length;i++) { o[0]=V[i][0]>o[0]?V[i][0]:o[0]; o[1]=V[i][1]>o[1]?V[i][1]:o[1]; o[2]=V[i][2]>o[2]?V[i][2]:o[2] } return o };
/**
 * Returns a vector that is made from the smallest components of all the passed vectors.
 * @param {Vector3[]} V 3d vectors.
 * @returns {Vector3}
 */
Vec3.min = (...V:Vector3[]) => { let o=V[0]; for (let i=0;i<V.length;i++) { o[0]=V[i][0]<o[0]?V[i][0]:o[0]; o[1]=V[i][1]<o[1]?V[i][1]:o[1]; o[2]=V[i][2]<o[2]?V[i][2]:o[2] } return o };
/**
 * Linearly interpolates between vectors A and B by t.
 * @param {Vector3} A vector3 A.
 * @param {Vector3} B vector3 B.
 * @param {number} t blend value between 0 and 1.
 * @returns {Vector3}
 */
Vec3.lerp = (A:Vector3, B:Vector3, t:number) => Vec3(Math.lerp(A[0],B[0],t), Math.lerp(A[1],B[1],t), Math.lerp(A[2],B[2],t));
/**
 * Converts a Vector3 to Vector2.
 * @param {Vector3} V vector3.
 * @returns {Vector2}
 */
Vec3.toVec2 = (V:Vector3): Vector2 => [V[0],V[1]];
/**
 * Converts a Vector3 to Vector4.
 * @param {Vector3} V vector3.
 * @returns {Vector4}
 */
Vec3.toVec4 = (V:Vector3): Vector4 => [...V,0];
Object.freeze(Vec3);
