// all the action creators like a function that sets the current user
import { auth, db } from '../../../configs/firebase.config';
import authTypes from './auth.types';
export const setCurrentUser = (user) => async (dispatch) => {
   
    dispatch ({
        type: authTypes.SET_CURRENT_USER,
        payload: user
    })
} 
export const getIsAdmin = () => async (dispatch) => {
    dispatch ({
        type: authTypes.GET_IS_ADMIN,
        payload: 'loading'
    })
    let isAdmin = false;
    try{
        const doc = await db.collection('admins').doc(auth.currentUser.uid).get();
        if(doc.exists && doc.data()){
            isAdmin = doc.data().isAdmin;
        }
        
    }catch(err){
        console.log(err);
    }
    dispatch ({
        type: authTypes.GET_IS_ADMIN,
        payload: isAdmin===true?'true':'false'
    })
}
export const clearCurrentUser = () => {
    return {
        type: authTypes.SET_CURRENT_USER
    }
} 
export const clearAdmin = () => {
    return {
        type: authTypes.CLEAR_ADMIN,
    }
} 