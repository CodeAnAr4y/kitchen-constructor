import React from "react";
import "./SideMenu.css";
import RoomMenu from "../RoomMenu";
import MovableObjectMenu from "../MovableObjectMenu";

export default function SideMenu({
    activeTab,
    setActiveTab,
    room,
    updateRoom,
    addMovableObject,
    activeMovableObject,
    updateMovableObjectSize,
    removeMovableObject,
}) {

    function tabClickHandler(tabName) {
        if (activeTab === tabName) {
            setActiveTab(null);
        } else {
            setActiveTab(tabName);
        }
    }

    return (
        <>
            <div className="side-menu">
                {/* Вкладка Objects */}
                <div className={`tab ${activeTab === "movable" ? "active-tab" : ""}`}>
                    <button onClick={() => tabClickHandler("movable")}>
                        <img src="sidebar/movable.svg" alt="" />
                        <div className="tab-name">Movable</div>
                    </button>
                </div>

                {/* Вкладка Objects */}
                <div className={`tab ${activeTab === "objects" ? "active-tab" : ""}`}>
                    <button onClick={() => tabClickHandler("objects")}>
                        <img src="sidebar/objects.svg" alt="" />
                        <div className="tab-name">Objects</div>
                    </button>
                </div>

                {/* Вкладка Room */}
                <div className={`tab ${activeTab === "room" ? "active-tab" : ""}`}>
                    <button onClick={() => tabClickHandler("room")}>
                        <img src="sidebar/room.svg" alt="" />
                        <div className="tab-name">Room</div>
                    </button>
                </div>
            </div>

            <div className="menu-content">
                {/* Отображение конструктора объектов при активной вкладке "objects" */}
                {activeTab === "movable" && (
                    <>
                        {activeMovableObject && (
                            <>
                                <MovableObjectMenu
                                    id={activeMovableObject.id}
                                    size={activeMovableObject.size}
                                    onSizeChange={(newSize) => updateMovableObjectSize(activeMovableObject.id, newSize)}
                                />
                                <button onClick={() => removeMovableObject(activeMovableObject.id)}>
                                    Удалить объект
                                </button>
                            </>
                        )}
                    </>
                )}

                {activeTab === "objects" && (
                    <>
                        <button onClick={addMovableObject}>Добавить объект</button>
                    </>
                )}

                {/* Отображение конструктора комнаты при активной вкладке "Room" */}
                {activeTab === "room" && (
                    <RoomMenu
                        room={room}
                        onRoomUpdate={(newRoom)=>updateRoom(newRoom)}
                    />
                )}
            </div>
        </>
    );
}
