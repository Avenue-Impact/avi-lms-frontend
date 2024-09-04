import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons';

const CourseTable = ({ courses }) => {
  const [showDropdown, setShowDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (showDropdown === index) {
      setShowDropdown(null); // Hide dropdown if already open
    } else {
      setShowDropdown(index); // Show the dropdown
    }
  };

  const handleRemoveStudent = () => {
    alert('Remove student');
    setShowDropdown(null); // Close the dropdown after action
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-[#344054] text-[13px] border border-gray-300">
        <thead>
          <tr  className="min-w-full bg-[#E4E7EC] border-0 border-red-500">
            <th className="px-4 py-2 text-left border-b">S/N</th>
            <th className="px-4 py-2 text-left border-b">Name</th>
            <th className="px-4 py-2 text-left border-b">Course Title</th>
            <th className="px-4 py-2 text-left border-b">Course Type</th>
            <th className="px-4 py-2 text-left border-b">Enrollment Date</th>
            <th className="px-4 py-2 text-left border-b">Course Duration</th>
          </tr>
        </thead>
        <tbody className='text-[14px]'>
          {courses.map((course, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">
                {course.name} <br />
                <span className="text-gray-500">{course.email}</span>
              </td>
              <td className="px-4 py-2 border-b">{course.title}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className="inline-block px-2 py-1 font-[500] rounded"
                  style={{ backgroundColor: '#FFECE5', color: '#AD3307' }}>
                  {course.type}
                </span>
              </td>
              <td className="px-4 py-2 border-b">{course.enrollmentDate}</td>
              <td className="px-4 py-2 border-b relative">
                {course.duration}
                <button
                  onClick={() => toggleDropdown(index)}
                  className="ml-2 text-gray-600 focus:outline-none">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
                {showDropdown === index && (
                  <div className="absolute right-0 z-10 w-32 py-2 mt-2 bg-white rounded shadow-lg">
                    <button
                      onClick={handleRemoveStudent}
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">
                         <FontAwesomeIcon icon={faTrash} className="mr-2" /> Remove
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
