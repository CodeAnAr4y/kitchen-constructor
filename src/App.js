import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Room from "./components/Room";
import MovableObject from "./components/MovableObject";
import { OrbitControls } from "@react-three/drei";
import "./App.css";
import SideMenu from "./components/SideMenu/SideMenu";

function App() {
    const [width, setWidth] = useState(6);
    const [height, setHeight] = useState(3);
    const [depth, setDepth] = useState(6);
    const [activeObject, setActiveObject] = useState(0);
    const [movableObjects, setMovableObjects] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const addMovableObject = () => {
        const id = Date.now();
        setMovableObjects([...movableObjects, { id, size: [0.5, 0.5, 0.5], position: [0, 0.25, 0] }]);
        setActiveObject(id);
    };

    const removeMovableObject = (id) => {
        setMovableObjects(movableObjects.filter((obj) => obj.id !== id));
        if (activeObject === id) {
            setActiveObject(0);
        }
    };

    const updateMovableObjectSize = (id, newSize) => {
        setMovableObjects(movableObjects.map((obj) => (obj.id === id ? { ...obj, size: newSize } : obj)));
    };

    const activeMovableObject = movableObjects.find((obj) => obj.id === activeObject);

    return (
        <div className="App">
                <SideMenu
                    width={width}
                    height={height}
                    depth={depth}
                    setWidth={setWidth}
                    setHeight={setHeight}
                    setDepth={setDepth}
                    addMovableObject={addMovableObject}
                    activeMovableObject={activeMovableObject}
                    updateMovableObjectSize={updateMovableObjectSize}
                    removeMovableObject={removeMovableObject}
                />

            <Canvas camera={{ fov: 40, position: [4, 4, 4] }}>
                <ambientLight intensity={1} />
                <pointLight intensity={1} position={[10, 10, 10]} />

                <Room roomSize={[width, height, depth]} />

                {movableObjects.map((obj) => (
                    <MovableObject
                        key={obj.id}
                        id={obj.id}
                        size={obj.size}
                        position={obj.position}
                        activeObjectId={activeObject}
                        setActiveObjectId={setActiveObject}
                        setIsDragging={setIsDragging}
                        roomSize={[width, height, depth]} // Pass the room size
                    />
                ))}

                <OrbitControls enabled={!isDragging} />
            </Canvas>
        </div>
    );
}

export default App;
