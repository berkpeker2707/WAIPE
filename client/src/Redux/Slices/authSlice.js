import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorege from "@react-native-async-storage/async-storage";
import axios from "axios";

const SERVER_URL = "http://192.168.100.21:1000/api";

export const presignup = createAsyncThunk(
  "auth/presignup",
  async (preSignupData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/presignup`,
        preSignupData
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const verifysignup = createAsyncThunk(
  "auth/verifysignup",
  async (verifySignupData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/verify-signup`,
        verifySignupData
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (signupData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/signup`,
        signupData
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (signinData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/signin`,
        signinData
      );

      await AsyncStorege.setItem("Token", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (forgotPasswordData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/forgot-password`,
        forgotPasswordData
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const verifyPassword = createAsyncThunk(
  "auth/verifyPassword",
  async (verifyPasswordData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/verify-password`,
        verifyPasswordData
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
    //pre sign up
    builder.addCase(presignup.pending, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    builder.addCase(presignup.fulfilled, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.preSignupData = action?.payload;
    });
    builder.addCase(presignup.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //verify sign up
    builder.addCase(verifysignup.pending, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    builder.addCase(verifysignup.fulfilled, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    });
    builder.addCase(verifysignup.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    ///sign up without verification
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
    //sign in
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
    //forgot password
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //verify password
    builder.addCase(verifyPassword.pending, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    builder.addCase(verifyPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    });
    builder.addCase(verifyPassword.rejected, (state, action) => {
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
