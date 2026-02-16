import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-white mb-2">
            InnoYatra &mdash; Student Innovation Portal
          </p>
          <p className="text-sm mb-3 px-2">
            Showcasing the best of student-built projects, research, and creative tech solutions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="hidden sm:inline">|</span>
            <a href="/categories" className="hover:text-white transition-colors">Categories</a>
            <span className="hidden sm:inline">|</span>
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <span className="hidden sm:inline">|</span>
            <span>&copy; {new Date().getFullYear()} InnoYatra</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;