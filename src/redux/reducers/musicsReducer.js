import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artists: [],
  playlists: [],
  albums: [],
  musics: [],
};

export const musicsSlice = createSlice({
  name: "musics",
  initialState,
  reducers: {
    getArtists: (state, action) => {
      state.artists = action.payload;
    },
    getPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    getAlbums: (state, action) => {
      state.albums = action.payload;
    },
    getMusics: (state, action) => {
      state.musics = action.payload;
    },
  },
});

export const { getArtists, getPlaylists,getAlbums,getMusics } = musicsSlice.actions;

export default musicsSlice.reducer;
