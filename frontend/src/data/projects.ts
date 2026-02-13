import type { Project, Category } from '../types';

// Projects will now be fetched from the backend API
export const projects: Project[] = [];

export const categories: Category[] = [
  {
    id: 'all',
    name: 'All Projects',
    slug: 'all',
    description: 'View all approved projects',
    color: 'bg-gray-500',
    icon: 'grid-3x3',
    projectCount: 0
  },
  {
    id: 'undergraduate',
    name: 'Undergraduate',
    slug: 'undergraduate',
    description: 'Final year undergraduate projects',
    color: 'bg-blue-500',
    icon: 'graduation-cap',
    projectCount: 0
  },
  {
    id: 'capstone',
    name: 'Capstone',
    slug: 'capstone',
    description: 'Advanced capstone projects',
    color: 'bg-purple-500',
    icon: 'award',
    projectCount: 0
  },
  {
    id: 'research',
    name: 'Research',
    slug: 'research',
    description: 'Research-based projects',
    color: 'bg-green-500',
    icon: 'search',
    projectCount: 0
  },
  {
    id: 'internship',
    name: 'Internship',
    slug: 'internship',
    description: 'Industry internship projects',
    color: 'bg-orange-500',
    icon: 'building',
    projectCount: 0
  }
];

export const years: number[] = [];
export const batches: string[] = [];
export const allTags: string[] = [];

// Helper function to update dynamic data from API
export const updateProjectData = (apiProjects: Project[]) => {
  // Update projects array
  projects.length = 0;
  projects.push(...apiProjects);
  
  // Update years
  const uniqueYears = Array.from(new Set(apiProjects.map(p => p.year))).sort((a, b) => b - a);
  years.length = 0;
  years.push(...uniqueYears);
  
  // Update batches
  const uniqueBatches = Array.from(new Set(apiProjects.map(p => p.batch))).sort().reverse();
  batches.length = 0;
  batches.push(...uniqueBatches);
  
  // Update tags
  const uniqueTags = Array.from(new Set(apiProjects.flatMap(p => p.tags))).sort();
  allTags.length = 0;
  allTags.push(...uniqueTags);
  
  // Update category counts
  categories.forEach(category => {
    if (category.id === 'all') {
      category.projectCount = apiProjects.length;
    } else {
      category.projectCount = apiProjects.filter(p => p.category === category.id).length;
    }
  });
};