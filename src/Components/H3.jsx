const H3 = ({ children, className }) => {
  return (
    <h3
      className={`text-2xl font-light capitalize text-[#3A4C6C] lg:text-[2.5rem] ${className}`}
    >
      {children}
    </h3>
  );
};

export default H3;
