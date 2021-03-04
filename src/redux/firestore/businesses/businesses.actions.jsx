import { db } from '../../../configs/firebase.config'
import businessesTypes from './businesses.types';

export const fetchBusinesses = () => async (dispatch) => {
    try{
        const querySnapshot = await db.collection('businesses').get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        })
        console.log(data);
        dispatch({
            type: businessesTypes.FETCH_BUSINESSES,
            payload: data
        })
    }catch(err){
        console.log(err);
    }
}

export const setBusiness = (data) => async (dispatch) => {
    try{
        await db.collection('businesses').doc(data.uid)
            .set(data);
        dispatch({
            type: businessesTypes.ADD_BUSINESS,
            payload: data
        })
    }
    catch(err){
        console.log(err);
    }
}
