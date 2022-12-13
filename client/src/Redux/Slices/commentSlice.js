import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://192.168.100.21:1000/api";

export const updateCommentAction = createAsyncThunk(
  "comment/updateComment",
  async (parentCommentID, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${SERVER_URL}/comment/update/${parentCommentID}`,
        preSignupData
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const getCommentAction = createAsyncThunk(
  "comment/getComment",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/comment/fetch/${id}`,
        verifySignupData
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const deleteCommentAction = createAsyncThunk(
  "comment/deleteComment",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/comment/delete/comment`);

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    error: null,
    updateCommentData: null,
    updateCommentData: null,
    deleteCommentData: null,
  },
  extraReducers: (builder) => {
    //update comment reducer
    builder.addCase(updateCommentAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updateCommentData = action?.payload;
    });
    builder.addCase(updateCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //get comment reducer
    builder.addCase(getCommentAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.getCommentData = action?.payload;
    });
    builder.addCase(getCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    ///delete comment reducer
    builder.addCase(deleteCommentAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.deleteCommentData = action?.payload;
    });
    builder.addCase(deleteCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
  },
});

export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUpdateComment = (state) => state.auth.updateCommentData;
export const selectGetComment = (state) => state.auth.getCommentData;
export const selectDeleteCommentData = (state) => state.auth.deleteCommentData;

export default commentSlice.reducer;
