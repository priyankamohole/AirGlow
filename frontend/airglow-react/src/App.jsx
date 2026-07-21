import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuthSuccess from "./pages/OAuthSuccess";

import Dashboard from "./pages/Dashboard";
import Dags from "./pages/Dags";
import CreateDag from "./pages/CreateDag";
import EditDag from "./pages/EditDag";
import ViewDag from "./pages/ViewDag";

import Runs from "./pages/Runs";
import RunDetails from "./pages/RunDetails";
import Webhooks from "./pages/Webhooks";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />

      {/* Protected Routes */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />

        {/* DAG Routes */}
        <Route path="dags" element={<Dags />} />
        <Route path="create-dag" element={<CreateDag />} />
        <Route path="edit-dag/:id" element={<EditDag />} />
        <Route path="view-dag/:id" element={<ViewDag />} />

        {/* Run Routes */}
        <Route path="runs" element={<Runs />} />
        <Route path="runs/:id" element={<RunDetails />} />

        {/* Other Pages */}
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

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
