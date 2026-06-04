import { CircuitBoard, Wifi, Cpu, Zap, Settings, Radio, LucideIcon } from "lucide-react"

export interface ProjectImage {
  url: string
  caption: string
}

export interface ProjectSection {
  title: string
  content: string
}

export interface Project {
  id: string
  title: string
  category: string
  description: string
  icon: LucideIcon
  technologies: string[]
  features: string[]
  gradient: string
  // Detail fields
  overview: string
  challenges: string[]
  solutions: string[]
  results: string[]
  documentation: ProjectSection[]
  images: ProjectImage[]
  links: {
    github?: string
    demo?: string
    documentation?: string
  }
  date: string
  duration: string
  role: string
}

export const projects: Project[] = [
  {
    id: "smart-factory-automation",
    title: "Smart Factory Automation System",
    category: "Automation Control",
    description: "Complete SCADA system for manufacturing plant with real-time monitoring, automated production line control, and predictive maintenance alerts.",
    icon: Settings,
    technologies: ["Siemens S7-1500", "WinCC", "OPC UA", "SQL Server", "TIA Portal", "Node-RED"],
    features: ["Real-time dashboards", "Automated reporting", "Alarm management", "Remote access"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    overview: "Developed a comprehensive SCADA (Supervisory Control and Data Acquisition) system for a manufacturing facility, enabling real-time monitoring and control of production processes. The system integrates multiple PLCs, HMIs, and database systems to provide a unified automation platform.",
    challenges: [
      "Legacy equipment integration with modern communication protocols",
      "High availability requirements (99.9% uptime)",
      "Complex alarm prioritization across 500+ signals",
      "Secure remote access for maintenance personnel"
    ],
    solutions: [
      "Implemented OPC UA gateway for legacy device communication",
      "Designed redundant server architecture with automatic failover",
      "Created intelligent alarm management with ML-based prioritization",
      "Deployed VPN-based secure remote access with role-based permissions"
    ],
    results: [
      "30% reduction in unplanned downtime",
      "50% faster incident response time",
      "Real-time visibility across 12 production lines",
      "ROI achieved within 8 months"
    ],
    documentation: [
      {
        title: "System Architecture",
        content: "The system follows a three-tier architecture: Field Level (PLCs, sensors, actuators), Control Level (SCADA servers, historian), and Enterprise Level (reporting, analytics). Communication between levels uses industrial Ethernet with OPC UA protocol for standardization."
      },
      {
        title: "PLC Programming",
        content: "Siemens S7-1500 PLCs programmed using TIA Portal with structured text (ST) and ladder logic (LD). Implemented modular programming approach with reusable function blocks for motor control, valve sequencing, and safety interlocks."
      },
      {
        title: "HMI Development",
        content: "WinCC Advanced used for operator interface development. Designed intuitive navigation with P&ID-based graphics, trend displays, and alarm summaries. Implemented multi-language support for diverse operator base."
      },
      {
        title: "Database Integration",
        content: "SQL Server database for historical data storage with optimized indexing for fast queries. Implemented data archiving strategy with automatic cleanup of old records while maintaining compliance with regulatory requirements."
      }
    ],
    images: [
      { url: "/projects/scada-dashboard.png", caption: "Main SCADA Dashboard" },
      { url: "/projects/plc-cabinet.png", caption: "PLC Control Cabinet" },
      { url: "/projects/hmi-screen.png", caption: "Operator HMI Screen" }
    ],
    links: {
      documentation: "#"
    },
    date: "2023",
    duration: "8 months",
    role: "Lead Automation Engineer"
  },
  {
    id: "iot-environmental-monitor",
    title: "IoT Environmental Monitor",
    category: "IoT Systems",
    description: "Distributed sensor network for industrial environmental monitoring with cloud connectivity and mobile app integration.",
    icon: Wifi,
    technologies: ["ESP32", "LoRaWAN", "AWS IoT", "React Native", "Grafana", "InfluxDB"],
    features: ["Multi-sensor fusion", "Cloud analytics", "Mobile alerts", "2+ year battery life"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    overview: "Designed and deployed a comprehensive IoT solution for monitoring environmental conditions in industrial facilities. The system uses low-power wireless sensors to measure temperature, humidity, air quality, and noise levels, transmitting data to the cloud for analysis and alerting.",
    challenges: [
      "Battery life optimization for remote sensor nodes",
      "Reliable communication in RF-noisy industrial environment",
      "Scalable cloud architecture for thousands of data points",
      "Cross-platform mobile app development"
    ],
    solutions: [
      "Implemented ultra-low-power sleep modes with wake-on-threshold",
      "Deployed LoRaWAN with adaptive data rate and redundant gateways",
      "Used AWS IoT Core with auto-scaling Lambda functions",
      "Built React Native app with shared codebase for iOS/Android"
    ],
    results: [
      "2.5 year battery life achieved on CR2450 coin cell",
      "99.7% data delivery reliability",
      "100+ sensors deployed across 5 facilities",
      "15% energy cost savings through environmental optimization"
    ],
    documentation: [
      {
        title: "Sensor Node Design",
        content: "Each sensor node is built around the ESP32-S3 microcontroller with integrated sensors for temperature (SHT40), air quality (SGP41), and noise level (MEMS microphone). The PCB design prioritizes low power consumption with careful attention to sleep current."
      },
      {
        title: "LoRaWAN Network",
        content: "Deployed private LoRaWAN network using RAK gateways. Network server runs on-premises for data sovereignty. Implemented Class A device operation with confirmed uplinks for critical alerts."
      },
      {
        title: "Cloud Architecture",
        content: "AWS IoT Core receives MQTT messages from the network server. Data is processed by Lambda functions and stored in InfluxDB for time-series analysis. Grafana provides visualization and alerting capabilities."
      },
      {
        title: "Mobile Application",
        content: "React Native app provides real-time dashboard, historical trends, and push notifications. Implemented offline-first architecture with local data caching for areas with poor connectivity."
      }
    ],
    images: [
      { url: "/projects/sensor-node.png", caption: "Sensor Node PCB" },
      { url: "/projects/grafana-dashboard.png", caption: "Grafana Dashboard" },
      { url: "/projects/mobile-app.png", caption: "Mobile Application" }
    ],
    links: {
      github: "https://github.com/alvinnouristy/iot-monitor",
      demo: "#"
    },
    date: "2023",
    duration: "6 months",
    role: "IoT Systems Engineer"
  },
  {
    id: "motor-drive-controller",
    title: "High-Power Motor Drive Controller",
    category: "Power Electronics",
    description: "Custom VFD controller for industrial motors with regenerative braking and advanced torque control algorithms.",
    icon: Zap,
    technologies: ["STM32F4", "IGBT Modules", "FOC Algorithm", "CAN Bus", "Altium Designer", "MATLAB"],
    features: ["97% efficiency", "Sensorless control", "Regenerative braking", "Modbus RTU"],
    gradient: "from-amber-500/20 to-orange-500/20",
    overview: "Developed a high-performance variable frequency drive (VFD) for industrial motor applications. The controller implements Field Oriented Control (FOC) for precise torque and speed regulation, with regenerative braking capability for energy recovery.",
    challenges: [
      "Achieving high efficiency across wide speed range",
      "Implementing sensorless control for cost reduction",
      "Managing heat dissipation in compact enclosure",
      "EMC compliance with conducted emissions limits"
    ],
    solutions: [
      "Optimized PWM switching patterns with space vector modulation",
      "Developed sliding mode observer for sensorless FOC",
      "Designed custom heatsink with forced air cooling",
      "Implemented common-mode choke and input filter design"
    ],
    results: [
      "97% peak efficiency at rated load",
      "Sensorless control stable down to 2% rated speed",
      "30% energy recovery during deceleration",
      "Passed EN 61800-3 EMC requirements"
    ],
    documentation: [
      {
        title: "Power Stage Design",
        content: "Three-phase inverter built with Infineon IGBT modules (FF100R12RT4). Gate driver design uses galvanic isolation with bootstrap supply. DC bus capacitor bank sized for ripple current handling and holdup time requirements."
      },
      {
        title: "Control Algorithm",
        content: "Field Oriented Control implemented on STM32F446 running at 180MHz. Current loop bandwidth of 2kHz, speed loop bandwidth of 200Hz. Sliding mode observer provides rotor position estimation for sensorless operation."
      },
      {
        title: "Regenerative Braking",
        content: "Brake chopper circuit dissipates excess energy when DC bus exceeds threshold. For continuous regeneration applications, optional line regeneration module feeds energy back to grid through synchronized inverter."
      },
      {
        title: "Communication Interface",
        content: "CAN bus interface for drive-to-drive communication in multi-axis applications. Modbus RTU over RS-485 for SCADA integration. Built-in web server for commissioning and diagnostics."
      }
    ],
    images: [
      { url: "/projects/vfd-board.png", caption: "Controller PCB" },
      { url: "/projects/power-stage.png", caption: "Power Stage Assembly" },
      { url: "/projects/foc-diagram.png", caption: "FOC Block Diagram" }
    ],
    links: {
      documentation: "#"
    },
    date: "2022",
    duration: "10 months",
    role: "Power Electronics Engineer"
  },
  {
    id: "multilayer-power-supply",
    title: "PCB Design: Multi-layer Power Supply",
    category: "Circuit Design",
    description: "6-layer PCB design for high-efficiency switch-mode power supply with EMC compliance and thermal management.",
    icon: CircuitBoard,
    technologies: ["Altium Designer", "LTspice", "Thermal Analysis", "DFM", "IPC Standards", "EMC Testing"],
    features: ["94% efficiency", "Wide input range", "EMC compliant", "Conformal coating"],
    gradient: "from-violet-500/20 to-purple-500/20",
    overview: "Designed a compact, high-efficiency switch-mode power supply for industrial applications. The 6-layer PCB design addresses thermal management, EMC compliance, and manufacturability requirements while achieving excellent electrical performance.",
    challenges: [
      "Achieving high power density in compact form factor",
      "Meeting Class B conducted emissions without external filter",
      "Thermal management for 95W dissipation",
      "Design for automated manufacturing"
    ],
    solutions: [
      "Used planar magnetics for reduced height",
      "Integrated EMI filter with optimized layout",
      "Implemented thermal vias and copper pours for heat spreading",
      "Applied DFM guidelines for 99%+ first-pass yield"
    ],
    results: [
      "94% efficiency at full load",
      "40% smaller than previous generation",
      "Passed EMC certification first attempt",
      "Zero manufacturing defects in pilot run"
    ],
    documentation: [
      {
        title: "Layer Stackup",
        content: "6-layer stackup: Top (components), GND, Signal, Power, GND, Bottom (components). 1.6mm total thickness with 1oz copper on outer layers, 0.5oz inner layers. Impedance-controlled traces for high-speed signals."
      },
      {
        title: "EMC Design",
        content: "Input filter integrated on PCB with common-mode and differential-mode stages. High-frequency decoupling with multiple parallel capacitors. Careful attention to current return paths to minimize loop areas."
      },
      {
        title: "Thermal Management",
        content: "Thermal simulation in Altium PDN Analyzer. Power MOSFETs mounted with thermal vias to internal ground plane. Temperature rise limited to 40C above ambient at full load."
      },
      {
        title: "Manufacturing Considerations",
        content: "IPC-A-610 Class 2 workmanship standard. All components available from multiple sources. Panelization optimized for pick-and-place efficiency. Selective conformal coating for harsh environment protection."
      }
    ],
    images: [
      { url: "/projects/pcb-3d.png", caption: "3D PCB Render" },
      { url: "/projects/thermal-analysis.png", caption: "Thermal Analysis" },
      { url: "/projects/emc-test.png", caption: "EMC Test Results" }
    ],
    links: {
      documentation: "#"
    },
    date: "2023",
    duration: "4 months",
    role: "PCB Design Engineer"
  },
  {
    id: "embedded-data-logger",
    title: "Embedded Data Logger",
    category: "Embedded Systems",
    description: "High-precision industrial data logger with SD card storage, USB interface, and real-time clock for timestamping.",
    icon: Cpu,
    technologies: ["ARM Cortex-M4", "FatFS", "USB CDC", "FreeRTOS", "STM32CubeIDE", "Python"],
    features: ["24-bit ADC", "1kHz sampling", "8GB storage", "USB mass storage"],
    gradient: "from-rose-500/20 to-pink-500/20",
    overview: "Developed a precision data acquisition system for industrial measurement applications. The logger captures analog signals with 24-bit resolution, timestamps data with RTC, and stores to SD card in industry-standard formats.",
    challenges: [
      "Achieving 24-bit accuracy in noisy industrial environment",
      "Maintaining precise timing for synchronized multi-channel acquisition",
      "Implementing reliable file system for power-loss tolerance",
      "Supporting multiple data export formats"
    ],
    solutions: [
      "Designed isolated analog front-end with precision references",
      "Used hardware timers with DMA for jitter-free sampling",
      "Implemented journaling file system with transaction safety",
      "Created Python desktop app for data visualization and export"
    ],
    results: [
      "22 effective bits of resolution achieved",
      "Less than 1us timing jitter between channels",
      "Zero data loss in power-fail testing",
      "Supports CSV, TDMS, and HDF5 export formats"
    ],
    documentation: [
      {
        title: "Analog Front-End",
        content: "Texas Instruments ADS1256 24-bit ADC with programmable gain amplifier. Isolated analog input stage using ADuM1401 digital isolators and isolated DC-DC converter. Input protection with TVS diodes and resettable fuses."
      },
      {
        title: "Firmware Architecture",
        content: "FreeRTOS-based firmware with dedicated tasks for acquisition, storage, and communication. Lock-free ring buffers for inter-task data transfer. Watchdog timer and stack overflow detection for reliability."
      },
      {
        title: "File System",
        content: "FatFS file system with custom transaction layer for power-loss safety. Automatic file splitting at configurable size limits. Pre-allocation strategy for consistent write performance."
      },
      {
        title: "Desktop Software",
        content: "Python application using PyQt5 for GUI. Real-time data visualization with pyqtgraph. Export functionality to CSV, MATLAB, and HDF5 formats. Automatic unit conversion and calibration application."
      }
    ],
    images: [
      { url: "/projects/datalogger-pcb.png", caption: "Data Logger PCB" },
      { url: "/projects/desktop-app.png", caption: "Desktop Application" },
      { url: "/projects/enclosure.png", caption: "Industrial Enclosure" }
    ],
    links: {
      github: "https://github.com/alvinnouristy/datalogger",
      documentation: "#"
    },
    date: "2022",
    duration: "5 months",
    role: "Embedded Systems Engineer"
  },
  {
    id: "wireless-sensor-network",
    title: "Wireless Sensor Network",
    category: "IoT Systems",
    description: "Mesh network of wireless sensors for agricultural monitoring with solar-powered nodes and gateway connectivity.",
    icon: Radio,
    technologies: ["Zigbee", "STM32L4", "Solar MPPT", "Grafana", "MQTT", "PostgreSQL"],
    features: ["Self-healing mesh", "Solar powered", "100+ nodes", "MQTT integration"],
    gradient: "from-primary/20 to-cyan-500/20",
    overview: "Designed and deployed a large-scale wireless sensor network for precision agriculture. Solar-powered sensor nodes form a self-healing mesh network, collecting soil moisture, temperature, and microclimate data for irrigation optimization.",
    challenges: [
      "Reliable operation in remote locations without infrastructure",
      "Self-healing network topology for field obstacles",
      "Extreme temperature range operation (-20C to +60C)",
      "Cost optimization for large-scale deployment"
    ],
    solutions: [
      "Solar panel with MPPT charging and supercapacitor backup",
      "Zigbee mesh with automatic route discovery and repair",
      "Industrial-grade components with conformal coating",
      "Custom PCB design for volume manufacturing"
    ],
    results: [
      "100% network availability over 2-year deployment",
      "20% water savings through optimized irrigation",
      "Less than $50 BOM cost per node at volume",
      "15-minute maximum latency for all sensor readings"
    ],
    documentation: [
      {
        title: "Sensor Node Hardware",
        content: "STM32L476 ultra-low-power MCU with Zigbee module (XBee3). Capacitive soil moisture sensor, BME280 for temperature/humidity, and pyranometer for solar radiation. Weatherproof IP67 enclosure with cable glands."
      },
      {
        title: "Power System",
        content: "3W solar panel with custom MPPT controller. 500F supercapacitor array for energy storage (no battery for extended temperature range). Typical power consumption of 50uW average with 10-minute reporting interval."
      },
      {
        title: "Network Architecture",
        content: "Zigbee 3.0 mesh network with coordinator at farm office. Router nodes placed strategically for coverage. End devices sleep between transmissions. Gateway bridges Zigbee to Ethernet for cloud connectivity."
      },
      {
        title: "Data Platform",
        content: "MQTT broker receives data from gateway. Node-RED processes and validates readings. PostgreSQL with TimescaleDB extension for time-series storage. Grafana dashboards for visualization and alerting."
      }
    ],
    images: [
      { url: "/projects/sensor-field.png", caption: "Deployed Sensor Nodes" },
      { url: "/projects/solar-node.png", caption: "Solar-Powered Node" },
      { url: "/projects/farm-dashboard.png", caption: "Farm Monitoring Dashboard" }
    ],
    links: {
      github: "https://github.com/alvinnouristy/wsn-agriculture",
      demo: "#"
    },
    date: "2023",
    duration: "12 months",
    role: "IoT Solutions Architect"
  }
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.id === slug)
}