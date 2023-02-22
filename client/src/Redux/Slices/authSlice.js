import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorege from "@react-native-async-storage/async-storage";
import axios from "axios";

const SERVER_URL = "http://192.168.1.2:5001/api";

export const presignupAction = createAsyncThunk(
  "auth/presignupAction",
  async (preSignupData, { rejectWithValue, getState, dispatch }) => {
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

export const verifysignupAction = createAsyncThunk(
  "auth/verifysignupAction",
  async (verifySignupData, { rejectWithValue, getState, dispatch }) => {
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

export const signupAction = createAsyncThunk(
  "auth/signupAction",
  async (signupData, { rejectWithValue, getState, dispatch }) => {
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

export const signinAction = createAsyncThunk(
  "auth/signinAction",
  async (signinData, { rejectWithValue, getState, dispatch }) => {
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

export const forgotPasswordAction = createAsyncThunk(
  "auth/forgotPasswordAction",
  async (forgotPasswordData, { rejectWithValue, getState, dispatch }) => {
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

export const verifyPasswordAction = createAsyncThunk(
  "auth/verifyPasswordAction",
  async (verifyPasswordData, { rejectWithValue, getState, dispatch }) => {
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

export const revertAll = createAction("revertAll");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    preSignupData: null,
    verifysignupData: null,
    signupData: null,
    token: null,
    forgotPasswordData: null,
    verifyPasswordData: null,
  },
  extraReducers: (builder) => {
    //pre sign up reducer
    builder.addCase(presignupAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(presignupAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.preSignupData = action?.payload;
    });
    builder.addCase(presignupAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //verify sign up reducer
    builder.addCase(verifysignupAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifysignupAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.verifysignupData = action?.payload;
    });
    builder.addCase(verifysignupAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    ///sign up without verification reducer
    builder.addCase(signupAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.signupData = action?.payload;
    });
    builder.addCase(signupAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //sign in reducer
    builder.addCase(signinAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signinAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = action?.payload?.accessToken;
    });
    builder.addCase(signinAction.rejected, (state, action) => {
      state.token = null;
      state.loading = false;
      state.error = action?.error;
    });
    //forgot password reducer
    builder.addCase(forgotPasswordAction.pending, (state, action) => {
      sstate.loading = true;
      state.error = null;
    });
    builder.addCase(forgotPasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.forgotPasswordData = action?.payload;
    });
    builder.addCase(forgotPasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //verify password reducer
    builder.addCase(verifyPasswordAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyPasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.verifyPasswordData = action?.payload;
    });
    builder.addCase(verifyPasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //logout
    builder.addCase(revertAll, (initialState) => {
      (initialState.loading = false),
        (initialState.error = null),
        (initialState.preSignupData = null),
        (initialState.verifysignupData = null),
        (initialState.signupData = null),
        (initialState.token = null),
        (initialState.forgotPasswordData = null),
        (initialState.verifyPasswordData = null);
    });
  },
});

export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectPreSignup = (state) => state.auth.preSignupData;
export const selectVerifySignup = (state) => state.auth.verifysignupData;
export const selectSignup = (state) => state.auth.signupData;
export const selectToken = (state) => state.auth.token;
export const selectForgotPassword = (state) => state.auth.forgotPasswordData;
export const selectVerifyPassword = (state) => state.auth.verifyPasswordData;

export default authSlice.reducer;
