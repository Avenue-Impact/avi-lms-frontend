const Container = ({ children, className }) => {
  return (
    <div className={`px-6 py-12 md:py-12 lg:px-20 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
