import React from "react";
import "./Modal.css";

const Modal = ({ itemName, setItemName, itemType, setItemType, onSubmit, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Item</h2>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item Name"
        />
        <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
          <option value="Weapon">Weapon</option>
          <option value="Potion">Potion</option>
        </select>
        <button onClick={onSubmit}>Add Item</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
