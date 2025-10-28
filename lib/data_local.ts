// lib/data.ts
import { format } from "date-fns";

// lib/data.ts

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category?: string;
  publishedDate?: string;
  read_time?: number;
  published: boolean;
  created_by?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  imageUrl?: string;
  technologies?: string[];
  projectUrl?: string;
  githubUrl?: string;
  category?: string;
  featured: boolean;
  completion_date?: string;
  client?: string;
};

// Sample blog posts data (fill with your actual data)
export const blogPosts = [
  {
    id: "1",
    title: "Understanding React Hooks",
    slug: "understanding-react-hooks",
    excerpt: "A deep dive into React hooks and best practices.",
    content: "# Understanding React Hooks\n\nReact hooks are...",
    coverImage: "https://example.com/image1.jpg",
    category: "Development",
    publishedDate: "2023-01-15",
    read_time: 8,
    published: true,
    created_by: "Franc Alvenn Dela Cruz",
  },
  {
    id: "2",
    title: "Building Scalable Apps",
    slug: "building-scalable-apps",
    excerpt: "Tips for building scalable web applications.",
    content: "# Building Scalable Apps\n\nIn this post...",
    coverImage: "https://example.com/image2.jpg",
    category: "Technology",
    publishedDate: "2023-02-20",
    read_time: 10,
    published: true,
    created_by: "Franc Alvenn Dela Cruz",
  },
  {
    id: "3",
    title: "UI Design Principles",
    slug: "ui-design-principles",
    excerpt: "Essential principles for modern UI design.",
    content: "# UI Design Principles\n\nDesign is...",
    coverImage: "https://example.com/image3.jpg",
    category: "Design",
    publishedDate: "2023-03-10",
    read_time: 6,
    published: true,
    created_by: "Franc Alvenn Dela Cruz",
  },
  // Add more as needed
];

// Sample projects data (fill with your actual data)
export const projects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured online store.",
    long_description: "Detailed description of the e-commerce platform...",
    imageUrl: "https://example.com/project1.jpg",
    technologies: ["React", "Node.js", "MongoDB"],
    projectUrl: "https://example.com/project1",
    githubUrl: "https://github.com/user/project1",
    category: "E-commerce",
    featured: true,
    completion_date: "2023-04-01",
    client: "Client A",
  },
  {
    id: "2",
    title: "Mobile Banking App",
    description: "Secure mobile banking application.",
    long_description: "Detailed description of the banking app...",
    imageUrl: "https://example.com/project2.jpg",
    technologies: ["React Native", "Firebase"],
    projectUrl: "https://example.com/project2",
    githubUrl: "https://github.com/user/project2",
    category: "Mobile App",
    featured: true,
    completion_date: "2023-05-15",
    client: "Client B",
  },
  {
    id: "3",
    title: "SaaS Dashboard",
    description: "Analytics dashboard for SaaS.",
    long_description: "Detailed description of the dashboard...",
    imageUrl: "https://example.com/project3.jpg",
    technologies: ["Next.js", "PostgreSQL"],
    projectUrl: "https://example.com/project3",
    githubUrl: "https://github.com/user/project3",
    category: "SaaS",
    featured: false,
    completion_date: "2023-06-20",
    client: "Client C",
  },
  {
    id: "4",
    title: "Portfolio Website",
    description: "Personal portfolio site.",
    long_description: "Detailed description of the portfolio...",
    imageUrl: "https://example.com/project4.jpg",
    technologies: ["Next.js", "Tailwind CSS"],
    projectUrl: "https://example.com/project4",
    githubUrl: "https://github.com/user/project4",
    category: "Web Application",
    featured: true,
    completion_date: "2023-07-10",
    client: "Self",
  },
  // Add more as needed
];

// Helper: Type-safe filter for BlogPost
export function fetchBlogPosts(
  filter: Partial<BlogPost> = {},
  sort: keyof BlogPost | `-${keyof BlogPost}` = "-publishedDate",
  limit?: number
): BlogPost[] {
  let result = blogPosts.filter((post) => {
    return Object.entries(filter).every(([key, value]) => {
      return post[key as keyof BlogPost] === value;
    });
  });

  // Sort
  const desc = sort.startsWith("-");
  const field = desc ? sort.slice(1) : sort;
  result.sort((a, b) => {
    const valA = a[field as keyof BlogPost];
    const valB = b[field as keyof BlogPost];
    if (valA == null || valB == null) return 0;
    if (desc) return valB > valA ? 1 : valB < valA ? -1 : 0;
    return valA > valB ? 1 : valA < valB ? -1 : 0;
  });

  if (limit) result = result.slice(0, limit);
  return result;
}

// Helper: Type-safe filter for Project
export function fetchProjects(
  filter: Partial<Project> = {},
  sort: keyof Project | `-${keyof Project}` = "-completion_date",
  limit?: number
): Project[] {
  let result = projects.filter((proj) => {
    return Object.entries(filter).every(([key, value]) => {
      return proj[key as keyof Project] === value;
    });
  });

  const desc = sort.startsWith("-");
  const field = desc ? sort.slice(1) : sort;
  result.sort((a, b) => {
    const valA = a[field as keyof Project];
    const valB = b[field as keyof Project];
    if (valA == null || valB == null) return 0;
    if (desc) return valB > valA ? 1 : valB < valA ? -1 : 0;
    return valA > valB ? 1 : valA < valB ? -1 : 0;
  });

  if (limit) result = result.slice(0, limit);
  return result;
}

// For single blog post by id
export function fetchBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}