import { useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";

export default function Wall({ position, rotation }) {
  const wallTexture = useLoader(TextureLoader, "wall.avif");

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial map={wallTexture} />
    </mesh>
  );
}
