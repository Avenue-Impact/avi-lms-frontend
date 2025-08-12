import Container from "@/Components/Container";
import { Skeleton } from "@/Components/ui/skeleton";
import { usePreviewCourses } from "@/hooks/students/use-fetch-all-courses";
import { useFetchVideo } from "@/hooks/students/use-fetch-taster-video";
import { cn } from "@/lib/utils";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollRestoration, useNavigate, useParams } from "react-router-dom";
import ImageOverlay from "../Components/ImageOverlay";
import { WhiteLogo } from "../Components/Logo";
import SocialMediaLinks, {
  socialMediaData,
} from "../Components/SocialMediaLink";
import { PreviewVideoNav } from "../Components/avi/AviNav";
import LivePayment from "./auth/components/LivePayment";
import OnDemandPayment from "./auth/components/OnDemandPayment";
import styles from "./pages.module.css";

const PreviewVideoCourse = () => {
  const navigate = useNavigate();
  let { courseId } = useParams();
  const { previewCourse } = usePreviewCourses(courseId);
  console.log("Preview the video", previewCourse);

  return (
    <>
      <ScrollRestoration />

      <div className="hidden lg:block">
        <PreviewVideoNav />
      </div>

      <section>
        <div className={cn(styles.checkout_courses, "")}>
          <div className="lg:pt-5">
            <div className="bg-[#23314A] lg:pb-10">
              <Container>
                <div className="mb-4 flex items-center lg:hidden lg:pt-9">
                  <button onClick={() => navigate(-1)} className="text-white">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  </button>
                </div>

                <div className="mx-auto flex flex-col items-center justify-center lg:text-center">
                  <p className="pb-6 text-[24px] font-[300] text-[white] lg:text-[40px] truncate">
                    {previewCourse?.data?.data.course.title ?? ""}
                  </p>

                  <PreviewVideo />

                  {/* <video
                    src={previewCourse?.data?.data.course.preview_video}
                    controls
                    className="h-auto w-full shadow-lg lg:rounded-3xl"
                  ></video> */}
                </div>
              </Container>
            </div>
          </div>
        </div>

        <Container>
          <div className="lg:pt-[50px]">
            <p className="text-left text-[24px] text-[#23314A] md:text-[24px] md:font-[300] lg:text-[40px]">
              Choose Your Learning Preference
            </p>

            <div className="w-full grid-cols-12 gap-6 rounded-lg border-gray-100 bg-white pt-4 lg:grid lg:border-2 lg:p-8">
              {/* LIVE SESSION */}
              <div className="col-span-5 mb-4 md:mb-0">
                <LivePayment />
              </div>

              <div className="mb-4 flex h-full items-center justify-center text-justify md:mb-0 lg:flex-col">
                <div className="h-[1px] w-full bg-gray-300 lg:h-full lg:w-[1px]"></div>
                <div className="text-gray-300">OR</div>
                <div className="h-[1px] w-full bg-gray-300 lg:h-full lg:w-[1px]"></div>
              </div>

              {/* ON DEMAND SESSION */}
              <div className="col-span-5 mb-4 md:mb-0">
                <OnDemandPayment />
              </div>
            </div>
          </div>
        </Container>

        <div className={styles.checkout_courses}>
          {/* Our Certified Professionals */}
          <div className={styles.certified_pro}>
            <ImageOverlay>
              <Container>
                <div className="text-white lg:flex lg:items-center lg:justify-between lg:px-8">
                  <div>
                    <SocialMediaLinks data={socialMediaData} />
                  </div>

                  <div className="py-3">
                    <small className="lg:text-lg">
                      © 2025 Avenue Impact Limited. All rights reserved
                    </small>
                  </div>

                  <WhiteLogo />
                </div>
              </Container>
            </ImageOverlay>
          </div>
        </div>
      </section>
    </>
  );
};

const PreviewVideo = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useFetchVideo(courseId);

  console.log("Playing video", data);

  if (isLoading) {
    return (
      <div className="max-h-[690px] w-full text-white">
        <Skeleton className="h-[690px] w-full" />
      </div>
    );
  }

  const videoUrl = data?.data?.data?.previewUrl;

  return (
    <video
      src={videoUrl}
      controls
      autoPlay
      className="max-h-[699px] w-full object-cover shadow-lg lg:rounded-3xl"
    />
  );
};



export default PreviewVideoCourse;
