import React from "react";

export default function RoomMenu({ room, onRoomUpdate }) {
    return (
        <>
            <div>Размер Комнаты</div>
            <div>
                <label>Ширина: {room.width.toFixed(1)} м</label>
                <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.1"
                    value={room.width}
                    onChange={(e) => onRoomUpdate({width: Number(e.target.value)})}
                    style={{ width: "300px" }}
                />
            </div>
            <div>
                <label>Высота: {room.height.toFixed(1)} м</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={room.height}
                    onChange={(e) => onRoomUpdate({height: Number(e.target.value)})}
                    style={{ width: "300px" }}
                />
            </div>
            <div>
                <label>Глубина: {room.depth.toFixed(1)} м</label>
                <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.1"
                    value={room.depth}
                    onChange={(e) => onRoomUpdate({depth: Number(e.target.value)})}
                    style={{ width: "300px" }}
                />
            </div>
        </>
    );
}
