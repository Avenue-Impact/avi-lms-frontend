import React from "react";
import ImageHero from "./ImageHero";
import footerImg from "../assets/images/footer-img.jpg";
import HeroHeading from "./MainContent/HeroHeading";
import Button from "./Button";
import { WhiteLogo } from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialMediaLinks, { socialMediaData } from "./SocialMediaLink";

const Footer = () => {
  return (
    <ImageHero imageSrc={footerImg}>
      <div className="flex h-full lg:items-end lg:justify-end">
        <footer className="h-max">
          <HeroHeading>
            Interested in a Free <br className="hidden md:block" /> Introductory
            Call?
          </HeroHeading>

          <div className="my-6 h-[1px] w-full bg-white lg:my-16" />

          <div className="grid place-items-center items-center gap-y-7 lg:grid-cols-[5fr_1fr]">
            <p className="text-sm font-light text-white lg:text-2xl">
              Please provide your email address. During this call, we will
              discuss your business requirements and goals, and determine how we
              can support you in reaching your objectives
            </p>
            <Button>send us a message</Button>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-y-10 text-white">
            <div>
              <SocialMediaLinks data={socialMediaData} />
            </div>
            <small className="text-nowrap font-poppins text-sm lg:text-wrap">
              © 2024 Avenue Impact Limited. All rights reserved
            </small>
            <WhiteLogo />
          </div>
        </footer>
      </div>
    </ImageHero>
  );
};

export default Footer;
