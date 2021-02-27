import categoriesTypes from './categories.types';
import { db } from '../../../configs/firebase.config'
export const fetchCategories = () => async (dispatch) => {
    try{
        const querySnapshot = await db.collection('categories').get();
        const data = [];
        querySnapshot.forEach((doc) => {
        data.push(doc.data());
        })
        dispatch({
            type: categoriesTypes.FETCH_CATEGORIES,
            payload: data
        })
    }catch(err){
        console.log(err);
    }
} 