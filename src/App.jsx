import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className="flex">
                    <Navbar />
                    <main className="flex-1 sm:ml-64 p-6">
                      <Home />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipes"
              element={
                <ProtectedRoute>
                  <div className="flex">
                    <Navbar />
                    <main className="flex-1 sm:ml-64 p-6">
                      <Recipes />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <div className="flex">
                    <Navbar />
                    <main className="flex-1 sm:ml-64 p-6">
                      <Favorites />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
