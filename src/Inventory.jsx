import React, { useReducer, useState } from "react";
import InventorySection from "/src/components/InventorySection";
import { Reducer, initialState } from "./Reducer"; 
import "./Inventory.css";

const Inventory = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [invalidDrop, setInvalidDrop] = useState(false);  
  const [hoveredSection, setHoveredSection] = useState(null);  
  const [isValidHover, setIsValidHover] = useState(false);

  const handleDragStart = (item) => {
    dispatch({ type: "SET_DRAGGED_ITEM", payload: item });
    setInvalidDrop(false);
    setHoveredSection(null); 
  };

  const handleDropToBackpack = () => {
    if (state.draggedItem) {
      const isItemInBackpack = state.backpackItems.some(
        (item) => item.id === state.draggedItem.id
      );
      if (!isItemInBackpack) {
        dispatch({ type: "MOVE_TO_BACKPACK" });
      }
      resetHoverStates();
    }
  };

  const handleDropToWeapons = () => {
    if (state.draggedItem && state.draggedItem.itemType === "Weapon") {
      const isItemInWeapons = state.weaponItems.some(
        (item) => item.id === state.draggedItem.id
      );
      if (!isItemInWeapons) {
        dispatch({ type: "MOVE_TO_WEAPONS" });
      }
      resetHoverStates();
    } else {
      setInvalidDrop(true);
    }
  };

  const resetHoverStates = () => {
    setHoveredSection(null);
    setIsValidHover(false);
  };

  const handleDropToPotions = () => {
    if (state.draggedItem && state.draggedItem.itemType === "Potion") {
      const isItemInPotions = state.potionItems.some(
        (item) => item.id === state.draggedItem.id
      );
      if (!isItemInPotions) {
        dispatch({ type: "MOVE_TO_POTIONS" });
      }
      resetHoverStates();
    } else {
      setInvalidDrop(true); 
    }
  };


  return (
    <div className="container">
      {/* Backpack Section */}
      <InventorySection
        title="Backpack"
        items={state.backpackItems}
        onDragStart={handleDragStart}
        onDropItem={handleDropToBackpack}
        onDragOver={handleDragStart}
        onDragEnter={() => { setHoveredSection("backpack"); setIsValidHover(true); }} 
        onDragLeave={() => { setHoveredSection("backpack"); setIsValidHover(false); }} 
        draggedItem={state.draggedItem}
        invalidDrop={invalidDrop}
        isInvalid={false} 
        isHovered={hoveredSection === "backpack" && isValidHover} 
      />

      {/* Weapons Section */}
      <InventorySection
        title="Weapons"
        items={state.weaponItems}
        onDragStart={handleDragStart}
        onDropItem={handleDropToWeapons}
        onDragOver={handleDragStart}
        onDragEnter={() => { setHoveredSection("weapons"); setIsValidHover(state.draggedItem && state.draggedItem.itemType === "Weapon"); }}
        onDragLeave={() => { setHoveredSection("weapons"); setIsValidHover(false); }} 
        draggedItem={state.draggedItem}
        invalidDrop={invalidDrop}
        isInvalid={state.draggedItem && state.draggedItem.itemType !== "Weapon"}
        isHovered={hoveredSection === "weapons" && isValidHover} 
      />

      {/*Potion section */}
       <InventorySection
        title="Potions"
        items={state.potionItems}
        onDragStart={handleDragStart}
        onDropItem={handleDropToPotions}
        onDragOver={handleDragStart}
        onDragEnter={() => { setHoveredSection("potions"); setIsValidHover(state.draggedItem && state.draggedItem.itemType === "Potion"); }}
        onDragLeave={() => { setHoveredSection("potions"); setIsValidHover(false); }} 
        draggedItem={state.draggedItem}
        invalidDrop={invalidDrop}
        isInvalid={state.draggedItem && state.draggedItem.itemType !== "Potion"} 
        isHovered={hoveredSection === "potions" && isValidHover} 
      />
    </div>
  );
};

export default Inventory;