import React, { createContext, useState, useContext } from "react";

// Create the context
const RoleContext = createContext();

// Custom hook to use RoleContext
export const useRoleContext = () => useContext(RoleContext);

const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [nextId, setNextId] = useState(1);

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
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
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
