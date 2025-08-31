import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './layouts/ProtectedRoute';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
          }
        />
        <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
