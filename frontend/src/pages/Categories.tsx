import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Cpu, 
  Brain, 
  Link as LinkIcon, 
  Globe, 
  Smartphone, 
  Box, 
  BarChart, 
  Shield, 
  Cloud, 
  Leaf, 
  BookOpen, 
  Heart,
  BarChart3 
} from 'lucide-react';
import { categories } from '../data/projects';

const Categories: React.FC = () => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Cpu,
    Brain,
    Link: LinkIcon,
    Globe,
    Smartphone,
    Box,
    BarChart,
    Shield,
    Cloud,
    Leaf,
    BookOpen,
    Heart,
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Project Categories
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-2">
            Explore the diverse world of student innovation on InnoYatra. Each category represents 
            a technology domain where students are building solutions to real-world problems.
          </p>
        </div>

        {/* Stats Overview
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {categories.reduce((total, cat) => total + cat.projectCount, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Projects</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              500+
            </div>
            <div className="text-gray-600 dark:text-gray-400">Students</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              50+
            </div>
            <div className="text-gray-600 dark:text-gray-400">Faculty</div>
          </div>
        </div> */}

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || BarChart3;
            
            return (
              <Link
                key={category.id}
                to={`/?category=${category.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-4 sm:p-5 md:p-8">
                  {/* Icon and Color Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-3 sm:mb-6 gap-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 ${category.color} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <div className="sm:text-right">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                        {category.projectCount}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Projects
                      </div>
                    </div>
                  </div>

                  {/* Category Info */}
                  <h3 className="text-sm sm:text-base md:text-xl font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-3 hidden sm:block">
                    {category.description}
                  </p>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400 truncate mr-1">
                      Explore
                    </span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Category Descriptions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Technology Domains
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              InnoYatra projects span across multiple cutting-edge technology domains — from IoT and AI 
              to blockchain and game development. Each category represents a vibrant space where 
              students apply their skills to build innovative solutions.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">Emerging Technologies:</span> IoT, AI/ML, Blockchain
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">Development:</span> Web, Mobile, Cloud
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">Specialized Fields:</span> VR/AR, Data Science, Cybersecurity
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">Impact Areas:</span> Health, Education, Sustainability
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Explore Further
            </h2>
            <div className="space-y-4">
              <Link
                to="/"
                className="block p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      Browse All Projects
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      View the complete collection of student projects
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </div>
              </Link>

              <Link
                to="/about"
                className="block p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      About InnoYatra
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Learn more about our mission and team
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;