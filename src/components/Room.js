import React from "react";
import Floor from "./Floor";
import Wall from "./Wall";

export default function Room({ roomSize = [1, 1, 1], controlsEnabled }) {
    const [width, height, depth] = roomSize;
    return (
        <>
            <ambientLight intensity={1} />
            <pointLight intensity={1} position={[10, 10, 10]} />
            <Floor size={[width, depth]} />
            <Wall size={[width, height]} position={[0, height / 2, -(depth / 2)]} rotation={[0, 0, 0]} />
            <Wall size={[width, height]} position={[0, height / 2, depth / 2]} rotation={[0, Math.PI, 0]} />
            <Wall size={[depth, height]} position={[-(width / 2), height / 2, 0]} rotation={[0, Math.PI / 2, 0]} />
            <Wall size={[depth, height]} position={[width / 2, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]} />
        </>
    );
}
