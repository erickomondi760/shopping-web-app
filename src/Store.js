import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Features/Cart/CartSlice";
import userReducer from "./Features/User/UserSlice";

export const store = configureStore({
  reducer: { cartState: cartReducer, userState: userReducer },
});
