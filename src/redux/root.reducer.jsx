import { combineReducers } from 'redux';
import categoriesReducer from './firestore/categories/categories.reducer';
import businessReducer from './firestore/businesses/businesses.reducer';

const rootReducer = combineReducers({
    categories: categoriesReducer,
    businesses: businessReducer
})

export default rootReducer;