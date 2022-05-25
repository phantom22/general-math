type Quaternion = [number,number,number,number];

function Quat(x:number, y:number, z:number, w:number): Quaternion {
    return [x,y,z,w];
}

Quat.dot = (a:Quaternion, b:Quaternion) => {
    return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3];
}