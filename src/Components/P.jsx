const P = ({ children, className }) => {
  return (
    <p
      className={`font-poppins font-normal text-[#667185] md:text-xl 2xl:text-xl${className}`}
    >
      {children}
    </p>
  );
};

export default P;
