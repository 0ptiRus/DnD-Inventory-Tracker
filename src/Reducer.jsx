export const initialState = {
    backpackItems: [
      { id: 1, name: "Sword", itemType: "Weapon" },
      { id: 2, name: "Potion", itemType: "Potion" },
    ],
    weaponItems: [],
    potionItems: [],
    draggedItem: null,
  };
  
  export const Reducer = (state, action) => {
    switch (action.type) {
      case "SET_DRAGGED_ITEM":
        return {
          ...state,
          draggedItem: action.payload,
        };
      case "MOVE_TO_BACKPACK":
        return {
          ...state,
          weaponItems: state.weaponItems.filter(
            (item) => item.id !== state.draggedItem.id
          ),
          backpackItems: [...state.backpackItems, state.draggedItem],
          draggedItem: null, // Clear the dragged item after dropping
        };
      case "MOVE_TO_WEAPONS":
        return {
          ...state,
          backpackItems: state.backpackItems.filter(
            (item) => item.id !== state.draggedItem.id
          ),
          weaponItems: [...state.weaponItems, state.draggedItem],
          draggedItem: null, 
        };
        case "MOVE_TO_POTIONS":
        return {
          ...state,
          backpackItems: state.backpackItems.filter(
            (item) => item.id !== state.draggedItem.id
          ),
          potionItems: [...state.potionItems, state.draggedItem],
          draggedItem: null, 
        };
      default:
        return state;
    }
  };
  