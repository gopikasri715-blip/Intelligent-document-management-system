import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Search from "./pages/Search";
import Categories from "./pages/Categories";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import DocumentDetails from "./pages/DocumentDetails";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* ================= LOGIN ================= */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* ================= PROTECTED ROUTES ================= */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/document/:id"
        element={
          <ProtectedRoute>
            <DocumentDetails />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;