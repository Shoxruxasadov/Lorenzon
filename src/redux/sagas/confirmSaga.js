import { takeEvery, call, put } from "redux-saga/effects";
import { getConfirm } from "../reducers/confirmReducer";

function* workGetConfirm(action) {
  yield put(getConfirm(action.payload));
  yield localStorage.setItem("user", JSON.stringify(action.payload));
  return;
}

export default function* userSaga() {
  yield takeEvery("GET_CONFIRM", workGetConfirm);
}
