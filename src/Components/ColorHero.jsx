import pink from "../assets/images/pink-arrow.png";
import { ListOfCourses } from "./listOfCourses";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ColorHero = () => {
  const [showCourses, setShowCourses] = useState(false);
  return (
    <section className="relative flex min-h-screen items-end px-6 py-12 md:py-24 lg:px-20 2xl:pb-[11.8125rem]">
      <div className="absolute -right-5 top-0 -z-10 h-[256px] w-[256px] rounded-full bg-[#FFEBF080] md:right-[244px] lg:h-[356px] lg:w-[356px]"></div>
      <div>
        <h1 className="z-10 font-poppins text-[2.5rem] font-light leading-snug md:text-6xl lg:text-7xl 2xl:text-8xl">
          <span className="font-[275] text-[rgb(204,23,71)]">
            {" "}
            Jumpstart Your Career <br className="hidden lg:block" /> with{" "}
          </span>
          <span className="font-light italic text-[#23314A]">
            {" "}
            Avenue Impact
          </span>
        </h1>
        <img
          src={pink}
          alt="pink arrow"
          className="m-6 hidden w-[110px] md:block"
        />
        <p className="z-10 mt-9 max-w-[1000px] md:mt-0 md:text-2xl">
          Transform your professional future with industry-recognized
          certificates from Avenue Impact. Our courses are designed by experts
          to help you gain the skills needed to succeed in today's competitive
          job market.
        </p>
      </div>

      <AnimatePresence>
        {showCourses && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setShowCourses(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 sm:top-28 top-16 hideScrollBar h-full z-[700] overflow-y-auto"
            >
              <ListOfCourses onClose={() => setShowCourses(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <motion.button 
        onClick={() => setShowCourses(!showCourses)}
        className="fixed right-0 sm:top-32 top-40 z-[600] bg-rose-700 hover:bg-rose-600 px-5 py-3 rounded-l-lg shadow-lg group transition-all duration-300 flex flex-col items-center gap-1"
        whileHover={{ x: -5 }}
        initial={{ x: 0 }}
        animate={{ x: showCourses ? -5 : 0 }}
      >
        <motion.span 
          className="block text-white font-medium tracking-wider"
          initial={{ opacity: 1 }}
          animate={{ opacity: showCourses ? 0.7 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {showCourses ? 'Close' : 'Courses'}
        </motion.span>
        <motion.div 
          className="w-6 h-0.5 bg-white/80 mt-1"
          initial={{ width: '1.5rem' }}
          animate={{ width: showCourses ? '1rem' : '1.5rem' }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>
    </section>
  );
};

export default ColorHero;