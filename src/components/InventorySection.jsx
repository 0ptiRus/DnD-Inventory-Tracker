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

  const sectionClass = isHovered ? isInvalid
  ? "inventory-section inventory-section-invalid"
  : "inventory-section inventory-section-valid"
: "inventory-section";

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      className={sectionClass}
    >
      <h3>{title}</h3>
      <ul className="item-list">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDragStart={onDragOver}
            isDragged={draggedItem && draggedItem.id === item.id}
            invalidDrop={invalidDrop && draggedItem && draggedItem.id === item.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default InventorySection;
