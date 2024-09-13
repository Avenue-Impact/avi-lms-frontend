import { cn } from "@/lib/utils";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RenderStars = ({ className }) => {
  return (
    <div className={cn("flex gap-0", className)}>
      <FontAwesomeIcon icon={faStar} className="text-[#ffffff]" />
      <FontAwesomeIcon icon={faStar} className="text-[#ffffff]" />
      <FontAwesomeIcon icon={faStar} className="text-[#ffffff]" />
      <FontAwesomeIcon icon={faStar} className="text-[#ffffff]" />
      <FontAwesomeIcon icon={faStar} className="text-[#ffffff]" />
    </div>
  );
};

export default RenderStars;
