import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';

// Создаем store (хранилище данных приложения)
export const store = configureStore({
   reducer: {
      filter: filterReducer,  // часть глобального стора, которая будет отвечать за сортировку
   },
})

