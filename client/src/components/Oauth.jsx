import { app } from "../config/firebase.config.js";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { setCurrentUser } from "../config/reactRedux/users/user.slice.js";

export default function Oauth({ className, text, type }) {
  const [user, setUser] = useState(null);
  const {currentUser} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  console.log(currentUser);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    try {
      const result = await signInWithPopup(auth, provider);
      const signedInUser = result.user;
      const userType = type || "student";
      const userWithRole = { ...signedInUser, type:userType };

      const response = await fetch("http://localhost:3000/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userWithRole),
      });

      const data = await response.json();
      console.log(data);
      setUser(userWithRole); // Set the user state
      dispatch(setCurrentUser(userWithRole));
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <button onClick={signIn} className={className} type={type}>
      {text}
    </button>
  );
}
