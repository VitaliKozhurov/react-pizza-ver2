import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
   id: string;
   title: string;
   imageUrl: string;
   price: number;
   activeType: string;
   activeSize: number;
   count: number;
}

interface CartSliceState {
   items: CartItem[];
   totalPrice: number;
}

const initialState: CartSliceState = {
   items: [],
   totalPrice: 0,
}

const checkTotal = (array: CartItem[]) => {
   return array.reduce((total: number, curr) => total + curr.price * curr.count, 0);
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

export const selectCart = (state: RootState) => state.cart;
export const selectorCartItemById = (id: string) => (state: RootState) => state.cart.items.find(el => el.id === id);

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;