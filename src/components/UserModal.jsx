import React, { useState } from "react";
import { useUserData } from "./UserDataContext";
import { useRoleContext } from "./RoleProvider";
import { toast } from "react-toastify";

const UserModal = ({ onClose, existingUser = null }) => {
  const { addUser, updateUser } = useUserData();
  const { roles } = useRoleContext();
  const [formData, setFormData] = useState({
    name: existingUser?.name || "",
    email: existingUser?.email || "",
    role: existingUser?.role || "",
    status: existingUser?.status || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingUser) {
      updateUser({ id: existingUser.id, ...formData });
      toast.success("User updated successfully!");
    } else {
      addUser(formData);
      toast.success("User added successfully!");
    }
    setFormData({ name: "", email: "", role: "", status: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-gradient-to-b from-indigo-50 to-purple-50 rounded-lg shadow-lg w-full max-w-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 border-b border-gray-200 rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">
            {existingUser ? "Update User" : "Add New User"}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 text-sm bg-white border border-indigo-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 text-sm bg-white border border-indigo-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              className="w-full p-3 text-sm bg-white border border-indigo-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>
                Select Role
              </option>
              {roles.length === 0 ? (
                <option value="no-roles" disabled>
                  No Roles Available
                </option>
              ) : (
                roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="w-full p-3 text-sm bg-white border border-indigo-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-400 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            {existingUser ? "Update User" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
