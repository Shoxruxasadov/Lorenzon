import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  sort: "desc",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    getSort: (state, action) => {
      state.sort === "desc" ? (state.sort = "asc") : (state.sort = "desc");
    },
  },
});

export const { getUsers, getSort } = userSlice.actions;

export default userSlice.reducer;
