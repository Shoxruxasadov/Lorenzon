import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirm: JSON.parse(localStorage.getItem("user")) || null,
};

export const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    getConfirm: (state, action) => {
      state.confirm = action.payload;
    },
  },
});

export const { getConfirm } = confirmSlice.actions;

export default confirmSlice.reducer;
