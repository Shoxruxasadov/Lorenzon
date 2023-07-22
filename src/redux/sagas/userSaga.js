import { takeEvery, call, put } from "redux-saga/effects";
import { getUsers } from "../reducers/userReducer";
import axios from "axios";

function* workGetUsers() {
  // const res = yield axios.get("https://ogserver.onrender.com/goods");
  // yield put(getUsers(res.data));
  return;
}

export default function* userSaga() {
  yield takeEvery("GET_USERS", workGetUsers);
}
