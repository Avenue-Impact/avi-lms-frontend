import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../pages/pages.module.css'; // Adjust the import according to your project structure


const professionalItems = [
    "Agile and Digital Business Analysis",
    "Product Management",
    "Data Analytics",
    "Power BI",
    "Business Intelligence",
    "Software Development",
    "Digital Transformation Solutions",
    "Cyber Security",
    "Data Management",
    "Data Strategy",
    "Artificial Intelligence",
    "Cloud Computing and more"
];

const industriesItems = [
    "Business Transformation & Advisory",
    "Turnaround, Stability & Restructuring Transaction",
    "Valuation & Financial Advisory Services",
    "Dispute Advisory",
    "Tax Services",
    "Healthcare",
    "Financial Services",
    "Technology",
    "Automotive",
    "Oil & Gas"
];

const ProfessionalList = ({ title, items, className }) => {
    return (
        <div className={`leading-10 ${className}`}>
            <h3 className="text-2xl">{title}</h3>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <FontAwesomeIcon icon={faCheckCircle} className={styles.proList} /> {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { ProfessionalList, professionalItems, industriesItems };
