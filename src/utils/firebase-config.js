// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMpwJgnwfs_Al8ARo8zyy5TtLvfQDgGNA",
  authDomain: "netflix-project-a166e.firebaseapp.com",
  projectId: "netflix-project-a166e",
  storageBucket: "netflix-project-a166e.appspot.com",
  messagingSenderId: "305541530823",
  appId: "1:305541530823:web:a1c9fcd8790cc140c4eae2",
  measurementId: "G-9RDDSZDSXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)
