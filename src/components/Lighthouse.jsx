import React, { memo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";

export const Lighthouse = memo(({ sceneOpacity, ...props }) => {
  // Carrega o modelo 3D do farol usando useGLTF
  const { nodes, materials } = useGLTF("./models/lighthouse/scene.gltf");

  // Crie uma ref para o material do farol
  const materialRef = useRef();

  // Atualize dinamicamente a opacidade do material com base na cena
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.opacity = sceneOpacity.current;
    }
  });

  return (
    <group {...props} dispose={null}>
      <group>
        {Object.keys(nodes).map((nodeName) => (
          <mesh
           key={nodeName} geometry={nodes[nodeName].geometry}
            material={materials.KHR_materials_pbrSpecularGlossiness}>
            <meshStandardMaterial
              ref={materialRef}
              onBeforeCompile={fadeOnBeforeCompile}
              envMapIntensity={2}
              transparent
            />
          </mesh>
        ))}
      </group>
    </group>
  );
});

// Pré-carrega o modelo do farol
useGLTF.preload(["./models/lighthouse/scene.gltf", "./models/lighthouse/textures/aiWireframe2_diffuse.png",
"./models/lighthouse/textures/aiWireframe2_normal.png", "./models/lighthouse/textures/aiWireframe2_occlusion.png",
"./models/lighthouse/textures/aiWireframe2_specularGlossiness.png"]);

