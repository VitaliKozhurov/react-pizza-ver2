import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   items: [],
   totalPrice: 0,
}

const checkTotal = (array) => {
   return array.reduce((total, curr) => total + curr.price * curr.count, 0);
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem: (state, action) => {
         const findItem = state.items.find(obj => obj.id === action.payload.id);

         if (findItem) {
            findItem.count++;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            });
         }
         state.totalPrice = checkTotal(state.items);
      },
      removeItem: (state, action) => {
         state.items = state.items.filter((item) => item.id !== action.payload);
         state.totalPrice = checkTotal(state.items);
      },
      plusItem: (state, action) => {
         const findItem = state.items.find(obj => obj.id === action.payload);
         findItem.count++;
         state.totalPrice = checkTotal(state.items);
      },
      minusItem: (state, action) => {
         const findItem = state.items.find(obj => obj.id === action.payload);
         findItem.count--;
         state.totalPrice = checkTotal(state.items);
      },
      clearItems: (state, action) => {
         state.items = [];
         state.totalPrice = 0;
      }
   },
})

export const selectCart = (state) => state.cart;

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;