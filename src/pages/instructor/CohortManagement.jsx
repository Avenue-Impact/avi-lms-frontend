import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchCohortStudents } from '@/hooks/instructor/use-fetch-cohort-students';
import { useFetchInstructorCohorts } from '@/hooks/instructor/use-fetch-instructor-cohorts';
import { 
    Users, 
    FileText, 
    Video, 
    Settings, 
    Mail, 
    Phone, 
    ChevronLeft,
    Plus
} from 'lucide-react';
import { CommonButton } from '@/Components/ui/button';

const CohortManagement = () => {
    const { cohortId } = useParams();
    const [activeTab, setActiveTab] = useState('students');
    
    const { data: studentsData, isLoading: isLoadingStudents } = useFetchCohortStudents(cohortId);
    const { data: cohortsData } = useFetchInstructorCohorts();
    
    const cohort = cohortsData?.data?.cohorts?.find(c => c.id === cohortId);
    const students = studentsData?.data?.students || [];

    if (isLoadingStudents) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color-600"></div>
            </div>
        );
    }

    return (
        <div>
            <Link to="/instructor" className="flex items-center gap-2 text-gray-500 hover:text-primary-color-600 mb-6 transition-colors">
                <ChevronLeft size={16} />
                <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-primary-color-50 text-primary-color-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                {cohort?.cohort || 'Cohort'}
                            </span>
                            <h1 className="text-2xl font-bold text-gray-900">{cohort?.course_id?.title || 'Cohort Details'}</h1>
                        </div>
                        <p className="text-gray-500 flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1"><Users size={14} /> {students.length} Students</span>
                            <span className="flex items-center gap-1"><Video size={14} /> {cohort?.class_days} @ {cohort?.time}</span>
                        </p>
                    </div>
                    
                    <div className="flex gap-3">
                        <CommonButton variant="outline" className="flex items-center gap-2">
                            <Video size={16} />
                            Join Live Session
                        </CommonButton>
                        <Link to={`/instructor/cohort/${cohortId}/assignments`}>
                            <CommonButton className="flex items-center gap-2 bg-primary-color-600 text-white">
                                <Plus size={16} />
                                Create Assignment
                            </CommonButton>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6 sticky top-[64px] bg-gray-50/80 backdrop-blur-sm z-10 pt-2">
                <button 
                    onClick={() => setActiveTab('students')}
                    className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${activeTab === 'students' ? 'border-primary-color-600 text-primary-color-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Student List
                </button>
                <button 
                    onClick={() => setActiveTab('assignments')}
                    className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${activeTab === 'assignments' ? 'border-primary-color-600 text-primary-color-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Assignments
                </button>
            </div>

            {activeTab === 'students' ? (
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{student.firstname} {student.lastname}</div>
                                            <div className="text-xs text-gray-400">Enrolled on {new Date().toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Mail size={12} className="text-gray-400" />
                                                    {student.email}
                                                </div>
                                                {student.phone && (
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Phone size={12} className="text-gray-400" />
                                                        {student.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary-color-600 hover:text-primary-color-700 font-semibold">
                                                View Progress
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center text-gray-500 italic">
                                        No students enrolled in this cohort yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                    <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                    <h3 className="text-lg font-semibold text-gray-900">No Assignments Found</h3>
                    <p className="text-gray-500 mt-1">Start by creating an assignment task for this cohort.</p>
                    <Link to={`/instructor/cohort/${cohortId}/assignments`} className="mt-4 inline-block">
                         <CommonButton className="bg-primary-color-600 text-white">Create First Assignment</CommonButton>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CohortManagement;
