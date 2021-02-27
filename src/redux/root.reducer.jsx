import { combineReducers } from 'redux';
import categoriesReducer from './firestore/categories/categories.reducer';
import businessReducer from './firestore/businesses/businesses.reducer';
import authReducer from './firebase/auth/auth.reducer';

const rootReducer = combineReducers({
    categories: categoriesReducer,
    businesses: businessReducer,
    auth: authReducer
})

export default rootReducer;