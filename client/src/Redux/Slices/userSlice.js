import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://192.168.100.21:1000/api";

export const getCurrentUserAction = createAsyncThunk(
  "user/getCurrentUserAction",
  async (token, { rejectWithValue }) => {
    try {
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

export const getUserAction = createAsyncThunk(
  "user/getUserAction",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/user/${_id}}`, {
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
  "user/updateUserAction",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${SERVER_URL}/user/update`, {
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

export const blockUserAction = createAsyncThunk(
  "user/blockUserAction",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${SERVER_URL}/user/block/user`, {
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

export const followPetAction = createAsyncThunk(
  "user/followPetAction",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${SERVER_URL}/user/follow/pet`, {
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

export const blockPetAction = createAsyncThunk(
  "user/blockPetAction",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${SERVER_URL}/user/block/pet`, {
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

export const pictureUploadAction = createAsyncThunk(
  "user/pictureUploadAction",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/user/upload/profile/image`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const pictureDeleteAction = createAsyncThunk(
  "user/pictureDeleteAction",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${SERVER_URL}/user/delete/profile/image`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDeleteAction = createAsyncThunk(
  "user/userDeleteAction",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${SERVER_URL}/user/delete`, {
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    currentUserData: null,
    userData: null,
    updateUserData: null,
    blockUserData: null,
    followPetData: null,
    blockPetData: null,
    pictureUploadData: null,
    pictureDeleteData: null,
    userDeleteData: null,
  },
  extraReducers: (builder) => {
    //get current user reducer
    builder.addCase(getCurrentUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUserData = action?.payload;
    });
    builder.addCase(getCurrentUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //get user reducer
    builder.addCase(getUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userData = action?.payload;
    });
    builder.addCase(getUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //update user reducer
    builder.addCase(updateUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updateUserData = action?.payload;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //block user reducer
    builder.addCase(blockUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.blockUserData = action?.payload;
    });
    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //follow pet reducer
    builder.addCase(followPetAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(followPetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.followPetData = action?.payload;
    });
    builder.addCase(followPetAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //block pet reducer
    builder.addCase(blockPetAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(blockPetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.blockPetData = action?.payload;
    });
    builder.addCase(blockPetAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //picture upload reducer
    builder.addCase(pictureUploadAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(pictureUploadAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.pictureUploadData = action?.payload;
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
    builder.addCase(pictureDeleteAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.pictureDeleteData = action?.payload;
    });
    builder.addCase(pictureDeleteAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //user delete reducer
    builder.addCase(userDeleteAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userDeleteAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userDeleteData = action?.payload;
    });
    builder.addCase(userDeleteAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
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
export const selectUpdateUser = (state) => {
  return state.user.updateUserData;
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
export const selectpictureUpload = (state) => {
  return state.user.pictureUploadData;
};
export const selectPictureDelete = (state) => {
  return state.user.pictureDeleteData;
};
export const selectUserDelete = (state) => {
  return state.user.userDeleteData;
};

export default userSlice.reducer;
