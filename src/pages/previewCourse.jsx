import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faArrowLeft, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./pages.module.css";
// import joinTeam from "../assets/video/homeBG.mp4";
import CourseCard from "../Components/CourseCard";
import ImageOverlay from "../Components/ImageOverlay";
import iconDark from "../assets/icons/icon-dark.png";
import AvenueList from "../Components/Assets/AvenueList";
import { FaRegCircleCheck } from "react-icons/fa6";

import ProfessionalList from "../Components/ProfessionalList";
import SocialMediaLinks, {
  socialMediaData,
} from "../Components/SocialMediaLink";
import { WhiteLogo } from "../Components/Logo";
import certificate from "../assets/images/certificate.png";
import professionalBG from "../assets/images/proffessional.png";
import AviNav from "../Components/avi/AviNav";
import { ScrollRestoration, useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { cn, formatDate } from "@/lib/utils";
import Container from "@/Components/Container";
import CourseCardPreview from "@/Components/CourseCardPreview";
import { industriesItems, professionalItems } from "@/lib/professionalItems";
import RenderStars from "@/Components/RenderStars";
import {
  useFetchAllCourses,
  usePreviewCourses,
} from "@/hooks/students/use-fetch-all-courses";
import { Skeleton } from "@/Components/ui/skeleton";
import Cookies from "js-cookie";
import { StarRating } from "@/Components/star-rating";
import { useFetchStudentsReviews } from "@/hooks/students/use-fetch-sstudent-reviews";
// import { demoCourses } from "./dashboard/DiscoverCourses";
import { DarkLogo } from "../Components/Logo";
import { useState } from "react";

const PreviewCourse = () => {
  const navigate = useNavigate();
  const { data, isLoading: isFetching } = useFetchAllCourses();

  const { courseId } = useParams();
  // const {
  //   data: fetchData,
  //   isLoading: isLoadingData,
  //   error,
  // } = useFetchStudentsReviews(courseId);

  const token = Cookies.get("token");

  const user = Boolean(token);

  // Use real API if not demo, else use demo data
  const { previewCourse, isLoading, error } = usePreviewCourses(courseId);

  const path = !user
    ? `/signup?id=${courseId}&title=${previewCourse?.data?.data.course.title}`
    : `/preview-video-course/${courseId}/enroll?title=${previewCourse?.data?.data.course.title}`;

  return (
    <>
      <ScrollRestoration />

      {!user && (
        <div className="hidden lg:block">
          <AviNav />
        </div>
      )}

      {/* Search for more {`${styles.checkout_courses}`} #23314A courses */}
      <section>
        <div className={cn(styles.checkout_courses, "")}>
          <div className="">
            {user && (
              <div className="hidden sml:block w-full pb-3 pt-3">
                <section className="w-[90%] mx-auto flex items-center justify-between">
                  <div>
                    <Link to="/" className="cursor-pointer">
                      <DarkLogo />
                    </Link>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`${styles.checkoutCourses1} hidden md:block`}>
                      <p className="font-normal text-[#23314A]">
                        Search for more courses
                      </p>
                    </div>
                    <div className={styles.checkoutCourses2}>
                      <input
                        type="text"
                        className={styles.inputField}
                        placeholder="Search courses..."
                      />
                    </div>
                  </div>
                </section>
                {/* Border Line */}
                <div className="hidden h-[1px] w-full bg-[#C7D7F4] lg:block mt-2 mb-0" />
              </div>
            )}

            <div className="bg-[#23314A] pb-1">
              {/* Back Button for Mobile View */}
              <div className="pt-4 pb-8 px-5">
                <div className="mb-4 flex items-center">
                  <button onClick={() => navigate(-1)} className="text-white hover:text-[#bebcbc]">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  </button>
                </div>

                {/* Project Consultant */}
                <div className={`${styles.project_consult} text-white`}>
                  <div
                    className={`grid gap-y-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr] lg:gap-8 lg:py-4`}
                  >
                    <div className={`${styles.project_consult1} lg:w-3/4`}>
                      <p className="text-[24px] font-normal lg:text-[40px]">
                        Project Consultant Training Programme (Bundle)
                      </p>

                      <div className="flex items-center py-2 text-lg">
                        <p>4.3</p>
                        <div>
                          <RenderStars />
                        </div>
                        <p>43,55</p>
                      </div>

                      <div className="text-white">
                        <p className="py-2 text-2xl">This course Includes:</p>
                        <ul className="m-0 list-none p-0">
                          {isLoading
                            ? "loading"
                            : previewCourse?.data?.data.course.course_includes.map(
                              (feature, index) => (
                                <li key={index} className="mb-2">
                                  <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="mr-2"
                                  />
                                  <span>{feature}</span>
                                </li>
                              ),
                            )}
                        </ul>
                      </div>
                    </div>

                    <div className={styles.project_consult1}>
                      <CourseCardPreview
                        imgSrc={previewCourse?.data?.data.course.cover_image}
                        previewButtonText={"Enroll now"}
                        path={path}
                        loading={isLoading}
                        courseId={previewCourse?.data?.data.course.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* overview */}
        <Container>
          <div className="pt-[50px]">
            <div className={styles.overviewFlex}>
              <Overview
                loading={isLoading}
                overview={previewCourse?.data?.data.course.overview}
              />

              <Tools
                tech={previewCourse?.data?.data.course.tools_and_technologies}
                loading={isLoading}
              />
            </div>

            <div className={`${styles.overviewFlex} py-8`}>
              {/* Benefit */}
              <Benefit
                benefits={previewCourse?.data?.data.course.benefits}
                loading={isLoading}
              />

              {/* Programme Highlight */}
              <ProgramHighlights
                programHighlights={
                  previewCourse?.data?.data.course.program_highlights
                }
                loading={isLoading}
              />
            </div>
          </div>
        </Container>

        {/* Checkout our top courses */}
        <div className={styles.checkout_courses}>
          <Container>
            <div className="pt-2 lg:py-0">
              <div
                className={cn(
                  styles.checkoutCourses1,
                  "mb-5 flex w-full items-center justify-between",
                )}
              >
                <div className="lg:w-full">
                  <p className="text-left text-[14px] text-[#23314A] md:text-[24px] md:font-[300] lg:text-[40px]">
                    Checkout related courses
                  </p>
                  <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />
                </div>

                <button className="rounded border border-tertiary-color-300 px-3 py-1 text-xs text-tertiary-color-700 md:hidden">
                  View all
                </button>
              </div>

              <div
                className={`${styles.career_content} hidden w-full py-3 text-[#667185] md:block lg:w-3/4 lg:py-8`}
              >
                <p className="leading-6">
                  {" "}
                  Discover our most popular courses, carefully curated to
                  enhance your skills and advance your career. Join thousands of
                  learners who have already taken the next step with Avenue
                  Impact
                </p>
              </div>

              {/* Preview this Course */}
              <div className="grid grid-cols-2 gap-5 md:gap-5 lg:grid-cols-4 lg:gap-[18.34px]">
                {isFetching ? (
                  <p>Loading...</p>
                ) : Array.isArray(data?.data?.data?.courses) && data.data.data.courses.length > 0 ? (
                  data.data.data.courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      imgSrc={course.cover_image}
                      altText="joinTeam"
                      title={course.title}
                      rating={course.average_rating ?? 0}
                      review={course.total_reviews}
                      path={`/preview-course/${course.id}`}
                    />
                  ))
                ) : (
                  <p>No related courses found.</p>
                )}
              </div>
            </div>
          </Container>

          {/* Review */}
          <Container>
            <div className="pt-10 lg:py-4">
              <div className={styles.certificateCourses1}>
                <p className="text-2xl font-normal capitalize text-[#23314A]">
                  Reviews:
                </p>
              </div>

              {isLoading ? (
                "Loading..."
              ) : error ? (
                <p>
                  {error?.response?.data?.message ?? "Something went wrong"}
                </p>
              ) : (
                <div className="w-full max-w-3xl space-y-6">
                  {previewCourse?.data?.data.course.reviews.length < 1 ? (
                    <p className="text-sm italic text-gray-400">
                      No reviews yet...
                    </p>
                  ) : (
                    previewCourse?.data?.data.course.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="rounded-lg bg-white p-4 shadow-md md:flex-row"
                      >
                        <div className="flex flex-row items-center justify-between">
                          {/* User Profile */}
                          <div className="flex flex-row gap-3">
                            <div className="flex-shrink-0">
                              <img
                                src={
                                  review?.user_id?.avatar ||
                                  "https://i.pravatar.cc/150?img=3"
                                }
                                alt="User Avatar"
                                className="h-12 w-12 rounded-full"
                              />
                            </div>

                            {/* Review Content */}
                            <div className="flex-1">
                              <h3 className="font-bold capitalize text-[#101928]">
                                {review.user_id?.firstname}{" "}
                                {review.user_id?.lastname}
                              </h3>
                              {/* Rating and Date */}
                              <div className="mt-1 flex items-center gap-2 text-yellow-500">
                                <span>
                                  {review.rating ? (
                                    <div className="text-yellow-500gap-[10px] flex items-center">
                                      <StarRating
                                        className="text-yellow-500"
                                        rating={review.rating}
                                      />
                                    </div>
                                  ) : (
                                    <p className="text-sm italic text-gray-400">
                                      No reviews available...
                                    </p>
                                  )}
                                </span>{" "}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          {/* Review Text */}
                          <p className="mt-2 text-justify text-[14px] text-[#667185]">
                            {review.content || (
                              <p className="text-sm italic text-gray-400">
                                No comment
                              </p>
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </Container>

          {/* Certificate */}
          <Container>
            <div className={`${styles.certificate_courses} pt-10`}>
              <div className="pt-10 lg:py-4">
                <div className={styles.certificateCourses1}>
                  <p className="text-2xl font-normal capitalize text-[#23314A]">
                    Certifications
                  </p>

                  <div className="mt-2 h-[1px] w-full bg-[#C7D7F4]" />
                  <p className="py-2 text-[#667185]">
                    Professional Training + Life Project Experience (Online)
                  </p>
                </div>
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
          </Container>

          {/* Our Certified Professionals */}
          <div className={styles.certified_pro}>
            <div className={styles.certified_img}>
              <img src={professionalBG} alt="" />
            </div>

            <ImageOverlay>
              <Container
                className={`${styles.certified_content} pt-10 lg:pt-[100px]`}
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
              </Container>
              <Container>
                <div className="px-8 text-white lg:flex lg:items-center lg:justify-between lg:px-8">
                  <div>
                    <SocialMediaLinks data={socialMediaData} />
                  </div>

                  <div className="py-3">
                    <small className="lg:text-lg">
                      © 2025 Avenue Impact Limited. All rights reserved
                    </small>
                  </div>

                  <WhiteLogo />
                </div>
              </Container>
            </ImageOverlay>
          </div>
        </div>
      </section>
    </>
  );
};

const Overview = ({ overview, loading }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.overviewCourses1} text-justify text-[#667185] mb-6`}>
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <p className="text-[24px] font-[300] capitalize lg:text-[40px]">
          Overview
        </p>
        <FontAwesomeIcon 
          icon={isExpanded ? faChevronUp : faChevronDown} 
          className="text-[#667185] text-lg"
        />
      </div>
      <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />

      {loading ? (
        <Skeleton className={"mt-2 h-[209px] w-full"} />
      ) : (
        <div className={`pt-3 lg:pt-9 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
          <p className="text-[16px] font-[300] lg:text-[18px]">
            {overview}
          </p>
        </div>
      )}
    </div>
  );
};

const ProgramHighlights = ({ programHighlights, loading }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.overviewCourses1} text-[#667185] mb-6`}>
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <p className="text-[24px] font-[300] capitalize lg:text-[40px]">
          Programme Highlights:
        </p>
        <FontAwesomeIcon 
          icon={isExpanded ? faChevronUp : faChevronDown} 
          className="text-[#667185] text-lg"
        />
      </div>
      <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />
      {loading ? (
        <Skeleton className={"mt-2 h-[209px] w-full"} />
      ) : (
        <div className={`pt-3 lg:pt-9 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
          {programHighlights.map((program_highlight, index) => (
            <div
              key={index}
              className={`${styles.AvenueList} flex items-start gap-4`}
            >
              <AvenueList
                src={iconDark}
                textColor={"#667185"}
                className="text-[16px] font-[300] lg:text-[18px]"
                imgClass={"self-start mt-[6px]"}
              >
                <ul>
                  <li className="list-none normal-case">{program_highlight}</li>{" "}
                </ul>
              </AvenueList>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Benefit = ({ benefits, loading }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.overviewCourses1} text-justify text-[#667185] mb-6`}>
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <p className="text-[24px] font-[300] capitalize lg:text-[40px]">
          Benefit
        </p>
        <FontAwesomeIcon 
          icon={isExpanded ? faChevronUp : faChevronDown} 
          className="text-[#667185] text-lg"
        />
      </div>

      <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />
      {loading ? (
        <Skeleton className={"mt-2 h-[209px] w-full"} />
      ) : (
        <div className={`pt-3 lg:pt-9 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`${styles.AvenueList} flex items-start gap-4`}
            >
              <AvenueList
                src={iconDark}
                textColor={"#667185"}
                className="text-[16px] font-[300] lg:text-[18px]"
                imgClass={"self-start mt-[6px]"}
              >
                <ul>
                  <li className="list-none normal-case">{benefit}</li>{" "}
                </ul>
              </AvenueList>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Tools = ({ tech, loading }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.overviewCourses1} text-[#667185] mb-6`}>
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <p className="text-[24px] font-[300] lg:text-[40px]">
          Tools and Technologies:
        </p>
        <FontAwesomeIcon 
          icon={isExpanded ? faChevronUp : faChevronDown} 
          className="text-[#667185] text-lg"
        />
      </div>

      <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />
      {loading ? (
        <Skeleton className={"mt-2 h-[209px] w-full"} />
      ) : (
        <div className={`pt-3 lg:pt-9 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
          {tech.map((tool_and_technology, index) => (
            <div
              key={index}
              className={`${styles.AvenueList} flex items-start gap-4`}
            >
              <AvenueList
                src={iconDark}
                textColor={"#667185"}
                className="text-[16px] font-[300] lg:text-[18px]"
                imgClass={"self-start mt-[6px]"}
              >
                <ul>
                  <li className="list-none normal-case">
                    {tool_and_technology}
                  </li>{" "}
                </ul>
              </AvenueList>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviewCourse;
