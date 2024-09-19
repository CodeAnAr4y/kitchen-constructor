import React from "react";

export default function RoomConstructor({ width, height, depth, setWidth, setHeight, setDepth }) {
    return (
        <>
            <div>Размер Комнаты</div>
            <div>
                <label>Ширина: {width.toFixed(1)} м</label>
                <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    style={{ width: "300px" }}
                />
            </div>
            <div>
                <label>Высота: {height.toFixed(1)} м</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    style={{ width: "300px" }}
                />
            </div>
            <div>
                <label>Глубина: {depth.toFixed(1)} м</label>
                <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.1"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    style={{ width: "300px" }}
                />
            </div>
        </>
    );
}
