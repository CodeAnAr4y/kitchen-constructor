import { useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";

export default function Floor({size = [1,1]}) {
  const cobblestone = useLoader(TextureLoader, "floor.avif");

  return (
    <>
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size[0], size[1]]} />
      <meshStandardMaterial map={cobblestone} />
    </mesh>
    </>
  );
}
