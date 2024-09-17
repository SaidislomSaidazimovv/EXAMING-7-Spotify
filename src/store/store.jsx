import { configureStore } from "@reduxjs/toolkit";
import LikeSlice from "./LikeSlice";
export const store = configureStore({
  reducer: LikeSlice,
});
