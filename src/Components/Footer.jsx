import ImageHero from "./ImageHero";
import footerImg from "../assets/images/footer-img.jpg";
import HeroHeading from "./MainContent/HeroHeading";
import Button from "./Button";
import { WhiteLogo } from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialMediaLinks, { socialMediaData } from "./SocialMediaLink";

const Footer = ({ heading, description }) => {
  return (
    <ImageHero imageSrc={footerImg} className={"items-start md:items-end"}>
      <div className="flex h-full lg:items-end">
        <footer className="h-max">
          <HeroHeading className={"2xl:w-[1060px]"}>{heading}</HeroHeading>

          <div className="my-6 h-[2px] w-full bg-white lg:mb-8 lg:mt-12 2xl:mb-7 2xl:mt-[127px]" />

          <div className="grid items-start gap-y-5 md:mb-0 lg:grid-cols-[5fr_2fr]">
            <p className="text-sm font-light text-white md:text-lg lg:w-[860px] 2xl:text-2xl">
              {description}
            </p>
            <Button className={""}>send us a message</Button>
          </div>
          <div className="mt-28 flex flex-wrap items-center justify-between gap-y-4 text-white md:mt-10 2xl:mt-[31px] 2xl:px-8 2xl:py-10">
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
