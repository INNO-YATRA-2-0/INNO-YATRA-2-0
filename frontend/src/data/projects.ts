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
    name: 'Agriculture & Allied Sectors',
    slug: 'iot',
    description: 'Crop production, soil health card,rainfall data,MSP data,crop calendar,farm economics,Crop yield,soil type,rainfall,market prices,Agricultural prices,production statistics,Animal husbandry datasets,Minor/major irrigation data, and groundwater levels',
    color: 'bg-blue-500',
    icon: 'cpu',
    projectCount: 0
  },
  {
    id: 'web',
    name: 'Health & Nutrition',
    slug: 'web',
    description: 'NFHS health indicators, disease surveillance,HMIS, immunization,NFHS nutrition indicators,ICDS data,district-level nutrition surveys,Health facility records,IDSP surveillance,NFHS disease burden data,Drug approval data,disease epidemiology, and NFHS respiratory morbidity + CPCB air quality',
    color: 'bg-green-500',
    icon: 'globe',
    projectCount: 0
  },
  {
    id: 'ai-ml',
    name: 'Education & Skills',
    slug: 'ai-ml',
    description: 'UDISE school data, literacy rates,enrolment/dropout,teacher-pupil ratio,Census literacy data, and PMKVY scheme data',
    color: 'bg-purple-500',
    icon: 'brain',
    projectCount: 0
  },
  {
    id: 'mobile',
    name: 'Urban Development & Housing',
    slug: 'mobile',
    description: 'Urban Development & Housing,urban mobility surveys,SBM (Swachh Bharat) data,ULB performance,Census migration tables,NSSO mobility data,Urban infra data,vehicle registration stats,PMAY beneficiary data and Smart City ICT infrastructure indicators',
    color: 'bg-orange-500',
    icon: 'smartphone',
    projectCount: 0
  },
  {
    id: 'data-science',
    name: 'Transport & Infrastructure',
    slug: 'data-science',
    description: 'MoRTH road accident data, NCRB crash stats,Census commute,mobility,bus route data,District transport infra,NSSO mobility,Road/bridge vulnerability,and flood-prone zone data, and visual storytelling',
    color: 'bg-indigo-500',
    icon: 'bar-chart',
    projectCount: 0
  },
  {
    id: 'cybersecurity',
    name: 'Water Resources & Environment',
    slug: 'cybersecurity',
    description: 'CWC groundwater, JJM water supply data,IMD rainfall,CPCB emissions,SAFAR data,Flood/drought maps,NDM hazard datariver gauge sensor data, and Weather station',
    color: 'bg-red-500',
    icon: 'shield',
    projectCount: 0
  },
  {
    id: 'blockchain',
    name: 'Gender, Social Development & Welfare',
    slug: 'blockchain',
    description: 'NCRB crime against women, district safety data,SHG data,MUDRA loans,NSSO women workers,WCD ICDS data, and NFHS maternal nutrition',
    color: 'bg-yellow-500',
    icon: 'link',
    projectCount: 0
  },
  {
    id: 'game-dev',
    name: 'Finance, Economy & Digital Payments',
    slug: 'game-dev',
    description: 'Digital India BHIM transaction datasets, UPI adoption data ,NPCI transaction volumes,Jan Dhan data,NSSO consumer expenditure, and DPIIT retail',
    color: 'bg-pink-500',
    icon: 'gamepad-2',
    projectCount: 0
  },
  {
    id: 'research',
    name: 'Governance, Law & Justice',
    slug: 'research',
    description: 'Court case pendency (NJDG), NCRB, and Legal Aid data',
    color: 'bg-teal-500',
    icon: 'search',
    projectCount: 0
  },
  {
    id: 'research1',
    name: 'Industry, Technology & MSMEs',
    slug: 'research',
    description: 'ASI industrial output,NSSO enterprise surveys,industrial IoT context,Digital infrastructure indices and internet penetration data',
    color: 'bg-teal-500',
    icon: 'search',
    projectCount: 0
  },
   {
    id: 'research2',
    name: 'Disaster Management & Climate Resilience',
    slug: 'research',
    description: 'NDMA hazard data,IMD extreme weather data,District disaster risk indices,relief data and CWC climate, and emissions datasets',
    color: 'bg-teal-500',
    icon: 'search',
    projectCount: 0
  },
   {
    id: 'research3',
    name: 'Population, Census & Migration',
    slug: 'research',
    description: 'Census migration tables,NSSO mobility,Census age-group,child population data, and Census female workforce participation data',
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