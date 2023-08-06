import { takeEvery, call, put } from "redux-saga/effects";
import { getUsers } from "../reducers/userReducer";
import axios from "axios";

function* workGetUsers(action) {
  yield put(getUsers(action.payload));
  return;
}

export default function* userSaga() {
  yield takeEvery("GET_USERS", workGetUsers);
}
