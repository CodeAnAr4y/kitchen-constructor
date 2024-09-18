import React, { useRef, useState } from "react";
import * as THREE from 'three';
import { ObjectMovement } from "./ObjectMovement";
import { ObjectRotation } from "./ObjectRotation";

export default function Box() {
  const meshRef = useRef();
  const boxRef = useRef();
  const [showBoxes, setShowBoxes] = useState(false);

  // Функция для смены видимости стрелок
  const toggleBoxes = () => {
    setShowBoxes(!showBoxes);
  };

  // Обработка клика по стрелке для перемещения
  const handleBoxClick = (direction) => {
    const offset = 0.1; // Значение для перемещения
    meshRef.current.position.add(direction.clone().multiplyScalar(offset));
  };

  // Обработка клика по кнопке вращения
  const handleRotateClick = (e, direction) => {
    e.stopPropagation(); // Остановка всплытия событий
    boxRef.current.rotation.y += direction; // Вращение по оси Y
  };

  // Обработка клика по стрелке, чтобы предотвратить пропагейт событий
  const handleArrowBoxClick = (e, direction) => {
    e.stopPropagation(); // Остановка всплытия событий
    handleBoxClick(direction);
  };

  return (
    <group ref={meshRef} onClick={toggleBoxes}>
      <mesh ref={boxRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      {showBoxes && (
        <>
          <ObjectMovement 
            position={[0.75, 0, 0]} // Вправо
            onClick={(e) => handleArrowBoxClick(e, new THREE.Vector3(1, 0, 0))}
            color="yellow"
          />
          <ObjectMovement 
            position={[-0.75, 0, 0]} // Влево
            onClick={(e) => handleArrowBoxClick(e, new THREE.Vector3(-1, 0, 0))}
            color="yellow"
          />
          <ObjectMovement 
            position={[0, 0.75, 0]} // Вверх
            onClick={(e) => handleArrowBoxClick(e, new THREE.Vector3(0, 1, 0))}
            color="yellow"
          />
          <ObjectMovement 
            position={[0, -0.75, 0]} // Вниз
            onClick={(e) => handleArrowBoxClick(e, new THREE.Vector3(0, -1, 0))}
            color="yellow"
          />
          <ObjectMovement 
            position={[0, 0, 0.75]} // Вперед
            onClick={(e) => handleArrowBoxClick(e, new THREE.Vector3(0, 0, 1))}
            color="yellow"
          />
          <ObjectMovement 
            position={[0, 0, -0.75]} // Назад
            onClick={(e) => handleArrowBoxClick(e, new THREE.Vector3(0, 0, -1))}
            color="yellow"
          />
          {/* Кнопки вращения */}
          <ObjectRotation 
            position={[0.75, 0.75, 0.75]} // Позиция кнопки вращения
            onClick={(e)=> handleRotateClick(e, 0.1)}
            color="blue"
          />
          <ObjectRotation 
            position={[0.75, 0.75, -0.75]} 
            onClick={(e)=> handleRotateClick(e, -0.1)}
            color="blue"
          />
        </>
      )}
    </group>
  );
}
