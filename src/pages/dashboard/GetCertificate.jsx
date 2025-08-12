// import DashButton from '../auth/ButtonDash';
import { Skeleton } from "@/Components/ui/skeleton";
import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import { useGetCertificate } from "@/hooks/students/use-get-certificate";
import { useViewEnrolledCourse } from "@/hooks/students/use-view-enrolled-course";
import { useLoaderData, useParams, useSearchParams } from "react-router-dom";
import DashButton from "../auth/ButtonDash";

export const GetCertificate = () => {
  // const [certificateReady, setCertificateReady] = useState(true);
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");

  const topings = useLoaderData();

  console.log({ topings }, "topings");

  const {
    isLoading,
    error,
    data: certificateHTML,
  } = useGetCertificate(courseId, cohortId);
  const handleDownload = () => {
    const blob = new Blob([certificateHTML.data], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "certificate.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="w-full gap-6 rounded-lg lg:grid lg:grid-cols-12">
        {/* Certificate Image */}
        <div className="order-1 col-span-7 mb-4 text-justify md:mb-0">
          <Cert />
        </div>

        {/* Live Session */}
        <div className="order-3 col-span-5 mb-4 rounded-lg py-4 md:mb-0 lg:order-2 lg:border-2 lg:border-gray-100 lg:bg-white lg:px-8">
          <h3 className="mb-2 text-[18px] font-[400] text-gray-800">
            Live session + Mentoring
            {/* (May Cohorts - 3.5 Months Programme) */}
          </h3>

          <CourseDetails />

          <div>
            <DashButton
              className="mt-4 h-[40px] w-[100%] text-white disabled:bg-slate-200"
              disabled={isLoading}
              onClick={handleDownload}
            >
              Download Certificate
            </DashButton>
          </div>
        </div>

        {/* Certificate Recipient Content */}
        <div className="order-2 col-span-7 mb-4 text-justify md:mb-0 lg:order-3">
          <div className="relative lg:p-6">
            <h3 className="text-[24px] font-[500]">Certificate Recipient</h3>
            <p className="py-4 text-[15px] italic">
              This certificate certifies that <StudentName /> successfully
              completed the course {""}
              <span className="text-[#F53366]">
                {`${queryString.get("title") ?? "Project Consultant Training Programme (Bundle)"}`}
              </span>
              , taught by Avenue Impact Academy. It confirms that the student
              completed the entire course. The course duration reflects at the
              time of completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const Cert = () => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");

  const {
    isLoading,
    error,
    data: certificateHTML,
    status,
  } = useGetCertificate(courseId, cohortId);
  console.log(status, "status");
  if (isLoading) return <p>loading...</p>;
  if (error)
    return <p>{error?.response?.data?.message ?? "something went wrong"}</p>;
  if (certificateHTML) {
    const blob = certificateHTML && URL.createObjectURL(certificateHTML?.data);
    return <img src={blob} />;
  }
};

const StudentName = () => {
  const { isLoading, error, data } = useProfile();

  if (isLoading) return <Skeleton className={"h-2 w-9"} />;
  if (error)
    return <p>{error?.response?.data?.message ?? "something went wrong"}</p>;
  if (data) {
    return (
      <span className="text-[#F53366]">
        {`${data?.data?.data?.firstname} ${data?.data?.data?.lastname}`}
      </span>
    );
  }
};

const CourseDetails = () => {
  const { courseId } = useParams();

  const { isLoading, error, data } = useViewEnrolledCourse(courseId);

  if (isLoading) {
    return (
      <>
        <div className="py-4">
          <Skeleton className={"h-[230px] w-full max-w-[431px]"} />
        </div>
        <Skeleton className={"h-9 w-full"} />
      </>
    );
  }

  if (error) {
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;
  }
  return (
    <>
      <div className="py-4">
        <img
          src={data?.data?.data?.cover_image}
          alt=""
          className="rounded-xl"
        />
      </div>

      <div>
        <div className="flex items-center space-x-4">
          <h3 className="text-[25px] font-[600] text-gray-800">
            Price{" "}
            {
              data?.data?.data?.live_class_price?.original_price
                ?.currency_symbol
            }
            {data?.data?.data?.live_class_price?.original_price?.amount}
          </h3>
          <p className="text-[20px] font-[400] line-through">
            {
              data?.data?.data?.live_class_price?.discounted_price
                ?.currency_symbol
            }
            {data?.data?.data?.live_class_price?.discounted_price?.amount}
          </p>
          <p className="text-[13.42px] font-bold text-gray-500">
            {(
              (data?.data?.data?.live_class_price?.discounted_price?.amount /
                data?.data?.data?.live_class_price?.original_price?.amount) *
              100
            ).toFixed(0)}
            % off
          </p>
        </div>
        <p className="mt-2 text-gray-600">
          Every Monday to Friday {data?.data?.data?.live_class_price?.time}
        </p>
      </div>
    </>
  );
};
export default GetCertificate;
