import React from "react";

const Item = ({ item, onDragStart }) => {
  return (
    <li
      draggable
      onDragStart={() => onDragStart(item)}
    >
      <strong>{item.name}</strong> - <em>{item.itemType}</em>
    </li>
  );
};

export default Item;
