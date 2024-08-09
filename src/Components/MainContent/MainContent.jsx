import React from "react";
import "./MainContent.css";
import bgVideo from "../../assets/video/homeBG.mp4";
import Hero from "../Hero";
import HeroHeading from "./HeroHeading";
// import arrow from "../../assets/images/arrow-up.png";
import Button from "../Button";
const MainContent = () => {
  return (
    <Hero videoSrc={bgVideo} className={"items-center pb-12"}>
      <div className="mt-32 h-fit lg:mt-28">
        <HeroHeading className={"font leading-snug 2xl:w-[1060px]"}>
          Expert Consultants for Sustainable Success
        </HeroHeading>

        <div className="my-4 h-[2px] w-full bg-white md:mb-5 md:mt-14" />

        <div className="grid gap-y-6 lg:grid-cols-[5fr_1fr]">
          <p className="text-justify font-[300] text-white md:text-left md:text-xl lg:text-xl 2xl:w-[1034px] 2xl:text-2xl">
            We provide customized solutions to address commercial, technical,
            and operational challenges for sustained profitability. Our
            certified professionals cover various disciplines, including Product
            Management, Data Analytics, and more.
          </p>
          <Button className={"2xl:w-[200px]"} hover={true}>
            Contact Us
          </Button>
        </div>
      </div>
    </Hero>
  );
};

export default MainContent;
