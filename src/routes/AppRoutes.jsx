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
import ProtectedRoute from "./ProtectedRoute";

const protectedPage = (element) =>
  <ProtectedRoute>{element}</ProtectedRoute>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

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
    </Routes>
  );
};

export default AppRoutes;
