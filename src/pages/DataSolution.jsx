import ImageHero from "../Components/ImageHero";
import HeroHeading from "../Components/MainContent/HeroHeading";
import img from "../assets/images/data-solution.jpg";
import arr from "../assets/images/arrow-down.png";
import Container from "../Components/Container";
import { solutions, strategies } from "../assets/lib/data";
import Slide from "../Components/data-solution/Slide";
import Swiper from "../Components/data-solution/Swiper";
import AccordionSlide from "@/Components/data-solution/AccordionSlide";
import AccordionSlider from "@/Components/data-solution/AccordionSlider";

const DataSolution = () => {
  return (
    <>
      <ImageHero imageSrc={img} className={"items-end lg:items-start"}>
        <div className="">
          <div>
            <div className="flex items-center gap-8 lg:mt-24 2xl:mt-[225px]">
              <div className="hidden h-[3px] w-36 bg-white lg:block" />
              <HeroHeading className="text-[40px] lg:text-[50px]">
                Data Solutions
              </HeroHeading>
            </div>
            <div className="mb-8 mt-6 block h-[2px] w-full bg-white lg:hidden" />
            <ul className="ml-auto mt-0 max-w-[45.375rem] list-disc space-y-6 *:ml-6 *:font-poppins *:text-base *:font-light *:text-[#f4f5f7] *:md:text-xl lg:mt-28 lg:space-y-9 lg:leading-[36px] *:lg:text-xl 2xl:mt-[180px] *:2xl:text-2xl">
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
          <h2 className="font-poppins text-[24px] font-[300] leading-normal text-[#3A4C6C] lg:text-[35px] lg:leading-[35px] 2xl:text-[40px] 2xl:leading-[40px]">

            Data Management and Strategy Services
          </h2>
          <p className="my-6 font-poppins text-[16px] leading-[36px] text-[#667185] lg:text-[20px] 2xl:text-2xl">
            Unlock the Power of Your Data with Avenue Impact Consulting
          </p>
          <p className="text-justify font-poppins text-[16px] text-[#667185] lg:text-[18px] 2xl:w-[544px]">
            In today’s data-centric landscape, effective Data Management and
            Strategy are not just advantageous—they’re imperative. At Avenue
            Impact Consulting, we bring unparalleled expertise to help you
            navigate the complexities of data, ensuring it becomes a strategic
            asset for your organization.
          </p>
        </div>
        <div className="flex items-end gap-4 align-baseline md:gap-0 lg:gap-4">
          <p className="font-poppins text-[16px] leading-[24px] text-[#667185] lg:text-[18px] 2xl:text-2xl 2xl:leading-[36px]">
            Our Comprehensive Data Management and Strategy Offerings Include:
          </p>
          <img src={arr} alt="arrow down" className="w-9" />
        </div>
      </Container>
      <AccordionSlider />
      {/* <VerticalAccordion /> */}
      <Container className="text-left lg:text-center">
        <h2 className="text-[24px] font-[400] text-[#3A4C6C] lg:text-[40px] 2xl:font-light">
          Data Analytics Services
        </h2>
        <p className="mb-8 mt-4 font-poppins text-[16px] font-[400] text-[#667185] lg:text-[24px]">
          Transforming Raw Data into Actionable Insights
        </p>
        <p className="text-justify font-poppins text-[16px] font-[400] leading-6 text-[#667185] md:text-center lg:text-[20px] lg:leading-[30px]">
          Avenue Impact Consulting is at the forefront of empowering
          organizations to leverage the full potential of their data through
          cutting-edge Data Analytics Services. From predictive modeling to
          advanced analytics, we deliver solutions that transform raw data into
          strategic insights, driving smarter business decisions.
        </p>
        <div className="m-auto my-10 flex max-w-[32.937rem] items-center gap-4">
          <p className="font-poppins text-[16px] text-[#667185] lg:text-[24px]">
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
        <h2 className="text-[24px] font-[300] text-[#3A4C6C] md:text-[2.5rem] lg:text-[40px] 2xl:text-[40px] 2xl:leading-[40px]">
          Business Intelligence Services
        </h2>
        <p className="mb-8 mt-4 font-poppins text-[16px] font-[400] text-[#667185] lg:text-[24px]">
          Empowering Decision-Making with Business Intelligence
        </p>
        <p className="text-justify font-poppins text-[16px] text-[#667185] md:text-center lg:text-[20px]">
          In the age of information, Business Intelligence (BI) is the key to
          staying ahead. Avenue Impact Consulting’s BI services are designed to
          transform data into actionable intelligence, empowering organizations
          to make data-driven decisions with confidence.
        </p>
        <div className="m-auto my-10 flex max-w-2xl items-center gap-4">
          <p className="font-poppins text-[16px] font-[400] text-[#667185] lg:text-[24px]">
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
