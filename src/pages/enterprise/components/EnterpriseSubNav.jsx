import React from "react";

export const EnterpriseSubNav = () => {
  const links = [
    { label: "The Delivery Problem", href: "#delivery-problem" },
    { label: "How We Help", href: "#how-we-help" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Our Process", href: "#our-process" },
    { label: "Global Capability", href: "#global-capability" },
    { label: "Leadership", href: "#leadership" },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white border-b border-slate-200 sticky top-[72px] z-40 font-inter shadow-xs">
      <div className="w-full px-6 md:px-12 lg:px-16 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-6 sm:gap-8 py-3 text-xs sm:text-sm font-medium whitespace-nowrap text-slate-600">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="hover:text-[#CC1747] transition-colors py-1 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnterpriseSubNav;
