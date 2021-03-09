import categoriesTypes from './categories.types';
import { db, storage } from '../../../configs/firebase.config'

export const fetchCategories = () => async (dispatch) => {
    try{
        dispatch({
            type: categoriesTypes.LOADING
        })
        const querySnapshot = await db.collection('categories').get();
        const data = [];
        querySnapshot.forEach(async (doc) => {
            const docData = doc.data();
            docData.image = await storage.ref(`categories/${docData.uid}`).getDownloadURL();
            console.log(docData.image);
            data.push(docData);
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
        await db.collection('categories').doc(data.uid).set({
            description: data.description,
            uid: data.uid,
            name: data.name,
        });
        const metadata = {
            contentType: data.image.type
        }
        const snapshot = await storage.ref().child(`categories/${data.uid}`).put(data.image, metadata);
        data.image = await snapshot.ref.getDownloadURL();
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
