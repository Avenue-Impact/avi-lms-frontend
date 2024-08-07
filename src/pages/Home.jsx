import img1 from "../assets/images/slider-img1.png";
import img2 from "../assets/images/slider-img2.png";
import img3 from "../assets/images/slider-img3.png";
import img4 from "../assets/images/slider-img4.png";
import card from "../assets/images/card-img.png";
import card2 from "../assets/images/card-img_2.png";
import card3 from "../assets/images/card-img_3.png";
import professional from "../assets/images/proffessional.png";
import group from "../assets/images/big-team.png";
import MainContent from "../Components/MainContent/MainContent";
import AvenueList from "../Components/Assets/AvenueList";
import iconLight from "../assets/icons/icon.png";
import iconDark from "../assets/icons/icon-dark.png";
import ImageOverlay from "../Components/ImageOverlay";
import Button from "../Components/Button";
import slider1 from "../assets/images/slider-pic1.png";
import slider2 from "../assets/images/slider-pic2.png";
import slider3 from "../assets/images/slider-pic3.png";
import slider4 from "../assets/images/slider-pic4.png";
import HeroHeading from "../Components/MainContent/HeroHeading";
import Container from "../Components/Container";
import ImageSwiper from "../Components/home/ImageSwiper";
import Avenue from "../Components/AvenueImpact/Avenue";

