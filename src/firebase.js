import firebase from "firebase/app";
import firebaseAuth from "firebase/auth";
import firebaseDatabase from "firebase/database";
import firebaseStorage from "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAPtCa_jBXpgllYgxdaLHaSBFsWAgpcRQM",
  authDomain: "react-slack-clone-94b8b.firebaseapp.com",
  databaseURL: "https://react-slack-clone-94b8b.firebaseio.com",
  projectId: "react-slack-clone-94b8b",
  storageBucket: "react-slack-clone-94b8b.appspot.com",
  messagingSenderId: "607126454304",
  appId: "1:607126454304:web:daa42eeb3b929f7e3fbc45",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
