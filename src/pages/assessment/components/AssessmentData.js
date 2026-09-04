import {
  FileText,
  Calendar,
  BarChart2,
  Shield,
  Cloud,
  Users,
  Cpu,
  Compass,
  Target,
  Layers,
  Code2,
  GitBranch,
} from "lucide-react";

export const PATHWAYS = {
  business_analysis: {
    id: "business_analysis",
    title: "Business Analysis",
    slug: "business-analysis",
    keywords: ["business analysis", "business analyst", "ba"],
    matchScore: 95,
    summary:
      "You're drawn to structured problem-solving and translating messy situations into clear plans — the core of what Business Analysts do every day.",
    openRoles: 312,
    medianSalary: "£48K",
    demandGrowth: "+14%",
    demandQuarter: "Demand this quarter",
    color: "#D7195A",
  },
  project_management: {
    id: "project_management",
    title: "Project Management",
    slug: "project-management",
    keywords: ["project management", "project manager", "pmp", "pm"],
    matchScore: 88,
    summary:
      "You thrive on coordinating teams, balancing priorities, and driving complex initiatives from conception across the finish line on time and budget.",
    openRoles: 256,
    medianSalary: "£52K",
    demandGrowth: "+11%",
    demandQuarter: "Demand this quarter",
    color: "#0B8579",
  },
  data_analytics: {
    id: "data_analytics",
    title: "Data Analytics",
    slug: "data-analytics",
    keywords: ["data analytics", "data analysis", "data analyst", "power bi", "sql", "analytics"],
    matchScore: 82,
    summary:
      "You excel at discovering patterns within complex datasets, transforming numbers into actionable business insights, and crafting compelling data stories.",
    openRoles: 280,
    medianSalary: "£46K",
    demandGrowth: "+18%",
    demandQuarter: "Demand this quarter",
    color: "#1C2C64",
  },
  cybersecurity: {
    id: "cybersecurity",
    title: "Cybersecurity",
    slug: "cybersecurity",
    keywords: ["cybersecurity", "cyber security", "security", "soc"],
    matchScore: 78,
    summary:
      "You enjoy defending critical systems against evolving threats, identifying vulnerabilities, and keeping organizations secure and compliant.",
    openRoles: 195,
    medianSalary: "£55K",
    demandGrowth: "+22%",
    demandQuarter: "Demand this quarter",
    color: "#4D2554",
  },
  cloud_devops: {
    id: "cloud_devops",
    title: "Cloud Computing & DevOps",
    slug: "cloud-devops",
    keywords: ["cloud", "devops", "aws", "azure", "cloud computing"],
    matchScore: 75,
    summary:
      "You want to build resilient, scalable architectures that power modern applications, automating delivery pipelines and infrastructure.",
    openRoles: 220,
    medianSalary: "£58K",
    demandGrowth: "+20%",
    demandQuarter: "Demand this quarter",
    color: "#0A1430",
  },
  agile_delivery: {
    id: "agile_delivery",
    title: "Agile Delivery & Scrum",
    slug: "agile-delivery",
    keywords: ["scrum", "agile", "delivery manager", "scrum master"],
    matchScore: 70,
    summary:
      "You love coaching high-performance agile teams, eliminating delivery roadblocks, and continuously improving team velocity and collaboration.",
    openRoles: 180,
    medianSalary: "£50K",
    demandGrowth: "+12%",
    demandQuarter: "Demand this quarter",
    color: "#B45309",
  },
  ai_machine_learning: {
    id: "ai_machine_learning",
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    keywords: ["ai", "machine learning", "artificial intelligence", "ml"],
    matchScore: 68,
    summary:
      "You are fascinated by building intelligent algorithms, training models on real-world data, and unlocking automated predictive capabilities.",
    openRoles: 165,
    medianSalary: "£62K",
    demandGrowth: "+28%",
    demandQuarter: "Demand this quarter",
    color: "#D7195A",
  },
};

