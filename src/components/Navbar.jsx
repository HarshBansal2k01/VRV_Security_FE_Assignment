import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserModal from "./UserModal";
import RoleModal from "./RoleModal";
import PermissionModal from "./PermissionModal";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Users", href: "/users" },
  { name: "Role", href: "/role" },
  { name: "Permission", href: "/permission" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation(); // Get the current route

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const renderModal = () => {
    switch (location.pathname) {
      case "/":
      case "/users":
        return <UserModal onClose={toggleModal} />;
      case "/role":
        return <RoleModal onClose={toggleModal} />;
      case "/permission":
        return <PermissionModal onClose={toggleModal} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-gradient-to-r from-blue-800 to-purple-900"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-gradient-to-r from-blue-400 via-cyan-500 to-purple-500 text-white animate-water-flow bg-[length:400%_100%]"
                          : "text-gray-300 hover:bg-blue-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Add Button */}
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    toggleModal();
                  } else {
                    alert("Please log in first to use this feature.");
                  }
                }}
                type="button"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add
              </button>

              {/* Login/Logout Button */}
              {!isAuthenticated ? (
                <button
                  onClick={loginWithRedirect}
                  type="button"
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:from-indigo-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Log In
                </button>
              ) : (
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  type="button"
                  className="bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:from-red-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Log Out
                </button>
              )}

              {/* User Icon */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    {user ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <AccountCircleIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {isAuthenticated ? (
                    <MenuItem>
                      <button
                        onClick={() =>
                          logout({ returnTo: window.location.origin })
                        }
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </MenuItem>
                  ) : (
                    <MenuItem>
                      <button
                        onClick={loginWithRedirect}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign In
                      </button>
                    </MenuItem>
                  )}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                className={classNames(
                  location.pathname === item.href
                    ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
                    : "text-gray-300 hover:bg-blue-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      {isModalOpen && renderModal()}
    </>
  );
};

export default Navbar;
