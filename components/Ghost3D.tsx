
import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Model = () => {
  const { scene } = useGLTF('/model.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material) {
          material.color = new THREE.Color('#a78bfa');
          material.emissive = new THREE.Color('#8b5cf6');
          material.emissiveIntensity = 0.3;
          material.metalness = 0.5;
          material.roughness = 0.3;
        }
      }
    });
    scene.scale.set(0.8, 0.8, 0.8);
    scene.position.y = -4;
  }, [scene]);

  return <primitive object={scene} />;
};

const Ghost3D: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} shadows>
        <ambientLight intensity={0.9} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#a78bfa" castShadow />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#8b5cf6" castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#ffffff" castShadow />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Ghost3D;
