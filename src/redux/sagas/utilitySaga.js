import { takeEvery, call, put } from "redux-saga/effects";
import {
  setSidebar,
  setMedia,
  setCurrentMusic,
  setPouse,
  setFollow,
} from "../reducers/utilityReducer";

function* workSetSidebar(action) {
  yield put(setSidebar());
  return;
}

function* workSetContentMusic(action) {
  yield put(setMedia(action.payload));
  return;
}

function* workSetCurrentMusic(action) {
  yield put(setCurrentMusic(action.payload));
  yield put(setPouse(true));
  return;
}

function* workSetPouse(action) {
  yield put(setPouse(action.payload));
  return;
}

function* workSetFollow(action) {
  yield put(setFollow());
  return;
}

export default function* utilitySaga() {
  yield takeEvery("SET_SIDEBAR", workSetSidebar);
  yield takeEvery("SET_MEDIA", workSetContentMusic);
  yield takeEvery("SET_CURRENT_MUSIC", workSetCurrentMusic);
  yield takeEvery("SET_POUSE", workSetPouse);
  yield takeEvery("SET_FOLLOW", workSetFollow);
}
