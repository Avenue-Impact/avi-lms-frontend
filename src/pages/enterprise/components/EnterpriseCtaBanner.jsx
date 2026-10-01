import React from "react";

export const EnterpriseCtaBanner = ({ onOpenModal }) => {
  return (
    <section className="w-full bg-[#F8F9FC] py-12 sm:py-16 lg:py-20 font-inter text-white">
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] sm:rounded-[36px] bg-[#0E1736] py-12 sm:py-16 px-6 sm:px-12 text-center border border-slate-800/80 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#CC1747]/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="font-space font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-tight text-white max-w-2xl mx-auto">
            Ready to talk about your delivery needs?
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Whether you need transformation delivery capacity now, or want to explore building future-ready workforce capability, we'd welcome a conversation.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onOpenModal}
              className="bg-[#CC1747] hover:bg-[#b0133d] text-white font-semibold text-[14px] sm:text-[15px] px-7 py-3.5 rounded-xl shadow-lg shadow-[#CC1747]/25 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              Talk to us about your delivery needs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseCtaBanner;
