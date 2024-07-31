import React from "react";
import styles from "./AvenueImpact.module.css"; // Import the CSS Module
import image1 from "../../assets/images/big-team.png";
import image2 from "../../assets/images/big-team.png";
import image3 from "../../assets/images/big-team.png";

const AvenueImpactItem = ({ number, title, content, isHighlighted }) => {
	return (
		<div
			className={
				isHighlighted ? styles.expert_transform2 : styles.expert_transform
			}>
			<p>{number}</p>
			<p>{title}</p>
			<p>{content}</p>
		</div>
	);
};

const AvenueImpact = () => {
	const impacts = [
		{
			number: "01",
			title: "Analysis",
			content:
				"The first step in our services is to work closely with you to understand your business needs and goals.",
			isHighlighted: false,
		},
		{
			number: "01",
			title: "Analysis",
			content:
				"The first step in our services is to work closely with you to understand your business needs and goals.",
			isHighlighted: true,
		},
		{
			number: "01",
			title: "Hello World",
			content:
				"The first step in our services is to work closely with you to understand",
			isHighlighted: true,
		},
	];

	return (
		<div className={styles.expert_transformation}>
			<div className={styles.expert_transformation_flex}>
				{impacts.map((impact, index) => (
					<div
						key={index}
						className={
							index === 0
								? styles.expert_transformation_content
								: index === 1
								? styles.expert_transformation_content1
								: styles.expert_transformation_content2
						}>
						<AvenueImpactItem {...impact} />
					</div>
				))}
			</div>
		</div>
	);
};
export default AvenueImpact;
