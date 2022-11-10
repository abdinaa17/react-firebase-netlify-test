import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  // Register user
  const registerUser = (email, password) => {
    const result = createUserWithEmailAndPassword(auth, email, password);

    return result;
  };

  // Log in user

  const loginUser = (email, password) => {
    const result = signInWithEmailAndPassword(auth, email, password);

    return result;
  };

  // Log out user
  const logoutUser = () => {
    const result = auth.signOut();
    return result;
  };

  useEffect(() => {
    const unsbuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsbuscribe;
  }, []);
  const value = {
    currentUser,
    registerUser,
    loginUser,
    logoutUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
