// API base URL - uses proxy in development, full URL in production
const API_BASE_URL = import.meta.env.PROD ? 'https://innobackend.onrender.com/api' : '/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

// Authentication API
export const authAPI = {
  // Login
  login: async (email: string, password: string, batchId?: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, ...(batchId && { batchId }) }),
    });
    return handleResponse(response);
  },

  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Initialize admin (one-time setup)
  initializeAdmin: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/init-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  },

  // Register student (admin only)
  registerStudent: async (studentData: {
    email: string;
    password: string;
    name: string;
    batchId: string;
    batch: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register-student`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(studentData),
    });
    return handleResponse(response);
  },

  // Create batch (admin only)
  createBatch: async (batchData: {
    batchId: string;
    batch: string;
    department: string;
    year: number;
    totalStudents?: number;
    description?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/create-batch`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(batchData),
    });
    return handleResponse(response);
  },

  // Delete batch (admin only)
  deleteBatch: async (batchId: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/batches/${batchId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get all batches (admin only)
  getAllBatches: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/batches`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Projects API
export const projectsAPI = {
  // Get all projects
  getAllProjects: async (params: {
    page?: number;
    limit?: number;
    category?: string;
    year?: string;
    search?: string;
    approved?: boolean;
  } = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/projects?${searchParams}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get project by ID
  getProjectById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create project (student only)
  createProject: async (projectData: {
    title: string;
    description: string;
    shortDescription: string;
    year: number;
    category: string;
    tags: string[];
    teamMembers: Array<{
      name: string;
      email?: string;
      linkedIn?: string;
      github?: string;
      role?: string;
    }>;
    supervisor: {
      name: string;
      email: string;
      department: string;
      title: string;
    };
    demoUrl?: string;
    repoUrl?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    return handleResponse(response);
  },

  // Update project (student only - creator)
  updateProject: async (id: string, projectData: any) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    return handleResponse(response);
  },

  // Approve/reject project (admin only)
  approveProject: async (id: string, approve: boolean) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}/approve`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ approve }),
    });
    return handleResponse(response);
  },

  // Delete project (admin only)
  deleteProject: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get project statistics (admin only)
  getProjectStats: async () => {
    const response = await fetch(`${API_BASE_URL}/projects/admin/stats`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Users API
export const usersAPI = {
  // Get all users (admin only)
  getAllUsers: async (params: {
    page?: number;
    limit?: number;
    role?: string;
    batchId?: string;
    search?: string;
  } = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/users?${searchParams}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get user by ID
  getUserById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Update user
  updateUser: async (id: string, userData: { name?: string; email?: string }) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Deactivate user (admin only)
  deactivateUser: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}/deactivate`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Reactivate user (admin only)
  reactivateUser: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}/reactivate`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await fetch(`${API_BASE_URL}/users/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return handleResponse(response);
  },

  // Get user statistics (admin only)
  getUserStats: async () => {
    const response = await fetch(`${API_BASE_URL}/users/admin/stats`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Utility functions
export const utils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  // Check if user is admin
  isAdmin: () => {
    const user = utils.getCurrentUser();
    return user?.role === 'admin';
  },

  // Check if user is student
  isStudent: () => {
    const user = utils.getCurrentUser();
    return user?.role === 'student';
  },
};

export default {
  authAPI,
  projectsAPI,
  usersAPI,
  utils,
};