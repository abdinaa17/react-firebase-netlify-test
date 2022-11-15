import { useState, useEffect, useContext, createContext } from "react";

const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const hello = "Hello world";
  const value = {
    hello,
  };
  return (
    <ListingsContext.Provider value={value}>
      return {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => {
  return useContext(ListingsContext);
};
