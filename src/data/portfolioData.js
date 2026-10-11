export const personalData = {
  name: "Kavinila V",
  title: "Full-Stack Developer",
  tagline: "Building scalable web applications, sleek digital experiences, and intuitive interfaces with modern technologies.",
  location: "Panruti, Cuddalore",
  email: "kavi79331@gmail.com",
  phone: "+91 78068 42061",
  availability: "Available for full-time roles & freelance projects",
  socialLinks: {
    github: "https://github.com/kavi79331-debug",
    linkedin: "https://www.linkedin.com/in/kavinila-vijayaragavan-14b9aa3ab/",
    email: "kavi79331@gmail.com"
  }
};

export const aboutData = {
  summary: [
    "I am a passionate third-year Computer Science Engineering student with a strong interest in software development, artificial intelligence, and modern web technologies. I enjoy building practical applications that solve real-world problems while continuously improving my programming and problem-solving skills.",
    "I have hands-on experience working with technologies such as React, JavaScript, Python, Java, SQL, Machine Learning, and IoT through academic and personal projects. I am constantly exploring new technologies and looking forward to applying my skills to real-world software development opportunities."
  ],
  stats: [
    { label: "Year of Study", value: "3rd Year" },
    { label: "Projects Built", value: "4+" },
    { label: "Technologies Explored", value: "10+" },
    { label: "Focus Areas", value: "AI & Web" }
  ],
  highlights: [
    {
      title: "Clean Architecture",
      description: "Writing maintainable, modular, and testable code following industry design patterns and SOLID principles."
    },
    {
      title: "Performance First",
      description: "Optimizing Core Web Vitals, payload sizes, and rendering cycles to deliver sub-second page loads."
    },
    {
      title: "User-Centric Mindset",
      description: "Crafting interfaces that are intuitive, accessible (WCAG 2.1 AA compliant), and responsive across all device viewports."
    }
  ]
};

export const skillsData = {
  categories: [
    {
      name: "Frontend Development",
      skills: [
        { name: "React", level: "Intermediate" },
        { name: "JavaScript", level: "Intermediate" },
        { name: "HTML5 & CSS3", level: "Intermediate" },
        { name: "Responsive Web Design", level: "Intermediate" },
        { name: "Flexbox & CSS Grid", level: "Intermediate" }
      ]
    },
    {
      name: "Backend & APIs",
      skills: [
        { name: "Node.js", level: "Beginner" },
        { name: "REST APIs", level: "Beginner" },
        { name: "PostgreSQL", level: "Beginner" },
        { name: "SQL", level: "Intermediate" }
      ]
    },
    {
      name: "DevOps, Tools & Testing",
      skills: [
        { name: "Git & GitHub", level: "Intermediate" },
        { name: "Vite", level: "Intermediate" },
        { name: "Arduino IDE", level: "Intermediate" },
        { name: "Jupyter Notebook", level: "Intermediate" },
        { name: "Google Colab", level: "Intermediate" },
        { name: "VS Code", level: "Intermediate" }
      ]
    }
  ]
};

export const projectsData = [
  {
    id: 1,
    title: "Smart Expense",
    category: "Personal Finance Web App",
    description: "A personal finance management web application that helps users track daily expenses, manage monthly spending limits, monitor savings, receive spending alerts, and understand their spending patterns through smart insights.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Git", "GitHub"],
    githubUrl: "https://github.com/kavi79331-debug/Smart-expense",
    liveUrl: "https://keen-sunshine-a80748.netlify.app/",
    featured: true
  },
  {
    id: 2,
    title: "Stopwatch",
    category: "React Web Application",
    description: "A responsive stopwatch application built with React and Vite, providing an interactive interface for starting, pausing, resetting, and tracking elapsed time.",
    technologies: [
      "React",
      "JavaScript",
      "Vite",
      "CSS"
    ],
    githubUrl: "https://github.com/kavi79331-debug/Stop-watch",
    liveUrl: "https://stellar-bienenstitch-1d237a.netlify.app",
    featured: true
  },
  {
    id: 3,
    title: "To-Do List",
    category: "React Web Application",
    description: "A task management web application built with React and Vite, designed to help users organize and manage their daily tasks through a simple and interactive interface.",
    technologies: [
      "React",
      "JavaScript",
      "Vite",
      "CSS"
    ],
    githubUrl: "https://github.com/kavi79331-debug/TODO",
    liveUrl: "https://todo-ten-mauve-72.vercel.app/",
    featured: true
  },
  {
    id: 4,
    title: "Drag and Drop",
    category: "React Web Application",
    description: "An interactive drag-and-drop web application built with React and Vite, demonstrating dynamic user interactions and drag-and-drop functionality.",
    technologies: [
      "React",
      "JavaScript",
      "Vite",
      "CSS"
    ],
    githubUrl: "https://github.com/kavi79331-debug/Drag-and-Drop",
    liveUrl: "https://bucolic-baklava-14f1c2.netlify.app",
    featured: true
  }
];

export const educationData = [
  {
    id: 1,
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Ifet college of Engineering",
    location: "Villupuram",
    period: "2024 - 2028"
  },
  {
    id: 2,
    degree: "Higher Secondary Education (Science & Mathematics)",
    institution: "Shree A Subbaraya Chettiar's girls Higher Secondary School",
    location: "Panruti",
    period: "2022 - 2024",
    details: "Focus in Advanced Mathematics, Physics, and Biology."
  },
  {
    id: 3,
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "Shree A Subbaraya Chettiar's girls Higher Secondary School",
    location: "Panruti",
    period: "2021 - 2022",
    details: "Completed 10th standard secondary school education."
  }
];

export const certificatesData = [
  {
    id: 1,
    title: "CCNA: Introduction to Networking",
    issuer: "Cisco Networking Academy",
    category: "Networking & Infrastructure",
    description: "In-depth study of networking architectures, models, and protocols. Covers IP addressing (IPv4 and IPv6), subnetting principles, Ethernet switching, routing fundamentals, network media, and essential network security concepts.",
    skills: [
      "Network Fundamentals",
      "IPv4 & IPv6 Subnetting",
      "Routing & Switching Basics",
      "OSI & TCP/IP Architectures",
      "Network Security Essentials",
      "Packet Tracer Simulation"
    ]
  },
  {
    id: 2,
    title: "VAC: Drone Technology",
    issuer: "Value Added Course",
    category: "Robotics & UAV Systems",
    description: "Hands-on specialized training in Unmanned Aerial Vehicle (UAV) engineering, aerodynamics, flight controllers, sensor integration, telemetry communication protocols, and autonomous flight navigation systems.",
    skills: [
      "UAV Aerodynamics & Design",
      "Flight Controllers & ESCs",
      "Sensor Integration & Telemetry",
      "Drone Assembly & Calibration",
      "Autonomous Flight Planning",
      "Safety Protocols & Regulations"
    ]
  },
  {
    id: 3,
    title: "Web Development Internship",
    issuer: "Twilight IT Solutions, Pondicherry",
    category: "Professional Internship",
    description: "Completed intensive practical internship focused on modern web development workflows, creating responsive and dynamic web interfaces, integrating APIs, writing clean modular code, and collaborating on real-world web applications.",
    skills: [
      "Web Application Development",
      "Front-End Engineering",
      "HTML5, CSS3 & JavaScript",
      "Responsive UI/UX Implementation",
      "REST API Integration",
      "Git & Team Collaboration"
    ]
  }
];

export const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" }
];
