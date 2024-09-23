import React from "react";
import Item from "./Item";

const InventorySection = ({ title, items, onDropItem, onDragOver, draggedItem, invalidDrop, isInvalid, isHovered, onDragEnter, onDragLeave }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    onDropItem();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      style={{
        width: "200px",
        padding: "10px",
        border: isInvalid ? "2px solid red" : "2px solid black",
        backgroundColor: isHovered ? (isInvalid ? "#f8d7da" : "#d4edda") : "white",
      }}
    >
      <h3>{title}</h3>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onDragStart={onDragOver}
          isDragged={draggedItem && draggedItem.id === item.id}
          invalidDrop={invalidDrop && draggedItem && draggedItem.id === item.id}
        />
      ))}
    </div>
  );
};

export default InventorySection;
