import React, { useRef, useState } from "react";

export function RotationButton({ size, position, onClick, color }) {
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
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={hovered ? "green" : color} />
    </mesh>
  );
}
