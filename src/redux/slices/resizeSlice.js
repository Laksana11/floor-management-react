import { createSlice } from '@reduxjs/toolkit';

const resizeSlice = createSlice({
    name: 'resize',
    initialState: {
      width: 150,
      height: 150,
    },
    reducers: {
      setDimensions: (state, action) => {
        state.width = action.payload.width;
        state.height = action.payload.height;
      },
    },
  });
  
  export const { setDimensions } = resizeSlice.actions;
  export default resizeSlice.reducer;