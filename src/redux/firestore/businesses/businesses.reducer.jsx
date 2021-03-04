import businessesTypes from './businesses.types';

const initialState = {
    businesses: []
}

const businessReducer = (state = initialState, action) => {
    console.log('dispatched');
    const businesses = state.businesses;
    switch(action.type){
        case businessesTypes.FETCH_BUSINESSES: 
            return {
                ...state,
                businesses: action.payload
            };
        case businessesTypes.ADD_BUSINESS:
            businesses.push(action.payload);
            return {
                ...state,
                businesses
            }
        case businessesTypes.DELETE_BUSINESS:
            return {
                ...state,
                businesses: businesses.filter (business => business.uid !== action.payload.uid)
            }
        default: 
            return state;
    }
}

export default businessReducer;
