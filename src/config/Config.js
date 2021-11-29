import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-YsTvvH6atM1faViE7gQkPpVuUebPAYI",
  authDomain: "shopigniter-cc805.firebaseapp.com",
  projectId: "shopigniter-cc805",
  storageBucket: "shopigniter-cc805.appspot.com",
  messagingSenderId: "912438146727",
  appId: "1:912438146727:web:e7ba8e1ecb6fa957b30d82",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
