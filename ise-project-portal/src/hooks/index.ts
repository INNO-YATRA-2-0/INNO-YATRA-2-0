import { useState, useEffect, useMemo } from 'react';
import type { Project, SearchFilters } from '../types';
import { projects as projectsData } from '../data/projects';
import { filterProjects, sortProjects, paginateProjects, debounce } from '../utils';

export const useProjects = () => {
  const [projects] = useState<Project[]>(projectsData);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    year: 'all',
    batch: 'all',
    status: 'all'
  });
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const filteredProjects = useMemo(() => {
    return filterProjects(projects, filters);
  }, [projects, filters]);

  const sortedProjects = useMemo(() => {
    return sortProjects(filteredProjects, sortBy);
  }, [filteredProjects, sortBy]);

  const paginatedData = useMemo(() => {
    return paginateProjects(sortedProjects, currentPage, itemsPerPage);
  }, [sortedProjects, currentPage, itemsPerPage]);

  const debouncedUpdateQuery = debounce((query: string) => {
    setFilters(prev => ({ ...prev, query }));
    setCurrentPage(1);
  }, 300);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const updateSort = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      year: 'all',
      batch: 'all',
      status: 'all'
    });
    setCurrentPage(1);
  };

  return {
    projects: paginatedData.projects,
    allProjects: projects,
    filteredCount: filteredProjects.length,
    totalCount: projects.length,
    pagination: {
      currentPage: paginatedData.currentPage,
      totalPages: paginatedData.totalPages,
      totalItems: paginatedData.totalItems,
      itemsPerPage: paginatedData.itemsPerPage
    },
    filters,
    sortBy,
    updateFilters,
    updateSort,
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

export const useFeaturedProjects = (limit = 6) => {
  return useMemo(() => {
    return projectsData
      .filter(project => project.featured)
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }, [limit]);
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