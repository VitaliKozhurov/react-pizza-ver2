import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cart;
export const selectorCartItemById = (id: string) => (state: RootState) => state.cart.items.find(el => el.id === id);