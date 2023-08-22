import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkmode: localStorage.getItem("theme") == "light" ? false : true,
  sidebar: localStorage.getItem("sidebar") == "close" ? false : true,
};

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setDarkmode: (state, action) => {
      state.darkmode = !state.darkmode;
      localStorage.setItem("theme", state.darkmode ? "dark" : "light");
      document
        .querySelector("body")
        .setAttribute("class", localStorage.getItem("theme"));
    },
    setSidebar: (state, action) => {
      state.sidebar = !state.sidebar;
      localStorage.setItem("sidebar", state.sidebar ? "open" : "close");
    },
  },
});

export const { setDarkmode, setSidebar } = utilitySlice.actions;

export default utilitySlice.reducer;
