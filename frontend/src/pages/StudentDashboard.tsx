import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, Folder, Users } from 'lucide-react';
import AddProject from './AddProject.tsx';

const API_BASE_URL = import.meta.env.PROD ? 'https://innobackend.onrender.com/api' : '/api';

interface Project {
  _id: string;
  title: string;
  shortDescription: string;
  batchId: string;
  year: number;
  isApproved: boolean;
  createdAt: string;
}

const StudentDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/student/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchProjects(parsedUser.batchId);
    setInitializing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProjects = async (batchId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/projects?batchId=${batchId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProjects(data.data.projects || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/student/login');
  };

  const handleProjectAdded = () => {
    setShowAddProject(false);
    if (user?.batchId) {
      fetchProjects(user.batchId);
    }
  };

  if (showAddProject) {
    return <AddProject onBack={() => setShowAddProject(false)} onSuccess={handleProjectAdded} />;
  }

  if (initializing || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                {user?.name} • Batch: {user?.batchId}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">My Batch Projects</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{projects.length}</p>
              </div>
              <Folder className="h-10 w-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">My Batch</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {user?.batchId?.replace(/([A-Z]+)(\d{4})(\d{2})/, '$1$3') || 'N/A'}
                </p>
              </div>
              <Users className="h-10 w-10 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Add Project Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddProject(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="h-5 w-5" />
            Add New Project
          </button>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Batch {user?.batchId} Projects</h2>
          </div>
          <div className="divide-y">
            {loading ? (
              <div className="px-6 py-12 text-center text-gray-500">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No projects yet. Click "Add New Project" to get started.
              </div>
            ) : (
              projects.map((project) => (
                <div key={project._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{project.shortDescription}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">Year: {project.year}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
