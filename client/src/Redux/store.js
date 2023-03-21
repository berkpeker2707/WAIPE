import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authSlice from "./Slices/authSlice";
import userSlice from "./Slices/userSlice";
import postSlice from "./Slices/postSlice";
import petSlice from "./Slices/petSlice";
import commentSlice from "./Slices/commentSlice";
import likeSlice from "./Slices/likeSlice";
import reportSlice from "./Slices/reportSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  post: postSlice,
  pet: petSlice,
  comment: commentSlice,
  like: likeSlice,
  report: reportSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      serializableCheck: false,
    }),
});
