import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDL6J0JX6tc-lGugIRcTtT1vU-oM6WfhZY",
  authDomain: "restaurants-a06df.firebaseapp.com",
  projectId: "restaurants-a06df",
  storageBucket: "restaurants-a06df.appspot.com",
  messagingSenderId: "1084031123012",
  appId: "1:1084031123012:web:59da40f0767e2337864611"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);