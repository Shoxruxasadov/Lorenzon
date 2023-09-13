import { takeEvery, call, put } from "redux-saga/effects";
import { setSidebar, setContentMusic } from "../reducers/utilityReducer";

function* workSetSidebar(action) {
  yield put(setSidebar());
  return;
}

function* workSetContentMusic(action) {
  yield put(setContentMusic());
  return;
}

export default function* utilitySaga() {
  yield takeEvery("SET_SIDEBAR", workSetSidebar);
  yield takeEvery("SET_CONTENT_MUSIC", workSetContentMusic);
}
