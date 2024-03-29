import { db } from '../../../configs/firebase.config'
import businessesTypes from './businesses.types';

export const fetchBusinesses = () => async (dispatch) => {
    try{
        const querySnapshot = await db.collection('businesses').get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        })
        dispatch({
            type: businessesTypes.FETCH_BUSINESSES,
            payload: data
        })
    }catch(err){
        console.log(err);
    }
}

export const setBusiness = (data) => async (dispatch) => {

        await db.collection('businesses').doc(data.uid)
            .set(data);
        dispatch({
            type: businessesTypes.ADD_BUSINESS,
            payload: data
        })
        
}

export const deleteBusiness = (business) => async (dispatch) => {
    try{
        dispatch({
            type: businessesTypes.DELETE_BUSINESS,
            payload: business
        })
        await db.collection('businesses').doc(business.uid).delete();
    
    }
    catch(err){
        console.log(err);
    }
}

export const editBusinessCategory = (_, oldCategoryName, newCategoryName) => async (dispatch) => {
    const businesses = [];
    const querySnapshot = await db.collection('businesses').get();
        querySnapshot.forEach(async (doc) => {
            if(doc.exists && doc.data()){
                const data = doc.data();
                if(data.category === oldCategoryName){
                    data.category = newCategoryName;
                    await db.collection('businesses').doc(data.uid).update(data);
                }
                businesses.push(data);
            }
        })
        dispatch({
            type: businessesTypes.FETCH_BUSINESSES,
            payload: businesses
        })
    
}