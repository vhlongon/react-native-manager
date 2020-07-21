import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCwbqvyOtJuljmBzo8g-2MNM73b-TX4VJw',
  authDomain: 'manager-14be2.firebaseapp.com',
  databaseURL: 'https://manager-14be2.firebaseio.com',
  projectId: 'manager-14be2',
  storageBucket: 'manager-14be2.appspot.com',
  messagingSenderId: '446145688585',
  appId: '1:446145688585:web:a480f403863839cfa8f4d8',
  measurementId: 'G-5DNGRWNVDV',
};

export const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
const db = firebase.firestore();

export const signIn = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => firebase.auth().signOut();

export const signUp = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);
