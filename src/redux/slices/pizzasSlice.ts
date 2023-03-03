import { CartItem } from './cartSlice';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type Pizza = {
   id: string;
   imageUrl: string;
   title: string;
   types: number[];
   sizes: number[];
   price: number;
   category: number;
   rating: number;
}

enum Status {
   LOADING = 'loading',
   SUCCESS = 'success',
   ERROR = 'error',
}

interface PizzaSliceState {
   items: Pizza[];
   status: Status;
}

type FetchPizzasParams = Record<string, string>

export const fetchToPizzas = createAsyncThunk(
   'pizza/fetchPizzasState',
   async (params: FetchPizzasParams) => {
      const { currentPage, category, sort, order, search } = params;
      const { data } = await axios.get<Pizza[]>(`https://63f0f6655b7cf4107e2a2f99.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sort}&order=${order}${search}`);

      return data as Pizza[];
   }
)

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING,
}

export const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems: (state, action) => {
         state.items = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchToPizzas.pending, (state) => {
         state.status = Status.LOADING;
         state.items = [];
      });
      builder.addCase(fetchToPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
         if (action.payload.length === 0) {
            state.status = Status.ERROR;
         } else {
            state.items = action.payload;
            state.status = Status.SUCCESS;
         }
      });
      builder.addCase(fetchToPizzas.rejected, (state) => {
         state.items = [];
         state.status = Status.ERROR;
      })
   }
})

export const selectPizza = (state: RootState) => state.pizza;


export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;