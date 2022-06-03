/**
 * Creates a Vector3 containing the euler angles.
 * @param x rotation around x axis.
 * @param y rotation around y axis.
 * @param z rotation around z axis.
 * @returns {EulerRotation}
 */
const Euler = (x=0,y=0,z=0) => <EulerRotation>[x,y,z];
/**
 * Converts a given ZYX euler rotation to a quaternion.
 * @param {EulerRotation} E Euler rotation. 
 * @returns {Quaternion}
 */
Euler.toQuat = (E:EulerRotation): Quaternion => {
    const s1=Math.sin(E[0]*0.5), s2=Math.sin(E[1]*0.5), s3=Math.sin(E[2]*0.5),
          c1=Math.cos(E[0]*0.5), c2=Math.cos(E[1]*0.5), c3=Math.cos(E[2]*0.5);
    return [s1*c2*c3-c1*s2*s3, c1*s2*c3+s1*c2*s3, c1*c2*s3+s1*s2*c3, c1*c2*c3-s1*s2*s3];
} 
/** Roll/Pitch/Yaw angles. */
Euler.order = "ZXY";
Object.freeze(Euler.order);