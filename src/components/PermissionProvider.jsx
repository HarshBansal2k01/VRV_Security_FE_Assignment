import React, { createContext, useContext, useState } from "react";

const PermissionContext = createContext();
export const usePermissionContext = () => useContext(PermissionContext);

const PermissionProvider = ({ children }) => {
  // State for roles and their permissions
  const [rolePermissions, setRolePermissions] = useState({});

  // Add or update permissions for a role
  const addOrUpdateRole = (roleId, permissions) => {
    setRolePermissions((prev) => ({
      ...prev,
      [roleId]: permissions,
    }));
  };

  // Delete a role's permissions
  const deleteRole = (roleId) => {
    setRolePermissions((prev) => {
      const updated = { ...prev };
      delete updated[roleId];
      return updated;
    });
  };

  return (
    <PermissionContext.Provider
      value={{ rolePermissions, addOrUpdateRole, deleteRole }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
