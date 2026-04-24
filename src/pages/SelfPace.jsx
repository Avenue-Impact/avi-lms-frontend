import React, { useEffect, useState } from "react";
import { ScrollRestoration, Link } from "react-router-dom";
import generateToken from "../utils/tokenGenerator";
import AVIFooter from "../Components/AVIFooter";
import CTABanner from "../Components/shared/CTABanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

// Import images
import heroImg from "../assets/images/selfpace/selfpace_hero_man_1776809512956.png";
import heroBg from "../assets/images/selfpace/8ded7bad9cd44f5747986719097bd9f72728f59b.png";
import splitImg from "../assets/images/selfpace/selfpace_split_students_1776809528193.png";
import featureIcon from "../assets/images/selfpace/selfpace_feature_icon_1776809557036.png";

// Import feature grid custom images
import imgCard01 from "../assets/images/selfpace_cards/Group 1000006788.png";
import imgCard02 from "../assets/images/selfpace_cards/10_00 AM - 12_00 PM.png";
import imgCard03 from "../assets/images/selfpace_cards/typing/bro.png";
import imgCard04 from "../assets/images/selfpace_cards/Component 29.png";
import imgCard05 from "../assets/images/selfpace_cards/Component 28.png";
import imgCard06 from "../assets/images/selfpace_cards/Group 1000006785.png";
import imgCard07 from "../assets/images/selfpace_cards/Group 1000006784.png";
import imgCard08 from "../assets/images/selfpace_cards/active-support/bro.png";
import imgCard09 from "../assets/images/selfpace_cards/portfolio-update/pana.png";
import imgCard10 from "../assets/images/selfpace_cards/Rectangle 5201.png";

