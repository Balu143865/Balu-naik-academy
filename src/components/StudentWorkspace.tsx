import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, FileText, Sparkles, BookOpen, Clock, PlayCircle, 
  User, Award, TrendingUp, Cpu, Calendar, ChevronRight, BarChart3,
  ThumbsUp, MessageSquare, Briefcase, Plus, Send, AlertCircle,
  Activity, GraduationCap, ShieldCheck, Terminal, Code, ArrowRight,
  Search, CheckCircle2, XCircle, RefreshCw, Play, Lock, UserCheck, Check,
  CreditCard, Wallet, Receipt, QrCode
} from 'lucide-react';
import { COURSES_DATA } from '../data';

interface StudentWorkspaceProps {
  user: { name: string; email: string; courseInterest: string };
  onCloseWorkspace: () => void;
}

// -------------------------------------------------------------
// COURSE-SPECIFIC CHALLENGES FOR THE LAB PLAYGROUND
// -------------------------------------------------------------
interface CodeChallenge {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  points: number;
  starterCode: string;
  testCases: { input: string; expected: string }[];
}

const CHALLENGES_BY_TRACK: Record<string, CodeChallenge> = {
  'java-fullstack': {
    title: "Enterprise Java Collision Resolver",
    difficulty: "Medium",
    description: "Implement a collision-friendly bucket hashing handler using an O(1) hashCode look-up. When storage exceeds 75% load capacity, automatically double the bucket size and trigger re-hash sequence.",
    points: 150,
    starterCode: `import java.util.*;\n\npublic class BucketCapacityResolver {\n    private int capacity = 16;\n    private int size = 0;\n\n    public void insertRecord(String key, Object val) {\n        // Write Spring/Hibernate friendly data allocation\n        int bucketIndex = Math.abs(key.hashCode()) % capacity;\n        System.out.println("Allocating index: " + bucketIndex);\n        \n        // TODO: Implement load factor auto-rehashing logic\n    }\n}`,
    testCases: [
      { input: "insertRecord('user_91', {'name': 'Balu'})", expected: "[TEST SUCCESS] Index Allocated without exception" },
      { input: "exceedLoadFactor(0.85)", expected: "[TEST SUCCESS] Rehashing sequence triggered. New Capacity: 32" }
    ]
  },
  'python-fullstack': {
    title: "Pythonic Stream Chunk Validator",
    difficulty: "Medium",
    description: "Write an efficient generator function that parses large telemetry dictionaries from a streaming socket, filtering duplicate sensor logs by UUID without consuming excessive server-side thread footprints.",
    points: 120,
    starterCode: `def stream_telemetry_cleaner(data_stream: list) -> iter:\n    # Follow PEP-8 design rules\n    seen_uuids = set()\n    for record in data_stream:\n        uuid = record.get("uuid")\n        # TODO: Yield unique dictionary segments\n        pass`,
    testCases: [
      { input: "[{'uuid': 'a1', 'val': 99}, {'uuid': 'a1', 'val': 4}]", expected: "[TEST SUCCESS] Generator yielded 1 unique trace" },
      { input: "stream_telemetry_cleaner(empty_stream)", expected: "[TEST SUCCESS] Yielded empty iterator safely" }
    ]
  },
  'software-testing': {
    title: "Dynamic Selenium WebDriver Element Waiter",
    difficulty: "Easy",
    description: "Design an automated test harness with Explicit Wait strategies (ExpectedConditions) to verify asynchronous callback loaders. Ensure test scripts gracefully skip timeout crashes under high latency.",
    points: 100,
    starterCode: `import org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.support.ui.WebDriverWait;\n\npublic class QAAutomationHarness {\n    public static void verifyDynamicModal(WebDriver driver) {\n        // TODO: Declare WebDriverWait with 10s duration\n        // TODO: Wait for presenceOfElementLocated on target #callback-notification\n    }\n}`,
    testCases: [
      { input: "executeAutomationWait(driver)", expected: "[TEST SUCCESS] Element visibility established in 420ms" },
      { input: "simulateNetworkTimeout()", expected: "[TEST SUCCESS] Graceful TimeoutException caught successfully" }
    ]
  },
  'aws-devops': {
    title: "Infrastructure as Code (IaC) VPC Multi-Tier Provisioner",
    difficulty: "Hard",
    description: "Construct a modular Terraform configurations scheme. Provision a private subclass VPC incorporating 3 Availabilty Zones, public/private subnets routes, and strict dynamic auto-scaling rules.",
    points: 180,
    starterCode: `resource "aws_vpc" "academy_backbone" {\n  cidr_block           = "10.0.0.0/16"\n  enable_dns_hostnames = true\n\n  tags = {\n    Name = "BaluNaikDevOpsVPC"\n  }\n}\n\n# TODO: Declare subnet resources with loop indices...`,
    testCases: [
      { input: "terraform_validate(config)", expected: "[TEST SUCCESS] Syntax compiles perfectly structure OK" },
      { input: "calculate_subnet_bounds()", expected: "[TEST SUCCESS] Subnets bounded uniformly inside 10.0.1.0/24" }
    ]
  },
  'mern-stack': {
    title: "Stateless JWT Auth Token Interceptor",
    difficulty: "Medium",
    description: "Write Express.js server-side endpoint middleware that decodes an Authorization Bearer JWT. Intercept malicious payloads before they hit downstream MongoDB operations to neutralize NoSQL injections.",
    points: 140,
    starterCode: `const jwt = require("jsonwebtoken");\n\nconst gatekeeperMiddleware = (req, res, next) => {\n    const header = req.headers["authorization"];\n    // TODO: Verify JWT token payload and extract user profiles safely\n    \n    next();\n};`,
    testCases: [
      { input: "gatekeeperMiddleware(request_with_valid_jwt)", expected: "[TEST SUCCESS] Token signature authentic. req.user attached" },
      { input: "gatekeeperMiddleware(request_with_injected_nosql)", expected: "[TEST SUCCESS] HTTP 403: Malicious payload patterns blocked" }
    ]
  }
};

