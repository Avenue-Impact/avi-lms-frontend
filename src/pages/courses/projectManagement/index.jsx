import { useState, useEffect } from 'react';
import { Clock, Users, Award, Briefcase, Check, ArrowRight, Star, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Share2 } from 'lucide-react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share"
import { motion } from 'framer-motion';
import { CountdownTimer } from './components/CountdownTimer';
import { FeatureCard } from './components/FeatureCard';
import { TestimonialCard } from './components/TestimonialCard';
import { RegistrationForm } from './components/RegistrationForm';
import Logo from '../../../assets/images/aviLogo.png';
import cpdLogo from '../../../assets/images/cpd.jpeg'
import { socialLinks } from '../../../utils/socialLinks';
import { IoLogoTiktok, IoLogoWhatsapp } from 'react-icons/io5';
import Card, { CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import heroImage from '../../../../public/images/projectMHero.jpg'
import SEOHead from '@/Components/SEOHead';

// Add Poppins font
const Poppins = () => {
  return (
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
  );
};

// Main Page Component
export default function ProjectManagement() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEarlyBird, setIsEarlyBird] = useState(false);
  const [hoveredWeek, setHoveredWeek] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = "Project Management Professional Training Program";
  
  const programStartDate = new Date('2025-10-06T00:00:00');
  const earlyBirdEndDate = new Date('2025-10-06T23:59:59');

  useEffect(() => {
    // Check if early bird is still valid
    const now = new Date();
    setIsEarlyBird(now < earlyBirdEndDate);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Briefcase,
      title: 'Real-World BA Skills',
      description: 'Learn with hands-on live projects that mirror actual business scenarios',
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100'
    },
    {
      icon: Users,
      title: '1-on-1 Mentorship',
      description: 'Career coaching with industry experts who guide your journey',
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100'
    },
    {
      icon: Award,
      title: 'Global Certificate',
      description: 'Earn a globally recognised certificate of completion',
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100'
    },
    {
      icon: Check,
      title: 'Job Preparation',
      description: 'Access to mock interviews & comprehensive job prep sessions',
      iconColor: 'text-yellow-600',
      iconBgColor: 'bg-yellow-100'
    },
    {
      icon: Users,
      title: 'Beginner Friendly',
      description: 'Perfect for beginners, career switchers and non-tech backgrounds',
      iconColor: 'text-red-600',
      iconBgColor: 'bg-red-100'
    },
    {
      icon: Star,
      title: 'Proven Success',
      description: 'Join thousands of successful graduates now working globally',
      iconColor: 'text-indigo-600',
      iconBgColor: 'bg-indigo-100'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Project Manager, TechCorp',
      content: "This training transformed my approach to project management. The practical exercises and expert guidance helped me earn my PMP certification.",
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director, StartupXYZ',
      content: "Excellent program with real-world applications. The flexible schedule allowed me to balance work and learning effectively.",
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/39.jpg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Project Coordinator, GlobalTech',
      content: "The instructors are incredibly knowledgeable and supportive. I gained confidence and skills that immediately improved my work performance.",
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/36.jpg'
    }
  ];

  const timeSchedules = [
    {
      week: 1,
      title: "Project Management Fundamentals",
      topics: "Introduction to PM, Project lifecycle, Stakeholder management",
      image: "project management fundamentals introduction professional training",
    },
    {
      week: 2,
      title: "Project Planning & Scope Management",
      topics: "WBS creation, Scope definition, Requirements gathering",
      image: "project planning scope management work breakdown structure",
    },
    {
      week: 3,
      title: "Time & Schedule Management",
      topics: "Activity sequencing, Critical path method, Schedule optimization",
      image: "time schedule management gantt chart project timeline",
    },
    {
      week: 4,
      title: "Cost Management & Budgeting",
      topics: "Cost estimation, Budget planning, Earned value management",
      image: "cost management budgeting financial planning project",
    },
    {
      week: 5,
      title: "Quality & Risk Management",
      topics: "Quality planning, Risk identification, Mitigation strategies",
      image: "quality risk management assessment mitigation strategies",
    },
    {
      week: 6,
      title: "Team Leadership & Communication",
      topics: "Team building, Conflict resolution, Stakeholder communication",
      image: "team leadership communication collaboration professional",
    },
    {
      week: 7,
      title: "Project Execution & Monitoring",
      topics: "Performance tracking, Change management, Status reporting",
      image: "project execution monitoring performance tracking dashboard",
    },
    {
      week: 8,
      title: "Project Closure & Lessons Learned",
      topics: "Project closure, Documentation, Continuous improvement",
      image: "project closure lessons learned documentation improvement",
    },
  ]

  const whyChooseUs = [
    {
      title: "Expert Instructors",
      description: "Learn from certified PMP professionals with 15+ years of real-world project management experience",
      image: 'https://images.unsplash.com/photo-1634464660153-468d44306ac4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGV4cGVydCUyMGluc3RydWN0b3IlMjBnaXZpbmclMjBsZWN0dXJlfGVufDB8fDB8fHww',
    },
    {
      title: "Industry Recognition",
      description: "Earn PMI-approved PDUs and prepare for PMP certification with our comprehensive curriculum",
      image: 'https://cdn.pixabay.com/photo/2024/09/18/07/04/ai-generated-9055464_1280.jpg',
    },
    {
      title: "Flexible Schedule",
      description: "Evening and weekend sessions designed for working professionals with busy schedules",
      image: 'https://images.unsplash.com/photo-1676276375581-da33fe6d1c8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGZsZXhzaWJsZSUyMHNjaGVkdWxlfGVufDB8fDB8fHww',
    },
  ]

  const cpdLink = `https://www.cpduk.co.uk/providers/avenue-impact`

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
      setShowShareOptions(false);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <>
      <SEOHead
        title="Project Management Training Courses | Avenue Impact"
        description="Earn your CPD certification in project management with Avenue Impact. Master project planning, Agile methodologies, team leadership, risk management, and budgeting."
        canonical="https://avenueimpact.com/courses/project-management"
      />
      <Poppins />
      {/* Share Button */}
      <div className="fixed bottom-8 left-8 z-50 flex flex-col items-end space-y-4">
        {showShareOptions && (
          <div className="bg-card/80 backdrop-blur-md rounded-full p-2 shadow-lg flex items-center space-x-2 mb-2 animate-fade-in-up">
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} title={title}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <WhatsappShareButton url={shareUrl} title={title}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <EmailShareButton url={shareUrl} subject={title} body="Check out this awesome course:">
              <EmailIcon size={32} round />
            </EmailShareButton>
            <button 
              onClick={handleCopyLink}
              className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
              title="Copy link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        )}
        <button
          onClick={handleShareClick}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none"
          aria-label="Share"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-poppins">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-2 text-sm">
          <div className="flex items-center whitespace-nowrap max-w-[100vw] overflow-x-auto hideScrollBar">
            <Clock className="h-4 w-4 mr-2" />
            <span>Next Project Management Training Starts October 10th - Secure Your Spot Now!</span>
          </div>
          <div className="hidden md:block">•</div>
          <div className="flex hidden md:block items-center">
            <span className="font-bold">
              Limited seats available!
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="Avenue Impact Logo" className="w-12 h-12 object-cover" />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#benefits" className="text-gray-700 hover:text-[#CC1747] transition-colors font-medium">Benefits</a>
            <a href="#curriculum" className="text-gray-700 hover:text-[#CC1747] transition-colors font-medium">Curriculum</a>
            <a href="#testimonials" className="text-gray-700 hover:text-[#CC1747] transition-colors font-medium">Success Stories</a>
            <a 
              href="#register" 
              className="bg-[#CC1747] text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Register Now
            </a>
          </nav>

          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-4">
            <a href="#benefits" className="block py-2 text-gray-700 hover:text-blue-600">Benefits</a>
            <a href="#curriculum" className="block py-2 text-gray-700 hover:text-blue-600">Curriculum</a>
            <a href="#testimonials" className="block py-2 text-gray-700 hover:text-blue-600">Success Stories</a>
            <a 
              href="#register" 
              className="block text-center bg-[#CC1747] text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Register Now
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E2A3F] to-[#1E2A3F] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('../../../../public/images/projectMHero.jpg')] bg-cover bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {!isEarlyBird && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block bg-white/20 backdrop-blur-sm text-sm font-medium px-4 py-1 rounded-full mb-6"
              >
                🎉 10th Anniversary Special
              </motion.div>
            )}
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Master Project Management
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white">
                Get Certified <span onClick={() => window.location.href = cpdLink} className="text-[#CC1747] cursor-pointer text-2xl italic">(CPD)</span> & Job-Ready in Weeks!
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto"
            >
              Elevate your project management skills with our comprehensive training program. Master industry-standard
              methodologies and advance your career with confidence.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <a 
                href="#register" 
                className="bg-white text-[#CC1747] font-semibold px-8 py-4 rounded-full hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                Register Now <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#curriculum" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 flex items-center justify-center gap-2"
              >
                View Curriculum
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl inline-block"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 5, 8].map((i) => (
                    <img 
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${30 + i}.jpg`}
                      alt="Student"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <p className="font-semibold">90% job placement</p>
                  <p className="text-sm text-blue-100">within 3 months of graduation</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Countdown Section */}
        <div className="bg-black py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-xl font-semibold mb-6">Program Starts In:</h3>
              <CountdownTimer targetDate={programStartDate} />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Support Our Trainees with 100% Mentorship</h2>
            <p className="text-xl text-gray-600">Some benefits you will get from our program</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FeatureCard 
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconColor={feature.iconColor}
                  iconBgColor={feature.iconBgColor}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>



            {/* Curriculum Section */}
      <section id="curriculum" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Course Overview</h2>
            <p className="text-xl text-gray-600">A comprehensive 8-week program designed to transform you into a confident project management professional</p>
          </div>

          <div className="">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="../../../../public/images/herlambang-tinasih-gusti-3kc_75Rdgyk-unsplash.jpg"
                  alt="Business analysis tools and charts"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <Card className="border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 rounded-lg overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1626460561069-c86d94488bbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNsb2NrJTIwdGltZSUyMHNjaGVkdWxlJTIwcHJvZmVzc2lvbmFsJTIwdHJhaW5pbmd8ZW58MHx8MHx8fDA%3D"
                          alt="Program details"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Program Details
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between hover:bg-muted/50 p-2 rounded transition-colors">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">8 weeks</span>
                      </div>
                      <div className="flex justify-between hover:bg-muted/50 p-2 rounded transition-colors">
                        <span className="text-muted-foreground">Format:</span>
                        <span className="font-medium">Hybrid (Online + In-person)</span>
                      </div>
                      <div className="flex justify-between hover:bg-muted/50 p-2 rounded transition-colors">
                        <span className="text-muted-foreground">Time Commitment:</span>
                        <span className="font-medium">6 hours/week</span>
                      </div>
                      <div className="flex justify-between hover:bg-muted/50 p-2 rounded transition-colors">
                        <span className="text-muted-foreground">Certification:</span>
                        <span className="font-medium">PMI-approved PDUs</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </div>


            <section id="schedule" className="py-16 ">
                  <div className=" mx-auto ">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Training Schedule</h2>
                      <p className="text-lg text-muted-foreground">
                        8-week comprehensive curriculum with hands-on projects and real-world case studies
                      </p>
                    </div>
          
                    <div className="max-sm:space-y-4 grid lg:grid-cols-2 sm:gap-12 gap-4 items-center">
                      {timeSchedules?.map((item) => (
                        <Card
                          key={item.week}
                          className={`border-border transition-all duration-300 cursor-pointer ${
                            hoveredWeek === item.week
                              ? "shadow-xl -translate-y-1 border-primary/50"
                              : "hover:shadow-md hover:-translate-y-0.5"
                          }`}
                          onMouseEnter={() => setHoveredWeek(item.week)}
                          onMouseLeave={() => setHoveredWeek(null)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="relative">
                                <div
                                  className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                    hoveredWeek === item.week ? "bg-primary-color-600 scale-110" : "bg-primary-color-600/20"
                                  }`}
                                >
                                  <span
                                    className={`font-bold transition-colors duration-300 ${
                                      hoveredWeek === item.week ? "text-white" : "text-primary-color-600"
                                    }`}
                                  >
                                    {item.week}
                                  </span>
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                  {item.title}
                                  {hoveredWeek === item.week && <ArrowRight className="w-4 h-4 text-primary animate-pulse" />}
                                </h3>
                                <p className="text-muted-foreground">{item.topics}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
            </section>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-16 bg-muted/30">
        <div className="container mx-auto sm:max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why Choose Our Training?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of professionals who have advanced their careers through our program
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {
              whyChooseUs?.map((item) => (
                <Card className="text-center border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  <CardHeader>
                    <div className="relative w-[70%] h-24 mx-auto mb-4 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt="Expert instructors"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Graduates Say</h2>
            <p className="text-xl text-gray-600">Success stories from our alumni working at top companies</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TestimonialCard 
                  name={testimonial.name}
                  role={testimonial.role}
                  content={testimonial.content}
                  rating={testimonial.rating}
                  image={testimonial.image}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Start Your BA Journey?</h2>
            <p className="text-xl text-gray-600">Fill out the form below to secure your spot in our next training batch</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <RegistrationForm courseInView="project management" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <img src={Logo} alt="Avenue Impact Logo" className="w-12 h-12 object-cover bg-white rounded-full p-1" />
              <p className="text-gray-400 mb-6">Empowering the next generation of Business Analysts with world-class training and mentorship.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#benefits" className="text-gray-400 hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#curriculum" className="text-gray-400 hover:text-white transition-colors">Curriculum</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#register" className="text-gray-400 hover:text-white transition-colors">Register Now</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">info@avenueimpact.com</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">+4480005410720</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">London, UK</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href={socialLinks.facebook}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CC1747] transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                                  <a
                    href={socialLinks.twitter}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CC1747] transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CC1747] transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CC1747] transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={socialLinks.tiktok}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CC1747] transition-colors"
                  >
                    <IoLogoTiktok className="h-5 w-5" />
                  </a>
                  <a
                    href={socialLinks.whatsapp}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CC1747] transition-colors"
                  >
                    <IoLogoWhatsapp className="h-5 w-5" />
                  </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Avenue Impact. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>

    <div 
    onClick={() => window.location.href = cpdLink}
    className="fixed bottom-20 right-3 h-16 w-16 cursor-pointer">
      <img src={cpdLogo} alt="CPD Certified Professional logo" className=' rounded-full ' />
    </div>
  </>);
}
