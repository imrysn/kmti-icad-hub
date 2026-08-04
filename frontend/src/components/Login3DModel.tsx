import { OrbitControls, useGLTF, Center, Bounds } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';

// Using the optimized glb file as requested by the user
import hydraulicPipingModel from '../assets/hydraulic_piping-opt.glb';

function Model() {
  const { scene } = useGLTF(hydraulicPipingModel);
  return <primitive object={scene} />;
}

export const Login3DModel: React.FC = () => {
  return (
    <div
      className="login-background-canvas"
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Canvas camera={{ position: [5.5, 4.5, 6], fov: 42 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[10, 12, 8]} intensity={1.6} />
        <directionalLight position={[-10, 6, -8]} intensity={0.9} />
        <directionalLight position={[0, -8, 4]} intensity={0.45} />

        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.5}>
            <Center>
              <Model />
            </Center>
          </Bounds>
        </Suspense>

        <OrbitControls
          autoRotate
          autoRotateSpeed={0.25}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          makeDefault
        />
      </Canvas>
    </div>
  );
};
