// Room.js
import React, { useState } from "react";
import Floor from "./Floor";
import Wall from "./Wall";
import Box from "./Box";
import { OrbitControls } from "@react-three/drei";

export default function Room() {

  return (
    <>
      <Floor />
      <Wall position={[0, 1.5, -1.5]} rotation={[0, 0, 0]} />
      <Wall position={[0, 1.5, 1.5]} rotation={[0, Math.PI, 0]} />
      <Wall position={[-1.5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Wall position={[1.5, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Box />
      <OrbitControls />
    </>
  );
}
