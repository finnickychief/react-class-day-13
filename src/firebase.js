import firebase from 'firebase';
import config from './config';

firebase.initializeApp(config);

// Tool to allow user to become authenticated using google auth
export const authProvider = new firebase.auth.GoogleAuthProvider();

// Tool to check if the user is authenticated
export const auth = firebase.auth();

export default firebase;
