import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

// REDUCERS
import userReducer from "./reducers/userReducer";

// SAGAS
import userSaga from "./sagas/userSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { userReducer: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(userSaga);

export default store;