const SelfPace = () => {
  const [token, setToken] = useState("");

  const handleGenerate = () => {
    const newToken = generateToken(24);
    setToken(newToken);
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  const featureCards = [
    {
      title: "Mentorship & Support (1/3/6 Months Access)",
      desc: "Get access to one-on-one mentorship, interview preparation, and expert guidance to keep you on track.",
      img: imgCard07,
      imgClass:
        "mt-auto self-center w-full object-contain -mb-8 max-h-[160px] lg:max-h-[220px]",
    },
    {
      title: "Flexible Scheduling",
      desc: "Study anytime that suits you, whether early mornings, late nights, or weekends.",
      img: imgCard02,
      imgClass: "w-[80%] mt-8 mb-2 self-start object-contain",
    },
    {
      title: "Access From Anywhere",
      desc: "Learn from any device, anywhere, all you need is an internet connection.",
      img: imgCard03,
      imgClass:
        "w-[65%] mt-auto self-end object-contain object-bottom -mb-8 -mr-6 min-h-[150px]",
    },
    {
      title: "Affordable & Cost-Effective",
      desc: "Get high-quality education at a more accessible price compared to live classes.",
      img: imgCard06,
      imgClass: "w-[90%] mt-6 mb-2 self-center object-contain",
    },
    {
      title: "Certificate of Completion",
      desc: "Earn a verifiable certificate to showcase your achievement and boost your credibility.",
      img: imgCard05,
      imgClass: "w-[85%] mt-8 mb-2 self-center object-contain",
    },
    {
      title: "Community Support",
      desc: "Join a network of learners to share ideas, ask questions, and grow together.",
      img: imgCard04,
      imgClass: "w-[90%] mt-auto self-center object-contain -mb-4",
    },
    {
      title: "Career Advancement",
      desc: "Build relevant, in-demand skills that help you grow professionally and unlock new opportunities.",
      img: imgCard05,
      imgClass: "w-[90%] mt-auto self-center object-contain -mb-4",
    },
    {
      title: "Learn at Your Own Speed",
      desc: "Take your time with complex topics or move quickly through what you already understand.",
      img: imgCard06,
      imgClass: "w-[95%] mt-auto self-center object-contain pb-6",
    },
    {
      title: "CV Development Support",
      desc: "Build a strong, job-ready CV with expert guidance tailored to your career goals.",
      img: imgCard09,
      imgClass:
        "h-[200px] mt-auto self-end object-contain object-bottom -mb-8 -mr-8",
    },
    {
      title: "Interview Support",
      desc: "Prepare confidently with practical tips to help you perform well in real interviews.",
      img: imgCard08,
      imgClass:
        "w-[65%] mt-auto self-end rounded-[12px] object-cover object-center translate-y-4 translate-x-4",
    },
  ];

  return (
    <div className="bg-white sm:mx-10">
      <ScrollRestoration />

      {/* Hero Section */}
      <section
        className="bg-[#ffffff] bg-none bg-cover bg-no-repeat pb-[60px] font-sans lg:bg-[image:var(--hero-bg)] lg:bg-right"
        style={{ "--hero-bg": `url(${heroBg})`, backgroundSize: "77vw" }}
      >
        {/* ── Two-column body ── */}
        <div className="mx-auto grid grid-cols-1 items-center gap-[36px] px-[24px] pt-[40px] md:px-[40px] md:pt-[64px] lg:min-h-[640px] lg:grid-cols-[1.2fr_0.8fr] lg:gap-[48px]">
          {/* Left column */}
          <div className="flex w-full flex-col items-start lg:py-[60px]">
            <h1 className="mb-[20px] text-[clamp(45px,5vw,80px)] font-normal leading-[1.15] tracking-[-0.02em] text-[#1a2340]">
              Learn on Your <br className="hidden md:block" />
              <span className="text-[#CC1747]">Terms</span>
            </h1>
            <p className="mb-[32px] max-w-[440px] text-[15px] font-normal leading-[1.7] text-[#666]">
              Access high-quality learning materials anytime, progress at your
              own speed, and build real-world skills without the pressure of
              fixed schedules.
            </p>
            <div className="flex flex-wrap gap-[12px]">
              <Link
                to="/discover-courses?course_type=on_demand"
                className="inline-flex items-center rounded-[999px] bg-[#CC1747] px-[32px] py-[14px] text-[15px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#a8103a]"
              >
                Browse Courses
              </Link>
              <Link
                to={`/signup?token=${token}&_r=/dashboard&role=student&title=Sign up and learn at your own pace&type=on_demand`}
                className="inline-flex items-center rounded-[999px] border-2 border-[#1a2340] px-[32px] py-[14px] text-[15px] font-semibold text-[#1a2340] no-underline transition-colors duration-200 hover:bg-[#1a2340] hover:text-white"
              >
                Sign up now
              </Link>
            </div>
          </div>

          {/* Right column */}
          <div className="relative flex max-h-[600px] w-full flex-col gap-[16px] md:max-h-[500px] lg:h-full lg:justify-center">
            <img
              src={heroBg}
              alt="Young man working on laptop"
              className="block h-[600px] w-full overflow-hidden rounded-[20px] object-cover object-right md:h-[500px] lg:hidden"
            />

            {/* Floating Badges */}
            <div className="absolute -left-8 top-8 z-10 flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg animate-in fade-in zoom-in">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#CC1747]">
                <FontAwesomeIcon icon={faCheckCircle} />
              </span>
              <span className="text-sm font-bold text-brand-dark-heading">
                Interview Support
              </span>
            </div>

            <div className="absolute -right-6 top-12 z-10 flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg delay-150 animate-in fade-in zoom-in">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#CC1747]">
                <FontAwesomeIcon icon={faCheckCircle} />
              </span>
              <span className="text-sm font-bold text-brand-dark-heading">
                One-2-One Mentorship
              </span>
            </div>

            <div className="absolute -right-4 bottom-8 z-10 flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg delay-300 animate-in fade-in zoom-in">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#CC1747]">
                <FontAwesomeIcon icon={faCheckCircle} />
              </span>
              <span className="text-sm font-bold text-brand-dark-heading">
                CV Development
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Self-Paced Learning (Split Banner) */}
      <section className="grid w-full grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 bg-brand-primary p-12">
          <h2 className="mb-2 text-2xl font-bold leading-tight text-white lg:text-4xl">
            What Is Self-Paced Learning?
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-red-50 lg:text-lg">
            Self-paced learning empowers you to take control of your educational
            journey. Instead of conforming to strict cohort schedules and live
            attendance requirements, you can absorb knowledge at the time of day
            when your focus peaks.
          </p>
          <p className="max-w-lg text-base leading-relaxed text-red-50 lg:text-lg">
            Our expertly designed and curated curriculum acts as your roadmap,
            providing high quality video instruction alongside immersive
            practical exercises that you review whenever life permits.
          </p>
        </div>
        <div className="min-h-[200px] lg:h-[450px]">
          <img
            src={splitImg}
            alt="Students studying together"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Why Choose Self-Paced Learning Feature Grid */}
      <section className="w-full bg-[#FAFAFA] py-16 lg:py-24">
        <div className="mx-auto px-6 lg:px-20">
          <h2 className="mb-16 text-center text-3xl font-bold text-brand-dark-heading lg:text-4xl">
            Why Choose Self-Paced Learning
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card, idx) => {
              const num = String(idx + 1).padStart(2, "0");

              let gridClasses = "w-full";
              if (idx === 0)
                gridClasses =
                  "lg:col-start-1 flex-col lg:row-start-1 lg:row-span-2";
              else if (idx === 1)
                gridClasses =
                  "lg:col-start-1 flex-col lg:row-start-3 h-[350px]";
              else if (idx === 2)
                gridClasses =
                  "lg:col-start-2 flex-col lg:row-start-1 h-[330px]";
              else if (idx === 3)
                gridClasses =
                  "lg:col-start-2 flex-col lg:row-start-2 h-[280px]";
              else if (idx === 4)
                gridClasses =
                  "lg:col-start-2 flex-col lg:row-start-3 h-[350px]";
              else if (idx === 5)
                gridClasses =
                  "lg:col-start-3 flex-col lg:row-start-1 h-[330px]";
              else if (idx === 6)
                gridClasses =
                  "lg:col-start-3 flex-col lg:row-start-2 h-[280px]";
              else if (idx === 7)
                gridClasses =
                  "lg:col-start-3 flex-col lg:row-start-3 h-[350px]";
              else if (idx === 8)
                gridClasses =
                  "lg:col-span-2 flex-col sm:flex-row items-center justify-between";
              else if (idx === 9)
                gridClasses =
                  "lg:col-span-1 flex-col sm:flex-row items-center justify-between";

              return (
                <div
                  key={idx}
                  className={`relative flex overflow-hidden rounded-[20px] border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8 ${gridClasses}`}
                >
                  <div>
                    <span className="text-3xl font-black text-brand-dark-heading">
                      {num}
                    </span>
                    <h3 className="mb-3 mt-4 text-xl font-bold text-brand-primary">
                      {card.title}
                    </h3>
                    <p className="z-10 mb-6 w-full text-[15px] leading-relaxed text-brand-gray-body xl:w-[90%]">
                      {card.desc}
                    </p>
                  </div>
                  {card.img && (
                    <img
                      src={card.img}
                      alt={card.title}
                      className={`z-0 ${card.imgClass}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shared CTA Banner */}
      <CTABanner
        title={`Start Learning at Your\nOwn Pace`}
        subtitle="Embark on a digital journey that fits seamlessly into your life."
        primaryBtnText="Browse Self-Paced Courses"
        primaryBtnTo="/courses"
        secondaryBtnText="Sign up now"
        secondaryBtnTo="/register"
      />

      <AVIFooter />
    </div>
  );
};

export default SelfPace;
