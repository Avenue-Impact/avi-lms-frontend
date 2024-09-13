
import CreatedCourseCard from "../../../Components/admindashboard/course-management/CreatedCourseCard";

import joinTeam from "../../../assets/images/join_team.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

 const CreatedCourse = () => {
  return (
    <div>

        <div className='py-6 flex justify-between'>
            <div className='text-[24px] font-[500]  text-[#344054] ' >
                <p>Course Management</p>
            </div>

            <div className="relative w-2/4">
                <input type="text" className="w-full rounded-md border bg-gray-50 px-1 py-2 pl-10 text-[14px] focus:outline-none"
                    placeholder="Search Course" />
                <div className="absolute left-3 top-1.5 text-gray-400">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
              <CreatedCourseCard
                imgSrc={joinTeam}
                altText="joinTeam"
                title={
                  <>
                    Project Consultant Training Programme (Bundle)
                  </>
                }
              />

              <CreatedCourseCard
                imgSrc={joinTeam}
                altText="joinTeam"
                title={
                  <>
                    Project Consultant Training Programme (Bundle)
                  </>
                }
              />

              <CreatedCourseCard
                imgSrc={joinTeam}
                altText="joinTeam"
                title={
                  <>
                    Project Consultant Training Programme (Bundle)
                  </>
                }
              />

              <CreatedCourseCard
                imgSrc={joinTeam}
                altText="joinTeam"
                title={
                  <>
                    Project Consultant Training Programme (Bundle)
                  </>
                }
              />

              <CreatedCourseCard
                imgSrc={joinTeam}
                altText="joinTeam"
                title={
                  <>
                    Project Consultant Training Programme (Bundle)
                  </>
                }
              />

              <CreatedCourseCard
                imgSrc={joinTeam}
                altText="joinTeam"
                title={
                  <>
                    Project Consultant Training Programme (Bundle)
                  </>
                }
              />

              <CreatedCourseCard
                imgSrc={joinTeam}
                altText="joinTeam"
                title={
                  <>
                    Project Consultant Training Programme (Bundle)
                  </>
                }
              />

              <CreatedCourseCard
                imgSrc={joinTeam}
                altText="joinTeam"
                title={
                  <>
                    Project Consultant Training Programme (Bundle)
                  </>
                }
              />
        </div>
    </div>
  )
}

export default CreatedCourse;