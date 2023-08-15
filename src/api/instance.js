import axios from "axios";

export default axios.create({
  baseURL: "https://lorenzon-5479d-default-rtdb.firebaseio.com/musics.json",
});
