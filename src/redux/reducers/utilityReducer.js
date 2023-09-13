import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: localStorage.getItem("sidebar") == "close" ? false : true,
  contentMusic: localStorage.getItem("contentMusic") == "" ? false : true,
};

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      state.sidebar = !state.sidebar;
      localStorage.setItem("sidebar", state.sidebar ? "open" : "close");
    },
    setContentMusic: (state, action) => {
      state.contentMusic = !state.contentMusic;
      localStorage.setItem("contentMusic", state.contentMusic ? "active" : "");
    },
  },
});

export const { setSidebar, setContentMusic } = utilitySlice.actions;

export default utilitySlice.reducer;
