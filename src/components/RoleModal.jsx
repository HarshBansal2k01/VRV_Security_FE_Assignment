import React, { useState } from "react";
import { useRoleContext } from "./RoleProvider";

const RoleModal = ({ onClose, existingRole = null }) => {
  const { addRole, updateRole } = useRoleContext();
  const [formData, setFormData] = useState({
    name: existingRole?.name || "",
    description: existingRole?.description || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingRole) {
      updateRole({ id: existingRole.id, ...formData });
    } else {
      addRole(formData);
    }
    setFormData({ name: "", description: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-gradient-to-b from-indigo-50 to-purple-50 rounded-lg shadow-lg w-full max-w-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 border-b border-gray-200 rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">
            {existingRole ? "Update Role" : "Add New Role"}
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
              Role Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 text-sm bg-white border border-indigo-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Role Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 text-sm bg-white border border-indigo-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Description"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-400 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            {existingRole ? "Update Role" : "Add Role"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;
