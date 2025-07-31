import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [], total:null },
  reducers: {
    updateCart(state, action) {
        console.log(action.payload.total);
        
      state.cart = action.payload.cart;
      state.total = action.payload.total
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;
