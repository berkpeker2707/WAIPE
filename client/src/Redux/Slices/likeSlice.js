import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

var api_url;
if (__DEV__) {
  api_url = "http://192.168.1.33:5001/api";
} else {
  api_url = "https://waipe-server.azurewebsites.net/api";
}

const updatedLike = createAction("like/update");
const updatedLike1 = createAction("like1/update");
const updatedLike2 = createAction("like2/update");
const updatedLike3 = createAction("like3/update");
const updatedLike4 = createAction("like4/update");
const updatedLike5 = createAction("like5/update");

export const getPostLikeAction = createAsyncThunk(
  "like/getPostLike",
  async (postID, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${api_url}/like/fetch/post/${postID}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

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

      await dispatch(updatedLike());
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

      await dispatch(updatedLike1());
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

      await dispatch(updatedLike2());
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

      await dispatch(updatedLike3());
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

      await dispatch(updatedLike4());
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

      await dispatch(updatedLike5());
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
    postLikeData: null,
    isUpdated: null,
    isUpdated1: null,
    isUpdated2: null,
    isUpdated3: null,
    isUpdated4: null,
    isUpdated5: null,
    // updatePostLikeData: null,
    // updatePostLike1Data: null,
    // updatePostLike2Data: null,
    // updatePostLike3Data: null,
    // updatePostLike4Data: null,
    // updatePostLike5Data: null,
  },
  extraReducers: (builder) => {
    //updated check reducer
    builder.addCase(updatedLike, (state) => {
      state.isUpdated = false;
    });
    builder.addCase(updatedLike1, (state) => {
      state.isUpdated1 = false;
    });
    builder.addCase(updatedLike2, (state) => {
      state.isUpdated2 = false;
    });
    builder.addCase(updatedLike3, (state) => {
      state.isUpdated3 = false;
    });
    builder.addCase(updatedLike4, (state) => {
      state.isUpdated4 = false;
    });
    builder.addCase(updatedLike5, (state) => {
      state.isUpdated5 = false;
    });
    //update post like reducer
    builder.addCase(updatePostLikeAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePostLikeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.postLikeData = action?.payload;
      state.isUpdated = true;
    });
    builder.addCase(updatePostLikeAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //get post like reducer
    builder.addCase(getPostLikeAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPostLikeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.postLikeData = action?.payload;
    });
    builder.addCase(getPostLikeAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //update post like 1 reducer
    builder.addCase(updatePostLike1Action.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.isUpdated = false;
      state.isUpdated1 = false;
      state.isUpdated2 = false;
      state.isUpdated3 = false;
      state.isUpdated4 = false;
      state.isUpdated5 = false;
    });
    builder.addCase(updatePostLike1Action.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.postLikeData = action?.payload;
      state.isUpdated1 = true;
      state.isUpdated2 = false;
      state.isUpdated3 = false;
      state.isUpdated4 = false;
      state.isUpdated5 = false;
    });
    builder.addCase(updatePostLike1Action.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //update post like 2 reducer
    builder.addCase(updatePostLike2Action.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.isUpdated = false;
      state.isUpdated1 = false;
      state.isUpdated2 = false;
      state.isUpdated3 = false;
      state.isUpdated4 = false;
      state.isUpdated5 = false;
    });
    builder.addCase(updatePostLike2Action.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.postLikeData = action?.payload;
      state.isUpdated1 = false;
      state.isUpdated2 = true;
      state.isUpdated3 = false;
      state.isUpdated4 = false;
      state.isUpdated5 = false;
    });
    builder.addCase(updatePostLike2Action.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //update post like 3 reducer
    builder.addCase(updatePostLike3Action.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.isUpdated = false;
      state.isUpdated1 = false;
      state.isUpdated2 = false;
      state.isUpdated3 = false;
      state.isUpdated4 = false;
      state.isUpdated5 = false;
    });
    builder.addCase(updatePostLike3Action.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.postLikeData = action?.payload;
      state.isUpdated1 = false;
      state.isUpdated2 = false;
      state.isUpdated3 = true;
      state.isUpdated4 = false;
      state.isUpdated5 = false;
    });
    builder.addCase(updatePostLike3Action.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //update post like 4 reducer
    builder.addCase(updatePostLike4Action.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.isUpdated = false;
      state.isUpdated1 = false;
      state.isUpdated2 = false;
      state.isUpdated3 = false;
      state.isUpdated4 = false;
      state.isUpdated5 = false;
    });
    builder.addCase(updatePostLike4Action.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.postLikeData = action?.payload;
      state.isUpdated1 = false;
      state.isUpdated2 = false;
      state.isUpdated3 = false;
      state.isUpdated4 = true;
      state.isUpdated5 = false;
    });
    builder.addCase(updatePostLike4Action.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //update post like 5 reducer
    builder.addCase(updatePostLike5Action.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.isUpdated = false;
      state.isUpdated1 = false;
      state.isUpdated2 = false;
      state.isUpdated3 = false;
      state.isUpdated4 = false;
      state.isUpdated5 = false;
    });
    builder.addCase(updatePostLike5Action.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.postLikeData = action?.payload;
      state.isUpdated1 = false;
      state.isUpdated2 = false;
      state.isUpdated3 = false;
      state.isUpdated4 = false;
      state.isUpdated5 = true;
    });
    builder.addCase(updatePostLike5Action.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
  },
});

export const selectLikeLoading = (state) => state.like.loading;
export const selectLikeError = (state) => state.like.error;
export const selectLikeUpdatedBool = (state) => {
  return state.like.isUpdated;
};
export const selectLike1UpdatedBool = (state) => {
  return state.like.isUpdated1;
};
export const selectLike2UpdatedBool = (state) => {
  return state.like.isUpdated2;
};
export const selectLike3UpdatedBool = (state) => {
  return state.like.isUpdated3;
};
export const selectLike4UpdatedBool = (state) => {
  return state.like.isUpdated4;
};
export const selectLike5UpdatedBool = (state) => {
  return state.like.isUpdated5;
};
export const selectGetPostLike = (state) => state.like.postLikeData;
export const selectUpdatePostLike = (state) => state.like.postLikeData;
export const selectUpdatePostLike1 = (state) => state.like.postLikeData;
export const selectUpdatePostLike2 = (state) => state.like.postLikeData;
export const selectUpdatePostLike3 = (state) => state.like.postLikeData;
export const selectUpdatePostLike4 = (state) => state.like.postLikeData;
export const selectUpdatePostLike5 = (state) => state.like.postLikeData;

export default likeSlice.reducer;
