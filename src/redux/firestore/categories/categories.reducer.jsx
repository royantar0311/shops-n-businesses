import categoriesTypes from "./categories.types";

const initialState = {
    categories: [],
    isLoading: false
};

const categoriesReducer = (state = initialState, action) => { 
    switch(action.type){
        case categoriesTypes.FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                isLoading: false
            };
        case categoriesTypes.ADD_CATEGORY:
            const categories = state.categories;
            categories.push(action.payload)
            return {
                ...state,
                categories
            }
        case categoriesTypes.LOADING:
            return {
                ...state,
                isLoading: true,
            }
        default:
             return state;
    }
}

export default categoriesReducer;