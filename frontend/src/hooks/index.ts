import { useState, useEffect, useMemo } from 'react';
import type { Project, SearchFilters } from '../types';
import { projects as projectsData } from '../data/projects';
import { filterProjects, paginateProjects, debounce } from '../utils';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    year: 'all',
    batch: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const params: any = {
          page: currentPage,
          limit: itemsPerPage
        };

        if (filters.category && filters.category !== 'all') {
          params.category = filters.category;
        }
        if (filters.year && filters.year !== 'all') {
          params.year = filters.year;
        }
        if (filters.batch && filters.batch !== 'all') {
          params.batch = filters.batch;
        }
        if (filters.query) {
          params.search = filters.query;
        }

        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, value.toString());
          }
        });

        // Use public endpoint for home page
        const response = await fetch(`/api/projects/public?${searchParams}`);
        const data = await response.json();

        if (data.success) {
          setProjects(data.data.projects || []);
          setTotalCount(data.data.pagination?.totalItems || 0);
        } else {
          throw new Error(data.message || 'Failed to fetch projects');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch projects');
        // Fallback to static data if API fails
        const filteredStatic = filterProjects(projectsData, filters);
        const paginatedStatic = paginateProjects(filteredStatic, currentPage, itemsPerPage);
        setProjects(paginatedStatic.projects);
        setTotalCount(filteredStatic.length);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filters, currentPage, itemsPerPage]);

  const pagination = useMemo(() => {
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    return {
      currentPage,
      totalPages,
      totalItems: totalCount,
      itemsPerPage
    };
  }, [currentPage, totalCount, itemsPerPage]);

  const debouncedUpdateQuery = debounce((query: string) => {
    setFilters(prev => ({ ...prev, query }));
    setCurrentPage(1);
  }, 300);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      year: 'all',
      batch: 'all',
    });
    setCurrentPage(1);
  };

  return {
    projects,
    allProjects: projects,
    filteredCount: totalCount,
    totalCount,
    pagination,
    filters,
    loading,
    error,
    updateFilters,
    updateQuery: debouncedUpdateQuery,
    setCurrentPage,
    resetFilters
  };
};

export const useProject = (id: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const foundProject = projectsData.find(p => p.id === id);
        if (foundProject) {
          setProject(foundProject);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError('Error fetching project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return { project, loading, error };
};

export const useRecentProjects = (limit = 6) => {
  return useMemo(() => {
    return projectsData
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }, [limit]);
};

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};