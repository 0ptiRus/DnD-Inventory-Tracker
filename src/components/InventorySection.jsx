import React from "react";
import { useDrop } from "react-dnd";
import Item from "./Item";

const ItemTypes = {
  ITEM: "item",
};

const InventorySection = ({ title, items, onDropItem }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (draggedItem) => {
      onDropItem(draggedItem);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      style={{
        backgroundColor: isOver ? "#e0e0e0" : "#f0f0f0",
        padding: "16px",
        minHeight: "200px",
        margin: "8px",
        border: "1px solid black",
      }}
    >
      <h4>{title}</h4>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default InventorySection;
