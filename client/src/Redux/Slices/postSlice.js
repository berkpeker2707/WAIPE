import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorege from "@react-native-async-storage/async-storage";
import axios from "axios";

const SERVER_URL = "http://192.168.100.21:1000/api";

export const postPostAction = createAsyncThunk(
  "post/postPost",
  async (fetchPostsInfo, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/post/new/${petID}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const getPostAction = createAsyncThunk(
  "post/getPost",
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
        `${SERVER_URL}/post/fetch/${postID}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const getPetPostsAction = createAsyncThunk(
  "post/getPetPosts",
  async (fetchPostsInfo, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/post/fetch/pet/${petID}}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const getAllPostsAction = createAsyncThunk(
  "post/getAllPosts",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${SERVER_URL}/post/fetch`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const getFollowedPostsAction = createAsyncThunk(
  "post/getFollowedPosts",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/post/fetch/all/followed`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const updatePostAction = createAsyncThunk(
  "post/updatePost",
  async (fetchPostsInfo, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${SERVER_URL}/post/update/${postID}}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const deletePostAction = createAsyncThunk(
  "post/deletePost",
  async (fetchPostsInfo, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${SERVER_URL}/post/delete/${postID}}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const archivePostAction = createAsyncThunk(
  "post/archivePost",
  async (fetchPostsInfo, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(`${SERVER_URL}/post/archive`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    error: null,
    postPostData: null,
    getPostData: null,
    getPetPostsData: null,
    getAllPostsData: null,
    updatePostData: null,
    deletePostData: null,
    archivePostData: null,
  },
  extraReducers: (builder) => {
    //post post reducer
    builder.addCase(postPostAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.postPostData = action?.payload;
    });
    builder.addCase(postPostAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //get post reducer
    builder.addCase(getPostAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.getPostData = action?.payload;
    });
    builder.addCase(getPostAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //get pet posts reducer
    builder.addCase(getPetPostsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPetPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.getPetPostsData = action?.payload;
    });
    builder.addCase(getPetPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //get all posts reducer
    builder.addCase(getAllPostsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.getAllPostsData = action.payload;
    });
    builder.addCase(getAllPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //get followed posts reducer
    builder.addCase(getFollowedPostsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFollowedPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.getFollowedPostsData = action.payload;
    });
    builder.addCase(getFollowedPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //update post reducer
    builder.addCase(updatePostAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updatePostData = action?.payload;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //delete post reducer
    builder.addCase(deletePostAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.deletePostData = action?.payload;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //archive post reducer
    builder.addCase(archivePostAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(archivePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.archivePostData = action?.payload;
    });
    builder.addCase(archivePostAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
  },
});

export const selectPostLoading = (state) => state.post.loading;
export const selectPostError = (state) => state.post.error;
export const selectPostPost = (state) => state.post.postPostData;
export const selectGetPost = (state) => state.post.getPostData;
export const selectGetPetPosts = (state) => state.post.getPetPostsData;
export const selectGetAllPosts = (state) => state.post.getAllPostsData;
export const selectGetFollowedPosts = (state) =>
  state.post.getFollowedPostsData;
export const selectUpdatePost = (state) => state.post.updatePostData;
export const selectDeletePost = (state) => state.post.deletePostData;
export const selectArchivePost = (state) => state.post.archivePostData;

export default postSlice.reducer;
