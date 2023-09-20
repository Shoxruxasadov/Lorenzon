import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: localStorage.getItem("sidebar") == "close" ? false : true,
  pouse: false,
  media:
    localStorage.getItem("media") == "desktop"
      ? "desktop"
      : localStorage.getItem("media") == "mobile"
      ? "mobile"
      : "full",
  currentMusic:
    localStorage.getItem("currentMusic") == ""
      ? null
      : JSON.parse(localStorage.getItem("currentMusic")),
  follow: localStorage.getItem("follow") == "false" ? false : true,
};

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      state.sidebar = !state.sidebar;
      localStorage.setItem("sidebar", state.sidebar ? "open" : "close");
    },
    setMedia: (state, action) => {
      state.media = action.payload;
      localStorage.setItem("media", action.payload);
    },
    setCurrentMusic: (state, action) => {
      state.currentMusic = action.payload;
      localStorage.setItem("currentMusic", JSON.stringify(action.payload));
    },
    setPouse: (state, action) => {
      state.pouse = action.payload;
    },
    setFollow: (state, action) => {
      state.follow = !state.follow;
      localStorage.setItem("follow", state.follow);
    },
  },
});

export const { setSidebar, setMedia, setCurrentMusic, setPouse, setFollow } =
  utilitySlice.actions;

export default utilitySlice.reducer;
