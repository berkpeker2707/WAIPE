import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

var api_url;
if (__DEV__) {
  api_url = "http://192.168.100.64:5001/api";
} else {
  api_url = "https://waipe-server.azurewebsites.net/api";
}

const updatedLike = createAction("like/update");
const updatedLike1 = createAction("like1/update");
const updatedLike2 = createAction("like2/update");
const updatedLike3 = createAction("like3/update");
const updatedLike4 = createAction("like4/update");
const updatedLike5 = createAction("like5/update");

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

      dispatch(updatedLike1());
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

      dispatch(updatedLike2());
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

      dispatch(updatedLike3());
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

      dispatch(updatedLike4());
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

      dispatch(updatedLike5());
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
    isUpdated1: null,
    isUpdated2: null,
    isUpdated3: null,
    isUpdated4: null,
    isUpdated5: null,
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
    builder.addCase(updatedLike1, (state) => {
      state.isUpdated1 = true;
    });
    builder.addCase(updatedLike2, (state) => {
      state.isUpdated2 = true;
    });
    builder.addCase(updatedLike3, (state) => {
      state.isUpdated3 = true;
    });
    builder.addCase(updatedLike4, (state) => {
      state.isUpdated4 = true;
    });
    builder.addCase(updatedLike5, (state) => {
      state.isUpdated5 = true;
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
      state.isUpdated1 = false;
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
      state.isUpdated2 = false;
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
      state.isUpdated3 = false;
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
      state.isUpdated4 = false;
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
      state.isUpdated5 = false;
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
export const selectUpdatePostLike = (state) => state.like.updatePostLikeData;
export const selectUpdatePostLike1 = (state) => state.like.updatePostLike1Data;
export const selectUpdatePostLike2 = (state) => state.like.updatePostLike2Data;
export const selectUpdatePostLike3 = (state) => state.like.updatePostLike3Data;
export const selectUpdatePostLike4 = (state) => state.like.updatePostLike4Data;
export const selectUpdatePostLike5 = (state) => state.like.updatePostLike5Data;

export default likeSlice.reducer;
