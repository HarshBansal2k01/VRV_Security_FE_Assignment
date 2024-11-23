import React, { createContext, useState, useContext } from "react";

// Create the Context
const UserDataContext = createContext();

// Create a Provider Component
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom Hook to Use Form Data
export const useUserData = () => useContext(UserDataContext);
