import type { Project, SearchFilters } from '../types';

const categoryTagMapping: { [key: string]: string[] } = {
  'iot': ['iot'],
  'ai-ml': ['machine learning', 'ai', 'artificial intelligence', 'nlp', 'tensorflow'],
  'blockchain': ['blockchain', 'web3', 'ethereum', 'smart contracts'],
  'web': ['react', 'node', 'web', 'frontend', 'backend'],
  'mobile': ['mobile', 'react native', 'android', 'ios'],
  'vr-ar': ['vr', 'virtual reality', 'ar', '3d', 'unity', 'webxr'],
  'data-science': ['data', 'visualization', 'analytics', 'mongodb', 'big data'],
  'security': ['security', 'encryption', 'privacy', 'cybersecurity'],
  'cloud': ['cloud', 'aws', 'azure', 'gcp'],
  'sustainability': ['sustainability', 'energy', 'green', 'environmental'],
  'edtech': ['education', 'learning', 'teaching', 'e-learning'],
  'healthtech': ['health', 'medical', 'mental health', 'healthcare']
};

const projectMatchesCategory = (project: Project, categorySlug: string): boolean => {
  const matchTerms = categoryTagMapping[categorySlug];
  if (!matchTerms) return false;
  
  return project.tags.some(tag => 
    matchTerms.some(term => tag.toLowerCase().includes(term.toLowerCase()))
  );
};

export const filterProjects = (projects: Project[], filters: SearchFilters): Project[] => {
  return projects.filter((project) => {
    // Search query filter
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matchesQuery = 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query)) ||
        project.teamMembers.some(member => member.name.toLowerCase().includes(query)) ||
        project.supervisor.name.toLowerCase().includes(query);
      
      if (!matchesQuery) return false;
    }

    // Category filter - now supports domain-based categories
    if (filters.category && filters.category !== 'all') {
      if (!projectMatchesCategory(project, filters.category)) return false;
    }

    // Year filter
    if (filters.year && filters.year !== 'all') {
      if (project.year.toString() !== filters.year) return false;
    }

    // Batch filter
    if (filters.batch && filters.batch !== 'all') {
      if (project.batch !== filters.batch) return false;
    }

    return true;
  });
};

export const sortProjects = (projects: Project[], sortBy: string): Project[] => {
  const sorted = [...projects];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'featured':
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    default:
      return sorted;
  }
};

export const paginateProjects = (projects: Project[], page: number, itemsPerPage: number) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return {
    projects: projects.slice(startIndex, endIndex),
    totalPages: Math.ceil(projects.length / itemsPerPage),
    totalItems: projects.length,
    currentPage: page,
    itemsPerPage
  };
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};