import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

function BorderCard({ className, children }) {
  return (
    <div
      className={cn(
        "mx-auto rounded-2xl border border-lms-border px-4 py-6 md:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

BorderCard.propTypes = {
  className: PropTypes.string,
};

export default BorderCard;