const Home = () => {
  return (
    <>
      <MainContent />
      <section className="bg-[#f4f5f7] py-12 text-center">
        <div className="px-6">
          <h2 className="mb-4 text-center text-2xl font-light capitalize text-[#23314A] md:text-3xl 2xl:text-[40px]">
            we deliver real results
          </h2>
          <p className="m-auto max-w-3xl text-base text-[#23314A] md:text-xl">
            Our seasoned consultants bring a wealth of experience from serving a
            diverse range of government and private sector clients.
          </p>
        </div>
        <div className="mt-6 overflow-x-hidden">
          <ImageSwiper slideDesk={7} slideMobile={4}>
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
            <img src={img4} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
            <img src={img4} alt="" />
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
            <img src={img4} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
            <img src={img4} alt="" />
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
            <img src={img4} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
            <img src={img4} alt="" />
          </ImageSwiper>
        </div>
      </section>
      <Container>
        <section className="grid gap-3 font-[300] md:grid-cols-2 2xl:gap-0">
          <h2 className="text-[24px] text-[#23314A] lg:text-[40px] 2xl:w-[558px]">
            Avenue Impact Empowers Your Business Growth
          </h2>
          <p className="text-justify text-[#667185] md:text-xl lg:text-[20px]">
            Whether you are looking to expand into new markets, streamline
            operations, or simply need support navigating {"today's"} complex
            business landscape, we are here to help. Let us help you grow your
            business and achieve your full potential.
          </p>
        </section>
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* <img src={card} alt="" />
					<img src={card} alt="" />
					<img src={card} alt="" /> */}
          <Avenue
            number={1}
            heading={"Analysis"}
            text={
              "The first step in our services is to work closely with you to understand your business needs and goals."
            }
            img={card2}
          />
          <Avenue
            number={2}
            heading={"Providing Tailored Solutions"}
            text={
              "Next, we will provide customi- sed solutions that are specifically designed to drive growth and success."
            }
            img={card3}
          />
          <Avenue
            number={3}
            heading={"Implementation"}
            text={
              "The final step in our services is to provide support during the implementation process."
            }
            img={card}
          />
        </div>
      </Container>

      <img src={group} alt="" className="w-full" />

      <div>
        <ImageOverlay>
          <Container className="z-50">
            <h3 className="mb-8 text-[24px] font-light text-[#f4f5f7] lg:text-[40px]">
              Our certified professionals in various disciplines
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-[] lg:space-x-[34px]">
              <div className="space-y-3">
                <AvenueList src={iconLight} textColor={"#f4f5f7"}>
                  Agile and Digital Business Analysis{" "}
                </AvenueList>
                <AvenueList src={iconLight} textColor={"#f4f5f7"}>
                  Product Management{" "}
                </AvenueList>
                <AvenueList src={iconLight} textColor={"#f4f5f7"}>
                  Data Analytics
                </AvenueList>
                <AvenueList src={iconLight} textColor={"#f4f5f7"}>
                  Power BI{" "}
                </AvenueList>
                <AvenueList src={iconLight} textColor={"#f4f5f7"}>
                  Business Intelligence{" "}
                </AvenueList>
                <AvenueList src={iconLight} textColor={"#f4f5f7"}>
                  Software Development{" "}
                </AvenueList>
              </div>
              <div className="space-y-3">
                <AvenueList src={iconLight} textColor={"#f4f5f7"}>
                  Digital Transformation Solution{" "}
                </AvenueList>
                <AvenueList src={iconLight} textColor={"#f4f5f7"}>
                  Cyber Security{" "}
                </AvenueList>
                <AvenueList src={iconLight} textColor={"#f4f5f7"}>
                  Data Management{" "}
                </AvenueList>
                <AvenueList src={iconLight} textColor={"#f4f5f7"}>
                  Data Strategy{" "}
                </AvenueList>
                <AvenueList src={iconLight} textColor={"#f4f5f7"}>
                  Artificial Intelligence{" "}
                </AvenueList>
                <AvenueList src={iconLight} textColor={"#f4f5f7"}>
                  Cloud Computing and more{" "}
                </AvenueList>
              </div>
            </div>
          </Container>
        </ImageOverlay>
      </div>
      <img
        src={professional}
        alt="people sitting round a table"
        className="w-full"
      />
      <Container className="bg-#f4f5f7">
        <div className="ml-auto max-w-4xl">
          <h3 className="mb-4 text-[24px] font-light text-[#23314A] lg:text-[40px]">
            Industries we serve
          </h3>
          <div className="flex flex-wrap items-center justify-between gap-3 lg:gap-0 lg:space-x-[34px]">
            <div className="space-y-3 text-[26px] lg:text-[24px]">
              <AvenueList src={iconDark} textColor={"#667185"}>
                Business Transormation & Advisory{" "}
              </AvenueList>
              <AvenueList src={iconDark} textColor={"#667185"}>
                Turnaround, Stability & Restructuring Transaction
              </AvenueList>
              <AvenueList src={iconDark} textColor={"#667185"}>
                Valuation & Financial Advisory Services
              </AvenueList>
              <AvenueList src={iconDark} textColor={"#667185"}>
                Dispute Advisory
              </AvenueList>
              <AvenueList src={iconDark} textColor={"#667185"}>
                Tax Services
              </AvenueList>
            </div>
            <div className="space-y-3">
              <AvenueList src={iconDark} textColor={"#667185"}>
                Healthcare
              </AvenueList>
              <AvenueList src={iconDark} textColor={"#667185"}>
                Financial Services
              </AvenueList>
              <AvenueList src={iconDark} textColor={"#667185"}>
                Technology
              </AvenueList>
              <AvenueList src={iconDark} textColor={"#667185"}>
                Automotive
              </AvenueList>
              <AvenueList src={iconDark} textColor={"#667185"}>
                Oil & Gas
              </AvenueList>
            </div>
          </div>
        </div>
      </Container>
      <ImageOverlay>
        <Container>
          <HeroHeading>
            <span className={"text-[40px] font-[300] lg:text-[80px]"}>
              Ready to Connect with an Expert at Avenue Impact?
            </span>
          </HeroHeading>
          <p className="mb-10 mt-3 font-poppins text-[14px] font-[300] text-[#f4f5f7] lg:max-w-3xl lg:text-[24px]">
            Receive bespoke support from our experienced consultants and elevate
            your business to new heights.
          </p>

          <Button>Contact Us</Button>
        </Container>
      </ImageOverlay>
      <Container>
        <div className="grid gap-3 gap-y-6 md:grid-cols-2">
          <h3 className="text-[24px] text-[#23314A] lg:text-[40px]">
            About Avenue Impact
          </h3>

          <p className="text-justify text-[14px] text-[#667185] lg:text-[18px]">
            Our drive is to make a noticeable difference in everything we
            undertake. At Avenue Impact, our focus is on supporting established
            and growing companies in the best possible way. Our team of business
            and technology consultants provides expert advice and hands-on
            support tailored to meet your specific needs. Our objective is to
            deliver customized solutions that tackle commercial, technical, and
            operational challenges, leading to long-term success for your
            business and its customers.
          </p>
        </div>
        <div className="mt-6">
          <ImageSwiper slideMobile={1.3} slideDesk={2.2}>
            <img
              src={slider1}
              alt=""
              className="mx-3 block rounded-tl-3xl rounded-tr-3xl px-2"
            />
            <img
              src={slider2}
              alt=""
              className="mx-3 block rounded-tl-3xl rounded-tr-3xl px-2"
            />
            <img
              src={slider3}
              alt=""
              className="mx-3 block rounded-tl-3xl rounded-tr-3xl px-2"
            />
            <img
              src={slider4}
              alt=""
              className="mx-3 block rounded-tl-3xl rounded-tr-3xl px-2"
            />
          </ImageSwiper>
        </div>
      </Container>
    </>
  );
};

export default Home;
