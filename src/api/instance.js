import axios from "axios";

export default axios.create({
  baseURL: "https://lorezoz-default-rtdb.firebaseio.com/",
});

// https://lorezoz-default-rtdb.firebaseio.com/.json
// https://lorezoz-default-rtdb.firebaseio.com/musics.json

// https://lorezoz-default-rtdb.firebaseio.com/artists.json
// https://lorezoz-default-rtdb.firebaseio.com/artists/songs.json

// https://lorezoz-default-rtdb.firebaseio.com/albums.json
// https://lorezoz-default-rtdb.firebaseio.com/albums/songs.json

// https://lorezoz-default-rtdb.firebaseio.com/playlists.json
// https://lorezoz-default-rtdb.firebaseio.com/playlists/songs.json
