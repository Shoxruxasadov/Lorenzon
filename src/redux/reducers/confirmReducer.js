import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirm: JSON.parse(localStorage.getItem("confirm")) || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    setConfirm: (state, action) => {
      state.confirm = action.payload;
    },
    setUser: (state, action) => {
      state.confirm = action.payload;
    },
  },
});

export const { setConfirm, setUser } = confirmSlice.actions;

export default confirmSlice.reducer;
