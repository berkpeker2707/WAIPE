import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorege from "@react-native-async-storage/async-storage";
import axios from "axios";

const SERVER_URL = "http://192.168.100.21:1000/api";

export const getPetAction = createAsyncThunk(
  "pet/getPet",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${SERVER_URL}/pet/${id}`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const postPetAction = createAsyncThunk(
  "pet/postPet",
  async (postID, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(`${SERVER_URL}/pet/new`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const updatePetAction = createAsyncThunk(
  "pet/updatePet",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${SERVER_URL}/pet/update/${id}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const uploadPetPhotoAction = createAsyncThunk(
  "pet/uploadPetPhoto",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/pet/upload/photo/${id}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const deletePetPhotoAction = createAsyncThunk(
  "pet/deletePetPhoto",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${SERVER_URL}/post/update/${id}}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const deletePetAction = createAsyncThunk(
  "pet/deletePet",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${SERVER_URL}/pet/delete/photo/${id}}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

const petSlice = createSlice({
  name: "pet",
  initialState: {
    loading: false,
    error: null,
    getPetData: null,
    postPetData: null,
    updatePetData: null,
    uploadPetPhotoData: null,
    deletePetPhotoData: null,
    deletePetData: null,
  },
  extraReducers: (builder) => {
    //get pet reducer
    builder.addCase(getPetAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.getPetData = action?.payload;
    });
    builder.addCase(getPetAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //post pet reducer
    builder.addCase(postPetAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postPetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.postPetData = action?.payload;
    });
    builder.addCase(postPetAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //update pet reducer
    builder.addCase(updatePetAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updatePetData = action?.payload;
    });
    builder.addCase(updatePetAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //upload pet photo reducer
    builder.addCase(uploadPetPhotoAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadPetPhotoAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.uploadPetPhotoData = action?.payload;
    });
    builder.addCase(uploadPetPhotoAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //delete pet photo reducer
    builder.addCase(deletePetPhotoAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePetPhotoAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.deletePetPhotoData = action?.payload;
    });
    builder.addCase(deletePetPhotoAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    //delete pet reducer
    builder.addCase(deletePetAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePetAction.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.deletePetData = action?.payload;
    });
    builder.addCase(deletePetAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
  },
});

export const selectPetLoading = (state) => state.pet.loading;
export const selectPetError = (state) => state.pet.error;
export const selectGetPet = (state) => state.pet.getPetData;
export const selectPostPet = (state) => state.pet.postPetData;
export const selectUpdatePet = (state) => state.pet.updatePetData;
export const selectUploadPetPhoto = (state) => state.pet.uploadPetPhotoData;
export const selectDeletePetPhoto = (state) => state.pet.deletePetPhotoData;
export const selectDeletePet = (state) => state.pet.deletePostData;

export default petSlice.reducer;