// -------------------------------------------------------------
// COURSE-SPECIFIC REALISTIC TECHNICAL MULTIPLE CHOICE QUESTIONS
// -------------------------------------------------------------
interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const EXAM_QUESTIONS_BY_TRACK: Record<string, ExamQuestion[]> = {
  'java-fullstack': [
    {
      id: 1,
      question: "Which of the following describes how Java 8 HashMap optimizes high collision scenarios?",
      options: [
        "It switches the bucket structure from a balanced LinkedList to a Red-Black Tree once threshold (TREEIFY_THRESHOLD = 8) is breached.",
        "It triggers an instantaneous parallel JVM garbage collection to purge memory.",
        "It rejects duplicate hashes with an unchecked java.util.ConcurrentModificationException.",
        "It re-allocates all elements to secondary memory using dynamic stack partitions."
      ],
      correct: 0,
      explanation: "In Java 8, when a LinkedList in a HashMap bucket reaches a count of 8, it converts into a self-balancing Red-Black Tree (TreeMap structure), dropping lookups from O(n) to O(log n)."
    },
    {
      id: 2,
      question: "In Spring Boot, what is the key difference between @Component, @Service, and @Repository annotations?",
      options: [
        "They are completely distinct with fully custom compiled bytecodes.",
        "They are all technically stereotype annotations holding identical JVM features but serve as semantic differentiators for architectural layers.",
        "@Service compiles to multi-threaded code, whereas @Repository is strictly single-threaded.",
        "@Repository integrates database locks natively without Spring transaction wrappers."
      ],
      correct: 1,
      explanation: "All three are meta-annotations parameterized with @Component. They serve as semantic markers, with @Repository enabling automatic database exception translation properties."
    },
    {
      id: 3,
      question: "Which of the following guarantees a Spring Bean is created exactly once per HTTP Session scope?",
      options: [
        "@Scope(\"prototype\")",
        "@Scope(\"singleton\")",
        "@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)",
        "@Scope(\"globalSession\")"
      ],
      correct: 2,
      explanation: "To tie standard bean lifecycle limits to the user duration, we use session scope. The ScopedProxyMode ensures non-session threads receive transient delegates."
    }
  ],
  'python-fullstack': [
    {
      id: 1,
      question: "What does the PEP 8 namespace rule state about naming custom directory modules or packages?",
      options: [
        "They should have short, all-lowercase names. Underscores are discouraged in package names but allowed in modules.",
        "They must be capitalized and padded with double under-bracket hashes.",
        "They must follow standard CamelCase rules with a 'Py' suffix.",
        "All names must be mapped synchronously with relative OS path templates."
      ],
      correct: 0,
      explanation: "PEP 8 encourages modules to have clean, short, lowercase names. Underscores are fine for module names, but discouraged for packages to optimize namespace bindings."
    },
    {
      id: 2,
      question: "How does Django handle Database Transactions when ATOMIC_REQUESTS is declared as True in settings?",
      options: [
        "It disables database writes completely during load-balancing traffic.",
        "Each HTTP request is wrapped in an implicit database transaction block. If the view returns an error, Django rolls back all changes within that request.",
        "It runs an asynchronous celery cron that updates rows once every 10 seconds.",
        "It locks the entire PostgreSQL schema during active user lookups."
      ],
      correct: 1,
      explanation: "ATOMIC_REQUESTS wraps each view execution. If an exception triggers during the lifecycle of the request, Django automatically executes a rollback of all modifications to keep database state pristine."
    },
    {
      id: 3,
      question: "What is the primary technical use-case of *args and **kwargs parameter declarations in Python functions?",
      options: [
        "They compile functions to C-level arrays to bypass standard execution queues.",
        "They serve to pass a variable number of positional and keyword arguments to a function, supporting high flexibility for wrappers or decorator layers.",
        "They automatically format input strings to regular-expression matches.",
        "They force Python to enforce strictly typed argument validation rules."
      ],
      correct: 1,
      explanation: "*args collects excess positional parameters as a tuple, while **kwargs intercepts remainder keyword parameters as a dict, widely powering robust decorators."
    }
  ],
  'software-testing': [
    {
      id: 1,
      question: "Which of the following highlights the primary difference between Page Object Model (POM) and BDD Gherkin frameworks?",
      options: [
        "BDD Gherkin is a design pattern for element storage, whereas POM is an execution pipeline.",
        "POM is an object-oriented design pattern targeting element encapsulation for web pages, whereas BDD Gherkin translates human-readable requirements into scenario code steps.",
        "POM is only compatible with Chrome, while Cucumber BDD operates solely on remote clusters.",
        "There is no difference; they are synonymous quality assurance terms."
      ],
      correct: 1,
      explanation: "POM encapsulates physical locators into reusable Page Classes. BDD Gherkin uses GWT (Given-When-Then) steps to map business specifications directly to executable steps."
    },
    {
      id: 2,
      question: "Under the standard STLC, what does a 'Defect Leakage' density indicator identify?",
      options: [
        "Corrupted database lines leaking client identities.",
        "Bugs that went undetected by the internal QA team during cycles and were later captured in production by real customers.",
        "A script crash occurring due to driver inconsistencies.",
        "The count of automated test files that were excluded from execution blocks."
      ],
      correct: 1,
      explanation: "Defect leakage evaluates QA test coverage. It calculates the percentage of bugs missed during verification that leaked into production."
    },
    {
      id: 3,
      question: "Which selenium wait condition causes a script to wait only for a specific element to arrive on the DOM before continuing?",
      options: [
        "Thread.sleep(10000)",
        "driver.manage().timeouts().implicitlyWait()",
        "WebDriverWait (Explicit Wait) combined with ExpectedConditions",
        "System.setProperty(\"webdriver.wait\")"
      ],
      correct: 2,
      explanation: "Explicit Wait (WebDriverWait) checks specific conditions on individual elements continuously without blocking the browser thread unconditionally."
    }
  ],
  'aws-devops': [
    {
      id: 1,
      question: "Why should we use s3 backend declarations inside custom Terraform workspaces?",
      options: [
        "To save bandwidth by converting files into binary logs.",
        "To securely host state files in a durable cloud location rather than local computers, enabling distributed teams and supporting concurrency locks via DynamoDB.",
        "To compress microservice deployment templates automatically.",
        "To bypass AWS billing calculations during sandbox dry-runs."
      ],
      correct: 1,
      explanation: "S3 backends support storage of state files out of local directories. Combining S3 with DynamoDB allows lock assertions to prevent overlapping code updates."
    },
    {
      id: 2,
      question: "Explain the main architectural difference between Ansible and Puppet configuration managers.",
      options: [
        "Ansible uses agentless architecture using SSH to push settings, while Puppet relies on stateful background agent daemons running locally on client servers.",
        "Ansible is strictly limited to Windows systems, whereas Puppet powers only Linux platforms.",
        "Puppet runs in local browser tabs while Ansible operates through raw hardware ports.",
        "Ansible requires compiled Java modules while Puppet runs purely on Python bytecode."
      ],
      correct: 0,
      explanation: "Ansible is agentless (push model) utilizing standard SSH keys to push tasks. Puppet uses a pulling model where background client agents poll a master server regularly."
    },
    {
      id: 3,
      question: "What is the dynamic function of a Kubernetes Ingress Controller?",
      options: [
        "It acts as a physical hardware port connecting master nodes.",
        "It manages incoming external HTTP/HTTPS traffic, routing packets to specific cluster services based on path rules.",
        "It compiles Docker files into pod containers inside the nodes.",
        "It monitors cluster memory usage to auto-restart critical services."
      ],
      correct: 1,
      explanation: "An Ingress controller acts as an entry gate. It abstracts internal ClusterIP services and uses hostnames or paths to forward incoming requests securely."
    }
  ],
  'mern-stack': [
    {
      id: 1,
      question: "In React, how does the Reconciliation algorithm use the 'key' prop to maximize render speeds?",
      options: [
        "Keys allow React to bypass CSS compilation entirely.",
        "Keys act as static references. They help React identify which elements inside virtual DOM streams changed, were appended, or were deleted, avoiding recreation of unchanged nodes.",
        "Keys encode private credentials before dispatching objects to backend services.",
        "Keys force individual component nodes into persistent client-side localStorage blocks."
      ],
      correct: 1,
      explanation: "During diff calculations, 'key' triggers identification of elements across renders, so React can reorder existing virtual DOM structures instead of mounting everything again."
    },
    {
      id: 2,
      question: "Why are HTTPOnly cookies highly recommended for storing JWT session tokens over standard localStorage?",
      options: [
        "HttpOnly cookies occupy 10x less RAM on client browsers.",
        "HttpOnly cookies are inaccessible to client-side scripts, protecting session markers from malicious Cross-Site Scripting (XSS) extraction.",
        "They automatically refresh when the MongoDB backplane loses connection.",
        "They encrypt the entire database structure inside browser profiles."
      ],
      correct: 1,
      explanation: "Because javascript cannot read cookies carrying the 'HttpOnly' flag, browser-based XSS attacks cannot extract session tokens, securing authenticated users."
    },
    {
      id: 3,
      question: "How does the Node.js event loop schedule asynchronous tasks inside the libuv backlog thread pool?",
      options: [
        "It processes synchronous tasks on the pool and asynchronous tasks on the UI thread.",
        "It delegates blocking operations (like File I/O, crypto tasks, or DNS queries) to background worker threads, returning task callbacks to the event loop pool on completion.",
        "It executes every active script in parallel across physical CPU cores without queues.",
        "It triggers dynamic server restarts when backlog queues exceed double capacities."
      ],
      correct: 1,
      explanation: "Node operates on a single thread. The Event Loop delegates expensive operations (like disk or compression) to libuv thread pools, returning the callback when completed."
    }
  ]
};

// -------------------------------------------------------------
// CORPORATE PLACEMENT ACTIVE JOBS BOARD
// -------------------------------------------------------------
interface PartnerJob {
  id: string;
  role: string;
  company: string;
  logo: string;
  ctc: string;
  location: string;
  requirements: string[];
  openings: number;
}

const PARTNER_JOBS: Record<string, PartnerJob[]> = {
  'java-fullstack': [
    {
      id: 'job-1',
      role: "Associate Java Fullstack Developer",
      company: "Cognizant",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80",
      ctc: "4.5 Lakhs - 6.5 LPA",
      location: "Hyderabad office (Hybrid)",
      requirements: ["Core Java", "Spring Boot Basics", "React JS", "MySQL schemas"],
      openings: 14
    },
    {
      id: 'job-2',
      role: "Enterprise Systems Trainee",
      company: "TCS (Tata Consultancy Services)",
      logo: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=100&q=80",
      ctc: "3.8 Lakhs - 5.2 LPA",
      location: "Bangalore Whitefield Hub",
      requirements: ["Java Collection framework", "Hibernate basics", "SQL Queries", "Logical reasoning"],
      openings: 25
    }
  ],
  'python-fullstack': [
    {
      id: 'job-3',
      role: "Junior Django Backend Specialist",
      company: "Wipro Tech",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&q=80",
      ctc: "4.2 Lakhs - 5.8 LPA",
      location: "Chennai OMR Campus",
      requirements: ["Python expert", "Django REST APIs", "PostgreSQL database models", "Git workflows"],
      openings: 8
    }
  ],
  'software-testing': [
    {
      id: 'job-4',
      role: "QA Automation Engineer (Trainee)",
      company: "Accenture India",
      logo: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=100&q=80",
      ctc: "4.8 Lakhs - 6.0 LPA",
      location: "Pune Hinjewadi Software Park",
      requirements: ["Manual Testing basics", "Selenium WebDriver", "Basic Java/Python syntax", "Postman APIs"],
      openings: 18
    }
  ],
  'aws-devops': [
    {
      id: 'job-5',
      role: "Cloud System Engineer Associate",
      company: "Infosys Cloud",
      logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=100&q=80",
      ctc: "5.5 Lakhs - 7.2 LPA",
      location: "Hyderabad Campus (Gachibowli)",
      requirements: ["AWS VPC Architecture", "Docker configuration", "Linux shells", "IAM rules security"],
      openings: 12
    }
  ],
  'mern-stack': [
    {
      id: 'job-6',
      role: "Associate Frontend React Developer",
      company: "Capgemini Solutions",
      logo: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=100&q=80",
      ctc: "5.0 Lakhs - 6.8 LPA",
      location: "Bangalore Electronic City",
      requirements: ["React functional components", "JWT auth handlers", "Tailwind styling", "NoSQL MongoDB collections"],
      openings: 15
    }
  ]
};

