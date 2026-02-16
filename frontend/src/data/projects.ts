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
    id: 'iot',
    name: 'IoT & Embedded',
    slug: 'iot',
    description: 'Internet of Things and embedded systems projects',
    color: 'bg-blue-500',
    icon: 'cpu',
    projectCount: 0
  },
  {
    id: 'web',
    name: 'Web Development',
    slug: 'web',
    description: 'Web applications and frontend/backend projects',
    color: 'bg-green-500',
    icon: 'globe',
    projectCount: 0
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    slug: 'ai-ml',
    description: 'Artificial Intelligence and Machine Learning projects',
    color: 'bg-purple-500',
    icon: 'brain',
    projectCount: 0
  },
  {
    id: 'mobile',
    name: 'Mobile Apps',
    slug: 'mobile',
    description: 'Android, iOS, and cross-platform mobile applications',
    color: 'bg-orange-500',
    icon: 'smartphone',
    projectCount: 0
  },
  {
    id: 'data-science',
    name: 'Data Science',
    slug: 'data-science',
    description: 'Data analysis, visualization, and big data projects',
    color: 'bg-indigo-500',
    icon: 'bar-chart',
    projectCount: 0
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Information security and cybersecurity projects',
    color: 'bg-red-500',
    icon: 'shield',
    projectCount: 0
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'Blockchain and cryptocurrency related projects',
    color: 'bg-yellow-500',
    icon: 'link',
    projectCount: 0
  },
  {
    id: 'game-dev',
    name: 'Game Development',
    slug: 'game-dev',
    description: 'Video games and interactive media projects',
    color: 'bg-pink-500',
    icon: 'gamepad-2',
    projectCount: 0
  },
  {
    id: 'research',
    name: 'Research',
    slug: 'research',
    description: 'Academic research and experimental projects',
    color: 'bg-teal-500',
    icon: 'search',
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