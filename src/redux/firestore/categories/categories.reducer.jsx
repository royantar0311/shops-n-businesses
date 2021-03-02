import categoriesTypes from "./categories.types";

const initialState = {
    categories: []
};

const categoriesReducer = (state = initialState, action) => { 
    switch(action.type){
        case categoriesTypes.FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case categoriesTypes.ADD_CATEGORY:
            const categories = state.categories;
            categories.push(action.payload)
            return {
                ...state,
                categories
            }
        default:
             return state;
    }
}

export default categoriesReducer;