import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorege from "@react-native-async-storage/async-storage";
import axios from "axios";

const SERVER_URL = "http://192.168.1.43:1000/api";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userRegisterInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/signup`,
        userRegisterInfo
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (userAuthInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/signin`,
        userAuthInfo
      );

      await AsyncStorege.setItem("Token", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (resetPasswordInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/reset-password`,
        resetPasswordInfo
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, loading: false, error: null },
  extraReducers: (builder) => {
    //signin
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action?.payload?.accessToken;
      state.error = action?.payload?.message;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.token = null;
      state.loading = false;
      state.error = action?.error;
    });
    ///signup
    builder.addCase(signup.pending, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    ///reset password
    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
  },
});

export const selectToken = (state) => state.auth.token;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectresetPassword = (state) => state.auth.resetPassword;

export default authSlice.reducer;
