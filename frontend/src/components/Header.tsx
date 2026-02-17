import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
  ];

  // Check if current route is a login page
  const isLoginPage = location.pathname.includes('/login');

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/bg.png" alt="InnoYatra Logo" className="h-20 w-20 md:h-36 md:w-36 rounded-lg object-cover" />
            {/* Brand text removed as requested */}
          </Link>

          {/* Desktop Navigation */}
          {!isLoginPage && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Login Buttons - Only show when not on login pages */}
            {!isLoginPage && (
              <>
                <Link
                  to="/admin/login"
                  className="hidden sm:flex items-center px-5 py-2.5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full text-sm font-semibold shadow-lg shadow-gray-900/25 hover:shadow-xl hover:shadow-gray-900/40 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span>Admin</span>
                </Link>
                <Link
                  to="/student/login"
                  className="hidden sm:flex items-center space-x-2 px-5 py-2.5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full text-sm font-semibold shadow-lg shadow-gray-900/25 hover:shadow-xl hover:shadow-gray-900/40 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <User className="h-4 w-4" />
                  <span>Student</span>
                </Link>
              </>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && !isLoginPage && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Login Links */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                <div className="space-y-3">
                  <Link
                    to="/admin/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full font-semibold shadow-lg shadow-gray-900/25 active:scale-95 transition-all duration-300"
                  >
                    <span>Admin Login</span>
                  </Link>
                  <Link
                    to="/student/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full font-semibold shadow-lg shadow-gray-900/25 active:scale-95 transition-all duration-300"
                  >
                    <User className="h-4 w-4" />
                    <span>Student Login</span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;