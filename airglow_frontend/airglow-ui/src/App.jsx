import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";
import DagList from "./pages/DagList";
import CreateDag from "./pages/CreateDag";
import EditDag from "./pages/EditDag";
import DagDetails from "./pages/DagDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pipelines"
        element={
          <ProtectedRoute>
            <Layout>
              <DagList />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pipelines/create"
        element={
          <ProtectedRoute>
            <Layout>
              <CreateDag />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pipelines/edit/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <EditDag />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pipelines/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <DagDetails />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pipelines/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <DagDetails />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