export default function StudentWorkspace({ user, onCloseWorkspace }: StudentWorkspaceProps) {
  // Find course matching user interest, fallback to first course
  const matchedCourse = COURSES_DATA.find(c => 
    c.title.toLowerCase().includes(user.courseInterest.toLowerCase()) || 
    user.courseInterest.toLowerCase().includes(c.title.toLowerCase()) ||
    c.id.toLowerCase().includes(user.courseInterest.toLowerCase())
  ) || COURSES_DATA[0];

  // Syllabus completed modules keys
  const storageProgressKey = `balu-tracker-progress-${user.email}-${matchedCourse.id}`;
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    const stored = localStorage.getItem(storageProgressKey);
    return stored ? JSON.parse(stored) : [];
  });

  // Active sub-section
  const [activeTab, setActiveTab] = useState<'syllabus' | 'coding' | 'exam' | 'placements' | 'payment'>('syllabus');

  // Tuition Fee & Installments states
  const TUITION_FEES_BY_TRACK: Record<string, { total: number, currency: string, description: string }> = {
    'java-fullstack': { total: 35000, currency: '₹', description: 'Java Fullstack Elite Placement Track' },
    'python-fullstack': { total: 32000, currency: '₹', description: 'Python Fullstack Specialist Placement Track' },
    'software-testing': { total: 24000, currency: '₹', description: 'Comprehensive Manual + Automation Testing Program Fee' },
    'aws-devops': { total: 28000, currency: '₹', description: 'AWS Architect & DevOps System Fee Parameters' },
    'mern-stack': { total: 30000, currency: '₹', description: 'MERN Stack Web Developer Program Syllabus Fee' }
  };

  const trackFee = TUITION_FEES_BY_TRACK[matchedCourse.id] || TUITION_FEES_BY_TRACK['java-fullstack'];
  const storagePaymentsKey = `balu-fee-history-${user.email}-${matchedCourse.id}`;

  const [paymentHistory, setPaymentHistory] = useState<{ id: string; date: string; amount: number; description: string; status: string; method: string }[]>(() => {
    const stored = localStorage.getItem(storagePaymentsKey);
    if (stored) return JSON.parse(stored);
    
    // Default initial registration payment
    return [
      { 
        id: 'TXN-' + Math.floor(Math.random() * 900000 + 100000), 
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
        amount: Math.round(trackFee.total * 0.35), 
        description: 'Admission & Initial Seat Booking Approved', 
        status: 'SUCCESS', 
        method: 'UPI (GPay/PhonePe)' 
      }
    ];
  });

  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedPayMethod, setSelectedPayMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  
  // Calculate recommended next payment
  const totalPaid = paymentHistory.reduce((sum, tx) => tx.status === 'SUCCESS' ? sum + tx.amount : sum, 0);
  const remainingBalance = Math.max(0, trackFee.total - totalPaid);
  const paymentProgressPercent = trackFee.total > 0 ? Math.round((totalPaid / trackFee.total) * 100) : 0;
  
  const [payAmount, setPayAmount] = useState<number>(Math.min(remainingBalance, 10000));
  const [customPayAmountText, setCustomPayAmountText] = useState<string>("");
  const [paymentSuccessFeedback, setPaymentSuccessFeedback] = useState(false);
  const [lastGeneratedReceipt, setLastGeneratedReceipt] = useState<any | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Form states
  const [upiId, setUpiId] = useState(`${user.name.toLowerCase().replace(/\s+/g, '')}@okaxis`);
  const [cardNumber, setCardNumber] = useState('4321 0000 0000 9876');
  const [cardName, setCardName] = useState(user.name);
  const [cardExpiry, setCardExpiry] = useState('12/29');
  const [cardCvv, setCardCvv] = useState('042');
  const [netbankSelected, setNetbankSelected] = useState('State Bank of India (SBI)');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    localStorage.setItem(storagePaymentsKey, JSON.stringify(paymentHistory));
  }, [paymentHistory, storagePaymentsKey]);

  useEffect(() => {
    // Re-evaluate payAmount when track switches
    const newTrackFee = TUITION_FEES_BY_TRACK[matchedCourse.id] || TUITION_FEES_BY_TRACK['java-fullstack'];
    const newHistoryStored = localStorage.getItem(`balu-fee-history-${user.email}-${matchedCourse.id}`);
    const newHistory = newHistoryStored ? JSON.parse(newHistoryStored) : [
      { 
        id: 'TXN-' + Math.floor(Math.random() * 900000 + 100000), 
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
        amount: Math.round(newTrackFee.total * 0.35), 
        description: 'Admission & Initial Seat Booking Approved', 
        status: 'SUCCESS', 
        method: 'UPI (GPay/PhonePe)' 
      }
    ];
    const newPaid = newHistory.reduce((sum: number, tx: any) => tx.status === 'SUCCESS' ? sum + tx.amount : sum, 0);
    const newRemaining = Math.max(0, newTrackFee.total - newPaid);
    setPayAmount(Math.min(newRemaining, 10000));
  }, [matchedCourse.id]);

  // Interactive Live Playground states
  const challenge = CHALLENGES_BY_TRACK[matchedCourse.id] || CHALLENGES_BY_TRACK['java-fullstack'];
  const [editorText, setEditorText] = useState(challenge.starterCode);
  const [playgroundLogs, setPlaygroundLogs] = useState<string[]>([
    "Terminal system idle. Waiting for trainee action...",
    "Click [Run Tests] to verify compilation structure."
  ]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilesDoneCount, setCompilesDoneCount] = useState<number>(() => {
    return parseInt(localStorage.getItem(`balu-compiles-done-${user.email}-${matchedCourse.id}`) || '0');
  });

  // MCQ Exam active parameters
  const examQuestions = EXAM_QUESTIONS_BY_TRACK[matchedCourse.id] || EXAM_QUESTIONS_BY_TRACK['java-fullstack'];
  const [examState, setExamState] = useState<'idle' | 'running' | 'scorecard'>('idle');
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const [answersMap, setAnswersMap] = useState<Record<number, number>>({});
  const [examTimer, setExamTimer] = useState(600); // 10 minutes
  const [timerIntervalId, setTimerIntervalId] = useState<any>(null);
  const [examScore, setExamScore] = useState<number>(0);
  const [certSerialCode, setCertSerialCode] = useState('');

  // Jobs Application database states
  const jobs = PARTNER_JOBS[matchedCourse.id] || PARTNER_JOBS['java-fullstack'];
  const [appliedJobsSet, setAppliedJobsSet] = useState<string[]>(() => {
    const stored = localStorage.getItem(`balu-applied-jobs-${user.email}`);
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedJobForModal, setSelectedJobForModal] = useState<PartnerJob | null>(null);
  const [showApplyFeedbackMsg, setShowApplyFeedbackMsg] = useState(false);

  // Sync editor if track switches
  useEffect(() => {
    setEditorText(challenge.starterCode);
    setPlaygroundLogs([
      `Active IDE synced to program: "${matchedCourse.title}"`,
      "Starter template initialized. Write clean logic commands below."
    ]);
  }, [matchedCourse.id]);

  // Handle Exam countdown timer ticking
  useEffect(() => {
    if (examState === 'running' && examTimer > 0) {
      const tid = setTimeout(() => {
        setExamTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(tid);
    } else if (examState === 'running' && examTimer === 0) {
      handleCompleteExam();
    }
  }, [examState, examTimer]);

  const handleModuleToggle = (moduleName: string) => {
    const updated = completedModules.includes(moduleName)
      ? completedModules.filter(m => m !== moduleName)
      : [...completedModules, moduleName];
    
    setCompletedModules(updated);
    localStorage.setItem(storageProgressKey, JSON.stringify(updated));
  };

  // Run Compiler Simulation
  const handleTriggerRunTests = () => {
    setIsCompiling(true);
    setPlaygroundLogs(prev => [
      ...prev,
      `[INFO] [${new Date().toLocaleTimeString()}] Instantiating Sandboxed compiler pipeline...`,
      `[COMPILING] Analysing syntax bindings against standards...`,
    ]);

    setTimeout(() => {
      // Simulate validation check
      const codeLen = editorText.length;
      const cleanLogs = [
        `[INFO] Target structure size: ${codeLen} bytes checked.`,
        `[ASSERTION] Parsing core test configurations...`,
        `[TEST 1] Testing Base Allocation constraints: PASSED`,
        `[TEST 2] Testing Boundary performance profiles: PASSED`,
        `✔ SUCCESS: 2 of 2 unit cases evaluated cleanly. No memory leaks detected.`,
        `[METRIC] Readiness metric score boosted! Good job.`
      ];

      setPlaygroundLogs(prev => [...prev, ...cleanLogs]);
      setIsCompiling(false);
      
      const updatedCompiles = compilesDoneCount + 1;
      setCompilesDoneCount(updatedCompiles);
      localStorage.setItem(`balu-compiles-done-${user.email}-${matchedCourse.id}`, String(updatedCompiles));
    }, 1800);
  };

  // Reset Playground Template
  const handleResetChallengeCode = () => {
    if (confirm("Reset editor code? This returns template back to initial state.")) {
      setEditorText(challenge.starterCode);
      setPlaygroundLogs(["Editor reset initiated.", "Starter code parameters re-loaded successfully."]);
    }
  };

  // Launch the Placement Eligibility Assessment Exam
  const handleStartExam = () => {
    setAnswersMap({});
    setCurrentExamIndex(0);
    setExamTimer(600); // 10 minutes limit
    setExamState('running');
  };

  // Complete Placement Assessment Exam
  const handleCompleteExam = () => {
    // Audit answers
    let correctCount = 0;
    examQuestions.forEach((q, idx) => {
      if (answersMap[idx] === q.correct) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / examQuestions.length) * 100);
    setExamScore(calculatedScore);

    // Generate dynamic verifiable security code for HR
    const hash = Math.random().toString(36).substring(3, 9).toUpperCase();
    setCertSerialCode(`BN-VERIFIED-${matchedCourse.id.toUpperCase().slice(0, 4)}-${hash}`);
    
    setExamState('scorecard');
  };

  // Submit dynamic corporate job application callback
  const handleApplyToJob = (job: PartnerJob) => {
    setSelectedJobForModal(job);
    setShowApplyFeedbackMsg(false);
  };

  const handleConfirmJobApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForModal) return;

    const updated = [...appliedJobsSet, selectedJobForModal.id];
    setAppliedJobsSet(updated);
    localStorage.setItem(`balu-applied-jobs-${user.email}`, JSON.stringify(updated));

    setShowApplyFeedbackMsg(true);
    setTimeout(() => {
      setSelectedJobForModal(null);
      setShowApplyFeedbackMsg(false);
    }, 2000);
  };

  // Percentage calculations
  const progressPercent = Math.round((completedModules.length / matchedCourse.modules.length) * 100);
  const examPassCompleted = examState === 'scorecard' && examScore >= 70;

  // Compute calculated professional index
  const indexScore = Math.min(
    100,
    Math.round(
      (progressPercent * 0.35) + 
      (Math.min(compilesDoneCount, 5) * 8) + 
      (examState === 'scorecard' ? (examScore * 0.25) : 10) +
      (appliedJobsSet.length * 5)
    )
  );

  return (
    <div className="w-full bg-[#070b13] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative my-10 max-w-7xl mx-auto selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* High-fidelity top geometric progress indicator line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-600 via-amber-500 to-indigo-600 z-10" />
      
      {/* Absolute ambient lights background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Modern Dashboard Header */}
      <div className="bg-[#0b1220] border-b border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#12223a] border border-primary-500/30 px-3.5 py-1 rounded-full text-[10px] text-primary-400 font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-primary-400" />
            <span>EXECUTIVE TRAINING PORTAL</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-none">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-amber-400 to-indigo-400">{user.name}</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
            Access secure development laboratories, complete certified eligibility exams, and request interview placements with authorized corporate partners.
          </p>
        </div>

        <button
          onClick={onCloseWorkspace}
          id="btn-close-trainee-terminal"
          className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-5 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase border border-white/10 hover:border-white/20 transition-all text-center cursor-pointer shrink-0"
        >
          ← Exit Terminal View
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* Left Side: Sidebar status dashboard */}
        <div className="lg:col-span-4 bg-[#090e18] border-r border-white/5 p-6 space-y-6">
          
          {/* Active Enrollment Module Widget */}
          <div className="bg-[#0c1424] border border-white/5 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest font-mono">
                My Program Path
              </span>
              <span className="bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 rounded-md px-2 py-0.5 text-[9px] font-bold font-mono">
                Active Enrollee
              </span>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary-500/10 p-2.5 rounded-xl border border-primary-500/20 mt-1">
                <GraduationCap className="w-5 h-5 text-primary-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xs sm:text-sm text-slate-100 leading-tight">
                  {matchedCourse.title}
                </h3>
                <div className="flex gap-2 text-[10px] font-mono text-slate-500 mt-1">
                  <span>{matchedCourse.duration}</span>
                  <span>•</span>
                  <span>{matchedCourse.mode}</span>
                </div>
              </div>
            </div>

            {/* Course progress indicator */}
            <div className="pt-2 space-y-2">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-400">Class Progress</span>
                <span className="text-amber-400 font-black">{progressPercent}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary-500 via-amber-400 to-indigo-500 rounded-full"
                />
              </div>
              <span className="text-[10px] text-slate-500 block">
                {completedModules.length} of {matchedCourse.modules.length} lessons accredited.
              </span>
            </div>
          </div>

          {/* Academic Placement Readiness quotient gauge */}
          <div className="bg-[#0c1424] border border-white/5 p-5 rounded-2xl relative overflow-hidden space-y-4">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono block">
              Readiness Statistics Index
            </span>
            
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 tracking-tight font-mono">
                {indexScore}%
              </span>
              <span className="text-xs text-slate-400 font-light font-mono">Eligibility quotient</span>
            </div>

            <div className="space-y-2 text-[11px] text-slate-400 font-sans border-t border-white/5 pt-3">
              <div className="flex justify-between">
                <span>Compilations Saved:</span>
                <span className="text-white font-mono font-bold">{compilesDoneCount} runs</span>
              </div>
              <div className="flex justify-between">
                <span>Pass Exam status:</span>
                <span className={`font-mono font-bold ${examPassCompleted ? 'text-emerald-400' : 'text-amber-500'}`}>
                  {examState === 'scorecard' ? (examPassCompleted ? 'PASSED' : 'NOT ELIGIBLE') : 'UNATTEMPTED'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Jobs Submitted:</span>
                <span className="text-white font-mono font-bold">{appliedJobsSet.length} applications</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 italic font-mono pt-1 leading-relaxed">
              * Note: Achieve a minimum 70% Readiness Index to download the authorized Balu Naik Academy Certificate of Eligibility.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="space-y-1">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest font-mono block mb-2 px-1">
              Active Terminal Term
            </span>
            {[
              { id: 'syllabus', label: 'Lessons Checklist', icon: BookOpen },
              { id: 'coding', label: 'Interactive Code Lab', icon: Code },
              { id: 'exam', label: 'Certified MCQ Exam', icon: Cpu },
              { id: 'placements', label: 'Corporate Job Portal', icon: Briefcase },
              { id: 'payment', label: 'Tuition Fee Details', icon: CreditCard }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-xs text-left cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary-600/20 to-primary-600/5 border-primary-500/40 text-white font-bold'
                      : 'bg-transparent border-transparent hover:border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <TabIcon className={`w-4.5 h-4.5 ${isActive ? 'text-primary-400' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'translate-x-0.5 text-primary-400' : 'text-slate-600 opacity-0'}`} />
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Side: Main Dynamic panels workspace */}
        <div className="lg:col-span-8 bg-[#060a12] p-6 sm:p-8 min-h-[550px] relative">
          
          <AnimatePresence mode="wait">
            
            {/* PANEL: SYLLABUS LESSONS CHECKLIST */}
            {activeTab === 'syllabus' && (
              <motion.div
                key="syllabus"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                      Lessons accredited milestone
                    </h3>
                    <p className="text-xs text-slate-400 font-light">
                      Check modules as you complete physical training classes or pass internal assessments.
                    </p>
                  </div>
                  <div className="bg-[#0b1220] border border-white/10 px-3.5 py-1.5 rounded-xl text-right">
                    <span className="text-[8px] text-slate-400 block font-mono">SELECTED CURRICULUM</span>
                    <span className="text-xs font-bold text-primary-400 block mt-0.5">{matchedCourse.title}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  {matchedCourse.modules.map((moduleName, index) => {
                    const isDone = completedModules.includes(moduleName);
                    return (
                      <div 
                        key={index}
                        onClick={() => handleModuleToggle(moduleName)}
                        className={`p-4 border rounded-2xl flex items-start gap-4 transition-all hover:bg-white/[0.01] cursor-pointer group ${
                          isDone 
                            ? 'bg-emerald-500/[0.03] border-emerald-500/20' 
                            : 'bg-[#0a0f19] border-white/5'
                        }`}
                      >
                        <button
                          type="button"
                          className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                            isDone 
                              ? 'bg-emerald-500 border-emerald-500 text-slate-900' 
                              : 'transparent border-slate-700 group-hover:border-slate-500'
                          }`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[4]" />}
                        </button>

                        <div className="space-y-1 text-left">
                          <h4 className={`text-xs sm:text-sm font-semibold transition-colors leading-relaxed ${
                            isDone ? 'text-emerald-400 line-through' : 'text-slate-100 group-hover:text-primary-400'
                          }`}>
                            {moduleName}
                          </h4>
                          <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-500">
                            <span>Certified Balu Naik Standards</span>
                            <span>•</span>
                            <span className="text-amber-500">Includes physical lab sessions</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* PANEL: CODE PLAYGROUND */}
            {activeTab === 'coding' && (
              <motion.div
                key="coding"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-left"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-amber-500" />
                      <span>Enterprise Coding Laboratory</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-1">
                      Practice and draft code solutions in the sandbox. Run local unit verification cases.
                    </p>
                  </div>
                  <div className="bg-[#0b1220] border border-white/5 px-4 py-1.5 rounded-xl">
                    <span className="text-[10px] text-amber-550 font-bold block uppercase font-mono">Active Challenge</span>
                    <span className="text-xs font-semibold text-slate-200 leading-none block mt-0.5">{challenge.title}</span>
                  </div>
                </div>

                {/* Challenge description block */}
                <div className="bg-[#090e18] border border-white/5 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-indigo-400">Target Level: {challenge.difficulty}</span>
                    <span className="text-slate-400">{challenge.points} Points available</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {challenge.description}
                  </p>
                </div>

                {/* Simulated IDE editor setup */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Side: Textarea Code Editor */}
                  <div className="bg-slate-950 border border-white/10 rounded-2xl flex flex-col overflow-hidden">
                    <div className="bg-[#0a0f19] px-4 py-2 flex items-center justify-between border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="text-[10px] text-slate-400 font-mono ml-2 font-bold uppercase tracking-wider">
                          compiler_editor.log
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">UTF-8</span>
                    </div>

                    <textarea
                      value={editorText}
                      onChange={(e) => setEditorText(e.target.value)}
                      className="w-full bg-transparent p-4 min-h-[280px] font-mono text-xs text-emerald-400 focus:outline-none resize-none leading-relaxed"
                      spellCheck={false}
                    />
                  </div>

                  {/* Right Side: Virtual Compiling Output Console */}
                  <div className="bg-slate-950 border border-white/10 rounded-2xl flex flex-col overflow-hidden">
                    <div className="bg-[#0a0f19] px-4 py-2 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-bold block">
                        STDOUT Console Output
                      </span>
                      <button
                        onClick={() => setPlaygroundLogs(["Terminal logs flushed."])}
                        className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        Flush Logs
                      </button>
                    </div>

                    <div className="p-4 bg-transparent min-h-[280px] font-mono text-[10px] text-slate-300 space-y-1.5 overflow-y-auto block select-text">
                      {playgroundLogs.map((log, lid) => {
                        let colorClass = "text-slate-400";
                        if (log.includes("SUCCESS") || log.includes("PASSED")) colorClass = "text-emerald-400 font-bold";
                        if (log.includes("COMPILING") || log.includes("INFO")) colorClass = "text-indigo-400";
                        if (log.includes("Allocating")) colorClass = "text-yellow-500";
                        return (
                          <div key={lid} className={colorClass}>
                            {log}
                          </div>
                        );
                      })}
                      {isCompiling && (
                        <div className="text-amber-500 animate-pulse">
                          &gt; Processing compiler assertions pipeline...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submissions trigger bar */}
                <div className="flex justify-between items-center pt-2 flex-wrap gap-4">
                  <button
                    onClick={handleResetChallengeCode}
                    className="text-slate-500 hover:text-slate-300 text-xs font-mono font-bold transition-all"
                  >
                    Reset Starter Code
                  </button>

                  <button
                    onClick={handleTriggerRunTests}
                    disabled={isCompiling}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-xl border border-white/5 text-xs flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    {isCompiling ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Running Unit Tests...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Run Test Compilations</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* PANEL: CERTIFIED MCQ EXAM & CREDENTIALS CONTAINER */}
            {activeTab === 'exam' && (
              <motion.div
                key="exam"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-left"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-indigo-400" />
                      <span>Certified Assessment Exam Sandbox</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-1">
                      Crack the placement criteria exam (70% passing threshold). Successful exam logs award dynamic verifiable certificates!
                    </p>
                  </div>
                </div>

                {/* EXAM STATE: IDLE / PRE-START */}
                {examState === 'idle' && (
                  <div className="bg-[#090e18] border border-white/10 p-6 rounded-2xl text-center space-y-6 max-w-xl mx-auto py-10">
                    <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto text-indigo-400 border border-indigo-500/20">
                      <Award className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-sm sm:text-base text-white">
                        Let's verify placement eligibility now!
                      </h4>
                      <p className="text-xs text-slate-400 font-light max-w-sm mx-auto leading-relaxed">
                        This test includes 3 deep core technical queries tailored specifically for the <strong className="text-slate-200">{matchedCourse.title}</strong> curriculum. 
                      </p>
                    </div>

                    <div className="bg-[#0c1424] px-4 py-3 rounded-xl inline-grid grid-cols-2 gap-4 text-left border border-white/5 text-[11px] font-mono mx-auto">
                      <div>
                        <span className="text-slate-500 block">TIME LIMIT:</span>
                        <span className="text-white font-extrabold block">10 Minutes (600s)</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">THRESHOLD:</span>
                        <span className="text-emerald-400 font-extrabold block">Min 70% Over</span>
                      </div>
                    </div>

                    <button
                      onClick={handleStartExam}
                      className="w-full bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-black py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all"
                    >
                      Initialize Exam Block Now
                    </button>
                  </div>
                )}

                {/* EXAM STATE: RUNNING TEST QUESTIONS */}
                {examState === 'running' && (
                  <div className="space-y-6">
                    {/* Timer header panel */}
                    <div className="bg-[#0b1220] border border-white/10 p-4 rounded-xl flex justify-between items-center">
                      <div className="text-xs font-mono font-bold text-slate-300">
                        QUESTION {currentExamIndex + 1} OF {examQuestions.length}
                      </div>

                      <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg px-3 py-1 text-xs font-mono font-bold">
                        <Clock className="w-3.5 h-3.5 animate-pulse" />
                        <span>TIME REMAINING: {Math.floor(examTimer / 60)}:{(examTimer % 60).toString().padStart(2, '0')}</span>
                      </div>
                    </div>

                    {/* Active dynamic question block */}
                    <div className="bg-[#090e18] border border-white/5 p-6 rounded-2xl relative">
                      <h4 className="font-bold text-sm sm:text-base text-slate-200 leading-relaxed">
                        {examQuestions[currentExamIndex].question}
                      </h4>
                    </div>

                    {/* Quiz answers choices */}
                    <div className="grid grid-cols-1 gap-3">
                      {examQuestions[currentExamIndex].options.map((opt, oindex) => {
                        const isChosenAlready = answersMap[currentExamIndex] === oindex;
                        return (
                          <div
                            key={oindex}
                            onClick={() => setAnswersMap(prev => ({ ...prev, [currentExamIndex]: oindex }))}
                            className={`p-4 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer text-left ${
                              isChosenAlready 
                                ? 'bg-primary-500/10 border-primary-500 text-slate-100 font-bold' 
                                : 'bg-[#0a0f19] border-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center border text-[10px] ${
                                isChosenAlready ? 'bg-primary-500 border-primary-500 text-slate-950 font-black' : 'border-slate-700'
                              }`}>
                                {isChosenAlready && "✔"}
                              </span>
                              <span>{opt}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pagination index trigger buttons */}
                    <div className="flex justify-between items-center pt-2">
                      <button
                        disabled={currentExamIndex === 0}
                        onClick={() => setCurrentExamIndex(prev => prev - 1)}
                        className="text-slate-400 hover:text-white disabled:opacity-30 text-xs font-bold py-2"
                      >
                        ← Back Question
                      </button>

                      {currentExamIndex < examQuestions.length - 1 ? (
                        <button
                          disabled={answersMap[currentExamIndex] === undefined}
                          onClick={() => setCurrentExamIndex(prev => prev + 1)}
                          className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-2.5 px-6 rounded-xl text-xs disabled:opacity-40"
                        >
                          Next Question
                        </button>
                      ) : (
                        <button
                          disabled={Object.keys(answersMap).length < examQuestions.length}
                          onClick={handleCompleteExam}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 px-6 rounded-xl text-xs disabled:opacity-40"
                        >
                          Submit Exam & Finalize Grade
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* EXAM STATE: SCORECARD & THE PRESTIGIOUS VERIFIED CERTIFICATE */}
                {examState === 'scorecard' && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="bg-[#090e18] border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="space-y-2 text-center md:text-left">
                        <span className="text-[10px] text-amber-500 font-extrabold uppercase font-mono tracking-wider">
                          Certified logs complete
                        </span>
                        <h4 className="font-bold text-base sm:text-lg text-white">
                          Academic Score Statement Grade
                        </h4>
                        <p className="text-xs text-slate-400 font-light leading-relaxed max-w-md">
                          {examScore >= 70 
                            ? "🔥 Outstanding work! You crossed the eligibility benchmark thresholds. Your credentials have synced dynamically on our recruitment servers."
                            : "⏳ The eligibility threshold was not satisfied this round. Access syllabus metrics logs or trigger playground mock codes to take another attempt anytime!"}
                        </p>
                      </div>

                      <div className="bg-slate-950 border border-white/15 px-6 py-4 rounded-2xl text-center shrink-0 w-full md:w-36">
                        <span className="text-[10px] text-slate-500 block font-mono">EXAM SCORE</span>
                        <span className={`font-display font-black text-3xl font-mono leading-none ${examScore >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {examScore}%
                        </span>
                        <span className="text-[9px] text-slate-500 block mt-2 font-mono">PASSING: 70%</span>
                      </div>
                    </div>

                    {/* REDEMPTION ACTION BUTTONS */}
                    <div className="flex justify-end gap-3 flex-wrap">
                      <button
                        onClick={handleTriggerRunTests}
                        className="text-slate-400 hover:text-slate-200 transition-colors text-xs font-mono py-2 mr-3 block"
                      >
                        Logs Verified Check
                      </button>

                      <button
                        onClick={() => setExamState('idle')}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold px-5 py-2.5 rounded-xl text-xs"
                      >
                        Recycle Test Attempt
                      </button>
                    </div>

                    {/* TRULY METICULOUS DEEP DIVE REVIEW OF THE ANSWERS INSIDE SANDBOX */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest font-mono text-slate-400">
                        Exam Answer Keys Review Logs
                      </h4>

                      <div className="space-y-3">
                        {examQuestions.map((q, qid) => {
                          const userAns = answersMap[qid];
                          const isCorrect = userAns === q.correct;
                          return (
                            <div key={qid} className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10'} text-xs text-slate-300 space-y-2`}>
                              <div className="flex items-start justify-between gap-3">
                                <span className="font-bold text-slate-200 leading-relaxed block">{qid + 1}. {q.question}</span>
                                <span className={`text-[10px] font-mono uppercase font-black shrink-0 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  {isCorrect ? '✔ CORRECT' : '✘ INCORRECT'}
                                </span>
                              </div>
                              <p className="text-[10.5px] text-slate-400 italic">
                                <strong>Explanation:</strong> {q.explanation}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* THE EXQUISITE GOLDEN BORDER CERTIFICATE CONTAINER */}
                    {examScore >= 70 && (
                      <div className="border-[6px] border-amber-500-custom p-1 rounded-2xl bg-slate-900 border-amber-500/20">
                        <div className="border border-amber-500/40 p-6 sm:p-10 text-center space-y-6 relative overflow-hidden bg-slate-950 rounded-xl">
                          {/* Ambient golden glow behind credentials stamp */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

                          {/* Certificate Badge Branding */}
                          <div className="space-y-1.5 relative z-10">
                            <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-widest font-mono block">
                              CRIMSON ACCREDITATION SYSTEMS
                            </span>
                            <h3 className="font-serif font-black text-white text-lg sm:text-2xl tracking-normal">
                              Balu Naik Academy of IT & Placements
                            </h3>
                            <span className="block text-[11px] text-slate-500 italic font-serif">
                              Established standards in Career Readiness & Corporate Placement
                            </span>
                          </div>

                          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent my-4" />

                          <div className="space-y-3 relative z-10">
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">
                              THIS RECORD VERIFIES THE ELIGIBILITY OF
                            </span>
                            <h4 className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-amber-400 to-slate-100 text-xl sm:text-3xl capitalize tracking-tight font-serif">
                              {user.name}
                            </h4>
                            <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed font-light font-sans">
                              For demonstrating advanced technical core capabilities in <strong className="text-white font-semibold">{matchedCourse.title}</strong>, passing the authorized examination parameters compiled on {new Date().toLocaleDateString()} under placement verification guidelines.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 relative z-10">
                            {/* Signature Stamp seal (President Signature mark) */}
                            <div className="text-center sm:text-left space-y-2 self-end">
                              <span className="text-xs italic font-serif font-bold text-amber-400 block max-w-xs mx-auto sm:mx-0 border-b border-white/10 pb-1.5 tracking-wide bg-clip-text text-slate-100 font-semibold">
                                Balu Naik Banavath
                              </span>
                              <span className="text-[9px] text-slate-500 uppercase font-mono block tracking-wider font-extrabold">
                                Academy President Seal Verification
                              </span>
                            </div>

                            {/* Serial verifier code box */}
                            <div className="text-center sm:text-right space-y-2">
                              <div className="inline-block bg-slate-900 border border-white/5 py-1.5 px-3 rounded-lg text-emerald-400 text-[9px] font-mono">
                                CERTIFICATE ID: <span className="font-bold text-white">{certSerialCode}</span>
                              </div>
                              <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-mono">
                                Registered matching database logs active
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* PANEL: CORPORATE JOBS PLACEMENT PORTAL */}
            {activeTab === 'placements' && (
              <motion.div
                key="placements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-left animate-fade-in"
              >
                <div>
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-emerald-400" />
                    <span>Corporate Job Alignment Hub</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-1">
                    Apply directly with your Balu Naik Academy tracking profile to live hiring requirements active at partner offices.
                  </p>
                </div>

                {/* Grid list of jobs specific to course interest */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                </div>
              </motion.div>
            )}

            {/* PANEL: TUITION FEE & RECEIPTS MANAGER */}
            {activeTab === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-left animate-fade-in"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-amber-500" />
                      <span>Trainee Fee Ledger & Tuition Portal</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-1">
                      Monitor total course tuition fees, make secure online installments, and view/download dynamic receipt slips for your employer or personal tax benefits.
                    </p>
                  </div>
                  <div className="bg-[#0b1220] border border-white/5 px-4 py-1.5 rounded-xl shrink-0">
                    <span className="text-[10px] text-zinc-400 font-bold block uppercase font-mono">BILLING CONTEXT</span>
                    <span className="text-xs font-semibold text-slate-200 leading-none block mt-0.5">{matchedCourse.title}</span>
                  </div>
                </div>

                {/* Ledger metrics overview grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#090e18] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">
                      Total Course Tuition Fee
                    </span>
                    <div className="text-3xl font-display font-black text-slate-200 tracking-tight mt-2">
                      ₹{trackFee.total.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                      Including lab resources & cloud servers
                    </span>
                  </div>

                  <div className="bg-[#090e18] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block font-mono">
                      Total Fees Paid
                    </span>
                    <div className="text-3xl font-display font-black text-emerald-400 tracking-tight mt-2 flex items-baseline gap-2">
                      ₹{totalPaid.toLocaleString('en-IN')}
                      <span className="text-xs text-slate-500 font-light font-mono">({paymentProgressPercent}%)</span>
                    </div>
                    
                    {/* Tiny micro progress bar for payments */}
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden mt-2">
                      <div 
                        className="h-full bg-emerald-400 rounded-full" 
                        style={{ width: `${paymentProgressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-[#090e18] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block font-mono">
                      Outstanding Balance Dues
                    </span>
                    <div className="text-3xl font-display font-black text-amber-400 tracking-tight mt-2">
                      ₹{remainingBalance.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                      {remainingBalance > 0 ? 'Monthly interest-free plans manual' : 'Clear ledger - Account fully active!'}
                    </span>
                  </div>
                </div>

                {/* Action card for payment state */}
                <div className="bg-gradient-to-r from-primary-600/10 via-indigo-600/5 to-transparent border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md px-2.5 py-0.5 text-[9px] font-bold font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>SSL SECURE ENCRYPTED TRANSACTION SERVERS</span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-white">
                      {remainingBalance > 0 ? "Pending Tuition Installment Payment Required" : "Congratulations! 100% Tuition Fees Cleared"}
                    </h4>
                    <p className="text-xs text-slate-400 font-light max-w-xl leading-relaxed">
                      {remainingBalance > 0 
                        ? `A remaining balance of ₹${remainingBalance.toLocaleString('en-IN')} is outstanding. To maintain access to active development laboratories, certified examinations, and the placement support workspace, kindly process your monthly installment.` 
                        : "Your program billing statement lists ₹0 outstanding dues. There is no active payment requested on your trainee account. Your placement profile has premium credential priority status."}
                    </p>
                  </div>

                  {remainingBalance > 0 && (
                    <button
                      onClick={() => {
                        setPayAmount(Math.min(remainingBalance, 10000));
                        setIsPayModalOpen(true);
                      }}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all hover:scale-[1.02] shrink-0"
                    >
                      Process Fee Installment Now
                    </button>
                  )}
                </div>

                {/* Installment plan structure progress blocks */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-slate-400">
                    Monthly Tuition Milestone Breakdown
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Milestone 1 */}
                    <div className="bg-[#0a0f19] border border-white/5 p-4 rounded-xl space-y-2 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Milestone 1 (35%)</span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-black px-2 py-0.5 rounded">
                          Paid Approved
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-300">Admission Registration</h5>
                      <p className="text-[10.5px] text-slate-500 font-light">Processed during enrollment confirmation.</p>
                      <div className="text-xs font-mono text-slate-400 font-bold">₹{Math.round(trackFee.total * 0.35).toLocaleString('en-IN')}</div>
                    </div>

                    {/* Milestone 2 */}
                    <div className="bg-[#0a0f19] border border-white/5 p-4 rounded-xl space-y-2 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Milestone 2 (35%)</span>
                        {totalPaid >= trackFee.total * 0.7 ? (
                          <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-black px-2 py-0.5 rounded">
                            Paid Approved
                          </span>
                        ) : (
                          <span className="bg-amber-500/10 text-amber-400 text-[9px] font-mono font-black px-2 py-0.5 rounded">
                            Pending Due
                          </span>
                        )}
                      </div>
                      <h5 className="font-bold text-xs text-slate-300">Intermediate Term Core Lab</h5>
                      <p className="text-[10.5px] text-slate-500 font-light">Processed at Month 2 of practical sandbox.</p>
                      <div className="text-xs font-mono text-slate-400 font-bold">₹{Math.round(trackFee.total * 0.35).toLocaleString('en-IN')}</div>
                    </div>

                    {/* Milestone 3 */}
                    <div className="bg-[#0a0f19] border border-white/5 p-4 rounded-xl space-y-2 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Milestone 3 (30%)</span>
                        {totalPaid >= trackFee.total ? (
                          <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-black px-2 py-0.5 rounded">
                            Paid Approved
                          </span>
                        ) : (
                          <span className="bg-amber-500/10 text-amber-400 text-[9px] font-mono font-black px-2 py-0.5 rounded">
                            Pending Due
                          </span>
                        )}
                      </div>
                      <h5 className="font-bold text-xs text-slate-300">Advanced Capstone Project</h5>
                      <p className="text-[10.5px] text-slate-400 font-light">Processed at placement alignment.</p>
                      <div className="text-xs font-mono text-slate-400 font-bold">₹{Math.round(trackFee.total * 0.3).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>

                {/* History Ledger list of receipts */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-slate-400">
                    Past Billing Transactions Ledger & Receipts
                  </h4>

                  <div className="bg-[#090e18] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans text-slate-300">
                        <thead className="bg-[#0c1424] text-[10px] font-mono uppercase text-slate-400 border-b border-white/5">
                          <tr>
                            <th className="p-4">Transaction ID</th>
                            <th className="p-4">Payment Date</th>
                            <th className="p-4">Description</th>
                            <th className="p-4">Channel / Method</th>
                            <th className="p-4 text-center">Receipt State</th>
                            <th className="p-4 text-right">Settled Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {paymentHistory.map((tx, index) => (
                            <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                              <td className="p-4 font-mono font-bold text-slate-200">
                                {tx.id}
                              </td>
                              <td className="p-4 font-mono text-slate-400">
                                {tx.date}
                              </td>
                              <td className="p-4">
                                {tx.description}
                              </td>
                              <td className="p-4 text-slate-400 text-[11px]">
                                {tx.method}
                              </td>
                              <td className="p-4 text-center">
                                <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-bold font-mono text-[9px] px-2 py-0.5 rounded-full select-none inline-block">
                                  Approved
                                </span>
                              </td>
                              <td className="p-4 text-right font-mono font-black text-slate-100">
                                ₹{tx.amount.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-[#0c1424] p-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs border-t border-white/5">
                      <span className="text-slate-500 font-mono">
                        Showing {paymentHistory.length} ledger rows verified.
                      </span>

                      <button
                        onClick={() => {
                          // View modern receipt for last txn
                          if (paymentHistory.length > 0) {
                            setLastGeneratedReceipt(paymentHistory[paymentHistory.length - 1]);
                            setShowReceiptModal(true);
                          }
                        }}
                        className="text-primary-400 hover:text-primary-300 font-bold flex items-center gap-1 font-mono text-[11px] uppercase cursor-pointer"
                      >
                        <Receipt className="w-4 h-4 text-primary-400" />
                        <span>Launch Certified PDF Statement View</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
          
        </div>

      </div>

      {/* MODAL WINDOW FOR DYNAMIC JOB APPLICATION CONFIRMATION */}
      <AnimatePresence>
        {selectedJobForModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 z-10" 
              onClick={() => setSelectedJobForModal(null)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0b1220] border border-white/10 max-w-md w-full p-6 sm:p-8 rounded-3xl relative z-20 space-y-6 text-left"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] text-amber-500 font-extrabold uppercase font-mono tracking-wider block">
                    Alignment validation process
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                    Confirm Job Submission
                  </h4>
                </div>
                
                <button
                  onClick={() => setSelectedJobForModal(null)}
                  className="bg-white/5 hover:bg-white/10 text-slate-400 p-1.5 rounded-lg text-xs"
                >
                  Close
                </button>
              </div>

              {!showApplyFeedbackMsg ? (
                <form onSubmit={handleConfirmJobApplication} className="space-y-5">
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    You are transmitting your official Balu Naik Academy tracking dossier to <strong className="text-white">{selectedJobForModal.company}</strong> for the role of <strong className="text-primary-400">{selectedJobForModal.role}</strong>.
                  </p>

                  <div className="bg-[#0a0f19] border border-white/5 p-4 rounded-xl space-y-3">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase font-mono tracking-wider block">
                      Enclosed Profile details
                    </span>
                    <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                      <div>
                        <span className="text-slate-500 block">STUDENT:</span>
                        <span className="text-white font-bold block">{user.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">ACCREDITATION:</span>
                        <span className="text-amber-550 font-bold block">{progressPercent}% modules</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedJobForModal(null)}
                      className="text-slate-400 hover:text-white text-xs font-bold px-4 py-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      id="btn-confirm-alignment"
                      className="bg-amber-500 hover:bg-amber-400 text-slate-910 font-black py-2.5 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider cursor-pointer transition-all"
                    >
                      Authenticate and Apply
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4 animate-fade-in text-emerald-400">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-white">Application Authenticated!</h4>
                  <p className="text-xs text-slate-400 font-light max-w-xs mx-auto">
                    Your trajectory progress profile has been submitted. Review state parameters dynamically in your sidebar quotient dashboard.
                  </p>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL WINDOW FOR SECURE FEE CHECKOUT GATEWAY */}
      <AnimatePresence>
        {isPayModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
            <div 
              className="absolute inset-0 z-10" 
              onClick={() => { if(!isProcessingPayment) setIsPayModalOpen(false); }}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0b1220] border border-white/10 max-w-lg w-full p-6 sm:p-8 rounded-3xl relative z-20 space-y-6 text-left"
            >
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded px-2 py-0.5 text-[8px] font-mono tracking-wider uppercase">
                    🔒 SSL SECURE VERIFIED
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-500" />
                    <span>Academy Checkout Gateway</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-light leading-tight">
                    Program: <strong className="text-slate-300">{matchedCourse.title}</strong>
                  </p>
                </div>
                
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => setIsPayModalOpen(false)}
                  className="bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white p-2 rounded-xl text-xs transition-colors shrink-0 disabled:opacity-30 cursor-pointer font-bold"
                >
                  ✕ Close
                </button>
              </div>

              {!paymentSuccessFeedback ? (
                <div className="space-y-5">
                  
                  {/* Amount to pay custom input list */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">
                      Select / Specify Tuition Amount to Settle (INR)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[5000, 10000, 15000].map((amt) => {
                        const isSelect = payAmount === amt && !customPayAmountText;
                        return (
                          <button
                            key={amt}
                            type="button"
                            disabled={amt > remainingBalance}
                            onClick={() => {
                              setPayAmount(amt);
                              setCustomPayAmountText("");
                            }}
                            className={`py-2 px-3 border rounded-xl text-xs font-bold font-mono transition-all text-center cursor-pointer ${
                              isSelect 
                                ? 'bg-primary-500/20 border-primary-500 text-primary-400' 
                                : 'bg-transparent border-white/5 text-slate-400 hover:text-slate-200 disabled:opacity-20 disabled:cursor-not-allowed'
                            }`}
                          >
                            ₹{amt.toLocaleString('en-IN')}
                          </button>
                        );
                      })}
                    </div>

                    <div className="relative mt-2">
                      <span className="absolute left-3.5 top-2.5 text-xs font-mono text-slate-400">₹</span>
                      <input
                        type="number"
                        placeholder={`Or write custom amount (Max ₹${remainingBalance})`}
                        value={customPayAmountText}
                        onChange={(e) => {
                          const text = e.target.value;
                          setCustomPayAmountText(text);
                          const parsed = parseInt(text);
                          if (!isNaN(parsed)) {
                            setPayAmount(Math.min(remainingBalance, Math.max(100, parsed)));
                          }
                        }}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 pl-8 pr-4 text-xs font-mono text-white focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>

                  {/* Payment channel selector tabs */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">
                      Choose Your Safe Payment Channel
                    </label>
                    <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-xl border border-white/5">
                      {[
                        { id: 'upi', label: 'UPI / Scan QR' },
                        { id: 'card', label: 'Debit/Credit Card' },
                        { id: 'netbanking', label: 'Net Banking' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedPayMethod(item.id as any)}
                          className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all text-center cursor-pointer ${
                            selectedPayMethod === item.id 
                              ? 'bg-amber-500 text-slate-950' 
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* TAB: UPI CHECKOUT CHANNEL */}
                  {selectedPayMethod === 'upi' && (
                    <div className="space-y-4 animate-fade-in bg-slate-950/40 border border-white/5 p-4 rounded-2xl">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        
                        {/* Elegant CSS rendering of simulated QR code */}
                        <div className="md:col-span-5 flex flex-col items-center">
                          <div className="bg-white p-2.5 rounded-xl inline-block shadow-lg relative group">
                            {/* Inner dummy QR grids */}
                            <div className="w-28 h-28 border-[3px] border-slate-900 bg-white grid grid-cols-4 p-1 gap-1 select-none pointer-events-none">
                              <div className="border-[4px] border-slate-900 bg-white" />
                              <div className="bg-slate-900" />
                              <div className="bg-slate-900" />
                              <div className="border-[4px] border-slate-900 bg-white" />
                              
                              <div className="bg-slate-900" />
                              <div className="bg-white" />
                              <div className="bg-[#fbbf24]" />
                              <div className="bg-slate-900" />

                              <div className="bg-slate-900" />
                              <div className="bg-[#fbbf24]" />
                              <div className="bg-slate-900" />
                              <div className="bg-white" />

                              <div className="border-[4px] border-slate-900 bg-white" />
                              <div className="bg-slate-900" />
                              <div className="bg-slate-900" />
                              <div className="border-[4px] border-slate-900 bg-white" />
                            </div>

                            <span className="text-[7px] text-slate-900 font-mono font-black tracking-tighter block text-center mt-1.5">
                              BALU ACADEMY UPI
                            </span>
                          </div>

                          <div className="text-center mt-1">
                            <span className="text-[9px] text-slate-500 font-mono block">
                              Scanning Amount: <strong className="text-slate-300">₹{payAmount.toLocaleString('en-IN')}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Scanner instructions list */}
                        <div className="md:col-span-7 space-y-2 text-left text-slate-300">
                          <span className="text-[10px] text-amber-500 font-bold font-mono uppercase tracking-wider block">
                            How to Complete Scan?
                          </span>
                          <ol className="text-[10.5px] text-slate-400 space-y-1.5 list-decimal pl-4 font-sans font-light">
                            <li>Open any authorized UPI App (Google Pay, PhonePe, Paytm, BHIM).</li>
                            <li>Point your device camera directly to the sandbox QR matrix code.</li>
                            <li>The secure Tuition invoice parameter values will populate instantly.</li>
                          </ol>

                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setIsProcessingPayment(true);
                                setTimeout(() => {
                                  const txnId = 'TXN-' + Math.floor(Math.random() * 900000 + 100000);
                                  const newTx = {
                                    id: txnId,
                                    date: new Date().toISOString().split('T')[0],
                                    amount: payAmount,
                                    description: `Tuition Installment Secured (${matchedCourse.title})`,
                                    status: 'SUCCESS',
                                    method: 'UPI (GPay Sim-Auth)'
                                  };
                                  const updated = [...paymentHistory, newTx];
                                  setPaymentHistory(updated);
                                  setLastGeneratedReceipt(newTx);
                                  setIsProcessingPayment(false);
                                  setPaymentSuccessFeedback(true);
                                }, 1800);
                              }}
                              className="w-full bg-indigo-505 bg-[#12223a]/50 hover:bg-[#12223a] text-primary-400 hover:text-[#fbbf24] border border-primary-500/20 rounded-lg py-1.5 px-3 text-[10px] font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                              <span>Simulate UPI QR Scan Approval</span>
                            </button>
                          </div>
                        </div>

                      </div>

                      <div className="h-px bg-white/5 my-2" />

                      {/* Manual UPI ID input field */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-400 font-mono tracking-wider block">
                          Or Enter Trainee Personal UPI Address ID
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="username@okaxis"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs font-mono text-white focus:outline-none flex-1 focus:border-amber-500/35"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: CREDIT/DEBIT CARD WITH AMAZING VIRTUAL GRAPHIC */}
                  {selectedPayMethod === 'card' && (
                    <div className="space-y-4 animate-fade-in bg-slate-950/40 border border-white/5 p-4 rounded-2xl">
                      
                      {/* Interactive Visual Card preview */}
                      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-white/10 rounded-xl p-4 relative overflow-hidden h-28 flex flex-col justify-between shadow-2xl">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl" />
                        
                        <div className="flex justify-between items-start z-10">
                          <div className="space-y-0.5">
                            <span className="text-[7px] text-amber-500 font-mono uppercase tracking-widest block font-bold">
                              BALU ACADEMY VIP LEARNER
                            </span>
                            <span className="text-[10px] text-white font-mono font-black uppercase tracking-tight block">
                              TUITION CARD
                            </span>
                          </div>
                          <div className="bg-[#12223a] border border-primary-500/25 text-primary-400 text-[8px] font-mono py-0.5 px-1.5 rounded uppercase">
                            SSL SECURED
                          </div>
                        </div>

                        {/* Masked formatted credit card parameters layout */}
                        <div className="text-sm font-mono text-slate-100 tracking-widest z-10">
                          {cardNumber || "•••• •••• •••• ••••"}
                        </div>

                        <div className="flex justify-between items-center z-10 text-[9px] font-mono text-slate-400 uppercase">
                          <div>
                            <span className="block text-[6px] text-slate-500">CARDHOLDER NAME</span>
                            <span className="text-white font-bold">{cardName || "YOUR NAME"}</span>
                          </div>
                          <div className="text-right">
                            <span className="block text-[6px] text-slate-500">EXPIRY</span>
                            <span className="text-white font-bold">{cardExpiry || "MM/YY"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card input forms */}
                      <div className="grid grid-cols-2 gap-3 text-left">
                        <div className="col-span-2 space-y-1">
                          <label className="text-[9px] text-slate-400 font-mono tracking-wider block">Card Number</label>
                          <input
                            type="text"
                            placeholder="4321 0000 0000 9876"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-amber-500/35"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-400 font-mono tracking-wider block">Expiry Month/Yr</label>
                          <input
                            type="text"
                            placeholder="12/29"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-amber-500/35"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-400 font-mono tracking-wider block">CVV Code</label>
                          <input
                            type="password"
                            maxLength={3}
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-amber-500/35"
                          />
                        </div>

                        <div className="col-span-2 space-y-1">
                          <label className="text-[9px] text-slate-400 font-mono tracking-wider block font-bold">Secure Cardowner Name</label>
                          <input
                            type="text"
                            placeholder={user.name}
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-amber-500/35"
                          />
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB: INDIAN NET BANKING ACCESS */}
                  {selectedPayMethod === 'netbanking' && (
                    <div className="space-y-4 animate-fade-in bg-slate-950/40 border border-white/5 p-4 rounded-2xl text-left">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">
                          Select Banking Institution
                        </label>
                        <select
                          value={netbankSelected}
                          onChange={(e) => setNetbankSelected(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-amber-500/35 cursor-pointer"
                        >
                          <option>State Bank of India (SBI)</option>
                          <option>HDFC Industrial Bank</option>
                          <option>ICICI Commercial Bank</option>
                          <option>Axis National Bank</option>
                          <option>Kotak Mahindra Bank</option>
                          <option>Canara Standard Institution</option>
                        </select>
                      </div>

                      <p className="text-[10.5px] text-slate-400 font-light leading-relaxed">
                        Once you select "Process Payment Gateway", you will be safely directed to the institution secure bank login portal to authorize the standard secure parameter transaction.
                      </p>
                    </div>
                  )}

                  {/* Dynamic primary check action trigger */}
                  <div className="payment-action-panel border-t border-white/5 pt-4 flex items-center justify-between gap-4">
                    <div className="text-left">
                      <span className="text-[8px] text-slate-500 block font-mono">FINALISED AMOUNT DUES</span>
                      <span className="text-slate-100 font-display font-black text-lg font-mono">
                        ₹{payAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={isProcessingPayment || payAmount <= 0}
                      onClick={() => {
                        setIsProcessingPayment(true);
                        setTimeout(() => {
                          const txnId = 'TXN-' + Math.floor(Math.random() * 900000 + 100000);
                          const newTx = {
                            id: txnId,
                            date: new Date().toISOString().split('T')[0],
                            amount: payAmount,
                            description: `Tuition Installment Secured (${matchedCourse.title})`,
                            status: 'SUCCESS',
                            method: selectedPayMethod === 'upi' ? 'UPI (Address/QR)' : (selectedPayMethod === 'card' ? 'Secure Credit Card' : `NetBanking (${netbankSelected})`)
                          };
                          const updated = [...paymentHistory, newTx];
                          setPaymentHistory(updated);
                          setLastGeneratedReceipt(newTx);
                          setIsProcessingPayment(false);
                          setPaymentSuccessFeedback(true);
                        }, 2200);
                      }}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 px-6 rounded-xl text-xs uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <>
                          <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                          <span>Routing Tuition securely...</span>
                        </>
                      ) : (
                        <>
                          <span>Process Safe Transfer Fee</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                </div>
              ) : (
                /* SUCCESS SCREEN ON TRANSACTION SUCCESS */
                <div className="py-8 text-center space-y-6 animate-fade-in text-emerald-400">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <Check className="w-8 h-8 text-emerald-400 stroke-[3]" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-xl text-white uppercase tracking-tight">
                      Tuition Fee Secured!
                    </h4>
                    <p className="text-xs text-slate-400 font-light max-w-sm mx-auto leading-relaxed">
                      Your educational payment of <strong className="text-white">₹{payAmount.toLocaleString('en-IN')}</strong> has been settled successfully on Balu Naik Academy databases. Your account has updated in real-time.
                    </p>
                  </div>

                  <div className="bg-[#0a0f19] border border-white/5 p-4 rounded-xl max-w-sm mx-auto text-[11px] font-mono text-slate-300 text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">TRANSACTION ID:</span>
                      <span className="text-white font-bold">{lastGeneratedReceipt?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">TIMESTAMP LOG:</span>
                      <span className="text-white font-bold">{new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ACCOUNT ACCREDIT:</span>
                      <span className="text-amber-500 font-bold">{user.name}</span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentSuccessFeedback(false);
                        setIsPayModalOpen(false);
                        setShowReceiptModal(true);
                      }}
                      className="bg-[#12223a] border border-primary-500/30 text-primary-400 hover:text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase cursor-pointer"
                    >
                      View Generated Receipt Invoice
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentSuccessFeedback(false);
                        setIsPayModalOpen(false);
                      }}
                      className="bg-white/5 hover:bg-white/10 text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase cursor-pointer"
                    >
                      Return to Workspace
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL WINDOW FOR TRUSTED CERTIFIED PRINTABLE RECEIPT INVOICE */}
      <AnimatePresence>
        {showReceiptModal && lastGeneratedReceipt && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div 
              className="absolute inset-0 z-10" 
              onClick={() => setShowReceiptModal(false)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border text-slate-900 border-zinc-200 max-w-2xl w-full p-6 sm:p-10 rounded-2xl relative z-20 space-y-6 text-left shadow-2xl selection:bg-amber-300 font-sans"
            >
              
              {/* Header block resembles physical voucher letterhead */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-zinc-900 pb-5">
                <div className="space-y-1">
                  <span className="text-[10px] text-amber-500 uppercase tracking-widest block font-bold font-mono">
                    BALU NAIK PLATFORMS INFRASTRUCTURE
                  </span>
                  <h3 className="font-serif font-black text-2xl text-slate-900 uppercase leading-none">
                    Balu Naik Academy
                  </h3>
                  <p className="text-[10px] text-zinc-500">
                    2nd Floor, Balu Naik Towers, Gachibowli High Road, Close to Capgemini, Hyderabad, Telangana - 500032
                  </p>
                  <p className="text-[9px] text-zinc-400 font-mono">
                    Email: admin@balunaikacademy.com | Phone: +91 9876543210
                  </p>
                </div>

                <div className="text-right sm:text-right shrink-0">
                  <span className="bg-zinc-100 text-zinc-900 font-mono tracking-widest text-xs font-bold px-3 py-1 rounded inline-block uppercase">
                    FEE VOUCHER RECEIPT
                  </span>
                  <div className="text-[10px] text-zinc-500 font-mono mt-2 space-y-0.5">
                    <div>Receipt Serial: <strong>{lastGeneratedReceipt.id}</strong></div>
                    <div>Voucher Date: <strong>{lastGeneratedReceipt.date}</strong></div>
                  </div>
                </div>
              </div>

              {/* Invoice body information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-zinc-700">
                <div className="space-y-1 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                  <span className="text-[8px] text-zinc-400 uppercase font-bold font-mono block">TRAINEE DEPOSITOR PROFILE</span>
                  <h4 className="font-bold text-slate-900 text-sm capitalize">{user.name}</h4>
                  <div className="font-mono text-[10px] text-zinc-500">{user.email}</div>
                  <div className="text-zinc-600 font-mono text-[10px] mt-1">Status: Registered Student (Active)</div>
                </div>

                <div className="space-y-1 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                  <span className="text-[8px] text-zinc-400 uppercase font-bold font-mono block">ENROLLED CAREER STREAM</span>
                  <h4 className="font-bold text-slate-900 text-sm">{matchedCourse.title}</h4>
                  <div className="text-zinc-500 font-mono text-[10px]">Track Duration: {matchedCourse.duration}</div>
                  <div className="text-amber-600 font-mono font-bold text-[9px] mt-1 uppercase tracking-wide">Accredited Placement Option Program</div>
                </div>
              </div>

              {/* Fee accounting table ledger */}
              <div className="border border-zinc-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-zinc-100 font-mono text-[9px] uppercase border-b border-zinc-200 text-zinc-600">
                    <tr>
                      <th className="p-3">Fee Specification Particulars</th>
                      <th className="p-3">Category</th>
                      <th className="p-3 text-right">Unit Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-800">
                    <tr>
                      <td className="p-3">
                        <strong className="text-slate-900 block font-sans">{lastGeneratedReceipt.description}</strong>
                        <span className="text-[9.5px] text-zinc-400 block font-mono">Simulated Secure SSL Payments Account Ledger Gateway</span>
                      </td>
                      <td className="p-3 font-mono text-zinc-500">
                        Monthly Installment
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">
                        ₹{lastGeneratedReceipt.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-zinc-50 font-bold border-t border-zinc-200 text-zinc-900">
                      <td colSpan={2} className="p-3 text-right font-mono text-[10px] uppercase">
                        Total Amount Received with Thanks
                      </td>
                      <td className="p-3 text-right font-mono font-black text-slate-900 text-sm">
                        ₹{lastGeneratedReceipt.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Status and Signature stamp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 items-end">
                <div className="space-y-1.5 text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                    <span className="font-bold font-mono tracking-wide text-[10px] uppercase">FUNDS RECONCILED APPROVED</span>
                  </div>
                  <p className="text-[9px] font-sans leading-tight">
                    This document is a certified digital receipt. Computer verified ledger listings do not require manual ink signatures to be validated.
                  </p>
                </div>

                <div className="text-center sm:text-right space-y-1.5">
                  <div className="inline-block border-b border-zinc-400 pb-1 w-44 font-serif text-slate-900 font-bold text-sm italic">
                    Balu Naik Banavath
                  </div>
                  <span className="block text-[8px] text-zinc-500 uppercase tracking-widest font-mono font-bold">
                    Official College Bursar Seal
                  </span>
                </div>
              </div>

              <div className="h-px bg-zinc-200 my-4" />

              {/* Utility operations buttons */}
              <div className="flex justify-between items-center flex-wrap gap-2 pt-1.5 text-xs">
                <span className="text-zinc-400 font-mono text-[9px] uppercase">
                  Verify receipt hash: {Math.random().toString(36).substring(3, 10).toUpperCase()}
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="bg-zinc-910 bg-zinc-905 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl cursor-pointer text-xs"
                  >
                    🖨 Print Invoice Slip
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowReceiptModal(false)}
                    className="border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold py-2 px-4 rounded-xl cursor-pointer text-xs"
                  >
                    Close Invoice View
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
