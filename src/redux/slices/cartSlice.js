import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   products:,
   totalPrice: 0,
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      setCategoryId: (state, action) => {
         state.categoryId = action.payload;
      },

   },
})

export const { } = cartSlice.actions;

export default cartSlice.reducer;