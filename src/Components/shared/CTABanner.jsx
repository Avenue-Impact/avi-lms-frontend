import React from "react";
import { Link } from "react-router-dom";

const CTABanner = ({
  title,
  subtitle,
  primaryBtnText,
  primaryBtnTo,
  secondaryBtnText,
  secondaryBtnTo,
}) => {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto grid grid-cols-1 items-center gap-8 rounded-3xl border border-gray-100 bg-[#F9FAFB] p-10 md:grid-cols-2 md:p-16">
        <div>
          <h2 className="mb-4 max-w-lg whitespace-pre-line text-3xl font-bold leading-tight text-brand-dark-heading sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>
        <div className="flex h-full flex-col items-start justify-center md:border-l md:border-gray-200 md:pl-12">
          {subtitle && (
            <p className="mb-8 text-base sm:font-medium sm:text-lg text-brand-gray-body">{subtitle}</p>
          )}
          <div className="flex flex-wrap gap-4">
            {primaryBtnText && (
              <Link
                to={primaryBtnTo || "#"}
                className="inline-block rounded-full bg-brand-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-[#a8103a] sm:text-base"
              >
                {primaryBtnText}
              </Link>
            )}
            {secondaryBtnText && (
              <Link
                to={secondaryBtnTo || "#"}
                className="inline-block rounded-full border-2 border-brand-dark-heading px-8 py-3 text-sm font-bold text-brand-dark-heading transition-colors hover:bg-brand-dark-heading hover:text-white sm:text-base"
              >
                {secondaryBtnText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
