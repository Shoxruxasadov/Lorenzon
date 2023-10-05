import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  field: "timeStamp",
  sort: "desc",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    getField: (state, action) => {
      state.field = action.payload;
    },
    getSort: (state, action) => {
      state.sort === "desc" ? (state.sort = "asc") : (state.sort = "desc");
    },
  },
});

export const { getUsers, getField, getSort } = userSlice.actions;

export default userSlice.reducer;
