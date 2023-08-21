import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkmode: localStorage.getItem("theme") == "light" ? true : false,
  sidebar: localStorage.getItem("sidebar") || true,
};

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setDarkmode: (state, action) => {
      state.darkmode = !state.darkmode;
      localStorage.setItem("theme", state.darkmode ? "light" : "dark");
      document
        .querySelector("body")
        .setAttribute("class", localStorage.getItem("theme"));
    },
    setSidebar: (state, action) => {
      console.log(state.sidebar);
      state.sidebar = !state.sidebar;
      console.log(state.sidebar);
    },
  },
});

export const { setDarkmode, setSidebar } = utilitySlice.actions;

export default utilitySlice.reducer;
