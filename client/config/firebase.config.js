
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLEAPI,
  authDomain: "education-f7ceb.firebaseapp.com",
  projectId: "education-f7ceb",
  storageBucket: "education-f7ceb.appspot.com",
  messagingSenderId: "505658286349",
  appId: "1:505658286349:web:56735a5e7b060ad3195044",
  measurementId: "G-V03RPW4R6H"
};

export const app = initializeApp(firebaseConfig);