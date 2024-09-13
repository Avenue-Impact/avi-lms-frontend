import React, { useState } from 'react';
import CourseTable from './CourseTable';

const studentManagement = () => {
  // State to manage the list of courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Emery Torff',
      email: 'thekdif@gmail.com',
      title: 'Project Consultant Training ...',
      type: 'Live Session',
      enrollmentDate: 'Apr 12, 2023 | 09:32AM',
      duration: 'May Cohort'
    },
    {
      id: 2,
      name: 'Alex Johnson',
      email: 'alexj@gmail.com',
      title: 'Advanced Project Management',
      type: 'On Demand',
      enrollmentDate: 'Apr 13, 2023 | 10:15AM',
      duration: 'June Cohort'
    },
    {
      id: 3,
      name: 'Sarah Lee',
      email: 'slee@gmail.com',
      title: 'Certified Business Analyst',
      type: 'Live Session',
      enrollmentDate: 'Apr 14, 2023 | 11:00AM',
      duration: 'July Cohort'
    },
    // Add more course objects as needed
  ]);

  // Function to remove a course by id
  const handleRemoveStudent = (id) => {
    setCourses(courses.filter(course => course.id !== id));
    alert('Remove student');
    setShowDropdown(null); // Close the dropdown after action
  };

  return (
    <div className="p-4">
      {/* Pass the courses and handleRemoveStudent function to CourseTable */}
      <CourseTable courses={courses} onRemoveStudent={handleRemoveStudent} />
    </div>
  );
};

export default studentManagement;
