// lib/data.ts
import { useQuery } from "@tanstack/react-query";
import { Props } from "next/script";

/* ─────────────────────── Types (simplified) ─────────────────────── */
export interface BlogPost {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;               // plain markdown / rich-text JSON
    coverImage?: { fields: { file: { url: string } } };
    category?: string;
    publishedDate?: string;
    readTime?: number;
    published?: boolean;
  };
}

export interface Project {
  sys: { id: string };
  fields: {
    title: string;
    description: string;
    longDescription?: string;
    imageUrl?: { fields: { file: { url: string } } };
    projectUrl?: string;
    technologies?: string[];
    githubUrl?: string;
    category?: string;
    featured?: boolean;
    completionDate?: string;
    client?: string;
  };
}

/* ─────────────────────── Fetchers ─────────────────────── */
export async function fetchBlogPosts(
  filter: { published?: boolean; category?: string } = { published: true },
  limit = 10
): Promise<BlogPost[]> {
  const p = new URLSearchParams();
  p.append("limit", limit.toString());
  if (filter.published !== undefined) p.append("published", filter.published.toString());
  if (filter.category) p.append("category", filter.category);
  const res = await fetch(`/api/contentful/blog-posts?${p}`);
  return res.json();
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug) return null;

  const res = await fetch(`/api/contentful/blog-posts/${slug}`);
  
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch blog post");
  }

  return res.json();
}

export async function fetchProjects(
  filter: { featured?: boolean; category?: string } = {},
  limit?: number
): Promise<Project[]> {
  const p = new URLSearchParams();
  if (limit) p.append("limit", limit.toString());
  if (filter.featured !== undefined) p.append("featured", filter.featured.toString());
  if (filter.category) p.append("category", filter.category);
  const res = await fetch(`/api/contentful/projects?${p}`);
  return res.json();
}

/* ─────────────────────── Hooks ─────────────────────── */
export function useBlogPosts(
  filter: { published?: boolean; category?: string } = { published: true },
  limit = 10
) {
  return useQuery({
    queryKey: ["blog-posts", filter, limit],
    queryFn: () => fetchBlogPosts(filter, limit),
  });
}

export function useBlogPostBySlug(slug: string) {
  return useQuery({
    queryKey: ["blog-posts", slug],  // Unique per slug
    queryFn: () => fetchBlogPostBySlug(slug),
    enabled: !!slug,  // Only run if slug exists
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProjects(
  filter: { featured?: boolean; category?: string } = {},
  limit?: number
) {
  return useQuery({
    queryKey: ["projects", filter, limit],
    queryFn: () => fetchProjects(filter, limit),
  });
}