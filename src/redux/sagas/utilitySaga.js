import { takeEvery, call, put } from "redux-saga/effects";
import { setSidebar } from "../reducers/utilityReducer";

function* workSetSidebar(action) {
  yield put(setSidebar());
  return;
}

export default function* utilitySaga() {
  yield takeEvery("SET_SIDEBAR", workSetSidebar);
}
