import React, { useState } from "react";
import InventorySection from "./InventorySection";

const Inventory = () => {
  const [backpackItems, setBackpackItems] = useState([
    { id: 1, name: "Sword", category: "Backpack" },
    { id: 2, name: "Shield", category: "Backpack" },
  ]);

  const [weaponItems, setWeaponItems] = useState([]);

  const handleDropItem = (draggedItem) => {
    if (draggedItem.category === "Backpack") {
      setBackpackItems((prevItems) =>
        prevItems.filter((item) => item.id !== draggedItem.id)
      );
      setWeaponItems((prevItems) => [...prevItems, { ...draggedItem, category: "Weapons" }]);
    } else if (draggedItem.category === "Weapons") {
      setWeaponItems((prevItems) =>
        prevItems.filter((item) => item.id !== draggedItem.id)
      );
      setBackpackItems((prevItems) => [...prevItems, { ...draggedItem, category: "Backpack" }]);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {/* Backpack Section */}
      <InventorySection
        title="Backpack"
        items={backpackItems}
        onDropItem={(item) => handleDropItem({ ...item, category: "Backpack" })}
      />

      {/* Weapons Section */}
      <InventorySection
        title="Weapons"
        items={weaponItems}
        onDropItem={(item) => handleDropItem({ ...item, category: "Weapons" })}
      />
    </div>
  );
};

export default Inventory;
