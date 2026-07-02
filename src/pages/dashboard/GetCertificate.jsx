// import DashButton from '../auth/ButtonDash';
import { Skeleton } from "@/Components/ui/skeleton";
import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import { useGetCertificate } from "@/hooks/students/use-get-certificate";
import { useViewEnrolledCourse } from "@/hooks/students/use-view-enrolled-course";
import { useLoaderData, useParams, useSearchParams } from "react-router-dom";
import DashButton from "../auth/ButtonDash";

export const GetCertificate = () => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");

  const {
    isLoading,
    error,
    data: certificateHTML,
  } = useGetCertificate(courseId, cohortId);

  const handleDownload = () => {
    if (!certificateHTML) return;
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
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Course Certificate</h1>
        <p className="text-sm text-gray-500 mt-1">Download and share your achievement with the world.</p>
      </div>
      
      <div className="grid w-full gap-8 lg:grid-cols-12">
        {/* Left Column: Certificate Preview & Recipient Details */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-8">
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Certificate Preview</h3>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Completed</span>
            </div>
            <div className="p-6 bg-gray-100/50 flex items-center justify-center min-h-[300px]">
              <Cert />
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-4 mb-4">Certificate Recipient</h3>
            <div className="rounded-lg bg-gray-50 p-5 border border-gray-100">
              <p className="text-base text-gray-700 leading-relaxed">
                This certificate certifies that <span className="font-semibold"><StudentName /></span> successfully
                completed the course {" "}
                <span className="font-semibold text-[#CC1747]">
                  {`${queryString.get("title") ?? "Project Consultant Training Programme (Bundle)"}`}
                </span>
                , taught by Avenue Impact Academy. It confirms that the student
                completed the entire course. The course duration reflects at the
                time of completion.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Course Details & Actions */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sticky top-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Actions</h3>
              <p className="text-sm text-gray-500">Download your verified certificate.</p>
            </div>
            
            <DashButton
              className="h-12 w-full text-base font-medium text-white shadow-sm disabled:bg-slate-300 disabled:cursor-not-allowed bg-[#CC1747] hover:bg-[#B3123F] transition-colors"
              disabled={isLoading || !certificateHTML}
              onClick={handleDownload}
            >
              Download Certificate
            </DashButton>
            
            <hr className="my-6 border-gray-100" />
            
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Course Info</h3>
              <CourseDetails />
            </div>
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
  } = useGetCertificate(courseId, cohortId);

  if (isLoading) return <Skeleton className="h-[300px] w-[500px] max-w-full rounded-lg" />;
  if (error)
    return <p className="text-red-500">{error?.response?.data?.message ?? "Failed to load certificate preview."}</p>;
  if (certificateHTML) {
    const blob = URL.createObjectURL(certificateHTML?.data);
    return <img src={blob} className="w-full max-w-2xl shadow-sm rounded border border-gray-200" alt="Certificate Preview" />;
  }
  return null;
};

const StudentName = () => {
  const { isLoading, error, data } = useProfile();

  if (isLoading) return <Skeleton className={"h-4 w-24 inline-block align-middle"} />;
  if (error) return <span>Student</span>;
  if (data) {
    return (
      <span className="text-[#CC1747]">
        {`${data?.data?.data?.firstname} ${data?.data?.data?.lastname}`}
      </span>
    );
  }
  return null;
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
