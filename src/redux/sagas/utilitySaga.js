import { takeEvery, call, put } from "redux-saga/effects";
import { setDarkmode, setSidebar } from "../reducers/utilityReducer";

function* workSetDarkmode(action) {
  yield put(setDarkmode());
  return;
}

function* workSetSidebar(action) {
  yield put(setSidebar());
  return;
}

export default function* utilitySaga() {
  yield takeEvery("SET_DARKMODE", workSetDarkmode);
  yield takeEvery("SET_SIDEBAR", workSetSidebar);
}
