import React from 'react';
import DashButton from '../ButtonDash';
import NoCoursesImg from '../../../assets/images/no_courses.png'; 
import { Link } from 'react-router-dom';
// import EmptyJoinProjectTeam from '../components/EmptyJoinProjectTeam';
// import EmptyJoinProjectTeam from '../../../assets/images/no_courses.png'; 


const NoDemandCourses = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg ">
      <img src={NoCoursesImg} alt="No Courses" className="w-32 h-32 mb-4 rounded-full" />
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Courses</h3>
      <p className="text-center text-sm text-gray-600 mb-4">
        It looks like you haven't enrolled in any courses yet. <span className='lg:block'> Explore our wide range of courses and start learning today!</span>
      </p>
      <Link to="/discover-courses">
        <DashButton className="mt-2 bg-[#CC1747] text-white hover:bg-[#b30e3b]">
          Discover Our Courses
        </DashButton>
      </Link>
    </div>
  );
};

export default NoDemandCourses;
