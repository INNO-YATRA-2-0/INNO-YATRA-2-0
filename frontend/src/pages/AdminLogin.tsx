import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Check if user is admin
        if (data.data.user.role !== 'admin') {
          setError('Invalid credentials. Admin access required.');
          return;
        }

        // Store token and user data
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-10 transition-all duration-300 hover:border-white/20">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-white mb-3 tracking-tight">Admin</h2>
            <p className="text-gray-400 text-sm font-medium">Secure Administrative Access</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 flex items-center space-x-3 animate-shake">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 focus:bg-black/70 transition-all duration-200 text-white placeholder-gray-500"
                  placeholder="admin@university.ac.in"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 pr-12 py-3.5 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 focus:bg-black/70 transition-all duration-200 text-white placeholder-gray-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-semibold rounded-xl text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-2xl shadow-white/20 hover:shadow-white/30 transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <span>Sign in to Dashboard</span>
                )}
              </button>
            </div>
          </form>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <Link
              to="/student/login"
              className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <span>Student Portal</span>
              <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-500 text-sm font-medium">Secured by 256-bit Encryption</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;