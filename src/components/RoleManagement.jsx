import React, { useState } from "react";
import { useRoleContext } from "./RoleProvider";
import { usePermissionContext } from "./PermissionProvider";
import RoleModal from "./RoleModal";

const RoleManagement = () => {
  const { roles, deleteRole } = useRoleContext();
  const { rolePermissions } = usePermissionContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const toggleModal = (role = null) => {
    setSelectedRole(role);
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 mx-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gradient-to-r from-purple-500 via-purple-300 to-purple-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Permissions
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr
                key={role.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b`}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {role.name}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-500">
                  <div className="flex flex-wrap gap-2">
                    {rolePermissions[role.id]?.length ? (
                      rolePermissions[role.id].map((permission, index) => (
                        <div
                          key={index}
                          className="p-3 bg-white dark:bg-white-900 rounded-lg shadow-md w-auto"
                        >
                          {permission}
                        </div>
                      ))
                    ) : (
                      <span className="text-white-500 dark:text-white-400">
                        No permission assigned
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-500">
                  <div className="flex flex-wrap">
                    <div className="p-3 bg-white dark:bg-white-900 rounded-lg shadow-md w-auto">
                      {role.description}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => toggleModal(role)}
                    className="text-white bg-gradient-to-r from-green-500 via-green-400 to-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteRole(role.id)}
                    className="text-white bg-gradient-to-r from-red-500 via-red-400 to-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <RoleModal onClose={toggleModal} existingRole={selectedRole} />
      )}
    </>
  );
};

export default RoleManagement;
