function Axis(x=0,y=0,z=0) {
    return <Axis>Vec3.normalize([x,y,z]);
}
/**
 * Converts angle-axis to a rotation representation.
 * @param {Axis} ax axis.
 * @param {number} an angle. 
 * @returns {Quaternion}
 */
Axis.toQuat = (ax:Axis, an:number): Quaternion => {
    const hf=an/2, s=Math.sin(hf);
    return [ax[0]*s,ax[1]*s,ax[2]*s,Math.cos(hf)];

}