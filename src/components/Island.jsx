/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";


export function Island ({ sceneOpacity, ...props }) {
  const { nodes, materials } = useGLTF("./models/lowpoly_trees/scene.gltf");

  const materialRef = useRef();

  useFrame(() => {
    materialRef.current.opacity = sceneOpacity.current;
  });

  return (
    <group {...props} dispose={null}>
     <group>
        {Object.keys(nodes).map((Sketchfab_Scene) => (
          <mesh
            key={Sketchfab_Scene}
            geometry={nodes[Sketchfab_Scene].geometry}
          >
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
};

useGLTF.preload("./models/lowpoly_trees/scene.gltf");

