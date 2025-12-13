import { ICategory, IProject, ISkill, IStats } from '@/types';

export const mockCategories: ICategory[] = [
  { id: '1', name: 'Web Development' },
  { id: '2', name: 'Mobile App' },
  { id: '3', name: 'UI/UX Design' },
  { id: '4', name: 'Backend' },
];

export const mockSkills: ISkill[] = [
  { id: 's1', name: 'React', icon: 'react' },
  { id: 's2', name: 'Next.js', icon: 'nextjs' },
  { id: 's3', name: 'TypeScript', icon: 'typescript' },
  { id: 's4', name: 'Tailwind CSS', icon: 'tailwind' },
  { id: 's5', name: 'Node.js', icon: 'nodejs' },
  { id: 's6', name: 'Express.js', icon: 'express' },
  { id: 's7', name: 'Framer Motion', icon: 'framer' },
];

export const mockProjects: IProject[] = [
  {
    id: 'p1',
    name: 'Portfolio Website',
    description: 'A personal portfolio website showcasing various projects and skills.',
    imageUrl: '/images/project1.png', // Placeholder image
    categories: [mockCategories[0], mockCategories[2]],
    skills: [mockSkills[0], mockSkills[1], mockSkills[2], mockSkills[3], mockSkills[6]],
    githubUrl: 'https://github.com/your-username/portfolio',
    liveUrl: 'https://your-portfolio.com',
  },
  {
    id: 'p2',
    name: 'E-commerce Store',
    description: 'A full-stack e-commerce application with product listings, cart, and checkout.',
    imageUrl: '/images/project2.png', // Placeholder image
    categories: [mockCategories[0], mockCategories[3]],
    skills: [mockSkills[0], mockSkills[1], mockSkills[4], mockSkills[5]],
    githubUrl: 'https://github.com/your-username/ecommerce',
    liveUrl: 'https://your-ecommerce.com',
  },
  {
    id: 'p3',
    name: 'Mobile Task Manager',
    description: 'A mobile application for managing tasks and to-do lists.',
    imageUrl: '/images/project3.png', // Placeholder image
    categories: [mockCategories[1], mockCategories[2]],
    skills: [mockSkills[0], mockSkills[2]],
    githubUrl: 'https://github.com/your-username/task-manager',
  },
];

export const mockStats: IStats[] = [
  { id: 'st1', label: 'Projects Completed', value: 50, unit: '+' },
  { id: 'st2', label: 'Years of Experience', value: 5, unit: '' },
  { id: 'st3', label: 'Client Satisfaction', value: 99, unit: '%' },
];
