import React from "react";
import MainContent from "../Components/MainContent/MainContent";
import styles from "./pages.module.css";
import AvenueImage from "../assets/images/professional_man_woman.png";
import BulletList from "../Components/BulletList";
import SliderImage from "../Components/Slider/Slider"; // Ensure this path is correct
import AboutHero from "../Components/about/AboutHero";
import ImageOverlay from "../Components/ImageOverlay";
import GetInTouch from "../Components/GetInTouch/GetInTouch";
import AvenueList from "@/Components/Assets/AvenueList";

const About = () => {
  return (
    <>
      <AboutHero />

      <section>
        {/* Welcome to Avenue Impact! */}
        <div className={styles.content_avenue}>
          <div className="px-8 pt-10 lg:px-14 lg:pt-16">
            <div className={styles.welcome_avenue}>
              <h2 className=" lg:text-[40px] text-[24px] font-[300] capitalize text-[#23314A]">
                welcome to avenue impact
              </h2>
              <div className="mt-2 h-[1px] w-full bg-[#C7D7F4]" />
            </div>

            <div className={`${styles.welcome_avenue_flex} py-8 text-[#667185] lg:text-[18px] text-[14px]`}>
              <div className={styles.welcome_content}>
                <p>
                  Our mission is to provide customised solutions addressing
                  commercial, technical, and operational challenges, leading to
                  sustained profitability for businesses and end-users. We
                  provide customised solutions to address commercial, technical,
                  and operational challenges for sustained profitability.
                </p>
              </div>

              <div className={styles.welcome_content}>
                <p>
                  Our certified professionals cover various disciplines,
                  including Agile and Digital Business Analysis, Product
                  Management, Data Analytics, Power BI, Business Intelligence,
                  Digital Transformation, Data Management, Data Strategy,
                  Artificial Intelligence, Software Development, and more.
                </p>
              </div>

              <div className={styles.welcome_content}>
                <p>
                  We offer a comprehensive range of services backed by a
                  commitment to delivering exceptional results for our clients.
                </p>
              </div>
            </div>
          </div>

          <div className={`${styles.welcome_avenue_img} pb-10`}>
            <img src={AvenueImage} alt="" />
          </div>
        </div>

        {/* We are Experts in Career Mentoring */}
        <div className={styles.career_mentoring}>
          <div className="px-8 pt-10 lg:px-14 lg:pt-16">
            <div className={styles.welcome_avenue}>
              <h2 className="lg:text-[40px] text-[24px] font-[300] capitalize text-[#23314A]">
                We are Experts in Career Mentoring
              </h2>
              <div className="mt-2 h-[1px] w-full bg-[#C7D7F4]" />
            </div>

            <div className={`${styles.career_mentoring_flex} py-8 lg:text-[18px] text-[14px] text-[#667185]`}>
              <div className={styles.career_content}>
                <p>
                  With years of experience and a deep understanding of the job
                  market, our team of experts provides personalised career
                  mentoring to help individuals achieve their professional
                  goals. To access our expertise, individuals can choose from
                  the following options:
                </p>
              </div>

              <div className={styles.career_content}>
                <BulletList />
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className={styles.career_mentoring}>
          <div className="px-8 pt-10 lg:px-14 lg:pt-16">
            <div className={styles.welcome_avenue}>
              <h2 className="lg:text-[40px] text-[24px] font-[300]  capitalize text-[#23314A]">
                Skills
              </h2>
              <div className="mt-2 h-[1px] w-full bg-[#C7D7F4]" />
            </div>

            <div className="py-8 lg:text-[20px] text-[16px]  text-[#667185]">
              <p>Professional Training + Life Project Experience (Online)</p>

              <div className={styles.career_content}>
                <SliderImage />
              </div>
            </div>
          </div>
        </div>

        {/* Elevate YOur Business */}
        <ImageOverlay>
          <GetInTouch />
        </ImageOverlay>
      </section>
    </>
  );
};

export default About;
