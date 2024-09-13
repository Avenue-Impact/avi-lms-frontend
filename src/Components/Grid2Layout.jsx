const Grid2Layout = ({ className, children }) => {
  return <div className={`${className} grid md:grid-cols-2`}>{children}</div>;
};

export default Grid2Layout;
