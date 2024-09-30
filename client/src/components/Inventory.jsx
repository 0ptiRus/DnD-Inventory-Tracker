import React, { useReducer, useState, useEffect } from "react";
import InventorySection from "./InventorySection";
import { Reducer, initialState } from "./Reducer";
import { useParams } from 'react-router-dom';
import Modal from "./Modal";
import "./Inventory.css";

const Inventory = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { characterId } = useParams(); 
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isValidHover, setIsValidHover] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("Weapon");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:4000/api/characters/${characterId}/inventory`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        dispatch({ type: "SET_INVENTORY", payload: data });
      } catch (error) {
        console.error("Error fetching inventory", error);
      }
    };

    fetchInventory();
  }, [characterId]);

  const handleDragStart = (item) => {
    dispatch({ type: "SET_DRAGGED_ITEM", payload: item });
    setSelectedItem(item);
    setHoveredSection(null);
  };

  const handleDropToSection = async (section) => {
    if (!selectedItem) return;

    if(section !== "backpack" && selectedItem.section != section)
    {
        console.log(selectedItem.section);
        alert("You can drag items only to their section and the backpack.");
        return;
    }

    if (selectedItem.section === section) {
      alert(`Item is already in the ${section} section.`);
      return; 
    }
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:4000/api/characters/${characterId}/inventory/move/${selectedItem.id}`, {
        method: "POST",
        headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ section }),
      });
      dispatch({ type: `MOVE_TO_${section.toUpperCase()}` });
      setHoveredSection(null); 
    } catch (error) {
      console.error(`Error moving item to ${section}`, error);
    }
  };

  const handleDragEnter = (section) => {
    if (!selectedItem) return;

    const isValid = selectedItem.section !== section; 
    setHoveredSection(section);
    setIsValidHover(isValid);
  };

  const handleDragLeave = () => {
    setHoveredSection(null);
    setIsValidHover(false);
  };

  const handleAddItem = async () => {
    if (!newItemName) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:4000/api/characters/${characterId}/inventory/add`, {
        method: "POST",
        headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: newItemName, itemType: newItemType, section: activeSection }),
      });
      const newItem = await response.json();
      dispatch({ type: `ADD_TO_${activeSection.toUpperCase()}`, payload: newItem });
      setIsModalOpen(false);
      setNewItemName(""); 
    } catch (error) {
      console.error("Error adding new item", error);
    }
  };

  const handleRemoveItem = async (item) => {
    if (!item) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:4000/api/characters/${characterId}/inventory/remove/${item.id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      dispatch({ type: `REMOVE_FROM_${item.section.toUpperCase()}`, payload: item.id });
      setSelectedItem(null); 
    } catch (error) {
      console.error("Error removing item", error);
    }
  };

  return (
    <div className="container">
      {isModalOpen && (
        <Modal
          itemType={newItemType}
          setItemType={setNewItemType}
          itemName={newItemName}
          setItemName={setNewItemName}
          onSubmit={handleAddItem}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <InventorySection
        title="Backpack"
        items={state.backpackItems}
        onDragStart={handleDragStart}
        onDropItem={() => handleDropToSection("backpack")}
        isHovered={hoveredSection === "backpack" && isValidHover}
        onDragEnter={() => handleDragEnter("backpack")}
        onDragLeave={handleDragLeave}
        onAddClick={() => { setActiveSection("backpack"); setIsModalOpen(true); }}
        onRemoveClick={handleRemoveItem}
        setSelectedItem={setSelectedItem}
      />

      <InventorySection
        title="Weapons"
        items={state.weaponItems}
        onDragStart={handleDragStart}
        onDropItem={() => handleDropToSection("weapons")}
        isHovered={hoveredSection === "weapons" && isValidHover}
        onDragEnter={() => handleDragEnter("weapons")}
        onDragLeave={handleDragLeave}
        onAddClick={() => { setActiveSection("weapons"); setIsModalOpen(true); }}
        onRemoveClick={handleRemoveItem}
        setSelectedItem={setSelectedItem}
      />

      <InventorySection
        title="Potions"
        items={state.potionItems}
        onDragStart={handleDragStart}
        onDropItem={() => handleDropToSection("potions")}
        isHovered={hoveredSection === "potions" && isValidHover}
        onDragEnter={() => handleDragEnter("potions")}
        onDragLeave={handleDragLeave}
        onAddClick={() => { setActiveSection("potions"); setIsModalOpen(true); }}
        onRemoveClick={handleRemoveItem}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
};

export default Inventory;
