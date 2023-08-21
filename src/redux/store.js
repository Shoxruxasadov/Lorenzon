import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

// REDUCERS
import userReducer from "./reducers/userReducer";
import confirmReducer from "./reducers/confirmReducer";
import utilityReducer from "./reducers/utilityReducer";

// SAGAS
import userSaga from "./sagas/userSaga";
import confirmSaga from "./sagas/confirmSaga";
import utilitySaga from "./sagas/utilitySaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { userReducer, confirmReducer, utilityReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, logger),
});

sagaMiddleware.run(userSaga);
sagaMiddleware.run(confirmSaga);
sagaMiddleware.run(utilitySaga);

export default store;
