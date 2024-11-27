import React, { useState } from "react";
import { useUserData } from "./UserDataContext";
import UserModal from "./UserModal";
import { useRoleContext } from "./RoleProvider";

const UserManagement = () => {
  const { userData, deleteUser } = useUserData();
  const { roles } = useRoleContext();

  // Ensure userData is valid
  if (!userData || !Array.isArray(userData)) {
    return <div>No valid data available</div>;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 mx-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gradient-to-r from-purple-500 via-purple-300 to-purple-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b`}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-500">
                  <div className="flex flex-wrap">
                    <div className="p-3 bg-white dark:bg-white-900 rounded-lg shadow-md w-auto">
                      {roles.find((role) => role.name === user.role)?.name ||
                        "Unassigned"}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-500">
                  <div className="flex flex-wrap">
                    <div className="p-3 bg-white dark:bg-white-900 rounded-lg shadow-md w-auto">
                      {user.status}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => toggleModal(user)}
                    className="text-white bg-gradient-to-r from-green-500 via-green-400 to-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 rounded-lg px-4 py-2 text-sm font-medium transition-all w-full sm:w-auto"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-white bg-gradient-to-r from-red-500 via-red-400 to-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 rounded-lg px-4 py-2 text-sm font-medium transition-all w-full sm:w-auto"
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
        <UserModal onClose={toggleModal} existingUser={selectedUser} />
      )}
    </>
  );
};

export default UserManagement;
