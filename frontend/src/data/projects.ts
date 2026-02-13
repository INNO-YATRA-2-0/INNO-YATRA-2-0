import type { Project, Category } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Smart Campus Navigation System',
    description: 'A comprehensive navigation system for the university campus using IoT sensors, machine learning, and mobile application interface. The system provides real-time indoor navigation, crowd density monitoring, and optimal path suggestions. Features include voice-guided navigation, accessibility support for visually impaired users, and integration with campus event systems.',
    shortDescription: 'IoT-based campus navigation with ML-powered path optimization',
    year: 2024,
    batch: '2020-2024',
    category: 'undergraduate',
    tags: ['IoT', 'Machine Learning', 'Mobile Development', 'React Native', 'Node.js'],
    teamMembers: [
      { id: '1', name: 'Rahul Sharma', email: 'rahul.sharma@university.ac.in', role: 'Full-Stack Developer' },
      { id: '2', name: 'Priya Patel', email: 'priya.patel@university.ac.in', role: 'ML Engineer' },
      { id: '3', name: 'Amit Kumar', email: 'amit.kumar@university.ac.in', role: 'IoT Specialist' },
      { id: '4', name: 'Sneha Gupta', email: 'sneha.gupta@university.ac.in', role: 'UI/UX Designer' }
    ],
    supervisor: {
      id: 's1',
      name: 'Dr. Vikram Nair',
      email: 'vikram.nair@university.ac.in',
      department: 'Information Science and Engineering',
      title: 'Associate Professor'
    },
    images: ['/api/placeholder/800/600', '/api/placeholder/800/400'],
    demoUrl: 'https://campusnav.demo.com',
    repoUrl: 'https://github.com/team/campus-nav',
    documentUrl: '/projects/campus-nav-report.pdf',
    featured: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-06-20T10:30:00Z'
  },
  {
    id: '2',
    title: 'Blockchain-based Academic Credential Verification',
    description: 'A decentralized system for issuing and verifying academic credentials using blockchain technology. The platform ensures tamper-proof certificate issuance, instant verification, and eliminates credential fraud. Built with Ethereum smart contracts and includes a web portal for institutions and verifiers.',
    shortDescription: 'Secure academic credential verification using blockchain technology',
    year: 2024,
    batch: '2020-2024',
    category: 'capstone',
    tags: ['Blockchain', 'Ethereum', 'Smart Contracts', 'Web3', 'React'],
    teamMembers: [
      { id: '5', name: 'Arjun Reddy', email: 'arjun.reddy@university.ac.in', role: 'Blockchain Developer' },
      { id: '6', name: 'Kavya Krishnan', email: 'kavya.krishnan@university.ac.in', role: 'Frontend Developer' },
      { id: '7', name: 'Rohit Singh', email: 'rohit.singh@university.ac.in', role: 'Smart Contract Developer' }
    ],
    supervisor: {
      id: 's2',
      name: 'Dr. Meera Joshi',
      email: 'meera.joshi@university.ac.in',
      department: 'Information Science and Engineering',
      title: 'Professor'
    },
    images: ['/api/placeholder/800/600', '/api/placeholder/800/400'],
    demoUrl: 'https://blockchain-creds.demo.com',
    repoUrl: 'https://github.com/team/blockchain-credentials',
    documentUrl: '/projects/blockchain-report.pdf',
    featured: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-06-25T14:45:00Z'
  },
  {
    id: '3',
    title: 'AI-Powered Mental Health Chatbot',
    description: 'An empathetic AI chatbot designed to provide mental health support to university students. Uses natural language processing and sentiment analysis to detect emotional states and provide appropriate responses. Includes crisis intervention protocols and integration with campus counseling services.',
    shortDescription: 'AI chatbot providing mental health support for students',
    year: 2024,
    batch: '2021-2025',
    category: 'research',
    tags: ['Artificial Intelligence', 'NLP', 'Python', 'TensorFlow', 'Mental Health'],
    teamMembers: [
      { id: '8', name: 'Anjali Verma', email: 'anjali.verma@university.ac.in', role: 'AI Researcher' },
      { id: '9', name: 'Karan Jain', email: 'karan.jain@university.ac.in', role: 'NLP Engineer' },
      { id: '10', name: 'Pooja Agarwal', email: 'pooja.agarwal@university.ac.in', role: 'Backend Developer' }
    ],
    supervisor: {
      id: 's3',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@university.ac.in',
      department: 'Information Science and Engineering',
      title: 'Assistant Professor'
    },
    images: ['/api/placeholder/800/600'],
    repoUrl: 'https://github.com/team/ai-chatbot',
    featured: false,
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-12-15T09:20:00Z'
  },
  {
    id: '4',
    title: 'Sustainable Energy Monitoring Dashboard',
    description: 'A comprehensive dashboard for monitoring and optimizing energy consumption across university buildings. Features real-time data visualization, predictive analytics for energy usage, and automated recommendations for energy savings. Built with IoT sensors and machine learning algorithms.',
    shortDescription: 'Real-time energy monitoring and optimization platform',
    year: 2023,
    batch: '2019-2023',
    category: 'undergraduate',
    tags: ['IoT', 'Data Visualization', 'Sustainability', 'React', 'Python', 'MongoDB'],
    teamMembers: [
      { id: '11', name: 'Deepak Mehta', email: 'deepak.mehta@university.ac.in', role: 'Data Analyst' },
      { id: '12', name: 'Riya Sharma', email: 'riya.sharma@university.ac.in', role: 'IoT Developer' },
      { id: '13', name: 'Vikas Gupta', email: 'vikas.gupta@university.ac.in', role: 'Frontend Developer' }
    ],
    supervisor: {
      id: 's4',
      name: 'Dr. Sunita Rani',
      email: 'sunita.rani@university.ac.in',
      department: 'Information Science and Engineering',
      title: 'Associate Professor'
    },
    images: ['/api/placeholder/800/600', '/api/placeholder/800/400'],
    demoUrl: 'https://energy-dashboard.demo.com',
    repoUrl: 'https://github.com/team/energy-monitor',
    documentUrl: '/projects/energy-report.pdf',
    featured: false,

    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2023-12-20T16:00:00Z'
  },
  {
    id: '5',
    title: 'Virtual Reality Campus Tour',
    description: 'An immersive VR experience showcasing the university campus for prospective students and virtual visitors. Features 360-degree campus views, interactive information points, and guided tour experiences. Developed using Unity and WebXR technologies.',
    shortDescription: 'Immersive VR campus tour for prospective students',
    year: 2023,
    batch: '2019-2023',
    category: 'capstone',
    tags: ['Virtual Reality', 'Unity', 'WebXR', '3D Modeling', 'C#'],
    teamMembers: [
      { id: '14', name: 'Akash Patel', email: 'akash.patel@university.ac.in', role: 'VR Developer' },
      { id: '15', name: 'Nisha Yadav', email: 'nisha.yadav@university.ac.in', role: '3D Artist' },
      { id: '16', name: 'Suresh Kumar', email: 'suresh.kumar@university.ac.in', role: 'Unity Developer' }
    ],
    supervisor: {
      id: 's5',
      name: 'Dr. Anil Tiwari',
      email: 'anil.tiwari@university.ac.in',
      department: 'Information Science and Engineering',
      title: 'Professor'
    },
    images: ['/api/placeholder/800/600', '/api/placeholder/800/400'],
    demoUrl: 'https://vr-campus-tour.demo.com',
    repoUrl: 'https://github.com/team/vr-campus',
    documentUrl: '/projects/vr-tour-report.pdf',
    featured: true,

    createdAt: '2023-08-15T00:00:00Z',
    updatedAt: '2023-11-30T12:15:00Z'
  },
  {
    id: '6',
    title: 'Automated Code Review System',
    description: 'An intelligent system that automatically reviews code submissions, detects bugs, suggests improvements, and provides educational feedback to programming students. Uses static analysis tools and machine learning to provide personalized learning recommendations.',
    shortDescription: 'AI-powered automated code review for programming education',
    year: 2024,
    batch: '2021-2025',
    category: 'research',
    tags: ['Machine Learning', 'Static Analysis', 'Education Technology', 'Python', 'Natural Language Processing'],
    teamMembers: [
      { id: '17', name: 'Gaurav Singh', email: 'gaurav.singh@university.ac.in', role: 'ML Engineer' },
      { id: '18', name: 'Shreya Joshi', email: 'shreya.joshi@university.ac.in', role: 'Backend Developer' },
      { id: '19', name: 'Manish Agrawal', email: 'manish.agrawal@university.ac.in', role: 'Frontend Developer' }
    ],
    supervisor: {
      id: 's6',
      name: 'Dr. Pradeep Sharma',
      email: 'pradeep.sharma@university.ac.in',
      department: 'Information Science and Engineering',
      title: 'Assistant Professor'
    },
    images: ['/api/placeholder/800/600'],
    repoUrl: 'https://github.com/team/code-review-system',
    featured: false,

    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-12-10T08:45:00Z'
  }
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'IoT & Smart Systems',
    slug: 'iot',
    description: 'Internet of Things projects involving sensors, automation, and connected devices',
    color: 'bg-blue-600',
    icon: 'Cpu',
    projectCount: projects.filter(p => p.tags.some(tag => tag.toLowerCase().includes('iot'))).length
  },
  {
    id: '2',
    name: 'Machine Learning & AI',
    slug: 'ai-ml',
    description: 'Artificial Intelligence and Machine Learning projects using advanced algorithms',
    color: 'bg-purple-600',
    icon: 'Brain',
    projectCount: projects.filter(p => p.tags.some(tag => 
      tag.toLowerCase().includes('machine learning') || 
      tag.toLowerCase().includes('ai') || 
      tag.toLowerCase().includes('artificial intelligence') ||
      tag.toLowerCase().includes('nlp')
    )).length
  },
  {
    id: '3',
    name: 'Blockchain & Web3',
    slug: 'blockchain',
    description: 'Decentralized applications and blockchain-based solutions',
    color: 'bg-orange-600',
    icon: 'Link',
    projectCount: projects.filter(p => p.tags.some(tag => 
      tag.toLowerCase().includes('blockchain') || 
      tag.toLowerCase().includes('web3') ||
      tag.toLowerCase().includes('ethereum')
    )).length
  },
  {
    id: '4',
    name: 'Web Development',
    slug: 'web',
    description: 'Full-stack web applications and modern web technologies',
    color: 'bg-green-600',
    icon: 'Globe',
    projectCount: projects.filter(p => p.tags.some(tag => 
      tag.toLowerCase().includes('react') || 
      tag.toLowerCase().includes('node') ||
      tag.toLowerCase().includes('web')
    )).length
  },
  {
    id: '5',
    name: 'Mobile Development',
    slug: 'mobile',
    description: 'Android, iOS, and cross-platform mobile applications',
    color: 'bg-pink-600',
    icon: 'Smartphone',
    projectCount: projects.filter(p => p.tags.some(tag => 
      tag.toLowerCase().includes('mobile') || 
      tag.toLowerCase().includes('react native') ||
      tag.toLowerCase().includes('android') ||
      tag.toLowerCase().includes('ios')
    )).length
  },
  {
    id: '6',
    name: 'VR/AR & 3D',
    slug: 'vr-ar',
    description: 'Virtual Reality, Augmented Reality, and 3D visualization projects',
    color: 'bg-indigo-600',
    icon: 'Box',
    projectCount: projects.filter(p => p.tags.some(tag => 
      tag.toLowerCase().includes('vr') || 
      tag.toLowerCase().includes('virtual reality') ||
      tag.toLowerCase().includes('ar') ||
      tag.toLowerCase().includes('3d') ||
      tag.toLowerCase().includes('unity')
    )).length
  },
  {
    id: '7',
    name: 'Data Science & Analytics',
    slug: 'data-science',
    description: 'Data analysis, visualization, and big data processing projects',
    color: 'bg-teal-600',
    icon: 'BarChart',
    projectCount: projects.filter(p => p.tags.some(tag => 
      tag.toLowerCase().includes('data') || 
      tag.toLowerCase().includes('visualization') ||
      tag.toLowerCase().includes('analytics') ||
      tag.toLowerCase().includes('mongodb')
    )).length
  },
  {
    id: '8',
    name: 'Cybersecurity',
    slug: 'security',
    description: 'Security, encryption, and privacy-focused projects',
    color: 'bg-red-600',
    icon: 'Shield',
    projectCount: projects.filter(p => p.tags.some(tag => 
      tag.toLowerCase().includes('security') || 
      tag.toLowerCase().includes('encryption') ||
      tag.toLowerCase().includes('privacy')
    )).length
  },
  {
    id: '9',
    name: 'Cloud Computing',
    slug: 'cloud',
    description: 'Cloud-based solutions and distributed systems',
    color: 'bg-sky-600',
    icon: 'Cloud',
    projectCount: projects.filter(p => p.tags.some(tag => 
      tag.toLowerCase().includes('cloud') || 
      tag.toLowerCase().includes('aws') ||
      tag.toLowerCase().includes('azure')
    )).length
  },
  {
    id: '10',
    name: 'Sustainability & Green Tech',
    slug: 'sustainability',
    description: 'Environmental and energy efficiency focused projects',
    color: 'bg-lime-600',
    icon: 'Leaf',
    projectCount: projects.filter(p => p.tags.some(tag => 
      tag.toLowerCase().includes('sustainability') || 
      tag.toLowerCase().includes('energy') ||
      tag.toLowerCase().includes('green')
    )).length
  },
  {
    id: '11',
    name: 'Education Technology',
    slug: 'edtech',
    description: 'Learning platforms and educational tools',
    color: 'bg-yellow-600',
    icon: 'BookOpen',
    projectCount: projects.filter(p => p.tags.some(tag => 
      tag.toLowerCase().includes('education') || 
      tag.toLowerCase().includes('learning') ||
      tag.toLowerCase().includes('teaching')
    )).length
  },
  {
    id: '12',
    name: 'Health & Medical Tech',
    slug: 'healthtech',
    description: 'Healthcare solutions and medical technology projects',
    color: 'bg-rose-600',
    icon: 'Heart',
    projectCount: projects.filter(p => p.tags.some(tag => 
      tag.toLowerCase().includes('health') || 
      tag.toLowerCase().includes('medical') ||
      tag.toLowerCase().includes('mental health')
    )).length
  }
];

export const years = Array.from(new Set(projects.map(p => p.year))).sort((a, b) => b - a);
export const batches = Array.from(new Set(projects.map(p => p.batch))).sort().reverse();
export const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort();