import { configureStore } from '@reduxjs/toolkit';
import resizeReducer from './slices/resizeSlice';
import tablesReducer from './slices/tablesSlice';
import basketReducer from './slices/basketSlice';

export const store = configureStore({
  reducer: {
    resize: resizeReducer,
    tables: tablesReducer,
    basket: basketReducer,
  },
});