import React from 'react';

const Footer: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base mb-2">
            Department of Information Science and Engineering - University of Peradeniya
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Data APIs</a>
            <span>|</span>
            <span>Last Build: {currentDate}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;