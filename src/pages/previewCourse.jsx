import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
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

const PreviewCourse = () => {
  const navigate = useNavigate();
  const { data, isLoading: isFetching } = useFetchAllCourses();

  const { courseId } = useParams();

  const token = Cookies.get("token");

  const user = Boolean(token);

  const { previewCourse, isLoading } = usePreviewCourses(courseId);
  const path = !user
    ? "/signup"
    : `/preview-video-course/${courseId}/enroll?title=${previewCourse?.data?.data.course.title}`;
  console.log("previewCourse", previewCourse);

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
          <div className="lg:pt-5">
            <Container className="hidden lg:block">
              <div
                className={`${styles.checkoutCoursesFlex} py-4 lg:flex lg:py-4`}
              >
                <div className={`${styles.checkoutCourses1} hidden sm:block`}>
                  <p className="text-2xl font-normal text-[#23314A]">
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
              <div className="hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />
            </Container>

            <div className="bg-[#23314A] lg:pb-10">
              {/* Back Button for Mobile View */}
              <Container>
                <div className="mb-4 flex items-center lg:hidden lg:pt-9">
                  <button onClick={() => navigate(-1)} className="text-white">
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
                      />
                    </div>
                  </div>
                </div>
              </Container>
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
                ) : (
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
                )}
              </div>
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
                      © 2024 Avenue Impact Limited. All rights reserved
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
  return (
    <div className={`${styles.overviewCourses1} text-justify text-[#667185]`}>
      <p className="text-[24px] font-[300] capitalize lg:text-[40px]">
        Overview
      </p>
      <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />

      {loading ? (
        <Skeleton className={"mt-2 h-[209px] w-full"} />
      ) : (
        <p className="pt-3 text-[16px] font-[300] lg:pt-9 lg:text-[18px]">
          {overview}
        </p>
      )}
    </div>
  );
};

const ProgramHighlights = ({ programHighlights, loading }) => {
  return (
    <div className={`${styles.overviewCourses1} text-[#667185]`}>
      <p className="text-[24px] font-[300] capitalize lg:text-[40px]">
        Programme Highlights:
      </p>
      <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />
      {loading ? (
        <Skeleton className={"mt-2 h-[209px] w-full"} />
      ) : (
        <div className="pt-3 lg:pt-9">
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
  return (
    <div className={`${styles.overviewCourses1} text-justify text-[#667185]`}>
      <p className="text-[24px] font-[300] capitalize lg:text-[40px]">
        Benefit
      </p>

      <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />
      {loading ? (
        <Skeleton className={"mt-2 h-[209px] w-full"} />
      ) : (
        <div className="pt-3 lg:pt-9">
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
  return (
    <div className={`${styles.overviewCourses1} text-[#667185]`}>
      <p className="text-[24px] font-[300] lg:text-[40px]">
        Tools and Technologies:
      </p>

      <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />
      {loading ? (
        <Skeleton className={"mt-2 h-[209px] w-full"} />
      ) : (
        <div className="pt-3 lg:pt-9">
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
