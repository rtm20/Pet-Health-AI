import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PetProvider } from './context/PetContext';
import { HealthProvider } from './context/HealthContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ui/ErrorBoundary';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DemoPage from './pages/DemoPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import DashboardPage from './pages/DashboardPage';
import PetProfilePage from './pages/pets/PetProfilePage';
import AddPetPage from './pages/pets/AddPetPage';
import HealthAnalysisPage from './pages/health/HealthAnalysisPage';
import VetRecordsPage from './pages/health/VetRecordsPage';
import NotFoundPage from './pages/NotFoundPage';

// Layout wrapper for authenticated pages
const AuthenticatedLayout = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Public layout for non-authenticated pages
const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {children}
    </div>
  );
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? children : <Navigate to="/login" replace />;
};

// Public route component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return !user ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <PetProvider>
          <HealthProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route 
                  path="/" 
                  element={
                    <PublicLayout>
                      <LandingPage />
                    </PublicLayout>
                  } 
                />
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <PublicLayout>
                        <LoginPage />
                      </PublicLayout>
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <PublicRoute>
                      <PublicLayout>
                        <RegisterPage />
                      </PublicLayout>
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/demo" 
                  element={
                    <PublicLayout>
                      <DemoPage />
                    </PublicLayout>
                  } 
                />
                <Route 
                  path="/terms" 
                  element={
                    <PublicLayout>
                      <TermsPage />
                    </PublicLayout>
                  } 
                />
                <Route 
                  path="/privacy" 
                  element={
                    <PublicLayout>
                      <PrivacyPage />
                    </PublicLayout>
                  } 
                />

                {/* Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <AuthenticatedLayout>
                        <DashboardPage />
                      </AuthenticatedLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/pets/add" 
                  element={
                    <ProtectedRoute>
                      <AuthenticatedLayout>
                        <AddPetPage />
                      </AuthenticatedLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/pets/:id" 
                  element={
                    <ProtectedRoute>
                      <AuthenticatedLayout>
                        <PetProfilePage />
                      </AuthenticatedLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/health/analysis" 
                  element={
                    <ProtectedRoute>
                      <AuthenticatedLayout>
                        <HealthAnalysisPage />
                      </AuthenticatedLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/health/vet-records" 
                  element={
                    <ProtectedRoute>
                      <AuthenticatedLayout>
                        <VetRecordsPage />
                      </AuthenticatedLayout>
                    </ProtectedRoute>
                  } 
                />

                {/* 404 Route */}
                <Route 
                  path="*" 
                  element={
                    <PublicLayout>
                      <NotFoundPage />
                    </PublicLayout>
                  } 
                />
              </Routes>
            </Router>
          </HealthProvider>
        </PetProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
