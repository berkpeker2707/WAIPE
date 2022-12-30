import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
const mime = require("mime");

const SERVER_URL = "http://192.168.100.23:1000/api";
const updatedPet = createAction("pet/update");

export const getPetAction = createAsyncThunk(
  "pet/getPet",
  async (id, { rejectWithValue, getState }) => {
    //get employee token
    const auth = getState()?.auth;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${SERVER_URL}/pet/${id}`, config);

      console.log(data);

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

      formData.append("picture", {
        name: fileName,
        type: mime.getType(trimmedURI),
        uri: trimmedURI,
      });

      const { data } = await axios.post(
        `${SERVER_URL}/pet/upload/photo/${petID}`,
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
  },
});

export const selectPetLoading = (state) => state.pet.loading;
export const selectPetError = (state) => state.pet.error;
export const selectGetPet = (state) => state.pet.getPetData;
export const selectPetUpdated = (state) => {
  return state.pet.isUpdated;
};

export default petSlice.reducer;
