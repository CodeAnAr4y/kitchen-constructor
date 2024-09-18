import React, { useRef, useState } from "react";

export function ObjectRotation({ position, onClick, color }) {
  const [hovered, setHovered] = useState(false);
  const boxRef = useRef();

  return (
    <mesh
      ref={boxRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color={hovered ? "green" : color} />
    </mesh>
  );
}
