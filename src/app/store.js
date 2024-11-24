import { configureStore } from '@reduxjs/toolkit';
import tablesReducer from './../redux/tables/tablesSlice';


export const store = configureStore({
  reducer: {
    tables: tablesReducer,

  },
});