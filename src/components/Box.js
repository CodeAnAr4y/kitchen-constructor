// Box.js
import React, { useRef, useState } from "react";
import * as THREE from 'three';
import {ArrowBox} from "./ArrowBox";

export default function Box() {
  const meshRef = useRef();
  const [showBoxes, setShowBoxes] = useState(false);

  const toggleBoxes = () => {
    setShowBoxes(!showBoxes);
  };

  // Handle box click to move the main box
  const handleBoxClick = (direction) => {
    const offset = 0.1; // Adjust this value for movement distance
    meshRef.current.position.add(direction.clone().multiplyScalar(offset));
  };

  // Prevent event propagation to avoid affecting the visibility state
  const handleArrowBoxClick = (e, direction) => {
    e.stopPropagation(); // Prevent event from bubbling up to parent elements
    handleBoxClick(direction);
  };

  return (
    <group ref={meshRef} onClick={toggleBoxes}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      {showBoxes && (
        <>
          <ArrowBox 
            position={[0.75, 0, 0]} // Right
            onClick={(e) => handleArrowBoxClick(e, new THREE.Vector3(1, 0, 0))}
            color="yellow"
          />
          <ArrowBox 
            position={[-0.75, 0, 0]} // Left
            onClick={(e) => handleArrowBoxClick(e, new THREE.Vector3(-1, 0, 0))}
            color="yellow"
          />
          <ArrowBox 
            position={[0, 0.75, 0]} // Top
            onClick={(e) => handleArrowBoxClick(e, new THREE.Vector3(0, 1, 0))}
            color="yellow"
          />
          <ArrowBox 
            position={[0, -0.75, 0]} // Bottom
            onClick={(e) => handleArrowBoxClick(e, new THREE.Vector3(0, -1, 0))}
            color="yellow"
          />
          <ArrowBox 
            position={[0, 0, 0.75]} // Front
            onClick={(e) => handleArrowBoxClick(e, new THREE.Vector3(0, 0, 1))}
            color="yellow"
          />
          <ArrowBox 
            position={[0, 0, -0.75]} // Back
            onClick={(e) => handleArrowBoxClick(e, new THREE.Vector3(0, 0, -1))}
            color="yellow"
          />
        </>
      )}
    </group>
  );
}
