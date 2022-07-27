import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://192.168.100.73:1000/api";

export const getUser = createAsyncThunk(
  "user/me",
  async ({ rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/user/me`);

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
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
  state.user.currentUser;
};

export default userSlice.reducer;
