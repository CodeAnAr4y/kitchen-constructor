import React, { useState, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";

export default function MovableObject({ id, size, position, activeObjectId, setActiveObjectId, setIsDragging }) {
    const [pos, setPos] = useState(position);
    const { size: viewportSize, viewport } = useThree();
    const aspect = viewportSize.width / viewport.width;

    const dragObjectRef = useRef();
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    let planeIntersectPoint = new THREE.Vector3();

    // Перетаскивание объекта
    const bind = useDrag(({ active, event }) => {
        if (active) {
            event.ray.intersectPlane(floorPlane, planeIntersectPoint);
            setPos([planeIntersectPoint.x, size[1] / 2, planeIntersectPoint.z]);
        }
        setIsDragging(active);
    }, { delay: true });

    // Включение активного объекта
    const toggleActiveObject = () => {
        setActiveObjectId(id === activeObjectId ? 0 : id);
    };

    return (
        <group
            ref={dragObjectRef}
            position={pos}
            onClick={toggleActiveObject}
            {...bind()}
        >
            <mesh>
                <boxGeometry args={size} />
                <meshStandardMaterial color={id === activeObjectId ? "green" : "gray"} />
            </mesh>
        </group>
    );
}
