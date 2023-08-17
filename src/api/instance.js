import axios from "axios";

export default axios.create({
  baseURL: "https://lorezoz-default-rtdb.firebaseio.com//musics.json",
});
