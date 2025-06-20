import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Layout } from './components/Layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="approval" element={<div className="p-8 text-center text-gray-500">Pending Approval page coming soon...</div>} />
        <Route path="upload" element={<div className="p-8 text-center text-gray-500">File Upload page coming soon...</div>} />
        <Route path="invoices" element={<div className="p-8 text-center text-gray-500">Invoices page coming soon...</div>} />
        <Route path="alerts" element={<div className="p-8 text-center text-gray-500">Alerts page coming soon...</div>} />
        <Route path="reports" element={<div className="p-8 text-center text-gray-500">Reports page coming soon...</div>} />
        <Route path="settings" element={<div className="p-8 text-center text-gray-500">Settings page coming soon...</div>} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;