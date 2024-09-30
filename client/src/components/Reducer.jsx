const initialState = {
  backpackItems: [],
  weaponItems: [],
  potionItems: [],
  draggedItem: null,
};

const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_INVENTORY":
      const backpackItems = action.payload.filter(item => item.section === "backpack");
      const weaponItems = action.payload.filter(item => item.section === "weapons");
      const potionItems = action.payload.filter(item => item.section === "potions");
      return {
        ...state,
        backpackItems,
        weaponItems,
        potionItems,
      };
    case "SET_DRAGGED_ITEM":
      return { ...state, draggedItem: action.payload };
      case "MOVE_TO_BACKPACK":
        return {
          ...state,
          backpackItems: [...state.backpackItems, state.draggedItem], // Add item to backpack
          weaponItems: state.weaponItems.filter(item => item.id !== state.draggedItem.id), // Remove from weapons
          potionItems: state.potionItems.filter(item => item.id !== state.draggedItem.id), // Remove from potions
        };
      case "MOVE_TO_WEAPONS":
        return {
          ...state,
          weaponItems: [...state.weaponItems, state.draggedItem], // Add item to weapons
          backpackItems: state.backpackItems.filter(item => item.id !== state.draggedItem.id), // Remove from backpack
          potionItems: state.potionItems.filter(item => item.id !== state.draggedItem.id), // Remove from potions
        };
      case "MOVE_TO_POTIONS":
        return {
          ...state,
          potionItems: [...state.potionItems, state.draggedItem], // Add item to potions
          backpackItems: state.backpackItems.filter(item => item.id !== state.draggedItem.id), // Remove from backpack
          weaponItems: state.weaponItems.filter(item => item.id !== state.draggedItem.id), // Remove from weapons
        };
    case "ADD_TO_BACKPACK":
      return { ...state, backpackItems: [...state.backpackItems, action.payload] };
    case "ADD_TO_WEAPONS":
      return { ...state, weaponItems: [...state.weaponItems, action.payload] };
    case "ADD_TO_POTIONS":
      return { ...state, potionItems: [...state.potionItems, action.payload] };
    case "REMOVE_FROM_BACKPACK":
      return { ...state, backpackItems: state.backpackItems.filter(item => item.id !== action.payload) };
    case "REMOVE_FROM_WEAPONS":
      return { ...state, weaponItems: state.weaponItems.filter(item => item.id !== action.payload) };
    case "REMOVE_FROM_POTIONS":
      return { ...state, potionItems: state.potionItems.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
};

export { Reducer, initialState };
