// app/blog/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchBlogPosts } from "@/lib/data";
import { Calendar, Clock, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { useBlogPosts } from "@/lib/data";

// Utility: Create blog post URL
const createBlogPostUrl = (id: string) => `/blog/${id}`;

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // LOCAL QUERY
  // const { data: blogPostsData = [], isLoading } = useQuery({
  //   queryKey: ["blog-posts"],
  //   queryFn: () => Promise.resolve(fetchBlogPosts({ published: true }, "-publishedDate")),
  // });

  const { data: blogPostsData = [], isLoading } = useBlogPosts(
    { published: true },
    // No limit here for full list
  );

  // Extract unique categories safely
  const categories = useMemo(() => {
    const cats = blogPostsData
      .map((post) => post.fields.category)
      .filter((cat): cat is string => Boolean(cat));
    return ["All", ...new Set(cats)];
  }, [blogPostsData]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPostsData.filter((post) => {
      const matchesSearch =
        post.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.fields.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesCategory = selectedCategory === "All" || post.fields.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogPostsData, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-sm font-medium">My Blog</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Thoughts & Stories
          </h1>
          <p className="text-xl text-white max-w-2xl">
            Exploring technology, design, and everything in between
          </p>
        </div>

      </section>

      {/* Search and Filter */}
      <section className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse mb-3" />
                    <div className="h-16 bg-gray-200 rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link key={post.sys.id} href={`/blog/${post.fields.slug}`} className="block h-full">
                  <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full group cursor-pointer">
                    {post.fields.coverImage ? (
                      <div className="h-48 overflow-hidden bg-gray-100">
                        <Image
                          src={`https:${post.fields.coverImage.fields.file.url}?w=1200&h=600&fit=crop`}
                          alt={post.fields.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          width={500}
                          height={500}
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-indigo-300" />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        {post.fields.publishedDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(post.fields.publishedDate), "MMM d, yyyy")}
                          </span>
                        )}
                        {post.fields.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.fields.readTime} min
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {post.fields.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">{post.fields.excerpt}</p>
                      {post.fields.category && (
                        <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
                          {post.fields.category}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border-dashed border-2 border-gray-300">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-500">Try adjusting your search or filter</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}