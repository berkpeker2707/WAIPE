import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://192.168.100.23:1000/api";

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

const petSlice = createSlice({
  name: "pet",
  initialState: {
    loading: false,
    error: null,
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
  },
});

export const selectPetLoading = (state) => state.pet.loading;
export const selectPetError = (state) => state.pet.error;
export const selectGetPet = (state) => state.pet.getPetData;

export default petSlice.reducer;
