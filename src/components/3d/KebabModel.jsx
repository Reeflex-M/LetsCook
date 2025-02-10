import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';


//Animation kebab -> Home/HeroSection
function Kebab() {
  const kebabRef = React.useRef();

  // Couleurs de la viande
  const meatColors = [
    new THREE.Color('#8B4513').multiplyScalar(1.2), 
    new THREE.Color('#A0522D').multiplyScalar(1.1), 
    new THREE.Color('#8B0000').multiplyScalar(0.9), 
    new THREE.Color('#654321').multiplyScalar(1.0), 
  ];

  useFrame((state) => {
    if (kebabRef.current) {
      kebabRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={kebabRef} rotation={[0, 0, -Math.PI / 6]}>
      {/* Broche */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 4.5, 16]} />
        <meshStandardMaterial
          color="#C0C0C0"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Morceaux de viande */}
      {Array.from({ length: 20 }, (_, i) => {
        const scale = 0.7 + Math.random() * 0.3;
        const rotX = Math.random() * Math.PI * 2;
        const rotZ = Math.random() * 0.2 - 0.1;
        const posY = (i - 10) * 0.2;
        const meatColor = meatColors[Math.floor(Math.random() * meatColors.length)];

        return (
          <group key={i} position={[0, posY, 0]} rotation={[rotX, 0, rotZ]}>
            {/* Morceau principal */}
            <mesh scale={[scale, 1, scale]}>
              <cylinderGeometry args={[0.25, 0.22, 0.25, 8]} />
              <meshStandardMaterial
                color={meatColor}
                roughness={0.8}
                metalness={0.1}
                emissive={meatColor}
                emissiveIntensity={0.05}
              />
            </mesh>

            {/* Effet de grillade */}
            <mesh scale={[scale * 1.01, 1.01, scale * 1.01]}>
              <cylinderGeometry args={[0.25, 0.22, 0.25, 8]} />
              <meshStandardMaterial
                color="#2A0A0A"
                roughness={1}
                metalness={0}
                transparent
                opacity={0.3}
              />
            </mesh>

            {/* Effet de gras aléatoire */}
            {Math.random() > 0.7 && (
              <mesh 
                position={[0.15 + Math.random() * 0.1, 0, 0]} 
                scale={[0.08, 0.7, 0.08]}
                rotation={[0, Math.random() * Math.PI * 2, Math.PI / 2]}
              >
                <cylinderGeometry args={[0.1, 0.1, 0.2, 6]} />
                <meshStandardMaterial
                  color="#FFFFFF"
                  roughness={0.2}
                  metalness={0.1}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Effet de fumée */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh
          key={`smoke-${i}`}
          position={[
            Math.sin(i * Math.PI * 0.4) * 0.5,
            -1 + i * 0.5,
            Math.cos(i * Math.PI * 0.4) * 0.5
          ]}
          scale={[0.3, 0.3, 0.3]}
        >
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial
            color="#444444"
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

const KebabModel = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.4}
          penumbra={0.3}
          intensity={1.2}
          castShadow
        />
        <spotLight
          position={[-5, -5, 5]}
          angle={0.4}
          penumbra={0.3}
          intensity={0.6}
          castShadow
        />
        <Kebab />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default KebabModel;
