import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Room from "./Room";
import MovableObject from "./MovableObject";
import { OrbitControls } from "@react-three/drei";
import SideMenu from "./SideMenu/SideMenu";

export default function MainConstructorComponent() {
    const [activeObject, setActiveObject] = useState(0);
    const [movableObjects, setMovableObjects] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const [room, setRoom] = useState({ width: 6, height: 3, depth: 6 });

    const [activeTab, setActiveTab] = useState(null);

    const onSwitchActiveObject = (id) => {
        setActiveTab("movable");
        setActiveObject(id);
    };

    const updateRoom = (newRoomParams) => {
        const newRoom = { ...room };
        const paramKeys = Object.keys(newRoomParams);
        paramKeys.forEach((param) => (newRoom[param] = newRoomParams[param]));
        setRoom(newRoom);
    };

    const addMovableObject = () => {
        const id = Date.now();
        setMovableObjects([...movableObjects, { id, size: [0.5, 0.5, 0.5], position: [0, 0.25, 0] }]);
        onSwitchActiveObject(id);
    };

    const removeMovableObject = (id) => {
        setMovableObjects(movableObjects.filter((obj) => obj.id !== id));
        if (activeObject === id) {
            setActiveObject(0);
        }
    };

    const updateMovableObjectSize = (id, newSize) => {
        setMovableObjects(
            movableObjects.map((obj) => {
                if (obj.id === id) {
                    // Обновляем позицию по оси Y (если высота меняется)
                    const newY = Math.max(newSize[1] / 2, 0);

                    // Проверка, чтобы объект оставался в пределах комнаты
                    const newX = Math.max(
                        -room.width / 2 + newSize[0] / 2,
                        Math.min(obj.position[0], room.width / 2 - newSize[0] / 2)
                    );
                    const newZ = Math.max(
                        -room.depth / 2 + newSize[2] / 2,
                        Math.min(obj.position[2], room.depth / 2 - newSize[2] / 2)
                    );

                    return { ...obj, size: newSize, position: [newX, newY, newZ] };
                }
                return obj;
            })
        );
    };

    const updateMovableObjectPosition = (id, newPosition) => {
        setMovableObjects(
            movableObjects.map((obj) => {
                if (obj.id === id) {
                    // Проверка границ для позиции по X и Z
                    const newX = Math.max(
                        -room.width / 2 + obj.size[0] / 2,
                        Math.min(newPosition[0], room.width / 2 - obj.size[0] / 2)
                    );
                    const newZ = Math.max(
                        -room.depth / 2 + obj.size[2] / 2,
                        Math.min(newPosition[2], room.depth / 2 - obj.size[2] / 2)
                    );
                    return { ...obj, position: [newX, obj.position[1], newZ] };
                }
                return obj;
            })
        );
    };

    const activeMovableObject = movableObjects.find((obj) => obj.id === activeObject);

    return (
        <>
            <SideMenu
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                room={room}
                updateRoom={updateRoom}
                activeMovableObject={activeMovableObject}
                addMovableObject={addMovableObject}
                updateMovableObjectSize={updateMovableObjectSize}
                removeMovableObject={removeMovableObject}
            />

            <Canvas camera={{ fov: 40, position: [4, 4, 4] }}>
                <ambientLight intensity={1} />
                <pointLight intensity={1} position={[10, 10, 10]} />

                <Room roomParams={room} />

                {movableObjects.map((obj) => (
                    <MovableObject
                        key={obj.id}
                        id={obj.id}
                        size={obj.size}
                        position={obj.position}
                        activeObjectId={activeObject}
                        setActiveObjectId={onSwitchActiveObject}
                        setIsDragging={setIsDragging}
                        roomSize={[room.width, room.height, room.depth]}
                        updatePosition={updateMovableObjectPosition}
                    />
                ))}

                <OrbitControls enabled={!isDragging} />
            </Canvas>
        </>
    );
}
