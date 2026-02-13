import React, { Suspense, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Model = () => {
  const { scene } = useGLTF('/model.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const meshRef = React.useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = (mesh.material as THREE.MeshStandardMaterial).clone();
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material) {
          material.metalness = 0.5;
          material.roughness = 0.3;
          meshRef.current = mesh;
        }
      }
    });
    clonedScene.scale.set(2, 2, 2);
    clonedScene.position.y = -1.9;
  }, [clonedScene]);

  useFrame((state) => {
    clonedScene.rotation.y += 0.01;

    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      const rotation = clonedScene.rotation.y % (Math.PI * 2);
      const normalizedRotation = rotation / (Math.PI * 2);

      const purpleColor = new THREE.Color('#a78bfa');
      const whiteColor = new THREE.Color('#ffffff');

      const blend = (Math.sin(normalizedRotation * Math.PI * 2) + 1) / 2;
      material.color.lerpColors(purpleColor, whiteColor, blend);
      material.emissive.lerpColors(new THREE.Color('#8b5cf6'), new THREE.Color('#ffffff'), blend);
    }
  });

  return <primitive object={clonedScene} />;
};

const Logo3D: React.FC = () => {
  return (
    <div className="w-10 h-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.9} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#a78bfa" />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#8b5cf6" />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Logo3D;
