import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://192.168.100.23:5000/api";

export const updatePostLikeAction = createAsyncThunk(
  "like/updatePostLike",
  async (likeID, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${SERVER_URL}/like/update/post/${likeID},config`
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState: {
    loading: false,
    error: null,
    updatePostLikeData: null,
  },
  extraReducers: (builder) => {
    //update post like reducer
    builder.addCase(updatePostLikeAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePostLikeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updatePostLikeData = action?.payload;
    });
    builder.addCase(updatePostLikeAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
  },
});

export const selectLikeLoading = (state) => state.like.loading;
export const selectLikeError = (state) => state.like.error;
export const selectUpdatePostLike = (state) => state.like.updatePostLikeData;

export default likeSlice.reducer;
