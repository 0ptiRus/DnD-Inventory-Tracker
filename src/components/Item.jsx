import React from "react";
import { useDrag } from "react-dnd";

const ItemTypes = {
  ITEM: "item",
};

const Item = ({ item }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.ITEM,
    item: { id: item.id, name: item.name, category: item.category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "8px",
        margin: "4px",
        backgroundColor: "lightgray",
        cursor: "move",
      }}
    >
      {item.name}
    </div>
  );
};

export default Item;
