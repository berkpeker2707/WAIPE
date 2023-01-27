import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://192.168.1.62:5001/api";

const updatedComment = createAction("comment/update");

export const updateCommentAction = createAsyncThunk(
  "comment/updateComment",
  async (commentData, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${SERVER_URL}/comment/update/${commentData.parentCommentID}`,
        { commentText: commentData.commentText },
        config
      );
      dispatch(updatedComment());

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const getCommentAction = createAsyncThunk(
  "comment/getComment",
  async (id, { rejectWithValue, getState }) => {
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
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const deleteCommentAction = createAsyncThunk(
  "comment/deleteComment",
  async (deleteData, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${SERVER_URL}/comment/delete`,
        deleteData,
        config
      );

      dispatch(updatedComment());

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
    getCommentData: null,
    deleteCommentData: null,
    isUpdated: null,
  },
  extraReducers: (builder) => {
    //updated check reducer
    builder.addCase(updatedComment, (state) => {
      state.isUpdated = true;
    });
    //update comment reducer
    builder.addCase(updateCommentAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.isUpdated = false;
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
      state.isUpdated = false;
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
export const selectCommentUpdated = (state) => {
  return state.comment.isUpdated;
};

export default commentSlice.reducer;
