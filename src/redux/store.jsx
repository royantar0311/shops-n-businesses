import rootReducer from './root.reducer';
import {  applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const middleWares = [thunk];
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleWares))
)
export default store;