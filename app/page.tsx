// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { createPageUrl } from "@/lib/utils";
import { fetchProjects, fetchBlogPosts } from "@/lib/data";
import { 
  ArrowRight, 
  Code2, 
  Briefcase, 
  Award, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  Calendar,
  Clock,
  Send,
  ExternalLink,
  BookOpen,
  Download,
  Facebook,
  View,
  MoreHorizontal,
  BookOpenCheck,
  Medal,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { useBlogPosts } from "@/lib/data";
import { useProjects } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // LOCAL QUERY
  // const { data: projectsData = [], isLoading: projectsLoading } = useQuery({
  //   queryKey: ["featured-projects"],
  //   queryFn: () => Promise.resolve(fetchProjects({ featured: true }, "-completion_date", 6)),
  // });

  // const { data: blogPostsData = [], isLoading: blogLoading } = useQuery({
  //   queryKey: ["recent-blog-posts"],
  //   queryFn: () => Promise.resolve(fetchBlogPosts({ published: true }, "-publishedDate", 3)),
  // });

  const { data: blogPostsData = [], isLoading: blogLoading } = useBlogPosts(
    { published: true },
    3
  );

  const { data: projectsData = [], isLoading: projectsLoading } = useProjects(
    { featured: true },
    6
  );

  const stats = [
    {
      icon: Briefcase,
      label: "Projects Completed",
      value: "10+",
    },
    {
      icon: Award,
      label: "Years Experience",
      value: "3+",
    },
    {
      icon: Code2,
      label: "Technologies",
      value: "10+",
    },
    {
      icon: BookOpenCheck,
      label: "Certifications Earned",
      value: "5+",
    },
    {
      icon: Briefcase,
      label: "Internships Completed",
      value: "3",
    },
    {
      icon: Medal,
      label: "Awards & Recognitions",
      value: "4",
    },
    {
      icon: GraduationCap,
      label: "Expected Graduation",
      value: "2026",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 3) % stats.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Determine which 3 stats to display
  const visibleStats = [
    stats[startIndex],
    stats[(startIndex + 1) % stats.length],
    stats[(startIndex + 2) % stats.length],
  ];


  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const animatedWords = ["Professional", "Innovative", "Creative", "Passionate", "Experienced"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 5000); // Change every 5s (animation is ~1s enter/exit + 1s stay)

    return () => clearInterval(interval);
  }, []);


  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleHover = () => {
    // Prevent spam-triggering while still animating
    if (isAnimating) return;
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
    setIndex((prev) => (prev + 1) % stats.length);
  };

  const { icon: Icon, label, value } = stats[index];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement email sending via API route or external service (e.g., Resend, SendGrid)
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "francalvenndelacruz@gmail.com",
          subject: `Portfolio Contact from ${formData.name}`,
          body: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
          replyTo: formData.email
        }),
      });
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 bg-white">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Available for work</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="relative inline-block h-[1.2em] w-[10ch] overflow-hidden align-bottom">
                  {animatedWords.map((word, index) => (
                    <span
                      key={index}
                      className={`absolute left-0 top-0 w-full text-black-900 font-bold transition-all duration-700 ease-in-out ${
                        index === currentWordIndex
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </span>
                <br />
                <span className="text-gray-500">Web Developer</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                I build responsive and user-friendly web 
                applications using modern technologies. I focus on clean code, smooth user 
                experiences, and scalable solutions that bring ideas to life.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get In Touch
                  <Mail className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 border-2"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Projects
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                {[
                  { icon: Github, url: "https://github.com/FrancAlvenn" },
                  { icon: Linkedin, url: "https://www.linkedin.com/in/franc-alvenn-dela-cruz" },
                  { icon: Facebook, url: "https://www.facebook.com/francalvenn" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    className="w-11 h-11 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-900 transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-gray-700 rounded-3xl" />
                <Image
                  src="/profile.png" 
                  alt="Professional portrait"
                  className="relative w-full h-full object-cover rounded-3xl"
                  width={500}
                  height={500}
                />
              </div>
              <div
                className={`flex items-center gap-4 p-4 transition-all absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100  cursor-pointer ${
                  isAnimating ? "animate-shake" : ""
                }`}
                onMouseEnter={handleHover}
                onAnimationEnd={handleAnimationEnd}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="relative mt-20 py-12 border-t border-gray-200 overflow-hidden">
            <div className="grid grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {visibleStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4">
                      <stat.icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Projects</h2>
              <p className="text-lg text-gray-600">A selection of my recent work</p>
            </div>
            <Link href={createPageUrl("Projects")} className="hidden md:block  cursor-pointer">
              <Button variant="outline" className="border-2">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {projectsLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200 animate-pulse" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-3" />
                    <div className="h-16 bg-gray-200 rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projectsData.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {projectsData.map((project) => (
                <Card key={project.sys.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
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
                      <div className="w-full h-full flex items-center justify-center">
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
                          <a href={project.fields.projectUrl} target="_blank" rel="noopener noreferrer" className="...">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.fields.githubUrl && (
                          <a href={project.fields.githubUrl} target="_blank" rel="noopener noreferrer" className="...">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.fields.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.fields.technologies?.slice(0, 4).map((tech, i) => (
                        <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-700">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border-dashed">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">Projects will be added soon</p>
            </Card>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link href={createPageUrl("Projects")}>
              <Button variant="outline" className="w-full sm:w-auto border-2  cursor-pointer">
                View All Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Me</h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  I&apos;m an aspiring full-stack web developer with over 2 years of practical experience 
                  in building modern, responsive web applications. As the Team Lead of <strong>Kada Kareer</strong>, 
                  I guided a group of developers in creating efficient and user-focused solutions, 
                  emphasizing collaboration, clean code, and quality results.
                </p>
                <p>
                  My work focuses on developing scalable systems — from front-end interfaces built 
                  with React and Tailwind CSS to backend logic and API integrations. I value writing 
                  maintainable, well-structured code and continuously improving through modern tools 
                  and best practices.
                </p>
                <p>
                  Beyond development, I’m passionate about mentoring peers, exploring new technologies, 
                  and contributing to meaningful projects that make a real impact. I believe that 
                  technology should not only work — it should empower.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button variant="outline" className="border-2  cursor-pointer">
                    <View className="mr-2 w-4 h-4" />
                    View Resume
                  </Button>
                </a>
                <a
                  href="/resume.pdf"
                  download="resume.pdf"
                  className="inline-block"
                >
                  <Button variant="outline" className="border-2  cursor-pointer">
                    <Download className="mr-2 w-4 h-4" />
                    Download Resume
                  </Button>
                </a>
                <a
                  href="/about"
                  className="inline-block"
                >
                  <Button variant="outline" className="border-2  cursor-pointer">
                    Learn More
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Frontend", skills: ["HTML | CSS","React", "TypeScript", "Tailwind CSS", "Next.js", "FlutterFlow"] },
                  { label: "Backend", skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "MySQL", "Firebase"] },
                  { label: "Tools", skills: ["Git", "Github", "Docker", "Digital Ocean", "Figma"] },
                  { label: "Other", skills: ["REST APIs", "GraphQL", "CI/CD", "Testing", "DevOps"] }
                ].map((category, i) => (
                  <Card key={i} className="p-6 border-none bg-gray-50">
                    <h3 className="font-bold text-gray-900 mb-4">{category.label}</h3>
                    <ul className="space-y-2">
                      {category.skills.map((skill, j) => (
                        <li key={j} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 md:py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Latest Articles</h2>
              <p className="text-lg text-gray-600">Thoughts and insights</p>
            </div>
            <Link href={createPageUrl("Blog")} className="hidden md:block">
              <Button variant="outline" className="border-2  cursor-pointer">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {blogLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : blogPostsData.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {blogPostsData.map((post) => (
                <Link key={post.sys.id} href={`/blog/${post.fields.slug}`}>
                  <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 h-full bg-white">
                    {post.fields.coverImage && (
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={`https:${post.fields.coverImage.fields.file.url}`} 
                          alt={post.fields.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          width={500}
                          height={500}
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        {post.fields.publishedDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {format(new Date(post.fields.publishedDate), "MMM d")}
                          </span>
                        )}
                        {post.fields.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.fields.readTime} min
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors">
                        {post.fields.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{post.fields.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border-dashed">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">Articles coming soon</p>
            </Card>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let&apos;s Work Together</h2>
            <p className="text-xl text-gray-400">Have a project in mind? Get in touch.</p>
          </div>

          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-500 text-white rounded-lg text-center">
              ✓ Message sent successfully! I&apos;ll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project..."
                rows={6}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full bg-white text-gray-900 hover:bg-gray-100 text-lg py-6 font-semibold"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-gray-400 py-12 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="font-bold text-xl text-gray-900 mb-2">Franc Alvenn Dela Cruz</div>
              <p className="text-sm text-gray-600">
                Professional Developer & Designer passionate about crafting impactful digital experiences through clean code and thoughtful design.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/FrancAlvenn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/franc-alvenn-dela-cruz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.facebook.com/francalvenn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="mailto:francalvenndelacruz@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Franc Alvenn Dela Cruz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}