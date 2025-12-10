// import MainContent from "../Components/MainContent/MainContent";
import React from 'react';
import { industriesItems, professionalItems } from "@/lib/professionalItems";
import { ScrollRestoration } from "react-router-dom";
import certificate from "../assets/images/certificate.png";
import joinTeam from "../assets/images/join_team.png";
import AVIbg from "../assets/images/pexels-divinetechygirl-1181304.jpg";
import professionalBG from "../assets/images/proffessional.png";
import teamDiscussion from "../assets/images/team_discussion.png";
import ColorHero from "../Components/ColorHero";
import CourseCard from "../Components/CourseCard";
import ImageOverlay from "../Components/ImageOverlay";
import { WhiteLogo } from "../Components/Logo";
import ProfessionalList from "../Components/ProfessionalList";
import SocialMediaLinks, {
  socialMediaData,
} from "../Components/SocialMediaLink";
import styles from "./pages.module.css";
import { useFetchAllCourses } from "@/hooks/students/use-fetch-all-courses";
import CreatedCourseCard from "@/Components/admindashboard/course-management/CreatedCourseCard";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
// import img from "../assets/images/data-solution.jpg";
import HeroImg from "../assets/imgs/Union.svg";
import { Search } from 'lucide-react';

const AVI = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <>
      <ScrollRestoration />
      {/* <ColorHero /> */}

            {/* Checkout our top courses */}
      <div className={styles.checkout_courses}>
        <div className="px-8 pt-10 lg:px-14 lg:py-4">
          <section className="lg:grid grid-cols-2 items-center md:gap-16 gap-8 mb-10">
            {/* <div className={styles.checkoutCoursesFlex}>
              <div className={styles.checkoutCourses1}>
                <div className="bg-[#ddd] relative h-16">
                  <p className="sm:text-3xl text-2xl bg-primary py-3 shadow-xl mt-2 ml-2 w-full absolute px-4 font-medium capitalize text-white">
                    Checkout our top courses
                  </p>
                </div>
              </div>
              <div className={styles.checkoutCourses2}>
                <span className={styles.searchLabel}>Search</span>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div
              className={`${styles.career_content} w-full py-8 text-[#667185] lg:w-1/2 mt-0`}
            >
              <p className="sm:text-2xl text-xl">
                {" "}
                Discover our most popular courses, carefully curated to enhance
                your skills and advance your career. Join thousands of learners
                who have already taken the next step with Avenue Impact.
              </p>
            </div> */}
            <div>
              <h1 className=' capitalize md:text-8xl sm:text-5xl text-3xl'>Checkout our top courses</h1>
              <p className="sm:text-2xl font-thin text-lg text-black py-10">
                Discover our most popular courses, carefully curated to enhance
                your skills and advance your career. Join thousands of learners
                who have already taken the next step with Avenue Impact.
              </p>
              <button className="md:flex hidden items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
                <Search />
                <input
                  type="text"
                  className="border-none outline-none p-2"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </button>
            </div>
            <div className='relative'>
              <img 
                src={HeroImg} 
                alt="" 
                className='w-full object-cover'
              />
              <div className='h-14 w-14 absolute top-0 right-[35%] bg-[#D50241] rounded-full'/>
              <div className='h-14 w-14 absolute left-0 bottom-[45%] bg-[#FFB8CD] rounded-full'/>
              <div className='h-14 w-14 absolute bottom-0 left-[35%] bg-[#14345F] rounded-full'/>
            </div>
          </section>

          <div className="flex md:hidden items-center gap-2 border border-gray-300 rounded-full py-1 px-4 my-4">
            <Search />
            <input
              type="text"
              className="border-none outline-none p-2"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Preview this Course */}
          <AllCourses searchQuery={searchQuery} />
          {/* Enhance your team's skills */}
          <div className={`${styles.team_skills} py-24`}>
            <div className={styles.team_skills_img}>
              <img
                className="w-full sm:w-full md:w-full lg:w-3/4"
                src={teamDiscussion}
                alt="teamDiscussion"
              />
            </div>

            <div className={styles.team_skills_content}>
              <h3 className="text-[24px] font-[300] capitalize leading-9 text-[#3A4C6C] lg:text-[40px]">
                Enhance your team&apos;s skills <br /> with Avenue Impact
                Academy.
              </h3>
              <p className="py-7 text-justify">
                {" "}
                Gain unlimited access to over 25,000 top courses anytime,
                anywhere. Discover our international course collection
                available in 14 languages and earn premier certifications in
                technology and business.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section>
        {/* AVI IMAGE */}
        <div className={`${styles.AVI_img} py-14`}>
          <img src={AVIbg} alt="" className="w-full sm:h-[800px] h-[400px] object-cover object-bottom" />
        </div>

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
        <div className={styles.certified_pro}>
          <div className={styles.certified_img}>
            <img src={professionalBG} alt="" className="w-full" />
          </div>

          <ImageOverlay>
            <div
              className={`${styles.certified_content} px-8 pt-10 lg:px-14 lg:py-8`}
            >
              <div className="justify-between font-extralight text-white lg:flex lg:text-lg">
                <ProfessionalList
                  title="Our certified professionals in various disciplines"
                  items={professionalItems}
                  className="pt-6 lg:pt-0"
                />
                <ProfessionalList
                  title="Industries we serve"
                  items={industriesItems}
                  className="pt-6 lg:pt-0"
                />
              </div>
            </div>

            <div className="px-8 py-10 text-white lg:flex lg:items-center lg:justify-between lg:px-14 lg:py-8">
              <div>
                <SocialMediaLinks data={socialMediaData} />
              </div>

              <div className="py-3">
                <small className="lg:text-lg">
                  © 2024 Avenue Impact Limited. All rights reserved
                </small>
              </div>

              <WhiteLogo />
            </div>
          </ImageOverlay>
        </div>
      </section>
    </>
  );
};

const AllCourses = ({ searchQuery = '' }) => {
  const { data, isLoading, error } = useFetchAllCourses();
  
  // Filter courses based on search query
  const filteredCourses = React.useMemo(() => {
    if (!data?.data?.data?.courses) return [];
    
    const query = searchQuery.toLowerCase();
    return data.data.data.courses.filter(course => 
      course.title.toLowerCase().includes(query) ||
      (course.description?.toLowerCase().includes(query) ?? false)
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