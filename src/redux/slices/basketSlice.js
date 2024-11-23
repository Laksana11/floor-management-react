import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  basket: [],
  selectedItem: null,
  editableItem: null,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItemToBasket: (state, action) => {
      const { item, x, y } = action.payload;
      const newTable = {
        ...item,
        generatedId: uuidv4(),
        x,
        y,
        width: 150,
        height: 150,
      };
      state.basket.push(newTable);
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
      state.editableItem = { ...action.payload };
    },
    updateEditableItem: (state, action) => {
      const { name, value } = action.payload;
      state.editableItem[name] = value;
    },
    updateBasketItem: (state) => {
      if (state.editableItem) {
        const index = state.basket.findIndex(
          (item) => item.generatedId === state.editableItem.generatedId
        );
        if (index !== -1) {
          state.basket[index] = { ...state.basket[index], ...state.editableItem };
        }
      }
    },
    resizeBasketItem: (state, action) => {
      const { generatedId, width, height } = action.payload;
      const item = state.basket.find((table) => table.generatedId === generatedId);
      if (item) {
        item.width = width;
        item.height = height;
      }
    },
  },
});

export const {
  addItemToBasket,
  setSelectedItem,
  updateEditableItem,
  updateBasketItem,
  resizeBasketItem,
} = basketSlice.actions;
export default basketSlice.reducer;
