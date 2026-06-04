"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Trophy,
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { Project } from "@/lib/projects-data"

interface ProjectDetailClientProps {
  project: Project
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [mounted, setMounted] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const Icon = project.icon

  useEffect(() => {
    setMounted(true)
    // Initialize all documentation sections as expanded
    const initialExpanded: Record<string, boolean> = {}
    project.documentation.forEach((_, index) => {
      initialExpanded[`doc-${index}`] = true
    })
    setExpandedSections(initialExpanded)
  }, [project.documentation])

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/projects"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Projects</span>
            </Link>
            <span className="font-mono text-primary text-sm hidden sm:block">{"// PROJECT DETAIL"}</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="mx-auto max-w-5xl">
          <div
            className={`transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Category Badge */}
            <span className="inline-block px-4 py-1.5 text-sm font-mono rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
              {project.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-3xl mb-8">
              {project.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={18} className="text-primary" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={18} className="text-primary" />
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User size={18} className="text-primary" />
                <span>{project.role}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-all duration-300"
                >
                  <Github size={20} />
                  View Code
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              )}
              {project.links.documentation && (
                <a
                  href={project.links.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300"
                >
                  <FileText size={20} />
                  Full Documentation
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Icon Banner */}
      <section className="py-8 px-4">
        <div className="mx-auto max-w-5xl">
          <div
            className={`relative h-64 glass rounded-2xl overflow-hidden transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
            <div className="absolute inset-0 circuit-bg opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon size={120} className="text-primary/40" />
            </div>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32">
              <div className="absolute top-4 left-4 w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
              <div className="absolute top-4 left-4 w-16 h-px bg-gradient-to-r from-primary/50 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32">
              <div className="absolute bottom-4 right-4 w-px h-16 bg-gradient-to-t from-primary/50 to-transparent" />
              <div className="absolute bottom-4 right-4 w-16 h-px bg-gradient-to-l from-primary/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <div
            className={`transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              <span className="text-primary">//</span> Overview
            </h2>
            <div className="glass rounded-xl p-6 md:p-8">
              <p className="text-foreground/90 leading-relaxed text-lg">
                {project.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <div
            className={`transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              <span className="text-primary">//</span> Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenges, Solutions, Results Grid */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Challenges */}
            <div
              className={`glass rounded-xl p-6 transition-all duration-700 delay-400 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <AlertCircle size={24} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Challenges</h3>
              </div>
              <ul className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-foreground/80">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div
              className={`glass rounded-xl p-6 transition-all duration-700 delay-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Lightbulb size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Solutions</h3>
              </div>
              <ul className="space-y-4">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-foreground/80">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Results */}
            <div
              className={`glass rounded-xl p-6 transition-all duration-700 delay-600 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Trophy size={24} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Results</h3>
              </div>
              <ul className="space-y-4">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="flex-shrink-0 text-emerald-500 mt-0.5" />
                    <span className="text-foreground/80">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <div
            className={`transition-all duration-700 delay-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              <span className="text-primary">//</span> Technical Documentation
            </h2>
            <div className="space-y-4">
              {project.documentation.map((doc, index) => (
                <div
                  key={index}
                  className="glass rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(`doc-${index}`)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">{doc.title}</h3>
                    </div>
                    {expandedSections[`doc-${index}`] ? (
                      <ChevronUp size={20} className="text-muted-foreground" />
                    ) : (
                      <ChevronDown size={20} className="text-muted-foreground" />
                    )}
                  </button>
                  {expandedSections[`doc-${index}`] && (
                    <div className="px-6 pb-6">
                      <div className="pl-8 border-l-2 border-primary/30">
                        <p className="text-foreground/80 leading-relaxed">
                          {doc.content}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <div
            className={`transition-all duration-700 delay-800 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              <span className="text-primary">//</span> Key Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 text-center hover:border-primary/50 transition-colors"
                >
                  <CheckCircle2 size={24} className="text-primary mx-auto mb-2" />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-all duration-300"
            >
              <ArrowLeft size={20} />
              All Projects
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
