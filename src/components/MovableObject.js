/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";
import { useLoader } from "@react-three/fiber";

export default function MovableObject({ id, size, position, activeObjectId, setActiveObjectId, setIsDragging, updatePosition, roomSize }) {
    const objectTexture = useLoader(THREE.TextureLoader, "box.jpg");

    const dragObjectRef = useRef();
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    let planeIntersectPoint = new THREE.Vector3();

    const [roomWidth, roomHeight, roomDepth] = roomSize;

    const bind = useDrag(({ active, event }) => {
        if (active && activeObjectId === id) {
            event.ray.intersectPlane(floorPlane, planeIntersectPoint);
            const newX = Math.max(-roomWidth / 2 + size[0] / 2, Math.min(planeIntersectPoint.x, roomWidth / 2 - size[0] / 2));
            const newZ = Math.max(-roomDepth / 2 + size[2] / 2, Math.min(planeIntersectPoint.z, roomDepth / 2 - size[2] / 2));
            updatePosition(id, [newX, size[1] / 2, newZ]);
        }
        setIsDragging(active);
    }, { delay: true });

    const handleOnClick = (event) => {
        event.stopPropagation();
        if (event.button === 0) {
            setActiveObjectId(id);
        }
    };

    return (
        <group
            ref={dragObjectRef}
            position={position}
            {...bind()}
        >
            <mesh onClick={handleOnClick}>
                <boxGeometry args={size} />
                <meshStandardMaterial map={objectTexture} color={id === activeObjectId ? "#64ff5e" : "white"} />
            </mesh>
        </group>
    );
}
