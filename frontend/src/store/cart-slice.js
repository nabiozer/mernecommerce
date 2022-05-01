import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingAdress: localStorage.getItem("shippingAdress")
      ? JSON.parse(localStorage.getItem("shippingAdress"))
      : {},
      paymentMethod: localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod"))
      : ''
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.product === newItem.product
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existingItem.product ? newItem : x
        );
      } else {
        state.cartItems.push(newItem);
      }
    },
    removeItemFromCart(state,action) {
        state.cartItems = state.cartItems.filter(item => item.product !== action.payload);
    },

    saveShippingAdress(state,action) {
      state.shippingAdress = action.payload;
    },

    savePaymentMethod(state,action) {
      state.paymentMethod = action.payload;
    }
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
