import React from "react";
import Item from "./Item";

const InventorySection = ({ title, items, onDropItem, onDragStart, onAddClick, onRemoveClick, isHovered, setSelectedItem, onDragEnter, onDragLeave }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    onDropItem();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`inventory-section ${isHovered ? "hovered" : ""} ${isHovered && items.length === 0 ? "inventory-section-valid" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={onDragEnter} 
      onDragLeave={onDragLeave} 
    >
      <div className="section-header">
        <h3>{title}</h3>
        <div className="section-controls">
          <button onClick={onAddClick}>+</button>
          {items.length > 0 && (
            <button onClick={() => onRemoveClick(items[0])}>-</button>
          )}
        </div>
      </div>
      <ul className="item-list">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDragStart={onDragStart}
            setSelectedItem={setSelectedItem} 
          />
        ))}
      </ul>
    </div>
  );
};

export default InventorySection;
