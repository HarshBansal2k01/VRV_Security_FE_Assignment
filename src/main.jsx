import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { UserDataProvider } from "./components/UserDataContext.jsx";
import RoleProvider from "./components/RoleProvider.jsx";
import PermissionProvider from "./components/PermissionProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-zhg7p7jix57jrq2w.us.auth0.com"
    clientId="DH1ox643zqcPSpFNmHko3ORNdLp2HFTg"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <ToastContainer />
    <BrowserRouter>
      <PermissionProvider>
        <UserDataProvider>
          <RoleProvider>
            <App />
          </RoleProvider>
        </UserDataProvider>
      </PermissionProvider>
    </BrowserRouter>
  </Auth0Provider>
);
