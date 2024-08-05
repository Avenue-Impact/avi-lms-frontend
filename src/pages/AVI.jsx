import React, { useState } from "react";
// import MainContent from "../Components/MainContent/MainContent";
import AVIbg from "../assets/images/live_coaching.png";
import styles from "./pages.module.css";
import CourseCard from "../Components/CourseCard";
import joinTeam from "../assets/images/join_team.png";
import teamDiscussion from "../assets/images/team_discussion.png";
import certificate from "../assets/images/certificate.png";
import professionalBG from "../assets/images/proffessional.png";
import ImageOverlay from "../Components/ImageOverlay";
import { WhiteLogo } from "../Components/Logo";
import {
  ProfessionalList,
  professionalItems,
  industriesItems,
} from "../Components/ProfessionalList";
import SocialMediaLinks, {
  socialMediaData,
} from "../Components/SocialMediaLink";
import ColorHero from "../Components/ColorHero";
import AviNav from "../Components/avi/AviNav";
import { ScrollRestoration } from "react-router-dom";
import Modal from "./auth/components/Modal";
// import img from "../assets/images/data-solution.jpg";

const AVI = () => {
  const [showNav, setShowNav] = useState(true);
  return (
    <>
      <ScrollRestoration />
      <AviNav showNav={showNav} setShowNav={setShowNav} />
      <ColorHero />
      {/* {showNav && <Modal />} */}

      <section>
        {/* AVI IMAGE */}
        <div className={`${styles.AVI_img} py-14`}>
          <img src={AVIbg} alt="" className="w-full"/>
        </div>

        {/* Checkout our top courses */}
        <div className={styles.checkout_courses}>
          <div className="px-8 pt-10 lg:px-14 lg:py-4">
            <div className={styles.checkoutCoursesFlex}>
              <div className={styles.checkoutCourses1}>
                <p className="text-2xl font-normal capitalize text-[#23314A]">
                  Checkout our top courses
                </p>
              </div>
              <div className={styles.checkoutCourses2}>
                <span className={styles.searchLabel}>Search</span>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Search courses..."
                />
              </div>
            </div>

        <div className="mt-2 h-[1px] w-full bg-[#C7D7F4]" />

            <div className={`${styles.career_content} w-full py-8 text-[#667185] lg:w-1/2`}>
              <p>
                {" "}
                Discover our most popular courses, carefully curated to enhance
                your skills and advance your career. Join thousands of learners
                who have already taken the next step with Avenue Impact.
              </p>
            </div>

            {/* Preview this Course */}
            <div className={`${styles.previewCoursesFlex} overflow-visible`}>
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
                <h3 className="lg:text-[40px] text-[24px] leading-9 font-[300] capitalize text-[#3A4C6C]">
                  Enhance your team's skills <br /> with Avenue Impact Academy.
                </h3>
                <p className="text-justify py-7">
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
            <img src={professionalBG} alt="" className="w-full"/>
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

export default AVI;
