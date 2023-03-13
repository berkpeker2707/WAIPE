import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

var api_url;
if (__DEV__) {
  api_url = "http://192.168.100.75:5001/api";
} else {
  api_url = "https://waipe-server.azurewebsites.net/api";
}

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
        `${api_url}/like/update/post/${values.likeID}`,
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
export const updatePostLike1Action = createAsyncThunk(
  "like/updatePostLike1",
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
        `${api_url}/like/update/post/${values.likeID}`,
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
export const updatePostLike2Action = createAsyncThunk(
  "like/updatePostLike2",
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
        `${api_url}/like/update/post/${values.likeID}`,
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
export const updatePostLike3Action = createAsyncThunk(
  "like/updatePostLike3",
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
        `${api_url}/like/update/post/${values.likeID}`,
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
export const updatePostLike4Action = createAsyncThunk(
  "like/updatePostLike4",
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
        `${api_url}/like/update/post/${values.likeID}`,
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
export const updatePostLike5Action = createAsyncThunk(
  "like/updatePostLike5",
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
        `${api_url}/like/update/post/${values.likeID}`,
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
    updatePostLike1Data: null,
    updatePostLike2Data: null,
    updatePostLike3Data: null,
    updatePostLike4Data: null,
    updatePostLike5Data: null,
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
    //update post like 1 reducer
    builder.addCase(updatePostLike1Action.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePostLike1Action.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updatePostLike1Data = action?.payload;
      state.isUpdated = false;
    });
    builder.addCase(updatePostLike1Action.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //update post like 2 reducer
    builder.addCase(updatePostLike2Action.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePostLike2Action.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updatePostLike2Data = action?.payload;
      state.isUpdated = false;
    });
    builder.addCase(updatePostLike2Action.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //update post like 3 reducer
    builder.addCase(updatePostLike3Action.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePostLike3Action.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updatePostLike3Data = action?.payload;
      state.isUpdated = false;
    });
    builder.addCase(updatePostLike3Action.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //update post like 4 reducer
    builder.addCase(updatePostLike4Action.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePostLike4Action.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updatePostLike4Data = action?.payload;
      state.isUpdated = false;
    });
    builder.addCase(updatePostLike4Action.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //update post like 5 reducer
    builder.addCase(updatePostLike5Action.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePostLike5Action.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updatePostLike5Data = action?.payload;
      state.isUpdated = false;
    });
    builder.addCase(updatePostLike5Action.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
  },
});

export const selectLikeLoading = (state) => state.like.loading;
export const selectLikeError = (state) => state.like.error;
export const selectLikeUpdated = (state) => {
  return state.like.isUpdated;
};
export const selectUpdatePostLike = (state) => state.like.updatePostLikeData;
export const selectUpdatePostLike1 = (state) => state.like.updatePostLikeData1;
export const selectUpdatePostLike2 = (state) => state.like.updatePostLikeData2;
export const selectUpdatePostLike3 = (state) => state.like.updatePostLikeData3;
export const selectUpdatePostLike4 = (state) => state.like.updatePostLikeData4;
export const selectUpdatePostLike5 = (state) => state.like.updatePostLikeData5;

export default likeSlice.reducer;
