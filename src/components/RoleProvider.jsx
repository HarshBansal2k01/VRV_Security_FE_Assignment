import React, { createContext, useState, useContext } from "react";
import { useUserData } from "./UserDataContext";

// Create the context
const RoleContext = createContext();

// Custom hook to use RoleContext
export const useRoleContext = () => useContext(RoleContext);

const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [nextId, setNextId] = useState(1);
  const { userData, updateUser } = useUserData()
  // Function to add a new role
  const addRole = (newRole) => {
    const roleWithId = { id: nextId, ...newRole }; // Add unique ID to the new role
    setRoles((prevRoles) => [...prevRoles, roleWithId]);
    setNextId((prevId) => prevId + 1); // Increment ID for the next role
  };

  // Function to update an existing role
  const updateRole = (updatedRole) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === updatedRole.id ? { ...role, ...updatedRole } : role
      )
    );
  };

  // Function to delete a role
  const deleteRole = (id) => {
    // Remove the role
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));

    // Update users with the deleted role
    userData.forEach((user) => {
      if (user.role === id) {
        updateUser({ ...user, role: null }); // Set role to null or "Unassigned"
      }
    });
  };

  return (
    <RoleContext.Provider
      value={{
        roles,
        addRole,
        updateRole,
        deleteRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export default RoleProvider;
