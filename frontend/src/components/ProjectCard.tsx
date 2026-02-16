import React, { useState } from 'react';
import { Calendar, Users, ExternalLink, Github, FileText, Cpu, FileSearch, Globe, Brain, Smartphone, BarChart, Shield, Link, Gamepad2 } from 'lucide-react';
import type { Project } from '../types';
import { truncateText } from '../utils';
import ProjectModal from './ProjectModal';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showModal, setShowModal] = useState(false);
  const cardClass = "group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden";

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'iot':
        return 'bg-blue-900';
      case 'web':
        return 'bg-green-700';
      case 'ai-ml':
        return 'bg-purple-700';
      case 'mobile':
        return 'bg-orange-700';
      case 'data-science':
        return 'bg-indigo-700';
      case 'cybersecurity':
        return 'bg-red-700';
      case 'blockchain':
        return 'bg-yellow-600';
      case 'game-dev':
        return 'bg-pink-700';
      case 'research':
        return 'bg-teal-700';
      default:
        return 'bg-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'iot':
        return <Cpu className="h-16 w-16" />;
      case 'web':
        return <Globe className="h-16 w-16" />;
      case 'ai-ml':
        return <Brain className="h-16 w-16" />;
      case 'mobile':
        return <Smartphone className="h-16 w-16" />;
      case 'data-science':
        return <BarChart className="h-16 w-16" />;
      case 'cybersecurity':
        return <Shield className="h-16 w-16" />;
      case 'blockchain':
        return <Link className="h-16 w-16" />;
      case 'game-dev':
        return <Gamepad2 className="h-16 w-16" />;
      case 'research':
        return <FileSearch className="h-16 w-16" />;
      default:
        return <Cpu className="h-16 w-16" />;
    }
  };

  const getCategoryBackgroundColor = (category: string) => {
    switch (category) {
      case 'iot':
        return 'bg-blue-500';
      case 'web':
        return 'bg-green-500';
      case 'ai-ml':
        return 'bg-purple-500';
      case 'mobile':
        return 'bg-orange-500';
      case 'data-science':
        return 'bg-indigo-500';
      case 'cybersecurity':
        return 'bg-red-500';
      case 'blockchain':
        return 'bg-yellow-500';
      case 'game-dev':
        return 'bg-pink-500';
      case 'research':
        return 'bg-teal-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={cardClass}>

      {/* Category Icon */}
      <div className={`aspect-video ${getCategoryBackgroundColor(project.category)} flex items-center justify-center`}>
        <div className="text-white">
          {getCategoryIcon(project.category)}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block w-3 h-3 rounded-full ${getCategoryColor(project.category)}`}></span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors cursor-pointer" onClick={() => setShowModal(true)}>
          {project.title}
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
        <div className="flex items-center justify-end mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
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
            {project.documentUrl && (
              <a
                href={project.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 text-sm font-medium rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                aria-label="View documentation"
              >
                <FileText className="h-4 w-4" />
                Docs
              </a>
            )}
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      
      {/* Project Modal */}
      <ProjectModal 
        project={project} 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

export default ProjectCard;