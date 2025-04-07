import React from 'react'
import NoCoursesImg from '../../../assets/images/admin/no-student-icon.png';

const CertificateEmpty = () => {
  return (
    <div>
      {/* <h2 className="text-[20px] mt-5 font-[500] text-[#344054] mb-2">No Financial Aid Request</h2> */}

      <div className="mb-4 mt-5 gap-10 p-10 md:mb-0">
        <div className="pt-8">
          <div className="flex flex-col items-center justify-center rounded-lg p-6">
            <img
              src={NoCoursesImg}
              alt="No Courses"
              className="mb-4 h-32 w-32 rounded-full"
            />
            <h3 className="mb-2 text-2xl font-semibold text-gray-800">
              No Courses Available
            </h3>
            <p className="mb-4 text-center text-sm text-gray-600">
              There are no courses at the moment.
              <span className="lg:block">
                You need to create a course before issuing certificates.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateEmpty