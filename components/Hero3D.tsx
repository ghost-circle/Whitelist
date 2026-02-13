import React, { Suspense, useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

let globalColor = new THREE.Color('#ffffff');
let targetColor = new THREE.Color('#ffffff');

window.addEventListener('mouseover', (e) => {
  const target = e.target as HTMLElement;
  const computedStyle = window.getComputedStyle(target);
  const color = computedStyle.color;
  const backgroundColor = computedStyle.backgroundColor;
  
  if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
    targetColor.set(color);
  } else if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent' && backgroundColor !== 'rgba(0, 0, 0, 1)') {
    targetColor.set(backgroundColor);
  }
});

const Lightning = () => {
  const lightningRef = useRef<THREE.Group>(null!);
  const linesRef = useRef<THREE.Line[]>([]);

  const createBolt = () => {
    const points: THREE.Vector3[] = [];
    let x = (Math.random() - 0.5) * 3;
    let y = 4;
    const targetX = (Math.random() - 0.5) * 1.5;
    const targetY = -2;
    const segments = 12;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const px = x + (targetX - x) * t + (Math.random() - 0.5) * 0.8 * (1 - t);
      const py = y + (targetY - y) * t;
      const pz = (Math.random() - 0.5) * 0.5;
      points.push(new THREE.Vector3(px, py, pz));
    }

    return points;
  };

  useFrame((state) => {
    if (!lightningRef.current) return;

    while (lightningRef.current.children.length > 0) {
      const child = lightningRef.current.children[0];
      lightningRef.current.remove(child);
      if ((child as THREE.Line).geometry) (child as THREE.Line).geometry.dispose();
      if ((child as THREE.Line).material) ((child as THREE.Line).material as THREE.Material).dispose();
    }

    if (Math.random() < 0.08) {
      const numBolts = Math.random() < 0.3 ? 3 : 1;
      for (let b = 0; b < numBolts; b++) {
        const points = createBolt();
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color('#a855f7'),
          transparent: true,
          opacity: 0.6 + Math.random() * 0.4,
          linewidth: 2,
        });
        const line = new THREE.Line(geometry, material);
        lightningRef.current.add(line);

        if (Math.random() < 0.5) {
          const branchStart = Math.floor(Math.random() * 6) + 3;
          const branchPoints: THREE.Vector3[] = [];
          const startPoint = points[branchStart];
          branchPoints.push(startPoint.clone());
          for (let i = 1; i <= 4; i++) {
            branchPoints.push(new THREE.Vector3(
              startPoint.x + (Math.random() - 0.5) * 1.5 * i * 0.3,
              startPoint.y - i * 0.3,
              startPoint.z + (Math.random() - 0.5) * 0.3
            ));
          }
          const branchGeometry = new THREE.BufferGeometry().setFromPoints(branchPoints);
          const branchMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color('#c084fc'),
            transparent: true,
            opacity: 0.4 + Math.random() * 0.3,
          });
          const branchLine = new THREE.Line(branchGeometry, branchMaterial);
          lightningRef.current.add(branchLine);
        }
      }
    }
  });

  return <group ref={lightningRef} />;
};

const Model = ({ url, scale, position, isWhite, multiColor }: { url: string; scale: number; position: [number, number, number]; isWhite?: boolean; multiColor?: boolean }) => {
  const { scene: gltfScene } = useGLTF(url);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const { viewport } = useThree();
  const scaleRef = useRef(scale);
  const initializedRef = useRef(false);
  const sceneRef = useRef(gltfScene);
  const propsRef = useRef({ scale, position, isWhite, multiColor });

  useEffect(() => {
    console.log('[Model] useEffect running, initialized:', initializedRef.current, ', scale:', scale, ', scaleRef.current:', scaleRef.current);
    
    if (initializedRef.current) return;
    
    const currentScene = sceneRef.current;
    const props = propsRef.current;
    
    console.log('[Model] Initializing scene, scale:', props.scale);
    
    currentScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material) {
          if (props.multiColor) {
            material.vertexColors = true;
            const geometry = mesh.geometry;
            const colors = [];
            const positionAttribute = geometry.attributes.position;

            for (let i = 0; i < positionAttribute.count; i++) {
              const y = positionAttribute.getY(i);

              const color = new THREE.Color().setHSL(0, 0, 0.5 + (y + 1) * 0.2);
              colors.push(color.r, color.g, color.b);
            }

            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            material.color = new THREE.Color('#666666');
            meshRef.current = mesh;
          } else if (props.isWhite) {
            material.color = new THREE.Color('#ffffff');
            material.emissive = new THREE.Color('#ffffff');
          } else {
            material.color = new THREE.Color('#a78bfa');
            material.emissive = new THREE.Color('#8b5cf6');
          }
          material.emissiveIntensity = 0.3;
          material.metalness = 0.5;
          material.roughness = 0.3;
        }
      }
    });
    currentScene.scale.set(-props.scale, props.scale, props.scale);
    currentScene.position.set(props.position[0], props.position[1], props.position[2]);
    scaleRef.current = props.scale;
    initializedRef.current = true;
    
    console.log('[Model] Scene initialized, final scale:', props.scale, ', scene.scale:', currentScene.scale.x);
  }, []);

  useFrame((state) => {
    if (meshRef.current && multiColor) {
      const colorAttribute = meshRef.current.geometry.attributes.color;
      
      globalColor.lerp(targetColor, 0.05);

      for (let i = 0; i < colorAttribute.count; i++) {
        const y = meshRef.current.geometry.attributes.position.getY(i);
        const baseLuminance = 0.15 + (y + 1) * 0.15;
        const color = globalColor.clone();
        color.offsetHSL(0, 0, baseLuminance - 0.5);
        colorAttribute.setXYZ(i, color.r, color.g, color.b);
      }
      colorAttribute.needsUpdate = true;

      const mouseX = state.mouse.x;
      const mouseY = state.mouse.y;
      
      const targetRotationY = mouseX * 0.15;
      const targetRotationX = mouseY * 0.15;
      
      const currentScene = sceneRef.current;
      currentScene.rotation.x += (targetRotationX - currentScene.rotation.x) * 0.02;
      currentScene.rotation.y += (targetRotationY - currentScene.rotation.y) * 0.02;
      
      if (state.clock.elapsedTime % 1 < 0.02) {
        console.log('[Model] useFrame scene scale:', currentScene.scale.x);
      }
    }
  });

  return <primitive object={sceneRef.current} />;
};

const PurpleSpotlight = ({ position, targetPos, intensity, angle, penumbra, color }: { position: [number, number, number]; targetPos: [number, number, number]; intensity: number; angle: number; penumbra: number; color: string }) => {
  const lightRef = useRef<THREE.SpotLight>(null!);
  const targetRef = useRef<THREE.Object3D>(null!);

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <>
      <object3D ref={targetRef} position={targetPos} />
      <spotLight ref={lightRef} position={position} angle={angle} penumbra={penumbra} intensity={intensity} color={color} castShadow distance={20} decay={2} />
    </>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '850px' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} shadows style={{ width: '100%', height: '100%' }} resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}>
        <ambientLight intensity={0.4} color="#a855f7" />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#a78bfa" castShadow />
        <PurpleSpotlight position={[3, 5, 4]} targetPos={[3, -2, 0]} angle={0.4} penumbra={0.6} intensity={5} color="#a855f7" />
        <PurpleSpotlight position={[5, 3, 3]} targetPos={[3, -1, 0]} angle={0.5} penumbra={0.8} intensity={4} color="#7c3aed" />
        <pointLight position={[0, 2, 2]} intensity={5} color="#7c3aed" distance={12} decay={2} />
        <pointLight position={[-2, -1, 1]} intensity={5} color="#8b5cf6" distance={8} decay={2} />
        <pointLight position={[3, 0, 3]} intensity={5} color="#a855f7" distance={10} decay={2} />
        <Suspense fallback={null}>
          <Model url="/hhhhdddh (1).glb" scale={1.8} position={[3, -2, 0]} multiColor={true} />
          <Lightning />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
