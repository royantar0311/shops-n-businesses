import rootReducer from './root.reducer';
import {  applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const middleWares = [thunk, logger];
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleWares))
)
export default store;