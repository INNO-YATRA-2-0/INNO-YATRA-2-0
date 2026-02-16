import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, Folder, CheckCircle, Users, Edit, UserPlus, Eye, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import AddProject from './AddProject.tsx';
import { authAPI, usersAPI, projectsAPI } from '../services/api';

interface Project {
  _id: string;
  title: string;
  shortDescription: string;
  batchId: string;
  batch: string;
  year: number;
  isApproved: boolean;
  createdAt: string;
}

interface Batch {
  batchId: string;
  batch: string;
  department: string;
  year: number;
  totalStudents?: number;
  description?: string;
}

interface Student {
  _id: string;
  name: string;
  email: string;
  batchId: string;
  batch: string;
  isActive: boolean;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'students'>('projects');
  const [showISEBranches, setShowISEBranches] = useState(false);
  const [iseBatches, setIseBatches] = useState<Batch[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/admin/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchProjects();
    fetchBatches();
    fetchStudents();
    setInitializing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedBatch) {
      fetchProjects(selectedBatch);
    } else {
      fetchProjects();
    }
  }, [selectedBatch]);

  const fetchProjects = async (batchId?: string) => {
    try {
      const token = localStorage.getItem('token');
      const url = batchId ? `/api/projects?batchId=${batchId}` : '/api/projects';
      const response = await fetch(url, {
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

  const fetchBatches = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/batches', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        // Filter only ISE batches
        const allBatches = data.data.batches || [];
        const iseOnly = allBatches.filter((batch: Batch) => 
          batch.batchId.toLowerCase().includes('ise')
        );
        setBatches(iseOnly);
        
        // Set ISE 2026 batches specifically
        const ise2026 = iseOnly.filter((batch: Batch) => 
          batch.batchId.toLowerCase().includes('ise2026')
        );
        setIseBatches(ise2026);
      }
    } catch (error) {
      console.error('Error fetching batches:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await usersAPI.getAllUsers({ role: 'student' });
      if (response.success) {
        setStudents(response.data.users || []);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = async (studentData: {
    name: string;
    email: string;
    password: string;
    batchId: string;
    batch: string;
  }) => {
    try {
      // Check if batch ID already exists
      const existingStudent = students.find(student => student.batchId === studentData.batchId);
      if (existingStudent) {
        alert(`Error: Batch ID "${studentData.batchId}" is already assigned to student "${existingStudent.name}". Each batch ID can only be assigned to one student.`);
        return;
      }
      
      await authAPI.registerStudent(studentData);
      fetchStudents();
      setShowAddStudent(false);
      alert('Student added successfully!');
    } catch (error) {
      alert('Failed to add student: ' + (error as Error).message);
    }
  };

  const handleDeleteProject = async (projectId: string, projectTitle: string) => {
    if (!confirm(`Are you sure you want to delete the project "${projectTitle}"? This action cannot be undone.`)) {
      return;
    }
    
    try {
      await projectsAPI.deleteProject(projectId);
      alert('Project deleted successfully!');
      fetchProjects(selectedBatch);
    } catch (error) {
      alert('Error deleting project: ' + (error as Error).message);
    }
  };

  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    if (!confirm(`Are you sure you want to delete the student "${studentName}"? This action cannot be undone.`)) {
      return;
    }
    
    try {
      await usersAPI.deactivateUser(studentId);
      alert('Student deleted successfully!');
      fetchStudents();
    } catch (error) {
      alert('Error deleting student: ' + (error as Error).message);
    }
  };

  const handleDeleteBatch = async (batchId: string) => {
    if (!confirm(`Are you sure you want to delete batch "${batchId}"? This action cannot be undone.`)) {
      return;
    }
    
    try {
      await authAPI.deleteBatch(batchId);
      alert(`Batch ${batchId} deleted successfully!`);
      fetchBatches();
      // Reset selection if the deleted batch was selected
      if (selectedBatch === batchId) {
        setSelectedBatch('');
      }
    } catch (error) {
      alert('Error deleting batch: ' + (error as Error).message);
    }
  };

  const handleISEClick = () => {
    if (showISEBranches) {
      // If dropdown is open, close it and show all ISE projects
      setSelectedBatch('');
      setShowISEBranches(false);
    } else {
      // Open dropdown to show ISE batches
      setShowISEBranches(true);
    }
  };

  const handleISEBatchSelect = (batchId: string) => {
    setSelectedBatch(batchId);
    setShowISEBranches(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const handleProjectAdded = () => {
    setShowAddProject(false);
    fetchProjects();
  };

  // Student Form Component
  const AddStudentForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      batchId: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.password || !formData.batchId) {
        alert('Please fill all required fields');
        return;
      }
      
      const studentData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        batchId: formData.batchId,
        batch: 'Information Science and Engineering'
      };
      
      handleAddStudent(studentData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h2 className="text-xl font-bold mb-4">Add New Student</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Student Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="student@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password for student"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch ID*</label>
              <input
                type="text"
                value={formData.batchId}
                onChange={(e) => setFormData({ ...formData, batchId: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ISE202601, ISE202602, ISE202603"
              />
              <p className="text-xs text-gray-500 mt-1">Enter ISE 2026 batch ID (ISE202601, ISE202602, or ISE202603)</p>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Student
              </button>
              <button
                type="button"
                onClick={() => setShowAddStudent(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            * Admin should provide the password to the student team leader
          </p>
        </div>
      </div>
    );
  };

  if (showAddProject) {
    return <AddProject onBack={() => setShowAddProject(false)} onSuccess={handleProjectAdded} />;
  }

  if (showAddStudent) {
    return <AddStudentForm />;
  }

  if (editingProject) {
    return (
      <AddProject 
        project={editingProject}
        isEditing={true}
        onBack={() => setEditingProject(null)} 
        onSuccess={() => {
          setEditingProject(null);
          fetchProjects(selectedBatch);
        }} 
      />
    );
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
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome, {user?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
          
          {/* Navigation Tabs */}
          <div className="mt-4 border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'projects'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Projects Management
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'students'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Student Management
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Projects</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{projects.length}</p>
                  </div>
                  <Folder className="h-10 w-10 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Approved</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">
                      {projects.filter(p => p.isApproved).length}
                    </p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Batches</p>
                    <p className="text-3xl font-bold text-blue-600 mt-1">{batches.length}</p>
                  </div>
                  <Users className="h-10 w-10 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Batch Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedBatch('')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    !selectedBatch
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border hover:bg-gray-50'
                  }`}
                >
                  All ISE Projects
                </button>
                
                {/* ISE 2026 Branch Button */}
                <div className="relative">
                  <button
                    onClick={handleISEClick}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      showISEBranches || iseBatches.some(batch => batch.batchId === selectedBatch)
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700 border hover:bg-gray-50'
                    }`}
                  >
                    ISE 2026 Batches
                    {showISEBranches ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  
                  {/* ISE 2026 Branches Dropdown */}
                  {showISEBranches && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px]">
                      {iseBatches.map((batch) => (
                        <div
                          key={batch.batchId}
                          className={`flex items-center justify-between px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                            selectedBatch === batch.batchId ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                          }`}
                        >
                          <button
                            onClick={() => handleISEBatchSelect(batch.batchId)}
                            className="flex-1 text-left"
                          >
                            {batch.batchId}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBatch(batch.batchId);
                            }}
                            className="ml-2 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title={`Delete ${batch.batchId}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      {iseBatches.length === 0 && (
                        <div className="px-4 py-2 text-gray-500 text-sm">
                          No ISE 2026 batches found
                        </div>
                      )}
                    </div>
                  )}
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
                <h2 className="text-lg font-semibold text-gray-900">All Projects</h2>
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
                            <span className="text-xs text-gray-500">Batch: {project.batchId}</span>
                            <span className="text-xs text-gray-500">Year: {project.year}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Project"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project._id, project.title)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          {project.isApproved ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              <CheckCircle className="h-3 w-3" />
                              Approved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'students' && (
          <>
            {/* Student Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{students.length}</p>
                  </div>
                  <Users className="h-10 w-10 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Students</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">
                      {students.filter(s => s.isActive).length}
                    </p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Batches</p>
                    <p className="text-3xl font-bold text-blue-600 mt-1">{batches.length}</p>
                  </div>
                  <Folder className="h-10 w-10 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Student Management Buttons */}
            <div className="mb-6 flex gap-3">
              <button
                onClick={() => setShowAddStudent(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                <UserPlus className="h-5 w-5" />
                Add New Student
              </button>
              <button
                onClick={() => setShowStudentList(!showStudentList)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                <Eye className="h-5 w-5" />
                {showStudentList ? 'Hide' : 'View'} All Students
              </button>
            </div>

            {/* Students List */}
            {showStudentList && (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">All Students</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                            No students found. Add students to get started.
                          </td>
                        </tr>
                      ) : (
                        students.map((student) => (
                          <tr key={student._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {student.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.batchId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.batch}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {student.isActive ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(student.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleDeleteStudent(student._id, student.name)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Student"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
