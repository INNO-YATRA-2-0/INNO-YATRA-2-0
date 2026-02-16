import React from 'react';
import { X, Calendar, Users, ExternalLink, Github, FileText, Building } from 'lucide-react';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'iot':
        return { name: 'IoT & Embedded', color: 'bg-blue-500', icon: '🔧' };
      case 'web':
        return { name: 'Web Development', color: 'bg-green-500', icon: '🌐' };
      case 'ai-ml':
        return { name: 'AI & Machine Learning', color: 'bg-purple-500', icon: '🤖' };
      case 'mobile':
        return { name: 'Mobile Apps', color: 'bg-orange-500', icon: '📱' };
      case 'data-science':
        return { name: 'Data Science', color: 'bg-indigo-500', icon: '📊' };
      case 'cybersecurity':
        return { name: 'Cybersecurity', color: 'bg-red-500', icon: '🔐' };
      case 'blockchain':
        return { name: 'Blockchain', color: 'bg-yellow-500', icon: '⛓️' };
      case 'game-dev':
        return { name: 'Game Development', color: 'bg-pink-500', icon: '🎮' };
      case 'research':
        return { name: 'Research', color: 'bg-teal-500', icon: '🔬' };
      default:
        return { name: 'General', color: 'bg-gray-500', icon: '💻' };
    }
  };

  const categoryInfo = getCategoryInfo(project.category);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Category and Basic Info */}
          <div className="flex flex-wrap gap-4 items-center">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white ${categoryInfo.color}`}>
              <span>{categoryInfo.icon}</span>
              {categoryInfo.name}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{project.teamMembers.length} members</span>
              </div>
              <div>Batch: {project.batch}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Project Description</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.description || project.shortDescription}
            </p>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Team Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-medium text-gray-900 dark:text-white">{member.name}</div>
                  {member.role && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">{member.role}</div>
                  )}
                  <div className="flex gap-2 mt-2">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-blue-600 hover:text-blue-800 text-sm">
                        Email
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                        GitHub
                      </a>
                    )}
                    {member.linkedIn && (
                      <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supervisor */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Supervisor</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Building className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">{project.supervisor.name}</span>
              </div>
              {project.supervisor.title && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{project.supervisor.title}</div>
              )}
              <div className="text-sm text-gray-600 dark:text-gray-400">{project.supervisor.department}</div>
              {project.supervisor.email && (
                <a href={`mailto:${project.supervisor.email}`} className="text-blue-600 hover:text-blue-800 text-sm">
                  {project.supervisor.email}
                </a>
              )}
            </div>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies & Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Project Links</h3>
            <div className="flex flex-wrap gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  Source Code
                </a>
              )}
              {project.documentUrl && (
                <a
                  href={project.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Documentation
                </a>
              )}
            </div>
          </div>


        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;