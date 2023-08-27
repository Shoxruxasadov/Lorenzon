import { takeEvery, call, put } from "redux-saga/effects";
import {
  getArtists,
  getPlaylists,
  getAlbums,
  getMusics,
} from "../reducers/musicsReducer";
import api from "../../api/instance";

function* workGetArtists(action) {
  const response = yield call(api.get, "/artists.json");
  yield put(getArtists(Object.values(response.data).reverse()));
  return;
}

function* workGetPlaylists(action) {
  const response = yield call(api.get, "/playlists.json");
  yield put(getPlaylists(Object.values(response.data).reverse()));
  return;
}

function* workGetAlbums(action) {
  const response = yield call(api.get, "/albums.json");
  yield put(getAlbums(Object.values(response.data).reverse()));
  return;
}

function* workGetMusics(action) {
  const response = yield call(api.get, "/musics.json");
  yield put(getMusics(Object.values(response.data).reverse()));
  return;
}

export default function* musicsSaga() {
  yield takeEvery("GET_ARTISTS", workGetArtists);
  yield takeEvery("GET_PLAYLISTS", workGetPlaylists);
  yield takeEvery("GET_ALBUMS", workGetAlbums);
  yield takeEvery("GET_MUSICS", workGetMusics);
}
