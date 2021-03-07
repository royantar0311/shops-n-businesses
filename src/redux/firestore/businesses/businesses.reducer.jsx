import businessesTypes from './businesses.types';

const initialState = {
    businesses: []
}

const businessReducer = (state = initialState, action) => {
    let businesses;
    switch(action.type){
        case businessesTypes.FETCH_BUSINESSES: 
            return {
                ...state,
                businesses: action.payload
            };
        case businessesTypes.ADD_BUSINESS:
            businesses = state.businesses.filter(business => business.uid !== action.payload.uid);
            businesses.push(action.payload);
            return {
                ...state,
                businesses
            }
        case businessesTypes.DELETE_BUSINESS:
            return {
                ...state,
                businesses: state.businesses.filter (business => business.uid !== action.payload.uid)
            }
        case businessesTypes.CHANGE_BUSINESS_CATEGORY:
            return {
                ...state,
                businesses: action.payload
            }
        default: 
            return state;
    }
}

export default businessReducer;
