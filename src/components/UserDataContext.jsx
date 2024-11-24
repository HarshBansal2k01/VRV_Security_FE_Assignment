import React, { createContext, useState, useContext } from "react";

// Create the Context
const UserDataContext = createContext();

// Create a Provider Component
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [nextId, setNextId] = useState(1); // Track the next available ID

  const addUser = (newUser) => {
    setUserData((prev) => [...prev, { id: nextId, ...newUser }]);
    setNextId((prevId) => prevId + 1);
  };
  const updateUser = (updatedUser) => {
    setUserData((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };
  const deleteUser = (userId) => {
    setUserData((prev) => prev.filter((user) => user.id !== userId));
  };
  return (
    <UserDataContext.Provider
      value={{ userData, addUser, updateUser, deleteUser }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

// Custom Hook to Use User Data
export const useUserData = () => useContext(UserDataContext);
