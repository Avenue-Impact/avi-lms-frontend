import React from "react";
import MainContent from "../Components/MainContent/MainContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from "./pages.module.css";
import { CourseCardPreview, renderStars } from "../Components/CourseCard";
import joinTeam from "../assets/images/join_team.png";
import CourseCard from "../Components/CourseCard";
import ImageOverlay from "../Components/ImageOverlay";
import iconDark from "../assets/icons/icon-dark.png";
import AvenueList from "../Components/Assets/AvenueList";




import {
	ProfessionalList,
	professionalItems,
	industriesItems,
} from "../Components/ProfessionalList";
import SocialMediaLinks, {
	socialMediaData,
} from "../Components/SocialMediaLink";
import { WhiteLogo } from "../Components/Logo";
import certificate from "../assets/images/certificate.png";
import professionalBG from "../assets/images/proffessional.png";
import AviNav from "../Components/avi/AviNav";
import { ScrollRestoration } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";


const PreviewCourse = ({ features }) => {

	const navigate = useNavigate();
	// const history = useHistory(); // Hook to navigate back

	// Ensure features is defined, falling back to default courseFeatures
	const courseFeatures = features || [
		"18 hours on-demand video",
		"Access on mobile and TV",
		"Full lifetime access",
		"Certificate of completion",
	];

	return (
		<>
			<ScrollRestoration />

			<div className=" hidden lg:block">
				<AviNav />
			</div>

			{/* Search for more {`${styles.checkout_courses}`} #23314A courses */}
			<section>
				<div className={cn(styles.checkout_courses, '')}>
					<div className="lg:pt-10">

						<div className={`${styles.checkoutCoursesFlex} lg:flex  hidden py-4 px-5 lg:py-4 lg:px-12`}>
							<div className={`${styles.checkoutCourses1} hidden sm:block`}>
								<p className="text-[#23314A] text-2xl font-normal">
									Search for more courses
								</p>
							</div>
							<div className={styles.checkoutCourses2}>
								<input
									type="text"
									className={styles.inputField}
									placeholder="Search courses..."
								/>
							</div>
						</div>

						<div className="bg-[#C7D7F4] lg:block hidden w-full h-[1px] mt-2" />

						<div className="bg-[#23314A]">

							{/* Back Button for Mobile View */}
							<div className="sm:hidden flex items-center mb-4 pt-9 px-4">
								<button onClick={() => navigate('/avi')} className="text-white">
								<FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
								</button>
							</div>

							{/* Project Consultant */}
							<div className={`${styles.project_consult} text-white `}>
								<div className={`${styles.project_consultFlex}  px-5 lg:py-4 lg:px-12`}>
									<div className={`${styles.project_consult1} lg:w-3/4`}>
										<p className="lg:text-[40px] text-[24px] font-normal">
											Project Consultant Training Programme (Bundle)
										</p>

										<div className="text-lg flex items-center py-2">
										<p>4.3</p>
										<p>{renderStars()}</p>
										<p>43,55</p>
										</div>

										<div className="text-white">
										<p className="text-2xl py-2">This course Includes:</p>
										<ul className="list-none p-0 m-0">
											{courseFeatures.map((feature, index) => (
											<li key={index} className="mb-2">
												<FontAwesomeIcon
												icon={faCheckCircle}
												className="mr-2"
												/>
												<span>{feature}</span>
											</li>
											))}
										</ul>
										</div>
									</div>

									<div className={styles.project_consult1}>
										<CourseCardPreview
										imgSrc={joinTeam}
										previewButtonText="Enroll now"
										/>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>

				{/* overview */}
				<div className="lg:px-14 px-4 pt-[50px]">
					<div className={styles.overviewFlex}>
						<div className={`${styles.overviewCourses1} text-[#667185] text-justify`}>
							<p className=" lg:text-[40px] text-[24px] font-[300] capitalize">Overview</p>

							<div className="bg-[#C7D7F4] lg:block hidden w-full h-[1px] mt-2" />

							<p className="lg:pt-9 pt-3 lg:text-[18px] text-[16px] font-[300]">
								The 3.5 Months Project Consultant Training Programme (Bundle) is
								a comprehensive and intensive course designed for aspiring
								project consultants who aim to excel in the dynamic field of
								project management. Scheduled to commence in May 2024, this
								training programme equips participants with the essential
								skills, knowledge, and hands-on experience necessary to thrive
								as project consultants in various industries.
							</p>
						</div>

						<div className={`${styles.overviewCourses1} text-[#667185]`}>
							<p className=" lg:text-[40px] text-[24px] font-[300] ">Tools and Technologies:</p>

							<div className="bg-[#C7D7F4] lg:block hidden w-full h-[1px] mt-2" />
							
							<div className="lg:pt-9 pt-3">
								<div className={`${styles.AvenueList} flex gap-4 items-start`}>
									<AvenueList src={iconDark} textColor={"#667185"}></AvenueList>
									<p className="lg:text-[18px] text-[16px] font-[300]">Business Transormation & Advisory</p>
								</div>

								<div className={`${styles.AvenueList} flex gap-4 items-start`}>
									<AvenueList src={iconDark} textColor={"#667185"}></AvenueList>
									<p className="lg:text-[18px] text-[16px] font-[300]">Mastery of project management software (e.g., MS Project, Jira,
										Asana)</p>
								</div>

								<div className={`${styles.AvenueList} flex gap-4 items-start`}>
									<AvenueList src={iconDark} textColor={"#667185"}></AvenueList>
									<p className="lg:text-[18px] text-[16px] font-[300]">Data analysis and reporting tools</p>
								</div>

								<div className={`${styles.AvenueList} flex gap-4 items-start`}>
									<AvenueList src={iconDark} textColor={"#667185"}></AvenueList>
									<p className="lg:text-[18px] text-[16px] font-[300]">Emerging technologies in project management</p>
								</div>
							</div>
							
						</div>
					</div>

					{/* Benefit & Programme Highlights: */}

					<div className={`${styles.overviewFlex} py-8`}>
						<div className={`${styles.overviewCourses1} text-[#667185] text-justify`}>
							
							<p className="lg:text-[40px] text-[24px] font-[300] capitalize">Benefit</p>

							<div className="bg-[#C7D7F4] lg:block hidden w-full h-[1px] mt-2" />

							<div className="lg:pt-9 pt-3">
								<div className={`${styles.AvenueList} flex gap-4 items-start`}>
									<AvenueList src={iconDark} textColor={"#667185"}></AvenueList>
									<p className="lg:text-[18px] text-[16px] font-[300]">Career Advancement: Open doors to new career opportunities and
									promotions.</p>
								</div>

								<div className={`${styles.AvenueList} flex gap-4 items-start`}>
									<AvenueList src={iconDark} textColor={"#667185"}></AvenueList>
									<p className="lg:text-[18px] text-[16px] font-[300]">Industry Recognition: Gain credibility and recognition as a
									certified project consultant.</p>
								</div>

								<div className={`${styles.AvenueList} flex gap-4 items-start`}>
									<AvenueList src={iconDark} textColor={"#667185"}></AvenueList>
									<p className="lg:text-[18px] text-[16px] font-[300]">Networking Opportunities: Connect with peers, mentors, and
									industry experts.</p>
								</div>

								<div className={`${styles.AvenueList} flex gap-4 items-start`}>
									<AvenueList src={iconDark} textColor={"#667185"}></AvenueList>
									<p className="lg:text-[18px] text-[16px] font-[300]">Lifetime Access: Continue to access course materials and updates
									even after the programme ends.</p>
								</div>
							</div>
							
						</div>

						{/* Programme Highlight */}

						<div className={`${styles.overviewCourses1} text-[#667185]`}>
							<p className="lg:text-[40px] text-[24px] font-[300] capitalize">
								Programme Highlights:
							</p>

							<div className="bg-[#C7D7F4] lg:block hidden w-full h-[1px] mt-2" />

							<div className="lg:pt-9 pt-3">
								
								<div className="flex items-start">
									<FontAwesomeIcon className="mr-2 mt-1" icon={faCheckCircle} />
									<div className="flex-1">
										<p className="font-bold">Format:</p>
										<p>Blended learning with online and in-person sessions</p>
									</div>
								</div>
								

								<div className="flex items-start mt-2">
									<FontAwesomeIcon className="mr-2 mt-1" icon={faCheckCircle} />
									<div className="flex-1">
										<p className="font-semibold">Modules:</p>
										<p>
											Comprehensive coverage of project management principles,
											methodologies, and tools
										</p>
									</div>
								</div>

								<div className="flex items-start mt-2">
									<FontAwesomeIcon className="mr-2 mt-1" icon={faCheckCircle} />
									<div className="flex-1">
										<p className="font-semibold">Expert Instructors:</p>
										<p>
											Learn from industry-leading professionals and experienced
											consultants
										</p>
									</div>
								</div>

								<div className="flex items-start mt-2">
									<FontAwesomeIcon className="mr-2 mt-1" icon={faCheckCircle} />
									<div className="flex-1">
										<p className="font-semibold">Practical Experience:</p>
										<p>
											Real-world projects and case studies to apply learned
											concepts
										</p>
									</div>
								</div>

								<div className="flex items-start mt-2">
									<FontAwesomeIcon className="mr-2 mt-1" icon={faCheckCircle} />
									<div className="flex-1">
										<p className="font-semibold">Certification:</p>
										<p>
											Earn a recognized certification upon successful completion
										</p>
									</div>
								</div>
							</div>
							
						</div>
					</div>
				</div>

				{/* Checkout our top courses */}
				<div className={styles.checkout_courses}>
					<div className="lg:py-0 lg:px-14 pt-2 px-8">
						
							<div className={styles.checkoutCourses1}>
								<p className="text-[#23314A] lg:text-[40px] text-[24px] font-[300]">
									Checkout related courses
								</p>
							</div>
						
						<div className={`${styles.career_content} lg:py-8 py-3 text-[#667185]  lg:w-3/4 w-full`}>
							<p className="leading-6">
								{" "}
								Discover our most popular courses, carefully curated to enhance
								your skills and advance your career. Join thousands of learners
								who have already taken the next step with Avenue Impact
							</p>
						</div>

						{/* Preview this Course */}
						<div className={styles.previewCoursesFlex}>
							<CourseCard
								imgSrc={joinTeam}
								altText="joinTeam"
								title={
									<>
										{" "}
										Project Consultant <br /> Training Programme (Bundle)
									</>
								}
								rating="4.3"
								numRatings="45,345"
								previewButtonText="Preview this course"
							/>

							<CourseCard
								imgSrc={joinTeam}
								altText="joinTeam"
								title={
									<>
										{" "}
										Project Consultant <br /> Training Programme (Bundle)
									</>
								}
								rating="4.3"
								numRatings="45,345"
								previewButtonText="Preview this course"
							/>

							<CourseCard
								imgSrc={joinTeam}
								altText="joinTeam"
								title={
									<>
										{" "}
										Project Consultant <br /> Training Programme (Bundle)
									</>
								}
								rating="4.3"
								numRatings="45,345"
								previewButtonText="Preview this course"
							/>

							<CourseCard
								imgSrc={joinTeam}
								altText="joinTeam"
								title={
									<>
										{" "}
										Project Consultant <br /> Training Programme (Bundle)
									</>
								}
								rating="4.3"
								numRatings="45,345"
								previewButtonText="Preview this course"
							/>

							<CourseCard
								imgSrc={joinTeam}
								altText="joinTeam"
								title={
									<>
										{" "}
										Project Consultant <br /> Training Programme (Bundle)
									</>
								}
								rating="4.3"
								numRatings="45,345"
								previewButtonText="Preview this course"
							/>

							<CourseCard
								imgSrc={joinTeam}
								altText="joinTeam"
								title={
									<>
										{" "}
										Project Consultant <br /> Training Programme (Bundle)
									</>
								}
								rating="4.3"
								numRatings="45,345"
								previewButtonText="Preview this course"
							/>
						</div>
					</div>

					{/* Certificate */}
					<div className={`${styles.certificate_courses} pt-10`}>
						<div className="lg:py-4 lg:px-14 pt-10 px-8">
							<div className={styles.certificateCourses1}>
								<p className="text-[#23314A] text-2xl font-normal capitalize">
									Certifications
								</p>

								<div className="bg-[#C7D7F4] w-full h-[1px] mt-2" />
								<p className="text-[#667185] py-2 ">
									Professional Training + Life Project Experience (Online)
								</p>
							</div>

							{/* Preview this Course */}
							<div className={`${styles.previewCoursesFlex} py-8`}>
								<div>
									<img src={certificate} alt="" />
								</div>
								<div>
									<img src={certificate} alt="" />
								</div>
								<div>
									<img src={certificate} alt="" />
								</div>
							</div>
						</div>
					</div>

					{/* Our Certified Professionals */}
					<div className={styles.certified_pro}>
						<div className={styles.certified_img}>
							<img src={professionalBG} alt="" />
						</div>

						<ImageOverlay>
							<div
								className={`${styles.certified_content} lg:py-8 lg:px-14 pt-10 px-8`}>
								<div className="lg:flex justify-between lg:text-lg text-white font-extralight">
									<ProfessionalList
										title="Our certified professionals in various disciplines"
										items={professionalItems}
										className="lg:pt-0 pt-6"
									/>
									<ProfessionalList
										title="Industries we serve"
										items={industriesItems}
										className="lg:pt-0 pt-6"
									/>
								</div>
							</div>

							<div className="lg:flex lg:items-center lg:justify-between text-white lg:py-8 lg:px-14 py-10 px-8">
								<div>
									<SocialMediaLinks data={socialMediaData} />
								</div>

								<div className="py-3">
									<small className="lg:text-lg ">
										© 2024 Avenue Impact Limited. All rights reserved
									</small>
								</div>

								<WhiteLogo />
							</div>
						</ImageOverlay>
					</div>
				</div>
			</section>
		</>
	);
};

export default PreviewCourse;
