import categoriesTypes from "./categories.types";

const initialState = {
    categories: [],
    isLoading: false
};

const categoriesReducer = (state = initialState, action) => { 
    let categories;
    switch(action.type){
        case categoriesTypes.FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                isLoading: false
            };
        case categoriesTypes.ADD_CATEGORY:
            categories = state.categories.filter(category => category.uid !== action.payload.uid);
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
        case categoriesTypes.EDIT_CATEGORY:
            categories = state.categories.filter(category => category.uid !== action.payload.uid);
            categories.push(action.payload);
            return {
                ...state,
                categories
            }

        default:
             return state;
    }
}

export default categoriesReducer;