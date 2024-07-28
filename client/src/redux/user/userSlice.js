import { createSlice } from "@reduxjs/toolkit";

// initialize the state
const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

// create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // sign in start:
    signInStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    // sign in success:
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    // sign in failure:
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// export the actions and reducer
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
