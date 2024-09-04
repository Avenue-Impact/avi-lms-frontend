import React from 'react';
import CourseTable from './CourseTable';


const courseData = [
  {
    name: 'Emery Torff',
    email: 'thekdif@gmail.com',
    title: 'Project Consultant Training ...',
    type: 'Live Session',
    enrollmentDate: 'Apr 12, 2023 | 09:32AM',
    duration: 'May Cohort'
  },
  {
    name: 'Alex Johnson',
    email: 'alexj@gmail.com',
    title: 'Advanced Project Management',
    type: 'On Demand',
    enrollmentDate: 'Apr 13, 2023 | 10:15AM',
    duration: 'June Cohort'
  },
  {
    name: 'Sarah Lee',
    email: 'slee@gmail.com',
    title: 'Certified Business Analyst',
    type: 'Live Session',
    enrollmentDate: 'Apr 14, 2023 | 11:00AM',
    duration: 'July Cohort'
  },
  // Add more course objects as needed
];

const studentManagement = () => {
  return (
    <div className="p-4">
      <CourseTable courses={courseData} />
    </div>
  );
};

export default studentManagement;
