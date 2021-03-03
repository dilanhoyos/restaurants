import { firebaseApp } from './firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

export const isUserLogged = () => {
  let value = false;
  firebase.auth().onAuthStateChanged((user) => {
    value = user && true;
  });
  return value;
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
}