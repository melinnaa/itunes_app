import { createStore } from 'redux';
import musicSliceReducer from "./slices/MusicSlice";
import { configureStore } from "@reduxjs/toolkit";

export let store = configureStore({
  reducer: {
    musics: musicSliceReducer
  },
});

