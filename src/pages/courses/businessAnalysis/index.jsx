import { useState, useEffect } from 'react';
import { Clock, Users, Award, Briefcase, Check, ArrowRight, Star, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { CountdownTimer } from './components/CountdownTimer';
import { FeatureCard } from './components/FeatureCard';
import { TestimonialCard } from './components/TestimonialCard';
import { RegistrationForm } from './components/RegistrationForm';
import Logo from '../../../assets/images/aviLogo.png';
import cpdLogo from '../../../assets/images/cpd.jpeg'
import { socialLinks } from '../../../utils/socialLinks';
import { IoLogoTiktok, IoLogoWhatsapp } from 'react-icons/io5';

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
export default function BusinessAnalysis() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEarlyBird, setIsEarlyBird] = useState(false);
  
  const programStartDate = new Date('2026-02-16T00:00:00');
  const earlyBirdEndDate = new Date('2026-01-31T23:59:59');

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
      role: 'Business Analyst at TechCorp',
      content: "I joined Avenue Impact in February 2022 and completed in July 2022. With the knowledge and experience I gained, I was able to secure an offer that comes with tier 2 visa sponsorship. Avenue Impact really made an impact on my whole life, not only my career.",
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Edward George',
      role: 'Senior BA at FinTech Solutions',
      content: "I started working as a Business Analyst after months of intense training and a live project I took at Avenue Impact. I got  £50,000 per annum with a Tier 2 visa certificate of sponsorship offer. I'm sorted and settled in the UK now. Avenue Impact transformed my life and career.",
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/39.jpg'
    },
    {
      name: 'Melissa Berry',
      role: 'Product Owner at HealthTech',
      content: "As a working mom, I was looking for an opportunity that would allow me to balance work and play my role as a mom. So, I made the decision and contacted Avenue Impact. With zero knowledge, I took their BA training and have been working as a business analyst since then, which I fell in love with totally because it's a dream come true for me.",
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/36.jpg'
    }
  ];

  const cpdLink = `https://www.cpduk.co.uk/providers/avenue-impact`

//   Live training

// Self-directed study

// 1:1 mentorship

  return (
    <>
      <Poppins />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-poppins">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-2 text-sm">
          <div className="flex items-center whitespace-nowrap max-w-[100vw] overflow-x-auto hideScrollBar">
            <Clock className="h-4 w-4 mr-2" />
            <span>Next BA Training Starts October 20th - Secure Your Spot Now!</span>
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
      <section className="relative bg-gradient-to-br from-[#1E2A3F] to-[#1E2A3F] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070')] bg-cover bg-center"></div>
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
              Master Business Analysis
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
              Join our upcoming BA Training. Get mentorship, skills & a pathway to global jobs.
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Curriculum Overview</h2>
            <p className="text-xl text-gray-600">Master the essential skills that top companies are looking for</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Business analysis tools and charts"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Stakeholder Management",
                  description: "Learn to identify, engage, and manage stakeholders effectively",
                },
                {
                  title: "Agile & Scrum Principles",
                  description: "Master modern project management methodologies",
                },
                {
                  title: "Process Modelling & Analysis",
                  description: "Analyze and optimize business processes for efficiency",
                },
                {
                  title: "Requirements Gathering & Documentation",
                  description: "Capture and document business requirements accurately",
                },
                {
                  title: "Industry Tools Mastery",
                  description: "Hands-on training with Jira, Confluence, Lucidchart, MS Visio",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#CC1747] to-[#CC1747] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
      <img src={cpdLogo} alt="cpdLogo" className=' rounded-full ' />
    </div>
  </>);
}
