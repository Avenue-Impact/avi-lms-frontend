// import MainContent from "../Components/MainContent/MainContent";
import React, { useState } from "react";
import FloatingWhatsApp from "@/Components/FloatingWhatsApp";
import { ScrollRestoration, Link, NavLink } from "react-router-dom";
import certificate from "../assets/images/certificate.png";
import teamDiscussion from "../assets/images/enhacing_team.png";
import CourseCard from "../Components/CourseCard";
import styles from "./pages.module.css";
import { useFetchAllCourses } from "@/hooks/students/use-fetch-all-courses";
import CreatedCourseCard from "@/Components/admindashboard/course-management/CreatedCourseCard";
import { motion } from "framer-motion";
import { ImArrowUpRight2 } from "react-icons/im";
// import img from "../assets/images/data-solution.jpg";
import HeroImg from "../assets/imgs/Union.svg";
import InfoGrid from "../Components/InfoGrid";
import AVIFooter from "../Components/AVIFooter";
import ReferralToast from "../Components/ReferralToast";
import { certifiedProfessionals, industriesServed } from "@/lib/aviPageData";
import { Search } from "lucide-react";
import heroCollabImg from "../assets/images/hero-collab.jpg";
import darkLogo from "../assets/logo/logo.svg";

/* ─────────────────────────────────────────
   Hero Section
───────────────────────────────────────── */
const HeroSection = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideImages = [
    heroCollabImg,
    "/images/andreea-avramescu-wR56AUlEsE4-unsplash.jpg",
    "/images/herlambang-tinasih-gusti-3kc_75Rdgyk-unsplash.jpg",
    "/images/projectMHero.jpg"
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative block min-h-screen bg-[#ffffff] pb-[18px] font-sans sm:min-h-[calc(100vh-250px)]">
      {/* ── Two-column body ── */}
      <div className="grid grid-cols-1 items-center gap-[36px] px-[24px] pt-[40px] md:px-[40px] md:pt-[64px] lg:grid-cols-[1.2fr_1.2fr] lg:gap-[40px]">
        {/* Left column */}
        <div className="flex w-full flex-col items-start">
          <h1 className="mb-[20px] text-[clamp(45px,4vw,70px)] font-normal leading-[1.15] tracking-[-0.02em] text-[#1a2340]">
            Welcome to Our
            <br />
            Digital Learning
            <br />
            Hub
          </h1>
          <p className="mb-[32px] max-w-[440px] text-[16px] sm:text-lg font-normal leading-[1.7] text-[#666]">
            Streamline learning, simplify management, and scale knowledge with a
            platform built for modern education.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('courses-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center rounded-[999px] bg-[#CC1747] px-[32px] py-[14px] text-[15px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#a8103a]"
          >
            Explore Live Courses
          </button>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-[16px] ">
          {/* Image Slider */}
          <div className="relative aspect-square w-full overflow-hidden rounded-[20px] sm:max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-420px)] bg-gray-100">
            {slideImages.map((slide, index) => (
              <img
                key={index}
                src={slide}
                alt={`Digital Learning Hub Slide ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}
          </div>

          {/* Action cards */}
          <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2">
            <Link
              to="/partner"
              className="relative flex min-h-[70px] flex-row items-center justify-between overflow-hidden rounded-[12px] bg-[#CC1747] px-[16px] py-[10px] text-white no-underline transition-all duration-200 hover:-translate-y-[2px] hover:bg-[#a8103a]"
            >
              <span className="text-[18px] font-semibold leading-[1.3] text-white">
                Refer a Friend
              </span>
              <span className="text-[28px] font-bold text-white opacity-90">
                <ImArrowUpRight2 />
              </span>
            </Link>
            <Link
              to="/self-pace"
              className="relative flex min-h-[70px] flex-row items-center justify-between overflow-hidden rounded-[12px] bg-[#CC1747] px-[16px] py-[10px] text-white no-underline transition-all duration-200 hover:-translate-y-[2px] hover:bg-[#a8103a]"
            >
              <span className="text-[18px] font-semibold leading-[1.3] text-white">
                Self-Paced Learning
              </span>
              <span className="text-[28px] font-bold text-white opacity-90">
                <ImArrowUpRight2 />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const AVI = () => {
  const [showToast, setShowToast] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <div className="sm:mx-10">
      <ScrollRestoration />
      {/* {showToast && <ReferralToast onTimeout={() => setShowToast(false)} />} */}

      {/* Hero Section */}
      <HeroSection />

      {/* Checkout our top courses */}
      <div id="courses-section" className={styles.checkout_courses}>
        <div className="px-8 pt-10 lg:px-14 lg:py-4">
          <div className="my-4 flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1 md:hidden">
            <Search />
            <input
              type="text"
              className="border-none p-2 outline-none"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-4 w-full pt-4 sm:mb-2">
              <div className="flex w-full items-center justify-between">
                <h1 className="text-center text-2xl capitalize sm:text-start sm:text-3xl md:text-5xl">
                  Checkout related courses
                </h1>

                <button className="hidden items-center gap-2 rounded-full border border-gray-300 px-4 py-2 md:flex">
                  <Search />
                  <input
                    type="text"
                    className="border-none p-2 outline-none"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </button>
              </div>
              <div className="max-w-4xl">
                <p className="py-2 text-center text-base font-extralight text-black sm:py-6 sm:text-start sm:text-2xl">
                  Discover our most popular courses, carefully curated to
                  enhance your skills and advance your career. Join thousands of
                  learners who have already taken the next step with Avenue
                  Impact
                </p>
              </div>
            </div>

            {/* Preview this Course */}
            <AllCourses searchQuery={searchQuery} />
          </div>
        </div>
      </div>

      <section className="w-full bg-white py-10 lg:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col overflow-hidden lg:flex-row">
          {/* Text Content Block */}
          <div className="flex flex-1 flex-col justify-center bg-[#1a365d] p-8 md:p-16 lg:p-24">
            <h2 className="text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
              Enhance your team&apos;s skills <br className="hidden md:block" />
              with Avenue Impact Academy.
            </h2>

            <p className="mt-4 text-base font-extralight leading-relaxed text-blue-50/90 md:text-lg">
              Gain unlimited access to over 25,000 top courses anytime,
              anywhere. Discover our international course collection available
              in 14 languages and earn premier certifications in technology and
              business.
            </p>
          </div>

          {/* Image Block */}
          <div className="flex-1">
            <img
              className="h-full min-h-[550px] w-full object-cover"
              src={teamDiscussion}
              alt="Team collaborating in a modern office"
            />
          </div>
        </div>
      </section>

      <section>
        {/* Certificate */}
        <div className={styles.certificate_courses}>
          <div className="px-8 pt-10 lg:px-14 lg:py-4">
            <div className={styles.certificateCourses1}>
              <p className="text-2xl font-normal capitalize text-[#23314A]">
                Certifications
              </p>

              <div className="mt-2 h-[1px] w-full bg-[#C7D7F4]" />
              <p className="py-2 text-[#667185]">
                Professional Training + Life Project Experience (Online)
              </p>
            </div>

            {/* Preview this Course */}
            <div className={`${styles.previewCoursesFlex} py-8`}>
              <div>
                <img src={certificate} alt="" />
              </div>
              <div>
                <img src={certificate} alt="" />
              </div>
              <div>
                <img src={certificate} alt="" />
              </div>
              <div>
                <img src={certificate} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Our Certified Professionals */}
        <div className="bg-white">
          <InfoGrid
            title="Our certified professionals in various disciplines"
            description="Our diverse network of certified professionals brings together specialist knowledge and real-world experience to address your unique challenges with precision"
            items={certifiedProfessionals}
          />

          <div className="mx-auto my-10 max-w-[1440px] px-4 md:px-8 lg:px-14">
            <hr className="border-gray-200" />
          </div>

          <InfoGrid
            title="Industries we serve"
            description="Our expertise spans multiple industries, enabling us to address unique challenges and create value where it matters most."
            items={industriesServed}
            showDividers={true}
          />
        </div>
      </section>

      <AVIFooter />
      <FloatingWhatsApp />
    </div>
  );
};

const AllCourses = ({ searchQuery = "" }) => {
  const { data, isLoading, error } = useFetchAllCourses();

  // Filter courses based on search query
  const filteredCourses = React.useMemo(() => {
    if (!data?.data?.data?.courses) return [];

    const query = searchQuery.toLowerCase();
    return data.data.data.courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        (course.description?.toLowerCase().includes(query) ?? false),
    );
  }, [data, searchQuery]);

  if (isLoading)
    return (
      <div className={`${styles.previewCoursesFlex} overflow-visible`}>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className={`${styles.previewCoursesFlex} overflow-visible`}>
        <p>{error?.response?.data?.message ?? "Something went wrong"}</p>
      </div>
    );

  if (filteredCourses.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-gray-500">No courses found matching your search.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.previewCoursesFlex} overflow-visible`}>
      {filteredCourses.map((course) => (
        <CourseCard
          key={course.id}
          imgSrc={course.cover_image}
          altText={course.title}
          title={course.title}
          rating={course.average_rating ?? 0}
          review={course.total_reviews}
          path={`/courses/landing-page/c/${course.id}`}
        />
      ))}
    </div>
  );
};

export default AVI;
