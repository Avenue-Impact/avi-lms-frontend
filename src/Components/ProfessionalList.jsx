/* eslint-disable react-refresh/only-export-components */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "../pages/pages.module.css"; // Adjust the import according to your project structure

const ProfessionalList = ({ title, items, className }) => {
  return (
    <div className={`leading-10 ${className}`}>
      <h3 className="text-2xl">{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <FontAwesomeIcon icon={faCheckCircle} className={styles.proList} />{" "}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProfessionalList;
//******** this ^^^^^^ */

// change the component here to a an export default then correct the import in every component its been used
