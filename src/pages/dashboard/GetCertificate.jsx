import { Skeleton } from "@/Components/ui/skeleton";
import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import { useGetCertificate } from "@/hooks/students/use-get-certificate";
import { useGetCertificateStatus } from "@/hooks/students/use-get-certificate-status";
import { useRequestCertificate } from "@/hooks/students/use-request-certificate";
import { useViewEnrolledCourse } from "@/hooks/students/use-view-enrolled-course";
import { useParams, useSearchParams } from "react-router-dom";
import DashButton from "../auth/ButtonDash";
import { STUDENT_BASE_URL } from "@/constant";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { AlertCircle, CheckCircle, Clock, Download, RefreshCw, FileText } from "lucide-react";

export const GetCertificate = () => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const rawCohortId = queryString.get("cohortId") || "";
  const rawDuration = queryString.get("duration") || "";
  const rawCohortName = queryString.get("cohortName") || "";
  const rawCourseType = queryString.get("course_type") || queryString.get("courseType") || "";

  // Get request status & eligibility
  const {
    data: statusData,
    isLoading: isStatusLoading,
    refetch: refetchStatus,
  } = useGetCertificateStatus(courseId);

  // Mutation to request certificate
  const { mutate: requestCert, isPending: isRequesting } = useRequestCertificate(courseId);

  const courseType = rawCourseType || statusData?.courseType || (rawCohortId === "on-demand" ? "on demand" : "live class");
  const isOnDemand = String(courseType).toLowerCase().includes("demand");
  const effectiveDuration = rawDuration || statusData?.subscriptionLimit || "";
  const effectiveCohortId = rawCohortId !== "on-demand" ? rawCohortId : (statusData?.cohortId || "");
  const effectiveCohortName = rawCohortName || statusData?.cohort || "";
  const enrollmentId = statusData?.enrollmentId || "";

  const handleDownload = async () => {
    try {
      toast.loading("Preparing download...", { id: "cert-download" });

      const downloadParams = new URLSearchParams();
      downloadParams.append("course_type", courseType);
      if (enrollmentId) downloadParams.append("enrollment_id", enrollmentId);

      if (isOnDemand) {
        if (effectiveDuration) downloadParams.append("duration", effectiveDuration);
      } else {
        if (effectiveCohortId) downloadParams.append("cohort_id", effectiveCohortId);
        if (effectiveCohortName) downloadParams.append("cohort_name", effectiveCohortName);
      }

      const response = await axios.get(
        `${STUDENT_BASE_URL}/courses/${courseId}/certificate/download?${downloadParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `certificate-${queryString.get("title") || "course"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Download started successfully!", { id: "cert-download" });
      // Instantly refetch status to flip UI to "downloaded" state
      refetchStatus();
    } catch (e) {
      toast.error("Failed to download PDF certificate.", { id: "cert-download" });
    }
  };

  const isApproved = statusData?.status === "approved";
  const requestStatus = statusData?.status || "none";
  const isEligible = statusData?.isEligible || false;

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
              {isApproved ? (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Approved
                </span>
              ) : requestStatus === "pending" ? (
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Under Review
                </span>
              ) : requestStatus === "rejected" ? (
                <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Rejected
                </span>
              ) : (
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                  Locked
                </span>
              )}
            </div>
            <div className="p-6 bg-gray-100/50 flex items-center justify-center min-h-[300px]">
              <Cert isApproved={isApproved} statusData={statusData} />
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
              <p className="text-sm text-gray-500">Manage your certificate request.</p>
            </div>
            
            {isStatusLoading ? (
              <Skeleton className="h-12 w-full rounded-lg" />
            ) : (
              <>
                {/* Status-based CTA block */}
                {requestStatus === "none" && (
                  <>
                    {isEligible ? (
                      <DashButton
                        className="h-12 w-full text-base font-medium text-white shadow-sm bg-[#CC1747] hover:bg-[#B3123F] transition-colors flex items-center justify-center gap-2"
                        onClick={() => requestCert()}
                        disabled={isRequesting}
                      >
                        {isRequesting ? "Submitting..." : "Request Certificate"}
                      </DashButton>
                    ) : (
                      <div>
                        <DashButton
                          className="h-12 w-full text-base font-medium text-white bg-slate-300 cursor-not-allowed"
                          disabled={true}
                        >
                          Certificate Locked
                        </DashButton>
                        <p className="text-xs text-amber-600 mt-2 flex items-start gap-1">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>
                            {courseType === "on demand"
                              ? "Please complete all course recording videos (100% progress) to unlock your certificate request."
                              : "Your certificate is awaiting graduation confirmation from your cohort instructor or administrator."}
                          </span>
                        </p>
                      </div>
                    )}
                  </>
                )}

                {requestStatus === "pending" && (
                  <div>
                    <DashButton
                      className="h-12 w-full text-base font-medium text-amber-700 bg-amber-55 bg-amber-50 cursor-not-allowed border border-amber-200 flex items-center justify-center gap-2"
                      disabled={true}
                    >
                      <Clock className="w-5 h-5 animate-pulse" /> Pending Approval
                    </DashButton>
                    <p className="text-xs text-gray-500 mt-2">
                      Your certificate request is currently under review by our administration. Once approved, you will be notified and the download link will activate.
                    </p>
                  </div>
                )}

                {requestStatus === "rejected" && (
                  <div className="flex flex-col gap-3">
                    <div className="rounded-lg bg-rose-50 border border-rose-100 p-4">
                      <h4 className="text-sm font-semibold text-rose-800 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" /> Request Denied
                      </h4>
                      <p className="text-xs text-rose-700 mt-1">
                        Reason: {statusData?.rejection_reason || "Admin has rejected the request."}
                      </p>
                    </div>
                    <DashButton
                      className="h-12 w-full text-base font-medium text-white bg-[#CC1747] hover:bg-[#B3123F] transition-colors"
                      onClick={() => requestCert()}
                      disabled={isRequesting}
                    >
                      {isRequesting ? "Submitting..." : "Re-submit Request"}
                    </DashButton>
                  </div>
                )}

                {requestStatus === "approved" && (
                  <DashButton
                    className="h-12 w-full text-base font-medium text-white shadow-sm bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    onClick={handleDownload}
                  >
                    <Download className="w-5 h-5" /> Download Certificate
                  </DashButton>
                )}

                {requestStatus === "downloaded" && (
                  <div>
                    <DashButton
                      className="h-12 w-full text-base font-medium text-white bg-[#CC1747] hover:bg-[#B3123F] transition-colors flex items-center justify-center gap-2"
                      onClick={() => requestCert()}
                      disabled={isRequesting}
                    >
                      <RefreshCw className="w-5 h-5" /> Request Re-download
                    </DashButton>
                    <p className="text-xs text-gray-500 mt-2">
                      You have already downloaded your certificate. If you need another copy, please submit a re-download request for admin approval.
                    </p>
                  </div>
                )}
              </>
            )}
            
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

const Cert = ({ isApproved, statusData }) => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const rawCohortId = queryString.get("cohortId") || "";
  const rawDuration = queryString.get("duration") || "";
  const rawCohortName = queryString.get("cohortName") || "";
  const rawCourseType = queryString.get("course_type") || queryString.get("courseType") || "";

  const courseType = rawCourseType || statusData?.courseType || (rawCohortId === "on-demand" ? "on demand" : "live class");
  const isOnDemand = String(courseType).toLowerCase().includes("demand");
  const effectiveDuration = rawDuration || statusData?.subscriptionLimit || "";
  const effectiveCohortId = rawCohortId !== "on-demand" ? rawCohortId : (statusData?.cohortId || "");
  const effectiveCohortName = rawCohortName || statusData?.cohort || "";
  const enrollmentId = statusData?.enrollmentId || "";

  const certParams = {
    course_type: courseType,
    ...(enrollmentId ? { enrollment_id: enrollmentId } : {}),
    ...(isOnDemand
      ? { duration: effectiveDuration }
      : { cohort_id: effectiveCohortId, cohort_name: effectiveCohortName }),
  };

  const {
    isLoading,
    error,
    data: certificateHTML,
  } = useGetCertificate(courseId, certParams);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (error) {
      if (error?.response?.data instanceof Blob) {
        error.response.data.text().then(text => {
          try {
            const json = JSON.parse(text);
            setErrorMsg(json.message || "Failed to load certificate preview.");
          } catch(e) {
            setErrorMsg("Failed to load certificate preview.");
          }
        });
      } else {
        setErrorMsg(error?.response?.data?.message || "Failed to load certificate preview.");
      }
    }
  }, [error]);

  if (!isApproved) {
    return (
      <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center min-h-[250px]">
        <FileText className="w-12 h-12 text-gray-300 mb-2" />
        <p className="text-gray-500 font-medium">Certificate Preview Locked</p>
        <p className="text-xs text-gray-400 mt-1 max-w-xs leading-relaxed">
          Preview will unlock automatically once your certificate request has been approved by the admin.
        </p>
      </div>
    );
  }

  if (isLoading) return <Skeleton className="h-[300px] w-[500px] max-w-full rounded-lg" />;
  if (error)
    return <div className="text-center p-6"><p className="text-[#CC1747] font-medium">{errorMsg || "Failed to load certificate preview."}</p></div>;
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

import { useState, useEffect } from "react";
export default GetCertificate;
