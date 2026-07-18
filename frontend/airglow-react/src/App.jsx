import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Dags from "./pages/Dags.jsx";
import CreateDag from "./pages/CreateDag.jsx";
import Runs from "./pages/Runs.jsx";
import RunDetails from "./pages/RunDetails.jsx";
import Webhooks from "./pages/Webhooks.jsx";
import Placeholder from "./pages/Placeholder.jsx";
import OAuthSuccess from "./pages/OAuthSuccess.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/app" element={<Layout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dags" element={<Dags />} />
        <Route path="dags/new" element={<CreateDag />} />
        <Route path="runs" element={<Runs />} />
        <Route path="runs/:id" element={<RunDetails />} />
        <Route path="webhooks" element={<Webhooks />} />
        <Route path="schedules" element={<Placeholder title="Schedules" />} />
        <Route path="outputs" element={<Placeholder title="Outputs" />} />
        <Route path="users" element={<Placeholder title="Users" />} />
        <Route path="settings" element={<Placeholder title="Settings" />} />
        <Route
          path="documentation"
          element={<Placeholder title="Documentation" />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
