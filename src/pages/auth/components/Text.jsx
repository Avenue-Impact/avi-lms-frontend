import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const elementProps = {
  children: PropTypes.string,
  className: PropTypes.string,
};

export const Heading = ({ children, className }) => (
  <h1
    className={cn(
      "text-center font-poppins text-base text-heading md:text-nowrap md:text-xl lg:text-xl",
      className,
    )}
  >
    {children}
  </h1>
);

export const Paragraph = ({ children, className }) => (
  <p className={cn("text-center text-sm text-desc", className)}>{children}</p>
);
Heading.propTypes = { ...elementProps };
Paragraph.propTypes = { ...elementProps };
