import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Incidents from "../pages/incidents/Incidents";
import Requests from "../pages/Requests";
import Changes from "../pages/Changes";
import Problems from "../pages/Problems";
import Cmdb from "../pages/Cmdb";
import IncidentDetails from "../pages/incidents/IncidentDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/incidents" element={<Incidents />} />

      <Route path="/requests" element={<Requests />} />

      <Route path="/changes" element={<Changes />} />

      <Route path="/problems" element={<Problems />} />

      <Route path="/cmdb" element={<Cmdb />} />
      <Route path="/incidents/:id" element={<IncidentDetails />} />
    </Routes>
  );
};

export default AppRoutes;
