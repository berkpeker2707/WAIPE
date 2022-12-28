import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://192.168.100.21:1000/api";

export const updateCommentAction = createAsyncThunk(
  "comment/updateComment",
  async (parentCommentID, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${SERVER_URL}/comment/update/${parentCommentID}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const getCommentAction = createAsyncThunk(
  "comment/getComment",
  async (id, { rejectWithValue, getState }) => {
    console.log(`auth`);
    console.log(getState()?.auth);
    console.log(`auth`);
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `${SERVER_URL}/comment/fetch/${id}`,
        config
      );

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const deleteCommentAction = createAsyncThunk(
  "comment/deleteComment",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/comment/delete/comment`,
        config
      );

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

export const selectCommentLoading = (state) => state.comment.loading;
export const selectCommentError = (state) => state.comment.error;
export const selectUpdateComment = (state) => state.comment.updateCommentData;
export const selectGetComment = (state) => state.comment.getCommentData;
export const selectDeleteCommentData = (state) =>
  state.comment.deleteCommentData;

export default commentSlice.reducer;
