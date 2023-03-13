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
  async (postDetail, { rejectWithValue, getState, dispatch }) => {
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
  },
});

export const selectPostReportRes = (state) => state.report.postReportRes;

export default reportSlice.reducer;
