import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

const UserDataContext = createContext();

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
    toast.success("User updated successfully!");
  };
  const deleteUser = (userId) => {
    setUserData((prev) => prev.filter((user) => user.id !== userId));
    toast.success("User deleted successfully!");
  };
  return (
    <UserDataContext.Provider
      value={{ userData, addUser, updateUser, deleteUser }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