export const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    eyebrow: "QUESTION 1 OF 6",
    title: "What kind of problem excites you most?",
    subtitle:
      "There's no wrong answer — pick whichever feels closest to how you actually enjoy spending your time.",
    options: [
      {
        id: "opt-1",
        title: "Untangling business processes",
        description:
          "Turning messy situations into clear requirements and structured plans",
        icon: FileText,
        pathwayWeights: {
          business_analysis: 4,
          agile_delivery: 1,
        },
      },
      {
        id: "opt-2",
        title: "Coordinating people & delivery",
        description:
          "Managing timelines, budgets and moving parts to deliver a project",
        icon: Calendar,
        pathwayWeights: {
          project_management: 4,
          agile_delivery: 2,
        },
      },
      {
        id: "opt-3",
        title: "Finding patterns in data",
        description:
          "Uncovering insights and stories hidden inside numbers",
        icon: BarChart2,
        pathwayWeights: {
          data_analytics: 4,
          ai_machine_learning: 2,
        },
      },
      {
        id: "opt-4",
        title: "Protecting systems & data",
        description:
          "Defending against threats and closing vulnerabilities before they're exploited",
        icon: Shield,
        pathwayWeights: {
          cybersecurity: 4,
          cloud_devops: 1,
        },
      },
      {
        id: "opt-5",
        title: "Building scalable infrastructure",
        description:
          "Designing and scaling the systems everything else runs on",
        icon: Cloud,
        pathwayWeights: {
          cloud_devops: 4,
          cybersecurity: 1,
        },
      },
      {
        id: "opt-6",
        title: "Improving how teams work",
        description:
          "Helping a team continuously get better at working together",
        icon: Users,
        pathwayWeights: {
          agile_delivery: 4,
          project_management: 2,
        },
      },
      {
        id: "opt-7",
        title: "Teaching machines to learn",
        description:
          "Training systems to spot patterns and make predictions on their own",
        icon: Cpu,
        pathwayWeights: {
          ai_machine_learning: 4,
          data_analytics: 2,
        },
      },
    ],
  },
  {
    id: 2,
    eyebrow: "QUESTION 2 OF 6",
    title: "How do you prefer to spend a typical work day?",
    subtitle:
      "Choose the environment and workflow where you do your best, most fulfilling work.",
    options: [
      {
        id: "opt-2-1",
        title: "Engaging stakeholders & gathering requirements",
        description:
          "Interviewing teams, mapping user journeys, and documenting solution blueprints",
        icon: FileText,
        pathwayWeights: {
          business_analysis: 4,
          agile_delivery: 1,
        },
      },
      {
        id: "opt-2-2",
        title: "Planning project roadmaps & managing scope",
        description:
          "Balancing deadlines, leading sprint planning, and unblocking team hurdles",
        icon: Calendar,
        pathwayWeights: {
          project_management: 4,
          agile_delivery: 2,
        },
      },
      {
        id: "opt-2-3",
        title: "Analyzing dashboards & querying databases",
        description:
          "Deep diving into SQL, writing reports, and visualizing actionable trends",
        icon: BarChart2,
        pathwayWeights: {
          data_analytics: 4,
          business_analysis: 1,
        },
      },
      {
        id: "opt-2-4",
        title: "Monitoring security audits & threat prevention",
        description:
          "Configuring compliance protocols and investigating incident response",
        icon: Shield,
        pathwayWeights: {
          cybersecurity: 4,
        },
      },
      {
        id: "opt-2-5",
        title: "Automating cloud deployments & CI/CD",
        description:
          "Writing infrastructure as code and maintaining high system uptime",
        icon: Cloud,
        pathwayWeights: {
          cloud_devops: 4,
        },
      },
      {
        id: "opt-2-6",
        title: "Facilitating agile retrospectives & standups",
        description:
          "Coaching cross-functional squads to optimize flow and release cycles",
        icon: Users,
        pathwayWeights: {
          agile_delivery: 4,
          project_management: 2,
        },
      },
    ],
  },
  {
    id: 3,
    eyebrow: "QUESTION 3 OF 6",
    title: "When tackling a challenge, what is your first instinct?",
    subtitle: "Think about your natural thought process when approaching the unknown.",
    options: [
      {
        id: "opt-3-1",
        title: "Ask 'Why?' and trace the underlying root cause",
        description:
          "Break down the business problem before jumping to technical conclusions",
        icon: Compass,
        pathwayWeights: {
          business_analysis: 4,
          data_analytics: 1,
        },
      },
      {
        id: "opt-3-2",
        title: "Build a structured timeline and allocate resources",
        description:
          "Map dependencies, assess risks, and organize who does what",
        icon: Target,
        pathwayWeights: {
          project_management: 4,
          agile_delivery: 1,
        },
      },
      {
        id: "opt-3-3",
        title: "Look at the numbers to find empirical evidence",
        description:
          "Validate assumptions using statistical metrics and clean datasets",
        icon: BarChart2,
        pathwayWeights: {
          data_analytics: 4,
          ai_machine_learning: 2,
        },
      },
      {
        id: "opt-3-4",
        title: "Assess risk vectors and worst-case scenarios",
        description:
          "Audit vulnerabilities and prepare proactive safeguards",
        icon: Shield,
        pathwayWeights: {
          cybersecurity: 4,
        },
      },
    ],
  },
  {
    id: 4,
    eyebrow: "QUESTION 4 OF 6",
    title: "Which type of workplace outcome gives you the most satisfaction?",
    subtitle: "What makes you feel like you truly accomplished something meaningful?",
    options: [
      {
        id: "opt-4-1",
        title: "A clear, well-documented specification that developers build accurately",
        description: "Zero ambiguity between business vision and delivered functionality",
        icon: FileText,
        pathwayWeights: {
          business_analysis: 4,
        },
      },
      {
        id: "opt-4-2",
        title: "A multi-month project launching on time with happy stakeholders",
        description: "Navigating chaos and guiding diverse teams over the finish line",
        icon: Calendar,
        pathwayWeights: {
          project_management: 4,
        },
      },
      {
        id: "opt-4-3",
        title: "A visual dashboard that directly shifts executive strategy",
        description: "Data-driven clarity that influences pivotal revenue decisions",
        icon: BarChart2,
        pathwayWeights: {
          data_analytics: 4,
        },
      },
      {
        id: "opt-4-4",
        title: "A smooth, automated system deployment with zero downtime",
        description: "Seamless engineering reliability powering thousands of users",
        icon: Cloud,
        pathwayWeights: {
          cloud_devops: 4,
        },
      },
    ],
  },
  {
    id: 5,
    eyebrow: "QUESTION 5 OF 6",
    title: "What balance of technical vs human interaction do you desire?",
    subtitle: "Every tech career is different — where on the spectrum are you most comfortable?",
    options: [
      {
        id: "opt-5-1",
        title: "High collaboration: Translating between business & tech teams",
        description: "Facilitating workshops, aligning goals, and bridging communication gaps",
        icon: Users,
        pathwayWeights: {
          business_analysis: 3,
          project_management: 3,
          agile_delivery: 3,
        },
      },
      {
        id: "opt-5-2",
        title: "Balanced: Working with data tools & presenting findings to leaders",
        description: "Blending solo analytical deep-work with impactful business presentations",
        icon: BarChart2,
        pathwayWeights: {
          data_analytics: 4,
          business_analysis: 2,
        },
      },
      {
        id: "opt-5-3",
        title: "High technical focus: Building systems, code, and infrastructure",
        description: "Hands-on tools, terminal interfaces, and architecture design",
        icon: Code2,
        pathwayWeights: {
          cloud_devops: 4,
          cybersecurity: 3,
          ai_machine_learning: 4,
        },
      },
    ],
  },
  {
    id: 6,
    eyebrow: "QUESTION 6 OF 6",
    title: "What is your primary career goal for the next 12 months?",
    subtitle: "Select the milestone that represents your definition of success.",
    options: [
      {
        id: "opt-6-1",
        title: "Transition into a high-demand Business Analyst role",
        description: "Earn UK-recognized certifications and work on real client projects",
        icon: Target,
        pathwayWeights: {
          business_analysis: 5,
        },
      },
      {
        id: "opt-6-2",
        title: "Lead tech projects and delivery as a Certified Project Manager",
        description: "Oversee digital transformation projects in top multinational firms",
        icon: Calendar,
        pathwayWeights: {
          project_management: 5,
        },
      },
      {
        id: "opt-6-3",
        title: "Become a proficient Data Analyst with SQL and Power BI expertise",
        description: "Unlock high-paying analytical roles in finance, tech, or consulting",
        icon: BarChart2,
        pathwayWeights: {
          data_analytics: 5,
        },
      },
      {
        id: "opt-6-4",
        title: "Master Agile delivery as a certified Scrum Master",
        description: "Champion modern delivery frameworks across software squads",
        icon: GitBranch,
        pathwayWeights: {
          agile_delivery: 5,
        },
      },
    ],
  },
];

