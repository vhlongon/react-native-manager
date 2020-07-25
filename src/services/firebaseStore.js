import firebase from 'firebase/app';
import 'firebase/database';
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

export const signIn = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => firebase.auth().signOut();

export const persistAuth = () =>
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const signUp = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const getUser = () =>
  new Promise(resolve => {
    firebase.auth().onAuthStateChanged(resolve);
  });

export const updateUserPassword = async newPassword => {
  const user = await getUser();
  return user.updatePassword(newPassword);
};

export const updateUserEmail = async newEmail => {
  const user = await getUser();
  return user.updateEmail(newEmail);
};

export const addEmployee = async ({ name, phone, shift }) => {
  const { uid } = await getUser();
  return firebase.database().ref(`/users/${uid}/employees`).push({ name, phone, shift });
};

export const updateEmployee = async ({ name, phone, shift, id }) => {
  const { uid } = await getUser();
  return firebase.database().ref(`/users/${uid}/employees/${id}`).set({ name, phone, shift });
};

export const removeEmployee = async ({ id }) => {
  const { uid } = await getUser();
  return firebase.database().ref(`/users/${uid}/employees/${id}`).remove();
};

export const getEmployees = async () => {
  const { uid } = await getUser();

  return new Promise(resolve => {
    firebase
      .database()
      .ref(`/users/${uid}/employees`)
      .on('value', snapshot => {
        const data = snapshot.exists() ? snapshot.val() : null;
        resolve(data);
      });
  });
};
