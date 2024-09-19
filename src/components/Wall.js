import { useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";

export default function Wall({ size=[1,1], position, rotation }) {
  const wallTexture = useLoader(TextureLoader, "wall.avif");

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[size[0], size[1]]} />
      <meshStandardMaterial map={wallTexture} />
    </mesh>
  );
}
