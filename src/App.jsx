import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionManagement from "./components/PermissionManagement";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<UserManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/role" element={<RoleManagement />} />
        <Route path="/permission" element={<PermissionManagement />} />
      </Routes>
    </>
  );
}

export default App;
