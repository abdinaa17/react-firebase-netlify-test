import { auth } from "./firebase";
import { db } from "./firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [listings, setListings] = useState([]);

  // Initialize db and get data
  const fetchListings = async () => {
    try {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"));

      const unsbuscribe = onSnapshot(q, (snapshot) => {
        setListings(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return unsbuscribe;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchListings();
  }, []);
  //
  const values = {
    listings,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
