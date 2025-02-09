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
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-gray-50/30">
      {/* 3D Background */}
      <KitchenBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-recipe-500/10 via-transparent to-recipe-500/5" style={{ zIndex: 1 }}></div>

      {/* Main container */}
      <div className="relative w-full max-w-md mx-4" style={{ zIndex: 2 }}>
        <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-white/20 transform transition-all duration-500 hover:scale-[1.01]">
          {/* Decorative header */}
          <div className="h-3 bg-gradient-to-r from-recipe-400 via-recipe-500 to-recipe-600 rounded-t-[2rem]"></div>

          {/* Main content */}
          <div className="p-8 space-y-8">
            {/* Logo and title */}
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-recipe-50 rounded-2xl flex items-center justify-center ring-8 ring-recipe-100/30 transform transition-all duration-500 hover:rotate-[5deg]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-recipe-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2zm-.25 4a.5.5 0 11-1 0 .5.5 0 011 0zM10 7v1h1V7h-1z"/>
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Let's Cook!</h1>
              <p className="text-gray-600">Sign in to discover amazing recipes</p>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-shake">
                <div className="flex">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-3 text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div className="group">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-12 pr-4 py-4 rounded-xl border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-recipe-500 bg-white/70 placeholder-gray-400 text-gray-900 transition-all duration-300 focus:bg-white"
                      placeholder="Entrez votre nom d'utilisateur"
                      required
                    />
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-focus-within:text-recipe-500 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-12 pr-4 py-4 rounded-xl border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-recipe-500 bg-white/70 placeholder-gray-400 text-gray-900 transition-all duration-300 focus:bg-white"
                      placeholder="Entrez votre mot de passe"
                      required
                    />
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-focus-within:text-recipe-500 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 rounded-xl text-white bg-gradient-to-r from-recipe-500 to-recipe-600 hover:from-recipe-600 hover:to-recipe-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-recipe-500 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-medium"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
