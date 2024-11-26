import React, { useState } from "react";
import { usePermissionContext } from "./PermissionProvider";
import { useRoleContext } from "./RoleProvider";

const PermissionModal = ({ onClose, role }) => {
  const { roles } = useRoleContext();
  const { rolePermissions, addOrUpdateRole } = usePermissionContext();

  const predefinedPermissions = ["Read", "Write", "ReadWrite"];
  const [selectedRole, setSelectedRole] = useState(role?.id || "");
  const [selectedPermissions, setSelectedPermissions] = useState(
    role ? rolePermissions[role.id] || [] : []
  );

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

  const isUpdating = Boolean(role);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-gradient-to-b from-indigo-50 to-purple-50 rounded-lg shadow-lg w-full max-w-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 border-b border-gray-200 rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">
            {isUpdating ? "Update Permissions" : "Add Permissions"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-all rounded-full"
            aria-label="Close Modal"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6 18 12-12M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          {/* Dropdown for selecting roles */}
          <div>
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Select Role
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={handleRoleChange}
              className="w-full p-3 text-sm bg-white border border-indigo-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isUpdating} // Disable if updating
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
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-700">
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
                <label htmlFor={permission} className="text-sm text-gray-700">
                  {permission}
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-400 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            {isUpdating ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PermissionModal;
