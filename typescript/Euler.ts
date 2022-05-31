function Euler(x=0,y=0,z=0) {
    return <EulerRotation>[x,y,z];
}

Euler.fromRotationMat = () => 1;
/** Roll/Pitch/Yaw angles. */
Euler.order = "ZXY";
Object.freeze(Euler.order);