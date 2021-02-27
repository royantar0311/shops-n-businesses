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
        default: 
            return state;
    }
}

export default businessReducer;
