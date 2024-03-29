import categoriesTypes from './categories.types';
import { db } from '../../../configs/firebase.config'

export const fetchCategories = () => async (dispatch) => {
    try{
        dispatch({
            type: categoriesTypes.LOADING
        })
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
export const addCategory = (data) => async (dispatch) => {
    try{
        await db.collection('categories').doc(data.uid).set(data);
        dispatch({
            type: categoriesTypes.ADD_CATEGORY,
            payload: data
        })
    }catch(err){
        console.log(err);
    }
}
export const editCategory = (data) => async (dispatch) => {
    dispatch({
        type: categoriesTypes.EDIT_CATEGORY,
        payload: data
    })
    await db.collection('categories').doc(data.uid).update(data);
}
