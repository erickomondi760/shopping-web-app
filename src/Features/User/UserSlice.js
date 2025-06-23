import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  dracula: "dracula",
  winter: "winter",
};

const storedTheme = localStorage.getItem("theme") || themes.dracula;

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: storedTheme,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;

      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("You successfully logged out");
    },
    toggleTheme: (state) => {
      const theme =
        state.theme === themes.dracula ? themes.winter : themes.dracula;
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      return theme;
    },
  },
});

export default userSlice.reducer;
export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
