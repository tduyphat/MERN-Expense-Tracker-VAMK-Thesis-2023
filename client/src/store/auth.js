import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    getUser: (state, { payload }) => {
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

export const { getUser, logOut } = authSlice.actions;
export default authSlice.reducer;
