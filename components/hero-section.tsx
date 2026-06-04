"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center circuit-bg overflow-hidden"
    >
      {/* Animated circuit nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && (
          <>
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-primary animate-pulse delay-300" />
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-primary animate-pulse delay-500" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-primary animate-pulse delay-700" />
            <div className="absolute bottom-1/4 right-1/2 w-2 h-2 rounded-full bg-primary animate-pulse delay-1000" />
          </>
        )}
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <div
          className={`transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-mono text-primary text-sm md:text-base mb-4 tracking-widest">
            {"// ELECTRICAL ENGINEER"}
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            <span className="text-foreground">Alvin</span>{" "}
            <span className="text-primary glow-text">Nouristy</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed text-pretty">
            Engineering solutions from hardware to automation
          </p>

          <p className="text-base md:text-lg text-muted-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed text-pretty">
            I specialize in embedded systems, PLC programming, and circuit design.
            Transforming complex electrical challenges into elegant, efficient solutions
            that power the future of technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="group relative px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-primary/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

            <Link
              href="#contact"
              className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            href="#skills"
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to skills section"
          >
            <span className="text-xs font-mono mb-2">scroll</span>
            <ChevronDown className="animate-bounce" size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
