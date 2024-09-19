import React, { startTransition, Suspense, useState } from "react";
import "./App.css";
import Room from "./components/Room";
import RoomConstructor from "./components/RoomConstructor";
import MovableObject from "./components/MovableObject";
import MovableObjectConstructor from "./components/MovableObjectConstructor";
import { Canvas } from "@react-three/fiber";

function App() {
    const [width, setWidth] = useState(6);
    const [height, setHeight] = useState(3);
    const [depth, setDepth] = useState(6);

    const [activeObject, setActiveObject] = useState(0);

    const [movableObjects, setMovableObjects] = useState([]);

    const addMovableObject = () => {
        startTransition(() => {
          const id = Date.now();
            setMovableObjects([...movableObjects, { id: id, size: [0.5, 0.5, 0.5] }]);
            setActiveObject(id);
        });
    };

    const removeMovableObject = (id) => {
      setMovableObjects(movableObjects.filter((obj) => obj.id !== id));
      // Reset activeObject if the removed object was active
      if (activeObject === id) {
          setActiveObject(0); // Or set it to another id if needed
      }
  };

    const updateMovableObjectSize = (id, newSize) => {
        setMovableObjects(movableObjects.map((obj) => (obj.id === id ? { ...obj, size: newSize } : obj)));
    };

    return (
        <div className="App">
            <button onClick={addMovableObject}>Добавить объект</button>

            {/* Room constructor */}
            <RoomConstructor
                width={width}
                height={height}
                depth={depth}
                setWidth={setWidth}
                setHeight={setHeight}
                setDepth={setDepth}
            />

            {/* MovableObject constructors */}
            {movableObjects.map((obj) => (
                <div key={obj.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <MovableObjectConstructor
                        id={obj.id}
                        size={obj.size}
                        onSizeChange={(newSize) => updateMovableObjectSize(obj.id, newSize)}
                    />
                    <button onClick={() => removeMovableObject(obj.id)}>Удалить объект</button>
                </div>
            ))}

            {/* Canvas with Room and MovableObjects */}
            <Canvas>
                <Suspense fallback={null}>
                    <Room roomSize={[width, height, depth]} />
                    {movableObjects.map((obj) => (
                        <MovableObject id={obj.id} activeObjectId={activeObject} setActiveObjectId={setActiveObject} key={obj.id} size={obj.size} />
                    ))}
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App;
