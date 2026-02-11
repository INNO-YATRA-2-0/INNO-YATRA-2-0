export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  year: number;
  batch: string;
  category: string;
  tags: string[];
  status: 'Completed' | 'In Progress' | 'Proposal';
  teamMembers: TeamMember[];
  supervisor: Supervisor;
  images: string[];
  demoUrl?: string;
  repoUrl?: string;
  documentUrl?: string;
  featured: boolean;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email?: string;
  linkedIn?: string;
  github?: string;
  role?: string;
}

export interface Supervisor {
  id: string;
  name: string;
  email: string;
  department: string;
  title: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  projectCount: number;
}

export interface SearchFilters {
  query: string;
  category: string;
  year: string;
  batch: string;
  status: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}