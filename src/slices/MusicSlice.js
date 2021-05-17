import { createSlice } from "@reduxjs/toolkit";

export const MusicSlice = createSlice({
  name: "musics",
  initialState: [],
  reducers: {
    addMusic: (state, action) => {
      return [
        ...state,
        action.payload,
      ];
    }
  },
});

export const { addMusic } = MusicSlice.actions;
export default MusicSlice.reducer;

export const musicSelector = (state) => state.musics;

