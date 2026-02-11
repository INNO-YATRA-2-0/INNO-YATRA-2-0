import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Eye, Heart, ExternalLink, Github, Star } from 'lucide-react';
import type { Project } from '../types';
import { truncateText } from '../utils';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  const cardClass = featured 
    ? "group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden relative"
    : "group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden";

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900';
      case 'In Progress':
        return 'bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-900';
      case 'Proposal':
        return 'bg-gray-500 text-white dark:bg-gray-400 dark:text-gray-900';
      default:
        return 'bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-white';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'undergraduate':
        return 'bg-gray-900';
      case 'capstone':
        return 'bg-gray-700';
      case 'research':
        return 'bg-gray-500';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className={cardClass}>
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gray-800 text-white px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-medium">
            <Star className="h-3 w-3" />
            <span>Featured</span>
          </div>
        </div>
      )}

      {/* Project Image */}
      <div className="aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {project.images.length > 0 ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Category and Status */}
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block w-3 h-3 rounded-full ${getCategoryColor(project.category)}`}></span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
          <Link to={`/projects/${project.id}`}>
            {project.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {truncateText(project.shortDescription, 120)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Project Meta */}
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          {/* Year and Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{project.teamMembers.length} members</span>
            </div>
          </div>

          {/* Batch */}
          <div className="text-xs">
            Batch: {project.batch}
          </div>

          {/* Supervisor */}
          <div className="text-xs">
            Supervisor: {project.supervisor.name}
          </div>
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{project.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{project.likes}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="View repository"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="View demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <Link
              to={`/projects/${project.id}`}
              className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;