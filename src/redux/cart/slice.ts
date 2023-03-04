import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartItem, CartSliceState } from './types';

const checkTotal = (array: CartItem[]) => {
   return array.reduce((total: number, curr) => total + curr.price * curr.count, 0);
}

const initialState: CartSliceState = {
   items: getCartFromLS() || [],
   totalPrice: checkTotal(getCartFromLS()),
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem: (state, action: PayloadAction<CartItem>) => {
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
      removeItem: (state, action: PayloadAction<string>) => {
         state.items = state.items.filter((item) => item.id !== action.payload);
         state.totalPrice = checkTotal(state.items);
      },
      plusItem: (state, action: PayloadAction<string>) => {
         const findItem = state.items.find(obj => obj.id === action.payload);
         if (findItem) {
            findItem.count++;
            state.totalPrice = checkTotal(state.items);
         }
      },
      minusItem: (state, action: PayloadAction<string>) => {
         const findItem = state.items.find(obj => obj.id === action.payload);
         if (findItem) {
            findItem.count--;
            state.totalPrice = checkTotal(state.items);
         }
      },
      clearItems: (state) => {
         state.items = [];
         state.totalPrice = 0;
      }
   },
})

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;