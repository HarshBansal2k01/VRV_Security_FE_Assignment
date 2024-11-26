import React, { useState } from "react";
import { usePermissionContext } from "./PermissionProvider";
import { useRoleContext } from "./RoleProvider"; // Assuming roles come from this provider.

const PermissionModal = ({ onClose, role }) => {
  const { roles } = useRoleContext();
  const { rolePermissions, addOrUpdateRole } = usePermissionContext();

  const predefinedPermissions = ["Read", "Write", "ReadWrite"];
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleRoleChange = (e) => {
    const roleId = e.target.value;  
    setSelectedRole(roleId);
    setSelectedPermissions(rolePermissions[roleId] || []);
  };

  const handlePermissionChange = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      addOrUpdateRole(selectedRole, selectedPermissions);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 max-w-md w-full dark:bg-gray-700">
        <div className="flex justify-between items-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Manage Permissions
          </h2>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Close
          </button>
        </div>
        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
          {/* Dropdown for selecting roles */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
            >
              Select Role
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={handleRoleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:text-white"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Permissions checkboxes */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Permissions
            </h3>
            {predefinedPermissions.map((permission) => (
              <div key={permission} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={permission}
                  checked={selectedPermissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                  className="mr-2"
                />
                <label
                  htmlFor={permission}
                  className="text-sm text-gray-900 dark:text-white"
                >
                  {permission}
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PermissionModal;
