import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

// REDUCERS
import userReducer from "./reducers/userReducer";
import confirmReducer from "./reducers/confirmReducer";

// SAGAS
import userSaga from "./sagas/userSaga";
import confirmSaga from "./sagas/confirmSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { userReducer, confirmReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, logger)
});

sagaMiddleware.run(userSaga);
sagaMiddleware.run(confirmSaga);

export default store;
