import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const PermissionContext = createContext();
export const usePermissionContext = () => useContext(PermissionContext);

const PermissionProvider = ({ children }) => {
  // State for roles and their permissions
  const [rolePermissions, setRolePermissions] = useState({});

  // Add or update permissions for a role
  const addOrUpdateRole = (roleId, permissions) => {
    setRolePermissions((prev) => {
      const isUpdate = !!prev[roleId]; // Check if the roleId already exists
      toast.success(
        isUpdate
          ? "Permission updated successfully"
          : "Permission added successfully"
      );

      return {
        ...prev,
        [roleId]: permissions,
      };
    });
  };

  // Delete a role's permissions
  const deleteRole = (roleId) => {
    setRolePermissions((prev) => {
      const updated = { ...prev };
      delete updated[roleId];
      return updated;
    });
    toast.success("Permission deleted successfully");
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
