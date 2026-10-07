import mentor1 from "@/assets/images/partner/partner_portrait_1_1776809370508.png";
import mentor2 from "@/assets/images/partner/partner_portrait_2_1776809385260.png";
import mentor3 from "@/assets/images/partner/partner_portrait_3_1776809410609.png";
import mentor4 from "@/assets/images/partner/partner_portrait_4_1776809422588.png";

export const DEFAULT_PATHWAYS = [
  {
    id: "business-analysis",
    slug: "business-analysis",
    title: "Business Analysis",
    pathwayTitle: "Business Analysis Pathway",
    type: "live", // "live" | "on-demand"
    badge: "LIVE COHORT",
    category: "Analysis & Strategy",
    description:
      "Requirements gathering, stakeholder mapping, process modelling and SQL fundamentals.",
    headline:
      "Learn to build messy business situations into clear requirements, working processes and decisions stakeholders trust — the core skillset behind every Business Analyst role.",
    modulesCount: 6,
    duration: "8 weeks",
    level: "Beginner-friendly",
    startsDate: "1 Sep 2026",
    seatsLeft: 14,
    isUnlimited: false,
    stats: {
      openRoles: "312",
      medianSalary: "£48k",
      quarterDemand: "114%",
      coreModules: 6,
    },
    modules: [
      {
        number: 1,
        title: "Intro to Business Analysis",
        description:
          "What the role actually involves day to day, and how to think like a BA.",
      },
      {
        number: 2,
        title: "Stakeholder Management & Requirements Gathering",
        description:
          "Turning discovery conversations and turning them into clear requirements.",
      },
      {
        number: 3,
        title: "Process Modelling & Mapping",
        description:
          "Documenting how a process actually works — and how it breaks.",
      },
      {
        number: 4,
        title: "SQL Fundamentals for Analysis",
        description:
          "Querying data confidently enough to answer your own questions.",
      },
      {
        number: 5,
        title: "Data Visualisation with Power BI",
        description:
          "Turning numbers into a dashboard stakeholders actually understand.",
      },
      {
        number: 6,
        title: "Agile & Scrum for Business Analysts",
        description:
          "Working inside a delivery team, not just handing off requirements.",
      },
    ],
    skills: [
      "Requirements gathering",
      "Stakeholder management",
      "Process mapping",
      "SQL",
      "Power BI",
      "User stories",
      "Agile delivery",
      "Business case writing",
    ],
    whoIsThisFor: [
      {
        title: "Complete beginner",
        description: "New to tech and all tech roles",
      },
      {
        title: "Some exposure",
        description: "Touched on it in a past role",
      },
      {
        title: "Career switcher",
        description: "Experienced elsewhere",
      },
      {
        title: "Ready to specialise",
        description: "Already in an adjacent role",
      },
    ],
    paceOptions: [
      {
        badge: "LOWER WEEKLY COMMITMENT",
        badgeType: "neutral",
        title: "6-Month Weekend Track",
        schedule: "Weekends, 4 hrs/session",
        weeklyCommitment: "8-10 hrs/week",
        totalHours: "~100 hours",
        isPopular: false,
      },
      {
        badge: "FASTEST COMPLETION",
        badgeType: "highlight",
        title: "4-Month Evening Track",
        schedule: "Mon–Thu, 7:00–9:00 pm",
        weeklyCommitment: "8-10 hrs/week",
        totalHours: "~100 hours",
        isPopular: true,
      },
    ],
    mentors: [
      {
        id: "james-anderson",
        name: "James Anderson",
        initials: "JA",
        image: mentor1,
        isAvailable: true,
        services: "CV Review | Interview Preparation...",
        roles: "Business Analyst Role | Scrum Master",
        sessionsCount: "120 sessions (12 reviews)",
      },
      {
        id: "mary-smith",
        name: "Mary Smith",
        initials: "MS",
        image: mentor2,
        isAvailable: true,
        services: "CV Review | Interview Preparation...",
        roles: "Business Analyst Role | Scrum Master",
        sessionsCount: "135 sessions (12 reviews)",
      },
      {
        id: "akingbade-lawal",
        name: "Akingbade Lawal",
        initials: "AL",
        image: mentor3,
        isAvailable: true,
        services: "CV Review | Interview Preparation...",
        roles: "Business Analyst Role | Scrum Master",
        sessionsCount: "155 sessions (18 reviews)",
      },
    ],
    successStories: [
      {
        id: "story-1",
        quote:
          "I got a Business Analyst role after joining Avenue Impact.",
        author: "Tolulope A.",
        role: "Business Analyst",
        rating: 5,
      },
      {
        id: "story-2",
        quote: "I doubled my salary in six months.",
        author: "Chinedu O.",
        role: "Project Manager",
        rating: 5,
      },
      {
        id: "story-3",
        quote:
          "The mock interviews gave me the confidence I needed.",
        author: "Blessing M.",
        role: "Product Owner",
        rating: 5,
      },
    ],
    faqs: [
      {
        question: "Do I need a related degree to start?",
        answer:
          "No — the Beginner Track assumes no prior BA experience. Module 1 is built for exactly that starting point.",
      },
      {
        question: "What happens after I finish the pathway?",
        answer:
          "You move into PrepnHire for 1:1 mentoring, client project CV experience, and live mock interview preparation.",
      },
      {
        question: "Can I switch tracks after starting?",
        answer:
          "Yes, learners can switch between weekend and weekday cohorts within the first two weeks of class orientation.",
      },
      {
        question: "Is there a certificate at the end?",
        answer:
          "Yes, you receive an industry-recognized CPD accredited certificate of completion alongside verified portfolio projects.",
      },
    ],
  },
  {
    id: "project-management",
    slug: "project-management",
    title: "Project Management",
    pathwayTitle: "Project Management Pathway",
    type: "live",
    badge: "LIVE COHORT",
    category: "Management & Agile",
    description:
      "Agile delivery, stakeholder communication, planning and risk management.",
    headline:
      "Master modern Scrum, sprint planning, risk mitigation, and executive reporting to drive multi-functional tech teams from concept to launch.",
    modulesCount: 7,
    duration: "9 weeks",
    level: "Some experience helpful",
    startsDate: "8 Sep 2026",
    seatsLeft: 9,
    isUnlimited: false,
    stats: {
      openRoles: "420",
      medianSalary: "£52k",
      quarterDemand: "128%",
      coreModules: 7,
    },
    modules: [
      {
        number: 1,
        title: "Foundations of Agile & Waterfall",
        description:
          "Understanding lifecycle frameworks and picking the right delivery model.",
      },
      {
        number: 2,
        title: "Sprint Planning & Backlog Grooming",
        description: "Prioritizing deliverables and managing velocity with Jira.",
      },
      {
        number: 3,
        title: "Risk, RAID Logs & Budgeting",
        description:
          "Identifying delivery bottlenecks and building dependable timelines.",
      },
      {
        number: 4,
        title: "Stakeholder Management & Communications",
        description:
          "Executive status reporting, steering committee governance, and negotiation.",
      },
      {
        number: 5,
        title: "Release Management & Quality Assurance",
        description:
          "Bridging software development and deployment without delivery delays.",
      },
      {
        number: 6,
        title: "Agile Leadership & Team Retrospectives",
        description:
          "Coaching autonomous development squads and driving continuous improvement.",
      },
      {
        number: 7,
        title: "Capstone Client Project",
        description:
          "Executing an end-to-end simulated delivery project from charter to sign-off.",
      },
    ],
    skills: [
      "Agile & Scrum",
      "Jira & Confluence",
      "RAID Logs",
      "Budget management",
      "Sprint planning",
      "Executive reporting",
      "Risk assessment",
      "Kanban",
    ],
    whoIsThisFor: [
      { title: "Complete beginner", description: "Aspiring to enter project leadership" },
      { title: "Some exposure", description: "Team leads stepping into PM roles" },
      { title: "Career switcher", description: "Operations, finance or admin professionals" },
      { title: "Ready to specialise", description: "Coordinators seeking senior PM roles" },
    ],
    paceOptions: [
      {
        badge: "LOWER WEEKLY COMMITMENT",
        badgeType: "neutral",
        title: "6-Month Weekend Track",
        schedule: "Weekends, 4 hrs/session",
        weeklyCommitment: "8-10 hrs/week",
        totalHours: "~100 hours",
        isPopular: false,
      },
      {
        badge: "FASTEST COMPLETION",
        badgeType: "highlight",
        title: "4-Month Evening Track",
        schedule: "Mon–Thu, 7:00–9:00 pm",
        weeklyCommitment: "8-10 hrs/week",
        totalHours: "~100 hours",
        isPopular: true,
      },
    ],
    mentors: [
      {
        id: "chinedu-pm",
        name: "Chinedu Okafor",
        initials: "CO",
        image: mentor4,
        isAvailable: true,
        services: "Jira Review | Interview Coaching",
        roles: "Senior Technical Project Manager",
        sessionsCount: "98 sessions (15 reviews)",
      },
      {
        id: "mary-pm",
        name: "Mary Smith",
        initials: "MS",
        image: mentor2,
        isAvailable: true,
        services: "Agile Leadership | Scrum Coaching",
        roles: "Lead Agile Delivery Manager",
        sessionsCount: "135 sessions (12 reviews)",
      },
      {
        id: "james-pm",
        name: "James Anderson",
        initials: "JA",
        image: mentor1,
        isAvailable: true,
        services: "PMO Governance | Delivery Roadmaps",
        roles: "Programme Director",
        sessionsCount: "140 sessions (19 reviews)",
      },
    ],
    successStories: [
      {
        id: "pm-story-1",
        quote: "Transitioned from hospitality into a tech PM role within 4 months.",
        author: "Samuel K.",
        role: "Associate Project Manager",
        rating: 5,
      },
      {
        id: "pm-story-2",
        quote: "The hands-on Jira delivery simulation gave me real interview examples.",
        author: "Aisha T.",
        role: "Scrum Master",
        rating: 5,
      },
      {
        id: "pm-story-3",
        quote: "Clear instruction, outstanding mentor sessions, and top-tier support.",
        author: "David O.",
        role: "Project Manager",
        rating: 5,
      },
    ],
    faqs: [
      {
        question: "Do I need technical coding skills to succeed in PM?",
        answer:
          "Not at all. Tech project management focuses on team facilitation, backlog clarity, and stakeholder alignment rather than code writing.",
      },
      {
        question: "Is this aligned with Scrum and Agile certifications?",
        answer:
          "Yes, the curriculum covers key frameworks tested in PSM I, CSM, and CAPM industry certifications.",
      },
      {
        question: "Are live cohorts recorded if I miss a session?",
        answer:
          "Yes, all live sessions are recorded and made available in your dashboard within 24 hours.",
      },
    ],
  },
  {
    id: "ux-product-design",
    slug: "ux-product-design",
    title: "UX & Product Design",
    pathwayTitle: "UX & Product Design Pathway",
    type: "live",
    badge: "LIVE COHORT",
    category: "Design",
    description:
      "User research, wireframing, prototyping and portfolio-building.",
    headline:
      "Learn user-centred design from scratch. Conduct user testing, design in Figma, and produce an employer-ready design case study.",
    modulesCount: 6,
    duration: "8 weeks",
    level: "Beginner-friendly",
    startsDate: "15 Sep 2026",
    seatsLeft: 22,
    isUnlimited: false,
    stats: {
      openRoles: "285",
      medianSalary: "£46k",
      quarterDemand: "118%",
      coreModules: 6,
    },
    modules: [
      { number: 1, title: "Foundations of UX & Design Thinking", description: "Empathy mapping, user personas, and problem statements." },
      { number: 2, title: "User Research & Usability Testing", description: "Moderated user testing, surveys, and synthesizing insights." },
      { number: 3, title: "Information Architecture & Wireframing", description: "User flows, site hierarchy, and low-fidelity prototypes." },
      { number: 4, title: "UI Design Systems with Figma", description: "Typography, color tokens, autolayout, and reusable component libraries." },
      { number: 5, title: "High-Fidelity Interactive Prototyping", description: "Transitions, micro-interactions, and developer handoff specs." },
      { number: 6, title: "Portfolio Presentation & Case Studies", description: "Crafting a standout design portfolio that lands product team interviews." },
    ],
    skills: ["Figma", "User research", "Prototyping", "Design systems", "Wireframing", "Usability testing", "Interaction design"],
    whoIsThisFor: [
      { title: "Complete beginner", description: "No prior visual design background needed" },
      { title: "Some exposure", description: "Graphic designers transitioning to digital product" },
      { title: "Career switcher", description: "Marketers, architects, and creative professionals" },
      { title: "Ready to specialise", description: "Frontend devs wanting deep UX research mastery" },
    ],
    paceOptions: [
      { badge: "LOWER WEEKLY COMMITMENT", badgeType: "neutral", title: "6-Month Weekend Track", schedule: "Weekends, 4 hrs/session", weeklyCommitment: "8-10 hrs/week", totalHours: "~100 hours", isPopular: false },
      { badge: "FASTEST COMPLETION", badgeType: "highlight", title: "4-Month Evening Track", schedule: "Mon–Thu, 7:00–9:00 pm", weeklyCommitment: "8-10 hrs/week", totalHours: "~100 hours", isPopular: true },
    ],
    mentors: [
      { id: "sarah-ux", name: "Sarah Jenkins", initials: "SJ", image: mentor2, isAvailable: true, services: "Portfolio Review | Design Critique", roles: "Lead Product Designer at Fintech", sessionsCount: "110 sessions (24 reviews)" },
      { id: "akingbade-ux", name: "Akingbade Lawal", initials: "AL", image: mentor3, isAvailable: true, services: "Figma Coaching | Design Systems", roles: "Senior UX Architect", sessionsCount: "155 sessions (18 reviews)" },
    ],
    successStories: [
      { id: "ux-story-1", quote: "Built 2 full case studies and landed my first junior product design job!", author: "Kemi L.", role: "Junior UX Designer", rating: 5 },
    ],
    faqs: [
      { question: "Do I need to know how to code?", answer: "No, this pathway focuses strictly on user experience, Figma UI design, and testing — zero coding required." },
    ],
  },
  {
    id: "data-analytics",
    slug: "data-analytics",
    title: "Data Analytics",
    pathwayTitle: "Data Analytics Pathway",
    type: "on-demand",
    badge: "ON-DEMAND",
    category: "Data & BI",
    description:
      "SQL, Power BI, and data storytelling — self-paced, start anytime.",
    headline:
      "Transform messy spreadsheets into automated pipelines and actionable decision dashboards using SQL, Power BI, and Python.",
    modulesCount: 5,
    duration: "Self-paced",
    level: "Beginner-friendly",
    startsDate: "Starts anytime",
    seatsLeft: null,
    isUnlimited: true,
    stats: {
      openRoles: "510",
      medianSalary: "£45k",
      quarterDemand: "135%",
      coreModules: 5,
    },
    modules: [
      { number: 1, title: "Data Wrangling & Advanced Excel", description: "Pivot tables, lookups, and structuring raw datasets." },
      { number: 2, title: "SQL for Relational Databases", description: "Joins, aggregations, window functions, and CTEs." },
      { number: 3, title: "Business Intelligence with Power BI", description: "DAX formulas, relational modelling, and executive dashboards." },
      { number: 4, title: "Python for Data Analysis", description: "Pandas, NumPy, and exploratory data analysis (EDA)." },
      { number: 5, title: "Executive Data Storytelling & Portfolio", description: "Communicating key insights to non-technical business leaders." },
    ],
    skills: ["SQL", "Power BI", "Excel", "Data modeling", "DAX", "Python basics", "Business Intelligence"],
    whoIsThisFor: [
      { title: "Complete beginner", description: "Anyone comfortable working with basic tables" },
      { title: "Some exposure", description: "Excel users wanting SQL & Power BI automation" },
      { title: "Career switcher", description: "Finance, administration and operations" },
      { title: "Ready to specialise", description: "Analysts preparing for senior BI roles" },
    ],
    paceOptions: [
      { badge: "SELF-PACED", badgeType: "highlight", title: "On-Demand Lifetime Access", schedule: "Flexible, learn at your own pace", weeklyCommitment: "4-8 hrs/week", totalHours: "~80 hours", isPopular: true },
    ],
    mentors: [
      { id: "james-data", name: "James Anderson", initials: "JA", image: mentor1, isAvailable: true, services: "SQL Problem Solving | DAX Review", roles: "Lead BI Analyst", sessionsCount: "120 sessions (12 reviews)" },
    ],
    successStories: [
      { id: "data-story-1", quote: "Automated our entire department reporting with SQL and landed a 30% raise.", author: "Tariq M.", role: "Data Analyst", rating: 5 },
    ],
    faqs: [
      { question: "How long do I have access to on-demand content?", answer: "You get unlimited lifetime access to all video modules and downloadable datasets." },
    ],
  },
  {
    id: "cloud-computing",
    slug: "cloud-computing",
    title: "Cloud Computing",
    pathwayTitle: "Cloud Computing Pathway",
    type: "live",
    badge: "LIVE COHORT",
    category: "Cloud & Infrastructure",
    description:
      "AWS & Azure architectures, CloudFormation, Terraform, Docker, and CI/CD deployment pipelines.",
    headline:
      "Master cloud architecture, infrastructure as code, containerisation, and DevOps automation to build resilient cloud platforms.",
    modulesCount: 6,
    duration: "8 weeks",
    level: "Beginner-friendly",
    startsDate: "15 Sep 2026",
    seatsLeft: 12,
    isUnlimited: false,
    stats: {
      openRoles: "450+",
      medianSalary: "£55k",
      quarterDemand: "135%",
      coreModules: 6,
    },
    modules: [
      { number: 1, title: "Cloud Fundamentals & AWS/Azure Architecture", description: "IAM, VPCs, compute instances, storage, and networking basics." },
      { number: 2, title: "Infrastructure as Code (Terraform & CloudFormation)", description: "Automating cloud infrastructure provisioning reproducibly." },
      { number: 3, title: "Containerisation with Docker & Kubernetes", description: "Packaging applications into containers and orchestrating clusters." },
      { number: 4, title: "CI/CD & DevOps Automation", description: "Building robust automated deployment pipelines with GitHub Actions." },
      { number: 5, title: "Cloud Security, IAM & Compliance", description: "Implementing least-privilege security and governance standards." },
      { number: 6, title: "Production Capstone & Cloud Deployment", description: "Deploying a scalable microservice infrastructure on live cloud." },
    ],
    skills: [
      "AWS",
      "Azure",
      "Terraform",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Cloud Security",
      "Linux Administration",
    ],
    whoIsThisFor: [
      { title: "IT & Admin pros", description: "Transitioning from traditional IT to Cloud/DevOps" },
      { title: "Developers", description: "Wanting to master cloud deployments & infra" },
      { title: "Complete beginner", description: "Motivated to break into cloud engineering" },
    ],
    paceOptions: [
      {
        badge: "FASTEST COMPLETION",
        badgeType: "highlight",
        title: "4-Month Evening Track",
        schedule: "Mon–Thu, 7:00–9:00 pm",
        weeklyCommitment: "8-10 hrs/week",
        totalHours: "~100 hours",
        isPopular: true,
      },
    ],
    mentors: [
      {
        id: "cloud-mentor-1",
        name: "David Alabi",
        initials: "DA",
        image: mentor1,
        isAvailable: true,
        services: "Cloud Arch Review | Terraform Coaching",
        roles: "Senior Cloud Engineer at Enterprise",
        sessionsCount: "95 sessions (14 reviews)",
      },
    ],
    successStories: [
      {
        id: "cloud-story-1",
        quote: "Landed my AWS Solutions Architect Associate role within 4 weeks of completing the cloud capstone!",
        author: "Samuel O.",
        role: "Cloud Solutions Architect",
        rating: 5,
      },
    ],
    faqs: [
      {
        question: "Do I need prior Linux or coding experience?",
        answer: "No prior experience required — module 1 builds Linux and cloud CLI fundamentals from scratch.",
      },
      {
        question: "Are cloud lab environments provided?",
        answer: "Yes, you will work directly inside real AWS and Azure sandboxed accounts.",
      },
    ],
  },
  {
    id: "digital-transformation-consulting",
    slug: "digital-transformation-consulting",
    title: "Digital Transformation Consulting",
    pathwayTitle: "Digital Transformation Consulting Pathway",
    type: "live",
    badge: "LIVE COHORT",
    category: "Consulting & Strategy",
    description:
      "Change management, systems thinking and enterprise delivery frameworks.",
    headline:
      "Advise enterprise organisations on migrating legacy operations into scalable cloud platforms, digital workflows, and resilient operating models.",
    modulesCount: 8,
    duration: "10 weeks",
    level: "Experienced",
    startsDate: "22 Sep 2026",
    seatsLeft: 18,
    isUnlimited: false,
    stats: {
      openRoles: "190",
      medianSalary: "£65k",
      quarterDemand: "122%",
      coreModules: 8,
    },
    modules: [
      { number: 1, title: "Enterprise Architecture & Digital Strategy", description: "Assessing legacy tech stacks and designing transformation blueprints." },
      { number: 2, title: "Change Management Frameworks", description: "Prosci ADKAR model, stakeholder buy-in, and mitigating resistance." },
      { number: 3, title: "Cloud & SaaS Modernisation", description: "Evaluating cloud providers, integration readiness, and vendor selection." },
      { number: 4, title: "Business Process Re-engineering", description: "Lean Six Sigma principles and eliminating operational waste." },
      { number: 5, title: "Operating Model Redesign", description: "Cross-functional squad structures and digital governance." },
      { number: 6, title: "Data Governance & Compliance", description: "GDPR, security, and establishing trustworthy enterprise data pipelines." },
      { number: 7, title: "Client Pitching & Advisory Proposals", description: "Writing winning RFP responses and executive board presentations." },
      { number: 8, title: "Live Advisory Capstone", description: "Delivering a simulated enterprise digital roadmap to a client panel." },
    ],
    skills: ["Enterprise architecture", "Change management", "Cloud strategy", "Business process re-engineering", "Stakeholder advisory", "Proposal writing"],
    whoIsThisFor: [
      { title: "Experienced", description: "Consultants, managers and tech leads stepping up" },
      { title: "Career switcher", description: "Experienced professionals from traditional industries" },
    ],
    paceOptions: [
      { badge: "EXECUTIVE TRACK", badgeType: "highlight", title: "4-Month Evening Track", schedule: "Tue & Thu, 7:00–9:30 pm", weeklyCommitment: "6-8 hrs/week", totalHours: "~90 hours", isPopular: true },
    ],
    mentors: [
      { id: "akingbade-dt", name: "Akingbade Lawal", initials: "AL", image: mentor3, isAvailable: true, services: "Enterprise Strategy | Case Prep", roles: "Partner at Digital Advisory", sessionsCount: "155 sessions (18 reviews)" },
    ],
    successStories: [
      { id: "dt-story-1", quote: "Secured a senior transformation consultant role at Big 4 firm.", author: "Marcus V.", role: "Senior Consultant", rating: 5 },
    ],
    faqs: [
      { question: "Is prior management experience required?", answer: "Some professional work experience is recommended as this pathway addresses high-level organizational decision making." },
    ],
  },
  {
    id: "product-management",
    slug: "product-management",
    title: "Product Management",
    pathwayTitle: "Product Management Pathway",
    type: "on-demand",
    badge: "ON-DEMAND",
    category: "Management & Agile",
    description:
      "Roadmapping, prioritisation, stakeholder alignment and product strategy.",
    headline:
      "Learn how modern tech companies discover customer problems, prioritize features, and collaborate across engineering, marketing, and design.",
    modulesCount: 6,
    duration: "Self-paced",
    level: "Some experience helpful",
    startsDate: "Starts anytime",
    seatsLeft: null,
    isUnlimited: true,
    stats: {
      openRoles: "380",
      medianSalary: "£58k",
      quarterDemand: "125%",
      coreModules: 6,
    },
    modules: [
      { number: 1, title: "Product Discovery & Market Validation", description: "Customer interviews, opportunity solution trees, and finding product-market fit." },
      { number: 2, title: "Product Strategy & OKRs", description: "Defining value propositions and aligning metrics to business goals." },
      { number: 3, title: "Feature Prioritisation Frameworks", description: "RICE, Kano, and Value vs Effort scoring methods." },
      { number: 4, title: "Roadmapping & Release Planning", description: "Building outcome-driven roadmaps without overpromising features." },
      { number: 5, title: "Product Analytics & Growth Metrics", description: "A/B testing, North Star metrics, activation, and retention cohorts." },
      { number: 6, title: "Product Launch & Go-To-Market (GTM)", description: "Coordinating sales, marketing, support, and engineering launch plans." },
    ],
    skills: ["Product strategy", "Roadmapping", "RICE prioritisation", "Product discovery", "User story writing", "Mixpanel / Amplitude", "OKRs"],
    whoIsThisFor: [
      { title: "Some exposure", description: "Engineers, designers, or marketers moving to PM" },
      { title: "Career switcher", description: "Business analysts or operations specialists" },
    ],
    paceOptions: [
      { badge: "SELF-PACED", badgeType: "highlight", title: "On-Demand Lifetime Access", schedule: "Flexible, self-directed", weeklyCommitment: "5-8 hrs/week", totalHours: "~85 hours", isPopular: true },
    ],
    mentors: [
      { id: "mary-prod", name: "Mary Smith", initials: "MS", image: mentor2, isAvailable: true, services: "PRD Review | PM Interview Prep", roles: "Director of Product", sessionsCount: "135 sessions (12 reviews)" },
    ],
    successStories: [
      { id: "prod-story-1", quote: "Got my first Product Owner role within 3 months of finishing the modules.", author: "Emeka N.", role: "Product Owner", rating: 5 },
    ],
    faqs: [
      { question: "Will I build a portfolio of PRDs and product specs?", answer: "Yes, you will complete two comprehensive Product Requirement Documents (PRDs) evaluated by senior product leaders." },
    ],
  },
  {
    id: "cybersecurity-fundamentals",
    slug: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    pathwayTitle: "Cybersecurity Fundamentals Pathway",
    type: "live",
    badge: "LIVE COHORT",
    category: "Security & Cloud",
    description:
      "Risk assessment, security frameworks and incident response basics.",
    headline:
      "Defend digital infrastructure against real-world vulnerabilities. Learn SIEM, network defense, threat intelligence, and compliance frameworks.",
    modulesCount: 7,
    duration: "9 weeks",
    level: "Beginner-friendly",
    startsDate: "29 Sep 2026",
    seatsLeft: 31,
    isUnlimited: false,
    stats: {
      openRoles: "440",
      medianSalary: "£50k",
      quarterDemand: "142%",
      coreModules: 7,
    },
    modules: [
      { number: 1, title: "Information Security Principles", description: "The CIA triad, threat vectors, and modern attack surfaces." },
      { number: 2, title: "Network Defense & Traffic Analysis", description: "Wireshark, firewalls, IDS/IPS, and packet inspection." },
      { number: 3, title: "Vulnerability Scanning & Hardening", description: "OWASP Top 10, Nessus scanning, and OS baseline security." },
      { number: 4, title: "SIEM & Security Operations (SOC)", description: "Log ingestion, alert triage, and Splunk/ELK investigation." },
      { number: 5, title: "Incident Response & Forensics", description: "Containment protocols, digital evidence handling, and root-cause analysis." },
      { number: 6, title: "Governance, Risk & Compliance (GRC)", description: "ISO 27001, NIST CSF, and cybersecurity audit preparation." },
      { number: 7, title: "Live SOC Simulation Capstone", description: "Responding to a simulated ransomware incident in real-time." },
    ],
    skills: ["SIEM", "Splunk", "Incident response", "Wireshark", "Network security", "NIST CSF", "ISO 27001", "Vulnerability management"],
    whoIsThisFor: [
      { title: "Complete beginner", description: "IT support looking to break into security" },
      { title: "Career switcher", description: "System admins and analysts moving to SOC" },
    ],
    paceOptions: [
      { badge: "LOWER WEEKLY COMMITMENT", badgeType: "neutral", title: "6-Month Weekend Track", schedule: "Weekends, 4 hrs/session", weeklyCommitment: "8-10 hrs/week", totalHours: "~100 hours", isPopular: false },
      { badge: "FASTEST COMPLETION", badgeType: "highlight", title: "4-Month Evening Track", schedule: "Mon–Thu, 7:00–9:00 pm", weeklyCommitment: "8-10 hrs/week", totalHours: "~100 hours", isPopular: true },
    ],
    mentors: [
      { id: "sec-mentor", name: "David Alabi", initials: "DA", image: mentor1, isAvailable: true, services: "SOC Interview Prep | Lab Guidance", roles: "Lead Security Operations Engineer", sessionsCount: "85 sessions (10 reviews)" },
    ],
    successStories: [
      { id: "sec-story-1", quote: "Secured a SOC Tier 1 Analyst job right after the capstone!", author: "Femi A.", role: "Cybersecurity Analyst", rating: 5 },
    ],
    faqs: [
      { question: "Does this prepare for CompTIA Security+?", answer: "Yes, all core domain objectives of Security+ (SY0-701) are comprehensively covered." },
    ],
  },
  {
    id: "financial-analysis",
    slug: "financial-analysis",
    title: "Financial Analysis",
    pathwayTitle: "Financial Analysis Pathway",
    type: "on-demand",
    badge: "ON-DEMAND",
    category: "Finance & Data",
    description:
      "Financial modelling, forecasting and reporting for business decisions.",
    headline:
      "Master DCF valuation, 3-statement financial models, and executive variance reporting for FP&A and corporate finance positions.",
    modulesCount: 5,
    duration: "Self-paced",
    level: "Some experience helpful",
    startsDate: "Starts anytime",
    seatsLeft: null,
    isUnlimited: true,
    stats: {
      openRoles: "260",
      medianSalary: "£49k",
      quarterDemand: "110%",
      coreModules: 5,
    },
    modules: [
      { number: 1, title: "Advanced Financial Excel & Modelling Standards", description: "Dynamic shortcuts, error-proofing, and clean financial workbooks." },
      { number: 2, title: "3-Statement Integrated Financial Model", description: "Linking Income Statement, Balance Sheet, and Cash Flow statement." },
      { number: 3, title: "Corporate Valuation & DCF Analysis", description: "WACC, terminal value, sensitivity analysis, and comps." },
      { number: 4, title: "FP&A Budgeting & Variance Analysis", description: "Forecasting revenue drivers, OPEX, and variance reporting." },
      { number: 5, title: "Financial Dashboards with Power BI", description: "Visualizing financial health and executive KPIs for CFOs." },
    ],
    skills: ["Financial modelling", "3-statement models", "DCF valuation", "Excel", "FP&A", "Variance analysis", "Budget forecasting"],
    whoIsThisFor: [
      { title: "Some experience helpful", description: "Accountants and business grads stepping into FP&A" },
      { title: "Career switcher", description: "Professionals seeking high-paying corporate finance roles" },
    ],
    paceOptions: [
      { badge: "SELF-PACED", badgeType: "highlight", title: "On-Demand Lifetime Access", schedule: "Self-directed with full dataset templates", weeklyCommitment: "4-6 hrs/week", totalHours: "~70 hours", isPopular: true },
    ],
    mentors: [
      { id: "fin-mentor", name: "Mary Smith", initials: "MS", image: mentor2, isAvailable: true, services: "Model Audit | FP&A Interview Prep", roles: "Head of FP&A", sessionsCount: "135 sessions (12 reviews)" },
    ],
    successStories: [
      { id: "fin-story-1", quote: "The 3-statement model template was directly tested during my final round interview.", author: "Grace E.", role: "Financial Analyst", rating: 5 },
    ],
    faqs: [
      { question: "Are downloadable Excel model templates provided?", answer: "Yes, you receive fully dynamic downloadable financial models and case study templates." },
    ],
  },
  {
    id: "hr-people-operations",
    slug: "hr-people-operations",
    title: "HR & People Operations",
    pathwayTitle: "HR & People Operations Pathway",
    type: "live",
    badge: "LIVE COHORT",
    category: "Management & People",
    description:
      "Talent strategy, employee relations and organisational design.",
    headline:
      "Modernize your talent lifecycle. Build data-driven recruiting funnels, performance frameworks, and employee retention programs in high-growth companies.",
    modulesCount: 6,
    duration: "8 weeks",
    level: "Beginner-friendly",
    startsDate: "6 Oct 2026",
    seatsLeft: 27,
    isUnlimited: false,
    stats: {
      openRoles: "220",
      medianSalary: "£44k",
      quarterDemand: "108%",
      coreModules: 6,
    },
    modules: [
      { number: 1, title: "Modern People Strategy & Talent Acquisition", description: "Candidate sourcing, structured interviews, and employer branding." },
      { number: 2, title: "Onboarding & Employee Experience", description: "Delivering world-class onboarding and remote team engagement." },
      { number: 3, title: "Performance Management & OKRs", description: "Continuous feedback cycles, calibration, and growth ladders." },
      { number: 4, title: "People Analytics & HR Tech Stacks", description: "Measuring eNPS, turnover rates, and using modern HRIS tools." },
      { number: 5, title: "Employee Relations & Employment Law", description: "Workplace compliance, grievances, and conflict resolution." },
      { number: 6, title: "Compensation, Benefits & Retention", description: "Total rewards benchmarks and competitive equity compensation." },
    ],
    skills: ["Talent acquisition", "HRIS", "Performance management", "People analytics", "Employee relations", "Structured interviewing"],
    whoIsThisFor: [
      { title: "Complete beginner", description: "Passionate about building people-first teams" },
      { title: "Career switcher", description: "Administrators and recruiters looking to elevate to People Ops" },
    ],
    paceOptions: [
      { badge: "LOWER WEEKLY COMMITMENT", badgeType: "neutral", title: "6-Month Weekend Track", schedule: "Weekends, 4 hrs/session", weeklyCommitment: "8-10 hrs/week", totalHours: "~100 hours", isPopular: false },
      { badge: "FASTEST COMPLETION", badgeType: "highlight", title: "4-Month Evening Track", schedule: "Mon–Thu, 7:00–9:00 pm", weeklyCommitment: "8-10 hrs/week", totalHours: "~100 hours", isPopular: true },
    ],
    mentors: [
      { id: "hr-mentor", name: "Akingbade Lawal", initials: "AL", image: mentor3, isAvailable: true, services: "HR Strategy | Compensation Review", roles: "Head of People & Culture", sessionsCount: "155 sessions (18 reviews)" },
    ],
    successStories: [
      { id: "hr-story-1", quote: "Secured my People Operations Specialist role at a high-growth scale-up.", author: "Clara D.", role: "People Operations Specialist", rating: 5 },
    ],
    faqs: [
      { question: "Is this course relevant for remote and distributed workforces?", answer: "Yes, our modules specifically detail remote onboarding, asynchronous communication, and global hiring compliance." },
    ],
  },
  {
    id: "machine-learning",
    slug: "machine-learning",
    title: "Machine Learning",
    pathwayTitle: "Machine Learning Pathway",
    type: "on-demand",
    badge: "ON-DEMAND",
    category: "Data & BI",
    description:
      "Model training, feature engineering, evaluation and deployment of ML systems.",
    headline:
      "Build real-world predictive models and machine learning pipelines using Python, Scikit-learn, and cloud inference endpoints.",
    modulesCount: 7,
    duration: "Self-paced",
    level: "Some experience helpful",
    startsDate: "Starts anytime",
    seatsLeft: null,
    isUnlimited: true,
    stats: {
      openRoles: "390",
      medianSalary: "£62k",
      quarterDemand: "148%",
      coreModules: 7,
    },
    modules: [
      { number: 1, title: "Python for Machine Learning", description: "Vectorised operations with NumPy, Pandas pipelines, and Matplotlib." },
      { number: 2, title: "Feature Engineering & Data Preprocessing", description: "Encoding, scaling, imputation, and dimensionality reduction." },
      { number: 3, title: "Supervised Learning Algorithms", description: "Regression, Decision Trees, Random Forests, and XGBoost." },
      { number: 4, title: "Unsupervised Learning & Clustering", description: "K-Means, DBSCAN, and anomaly detection." },
      { number: 5, title: "Model Evaluation & Hyperparameter Tuning", description: "Cross-validation, ROC-AUC, Precision-Recall, and GridSearch." },
      { number: 6, title: "Introduction to Deep Learning & PyTorch", description: "Neural network architectures, backpropagation, and loss curves." },
      { number: 7, title: "MLOps & Deploying Models to Production", description: "Packaging inference models into FastAPI endpoints and Docker containers." },
    ],
    skills: ["Python", "Scikit-Learn", "Feature engineering", "XGBoost", "Model deployment", "Docker", "PyTorch", "FastAPI"],
    whoIsThisFor: [
      { title: "Some experience helpful", description: "Developers or analysts with basic Python syntax knowledge" },
      { title: "Career switcher", description: "STEM degree graduates stepping into Applied AI / ML" },
    ],
    paceOptions: [
      { badge: "SELF-PACED", badgeType: "highlight", title: "On-Demand Lifetime Access", schedule: "Learn at your own pace with Jupyter notebooks", weeklyCommitment: "6-10 hrs/week", totalHours: "~100 hours", isPopular: true },
    ],
    mentors: [
      { id: "ml-mentor", name: "James Anderson", initials: "JA", image: mentor1, isAvailable: true, services: "Code Review | ML System Design", roles: "Lead Machine Learning Engineer", sessionsCount: "120 sessions (12 reviews)" },
    ],
    successStories: [
      { id: "ml-story-1", quote: "The deployment module was invaluable — deployed my portfolio model on AWS during interviews.", author: "Arjun P.", role: "Junior ML Engineer", rating: 5 },
    ],
    faqs: [
      { question: "Are practical coding projects included?", answer: "Yes, you will develop 3 complete GitHub portfolio repositories with clean test coverage." },
    ],
  },
];

