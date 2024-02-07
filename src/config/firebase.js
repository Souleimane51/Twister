import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDVRvFqOoLth3TlpwmT2bJOkCyijPavyKY",
  authDomain: "twister-849fa.firebaseapp.com",
  databaseURL: "https://twister-849fa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "twister-849fa",
  storageBucket: "twister-849fa.appspot.com",
  messagingSenderId: "792316115161",
  appId: "1:792316115161:web:f38579b2149e750569a6c8"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);