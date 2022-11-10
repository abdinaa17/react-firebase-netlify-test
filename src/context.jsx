import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { createContext, useContext, useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
import { collection, getDocs, query } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  // Register user fuction
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in user fuction
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign out fuction
  const logoutUser = () => {
    return auth.signOut();
  };

  // Initialize db and get data
  const fetchListings = async () => {
    try {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef);
      const docSnap = await getDocs(q);
      const url = [];
      docSnap.forEach((doc) => {
        return url.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setListings(url);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchListings();
  }, []);
  //
  useEffect(() => {
    const unsbuscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsbuscribe();
    };
  }, []);
  const values = {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
    listings,
  };
  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
