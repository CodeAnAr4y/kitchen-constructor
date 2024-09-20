import React from "react";

export default function MovableObjectMenu({id, size, onSizeChange }) {
    const [width, height, depth] = size;
    return (
        <div>
            <div>Id объекта {id}</div>
            <div>
                <label>Ширина: {width.toFixed(1)} м</label>
                <input
                    type="range"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={width}
                    onChange={(e) => onSizeChange([Number(e.target.value), height, depth])}
                />
            </div>
            <div>
                <label>Высота: {height.toFixed(1)} м</label>
                <input
                    type="range"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={height}
                    onChange={(e) => onSizeChange([width, Number(e.target.value), depth])}
                />
            </div>
            <div>
                <label>Глубина: {depth.toFixed(1)} м</label>
                <input
                    type="range"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={depth}
                    onChange={(e) => onSizeChange([width, height, Number(e.target.value)])}
                />
            </div>
        </div>
    );
}
