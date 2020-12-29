// import {createStore, applyMiddleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";
// import thunk from "redux-thunk";

import rootReducer from "./reducers";
import rootSaga from "./sagas"

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

// const store = createStore(rootReducer, applyMiddleware([sagaMiddleware, thunk]))
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

export default store;