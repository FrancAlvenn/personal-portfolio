import React from "react";
import { Download, Award, Briefcase, GraduationCap, Code2, Mail, Github, Linkedin, Twitter, Facebook, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function About() {
  const timeline = [
    {
        month: "06/2025 – Ongoing",
        year: "2025",
        title: "Co-Team Lead Product Engineer",
        company: "KadaKareer",
        description: `
        • Co-led the development of a web-based product, managing phased feature releases from planning to deployment.
        • Integrated application forms into the platform, improving data flow and accuracy between third-party form tools and the database.
        • Streamlined onboarding workflows by enhancing user redirects and refining access permissions for key features.
        `,
        icon: Briefcase,
        type: "work",
    },
    {
        month: "04/2025 – 06/2025",
        year: "2025",
        title: "Lead Developer",
        company: "Direcho Trabaho Training Program – Virtual",
        description: `
        • Directed collaboration of 4 developers to create a React.js application.
        • Optimized UI/UX via modern component design techniques.
        • Managed GitHub version control, resolving 95% of critical merge conflicts efficiently.
        • Presented final project to stakeholders, showcasing technical architecture and team efforts.
        `,
        icon: Briefcase,
        type: "work",
    },
    {
        month: "01/2025 – 02/2025",
        year: "2025",
        title: "AI Data Insight Analyst Intern",
        company: "Excelerate – Virtual",
        description: `
        • Processed over 10,000 student engagement records using Python, reducing data anomalies by 40%.
        • Developed interactive Tableau dashboards to highlight key learning success patterns.
        • Proposed three engagement strategies adopted for institutional learning enhancement initiatives.
        `,
        icon: Briefcase,
        type: "work",
    },
    {
        month: "2024",
        year: "2024",
        title: "Frontend & Backend Web Development Certification",
        company: "Bayan Academy",
        description: `
        Completed professional certification in both frontend and backend web development, focusing on React.js, Node.js, and API integration.
        `,
        icon: Award,
        type: "achievement",
    },
    {
        month: "2023",
        year: "2023",
        title: "First Open Source Contribution",
        company: "GitHub",
        description: `
        Made my first contribution to open-source projects, marking the start of my journey in collaborative and community-driven development.
        `,
        icon: Code2,
        type: "achievement",
    },
    ];


  const skills = {
    "Frontend": ["HTML | CSS", "React", "TypeScript", "Next.js", "Tailwind CSS", "FlutterFlow"],
    "Backend": ["Node.js", "Express", "Python", "MySQL", "MongoDB", "Firebase"],
    "DevOps": ["Docker", "AWS", "DigitalOcean", "CI/CD", "GitHub Actions"],
    "Tools": ["Git", "GitHub", "Figma", "Jira", "VS Code", "Postman"]
  };

  const stats = [
    { label: "Years of Experience", value: "3+" },
    { label: "Projects Completed", value: "10+" },
    { label: "Happy Clients", value: "5+" },
    { label: "Code Commits", value: "2000+" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-10 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <div className="relative inline-block mb-8">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <Image
                src="/close_profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />
            </div>
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-8 w-10 h-10 bg-green-500 rounded-full border-4 border-white" />
          </div>

          {/* Name & Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Franc Alvenn Dela Cruz</h1>
          <p className="text-xl text-gray-600 mb-6">Full Stack Developer & Team Leader</p>
          
          {/* Location & Status */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-8">
            <span>📍 Bocaue, Bulacan</span>
            <span>•</span>
            <span>💼 Available for opportunities</span>
            <span>•</span>
            <span>✉️ francalvenndelacruz@gmail.com</span>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3 mb-8">
            {[
              { icon: Github, url: "https://github.com/FrancAlvenn" },
              { icon: Linkedin, url: "https://www.linkedin.com/in/franc-alvenn-dela-cruz/" },
              { icon: Facebook, url: "https://www.facebook.com/francalvenn" },
              { icon: Mail, url: "mailto:francalvenndelacruz@gmail.com" }
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

          {/* CTA */}
            <div className="mt-8 mx-auto flex flex-wrap gap-4 justify-center">
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-white"
                >
                    <Button variant="outline" className="border-2  bg-gray-900">
                    <View className="mr-2 w-4 h-4 text-white hover:text-black" />
                    View Resume
                    </Button>
                </a>
                <a
                    href="/resume.pdf"
                    download="resume.pdf"
                    className="inline-block text-white"
                >
                    <Button variant="outline" className="border-2 bg-gray-900">
                    <Download className="mr-2 w-4 h-4 text-white hover:text-black"/>
                    Download Resume
                    </Button>
                </a>
            </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                I’m an aspiring full-stack web developer currently pursuing my Bachelor’s degree in Information Technology. 
                With over two years of hands-on experience building web applications, I’ve developed a strong passion for creating 
                clean, scalable, and user-centered digital experiences that make an impact.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                My journey in tech has been shaped by both academic learning and real-world projects — from leading frontend 
                development initiatives to collaborating with teams during my internship at <span className="font-semibold">Kadakareer</span>. 
                There, I honed my skills in modern frameworks like <span className="font-semibold">React, Node.js,</span> and <span className="font-semibold">Tailwind CSS</span>, 
                while also learning the importance of teamwork, mentorship, and community-driven development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Outside of internships, I’ve worked on several personal and academic projects, including service request management systems, 
                event attendance monitoring systems, and profile-driven dashboards. These experiences have strengthened my problem-solving 
                mindset and my ability to translate ideas into well-structured, functional solutions.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
                Beyond coding, I enjoy sharing what I learn, exploring design principles, and continuously improving my craft as 
                a developer. I’m currently looking forward to opportunities where I can contribute to meaningful projects, grow 
                alongside passionate teams, and continue forging my path in the world of web development.
            </p>
            </div>
        </div>
      </section>

      {/* My Journey Timeline */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">My Journey</h2>
          <p className="text-lg text-gray-600 mb-12 text-center">A timeline of my professional career and achievements</p>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -ml-px" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gray-900 border-4 border-white shadow -ml-2 z-10" />

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-16 md:ml-0`}>
                    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <Badge variant="secondary" className="mb-2 bg-gray-100 text-gray-700">
                              {item.year}
                            </Badge>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm font-medium text-gray-600">{item.company}</p>
                          </div>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            item.type === 'work' ? 'bg-blue-100' :
                            item.type === 'education' ? 'bg-purple-100' :
                            'bg-green-100'
                          }`}>
                            <item.icon className={`w-6! h-6! ${
                              item.type === 'work' ? 'text-blue-600' :
                              item.type === 'education' ? 'text-purple-600' :
                              'text-green-600'
                            }`} />
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Skills & Technologies</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">{category}</h3>
                  <div className="space-y-3">
                    {items.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-900 rounded-full" />
                        <span className="text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-xl text-gray-400 mb-8">
            I&apos;m always interested in hearing about new projects and opportunities.
          </p>
          <a href="mailto:francalvenndelacruz@gmail.com">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <Mail className="mr-2 w-5 h-5" />
                Get In Touch
              </Button>
          </a>
        </div>
      </section>
    </div>
  );
}