import React from "react";
import { useUserData } from "./UserDataContext";

const UserManagement = () => {
  const { userData } = useUserData();
  console.log("userData:", userData);  // Log the value of userData
  
  // Check if userData is valid and an array before rendering
  if (!userData || !Array.isArray(userData)) {
    return <div>No valid data available</div>;
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 ml-1 mr-1">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr
                key={user.email}  // Ensure the key is unique
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.name}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{user.status}</td>
                <td className="px-6 py-4">
                  <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Update
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserManagement;
