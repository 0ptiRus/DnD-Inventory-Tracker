import React from "react";

const Item = ({ item, onDragStart, invalidDrop }) => {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(item)}
      style={{
        padding: "8px",
        margin: "4px",
        backgroundColor: "lightgray",
        cursor: "move",
        border: invalidDrop ? "2px solid red" : "1px solid black", 
      }}
    >
      <strong>{item.name}</strong> - <em>{item.itemType}</em>
    </div>
  );
};

export default Item;
