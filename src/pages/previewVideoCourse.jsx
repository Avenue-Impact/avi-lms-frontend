import React, { useState } from "react";
import styles from "./pages.module.css";
import ImageOverlay from "../Components/ImageOverlay";
import { PreviewVideoSelect } from "./auth/components/DashSelect";
import PreviewCourseVideo from "../assets/video/aca3d49307cab662ec1e91becdd52cb4-720p-preview.mp4";
import SocialMediaLinks, {
  socialMediaData,
} from "../Components/SocialMediaLink";
import { WhiteLogo } from "../Components/Logo";
import { PreviewVideoNav } from "../Components/avi/AviNav";
import { ScrollRestoration } from "react-router-dom";
import { cn } from "@/lib/utils";
import Container from "@/Components/Container";
import DashButton from "./auth/ButtonDash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import DiscoverCourses from "../pages/dashboard/DashboardDiscover";

const PreviewVideoCourse = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <ScrollRestoration />

      <div className="hidden lg:block">
        <PreviewVideoNav />
      </div>

      <section>
        <div className={cn(styles.checkout_courses, "")}>
          <div className="lg:pt-5">
            <div className="bg-[#23314A] lg:pb-10">
              <Container>
                <div className="mb-4 flex items-center lg:hidden lg:pt-9">
                  <button
                    onClick={() => navigate("/avi")}
                    className="text-white"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  </button>
                </div>

                <div className="mx-auto flex flex-col items-center justify-center lg:text-center">
                  <p className="pb-6 text-[24px] font-[300] text-[white] lg:text-[40px]">
                    Project Consultant Training Programme (Bundle)
                  </p>

                  <video
                    src={PreviewCourseVideo}
                    controls
                    className="h-auto w-full shadow-lg lg:rounded-3xl"
                  ></video>
                </div>
              </Container>
            </div>
          </div>
        </div>

        <Container>
          <div className="lg:pt-[50px]">
            <p className="text-left text-[24px] text-[#23314A] md:text-[24px] md:font-[300] lg:text-[40px]">
              Choose Your Learning Preference
            </p>

            <div className="w-full grid-cols-12 gap-6 rounded-lg border-gray-100 bg-white pt-4 lg:grid lg:border-2 lg:p-8">
              <div className="col-span-5 mb-4 md:mb-0">
                <h3 className="text-[20px] font-[400] text-gray-800 lg:text-[24px]">
                  Live session + Mentoring (May Cohorts - 3.5 Months Programme)
                </h3>

                <div className="py-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-[25px] font-[600] text-gray-800">
                      Price £2,200
                    </h3>
                    <p className="text-[20px] font-[400] line-through">
                      £39,900
                    </p>
                    <p className="font-[bold] text-[13.42px] text-gray-500">
                      85% off
                    </p>
                  </div>
                  <p className="mt-2 text-gray-600">
                    Every Monday to Friday 7PM
                  </p>
                </div>

                <div className="">
                  <p className="font-[600] text-gray-600">Select Cohort</p>
                  <PreviewVideoSelect />
                </div>

                <div className="mt-6 space-y-2">
                  <p className="font-semibold">Enter a promo code</p>
                  <div className="flex">
                    <input
                      type="text"
                      className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                      placeholder="Promo code"
                    />
                    <DashButton className="rounded-none rounded-r-sm px-4 py-2 text-white">
                      Apply
                    </DashButton>
                  </div>
                </div>

                <div className="grid w-full grid-cols-12 gap-3 py-4">

                  <Link className="col-span-10 mt-4 text-center rounded  transition duration-300  bg-[#CC1747] text-white hover:bg-[#B3123F] " to={"/dashboard/Dashboard_Discover"}>
                        <DashButton  className=" text-white bg-transparent hover:bg-transparent" >
                          Make Payment
                        </DashButton>
                    </Link>


                  <div className="col-span-2 pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-[1px]"
                      style={{ borderColor: "#CC1747" }}
                    >
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="text-[#CC1747]"
                        style={{ borderColor: "#CC1747" }}
                      />
                    </div>
                  </div>

                </div>
              </div>

              <div className="mb-4 flex h-full items-center justify-center text-justify md:mb-0 lg:flex-col">
                <div className="h-[1px] w-full bg-gray-300 lg:h-full lg:w-[1px]"></div>
                <div className="text-gray-300">OR</div>
                <div className="h-[1px] w-full bg-gray-300 lg:h-full lg:w-[1px]"></div>
              </div>

              <div className="col-span-5 mb-4 md:mb-0">
                <h3 className="text-[20px] font-[400] text-gray-800 lg:text-[24px]">
                  On Demand Course (Pre Recorded Session)
                </h3>

                {/* Radio Button */}
                <div className="space-y-1 py-6">
                  <label className="flex items-center space-x-2 rounded border border-gray-300 px-4 py-3">
                    <input
                      type="radio"
                      name="subscription"
                      value="one-month"
                      checked={selectedOption === "one-month"}
                      onChange={handleOptionChange}
                      className="form-radio text-primary-color-600"
                    />
                    <span>One Month Access - £100</span>
                  </label>

                  <label className="flex items-center space-x-2 rounded border border-gray-300 px-4 py-3">
                    <input
                      type="radio"
                      name="subscription"
                      value="three-months"
                      checked={selectedOption === "three-months"}
                      onChange={handleOptionChange}
                      className="form-radio text-primary-color-600"
                    />
                    <span>3 Months Access - £200</span>
                  </label>

                  <label className="flex items-center space-x-2 rounded border border-gray-300 px-4 py-3">
                    <input
                      type="radio"
                      name="subscription"
                      value="six-months"
                      checked={selectedOption === "six-months"}
                      onChange={handleOptionChange}
                      className="form-radio text-primary-color-600"
                    />
                    <span>6 Months Access - £400</span>
                  </label>

                  <label className="flex items-center space-x-2 rounded border border-gray-300 px-4 py-3">
                    <input
                      type="radio"
                      name="subscription"
                      value="annual"
                      checked={selectedOption === "annual"}
                      onChange={handleOptionChange}
                      className="form-radio text-primary-color-600"
                    />
                    <span>Annual Year Subscription - £1600</span>
                  </label>
                </div>

                <div className=" space-y-2">
                  <p className="font-semibold">Enter a promo code</p>
                  <div className="flex">
                    <input
                      type="text"
                      className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                      placeholder="Promo code"
                    />
                    <DashButton className="rounded-none rounded-r-sm px-4 py-2 text-white">
                      Apply
                    </DashButton>
                  </div>
                </div>

                <div className="w-full mt-6">

                <Link to={"/dashboard/Dashboard_Discover"}>
                  
                  <DashButton className="w-full text-white">
                    Make Payment
                  </DashButton>

                  
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className={styles.checkout_courses}>
          {/* Our Certified Professionals */}
          <div className={styles.certified_pro}>
            <ImageOverlay>
              <Container>
                <div className="text-white lg:flex lg:items-center lg:justify-between lg:px-8">
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

export default PreviewVideoCourse;
