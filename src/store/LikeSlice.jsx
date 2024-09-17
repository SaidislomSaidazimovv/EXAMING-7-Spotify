import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  likedArray: JSON.parse(window.localStorage.getItem("tracks")) || [],
};

const LikeSlice = createSlice({
  name: "LikeSlice",
  initialState,
  reducers: {
    addArray: (state, action) => {
      const { track } = action.payload;
      const isAlreadyLiked = state.likedArray.some(
        (item) => item.track.id === track.id
      );

      if (!isAlreadyLiked) {
        state.likedArray.push({ ...action.payload, isLiked: true });
        toast.success("Music Liked");
      } else {
        const index = state.likedArray.findIndex(
          (item) => item.track.id === track.id
        );
        if (index !== -1) {
          state.likedArray[index].isLiked = true;
          toast.error("Music Already Liked");
        }
      }
      window.localStorage.setItem("tracks", JSON.stringify(state.likedArray));
    },
  },
});

export const { addArray } = LikeSlice.actions;
export default LikeSlice.reducer;
