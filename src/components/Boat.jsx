import React, { memo } from "react";
import { useGLTF } from "@react-three/drei";
import { AudioLoader, Audio } from 'three';



export const Boat = memo(() => {
  const computer = useGLTF("./models/boat/model.gltf");

  // const listener = useMemo(() => new AudioListener(), []);
  // camera.current.add(listener);

  // useEffect(() => {
  //   // Carregue o arquivo de áudio e defina as configurações
  //   const audioLoader = new AudioLoader();
  //   const audio = new Audio(listener);
  //   audioLoader.load('./models/somdomar.mp3', (buffer) => {
  //     audio.setBuffer(buffer);
  //     audio.setLoop(true); // Para reprodução em loop
  //     audio.setVolume(0.5); // Ajuste o volume conforme necessário
  //     audio.play();
  //   });
  // }, []);
  

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
});

useGLTF.preload(["./models/boat/model.gltf", "./models/boat/textures/Fishing_Ship_specularf0.png",
"./models/boat/textures/Fishing_Ship_normal.png", "./models/boat/textures/Fishing_Ship_metallicRoughness.png",
"./models/boat/textures/Boat_Interior_specularf0.png", "./models/boat/textures/Boat_Interior_normal.png",
"./models/boat/textures/Boat_Interior_metallicRoughness.png", "./models/boat/textures/Boat_Interior_baseColor.png"]);


