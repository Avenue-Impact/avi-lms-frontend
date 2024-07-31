import Hero from "../Hero";
import HeroHeading from "../MainContent/HeroHeading";
import bgVideo from "../../assets/video/about-bg.mp4";

const AboutHero = () => {
  return (
    <Hero videoSrc={bgVideo} className={""}>
      <div className="flex h-full">
        <div className="h-max justify-self-end align-bottom">
          <HeroHeading>About Us</HeroHeading>

          <div className="mb-4 mt-10 h-[1px] w-full bg-white md:mb-6 md:mt-16" />

          <div className="">
            <p className="lg:text-[18px] text-[14px] text-base font-light text-white md:text-left">
              We are a highly dedicated team of business and technology
              consultants offering expert guidance and practical support to
              established and growing companies.
            </p>
          </div>
        </div>
      </div>
    </Hero>
  );
};

export default AboutHero;
