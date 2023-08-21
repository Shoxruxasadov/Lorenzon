import { takeEvery, call, put } from "redux-saga/effects";
import { setDarkmode, setSidebar } from "../reducers/assetsReducer";

function* workSetDarkmode(action) {
  yield put(setDarkmode());
  return;
}

function* workSetSidebar(action) {
  yield put(setSidebar());
  return;
}

export default function* userSaga() {
  yield takeEvery("SET_DARKMODE", workSetDarkmode);
  yield takeEvery("SET_SIDEBAR", workSetSidebar);
}
