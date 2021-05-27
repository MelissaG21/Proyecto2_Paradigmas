import firebase from 'firebase/app'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyDhn3fhLODNuhzulCIM2Nlz8txtgvgAmyQ",
    authDomain: "vue-libreria.firebaseapp.com",
    projectId: "vue-libreria",
    storageBucket: "vue-libreria.appspot.com",
    messagingSenderId: "464350011355",
    appId: "1:464350011355:web:df7ec21466874e23a4d1fe"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()