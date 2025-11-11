import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const resumeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      const sections = [
        { id: 'hero', ref: heroRef },
        { id: 'about', ref: aboutRef },
        { id: 'skills', ref: skillsRef },
        { id: 'experience', ref: experienceRef },
        { id: 'projects', ref: projectsRef },
        { id: 'resume', ref: resumeRef }
      ];

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = section.ref.current;
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (elementRef: React.RefObject<HTMLElement | null>, offset: number = 90) => {
    const element = elementRef.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top - offset, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // projects - use public/ paths by referencing root ("/ChariWork.png")
  const projects = [
    {
      title: "ChariWork",
      description:
        "A website that rounds up your changes from everyday purchases and donates it to charity. Built with React, Node.js, and Neon Database, featuring secure payment integration and real-time donation tracking.",
      tech: ["React", "Node.js", "Neon", "Plaid API", "Charities API"],
      github: "https://github.com",
      demo: null,
      featured: true,
      // public/ChariWork.png -> reference as /ChariWork.png
      image: "/ChariWork.png"
    },
    {
      title: "UCSC Baskin Booking Website",
      description:
        "Tour booking website for UCSC's Baskin Engineering Student Ambassador program. Built with React and Firebase, featuring real-time scheduling, admin dashboard, and secure authentication.",
      tech: ["Typescript", "React", "Firebase", "Tailwind CSS"],
      github: "https://github.com/natanielj/BESABooking",
      demo: "https://besabooking.vercel.app",
      featured: true,
      image: "/BESA_Booking.png"
    },
    {
      title: "Portfolio for UCLA EE Engineer",
      description:
        "Personal portfolio website for a UCLA electrical engineering student, showcasing projects and skills with a sleek, modern design. Built with HTML and CSS",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/agonzalez85/andys-Website",
      demo: "https://andygonzalez.me/",
      featured: true,
      image: "/andy_website.png"
    },
    {
      title: "Meal Planner App",
      description:
        "A meal planning application that generates weekly meal plans and shopping lists based on user dietary preferences and restrictions. Built with React and Javascript.",
      tech: ["React", "JavaScript", "Firebase"],
      github: "https://github.com/arelyyrosendes/meal-planner-app",
      demo: null,
      featured: false,
      // keep emoji fallback for when no image exists
      image: "🌱"
    }
  ];

  const experiences = [
    {
      title: "Web Developer Intern",
      company: "Baskin Engineering, UC Santa Cruz",
      location: "Santa Cruz, CA",
      period: "Summer 2025",
      description: [
        "Developed a React-based tour booking website for UCSC's BESA program, enabling prospective students to schedule engineering building tours",
        "Built a user-friendly admin dashboard for managing tours, BESAs, and office hours",
        "Integrated Firebase Authentication for secure admin access and Firestore for real-time database updates",
        "Collaborated with teammates to design front-end components and ensure responsive, mobile-friendly layouts"
      ],
      technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS", "React Router"]
    },
    {
      title: "DevOps Intern",
      company: "Lawrence Livermore National Laboratory",
      location: "Livermore, CA",
      period: "Summer 2024",
      description: [
        "Hosted and deployed an AI interface locally using Docker and Kubernetes, eliminating third-party dependencies",
        "Managed containerized applications and orchestrated services in a Linux environment",
        "Implemented CI/CD pipelines and automated deployments for internal applications",
        "Documented processes and collaborated with senior engineers on AI integration and system reliability"
      ],
      technologies: ["Docker", "Kubernetes", "Linux", "OpenShift", "CI/CD"]
    },
    {
      title: "Front-End Supervisor",
      company: "Burlington Stores",
      location: "Santa Cruz, CA",
      period: "2022 - 2023",
      description: [
        "Supervised and trained a team of cashiers and floor associates to improve workflow and customer service",
        "Managed front-end operations, ensuring accuracy in transactions and store presentation",
        "Implemented process improvements to optimize checkout efficiency",
        "Assisted in onboarding and mentoring new employees"
      ],
      technologies: ["POS Systems", "Team Leadership", "Customer Service"]
    },
    {
      title: "Guest Advocate",
      company: "Target",
      location: "Santa Cruz, CA",
      period: "2021 - 2022",
      description: [
        "Provided exceptional customer service, resolving inquiries and complaints promptly",
        "Guided guests through store policies and promotions to enhance their shopping experience",
        "Collaborated with team members to maintain a clean and organized store environment",
        "Supported onboarding and training of new team members"
      ],
      technologies: ["Customer Service", "Problem Solving", "Team Collaboration"]
    },
    {
      title: "Cashier",
      company: "Ross Dress for Less",
      location: "Santa Cruz, CA",
      period: "2020 - 2021",
      description: [
        "Processed transactions efficiently while maintaining accuracy and speed",
        "Assisted customers with product inquiries and returns, ensuring a positive shopping experience",
        "Maintained store appearance and organized merchandise",
        "Worked collaboratively with team members to achieve daily operational goals"
      ],
      technologies: ["POS Systems", "Customer Service", "Teamwork"]
    }
  ];

  const navItems = [
    { label: '01. About', ref: aboutRef, id: 'about', subpages: [] },
    { label: '02. Technical Skills', ref: skillsRef, id: 'skills', subpages: [] },
    {
      label: '03. Experience',
      ref: experienceRef,
      id: 'experience',
      subpages: experiences.map(exp => ({
        label: exp.company,
        action: () => {
          scrollToSection(experienceRef);
          setTimeout(() => {
            const index = experiences.findIndex(e => e.company === exp.company);
            setSelectedIndex(index);
          }, 500);
        }
      }))
    },
    {
      label: '04. Projects',
      ref: projectsRef,
      id: 'projects',
      subpages: [
        { label: 'Featured Projects', action: () => scrollToSection(projectsRef) },
        { label: 'Other Projects', action: () => scrollToSection(projectsRef) }
      ]
    },
    { label: '05. Resume', ref: resumeRef, id: 'resume', subpages: [] }
  ];

  // helper to render project image (handles public root paths or emoji fallback)
  const renderProjectImage = (image: string | undefined, title: string) => {
    if (!image) return null;
    // If it's likely a path (starts with '/'), render <img>
    if (typeof image === 'string' && image.startsWith('/')) {
      return (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
      );
    }
    // if it's a plain filename without leading '/', allow that too
    if (typeof image === 'string' && (image.endsWith('.png') || image.endsWith('.jpg') || image.endsWith('.jpeg') || image.endsWith('.webp'))) {
      const path = image.startsWith('/') ? image : `/${image}`;
      return (
        <img
          src={path}
          alt={title}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
      );
    }
    // fallback: emoji or text
    return <div className="text-8xl">{image}</div>;
  };

  return (
    <div
      className="min-h-screen transition-all duration-1000"
      style={{
        backgroundColor: '#001f3f',
        color: '#fff9f2'
      }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 transition-all duration-300 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div
              className="cursor-pointer transition-transform duration-300"
              onClick={() => scrollToSection(heroRef)}
            >
              {/* logo in public -> use root path */}
              <img src="/Logo.png" alt="Logo" className="h-20 w-auto" />
            </div>

            {/* Desktop Menu */}
            <div className={`${isMenuOpen ? "hidden" : " md:flex"} items-center space-x-8`}>
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => scrollToSection(item.ref, 50)}
                    className="text-sm font-mono transition-colors duration-200 hover:text-pink-300 relative"
                    style={{
                      color: activeSection === item.id ? '#f7cac9' : '#5b6d8c'
                    }}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-300 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button (visible on small screens only) */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
              style={{ color: '#f7cac9' }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 p-6 rounded-lg backdrop-blur-lg" style={{ backgroundColor: 'rgba(91, 109, 140, 0.9)' }}>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.ref)}
                  className="block w-full text-left py-3 font-mono transition-colors duration-200"
                  style={{ color: '#fff9f2' }}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/resume.pdf"
                className="block mt-4 px-4 py-2 border rounded text-center font-mono"
                style={{ borderColor: '#f7cac9', color: '#f7cac9' }}
              >
                Resume
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Fixed Social Links */}
      <div className="fixed left-6 bottom-0 z-30 hidden lg:block">
        <div className="flex flex-col items-center space-y-6">
          {[
            { icon: <Github size={20} />, href: "https://github.com/arelyyrosendes" },
            { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/arelyrosendes/" },
            { icon: <Mail size={20} />, href: "mailto:arelyrosendes@gmail.com" }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="transition-all duration-300 hover:-translate-y-1"
              style={{ color: '#5b6d8c' }}
            >
              {social.icon}
            </a>
          ))}
          <div className="w-px h-24 bg-gray-500"></div>
        </div>
      </div>

      {/* Fixed Email */}
      <div className="fixed right-6 bottom-0 z-30 hidden lg:block">
        <div className="flex flex-col items-center space-y-6">
          <a
            href="mailto:arelyrosendes@gmail.com"
            className="text-sm font-mono transition-all duration-300 hover:-translate-y-1"
            style={{
              color: '#5b6d8c',
              writingMode: 'vertical-lr'
            }}
          >
            arelyrosendes@gmail.com
          </a>
          <div className="w-px h-24 bg-gray-500"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="hero"
        className="min-h-screen flex items-center px-6"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <p className="text-base font-mono mb-4" style={{ color: '#f7cac9' }}>
              Hi, my name is
            </p>
            <h1 className="text-3xl md:text-7xl font-bold mb-4 animate-typing leading-[1.2]">
              Arely Rosendes.
            </h1>
            <h2
              className="text-xl md:text-6xl font-bold mb-6"
              style={{ color: '#5b6d8c' }}
            >
              I build things for the web.
            </h2>
            <p
              className="max-w-xl text-lg leading-relaxed mb-12"
              style={{ color: '#ddaaaa' }}
            >
              I'm a computer science student specializing in building exceptional digital experiences.
              Currently, I'm focused on getting my degree at{' '}
              <span style={{ color: '#f7cac9' }}>UC Santa Cruz</span>.
            </p>
            <button
              onClick={() => scrollToSection(projectsRef)}
              className="px-8 py-4 border border-pink-300 rounded font-mono text-sm transition-all duration-300 hover:bg-pink-300 hover:bg-opacity-10 hover:-translate-y-1"
              style={{ color: '#f7cac9' }}
            >
              Check out my work!
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        id="about"
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-16">
            <h2 className="text-3xl font-bold font-mono mr-4" style={{ color: '#f7cac9' }}>
              01. About Me
            </h2>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className="space-y-4 text-lg" style={{ color: '#ddaaaa' }}>
                <p
                  className="max-w-xl text-lg leading-relaxed mb-12"
                  style={{ color: '#ddaaaa' }}
                >
                  Hello! I'm a computer science student passionate about building meaningful, user-focused digital experiences.
                  I love blending clean functionality with thoughtful design to create interfaces that feel effortless to use.
                  Currently, I'm completing my degree at{' '}
                  <span style={{ color: '#f7cac9' }}>UC Santa Cruz</span>, with a focus on front-end engineering, UI/UX, and full-stack development.
                  <br /><br />
                  When I'm not coding, you'll likely find me exploring the outdoors, designing creative side projects, or experimenting in the kitchen — cooking is my favorite creative outlet outside of tech. I love discovering new recipes, plating meals like tiny art pieces, and sharing food with friends.
                  <br /><br />
                  I'm driven by curiosity, collaboration, and the joy of bringing ideas to life, one well-built component (and one good recipe) at a time.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div
                className="relative z-10 w-72 h-72 rounded border-2 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 overflow-hidden"
                style={{ borderColor: '#f7cac9' }}
              >
                <div
                  className="w-full h-full flex items-center justify-center text-6xl"
                  style={{ backgroundColor: '#5b6d8c' }}
                >
                  👩‍💻
                </div>
                <div
                  className="absolute inset-0 bg-pink-300 bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-0"
                ></div>
              </div>
              <div
                className="absolute top-4 left-4 w-72 h-72 border-2 -z-10"
                style={{ borderColor: '#f7cac9' }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="flex items-center mb-12">
            <h2 className="text-3xl font-bold font-mono mr-4" style={{ color: '#f7cac9' }}>
              02. Technical Skills
            </h2>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Skills Lists */}
          <div className="grid md:grid-cols-2 gap-10 font-mono text-sm" style={{ color: '#ddaaaa' }}>
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <p className="text-base mb-2" style={{ color: '#f7cac9' }}>Programming Languages</p>
                <p>Python • C/C++ • Java • MIPS Assembly • Bash/Shell</p>
              </div>

              <div>
                <p className="text-base mb-2" style={{ color: '#f7cac9' }}>Web Tools</p>
                <p>JavaScript • HTML • CSS</p>
              </div>

              <div>
                <p className="text-base mb-2" style={{ color: '#f7cac9' }}>Operating Systems</p>
                <p>Linux • MacOS</p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div>
                <p className="text-base mb-2" style={{ color: '#f7cac9' }}>DevOps Tools</p>
                <p>Git • GitLab • OpenShift • Kubernetes • Docker • OpenAPI</p>
              </div>

              <div>
                <p className="text-base mb-2" style={{ color: '#f7cac9' }}>Certifications</p>
                <p>AWS (Amazon Web Services)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        ref={experienceRef}
        id="experience"
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-16">
            <h2 className="text-3xl font-bold font-mono mr-4" style={{ color: '#f7cac9' }}>
              03. Experience
            </h2>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Company tabs */}
          <div className="flex flex-col gap-4 mb-8 overflow-x-auto">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`whitespace-nowrap px-4 py-3 text-left font-mono text-sm border-l-2 border-b-2 transition-all duration-200 ${
                  selectedIndex === index
                    ? 'border-pink-300 bg-pink-300 bg-opacity-10 text-pink-300'
                    : 'border-gray-600 text-gray-400 hover:bg-gray-800'
                }`}
              >
                {exp.title} - {exp.company}
              </button>
            ))}
          </div>

          {/* Experience details */}
          {experiences[selectedIndex] && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold">{experiences[selectedIndex].title}</h3>
              <p className="text-gray-400">
                {experiences[selectedIndex].company} | {experiences[selectedIndex].location} | {experiences[selectedIndex].period}
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {experiences[selectedIndex].description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              <div className="mt-2 flex flex-wrap gap-2">
                {experiences[selectedIndex].technologies.map((tech, i) => (
                  <span key={i} className="text-sm bg-gray-700 px-2 py-1 rounded">{tech}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        id="projects"
        className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-16">
            <h2 className="text-3xl font-bold font-mono mr-4" style={{ color: '#f7cac9' }}>
              04. Projects
            </h2>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-24 mb-24">
            {projects.filter(p => p.featured).map((project, index) => (
              <div
                key={project.title}
                className="grid md:grid-cols-12 gap-8 items-center"
              >
                {/* Project Image */}
                <div className={`md:col-span-6 ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                  <div
                    className="relative group cursor-pointer rounded-lg overflow-hidden h-96 bg-gray-800"
                    style={{ backgroundColor: '#5b6d8c' }}
                  >
                    <div className="absolute inset-0 bg-pink-300 bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-0"></div>
                    <div className="flex items-center justify-center h-full w-full">
                      {renderProjectImage(project.image as string, project.title)}
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className={`md:col-span-6 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'}`}>
                  <p className="text-sm font-mono mb-2" style={{ color: '#f7cac9' }}>
                    Featured Project
                  </p>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#fff9f2' }}>
                    {project.title}
                  </h3>
                  <div
                    className="p-6 rounded-lg mb-4 backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(17, 34, 64, 0.8)' }}
                  >
                    <p style={{ color: '#ddaaaa' }}>
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4 font-mono text-sm">
                    {project.tech.map((tech) => (
                      <span key={tech} style={{ color: '#5b6d8c' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="transition-colors duration-200 hover:text-pink-300"
                      style={{ color: '#5b6d8c' }}
                    >
                      <Github size={20} />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo.startsWith('http') ? project.demo : `https://${project.demo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 hover:text-pink-300"
                        style={{ color: '#5b6d8c' }}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section
        ref={resumeRef}
        id="resume"
        className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-3xl font-bold font-mono mr-4" style={{ color: '#f7cac9' }}>
              05. View My Resume!
            </h2>
          </div>

          <h3 className="text-4xl font-bold mb-6" style={{ color: '#fff9f2' }}>
            Download or View My Resume
          </h3>

          <p className="text-lg mb-12 max-w-lg mx-auto leading-relaxed" style={{ color: '#ddaaaa' }}>
            You can download a PDF version of my resume or view it directly in your browser.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {/* Download Resume */}
            <a
              href="/resume.pdf"
              download
              className="inline-block px-8 py-4 border border-pink-300 rounded font-mono transition-all duration-300 hover:bg-pink-300 hover:bg-opacity-10 hover:-translate-y-1"
              style={{ color: '#f7cac9' }}>
              Download Resume
            </a>

            {/* View Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border border-pink-300 rounded font-mono transition-all duration-300 hover:bg-pink-300 hover:bg-opacity-10 hover:-translate-y-1"
              style={{ color: '#f7cac9' }}>
              View Resume
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center space-y-4 md:hidden">
            <div className="flex space-x-6">
              {[
                { icon: <Github size={20} />, href: "https://github.com/arelyyrosendes" },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/arelyrosendes/" },
                { icon: <Mail size={20} />, href: "mailto:arelyrosendes@gmail.com" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="transition-all duration-300 hover:-translate-y-1"
                  style={{ color: '#5b6d8c' }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <p
            className="font-mono text-sm mt-8"
            style={{ color: '#5b6d8c' }}
          >
            Built with React & TypeScript by Arely Rosendes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