export function calculateAssessmentResults(selectedAnswers) {
  const scores = {
    business_analysis: 0,
    project_management: 0,
    data_analytics: 0,
    cybersecurity: 0,
    cloud_devops: 0,
    agile_delivery: 0,
    ai_machine_learning: 0,
  };

  Object.values(selectedAnswers).forEach((option) => {
    if (option && option.pathwayWeights) {
      Object.entries(option.pathwayWeights).forEach(([pathwayKey, weight]) => {
        if (scores[pathwayKey] !== undefined) {
          scores[pathwayKey] += weight;
        }
      });
    }
  });

  const sortedKeys = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  const maxScore = scores[sortedKeys[0]] || 1;

  const rankedResults = sortedKeys.map((key) => {
    const rawScore = scores[key];
    const percentage = Math.min(
      95,
      Math.max(10, Math.round((rawScore / maxScore) * 95))
    );
    return {
      ...PATHWAYS[key],
      score: rawScore,
      percentageMatch: percentage,
    };
  });

  const winner = rankedResults[0];
  const runnerUp = rankedResults[1];

  const diff = winner.percentageMatch - runnerUp.percentageMatch;
  const isTied = diff <= 5 && winner.score > 0;

  return {
    isTied,
    topMatch: winner,
    runnerUp: runnerUp,
    otherMatches: rankedResults.slice(isTied ? 2 : 1),
    allRanked: rankedResults,
  };
}

