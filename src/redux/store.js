import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

// REDUCERS
import userReducer from "./reducers/userReducer";
import confirmReducer from "./reducers/confirmReducer";
import utilityReducer from "./reducers/utilityReducer";
import musicsReducer from "./reducers/musicsReducer";

// SAGAS
import userSaga from "./sagas/userSaga";
import confirmSaga from "./sagas/confirmSaga";
import utilitySaga from "./sagas/utilitySaga";
import musicsSaga from "./sagas/musicsSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { userReducer, confirmReducer, utilityReducer, musicsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(userSaga);
sagaMiddleware.run(confirmSaga);
sagaMiddleware.run(utilitySaga);
sagaMiddleware.run(musicsSaga);

export default store;
