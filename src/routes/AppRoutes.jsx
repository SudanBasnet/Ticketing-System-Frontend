import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Incidents from "../pages/incidents/Incidents";
import Requests from "../pages/Requests";
import Changes from "../pages/Changes";
import Problems from "../pages/Problems";
import Cmdb from "../pages/Cmdb";
import IncidentDetails from "../pages/incidents/IncidentDetails";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ForgotPassword from "../Auth/ForgotPassword";
import ResetPassword from "../Auth/ResetPassword";
import VerifyEmail from "../Auth/VerifyEmail";
import Profile from "../pages/Profile";
import AdminUsers from "../pages/admin/AdminUsers";
import ProtectedRoute from "./ProtectedRoute";

const protectedPage = (element, roles) => (
  <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={protectedPage(<VerifyEmail />)} />

      <Route
        path="/"
        element={protectedPage(<Dashboard />)}
      />

      <Route
        path="/incidents"
        element={protectedPage(<Incidents />)}
      />

      <Route
        path="/incidents/:id"
        element={protectedPage(<IncidentDetails />)}
      />

      <Route
        path="/requests"
        element={protectedPage(<Requests />)}
      />

      <Route
        path="/changes"
        element={protectedPage(<Changes />)}
      />

      <Route
        path="/problems"
        element={protectedPage(<Problems />)}
      />

      <Route
        path="/cmdb"
        element={protectedPage(<Cmdb />)}
      />

      <Route
        path="/profile"
        element={protectedPage(<Profile />)}
      />

      <Route
        path="/admin/users"
        element={protectedPage(<AdminUsers />, ["admin"])}
      />
    </Routes>
  );
};

export default AppRoutes;