export function resolveCoursesForAssessment(results, coursesList = []) {
  if (!results) return results;

  const getCoursesForPathway = (pathway) => {
    if (!coursesList || !coursesList.length || !pathway) return [];

    const pTitle = (pathway.title || "").toLowerCase();
    const pId = (pathway.id || "").toLowerCase();

    return coursesList.filter((c) => {
      const cPathway = (c.pathway || c.category || "").toLowerCase();
      const cTitle = (c.title || "").toLowerCase();
      const cSlug = (c.slug || "").toLowerCase();

      const exactMatch =
        (cPathway && (cPathway === pTitle || cPathway === pId)) ||
        (cPathway && pTitle.includes(cPathway)) ||
        (cPathway && cPathway.includes(pTitle));

      const keywordMatch = (pathway.keywords || []).some((kw) => {
        const k = kw.toLowerCase();
        return cTitle.includes(k) || cSlug.includes(k);
      });

      return exactMatch || keywordMatch;
    });
  };

  const topPathwayCourses = getCoursesForPathway(results.topMatch);
  const runnerUpPathwayCourses = getCoursesForPathway(results.runnerUp);

  const topCourse = topPathwayCourses[0] || null;
  const runnerUpCourse = runnerUpPathwayCourses[0] || null;

  const enrichedTopMatch = {
    ...results.topMatch,
    courses: topPathwayCourses,
    course: topCourse,
    courseId: topCourse?.id || topCourse?._id,
    courseTitle: topCourse?.title || results.topMatch.title,
    courseOverview: topCourse?.overview || results.topMatch.summary,
    courseSlug: topCourse?.slug || results.topMatch.slug,
    courseCoverImage: topCourse?.cover_image || topCourse?.coverImage,
  };

  const enrichedRunnerUp = {
    ...results.runnerUp,
    courses: runnerUpPathwayCourses,
    course: runnerUpCourse,
    courseId: runnerUpCourse?.id || runnerUpCourse?._id,
    courseTitle: runnerUpCourse?.title || results.runnerUp.title,
    courseOverview: runnerUpCourse?.overview || results.runnerUp.summary,
    courseSlug: runnerUpCourse?.slug || results.runnerUp.slug,
    courseCoverImage: runnerUpCourse?.cover_image || runnerUpCourse?.coverImage,
  };

  const enrichedOtherMatches = (results.otherMatches || []).map((match) => {
    const pathwayCourses = getCoursesForPathway(match);
    const course = pathwayCourses[0] || null;
    return {
      ...match,
      courses: pathwayCourses,
      course,
      courseId: course?.id || course?._id,
      courseTitle: course?.title || match.title,
      courseSlug: course?.slug || match.slug,
      courseCoverImage: course?.cover_image || course?.coverImage,
    };
  });

  return {
    ...results,
    topMatch: enrichedTopMatch,
    runnerUp: enrichedRunnerUp,
    otherMatches: enrichedOtherMatches,
  };
}
