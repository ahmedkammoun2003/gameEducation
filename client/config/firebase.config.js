import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.VITE_googleAPI,
  authDomain: "education-f7ceb.firebaseapp.com",
  projectId: "education-f7ceb",
  storageBucket: "education-f7ceb.appspot.com",
  messagingSenderId: "505658286349",
  appId: "1:505658286349:web:56735a5e7b060ad3195044",
  measurementId: "G-V03RPW4R6H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};