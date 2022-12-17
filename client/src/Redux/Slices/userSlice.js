import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
const mime = require("mime");

const SERVER_URL = "http://192.168.100.23:1000/api";
const updatedUser = createAction("user/update");

export const getCurrentUserAction = createAsyncThunk(
  "user/me",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.auth?.token;

      const { data } = await axios.get(`${SERVER_URL}/user/me`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "user/update",
  async (userUpdateInfo, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.auth?.token;

      const { data } = await axios.put(
        `${SERVER_URL}/user/update`,
        userUpdateInfo,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(updatedUser());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const pictureUploadAction = createAsyncThunk(
  "user/pictureUploadAction",
  async (pictureInfo, { rejectWithValue, getState, dispatch }) => {
    try {
      const uri = pictureInfo.uri;
      const token = getState()?.auth?.token;

      const FormData = global.FormData;
      const formData = new FormData();

      const trimmedURI =
        Platform.OS === "android" ? uri : uri.replace("file://", "");
      const fileName = trimmedURI.split("/").pop();

      formData.append("picture", {
        name: fileName,
        type: mime.getType(trimmedURI),
        uri: trimmedURI,
      });

      const { data } = await axios.post(
        `${SERVER_URL}/user/upload/profile/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
          transformRequest: (data, headers) => {
            return formData;
          },
        }
      );

      dispatch(updatedUser());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const pictureDeleteAction = createAsyncThunk(
  "/user/pictureDeleteAction",
  async (pictureUrl, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.auth?.token;

      const { data } = await axios.delete(
        `${SERVER_URL}/user/delete/profile/image`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        pictureUrl
      );

      dispatch(updatedUser());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
    isUpdated: false,
  },
  extraReducers: (builder) => {
    builder.addCase(updatedUser, (state) => {
      state.isUpdated = true;
    });
    //get current user reducer
    builder.addCase(getCurrentUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action?.payload;
    });
    builder.addCase(getCurrentUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    // //get user reducer
    // builder.addCase(getUserAction.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(getUserAction.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.userData = action?.payload;
    // });
    // builder.addCase(getUserAction.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action?.error;
    // });
    //update user reducer
    builder.addCase(updateUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateUserAction.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.isUpdated = false;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    // //block user reducer
    // builder.addCase(blockUserAction.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(blockUserAction.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.blockUserData = action?.payload;
    // });
    // builder.addCase(blockUserAction.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action?.error;
    // });
    // //follow pet reducer
    // builder.addCase(followPetAction.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(followPetAction.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.followPetData = action?.payload;
    // });
    // builder.addCase(followPetAction.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action?.error;
    // });
    // //block pet reducer
    // builder.addCase(blockPetAction.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(blockPetAction.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.blockPetData = action?.payload;
    // });
    // builder.addCase(blockPetAction.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action?.error;
    // });
    //picture upload reducer
    builder.addCase(pictureUploadAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(pictureUploadAction.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.isUpdated = false;
    });
    builder.addCase(pictureUploadAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //picture delete reducer
    builder.addCase(pictureDeleteAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(pictureDeleteAction.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.isUpdated = false;
    });
    builder.addCase(pictureDeleteAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    // //user delete reducer
    // builder.addCase(userDeleteAction.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(userDeleteAction.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.userDeleteData = action?.payload;
    // });
    // builder.addCase(userDeleteAction.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action?.error;
    // });
  },
});

export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};
export const selectUser = (state) => {
  return state.user.userData;
};
export const selectBlockUser = (state) => {
  return state.user.blockUserData;
};
export const selectFollowPet = (state) => {
  return state.user.followPetData;
};
export const selectBlockPet = (state) => {
  return state.user.blockPetData;
};
export const selectPictureDelete = (state) => {
  return state.user.pictureDeleteData;
};
export const selectUserDelete = (state) => {
  return state.user.userDeleteData;
};
export const selectUserUpdated = (state) => {
  return state.user.isUpdated;
};
export default userSlice.reducer;
