// import MainContent from "../Components/MainContent/MainContent";
import React, { useState } from "react";
import { ScrollRestoration } from "react-router-dom";
import certificate from "../assets/images/certificate.png";
import teamDiscussion from "../assets/images/enhacing_team.png";
import CourseCard from "../Components/CourseCard";
import styles from "./pages.module.css";
import { useFetchAllCourses } from "@/hooks/students/use-fetch-all-courses";
import CreatedCourseCard from "@/Components/admindashboard/course-management/CreatedCourseCard";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
// import img from "../assets/images/data-solution.jpg";
import HeroImg from "../assets/imgs/Union.svg";
import InfoGrid from "../Components/InfoGrid";
import AVIFooter from "../Components/AVIFooter";
import ReferralToast from "../Components/ReferralToast";
import { certifiedProfessionals, industriesServed } from "@/lib/aviPageData";
import { Search } from "lucide-react";

const AVI = () => {
  const [showToast, setShowToast] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <>
      <ScrollRestoration />
      {showToast && <ReferralToast onTimeout={() => setShowToast(false)} />}
      {/* <ColorHero /> */}

      {/* Checkout our top courses */}
      <div className={styles.checkout_courses}>
        <div className="px-8 pt-10 lg:px-14 lg:py-4">
          <section className="mb-10 grid-cols-2 items-center gap-8 md:gap-16 lg:grid">
            <div>
              <h1 className="text-3xl capitalize sm:text-5xl md:text-8xl">
                Checkout our top courses
              </h1>
              <p className="py-10 text-lg font-thin text-black sm:text-2xl">
                Discover our most popular courses, carefully curated to enhance
                your skills and advance your career. Join thousands of learners
                who have already taken the next step with Avenue Impact.
              </p>
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
            <div className="relative">
              <img src={HeroImg} alt="" className="w-full object-cover" />
              <div className="absolute right-[5%] top-[13%] h-10 w-10 rounded-full bg-[#D50241] sm:top-0 sm:h-14 sm:w-14 md:right-[35%]" />
              <div className="absolute bottom-[44%] left-[-18px] h-10 w-10 rounded-full bg-[#FFB8CD] sm:left-0 sm:h-14 sm:w-14 md:bottom-[45%]" />
              <div className="absolute bottom-0 left-[32%] h-10 w-10 rounded-full bg-[#14345F] sm:h-14 sm:w-14 md:left-[35%]" />
            </div>
          </section>

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
            <div className="mb-4 max-w-4xl pt-4 sm:mb-2">
              <h1 className="text-center text-2xl capitalize sm:text-start sm:text-3xl md:text-5xl">
                Checkout related courses
              </h1>
              <p className="py-2 text-center text-base font-extralight text-black sm:py-6 sm:text-start sm:text-2xl">
                Discover our most popular courses, carefully curated to enhance
                your skills and advance your career. Join thousands of learners
                who have already taken the next step with Avenue Impact
              </p>
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
    </>
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
