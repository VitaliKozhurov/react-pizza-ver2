import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import filterReducer from './slices/filterSlice';
import pizzaSlice from './slices/pizzasSlice';

// Создаем store (хранилище данных приложения)
export const store = configureStore({
   reducer: {
      filter: filterReducer,
      cart: cartReducer,
      pizza: pizzaSlice,
   },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();