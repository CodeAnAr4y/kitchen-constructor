import { useRef } from 'react';

export function useObjectControls() {
  const meshRef = useRef();
  const objectRef = useRef();
  
  const moveObject = (direction, offset = 0.1) => {
    meshRef.current.position.add(direction.clone().multiplyScalar(offset));
  };

  const rotateObject = (axis = 'y', amount = 0.1) => {
    objectRef.current.rotation[axis] += amount;
  };

  return { meshRef, objectRef, moveObject, rotateObject };
}
