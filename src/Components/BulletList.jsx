import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./BulletList.module.css";
import { FaRegCircleCheck } from "react-icons/fa6";

const BulletList = () => {
  const items = [
    "Our comprehensive online courses",
    "Our highly effective online mentoring program",
    "Our innovative Buddy Hubs (Interview Forums)",
  ];

  return (
    <ul className={styles.bulletList}>
      {items.map((item, index) => (
        <li key={index} className={"flex items-center gap-2 2xl:text-xl"}>
          <span>
            <FaRegCircleCheck />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default BulletList;
