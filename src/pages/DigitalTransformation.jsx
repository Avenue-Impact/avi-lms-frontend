import ImageHero from "../Components/ImageHero";
import img from "../assets/images/digital-hero.png";
import HeroHeading from "../Components/MainContent/HeroHeading";
import Card from "../Components/digital-transformation/Card";
import { digitalData } from "../assets/lib/data";
import ImpactCard from "../Components/digital-transformation/ImpactCard";
import DigitalSwiper from "@/Components/digital-transformation/DigitalSwiper";
import ServiceHeading from "@/Components/ServiceHeading";

const DigitalTransformation = () => {
  return (
    <>
      <ImageHero imageSrc={img} className={"items-end lg:items-start"}>
        <div className="mt-28">
          <div className="flex items-center gap-8 lg:my-20 2xl:mb-32 2xl:mt-[225px]">
            <div className="hidden h-[3px] w-36 bg-white lg:block" />
            <ServiceHeading className={"lg:w-[641px]"}>
              digital transformation
            </ServiceHeading>
          </div>
          <div className="mb-8 mt-6 block h-px w-full bg-white lg:hidden" />
          <p className="ml-auto mt-0 max-w-[45.375rem] text-base text-white md:text-lg lg:text-lg 2xl:text-2xl">
            <span className="font-medium">
              Navigating the Future with Avenue Impact Consulting
            </span>
            <span className="font-light italic">
              {" "}
              In the dynamic landscape of today, Digital Transformation is not
              merely a choice;{" it’s"} a necessity. Avenue Impact Consulting
              stands at the forefront of empowering organizations to embrace the
              future through comprehensive Digital Transformation Services
            </span>
          </p>
        </div>
      </ImageHero>
      <section className="px-0 py-24 lg:px-20">
        <h2 className="px-6 font-poppins text-[24px] font-[300] text-[#3A4C6C] md:text-3xl lg:px-0 lg:text-[40px]">
          Our Digital Transformation <br /> Offerings{" "}
        </h2>
        <div className="mt-10">
          <div className="hidden overflow-hidden md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {digitalData.map((item) => (
              <Card
                key={item.heading}
                heading={item.heading}
                className={"w-full"}
              >
                {item.lists.map((list, i) => (
                  <li key={i} className="ml-7 font-poppins text-lg 2xl:text-xl">
                    {list}
                  </li>
                ))}
              </Card>
            ))}
          </div>
          <DigitalSwiper data={digitalData} />
        </div>
      </section>
      <section className="md:px-20 md:py-24">
        <h2 className="text-center font-poppins text-[24px] font-light leading-9 text-[#3A4C6C] md:text-center lg:text-left lg:text-[40px]">
          Why Choose Avenue <br className="hidden md:block" /> Impact?
        </h2>
        <div className="mt-10 grid gap-0 md:grid-cols-2">
          <ImpactCard
            heading={"Expertise"}
            number={"01"}
            className={"bg-[#FAFCFF]"}
          >
            Our team comprises seasoned experts with a proven track record in
            facilitating successful digital transformations.
          </ImpactCard>
          <ImpactCard
            heading={"	Custom Solution"}
            number={"02"}
            className={"bg-[#fafcff80]"}
          >
            We recognize that each organization’s journey is unique. Our
            solutions are tailored to meet your specific challenges and
            aspirations.
          </ImpactCard>
          <ImpactCard
            heading={"	Result-Oriented Approach"}
            number={"03"}
            className={"bg-[#fafcff80]"}
          >
            We focus on delivering measurable results and tangible business
            outcomes through our digital transformation initiatives.
          </ImpactCard>
          <ImpactCard
            heading={"Collaboration"}
            number={"04"}
            className={"bg-[#FAFCFF]"}
          >
            Working closely with your teams ensures alignment between digital
            strategies and broader business objectives.
          </ImpactCard>
        </div>
      </section>
    </>
  );
};

export default DigitalTransformation;
