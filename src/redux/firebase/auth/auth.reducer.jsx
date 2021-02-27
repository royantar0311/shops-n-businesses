import authTypes from './auth.types'

const initialState = {
    currentUser: null,
    isAdmin: false
}


const authReducer = (state = initialState, action) => {
    switch(action.type){
        case authTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        case authTypes.CLEAR_CURRENT_USER:
            return {
                ...state,
                currentUser: null
            };
        case authTypes.GET_IS_ADMIN:
            return {
                ...state,
                isAdmin: action.payload
            };

        case authTypes.CLEAR_ADMIN:
            return {
                ...state,
                isAdmin: false
            }
        default:
            return state;
    }
}
export default authReducer;