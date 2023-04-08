import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    getUser: (state) => {
      state.user = { name: "Phat" };
      state.isAuthenticated = true;
    },
  },
});

export const { getUser } = authSlice.actions;
export default authSlice.reducer;
