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

import Schedule from "./pages/Schedule";
import Webhooks from "./pages/Webhooks";
import Outputs from "./pages/Outputs";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Documentation from "./pages/Documentation";

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

        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* DAGs */}
        <Route path="dags" element={<Dags />} />
        <Route path="create-dag" element={<CreateDag />} />
        <Route path="edit-dag/:id" element={<EditDag />} />
        <Route path="view-dag/:id" element={<ViewDag />} />

        {/* Runs */}
        <Route path="runs" element={<Runs />} />
        <Route path="runs/:id" element={<RunDetails />} />

        {/* Schedule */}
        <Route path="schedule" element={<Schedule />} />

        {/* Webhooks */}
        <Route path="webhooks" element={<Webhooks />} />

        {/* Other Pages */}
        <Route path="outputs" element={<Outputs />} />
        {/* <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} /> */}
        <Route path="documentation" element={<Documentation />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
