import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

// REDUCERS
import userReducer from "./reducers/userReducer";
import confirmReducer from "./reducers/confirmReducer";
import assetsReducer from "./reducers/assetsReducer";

// SAGAS
import userSaga from "./sagas/userSaga";
import confirmSaga from "./sagas/confirmSaga";
import assetsSaga from "./sagas/assetsSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { userReducer, confirmReducer, assetsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, logger),
});

sagaMiddleware.run(userSaga);
sagaMiddleware.run(confirmSaga);
sagaMiddleware.run(assetsSaga);

export default store;
