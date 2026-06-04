import React from "react";
import ImageOverlay from "../Components/ImageOverlay";
import GetInTouch from "../Components/GetInTouch/GetInTouch";
import SEOHead from "@/Components/SEOHead";

const Contact = () => {
	return <>
	
		<SEOHead
			title="Contact Avenue Impact | Get In Touch Today"
			description="Contact our expert team at Avenue Impact for professional IT training, business analysis consulting, and digital transformation services. We're ready to help you grow."
			canonical="https://avenueimpact.com/contact"
		/>
		{/* Elevate YOur Business */}
		<ImageOverlay>
			<GetInTouch/>
		</ImageOverlay>
	</>;
};

export default Contact;
