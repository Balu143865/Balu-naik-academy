import { Course, Stat, Testimonial, GalleryItem, FAQItem } from './types';

export const COURSES_DATA: Course[] = [
  {
    id: 'java-fullstack',
    title: 'Java Full-Stack Developer Elite Program',
    category: 'fullstack',
    duration: '6 Months',
    mode: 'Classroom & Online Live',
    description: 'The ultimate enterprise-level development program. Master Java, Spring Boot, REST APIs, Microservices, ReactJS, and SQL with real projects.',
    longDescription: 'This comprehensive course is designed to take you from writing basic Java programs to building complex, modern full-stack web applications. You will learn coding fundamentals, object-oriented concepts, high-performance database design, modern frontend structures with React, and CI/CD tools for production-ready code.',
    skillsCovered: ['Core Java', 'Advanced Java', 'Spring Boot', 'Hibernate / JPA', 'Microservices', 'RESTful APIs', 'ReactJS', 'Tailwind CSS', 'MySQL', 'Git & GitHub', 'Docker', 'AWS Basics'],
    modules: [
      'Module 1: Java Fundamentals & Object-Oriented Programming (OOP)',
      'Module 2: Advanced Java Streams, Lambdas & Collections',
      'Module 3: Relational Database Design with SQL & MySQL',
      'Module 4: Enterprise Backends with Spring Boot & Hibernate',
      'Module 5: Microservices Architecture & Gateway Routing',
      'Module 6: Single Page Applications using ReactJS & Tailwind CSS',
      'Module 7: API Integrations & Web Application Security (Spring Security)',
      'Module 8: DevOps Basics, Jenkins CI/CD & Deploying to AWS'
    ],
    tag: 'Highly Recommended',
    colorTheme: 'blue'
  },
  {
    id: 'python-fullstack',
    title: 'Python Full-Stack Specialist Program',
    category: 'fullstack',
    duration: '5 Months',
    mode: 'Classroom & Online Live',
    description: 'Launch your developer career using the worlds most popular language. Master Python, Django framework, PostgreSQL, React, and REST APIs.',
    longDescription: 'Unleash the power of Python. This specialization covers essential programming concepts, web application development using Django and Flask, schema design with PostgreSQL, dynamic interactive frontend components with React, and automation tools.',
    skillsCovered: ['Python Programming', 'Django MVC', 'Flask Essentials', 'PostgreSQL', 'Django REST Framework', 'ReactJS', 'REST APIs', 'BeautifulSoup', 'Git', 'Agile Methodologies', 'Nginx Hosting'],
    modules: [
      'Module 1: Python Core Syntax & Advanced Data Structures',
      'Module 2: File Handling & Exception Management',
      'Module 3: PostgreSQL Database Modelling & Performance',
      'Module 4: Web Development with Flask & Django MVC',
      'Module 5: Designing Solid APIs with Django REST Framework (DRF)',
      'Module 6: Creating Dynamic Interfaces with React & Hooks',
      'Module 7: Testing Python Apps (unittests, pytest)',
      'Module 8: Live Project Deployment with Gunicorn & Linux Servers'
    ],
    tag: 'Trending Stack',
    colorTheme: 'amber'
  },
  {
    id: 'software-testing',
    title: 'Comprehensive Software Testing (Manual + Automation)',
    category: 'testing',
    duration: '3 Months',
    mode: 'Classroom & Online Live',
    description: 'Become a highly requested Quality Assurance Expert. Master Test Planning, Selenium WebDriver, Core Java/Python, TestNG, Cucumber BDD, and Postman API Testing.',
    longDescription: 'Quality is at the core of every digital product. In this intensive program, you start with foundational Manual Testing concepts and quickly advance to writing advanced browser automation scripts, running API test collections, tracking bugs, and integrating tests into Devops pipelines.',
    skillsCovered: ['SDLC & STLC', 'JUnit / TestNG', 'Selenium WebDriver', 'Java for Testers', 'Cucumber BDD', 'API Testing with Postman', 'RestAssured', 'JIRA Defect Tracking', 'Git Integration', 'Jenkins Workflows'],
    modules: [
      'Module 1: Software Quality Assurance (Manual Testing Guidelines)',
      'Module 2: Designing Test Cases & Bug Lifecycle Management (JIRA)',
      'Module 3: Java Basics for Selenium Automation',
      'Module 4: Selenium WebDriver Core & Element Locators',
      'Module 5: Test Automation Frameworks (TestNG, Page Object Model)',
      'Module 6: Behavior Driven Development (Cucumber BDD & Gherkin)',
      'Module 7: Manual and Automated API Testing (Postman & RestAssured)',
      'Module 8: Continuous Integration (Jenkins, Git, reporting dashboards)'
    ],
    tag: 'Fast-Track Placement',
    colorTheme: 'emerald'
  },
  {
    id: 'aws-devops',
    title: 'AWS Cloud Architecture & DevOps Specialist',
    category: 'cloud',
    duration: '4 Months',
    mode: 'Hybrid Intensive',
    description: 'The premier program for modern system engineering. Master AWS cloud environments, Linux servers, Docker containers, Kubernetes, Terraform, and Jenkins.',
    longDescription: 'DevOps engineers bridge code development and operation. In this cloud-focused curriculum, you will build automated Continuous Integration and Continuous Deployment (CI/CD) pipelines, write Infrastructure as Code (IaC) configuration scripts, and host applications on scalable AWS instances.',
    skillsCovered: ['AWS EC2, VPC, S3, RDS', 'Linux Systems', 'Docker Containers', 'Kubernetes Clusters', 'Jenkins CI/CD', 'Terraform Code', 'Ansible Architecture', 'Prometheus & Grafana', 'GitOps Workflows'],
    modules: [
      'Module 1: Linux Administration & Shell Scripting Automation',
      'Module 2: Amazon Web Services (AWS) Core Certified Cloud Practitioner Concepts',
      'Module 3: Designing Highly Available and Secure Networks (VPC, Security Groups)',
      'Module 4: Containerizing Applications using Docker',
      'Module 5: High Scale Container Orchestration with Kubernetes (EKS / minikube)',
      'Module 6: CI/CD Pipeline Automation utilizing Jenkins & GitHub Actions',
      'Module 7: Infrastructure as Code (IaC) with Terraform & Vagrant',
      'Module 8: Configuration Management via Ansible & Server Health Monitoring'
    ],
    tag: 'High-Paying Track',
    colorTheme: 'indigo'
  },
  {
    id: 'mern-stack',
    title: 'MERN Stack Web Developer Elite',
    category: 'fullstack',
    duration: '4 Months',
    mode: 'Classroom & Online Live',
    description: 'Become a highly skilled modern JavaScript specialist. Build blazing fast real-time apps with MongoDB, Express, React, and Node.js.',
    longDescription: 'React and Node.js are the core of modern product development. Learn to build and deploy rich web systems entirely in JavaScript. You will master asynchronous database flow, JWT login systems, API design, state managers (Redux/Zustand), and cloud hostings.',
    skillsCovered: ['ReactJS', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose ORM', 'JWT Security', 'Tailwind CSS', 'Redux Toolkit', 'REST APIs', 'WebSocket Real-time', 'Vercel & Render hosting', 'GitHub workflows'],
    modules: [
      'Module 1: Modern JavaScript ES6+, Flexbox, and Tailwind CSS Layouts',
      'Module 2: Dynamic Views, Custom Hooks, and Context APIs in React',
      'Module 3: Modern Node.js Event Loop & Express Middleware Structures',
      'Module 4: MongoDB NoSQL Schema Designs & Data Relationships',
      'Module 5: User Authentications (Secure passwords, Hash, JWT Tokens)',
      'Module 6: Global State Management (Redux Toolkit or Zustand)',
      'Module 7: Real-time Communication using WebSockets (Socket.io)',
      'Module 8: Deploying Full Stack apps to AWS and modern cloud systems'
    ],
    tag: 'MNC Star Stack',
    colorTheme: 'sky'
  }
];

export const STATS_DATA: Stat[] = [
  {
    id: 'students',
    iconName: 'GraduationCap',
    label: 'Learners Trained',
    value: '2.5K+',
    target: 2500,
    suffix: '+'
  },
  {
    id: 'placements',
    iconName: 'Sparkles',
    label: 'Placement Support',
    value: '100%',
    target: 100,
    suffix: '%'
  },
  {
    id: 'partners',
    iconName: 'Building',
    label: 'Hiring Partners',
    value: '120+',
    target: 120,
    suffix: '+'
  },
  {
    id: 'packages',
    iconName: 'Award',
    label: 'Highest Salary Package',
    value: '18 LPA',
    target: 18,
    suffix: ' LPA'
  },
  {
    id: 'avg-package',
    iconName: 'TrendingUp',
    label: 'Average Salary',
    value: '5.2 LPA',
    target: 52, // multiply 5.2 by 10 inside counter for clean animation
    suffix: ' LPA'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Anusha Banavath',
    role: 'Associate Software Engineer',
    company: 'TCS',
    packageText: '6.5 LPA',
    courseTaken: 'Java Full-Stack Developer Program',
    fromBackground: 'B.Sc Computer Science Graduate',
    quote: 'The rigorous Java mentorship at Balu Naik Academy changed everything. The practical mini-projects and clean backend coding guidelines taught by expert mentors helped me crack my TCS interview on my very first attempt.',
    rating: 5,
    featured: true
  },
  {
    id: 'test-2',
    name: 'Ramesh Chowdary',
    role: 'Full Stack Developer',
    company: 'Tech Mahindra',
    packageText: '5.8 LPA',
    courseTaken: 'MERN Stack Developer Program',
    fromBackground: 'Mechanical Engineering Graduate',
    quote: 'Being from a non-IT branch, I was extremely anxious about code. But the trainers at Balu Naik Academy start from absolute scratch. From standard HTML tags to deploying complex nested state React applications on AWS, they made it simple.',
    rating: 5,
    featured: true
  },
  {
    id: 'test-3',
    name: 'Bhavya Sri',
    role: 'QA Automation Engineer',
    company: 'Cognizant',
    packageText: '4.8 LPA',
    courseTaken: 'Comprehensive Software Testing',
    fromBackground: 'B.Tech ECE Graduate',
    quote: 'I highly recommend Balu Naik Academy for software testing. They do not just teach Selenium slides; we had daily homework, solved actual browser defects, wrote Cucumber scenarios, and automated API requests with RestAssured.',
    rating: 5,
    featured: false
  },
  {
    id: 'test-4',
    name: 'Manoj Kumar',
    role: 'Cloud DevOps Associate',
    company: 'Wipro',
    packageText: '7.2 LPA',
    courseTaken: 'AWS Cloud Architecture & DevOps',
    fromBackground: 'BCA Graduate',
    quote: 'The DevOps program is incredibly comprehensive. Having hands-on labs with real AWS accounts, writing YAML docker-compose configuration, and automating Ansible playbooks gave me the exact skills recruiters seek.',
    rating: 5,
    featured: true
  },
  {
    id: 'test-5',
    name: 'Sandeep Naik K.',
    role: 'Junior Web Specialist',
    company: 'Capgemini',
    packageText: '5.0 LPA',
    courseTaken: 'Python Full-Stack Specialist Program',
    fromBackground: 'B.Com Graduate',
    quote: 'The placement drive at Balu Naik Academy is organized so well. Within three weeks of course completion, I had four interviews lined up. Capgeminis onboarding questions were exactly what we practiced in class mock sessions.',
    rating: 5,
    featured: false
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Modern Coding Classroom',
    category: 'classroom',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    description: 'Fully air-conditioned theoretical and interactive lecture layouts with high-speed Internet connectivity.'
  },
  {
    id: 'gal-2',
    title: 'High Performance Coding Labs',
    category: 'labs',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    description: 'Our digital coding laboratory where students practice building enterprise web solutions daily.'
  },
  {
    id: 'gal-3',
    title: 'Weekly Hackathons & Code Battles',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    description: 'Friendly peer developer contests hosted to promote collaborative problem-solving skills.'
  },
  {
    id: 'gal-4',
    title: '1-on-1 Expert Mentorship Sessions',
    category: 'classroom',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    description: 'Individual debugging sessions where experts clear questions regarding systems architecture.'
  },
  {
    id: 'gal-5',
    title: 'Mock Interview Prep & Group Discussions',
    category: 'placement',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    description: 'Simulating official corporate assessments with real HR leaders to make students confidence-ready.'
  },
  {
    id: 'gal-6',
    title: 'Successful Graduation & Joinees Ceremony',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Celebrating our placed graduates with onboarding goodies and completion distributions.'
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    question: 'Are the courses suitable for non-technical graduates?',
    answer: 'Absolutely. Over 65% of our placed graduates come from non-IT backgrounds (B.Sc, B.Com, Mechanical, Civil, BCA). Our curriculum starts from absolute scratch and gradually levels up to advanced concepts.'
  },
  {
    question: 'What is the placement support process at Balu Naik Academy?',
    answer: 'We provide direct placement support. This includes Resume optimization, LinkedIn branding, 5+ mock engineering interviews, mock behavioral meetings, and direct candidate profiles sharing with our 120+ partner organizations.'
  },
  {
    question: 'Do you provide certificate after course completion?',
    answer: 'Yes, you will receive an industry-recognized Course Completion Certificate from Balu Naik Academy, along with project achievement badges and GitHub credentials showcasing your live project codes.'
  },
  {
    question: 'Are online live and offline classroom models identical in curriculum?',
    answer: 'Perfectly identical. Both live online streams and offline classroom courses feature the same hands-on labs, identical assignments, shared portal codes, and same placement drives eligibility.'
  },
  {
    question: 'Can I pay the program fees in easy installments?',
    answer: 'Yes, we provide flexible fee structures with monthly installment options, zero-cost EMI plans to help make high-quality code training accessible to everyone.'
  }
];
