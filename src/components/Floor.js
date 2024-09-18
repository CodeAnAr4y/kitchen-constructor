import { useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";

export default function Floor() {
  const cobblestone = useLoader(TextureLoader, "floor.avif");

  return (
    <>
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial map={cobblestone} />
    </mesh>
    </>
  );
}
