import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RenderStars = () => {
  return (
    <>
      <FontAwesomeIcon icon={faStar} className="text-[#ffffff]" />
      <FontAwesomeIcon icon={faStar} className="text-[#ffffff]" />
      <FontAwesomeIcon icon={faStar} className="text-[#ffffff]" />
      <FontAwesomeIcon icon={faStar} className="text-[#ffffff]" />
      <FontAwesomeIcon icon={faStar} className="text-[#ffffff]" />
    </>
  );
};

export default RenderStars;
