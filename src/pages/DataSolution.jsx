import ImageHero from "../Components/ImageHero";
import HeroHeading from "../Components/MainContent/HeroHeading";
import img from "../assets/images/data-solution.jpg";
import arr from "../assets/images/arrow-down.png";
import Container from "../Components/Container";
import { solutions, strategies } from "../assets/lib/data";
import Slide from "../Components/data-solution/Slide";
import Swiper from "../Components/data-solution/Swiper";
import Accordion from "../Components/data-solution/Accordion";
// import VerticalAccordion from "../Components/veritical/VerticalAccordion";

const DataSolution = () => {
  return (
    <>
      <ImageHero imageSrc={img}>
        <div>
          <div>
            <div className="mt-32 flex items-center gap-8 lg:mt-16">
              <div className="hidden h-px w-36 bg-white lg:block" />
              <HeroHeading className="lg:text-[50px] text-[40px] leading-0">Data Solutions</HeroHeading>
            </div>
            <div className="mb-8 mt-4 block h-px w-full bg-white lg:hidden" />
            <ul className="ml-auto mt-0 max-w-[45.375rem] list-disc space-y-3 *:ml-6 *:font-poppins *:text-base *:font-light *:text-[#f4f5f7] *:md:text-xl lg:mt-32 *:lg:text-xl">
              <li>
                Discover how our tailored Data Management solutions can turn
                your data challenges into opportunities for growth and
                innovation
              </li>
              <li>
                Explore how our Data Analytics services can propel your
                organization forward
              </li>
              <li>
                Discover the transformative potential of Business Intelligence.
              </li>
            </ul>
          </div>
        </div>
      </ImageHero>
      <Container className="grid gap-16 md:grid-cols-2 lg:gap-28">
        <div>
            <h2 className="font-poppins lg:text-[35px] text-[24px] font-[300] leading-normal text-[#3A4C6C]">
              Data Management and Strategy Services
            </h2>
            <p className="my-6 font-poppins lg:text-[20px] text-[16px] text-[#667185]">
              Unlock the Power of Your Data with Avenue Impact Consulting
            </p>
            <p className="text-justify lg:text-[18px] text-[16px] font-poppins  text-[#667185]">
              In today’s data-centric landscape, effective Data Management and
              Strategy are not just advantageous—they’re imperative. At Avenue
              Impact Consulting, we bring unparalleled expertise to help you
              navigate the complexities of data, ensuring it becomes a strategic
              asset for your organization.
            </p>
        </div>
        <div className="flex items-end gap-4 align-baseline md:gap-0 lg:gap-4">
          <p className="font-poppins lg:text-[18px] text-[16px] text-[#667185]">
            Our Comprehensive Data Management and Strategy Offerings Include:
          </p>
          <img src={arr} alt="arrow down" className="w-9" />
        </div>
      </Container>
      <Accordion />
      {/* <VerticalAccordion /> */}
      <Container className="lg:text-center text-left">
        <h2 className="lg:text-[40px] text-[24px] font-[400] text-[#3A4C6C] ">
          Data Analytics Services
        </h2>
        <p className="mb-8 mt-4 font-poppins text-[#667185] font-[400] lg:text-[24px] text-[16px]">
          Transforming Raw Data into Actionable Insights
        </p>
        <p className="text-justify font-poppins text-[#667185] font-[400] md:text-center lg:text-[20px] text-[16px]">
          Avenue Impact Consulting is at the forefront of empowering
          organizations to leverage the full potential of their data through
          cutting-edge Data Analytics Services. From predictive modeling to
          advanced analytics, we deliver solutions that transform raw data into
          strategic insights, driving smarter business decisions.
        </p>
        <div className="m-auto my-10 flex max-w-[32.937rem] items-center gap-4">
          <p className="font-poppins  text-[#667185] lg:text-[24px] text-[16px]">
            Our Comprehensive Data Management and Strategy Offerings Include:
          </p>
          <img src={arr} alt="arrow down" className="w-9" />
        </div>
        <div className="hidden grid-cols-4 divide-x divide-[#667185] text-left *:px-10 *:text-[#667185] lg:grid">
          {solutions.map((solution) => (
            <Slide
              heading={solution.heading}
              text={solution.paragraph}
              key={solution.heading}
            />
          ))}
        </div>
        <div className="lg:hidden">
          <Swiper data={solutions} />
        </div>
      </Container>
      <Container className="text-center">
        <h2 className="lg:text-[35px] text-[24px] font-[300] text-[#3A4C6C] md:text-[2.5rem]">
          Business Intelligence Services
        </h2>
        <p className="mb-8 mt-4 font-poppins text-[#667185] font-[400] lg:text-[24px] text-[16px]">
          Empowering Decision-Making with Business Intelligence
        </p>
        <p className="text-justify font-poppins text-[#667185] md:text-center lg:text-[20px] text-[16px]">
          In the age of information, Business Intelligence (BI) is the key to
          staying ahead. Avenue Impact Consulting’s BI services are designed to
          transform data into actionable intelligence, empowering organizations
          to make data-driven decisions with confidence.
        </p>
        <div className="m-auto my-10 flex max-w-2xl items-center gap-4">
          <p className="font-poppins font-[400] lg:text-[24px] text-[16px] text-[#667185]">
            Our Business Intelligence Solutions Encompass
          </p>
          <img src={arr} alt="arrow down" className="w-9" />
        </div>
        <div className="hidden grid-cols-4 divide-x divide-[#667185] text-left *:px-10 *:text-[#667185] lg:grid">
          {strategies.map((strategy) => (
            <Slide
              heading={strategy.heading}
              text={strategy.paragraph}
              key={strategy.heading}
            />
          ))}
        </div>
        <div className="lg:hidden">
          <Swiper data={strategies} />
        </div>
      </Container>
    </>
  );
};

export default DataSolution;
