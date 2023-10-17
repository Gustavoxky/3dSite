import React from "react";
import { useGLTF } from "@react-three/drei";


export const Boat = () => {
  const computer = useGLTF("./models/boat/model.gltf");

  return (
    <group>
      <hemisphereLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={0.0015}
        position={[0, -1, 0]}
        rotation={[0, Math.PI / -1, 0]}
      />
    </group>
  );
};

useGLTF.preload("./models/boat/model.gltf");


