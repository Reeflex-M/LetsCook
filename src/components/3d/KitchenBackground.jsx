import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

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
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={['#f8fafc']} />
        <fog attach="fog" args={['#f8fafc', 30, 40]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={1.5}
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
        </directionalLight>
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <SpoonModel 
          position={[-3, 2, -2]} 
          rotation={[0, 0, -Math.PI / 4]} 
          scale={0.6}
        />
        <ForkModel 
          position={[3, -1, -1]} 
          rotation={[0, 0, Math.PI / 6]} 
          scale={0.6}
        />
        <SpoonModel 
          position={[2.5, 2, -3]} 
          rotation={[0, 0, -Math.PI / 3]} 
          scale={0.5}
        />
        <ForkModel 
          position={[-2.5, -2, -2]} 
          rotation={[0, 0, Math.PI / 5]} 
          scale={0.5}
        />

        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default KitchenBackground;
