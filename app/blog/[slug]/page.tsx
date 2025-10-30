// app/blog/[slug]/page.tsx
"use client";

import { useBlogPostBySlug } from "@/lib/data";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge, Calendar, Clock, BookOpen, ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { useParams } from "next/navigation";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";


export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: post, isLoading, error } = useBlogPostBySlug(slug);

  console.log(post);

  return (
    <>
    { isLoading && !error ? (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto py-12">
          {/* Meta skeleton */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Title skeleton */}
          <div className="h-12 bg-gray-200 rounded animate-pulse mb-6 w-3/4"></div>

          {/* Excerpt skeleton */}
          <div className="space-y-4 mb-8">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-4/5"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>

          {/* Cover image skeleton */}
          <div className="mb-12 rounded-2xl overflow-hidden bg-gray-200 animate-pulse h-64"></div>

          {/* Content skeleton */}
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-2/3"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Meta */}
      <Button variant="ghost" className="mb-8 px-4 text-sm" onClick={() => window.history.back()}>
        <ChevronLeft className="w-4 h-4" />
        Back to Blog
      </Button>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
        {post?.fields.category && (
          <Badge className="bg-indigo-50 text-indigo-600">
            {post?.fields.category}
          </Badge>
        )}
        {post?.fields.publishedDate && (
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {format(new Date(post?.fields.publishedDate), "MMMM d, yyyy")}
          </span>
        )}
        {post?.fields.readTime && (
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post?.fields.readTime} min read
          </span>
        )}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        {post?.fields.title}
      </h1>

      {post?.fields.excerpt && (
        <p className="text-xl text-gray-600 mb-8">{post?.fields.excerpt}</p>
      )}

      {post?.fields.coverImage && (
        <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={`https:${post?.fields.coverImage.fields.file.url}?w=1200&h=600&fit=crop`}
            alt={post?.fields.title || "Cover Image"}
            className="w-full h-auto"
            width={1200}
            height={600}
            priority  // Better LCP
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed prose-a:text-indigo-600 hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg">
        {post?.fields?.content && 
          documentToReactComponents(post.fields.content, {
            renderNode: {
              [BLOCKS.PARAGRAPH]: (node, children) => (
                <p className="mb-4">{children}</p>
              ),
              [BLOCKS.HEADING_1]: (node, children) => (
                <h1 className="text-3xl font-semibold mt-8 mb-4">{children}</h1>
              ),
              [BLOCKS.HEADING_2]: (node, children) => (
                <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>
              ),
              [BLOCKS.HEADING_3]: (node, children) => (
                <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
              ),
              [BLOCKS.UL_LIST]: (node, children) => (
                <ul className="list-disc list-inside mb-4">{children}</ul>
              ),
              [BLOCKS.OL_LIST]: (node, children) => (
                <ol className="list-decimal list-inside mb-4">{children}</ol>
              ),
              [BLOCKS.QUOTE]: (node, children) => (
                <blockquote className="border-l-4 border-indigo-400 pl-4 italic my-6">
                  {children}
                </blockquote>
              ),
              [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const { file, title } = node.data.target.fields;
                return (
                  <Image
                    src={`https:${file.url}`}
                    alt={title || "Embedded Asset"}
                    width={800}
                    height={400}
                    className="rounded-xl my-6 shadow-md"
                  />
                );
              },
              [INLINES.HYPERLINK]: (node, children) => (
                <a
                  href={node.data.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {children}
                </a>
              ),
            },
          })
        }
      </div>

    </article>
    )}
    </>
  );
}