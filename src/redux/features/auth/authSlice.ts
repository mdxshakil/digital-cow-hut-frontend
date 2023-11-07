import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    phoneNumber: "",
    role: "",
    userId: "",
    profilePicture: "",
    name: {
      firstName: "",
      lastName: "",
    },
  },
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      const { accessToken, ...userInfo } = action.payload;
      state.user = userInfo;
    },
    userLoggedOut: (state) => {
      state.user = {
        phoneNumber: "",
        role: "",
        userId: "",
        profilePicture: "",
        name: {
          firstName: "",
          lastName: "",
        },
      };
    },
    toggleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, toggleLoading } = authSlice.actions;

export default authSlice.reducer;
