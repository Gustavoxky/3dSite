import * as THREE from 'three'
import React, { useRef, useMemo, memo } from 'react'
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Water } from 'three-stdlib'

extend({ Water })

export const Ocean = memo(() => {
    const ref = useRef()
    const gl = useThree((state) => state.gl)
    const waterNormals = useLoader(THREE.TextureLoader, './images/waternormals.jpeg')
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
    const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
    const config = useMemo(
      () => ({
        textureWidth: 1512,
        textureHeight: 1512,
        waterNormals,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x8ffff8,
        distortionScale: 2,
        fog: false,
        format: gl.encoding
      }),
      [waterNormals]
    )
    useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
    
    return (
      <>
        <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} position={[0, -1, 0]} />
      </>
    ) 
  })