import certificate from "../../assets/images/certificate.png";
import AVIbg from "../../assets/images/live_coaching.png";
import DashButton from "../auth/ButtonDash";

export const EmptyGetCertificate = () => {
  return (
    <>
      <div>
        <div className="w-full grid-cols-12 gap-6 rounded-lg lg:grid">
          {/* Certificate Image */}
          <div className="order-1 col-span-7 mb-4 text-justify md:mb-0">
            <div className="relative">
              <img
                src={certificate}
                alt="certificate"
                className="w-full blur-sm"
              />
              <div className="absolute inset-0 mx-auto flex items-center justify-center p-4">
                <div className="rounded-lg bg-[#FFEBF0] text-center text-[#CC1747] lg:px-10 lg:py-14">
                  <p>
                    Certificate not ready yet. Complete <br /> course to get
                    certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Session */}
        <div className="order-3 col-span-5 mb-4 h-[480.95px] rounded-lg py-4 md:mb-0 lg:order-2 lg:border-2 lg:border-gray-100 lg:bg-white lg:px-8">
          <h3 className="mb-2 text-[18px] font-[400] text-gray-800">
            Live session + Mentoring (May Cohorts - 3.5 Months Programme)
          </h3>

          <div className="py-4">
            <img src={AVIbg} alt="" className="rounded-xl" />
          </div>

          <div>
            <div className="flex items-center space-x-4">
              <h3 className="text-[25px] font-[600] text-gray-800">
                Price £2,200
              </h3>
              <p className="text-[20px] font-[400] line-through">£39,900</p>
              <p className="font-[bold] text-[13.42px] text-gray-500">
                85% off
              </p>
            </div>
            <p className="mt-2 text-gray-600">Every Monday to Friday 7PM</p>
          </div>

          <div>
            <DashButton className="mt-4 h-[40px] w-[100%] bg-[#7a88a0] text-white hover:bg-[#7a88a0]">
              Download Certificate
            </DashButton>
          </div>
        </div>

        {/* Certificate Recipient Content */}
        <div className="order-2 col-span-7 mb-4 text-justify md:mb-0 lg:order-3">
          <div className="relative lg:p-6">
            <h3 className="text-[24px] font-[500]">Certificate Recipient</h3>
            <p className="py-4 text-[15px] italic">
              This certificate certifies that{" "}
              <span className="text-[#F53366]">Maxwell Samantha</span>{" "}
              successfully completed the course
              <span className="text-[#F53366]">
                {"Project Consultant Training Programme (Bundle)"}
              </span>{" "}
              on 12/06/2024, taught by Avenue Impact Academy. It confirms that
              the student completed the entire course. The course duration
              reflects at the time of completion.
            </p>
          </div>
        </div>
        <p className="mt-2 text-gray-600">Every Monday to Friday 7PM</p>
      </div>
      <div>
        <DashButton className="mt-4 h-[40px] w-[100%] bg-[#91a6ca] text-white hover:bg-[#a0b2d2]">
          Download Certificate
        </DashButton>
      </div>
    </>
  );
};

export default EmptyGetCertificate;
