import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

var api_url;
if (__DEV__) {
  api_url = "http://192.168.100.98:5001/api";
} else {
  api_url = "https://waipe-server.azurewebsites.net/api";
}

export const postPostReportAction = createAsyncThunk(
  "report/post",
  async (postDetail, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.auth?.token;

      const { data } = await axios.post(
        `${api_url}/report/post/create`,
        postDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const postUserReportAction = createAsyncThunk(
  "report/user",
  async (userDetail, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.auth?.token;

      const { data } = await axios.post(
        `${api_url}/report/user/create`,
        userDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const postCommentReportAction = createAsyncThunk(
  "report/comment",
  async (commentDetail, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.auth?.token;

      const { data } = await axios.post(
        `${api_url}/report/comment/create`,
        commentDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const postPetReportAction = createAsyncThunk(
  "report/pet",
  async (petDetail, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.auth?.token;

      const { data } = await axios.post(
        `${api_url}/report/pet/create`,
        petDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    loading: false,
    error: null,
    postReportRes: null,
    commentReportRes: null,
    petReportRes: null,
    userReportRes: null,
  },
  extraReducers: (builder) => {
    builder.addCase(postPostReportAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postPostReportAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.postReportRes = action?.payload;
    });
    builder.addCase(postPostReportAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
      state.postReportRes = null;
    });
    builder.addCase(postUserReportAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postUserReportAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userReportRes = action?.payload;
    });
    builder.addCase(postUserReportAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
      state.userReportRes = null;
    });
    builder.addCase(postCommentReportAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postCommentReportAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.commentReportRes = action?.payload;
    });
    builder.addCase(postCommentReportAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
      state.commentReportRes = null;
    });
    builder.addCase(postPetReportAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postPetReportAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.petReportRes = action?.payload;
    });
    builder.addCase(postPetReportAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
      state.petReportRes = null;
    });
  },
});

export const selectPostReportRes = (state) => state.report.postReportRes;
export const selectUserReportRes = (state) => state.report.userReportRes;
export const selectCommentReportRes = (state) => state.report.commentReportRes;
export const selectPetReportRes = (state) => state.report.petReportRes;

export default reportSlice.reducer;
