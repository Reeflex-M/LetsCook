import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

//Animation threeJS page LOGIN
const SpoonModel = ({ position, rotation, scale }) => {
  const mesh = useRef();

  useFrame((state) => {
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    mesh.current.rotation.y += 0.005;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={1}
      position={position}
    >
      <mesh
        ref={mesh}
        rotation={rotation}
        scale={scale}
        castShadow
        receiveShadow
      >
        <group>
          {/* Handle */}
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
            <meshPhysicalMaterial 
              color="#FFD700"
              metalness={0.7}
              roughness={0.3}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
            />
          </mesh>
          {/* Spoon head */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <sphereGeometry args={[0.3, 32, 32, 0, Math.PI]} />
            <meshPhysicalMaterial 
              color="#FFD700"
              metalness={0.7}
              roughness={0.3}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
            />
          </mesh>
        </group>
      </mesh>
    </Float>
  );
};

const ForkModel = ({ position, rotation, scale }) => {
  const mesh = useRef();

  useFrame((state) => {
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    mesh.current.rotation.y += 0.007;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
      position={position}
    >
      <mesh
        ref={mesh}
        rotation={rotation}
        scale={scale}
        castShadow
        receiveShadow
      >
        <group>
          {/* Handle */}
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
            <meshPhysicalMaterial 
              color="#C0C0C0"
              metalness={0.8}
              roughness={0.2}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
            />
          </mesh>
          {/* Prongs */}
          {[-0.2, -0.067, 0.067, 0.2].map((x, i) => (
            <mesh key={i} position={[x, 1.1, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.6, 12]} />
              <meshPhysicalMaterial 
                color="#C0C0C0"
                metalness={0.8}
                roughness={0.2}
                clearcoat={0.8}
                clearcoatRoughness={0.2}
              />
            </mesh>
          ))}
        </group>
      </mesh>
    </Float>
  );
};

const KitchenBackground = () => {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
        <color attach="background" args={['#f8fafc']} />
        
        {/* Enhanced lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.7} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1.2}
          castShadow
        />

        {/* Kitchen utensils with enhanced positioning and scale */}
        <group position={[0, 0, -2]}>
          <SpoonModel 
            position={[-3, 1, 0]} 
            rotation={[0, 0, -Math.PI / 4]} 
            scale={1.5} 
          />
          <ForkModel 
            position={[3, -1, 0]} 
            rotation={[0, 0, Math.PI / 4]} 
            scale={1.5} 
          />
          <SpoonModel 
            position={[-1, 3, -1]} 
            rotation={[0, 0, Math.PI / 6]} 
            scale={1.2} 
          />
          <ForkModel 
            position={[1, -3, -1]} 
            rotation={[0, 0, -Math.PI / 6]} 
            scale={1.2} 
          />
        </group>

        {/* Scene environment and controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        <fog attach="fog" args={['#f8fafc', 10, 20]} />
      </Canvas>
    </div>
  );
};

export default KitchenBackground;
