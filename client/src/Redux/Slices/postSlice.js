import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorege from "@react-native-async-storage/async-storage";
import axios from "axios";

const SERVER_URL = "http://192.168.100.47:1000/api";

export const getAllPosts = createAsyncThunk(
  "post/getAll",
  async (fetchPostsInfo, { rejectWithValue, getState, dispatch }) => {
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

export const getPost = createAsyncThunk(
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

      console.log("data");
      console.log(data);
      console.log("data");
      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

// //get announcement action ***
// export const getAnnouncementAction = createAsyncThunk(
//   "get/announcement",
//   async (payload, { rejectWithValue, getState, dispatch }) => {
//     //get employee token
//     const employeeState = getState()?.employeeState;
//     const { employeeAuthState } = employeeState;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${employeeAuthState?.token}`,
//       },
//     };
//     try {
//       const { data } = await axios.get(`${api_url}/api/announcements`, config);
//       return data;
//     } catch (err) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

const postSlice = createSlice({
  name: "post",
  initialState: { loading: false },
  extraReducers: (builder) => {
    //get all posts reducer
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.allPost = action?.payload;
      state.error = action?.payload?.message;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //get a post reducer
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action?.payload;
      state.error = action?.payload?.message;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
  },
});

export default postSlice.reducer;
