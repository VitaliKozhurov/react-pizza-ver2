export type CartItem = {
   id: string;
   title: string;
   imageUrl: string;
   price: number;
   activeType: string;
   activeSize: number;
   count: number;
}

export interface CartSliceState {
   items: CartItem[];
   totalPrice: number;
}