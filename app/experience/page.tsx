"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Building2, Calendar } from "lucide-react"

const experiences = [
  {
    title: "Senior Electrical Engineer",
    company: "PT. Tech Automation Indonesia",
    period: "2022 - Present",
    description: "Lead engineer for industrial automation projects, specializing in PLC programming and SCADA system integration. Managed a team of 5 engineers delivering complex control systems.",
    achievements: [
      "Designed and implemented automated production lines increasing efficiency by 40%",
      "Developed custom HMI interfaces for real-time process monitoring",
      "Led successful commissioning of 15+ industrial automation projects",
    ],
    technologies: ["Siemens S7-1500", "WinCC", "TIA Portal", "PROFINET"],
  },
  {
    title: "Embedded Systems Engineer",
    company: "IoT Solutions Corp",
    period: "2020 - 2022",
    description: "Developed firmware and hardware solutions for IoT devices in smart manufacturing and agriculture sectors.",
    achievements: [
      "Architected low-power sensor networks with 2+ year battery life",
      "Created modular firmware framework used across 10+ product lines",
      "Reduced production costs by 25% through PCB optimization",
    ],
    technologies: ["ESP32", "STM32", "FreeRTOS", "MQTT", "LoRaWAN"],
  },
  {
    title: "Electrical Design Engineer",
    company: "Power Systems Engineering",
    period: "2018 - 2020",
    description: "Designed electrical systems for commercial and industrial buildings, focusing on power distribution and motor control.",
    achievements: [
      "Completed electrical design for 20+ commercial projects",
      "Implemented energy-efficient solutions reducing power consumption by 30%",
      "Certified in advanced motor drive systems and VFD programming",
    ],
    technologies: ["AutoCAD Electrical", "ETAP", "Eplan", "VFD Systems"],
  },
  {
    title: "Junior Engineer",
    company: "ElectraTech Solutions",
    period: "2016 - 2018",
    description: "Started career in electrical engineering, gaining hands-on experience in circuit design and testing.",
    achievements: [
      "Assisted in PCB design and prototyping for consumer electronics",
      "Conducted EMC testing and compliance documentation",
      "Developed automated test fixtures reducing QC time by 50%",
    ],
    technologies: ["Altium Designer", "Oscilloscopes", "MATLAB", "Python"],
  },
]

export default function ExperiencePage() {
  const [mounted, setMounted] = useState(false)

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
            <span className="font-mono text-primary text-sm">{"// EXPERIENCE"}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Page Title */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Professional <span className="text-primary glow-text">Experience</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A journey through my career in electrical engineering, automation, and embedded systems development.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <div
                key={exp.title}
                className={`relative mb-12 md:mb-16 transition-all duration-700 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary glow-border md:-translate-x-1/2 -translate-x-1/2" />

                {/* Content card */}
                <div
                  className={`ml-8 md:ml-0 ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-12 md:w-1/2 md:text-right"
                      : "md:ml-auto md:pl-12 md:w-1/2"
                  }`}
                >
                  <div className="glass rounded-xl p-6 hover:glow-border transition-all duration-500">
                    {/* Header */}
                    <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                      <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                        <Building2 className="text-primary" size={24} />
                      </div>
                      <div className={index % 2 === 0 ? "md:text-right" : ""}>
                        <h3 className="text-xl font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                        <div className={`flex items-center gap-2 text-sm text-muted-foreground mt-1 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-muted-foreground mb-4 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                      {exp.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className={`flex items-start gap-2 text-sm text-foreground/80 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
