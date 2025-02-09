import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Recettes from './pages/Recettes';
import Favoris from './pages/Favoris';
import './App.css';

function App() {
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
              path="/recettes"
              element={
                <ProtectedRoute>
                  <div className="flex">
                    <Navbar />
                    <main className="flex-1 sm:ml-64 p-6">
                      <Recettes />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/favoris"
              element={
                <ProtectedRoute>
                  <div className="flex">
                    <Navbar />
                    <main className="flex-1 sm:ml-64 p-6">
                      <Favoris />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
