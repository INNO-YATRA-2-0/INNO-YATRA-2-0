import type { Project, Category } from '../types';

// Projects will now be fetched from the backend API
export const projects: Project[] = [];

export const categories: Category[] = [
  {
    id: 'all',
    name: 'All Projects',
    slug: 'all',
    description: 'Browse the complete collection of student innovations',
    color: 'bg-gray-500',
    icon: 'grid-3x3',
    projectCount: 0
  },
  {
    id: 'iot',
    name: 'IoT & Embedded',
    slug: 'iot',
    description: 'Smart devices, sensor networks, and embedded systems solutions',
    color: 'bg-blue-500',
    icon: 'cpu',
    projectCount: 0
  },
  {
    id: 'web',
    name: 'Web Development',
    slug: 'web',
    description: 'Full-stack web apps, APIs, and modern frontend experiences',
    color: 'bg-green-500',
    icon: 'globe',
    projectCount: 0
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    slug: 'ai-ml',
    description: 'Intelligent systems, deep learning models, and NLP solutions',
    color: 'bg-purple-500',
    icon: 'brain',
    projectCount: 0
  },
  {
    id: 'mobile',
    name: 'Mobile Apps',
    slug: 'mobile',
    description: 'Native and cross-platform apps for Android and iOS',
    color: 'bg-orange-500',
    icon: 'smartphone',
    projectCount: 0
  },
  {
    id: 'data-science',
    name: 'Data Science',
    slug: 'data-science',
    description: 'Data pipelines, analytics dashboards, and visual storytelling',
    color: 'bg-indigo-500',
    icon: 'bar-chart',
    projectCount: 0
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Security tools, penetration testing, and privacy frameworks',
    color: 'bg-red-500',
    icon: 'shield',
    projectCount: 0
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'Decentralized apps, smart contracts, and Web3 solutions',
    color: 'bg-yellow-500',
    icon: 'link',
    projectCount: 0
  },
  {
    id: 'game-dev',
    name: 'Game Development',
    slug: 'game-dev',
    description: 'Interactive games, simulations, and immersive experiences',
    color: 'bg-pink-500',
    icon: 'gamepad-2',
    projectCount: 0
  },
  {
    id: 'research',
    name: 'Research',
    slug: 'research',
    description: 'Academic research, experimental prototypes, and publications',
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