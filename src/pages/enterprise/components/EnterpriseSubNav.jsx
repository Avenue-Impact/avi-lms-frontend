import React from "react";

export const EnterpriseSubNav = () => {
  const clients = [
    "East Midlands Railway",
    "NidCOM",
    "Central Bank of Nigeria",
  ];

  return (
    <div className="w-full bg-[#F8F9FC] border-b border-slate-200/80 py-4 font-inter text-[#0A1430]">
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="font-space text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-slate-400">
          DELIVERY TRACK RECORD WITH
        </span>
        <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto scrollbar-none font-space font-semibold text-slate-600 text-xs sm:text-sm">
          {clients.map((client) => (
            <span key={client} className="whitespace-nowrap">
              {client}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnterpriseSubNav;
