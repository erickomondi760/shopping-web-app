import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const loadCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart(),
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;

      let cartItem = state.cartItems.find(
        (item) => item.cartId === product.cartId
      );

      if (cartItem) {
        cartItem.quantity += product.quantity;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.quantity;
      state.cartTotal += product.quantity * product.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item added to cart");
    },
    clearCart: (state, action) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    editItems: (state, action) => {
      const { cartId, quantity } = action.payload;

      const item = state.cartItems.find((i) => i.cartId === cartId);

      state.numItemsInCart += quantity - item.quantity;
      state.cartTotal += (quantity - item.quantity) * item.price;
      item.quantity = quantity;

      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item successfully edited");
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const product = state.cartItems.find((i) => i.cartId === id);

      state.cartItems = state.cartItems.filter((i) => i.cartId !== id);

      state.numItemsInCart -= product.quantity;
      state.cartTotal -= product.quantity * product.price;

      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item removed from cart");
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export default cartSlice.reducer;
export const { addItem, clearCart, editItems, removeItem } = cartSlice.actions;
