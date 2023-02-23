import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchToPizzas = createAsyncThunk(
   'pizza/fetchPizzasState',
   async (params) => {
      const { currentPage, category, sort, order, search } = params;
      const { data } = await axios.get(`https://63f0f6655b7cf4107e2a2f99.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sort}&order=${order}${search}`);

      return data;
   }
)

const initialState = {
   items: [],
   status: 'loading',
}

export const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems: (state, action) => {
         state.items = action.payload;
      },
   },
   extraReducers: {
      [fetchToPizzas.pending]: (state) => {
         state.status = 'loading';
         state.items = [];
      },
      [fetchToPizzas.fulfilled]: (state, action) => {
         if (action.payload.length === 0) {
            state.status = 'error';
         } else {
            state.items = action.payload;
            state.status = 'success';
         }
      },
      [fetchToPizzas.rejected]: (state) => {
         state.items = [];
         state.status = 'error';
      }
   }
})

export const selectPizza = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;