"use client"

import { useEffect, useState } from "react"
import { Cpu, Zap, CircuitBoard, Code, Wifi, Settings } from "lucide-react"

const skills = [
  {
    category: "Embedded Systems",
    icon: Cpu,
    items: ["Microcontrollers", "RTOS", "Firmware Development", "ARM Cortex"],
    color: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    category: "Automation & PLC",
    icon: Settings,
    items: ["Siemens S7", "Allen Bradley", "SCADA Systems", "HMI Design"],
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    category: "Circuit Design",
    icon: CircuitBoard,
    items: ["PCB Layout", "Altium Designer", "Power Electronics", "Signal Processing"],
    color: "from-primary/20 to-primary/5",
  },
  {
    category: "Programming",
    icon: Code,
    items: ["C/C++", "Python", "MATLAB", "LabVIEW"],
    color: "from-violet-500/20 to-violet-500/5",
  },
  {
    category: "IoT Systems",
    icon: Wifi,
    items: ["MQTT", "LoRaWAN", "ESP32", "Sensor Networks"],
    color: "from-amber-500/20 to-amber-500/5",
  },
  {
    category: "Power Systems",
    icon: Zap,
    items: ["Motor Control", "Inverters", "Battery Management", "Grid Integration"],
    color: "from-rose-500/20 to-rose-500/5",
  },
]

export function SkillsSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="absolute inset-0 circuit-bg opacity-50" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-mono text-primary text-sm tracking-widest mb-4">
            {"// TECHNICAL EXPERTISE"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Skills & Technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.category}
                className={`group relative glass rounded-xl p-6 transition-all duration-500 hover:glow-border cursor-default ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">
                      {skill.category}
                    </h3>
                  </div>

                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground/80 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl">
                  <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                  <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-primary/50 to-transparent" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
