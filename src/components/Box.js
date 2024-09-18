// Box.js
import React, { useRef, useState } from "react";
import * as THREE from 'three';

function Arrow({ direction, onClick, position }) {
  const arrowRef = useRef();
  
  return (
    <mesh
      ref={arrowRef}
      position={position}
      onClick={onClick}
    >
      <arrowHelper args={[direction, new THREE.Vector3(0, 0, 0), 1, 0xffff00]} />
    </mesh>
  );
}

export default function Box() {
  const meshRef = useRef();
  const [showArrows, setShowArrows] = useState(false);

  // Toggle arrows on click
  const toggleArrows = () => {
    setShowArrows(!showArrows);
  };

  // Handle arrow click to move the box
  const handleArrowClick = (direction) => {
    const offset = 0.5; // Adjust this value for movement distance
    meshRef.current.position.add(direction.clone().multiplyScalar(offset));
  };

  return (
    <group ref={meshRef} onClick={toggleArrows}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      {showArrows && (
        <>
          <Arrow 
            direction={new THREE.Vector3(1, 0, 0)} 
            onClick={() => handleArrowClick(new THREE.Vector3(1, 0, 0))}
            position={[0.75, 0, 0]} // Position arrows relative to the Box
          />
          <Arrow 
            direction={new THREE.Vector3(-1, 0, 0)} 
            onClick={() => handleArrowClick(new THREE.Vector3(-1, 0, 0))}
            position={[-0.75, 0, 0]} // Position arrows relative to the Box
          />
          <Arrow 
            direction={new THREE.Vector3(0, 1, 0)} 
            onClick={() => handleArrowClick(new THREE.Vector3(0, 1, 0))}
            position={[0, 0.75, 0]} // Position arrows relative to the Box
          />
          <Arrow 
            direction={new THREE.Vector3(0, -1, 0)} 
            onClick={() => handleArrowClick(new THREE.Vector3(0, -1, 0))}
            position={[0, -0.75, 0]} // Position arrows relative to the Box
          />
          <Arrow 
            direction={new THREE.Vector3(0, 0, 1)} 
            onClick={() => handleArrowClick(new THREE.Vector3(0, 0, 1))}
            position={[0, 0, 0.75]} // Position arrows relative to the Box
          />
          <Arrow 
            direction={new THREE.Vector3(0, 0, -1)} 
            onClick={() => handleArrowClick(new THREE.Vector3(0, 0, -1))}
            position={[0, 0, -0.75]} // Position arrows relative to the Box
          />
        </>
      )}
    </group>
  );
}
