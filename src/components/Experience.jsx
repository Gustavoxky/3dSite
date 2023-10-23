import { Float, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Euler, Group, Vector3 } from "three";
import { usePlay } from "../contexts/Play";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
// import { Airplane } from "./Airplane";
import { Background } from "./Background";
import { Ship } from "./Ship";
import { TextSection } from "./TextSection";
import { Boat } from "./Boat";
import { Ocean } from "./Ocean";
import { Lighthouse } from "./Lighthouse";
import { Island } from "./Island";
import { Whale } from "./Whale";


const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 2;
const FRICTION_DISTANCE = 2;

export const Experience = () => {
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
    ],
    []
  );

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  const textSections = useMemo(() => {
    return [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[1].x + 20,
          curvePoints[1].y + 1,
          curvePoints[1].z - 55
        ),
        subtitle: `Welcome to my 3d website,
Have a seat and enjoy the ride!`,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[2].x - 145,
          curvePoints[2].y + 1,
          curvePoints[2].z - 160
        ),
        title: "About me",
        subtitle: `I'm Brazilian, born in Pernambuco, and currently residing in São José dos Campos, São Paulo.`,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[4].x + 3.5,
          curvePoints[4].y + 1.5,
          curvePoints[4].z - 12
        ),
        title: "Career ",
        subtitle: `My career spans software engineering and design, allowing for a multidisciplinary approach to projects.`,
      },
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[4].x - 45.5,
          curvePoints[4].y + 1.5,
          curvePoints[4].z - 140
        ),
        title: "",
        subtitle: `My diverse geographical experience and the combination of technology and design skills contribute to a unique perspective in my work.`,
      },
    ];
  }, []);

  const lighthouse = useMemo(
    () => [
     
      {
        scale: new Vector3(1, 1, 1),
        position: new Vector3(20, -1, -112),
      },
      // {
      //   scale: new Vector3(1, 1, 1),
      //   position: new Vector3(
      //     curvePoints[2].x - 4,
      //     curvePoints[2].y - 2,
      //     curvePoints[2].z - 56
      //   ),
      // },
      
      {
        scale: new Vector3(1, 1, 1),
        position: new Vector3(
          curvePoints[3].x - 20,
          curvePoints[3].y - 2,
          curvePoints[3].z - 8
        ),
      },
    ],
    []
  );
     
      const island = useMemo(() => [
        {
          scale: new Vector3(1, 1, 1),
          position: new Vector3(
            curvePoints[2].x + 30,
            curvePoints[2].y - 2,
            curvePoints[2].z + 56 
          ),
          rotation: new Euler( -1.6, 0, 2),
        },
        // {
        //   scale: new Vector3(1, 1, 1),
        //   position: new Vector3(
        //     curvePoints[4].x + 84,
        //     curvePoints[4].y + 4,
        //     curvePoints[4].z - 62
        //   ),
        //   rotation: new Euler( -1.6, 0, 2),
        // },
       
        // {
        //   scale: new Vector3(1, 1, 1),
        //   position: new Vector3(
        //     curvePoints[7].x + 10,
        //     curvePoints[7].y + 5,
        //     curvePoints[7].z - 20
        //   ),
        //   rotation: new Euler(-1.7, 0, 6),
        // },
      ],
      []
      );

      const ship = useMemo(() => [
        {
          scale: new Vector3(1, 1, 1),
          position: new Vector3(
            curvePoints[4].x - 180,
            curvePoints[4].y - 10,
            curvePoints[4].z - 392
          ),
          rotation: new Euler( -0.1, 0, 0),
        },
      ],
      []
      );

      const whale = useMemo(() => [
        {
          scale: new Vector3(1, 1, 1),
          position: new Vector3(
            curvePoints[4].x + 54,
            curvePoints[4].y + 15,
            curvePoints[4].z - 62
          ),
          rotation: new Euler( 0.5, 0, 2.2),
        }, 
      ],
      []
      );
      
   

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const cameraRail = useRef();
  const camera = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0);

  const { play, setHasScroll, end, setEnd } = usePlay();

  useFrame((_state, delta) => {
    if (window.innerWidth > window.innerHeight) {
      // LANDSCAPE
      camera.current.fov = 30;
      camera.current.position.z = 5;
    } else {
      // PORTRAIT
      camera.current.fov = 80;
      camera.current.position.z = 2;
    }

    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true);
    }

    if (play && !end && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta * 0.1
      );
    }

    if (end && sceneOpacity.current > 0) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta
      );
    }

    lineMaterialRef.current.opacity = sceneOpacity.current;

    if (end) {
      return;
    }

    const scrollOffset = Math.max(0, scroll.offset);

    let friction = 1;
    let resetCameraRail = true;
    // LOOK TO CLOSE TEXT SECTIONS
    textSections.forEach((textSection) => {
      const distance = textSection.position.distanceTo(
        cameraGroup.current.position
      );

      if (distance < FRICTION_DISTANCE) {
        friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
        const targetCameraRailPosition = new Vector3(
          (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
          0,
          0
        );
        cameraRail.current.position.lerp(targetCameraRailPosition, delta);
        resetCameraRail = false;
      }
    });
    if (resetCameraRail) {
      const targetCameraRailPosition = new Vector3(0, 0, 0);
      cameraRail.current.position.lerp(targetCameraRailPosition, delta);
    }

    // CALCULATE LERPED SCROLL OFFSET
    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current,
      scrollOffset,
      delta * friction
    );
    // PROTECT BELOW 0 AND ABOVE 1
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

    lastScroll.current = lerpedScrollOffset;
    tl.current.seek(lerpedScrollOffset * tl.current.duration());

    const curPoint = curve.getPoint(lerpedScrollOffset);

    // Follow the curve points
    cameraGroup.current.position.lerp(curPoint, delta * 24);

    // Make the group look ahead on the curve

    const lookAtPoint = curve.getPoint(
      Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1)
    );

    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );
    const targetLookAt = new THREE.Vector3()
      .subVectors(curPoint, lookAtPoint)
      .normalize();

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    );

    // Airplane rotation

    const tangent = curve.getTangent(lerpedScrollOffset + CURVE_AHEAD_AIRPLANE);

    const nonLerpLookAt = new Group();
    nonLerpLookAt.position.copy(curPoint);
    nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));

    tangent.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -nonLerpLookAt.rotation.y
    );

    let angle = Math.atan2(-tangent.z, tangent.x);
    angle = -Math.PI / 2 + angle;

    let angleDegrees = (angle * 180) / Math.PI;
    angleDegrees *= 2.4; // stronger angle

    // LIMIT PLANE ANGLE
    if (angleDegrees < 0) {
      angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE);
    }
    if (angleDegrees > 0) {
      angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE);
    }

    // SET BACK ANGLE
    angle = (angleDegrees * Math.PI) / 180;

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angle
      )
    );
    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);

    if (
      cameraGroup.current.position.z <
      curvePoints[curvePoints.length - 1].z + 100
    ) {
      setEnd(true);
      planeOutTl.current.play();
    }
  });

  const airplane = useRef();

  const tl = useRef();
  const backgroundColors = useRef({
    colorA: "#0033ff",
    colorB: "#abaadd",
  });

  const planeInTl = useRef();
  const planeOutTl = useRef();

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#6f35cc",
      colorB: "#ffad30",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#424242",
      colorB: "#ffcc00",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#0d041f",
      colorB: "#55ab8f",
    });

    tl.current.pause();

    planeInTl.current = gsap.timeline();
    planeInTl.current.pause();
    planeInTl.current.from(airplane.current.position, {
      duration: 3,
      z: 5,
      y: -2,
    });

    planeOutTl.current = gsap.timeline();
    planeOutTl.current.pause();

    planeOutTl.current.to(
      airplane.current.position,
      {
        duration: 10,
        z: -250,
        y: 10,
      },
      0
    );
    planeOutTl.current.to(
      cameraRail.current.position,
      {
        duration: 8,
        y: 12,
      },
      0
    );
    planeOutTl.current.to(airplane.current.position, {
      duration: 1,
      z: -1000,
    });
  }, []);

  useEffect(() => {
    if (play) {
      planeInTl.current.play();
    }
  }, [play]);

  return useMemo(
    () => (
      <>
        <directionalLight position={[0, 3, 1]} intensity={0.1} />
        {/* <OrbitControls /> */}
        <group ref={cameraGroup}>
          <Background backgroundColors={backgroundColors} />
          <group ref={cameraRail}>
            <PerspectiveCamera
              ref={camera}
              position={[0, 0, 5]}
              fov={30}
              makeDefault
            />
          </group>
          <group ref={airplane}>
            <Float floatIntensity={0} speed={0} rotationIntensity={0}>
              <Boat
                rotation-y={Math.PI / 2}
                // scale={[0.2, 0.2, 0.2]}
                position-y={0.1}
              />
              <Ocean/>
            </Float>
          </group>
        </group>
        {/* TEXT */}
        {textSections.map((textSection, index) => (
          <TextSection {...textSection} key={index} />
        ))}

        {/* LINE */}
        <group position-y={0}>
          <mesh>
            <extrudeGeometry
              args={[
                shape,
                {
                  steps: LINE_NB_POINTS,
                  bevelEnabled: false,
                  extrudePath: curve,
                },
              ]}
            />
            <meshStandardMaterial
              color={"white"}
              ref={lineMaterialRef}
              transparent
              envMapIntensity={2}
              onBeforeCompile={fadeOnBeforeCompile}
            />
          </mesh>
        </group>

        {/* CLOUDS */}
        {lighthouse.map((cloud, index) => (
          <Lighthouse sceneOpacity={sceneOpacity} {...cloud} key={index} />
        ))}
        {island.map((cloud, index) => (
          <Island sceneOpacity={sceneOpacity} {...cloud} key={index} />
        ))}
        {ship.map((cloud, index) => (
          <Ship sceneOpacity={sceneOpacity} {...cloud} key={index} />
        ))}
        {whale.map((cloud, index) => (
          <Whale sceneOpacity={sceneOpacity} {...cloud} key={index} />
        ))}
      </>
    ),
    []
  );
};
