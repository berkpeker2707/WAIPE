import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://192.168.1.46:5001/api";
const updatedLike = createAction("like/update");

export const updatePostLikeAction = createAsyncThunk(
  "like/updatePostLike",
  async (values, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${SERVER_URL}/like/update/post/${values.likeID}`,
        { likeType: values.likeType },
        config
      );

      dispatch(updatedLike());
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
    isUpdated: null,
    updatePostLikeData: null,
  },
  extraReducers: (builder) => {
    //updated check reducer
    builder.addCase(updatedLike, (state) => {
      state.isUpdated = true;
    });
    //update post like reducer
    builder.addCase(updatePostLikeAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePostLikeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updatePostLikeData = action?.payload;
      state.isUpdated = false;
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
export const selectLikeUpdated = (state) => {
  return state.like.isUpdated;
};

export default likeSlice.reducer;
