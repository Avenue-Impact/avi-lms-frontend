import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./pages.module.css";
import { CourseCardPreview, renderStars } from "../Components/CourseCard";
import joinTeam from "../assets/images/join_team.png";
import CourseCard from "../Components/CourseCard";
import ImageOverlay from "../Components/ImageOverlay";
import iconDark from "../assets/icons/icon-dark.png";
import AvenueList from "../Components/Assets/AvenueList";
import { FaRegCircleCheck } from "react-icons/fa6";

import {
  ProfessionalList,
  professionalItems,
  industriesItems,
} from "../Components/ProfessionalList";
import SocialMediaLinks, {
  socialMediaData,
} from "../Components/SocialMediaLink";
import { WhiteLogo } from "../Components/Logo";
import certificate from "../assets/images/certificate.png";
import professionalBG from "../assets/images/proffessional.png";
import AviNav from "../Components/avi/AviNav";
import { ScrollRestoration } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import Container from "@/Components/Container";

const PreviewCourse = ({ features }) => {
  const navigate = useNavigate();

  // Ensure features is defined, falling back to default courseFeatures
  const courseFeatures = features || [
    "18 hours on-demand video",
    "Access on mobile and TV",
    "Full lifetime access",
    "Certificate of completion",
  ];

  return (
    <>
      <ScrollRestoration />

      <div className="hidden lg:block">
        <AviNav />
      </div>

      {/* Search for more {`${styles.checkout_courses}`} #23314A courses */}
      <section>
        <div className={cn(styles.checkout_courses, "")}>
          <div className="lg:pt-10">
            <Container>
              <div
                className={`${styles.checkoutCoursesFlex} hidden py-4 lg:flex lg:py-4`}
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
            </Container>

            <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />

            <div className="bg-[#23314A] pb-10">
              {/* Back Button for Mobile View */}
              <Container>
                <div className="mb-4 flex items-center pt-9 lg:hidden">
                  <button
                    onClick={() => navigate("/avi")}
                    className="text-white"
                  >
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
                        <p>{renderStars()}</p>
                        <p>43,55</p>
                      </div>

                      <div className="text-white">
                        <p className="py-2 text-2xl">This course Includes:</p>
                        <ul className="m-0 list-none p-0">
                          {courseFeatures.map((feature, index) => (
                            <li key={index} className="mb-2">
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="mr-2"
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className={styles.project_consult1}>
                      <CourseCardPreview
                        imgSrc={joinTeam}
                        previewButtonText="Enroll now"
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
              <div
                className={`${styles.overviewCourses1} text-justify text-[#667185]`}
              >
                <p className="text-[24px] font-[300] capitalize lg:text-[40px]">
                  Overview
                </p>

                <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />

                <p className="pt-3 text-[16px] font-[300] lg:pt-9 lg:text-[18px]">
                  The 3.5 Months Project Consultant Training Programme (Bundle)
                  is a comprehensive and intensive course designed for aspiring
                  project consultants who aim to excel in the dynamic field of
                  project management. Scheduled to commence in May 2024, this
                  training programme equips participants with the essential
                  skills, knowledge, and hands-on experience necessary to thrive
                  as project consultants in various industries.
                </p>
              </div>

              <div className={`${styles.overviewCourses1} text-[#667185]`}>
                <p className="text-[24px] font-[300] lg:text-[40px]">
                  Tools and Technologies:
                </p>

                <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />

                <div className="pt-3 lg:pt-9">
                  <div
                    className={`${styles.AvenueList} flex items-start gap-4`}
                  >
                    <AvenueList
                      src={iconDark}
                      textColor={"#667185"}
                      className="text-[16px] font-[300] lg:text-[18px]"
                      imgClass={"self-start mt-[6px]"}
                    >
                      Mastery of project management software (e.g., MS Project,
                      Jira, Asana)
                    </AvenueList>
                  </div>

                  <div
                    className={`${styles.AvenueList} flex items-start gap-4`}
                  >
                    <AvenueList
                      src={iconDark}
                      textColor={"#667185"}
                      className="text-[16px] font-[300] lg:text-[18px]"
                    >
                      Data analysis and reporting tools
                    </AvenueList>
                  </div>

                  <div
                    className={`${styles.AvenueList} flex items-start gap-4`}
                  >
                    <AvenueList
                      src={iconDark}
                      textColor={"#667185"}
                      className="text-[16px] font-[300] lg:text-[18px]"
                    >
                      Emerging technologies in project management
                    </AvenueList>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit & Programme Highlights: */}

            <div className={`${styles.overviewFlex} py-8`}>
              <div
                className={`${styles.overviewCourses1} text-justify text-[#667185]`}
              >
                <p className="text-[24px] font-[300] capitalize lg:text-[40px]">
                  Benefit
                </p>

                <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />

                <div className="pt-3 lg:pt-9">
                  <div
                    className={`${styles.AvenueList} flex items-start gap-4`}
                  >
                    <AvenueList
                      src={iconDark}
                      textColor={"#667185"}
                      className="text-[16px] font-[300] lg:text-[18px]"
                      imgClass={"self-start mt-[6px]"}
                    >
                      <span className="font-[400]"> Career Advancement:</span>{" "}
                      Open doors to new career opportunities and promotions.
                    </AvenueList>
                  </div>

                  <div
                    className={`${styles.AvenueList} flex items-start gap-4`}
                  >
                    <AvenueList
                      src={iconDark}
                      textColor={"#667185"}
                      className="text-[16px] font-[300] lg:text-[18px]"
                      imgClass={"self-start mt-[6px]"}
                    >
                      <span className="font-[400]"> Industry Recognition:</span>{" "}
                      Gain credibility and recognition as a certified project
                      consultant.
                    </AvenueList>
                  </div>

                  <div
                    className={`${styles.AvenueList} flex items-start gap-4`}
                  >
                    <AvenueList
                      src={iconDark}
                      textColor={"#667185"}
                      className="text-[16px] font-[300] lg:text-[18px]"
                      imgClass={"self-start mt-[6px]"}
                    >
                      <span className="font-[400]">
                        Networking Opportunities:{" "}
                      </span>
                      Connect with peers, mentors, and industry experts.
                    </AvenueList>
                  </div>

                  <div className={`${styles.AvenueList} `}>
                    <AvenueList
                      src={iconDark}
                      textColor={"#667185"}
                      className="text-[16px] font-[300] lg:text-[18px]"
                      imgClass={"self-start mt-[6px]"}
                    >
                      <span className="font-[400]">Lifetime Access:</span>{" "}
                      Continue to access course materials and updates even after
                      the programme ends.
                    </AvenueList>
                  </div>
                </div>
              </div>

              {/* Programme Highlight */}

              <div className={`${styles.overviewCourses1} text-[#667185]`}>
                <p className="text-[24px] font-[300] capitalize lg:text-[40px]">
                  Programme Highlights:
                </p>

                <div className="mt-2 hidden h-[1px] w-full bg-[#C7D7F4] lg:block" />

                <div className="space-y-3 pt-3 lg:pt-9">
                  <div className="flex items-start">
                    <span className="mr-2 mt-1">
                      <FaRegCircleCheck />
                    </span>
                    <div className="grid flex-1 lg:grid-cols-[1fr_2fr]">
                      <p className="font-bold">Format:</p>
                      <p>Blended learning with online and in-person sessions</p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-start">
                    <span className="mr-2 mt-1">
                      <FaRegCircleCheck />
                    </span>
                    <div className="grid flex-1 lg:grid-cols-[1fr_2fr]">
                      <p className="font-semibold">Modules:</p>
                      <p>
                        Comprehensive coverage of project management principles,
                        methodologies, and tools
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-start">
                    <span className="mr-2 mt-1">
                      <FaRegCircleCheck />
                    </span>
                    <div className="grid flex-1 lg:grid-cols-[1fr_2fr]">
                      <p className="font-semibold">Expert Instructors:</p>
                      <p>
                        Learn from industry-leading professionals and
                        experienced consultants
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-start">
                    <span className="mr-2 mt-1">
                      <FaRegCircleCheck />
                    </span>
                    <div className="grid flex-1 lg:grid-cols-[1fr_2fr]">
                      <p className="font-semibold">Practical Experience:</p>
                      <p>
                        Real-world projects and case studies to apply learned
                        concepts
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-start">
                    <span className="mr-2 mt-1">
                      <FaRegCircleCheck />
                    </span>
                    <div className="grid flex-1 lg:grid-cols-[1fr_2fr]">
                      <p className="font-semibold">Certification:</p>
                      <p>
                        Earn a recognized certification upon successful
                        completion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
                <p className="text-left text-[14px] text-[#23314A] md:text-[24px] md:font-[300] lg:text-[40px]">
                  Checkout related courses
                </p>
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
                <CourseCard
                  imgSrc={joinTeam}
                  altText="joinTeam"
                  title={
                    <>
                      {" "}
                      Project Consultant <br /> Training Programme (Bundle)
                    </>
                  }
                  rating="4.3"
                  numRatings="45,345"
                  previewButtonText="Preview this course"
                />

                <CourseCard
                  imgSrc={joinTeam}
                  altText="joinTeam"
                  title={
                    <>
                      {" "}
                      Project Consultant <br /> Training Programme (Bundle)
                    </>
                  }
                  rating="4.3"
                  numRatings="45,345"
                  previewButtonText="Preview this course"
                />

                <CourseCard
                  imgSrc={joinTeam}
                  altText="joinTeam"
                  title={
                    <>
                      {" "}
                      Project Consultant <br /> Training Programme (Bundle)
                    </>
                  }
                  rating="4.3"
                  numRatings="45,345"
                  previewButtonText="Preview this course"
                />

                <CourseCard
                  imgSrc={joinTeam}
                  altText="joinTeam"
                  title={
                    <>
                      {" "}
                      Project Consultant <br /> Training Programme (Bundle)
                    </>
                  }
                  rating="4.3"
                  numRatings="45,345"
                  previewButtonText="Preview this course"
                />

                <CourseCard
                  imgSrc={joinTeam}
                  altText="joinTeam"
                  title={
                    <>
                      {" "}
                      Project Consultant <br /> Training Programme (Bundle)
                    </>
                  }
                  rating="4.3"
                  numRatings="45,345"
                  previewButtonText="Preview this course"
                />

                <CourseCard
                  imgSrc={joinTeam}
                  altText="joinTeam"
                  title={
                    <>
                      {" "}
                      Project Consultant <br /> Training Programme (Bundle)
                    </>
                  }
                  rating="4.3"
                  numRatings="45,345"
                  previewButtonText="Preview this course"
                />
              </div>
            </div>
          </Container>

          {/* Certificate */}
          <div className={`${styles.certificate_courses} pt-10`}>
            <Container>
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
            </Container>
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
            </div>
          </div>

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

export default PreviewCourse;
