import React, { useState } from "react";
import * as THREE from "three";
import { MovementButton } from "./MovementButton";
import { RotationButton } from "./RotationButton";
import { useObjectControls } from "../hooks/useObjectControls";
import { useLoader } from "@react-three/fiber";

export default function MovableObject({ id, activeObjectId, setActiveObjectId, size = [1, 1, 1] }) {
    const { meshRef, objectRef, moveObject, rotateObject } = useObjectControls();
    // const [showBoxes, setShowBoxes] = useState();

    const boxTexture = useLoader(THREE.TextureLoader, "box.jpg");

    const movementOffset = 0.1;
    const rortationDegrees = 10;
    const rotationOffset = rortationDegrees * (Math.PI / 180);
    const maxObjectSize = Math.max(...size);
    const minObjectSize = Math.min(...size);
    const buttonSizes = minObjectSize * 0.5;
    const objectFloorPosition = size[1] / 2;

    const toggleActiveObject = () => {
        id === activeObjectId ? setActiveObjectId(0) : setActiveObjectId(id);
    };

    const handleMoveClick = (e, direction, offset) => {
        e.stopPropagation();
        moveObject(direction, offset);
    };

    const handleRotateClick = (e, axis, offset) => {
        e.stopPropagation();
        rotateObject(axis, offset);
    };

    return (
        <group ref={meshRef} onClick={toggleActiveObject} position={[0, objectFloorPosition, 0]}>
            <mesh ref={objectRef}>
                <boxGeometry args={size} />
                <meshStandardMaterial map={boxTexture} />
            </mesh>

            {id === activeObjectId && (
                <>
                    <MovementButton
                        size={buttonSizes}
                        position={[maxObjectSize, 0, 0]} // Вправо
                        onClick={(e) => handleMoveClick(e, new THREE.Vector3(1, 0, 0), movementOffset)}
                        color="yellow"
                    />
                    <MovementButton
                        size={buttonSizes}
                        position={[-maxObjectSize, 0, 0]} // Влево
                        onClick={(e) => handleMoveClick(e, new THREE.Vector3(-1, 0, 0), movementOffset)}
                        color="yellow"
                    />
                    <MovementButton
                        size={buttonSizes}
                        position={[0, maxObjectSize, 0]} // Вверх
                        onClick={(e) => handleMoveClick(e, new THREE.Vector3(0, 1, 0), movementOffset)}
                        color="yellow"
                    />
                    <MovementButton
                        size={buttonSizes}
                        position={[0, -maxObjectSize, 0]} // Вниз
                        onClick={(e) => handleMoveClick(e, new THREE.Vector3(0, -1, 0), movementOffset)}
                        color="yellow"
                    />
                    <MovementButton
                        size={buttonSizes}
                        position={[0, 0, maxObjectSize]} // Вперед
                        onClick={(e) => handleMoveClick(e, new THREE.Vector3(0, 0, 1), movementOffset)}
                        color="yellow"
                    />
                    <MovementButton
                        size={buttonSizes}
                        position={[0, 0, -maxObjectSize]} // Назад
                        onClick={(e) => handleMoveClick(e, new THREE.Vector3(0, 0, -1), movementOffset)}
                        color="yellow"
                    />
                    <RotationButton
                        size={buttonSizes}
                        position={[maxObjectSize / 1.5, maxObjectSize / 1.5, maxObjectSize / 1.5]} // Вращение по оси Y
                        onClick={(e) => handleRotateClick(e, "y", rotationOffset)}
                        color="blue"
                    />
                    <RotationButton
                        size={buttonSizes}
                        position={[maxObjectSize / 1.5, maxObjectSize / 1.5, -maxObjectSize / 1.5]}
                        onClick={(e) => handleRotateClick(e, "y", -rotationOffset)}
                        color="blue"
                    />
                </>
            )}
        </group>
    );
}
