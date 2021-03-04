import businessesTypes from './businesses.types';

const initialState = {
    businesses: []
}

const businessReducer = (state = initialState, action) => {
    switch(action.type){
        case businessesTypes.FETCH_BUSINESSES: 
            return {
                ...state,
                businesses: action.payload
            };
        case businessesTypes.ADD_BUSINESS:
            const businesses = state.businesses;
            businesses.push(action.payload);
            return {
                ...state,
                businesses
            }
        default: 
            return state;
    }
}

export default businessReducer;
