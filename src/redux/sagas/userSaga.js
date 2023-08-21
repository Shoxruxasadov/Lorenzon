import { takeEvery, call, put } from "redux-saga/effects";
import { getUsers, getSort } from "../reducers/userReducer";

function* workGetUsers(action) {
  for (let i = 0; i < action.payload.length; i++) {
    delete action.payload[i].timeStamp;
  }
  for (let i = 0; i < action.payload.length; i++) {
    action.payload[i].birthday =
      action.payload[i].birthday && action.payload[i].birthday.seconds;
  }
  yield put(getUsers(action.payload));
  return;
}

function* workSetSort(action) {
  yield put(getSort());
  return;
}

export default function* userSaga() {
  yield takeEvery("GET_USERS", workGetUsers);
  yield takeEvery("SET_SORT", workSetSort);
}
