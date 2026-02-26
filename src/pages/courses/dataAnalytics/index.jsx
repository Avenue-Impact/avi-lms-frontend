import { useState, useEffect } from 'react';
import { Clock, Users, Award, Briefcase, Check, ArrowRight, Star, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Database, BarChart3, Code, FileSpreadsheet, TrendingUp, Target, BookOpen, Users2, GraduationCap, Building2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { CountdownTimer } from '../businessAnalysis/components/CountdownTimer';
import { FeatureCard } from '../businessAnalysis/components/FeatureCard';
import { TestimonialCard } from '../businessAnalysis/components/TestimonialCard';
import { RegistrationForm } from './components/RegistrationForm';
import Logo from '../../../assets/images/aviLogo.png';
import cpdLogo from '../../../assets/images/cpd.jpeg'
import { socialLinks } from '../../../utils/socialLinks';
import { IoLogoTiktok, IoLogoWhatsapp } from 'react-icons/io5';
import dataOne  from "../../../assets/images/Data-First.jpeg";
import dataTwo  from "../../../assets/images/Data-Second.jpeg";
import dataThree  from "../../../assets/images/Data-Third.jpeg";
import dataFour  from "../../../assets/images/Data-Fourth.jpeg";
import group from "../../../assets/images/big-team.jpg";

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
export default function DataAnalytics() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEarlyBird, setIsEarlyBird] = useState(false);
  
  const programStartDate = new Date('2026-09-08T00:00:00');
  const earlyBirdEndDate = new Date('2026-08-25T23:59:59');

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
      icon: Database,
      title: 'Live Classes',
      description: 'Interactive sessions with industry experts in real-time',
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100'
    },
    {
      icon: BarChart3,
      title: 'Real Case Studies',
      description: 'Work with actual business data and real-world scenarios',
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100'
    },
    {
      icon: Code,
      title: 'Hands-on Projects',
      description: 'Build portfolio-worthy projects using industry tools',
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100'
    },
    {
      icon: FileSpreadsheet,
      title: 'CV Development',
      description: 'Professional resume building and career guidance',
      iconColor: 'text-yellow-600',
      iconBgColor: 'bg-yellow-100'
    },
    {
      icon: Target,
      title: 'Interview Preparation',
      description: 'Mock interviews and technical assessment practice',
      iconColor: 'text-red-600',
      iconBgColor: 'bg-red-100'
    },
    {
      icon: Award,
      title: 'Global Certificate',
      description: 'Earn a globally recognised certificate of completion',
      iconColor: 'text-indigo-600',
      iconBgColor: 'bg-indigo-100'
    }
  ];

  const courseOutline = [
    {
      title: 'Excel',
      description: 'Advanced Excel functions, pivot tables, data analysis, and automation',
      icon: FileSpreadsheet,
      color: 'bg-green-500'
    },
    {
      title: 'SQL',
      description: 'Database queries, data manipulation, and complex analytics',
      icon: Database,
      color: 'bg-blue-500'
    },
    {
      title: 'Power BI',
      description: 'Data visualization, dashboard creation, and business intelligence',
      icon: BarChart3,
      color: 'bg-yellow-500'
    },
    {
      title: 'Tableau',
      description: 'Advanced data visualization and interactive dashboards',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Introduction to Python',
      description: 'Python basics for data analysis and automation',
      icon: Code,
      color: 'bg-indigo-500'
    },
    {
      title: 'Data Lake',
      description: 'Big data storage, processing, and analytics platforms',
      icon: Database,
      color: 'bg-red-500'
    },
    {
      title: 'Snowflake',
      description: 'Cloud data warehouse and advanced analytics',
      icon: Building2,
      color: 'bg-cyan-500'
    }
  ];

  const targetAudience = [
    {
      icon: GraduationCap,
      title: 'Entry Level Professionals',
      description: 'Start your data career with no prior experience needed'
    },
    {
      icon: Users2,
      title: 'Career Switchers',
      description: 'Transition from any field into data analytics'
    },
    {
      icon: Briefcase,
      title: 'Data Professionals',
      description: 'Enhance your analytical skills with modern tools'
    },
    {
      icon: BookOpen,
      title: 'Recent Graduates',
      description: 'Kickstart your career with in-demand data skills'
    },
    {
      icon: Target,
      title: 'Entrepreneurs & Startups',
      description: 'Make data-driven decisions for your business growth'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Data Analyst at TechCorp',
      content: "I joined Avenue Impact's Data Analytics program with zero experience. The hands-on projects and real case studies helped me build a strong portfolio. Within 3 months of completion, I landed a role as a Data Analyst with a 40% salary increase.",
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Business Intelligence Developer',
      content: "As a career switcher from marketing, I was worried about the technical aspects. But the program was perfectly structured for beginners. The live classes and 1-on-1 mentorship made all the difference. Now I'm working as a BI Developer!",
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    {
      name: 'David Kim',
      role: 'Data Scientist at FinTech',
      content: "The comprehensive curriculum covering Excel to Python and modern tools like Snowflake gave me the exact skills employers are looking for. The interview preparation sessions were invaluable - I aced every technical interview!",
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
  ];

  const cpdLink = `https://www.cpduk.co.uk/providers/avenue-impact`

  return (
    <>
      <Poppins />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-poppins">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-2 text-sm">
          <div className="flex items-center whitespace-nowrap max-w-[100vw] overflow-x-auto hideScrollBar">
            <Clock className="h-4 w-4 mr-2" />
            <span>Next Data Analytics Training Starts March 16 - Secure Your Spot Now!</span>
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
            <img src={Logo} alt="" className="w-12 h-12 object-cover" />
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
      <section className="relative bg-gradient-to-br from-[#1E2A3F] to-[#2D3748] text-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${dataOne})`, filter: 'blur(3px) brightness(0.7)' }}></div>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 flex flex-col items-center justify-center min-h-[70vh]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg"
            >
              <span className="block text-white">Data Analytics</span>
              <span className="block text-blue-400">& Business Intelligence, Get Certified
                <span 
                  onClick={() => window.location.href = cpdLink}
                  className="text-[#CC1747] cursor-pointer text-2xl italic ml-2 align-middle"
                  // title="View CPD Certification"
                >
                  (CPD)
                </span>
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-2xl text-gray-200 mb-4 max-w-2xl mx-auto font-medium"
            >
              Master the tools, skills, and mindset to launch or accelerate your career in data analytics. No experience needed.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-blue-200 mb-8 max-w-2xl mx-auto"
            >
              Live classes, real case studies, hands-on projects, CV & interview prep, and a global certificate.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Next Start Date</h3>
                <p className="text-blue-400 font-bold">March 16, 2026</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow">
                <div className="flex items-center justify-center mb-3">
                  <Calendar className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Duration</h3>
                <p className="text-green-400 font-bold">4 Months</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow">
                <div className="flex items-center justify-center mb-3">
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Live Classes</h3>
                <p className="text-purple-400 font-bold">Interactive Sessions</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a 
                href="#register"
                className="bg-[#CC1747] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#B31442] transition-colors flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                Enroll Now
                <ArrowRight className="h-5 w-5" />
              </a>
              <a 
                href="#curriculum"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                View Curriculum
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Why Choose Our Data Analytics Program?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Comprehensive training designed to launch your data career with practical skills and industry tools
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Analysis Image: User with Chart */}
      <section className="relative w-full py-0">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
          alt="User analyzing data charts on a computer"
          className="w-full h-[60vh] md:h-[80vh] object-cover"
        />
        {/* Black transparent overlay */}
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="backdrop-blur-md bg-white/40 rounded-xl shadow-xl px-8 py-6 flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow">Next Cohort Starts In</h3>
            <CountdownTimer targetDate={new Date('2026-09-08T00:00:00')} />
            <span className="mt-2 text-base text-white font-medium">March 16, 2026</span>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Course Curriculum
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Master the essential tools and technologies used in modern data analytics
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseOutline.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Who Should Attend?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Perfect for anyone looking to start or advance their career in data analytics
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {targetAudience.map((audience, index) => {
              const IconComponent = audience.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{audience.title}</h3>
                  <p className="text-gray-600">{audience.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Analysis Image 3: Analytics Teamwork */}
      <section className="py-0">
        <img
          src={group}
          alt="Team collaborating on data analytics with charts and laptops"
          className="w-full h-[60vh] md:h-[80vh] object-cover shadow-xl"
        />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Success Stories
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Hear from our graduates who have successfully transitioned into data analytics careers
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 bg-gradient-to-br from-[#1E2A3F] to-[#2D3748] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Start Your Data Analytics Journey?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Join our next cohort and transform your career with in-demand data skills
            </motion.p>
            
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <img src={Logo} alt="" className="w-12 h-12 object-cover bg-white rounded-full p-1" />
              <p className="text-gray-400 mb-6">Empowering the next generation of Data Analysts with world-class training and mentorship.</p>
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

      {/* CPD Logo - Fixed Position */}
      <div 
        onClick={() => window.location.href = cpdLink}
        className="fixed bottom-20 right-3 h-16 w-16 cursor-pointer z-50"
      >
        <img src={cpdLogo} alt="CPD Certified" className="rounded-full shadow-lg hover:shadow-xl transition-shadow" />
      </div>
    </>
  );
} 