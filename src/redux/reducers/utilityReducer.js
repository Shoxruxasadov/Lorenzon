import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: localStorage.getItem("sidebar") == "close" ? false : true,
};

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      state.sidebar = !state.sidebar;
      localStorage.setItem("sidebar", state.sidebar ? "open" : "close");
    },
  },
});

export const { setSidebar } = utilitySlice.actions;

export default utilitySlice.reducer;
