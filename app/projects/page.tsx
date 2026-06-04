"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { projects } from "@/lib/projects-data"

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Home</span>
            </Link>
            <span className="font-mono text-primary text-sm">{"// PROJECTS"}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Page Title */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured <span className="text-primary glow-text">Projects</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my work in automation, embedded systems, IoT, and circuit design. 
              Click on any project to view detailed documentation and technical specifications.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const Icon = project.icon
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className={`group relative glass rounded-xl overflow-hidden transition-all duration-700 cursor-pointer ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Project image placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 circuit-bg opacity-30" />
                    <Icon
                      size={64}
                      className={`text-primary/30 transition-all duration-500 ${
                        hoveredIndex === index ? "scale-110 text-primary/50" : ""
                      }`}
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        <ExternalLink size={16} />
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Category badge */}
                    <span className="inline-block px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20 mb-3">
                      {project.category}
                    </span>

                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="text-xs text-foreground/70"
                        >
                          • {feature}
                        </span>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded bg-secondary text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 text-xs rounded bg-secondary text-secondary-foreground">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Project meta */}
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{project.date}</span>
                      <span>{project.duration}</span>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
                    <div className="absolute top-0 right-0 w-12 h-px bg-gradient-to-l from-primary/50 to-transparent" />
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Back button */}
          <div className="text-center mt-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
