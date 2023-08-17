import { takeEvery, call, put } from "redux-saga/effects";
import { setConfirm, setUser } from "../reducers/confirmReducer";

function* workSetConfirm(action) {
  delete action.payload.timeStamp;
  yield put(setConfirm(action.payload));
  yield localStorage.setItem("confirm", JSON.stringify(action.payload));
  return;
}

function* workSetUser(action) {
  delete action.payload.timeStamp;
  yield put(setUser(action.payload));
  yield localStorage.setItem("user", JSON.stringify(action.payload));
  return;
}

export default function* userSaga() {
  yield takeEvery("SET_CONFIRM", workSetConfirm);
  yield takeEvery("SET_USER", workSetUser);
}
