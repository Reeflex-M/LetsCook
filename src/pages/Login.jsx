import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import KitchenBackground from '../components/3d/KitchenBackground';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isSuccess = await login(username, password);
      if (isSuccess) {
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* 3D Background */}
      <KitchenBackground />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-recipe-500/5 via-transparent to-recipe-500/5" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 backdrop-blur-[1px]"></div>
      </div>

      {/* Minimalist login container */}
      <div className="relative w-full max-w-sm mx-4" style={{ zIndex: 2 }}>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
          {/* Simple header */}
          <div className="h-1 bg-recipe-500 rounded-t-2xl"></div>
          
          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Simple title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Let's Cook</h1>
              <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 p-3 rounded text-sm text-red-600 flex items-center">
                <svg className="h-4 w-4 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {/* Simplified form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-recipe-500 focus:ring focus:ring-recipe-500/20 transition-all"
                  placeholder="Username"
                  required
                />
              </div>

              <div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-recipe-500 focus:ring focus:ring-recipe-500/20 transition-all"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-recipe-500 text-white font-medium hover:bg-recipe-600 transition-colors focus:outline-none focus:ring-2 focus:ring-recipe-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </form>
            
            {/* Optional: Simple footer */}
            <div className="text-center text-sm text-gray-500 pt-2">
              <a href="#" className="text-recipe-500 hover:text-recipe-600 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
