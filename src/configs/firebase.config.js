import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCOywp9HE88SZNRi0vWy7NM1-NbvXR5Q64",
    authDomain: "shops-upwork.firebaseapp.com",
    projectId: "shops-upwork",
    storageBucket: "shops-upwork.appspot.com",
    messagingSenderId: "633007557034",
    appId: "1:633007557034:web:7d7f3eec792199266e83d3"
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;