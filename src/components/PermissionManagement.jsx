import React, { useState } from "react";
import { useRoleContext } from "./RoleProvider";
import { usePermissionContext } from "./PermissionProvider";
import PermissionModal from "./PermissionModal";

const PermissionManagement = () => {
  const { roles } = useRoleContext();
  const { rolePermissions, deleteRole } = usePermissionContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const toggleModal = (role = null) => {
    setSelectedRole(role);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 ml-1 mr-1">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Permissions
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr
                key={role.id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {role.name}
                </td>
                <td className="px-6 py-4">
                  {rolePermissions[role.id]?.length
                    ? rolePermissions[role.id].join(", ")
                    : "No permission given"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleModal(role)}
                    className="text-blue-600 hover:underline"
                  >
                    Update
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteRole(role.id)}
                    className="text-red-600 hover:underline"
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
        <PermissionModal
          onClose={() => setIsModalOpen(false)}
          role={selectedRole}
        />
      )}
    </>
  );
};

export default PermissionManagement;
