import { app } from "../config/firebase.config.js";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
export default function Oauth({ className, text,type }) {
  let user;
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        //...
      });
  };
  return (
    <button onClick={signIn} className={className} type={type}>
      {text}
    </button>
  );
  return user; // export the result.user
}
