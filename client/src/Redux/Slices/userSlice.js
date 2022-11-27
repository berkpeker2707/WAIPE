import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://192.168.1.5:1000/api";

export const getUser = createAsyncThunk(
  "user/me",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/user/me`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { currentUser: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action?.payload;
      state.error = action?.payload?.message;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
  },
});

export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};
export const selectUserError = (state) => state.user.error;
export const selectUserLoading = (state) => state.user.loading;

export default userSlice.reducer;
