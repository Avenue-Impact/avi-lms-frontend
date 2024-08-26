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
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <>
      <AboutHero />

      <section>
        {/* Welcome to Avenue Impact! */}
        <div className={styles.content_avenue}>
          <section className="px-6 pt-10 lg:px-20 lg:pt-16 2xl:py-[100px]">
            <div className={styles.welcome_avenue}>

              <h2 className="text-[24px] font-[300] capitalize text-[#23314A] lg:text-[40px]">

                welcome to avenue impact
              </h2>
              <div className="mt-2 h-[1px] w-full bg-[#C7D7F4]" />
            </div>

            <div
              className={`${styles.welcome_avenue_flex} py-8 text-[14px] text-[#667185] lg:text-[18px]`}
            >
              <div className={styles.welcome_content}>
                <p className="2xl:text-xl 2xl:font-light">
                  Our mission is to provide customised solutions addressing
                  commercial, technical, and operational challenges, leading to
                  sustained profitability for businesses and end-users. We
                  provide customised solutions to address commercial, technical,
                  and operational challenges for sustained profitability.
                </p>
              </div>

              <div className={cn(styles.welcome_content)}>
                <p className="2xl:text-xl 2xl:font-light">
                  Our certified professionals cover various disciplines,
                  including Agile and Digital Business Analysis, Product
                  Management, Data Analytics, Power BI, Business Intelligence,
                  Digital Transformation, Data Management, Data Strategy,
                  Artificial Intelligence, Software Development, and more.
                </p>
              </div>

              <div className={styles.welcome_content}>
                <p className="2xl:text-xl 2xl:font-light">
                  We offer a comprehensive range of services backed by a
                  commitment to delivering exceptional results for our clients.
                </p>
              </div>
            </div>
          </section>

          <div className={`${styles.welcome_avenue_img} pb-10`}>
            <img src={AvenueImage} alt="" className="w-full" />
          </div>
        </div>

        {/* We are Experts in Career Mentoring */}
        <div className={styles.career_mentoring}>

          <section className="px-6 pt-10 lg:px-20 lg:pt-16 2xl:py-[100px]">

            <div className={styles.welcome_avenue}>
              <h2 className="text-[24px] font-[300] capitalize text-[#23314A] lg:text-[40px]">
                We are Experts in Career Mentoring
              </h2>
            </div>

            <div
              className={`${styles.career_mentoring_flex} py-8 text-[14px] text-[#667185] lg:text-[18px]`}
            >
              <div className={styles.career_content}>
                <p className="2xl:text-xl 2xl:font-light">
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
          </section>
        </div>

        {/* Skills */}
        <div className={styles.career_mentoring}>
          <section className="px-6 pt-10 lg:px-20 lg:pt-16">
            <div className={styles.welcome_avenue}>
              <h2 className="text-[24px] font-[300] capitalize text-[#23314A] lg:text-[40px]">
                Skills
              </h2>

            </div>

            <div className="py-2 lg:text-[20px] text-[16px]  text-[#667185]">

              <div className="mt-2 h-[1px] w-full bg-[#C7D7F4] 2xl:mb-3 2xl:mt-[18px]" />
            </div>

            <div className="text-[16px] text-[#667185] lg:text-[20px]">

              <p>Professional Training + Life Project Experience (Online)</p>

              <div className={styles.career_content}>
                <SliderImage />
              </div>
            </div>
          </section>
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
