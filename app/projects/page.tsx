// app/projects/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/data";
import { Briefcase, ExternalLink, Github, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/lib/data";
import Image from "next/image";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // LOCAL QUERY
  // const { data: projectsData = [], isLoading } = useQuery<Project[]>({
  //   queryKey: ["projects"],
  //   queryFn: () => Promise.resolve(fetchProjects({}, "-completion_date")),
  // });

  const { data: projectsData = [], isLoading } = useProjects(
    {}, // No filter → all projects
  );

  // Update categories (client-side)
  const categories = useMemo(() => {
    const cats = projectsData
      .map((p) => p.fields.category)
      .filter((cat): cat is string => Boolean(cat));
    return ["All", ...new Set(cats)];
  }, [projectsData]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projectsData;
    return projectsData.filter((p) => p.fields.category === selectedCategory);
  }, [projectsData, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gray-900 text-white py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-sm font-medium">My Projects</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Things I’ve built and loved</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            A comprehensive collection of my work, showcasing various projects across different domains
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0">
            <Filter className="w-5 h-5 text-gray-400 shrink-0" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category 
                    ? "bg-gray-900 hover:bg-gray-800 text-white" 
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200 animate-pulse" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-3/4" />
                    <div className="h-16 bg-gray-200 rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.sys.id}
                  className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    {project.fields.imageUrl ? (
                      <Image
                        src={`https:${project.fields.imageUrl.fields.file.url}`}
                        alt={project.fields.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={500}
                        height={500}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <Briefcase className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                        {project.fields.title}
                      </h3>
                      <div className="flex gap-2">
                        {project.fields.projectUrl && (
                          <a 
                            href={project.fields.projectUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-900 transition-all"
                            aria-label="Live demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.fields.githubUrl && (
                          <a 
                            href={project.fields.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-900 transition-all"
                            aria-label="GitHub repo"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {project.fields.client && (
                      <div className="text-sm text-gray-500 mb-2">Client: {project.fields.client}</div>
                    )}
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.fields.longDescription || project.fields.longDescription}
                    </p>
                    
                    {project.fields.category && (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700 mb-4">
                        {project.fields.category}
                      </Badge>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {project.fields.technologies?.map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-gray-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border-dashed border-2 border-gray-300">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your filters or check back later — I’m probably building something new right now 🚀</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}