import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
const mime = require("mime");

var api_url;
if (__DEV__) {
  api_url = "http://192.168.100.78:5001/api";
} else {
  api_url = "https://waipe-server.azurewebsites.net/api";
}

const updatedPet = createAction("pet/update");

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
      const { data } = await axios.get(`${api_url}/pet/${id}`, config);

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
      const { data } = await axios.post(`${api_url}/pet/new`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const updatePetAction = createAsyncThunk(
  "pet/updatePet",
  async (updateInfo, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    try {
      const petID = updateInfo.petID;
      const token = getState()?.auth?.token;
      const { data } = await axios.put(
        `${api_url}/pet/update/${petID}`,
        updateInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(updatedPet());
      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const deletePetPhotoAction = createAsyncThunk(
  "pet/deletePetPhoto",
  async (deleteInfo, { rejectWithValue, getState, dispatch }) => {
    //get employee token
    try {
      const petID = deleteInfo.petID;
      const token = getState()?.auth?.token;

      const { data } = await axios.delete(
        `${api_url}/pet/delete/photo/${petID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            selectedPhoto: deleteInfo.picture,
          },
        }
      );

      dispatch(updatedPet());
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
        `${api_url}/pet/delete/photo/${id}}`,
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
  async (uploadInfo, { rejectWithValue, getState, dispatch }) => {
    try {
      const uri = uploadInfo.uri;
      const petID = uploadInfo.petID;
      const token = getState()?.auth?.token;

      const FormData = global.FormData;
      const formData = new FormData();

      const trimmedURI =
        Platform.OS === "android" ? uri : uri.replace("file://", "");
      const fileName = trimmedURI.split("/").pop();

      formData.append("image", {
        name: fileName,
        type: mime.getType(trimmedURI),
        uri: trimmedURI,
      });

      const { data } = await axios.post(
        `${api_url}/pet/upload/photo/${petID}`,
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

      dispatch(updatedPet());
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
    isUpdated: false,
    postPetData: null,
    updatePetData: null,
    uploadPetPhotoData: null,
    deletePetPhotoData: null,
    deletePetData: null,
  },
  extraReducers: (builder) => {
    builder.addCase(updatedPet, (state) => {
      state.isUpdated = true;
    });
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
      state.isUpdated = false;
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
      state.isUpdated = false;
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
    builder.addCase(deletePetPhotoAction.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.isUpdated = false;
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
export const selectPetUpdated = (state) => {
  return state.pet.isUpdated;
};
export const selectPostPet = (state) => state.pet.postPetData;
export const selectUpdatePet = (state) => state.pet.updatePetData;
export const selectUploadPetPhoto = (state) => state.pet.uploadPetPhotoData;
export const selectDeletePetPhoto = (state) => state.pet.deletePetPhotoData;
export const selectDeletePet = (state) => state.pet.deletePostData;

export default petSlice.reducer;