/**
 * Normalizes an API course object from backend into the unified Pathway shape.
 */
export const normalizeApiCourse = (apiCourse) => {
  if (!apiCourse) return null;
  const id = apiCourse._id || apiCourse.id || apiCourse.slug;
  const slug = apiCourse.slug || id;
  const title = apiCourse.title || "Course Pathway";
  const isLive = Boolean(apiCourse.available_course_types?.live_session || apiCourse.cohorts?.length > 0);
  const type = isLive ? "live" : "on-demand";

  // Check matching default pathway by slug or lowercase title
  const matched = DEFAULT_PATHWAYS.find(
    (p) =>
      p.slug === slug ||
      p.id === id ||
      p.title.toLowerCase() === title.toLowerCase() ||
      title.toLowerCase().includes(p.title.toLowerCase())
  );

  const modules =
    apiCourse.course_includes?.length > 0
      ? apiCourse.course_includes.map((item, idx) => ({
          number: idx + 1,
          title: item,
          description: `Practical implementation and industry best practices for ${item}.`,
        }))
      : matched?.modules || [
          { number: 1, title: "Orientation & Foundations", description: "Introduction to the tools, role, and industry standards." },
          { number: 2, title: "Core Methodologies", description: "Building technical proficiency and end-to-end workflows." },
          { number: 3, title: "Advanced Frameworks", description: "Handling complex client scenarios and enterprise scale." },
          { number: 4, title: "Capstone Execution", description: "Hands-on project work validated by industry mentors." },
        ];

  const skills =
    apiCourse.tools_and_technologies?.length > 0
      ? apiCourse.tools_and_technologies
      : matched?.skills || ["Practical application", "Portfolio building", "Team collaboration", "Industry tooling"];

  const cohortsList = Array.isArray(apiCourse.cohorts) ? apiCourse.cohorts : [];
  const primaryCohort = cohortsList.find((c) => c && c.start_date) || cohortsList[0] || null;

  const formatCohortDate = (dateVal) => {
    if (!dateVal) return null;
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formattedCohortStartDate = formatCohortDate(primaryCohort?.start_date);

  const nextCohortDate =
    formattedCohortStartDate ||
    primaryCohort?.cohort ||
    matched?.startsDate ||
    (isLive ? "Upcoming Cohort" : "Starts anytime");

  return {
    id,
    slug,
    title,
    pathwayTitle: title.toLowerCase().includes("pathway") ? title : `${title} Pathway`,
    type,
    badge: isLive ? "LIVE COHORT" : "ON-DEMAND",
    category: apiCourse.category || apiCourse.pathway || matched?.category || "Technology & Business",
    description: apiCourse.overview || matched?.description || "Comprehensive hands-on training led by industry mentors.",
    headline: apiCourse.overview || matched?.headline || `Become job-ready in ${title} through practical projects, mentorship, and career preparation.`,
    modulesCount: modules.length,
    duration: primaryCohort?.class_days || matched?.duration || (isLive ? "8 weeks" : "Self-paced"),
    level: matched?.level || "Beginner-friendly",
    startsDate: nextCohortDate,
    cohort: primaryCohort,
    cohorts: cohortsList,
    cohortStartDate: formattedCohortStartDate,
    cohortName: primaryCohort?.cohort || null,
    cohortTime: primaryCohort?.time || null,
    cohortClassDays: primaryCohort?.class_days || null,
    cohortTimezone: primaryCohort?.timezone || null,
    seatsLeft: primaryCohort?.capacity || matched?.seatsLeft || (isLive ? 16 : null),
    isUnlimited: !isLive,
    stats: matched?.stats || {
      openRoles: "300+",
      medianSalary: "£48k",
      quarterDemand: "115%",
      coreModules: modules.length,
    },
    modules,
    skills,
    whoIsThisFor: matched?.whoIsThisFor || [
      { title: "Complete beginner", description: "No prior background required" },
      { title: "Career switcher", description: "Transitioning into modern digital roles" },
      { title: "Ready to specialise", description: "Sharpening hands-on practical skills" },
    ],
    paceOptions: matched?.paceOptions || [
      {
        badge: "FLEXIBLE PACE",
        badgeType: "highlight",
        title: isLive ? "Live Cohort Track" : "Self-Paced Track",
        schedule: isLive
          ? primaryCohort?.class_days
            ? `${primaryCohort.class_days}${primaryCohort.time ? ` at ${primaryCohort.time}` : ""}`
            : "Weekends, 4 hrs/session"
          : "Flexible, start anytime",
        weeklyCommitment: "8-10 hrs/week",
        totalHours: "~100 hours",
        isPopular: true,
      },
    ],
    mentors: matched?.mentors || [
      {
        id: "mentor-lead",
        name: "Industry Lead Mentor",
        initials: "LM",
        image: mentor1,
        isAvailable: true,
        services: "CV Review | Mock Interviews",
        roles: "Senior Practitioner",
        sessionsCount: "100+ sessions",
      },
    ],
    successStories: matched?.successStories || [
      {
        id: "success-1",
        quote: "The curriculum and mentorship were instrumental in landing my new tech role.",
        author: "Avenue Impact Graduate",
        role: "Practitioner",
        rating: 5,
      },
    ],
    faqs: matched?.faqs || [
      {
        question: "Do I need prior experience?",
        answer: "No, our pathways are built to take learners from fundamentals up to job-ready portfolio projects.",
      },
      {
        question: "Is there a certificate awarded?",
        answer: "Yes, you will earn an industry-recognized certificate upon completing the required coursework.",
      },
    ],
    rawApiCourse: apiCourse,
  };
};

/**
 * Retrieves a pathway by id or slug, merging with any fetched API course data and carrying overrideTitle if clicked.
 */
export const getPathwayData = (identifier, apiCourse = null, overrideTitle = null) => {
  let basePathway = null;

  if (apiCourse) {
    basePathway = normalizeApiCourse(apiCourse);
  } else if (identifier) {
    const normalizedKey = String(identifier).toLowerCase().trim();
    const found = DEFAULT_PATHWAYS.find(
      (p) =>
        p.id.toLowerCase() === normalizedKey ||
        p.slug.toLowerCase() === normalizedKey ||
        p.title.toLowerCase() === normalizedKey ||
        p.title.toLowerCase().replace(/\s+/g, "-") === normalizedKey ||
        normalizedKey.replace(/-/g, " ") === p.title.toLowerCase() ||
        normalizedKey.includes(p.slug.toLowerCase()) ||
        normalizedKey.includes(p.id.toLowerCase())
    );
    basePathway = found ? { ...found } : null;
  }

  const cleanOverride = typeof overrideTitle === "string" ? overrideTitle.trim() : null;

  if (cleanOverride && !basePathway) {
    const overrideKey = cleanOverride.toLowerCase();
    const matchedByTitle = DEFAULT_PATHWAYS.find(
      (p) =>
        p.title.toLowerCase() === overrideKey ||
        p.title.toLowerCase().replace(/\s+/g, "-") === overrideKey ||
        overrideKey.includes(p.slug.toLowerCase()) ||
        overrideKey.includes(p.id.toLowerCase())
    );
    if (matchedByTitle) {
      basePathway = { ...matchedByTitle };
    }
  }

  if (!basePathway) {
    const rawTitle = cleanOverride || (identifier ? String(identifier).replace(/-/g, " ") : "Career Pathway");
    const formattedTitle = rawTitle
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\s+Pathway$/i, "")
      .trim();

    basePathway = {
      id: identifier || "custom-pathway",
      slug: identifier || "custom-pathway",
      title: formattedTitle,
      pathwayTitle: `${formattedTitle} Pathway`,
      type: "live",
      badge: "LIVE COHORT",
      category: "Technology & Business",
      description: `Comprehensive hands-on training and mentorship in ${formattedTitle}.`,
      headline: `Become job-ready in ${formattedTitle} through practical projects, mentorship, and career preparation.`,
      modulesCount: 4,
      duration: "8 weeks",
      level: "Beginner-friendly",
      startsDate: "Upcoming Cohort",
      seatsLeft: 15,
      isUnlimited: false,
      stats: {
        openRoles: "300+",
        medianSalary: "£48k",
        quarterDemand: "115%",
        coreModules: 4,
      },
      modules: [
        { number: 1, title: "Orientation & Industry Foundations", description: `Introduction to key concepts, tooling, and workflow in ${formattedTitle}.` },
        { number: 2, title: "Core Methodologies & Practical Execution", description: `Hands-on training and real-world problem solving in ${formattedTitle}.` },
        { number: 3, title: "Advanced Frameworks & Industry Scenarios", description: "Executing complex enterprise projects and team collaboration." },
        { number: 4, title: "Capstone Project & Portfolio Defense", description: "Building a portfolio project validated by senior industry mentors." },
      ],
      skills: [formattedTitle, "Portfolio building", "Team collaboration", "Industry best practices"],
      whoIsThisFor: [
        { title: "Complete beginner", description: "No prior experience required" },
        { title: "Career switcher", description: "Transitioning into tech and modern digital roles" },
        { title: "Skill upgrader", description: "Sharpening practical hands-on experience" },
      ],
      paceOptions: [
        {
          badge: "POPULAR TRACK",
          badgeType: "highlight",
          title: "Live Cohort Track",
          schedule: "Mon–Thu, 7:00–9:00 pm",
          weeklyCommitment: "8-10 hrs/week",
          totalHours: "~100 hours",
          isPopular: true,
        },
      ],
      mentors: [
        {
          id: "lead-mentor",
          name: "Senior Industry Mentor",
          initials: "IM",
          image: mentor1,
          isAvailable: true,
          services: "CV Review | Interview Preparation",
          roles: `${formattedTitle} Lead`,
          sessionsCount: "100+ sessions",
        },
      ],
      successStories: [
        {
          id: "dyn-story-1",
          quote: `The practical training in ${formattedTitle} gave me the skills and confidence to transition successfully into my role.`,
          author: "Avenue Impact Graduate",
          role: "Practitioner",
          rating: 5,
        },
      ],
      faqs: [
        {
          question: "Do I need a technical degree?",
          answer: "No, our pathways start from foundational principles up to job-ready portfolio projects.",
        },
        {
          question: "Is certification included?",
          answer: "Yes, you earn an industry-recognized certificate of completion alongside verified portfolio projects.",
        },
      ],
    };
  } else {
    basePathway = { ...basePathway };
  }

  if (cleanOverride) {
    const formattedTitle = cleanOverride.replace(/\s+pathway$/i, "").trim();
    basePathway.title = formattedTitle;
    basePathway.pathwayTitle = formattedTitle.endsWith("Pathway")
      ? formattedTitle
      : `${formattedTitle} Pathway`;
  }

  return basePathway;
};
