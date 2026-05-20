import React, { useState, useEffect } from "react";
import FloatingWhatsApp from "@/Components/FloatingWhatsApp";
import { ScrollRestoration, Link } from "react-router-dom";
import generateToken from "../utils/tokenGenerator";
import AVIFooter from "../Components/AVIFooter";
import CTABanner from "../Components/shared/CTABanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import SEOHead from "@/Components/SEOHead";

// Import images
import heroImg from "../assets/images/partner/partner_hero_collab_1776809342038.png";
import aboutImg from "../assets/images/partner/partner_about_man_1776809356497.png";
import portrait1 from "../assets/images/partner/partner_portrait_1_1776809370508.png";
import portrait2 from "../assets/images/partner/partner_portrait_2_1776809385260.png";
import portrait3 from "../assets/images/partner/partner_portrait_3_1776809410609.png";
import portrait4 from "../assets/images/partner/partner_portrait_4_1776809422588.png";

// Import some basic SVG icons as inline components for the "Why Partner" cards
const IconBag = () => (
  <svg
    className="h-8 w-8 text-[#CC1747]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2a3 3 0 01-3-2m0-8c0-1.105 1.343-2 3-2m3 2v2M9 20h6a2 2 0 002-2V8l-2-2m-8 2L5 8v10a2 2 0 002 2z"
    />
  </svg>
);
const IconPin = () => (
  <svg
    className="h-8 w-8 text-[#CC1747]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
    />
  </svg>
);
const IconGroup = () => (
  <svg
    className="h-8 w-8 text-[#CC1747]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);
const IconStar = () => (
  <svg
    className="h-8 w-8 text-[#CC1747]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const Partner = () => {
  const [token, setToken] = useState("");


  const isAuthenticated = !!Cookies.get("token");
  const handleGenerate = () => {
    const newToken = generateToken(24);
    setToken(newToken);
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className="bg-white sm:mx-10">
      <SEOHead
        title="Partner & Affiliate Program | Avenue Impact"
        description="Join the Avenue Impact Affiliate Partner Program. Refer your friends or network to our courses and earn rewards on every successful enrollment."
        canonical="https://avenueimpact.com/partner"
      />
      <ScrollRestoration />

      {/* Hero Section */}
      <section className="bg-[#ffffff] pb-[60px] font-sans">
        {/* ── Two-column body ── */}
        <div className="mx-auto grid grid-cols-1 items-center gap-[36px] px-[24px] pt-[40px] md:px-[40px] md:pt-[64px] lg:grid-cols-[1.2fr_0.8fr] lg:gap-[48px]">
          {/* Left column */}
          <div className="flex w-full flex-col items-start">
            <h1 className="mb-[20px] text-[clamp(45px,5vw,80px)] font-normal leading-[1.15] tracking-[-0.02em] text-[#1a2340]">
              Refer a Friend &amp; <br className="hidden md:block" />
              Earn with
              <span className="text-[#CC1747]"> Avenue Impact</span>
            </h1>
            <p className="mb-[32px] max-w-[440px] text-base font-normal leading-[1.7] text-[#666] sm:text-lg">
              Invite your friends, help them grow, and earn rewards for every
              successful referral. Join our community of advocates and make a
              tangible difference.
            </p>
            <div className="flex flex-wrap gap-[12px]">
              <Link
                to={isAuthenticated ? '/dashboard/referral' : `/signup?t=${token}&ttl=Sign up and start earning&_r=/dashboard/referral&r=student&l=${token.slice(5,19)}`}
                className="inline-flex items-center rounded-[999px] bg-[#CC1747] px-[32px] py-[14px] text-[15px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#a8103a]"
              >
                Refer a Friend
              </Link>
            </div>
          </div>

          {/* Right column */}
          <div className="relative flex flex-col gap-[16px]">
            <img
              src={heroImg}
              alt="People collaborating at a laptop"
              className="h-[400px] w-full rounded-[20px] object-cover sm:h-full sm:max-h-[calc(100vh-600px)] sm:w-[80%] md:max-h-[calc(100vh-400px)]"
            />

            {/* Action cards - adapted from badge */}
            <div className="absolute -left-10 bottom-[50px] grid grid-cols-1 gap-[10px] sm:w-72">
              <div className="relative flex min-h-[50px] w-full flex-row-reverse items-center justify-between overflow-hidden rounded-[12px] bg-white px-[20px] py-[10px] text-primary-color-600 transition-all duration-200 hover:-translate-y-[2px] hover:bg-[#a8103a] sm:min-h-[70px]">
                <div className="flex flex-col">
                  <span className="text-[18px] font-semibold leading-[1.3] text-black">
                    Over 100+
                  </span>
                  <span className="text-[14px] text-primary-color-600/90">
                    Referrals Made
                  </span>
                </div>
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-gray-200 bg-black">
                    <img
                      src={portrait4}
                      className="h-full w-full object-cover"
                      alt="Avenue Impact member profile avatar 4"
                    />
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-gray-200 bg-black">
                    <img
                      src={portrait3}
                      className="h-full w-full object-cover"
                      alt="Avenue Impact member profile avatar 3"
                    />
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-gray-200 bg-black">
                    <img
                      src={portrait2}
                      className="h-full w-full object-cover"
                      alt="Avenue Impact member profile avatar 2"
                    />
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-gray-200 bg-black">
                    <img
                      src={portrait1}
                      className="h-full w-full object-cover"
                      alt="Avenue Impact member profile avatar 1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Affiliate Programme */}
      <section className="mx-auto mt-8 grid grid-cols-1 items-center gap-[48px] border-t border-gray-50 bg-white px-6 py-24 md:grid-cols-2 lg:px-20">
        <div className="order-2 flex max-w-[640px] flex-col gap-6 md:order-1">
          <h2 className="text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1a2340] md:text-[40px]">
            About the Affiliate Programme
          </h2>
          <p className="text-[16px] font-medium leading-[1.7] text-[#666] md:text-[18px]">
            The Avenue Impact Affiliate Partner Programme is designed for
            individuals and organisations who are passionate about education and
            growth. By partnering with us, you get the opportunity to promote
            impactful learning experiences while earning rewards for every
            successful referral.
          </p>
        </div>
        <div className="relative order-1 flex h-full items-center justify-center p-8 md:order-2">
          {/* Pink Wave Background */}
          <div className="absolute h-[300px] w-[300px] rounded-full bg-[#FFEBF0]/40 blur-[2px] lg:h-[466px] lg:w-[466px]"></div>
          <div className="absolute h-[250px] w-[250px] rounded-full bg-[#FFEBF0]/70 lg:h-[380px] lg:w-[380px]"></div>
          <div className="absolute h-[200px] w-[200px] rounded-full bg-[#FFEBF0] lg:h-[300px] lg:w-[300px]"></div>

          <img
            src={aboutImg}
            alt="Smiling man with laptop"
            className="relative z-10 h-[320px] w-auto object-contain lg:h-[466px]"
          />
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="w-full bg-[#FAFAFA] py-24">
        <div className="mx-auto px-6 lg:px-20">
          <h2 className="mb-16 text-center text-3xl font-bold text-brand-dark-heading lg:text-4xl">
            Why Partner With Us
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Earn Commissions",
                icon: <IconBag />,
                desc: "Get highly competitive payouts for each successful enrollment you refer to us.",
              },
              {
                title: "Access Marketing Resources",
                icon: <IconPin />,
                desc: "Use our fully designed banners, templates, and guides tailored for conversion.",
              },
              {
                title: "Grow Your Network",
                icon: <IconGroup />,
                desc: "Engage closely with fellow creators and educators within the community.",
              },
              {
                title: "Make an Impact",
                icon: <IconStar />,
                desc: "Help aspiring professionals get access to transformative educational content.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFEBF0]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#CC1747]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-gray-body">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="mx-auto grid grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-[1.3fr_0.7fr] lg:px-20">
        {/* Left: 2x2 Mosaic */}
        <div className="grid h-[400px] grid-cols-2 gap-4 sm:h-[500px] sm:grid-cols-3">
          <div className="group relative h-[320px] overflow-hidden rounded-2xl shadow-sm sm:h-[420px]">
            <img
              src={portrait1}
              alt="Instructor"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-lg font-bold tracking-wide">
                Instructor
              </span>
            </div>
          </div>
          <div className="flex h-[370px] flex-col gap-4 sm:h-[470px]">
            <div className="group relative flex-1 overflow-hidden rounded-2xl shadow-sm">
              <img
                src={portrait3}
                alt="Community"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-sm font-bold tracking-wide">
                  Community Leader
                </span>
              </div>
            </div>
            <div className="group relative flex-1 overflow-hidden rounded-2xl shadow-sm">
              <img
                src={portrait4}
                alt="Creator"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-sm font-bold tracking-wide">
                  Content Creator
                </span>
              </div>
            </div>
          </div>
          <div className="hidden h-full flex-col gap-4 sm:flex">
            <div className="group relative flex-1 overflow-hidden rounded-2xl shadow-sm">
              <img
                src={portrait3}
                alt="Community"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-sm font-bold tracking-wide">
                  Community Leader
                </span>
              </div>
            </div>
            <div className="group relative flex-1 overflow-hidden rounded-2xl shadow-sm">
              <img
                src={portrait4}
                alt="Creator"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-sm font-bold tracking-wide">
                  Content Creator
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-col gap-6 pl-0 lg:pl-10">
          <h2 className="text-3xl font-bold text-brand-dark-heading lg:text-4xl">
            Who This Is For
          </h2>
          <p className="text-lg italic text-brand-gray-body">
            This programme is perfect for:
          </p>
          <ul className="ml-2 list-inside list-disc space-y-4">
            {[
              "Educators & Trainers",
              "Content Creators",
              "Influencers",
              "Organisations & Institutions",
              "Community Leaders",
            ].map((item, idx) => (
              <li
                key={idx}
                className="text-lg font-medium text-brand-gray-body"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How It Works Carousel */}
      <section className="w-full overflow-hidden border-t border-gray-100 bg-white py-24">
        <div className="mx-auto px-6 lg:px-20">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-brand-dark-heading lg:text-4xl">
              How It Works
            </h2>
            <p className="text-lg text-brand-gray-body">
              Start earning in just a few simple steps:
            </p>
          </div>

          {/* Horizontal scrollable row */}
          <div className="relative">
            <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pr-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[
                {
                  step: "01",
                  title: "Apply",
                  desc: "Submit your application detailing how you plan to share our courses.",
                },
                {
                  step: "02",
                  title: "Get Approved",
                  desc: "Our team will quickly review your application and send an approval.",
                },
                {
                  step: "03",
                  title: "Get Your Affiliate Link",
                  desc: "Access the partner dashboard and grab your unique tracking link.",
                },
                {
                  step: "04",
                  title: "Share with Network",
                  desc: "Promote Avenue Impact via blogs, email newsletters, or social media.",
                },
                {
                  step: "05",
                  title: "Earn Commissions",
                  desc: "Receive payouts accurately and seamlessly on every successful milestone you hit.",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="w-[280px] min-w-[280px] shrink-0 snap-center rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md sm:min-w-[320px]"
                >
                  <div className="mb-6 text-5xl font-black text-gray-200">
                    {card.step}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-brand-dark-heading">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-gray-body">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Nav Arrows Placeholder */}
            <div className="mt-1 flex items-center justify-end gap-4">
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200">
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CC1747] text-white shadow-lg shadow-red-500/30 transition-colors hover:bg-[#a8103a]">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Shared CTA Banner */}
      <CTABanner
        title="Ready to Start Earning and Making Impact?"
        subtitle="Join a growing network of partners who are 
shaping the future of education."
        primaryBtnText="Refer a Friend"
        primaryBtnTo={isAuthenticated ? '/dashboard/referral' : `/signup?t=${token}&ttl=Sign up and start earning&_r=/dashboard/referral&r=student&l=${token.slice(5,19)}`}
      />

      <AVIFooter />
      <FloatingWhatsApp />
    </div>
  );
};

export default Partner;
