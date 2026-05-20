import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFetchAssignmentSubmissions } from '@/hooks/instructor/use-assignment-submissions';
import { useFetchAssignmentTasks } from '@/hooks/instructor/use-assignment-management';
import { 
    ChevronLeft, 
    FileText, 
    User, 
    Download, 
    ExternalLink,
    CheckCircle,
    Clock,
    Loader2
} from 'lucide-react';
import { CommonButton } from '@/Components/ui/button';
import { useSafeBack } from '@/hooks/use-safe-back';

const SubmissionReview = () => {
    const navigate = useNavigate();
    const goBack = useSafeBack();
    const { taskId } = useParams();
    const { data: submissionsData, isLoading } = useFetchAssignmentSubmissions(taskId);
    
    // We don't have a direct way to fetch a single task by ID from the current hooks, 
    // but we can infer details or wait for a full implementation.
    // For now, let's assume we have the cohortId from context or similar if needed.
    
    const submissions = submissionsData?.data?.submissions || [];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-primary-color-600" size={32} />
            </div>
        );
    }

    return (
        <div>
            <button onClick={goBack} className="flex items-center gap-2 text-gray-500 hover:text-primary-color-600 mb-6 transition-colors">
                <ChevronLeft size={16} />
                <span className="text-sm font-medium">Back to Assignments</span>
            </button>

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Student Submissions</h1>
                    <p className="text-gray-500 mt-1">Review and grade individual student work</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Submitted On</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                        {submissions.length > 0 ? (
                            submissions.map((submission) => (
                                <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-100 rounded-full text-gray-400">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    {submission.student_id?.firstname} {submission.student_id?.lastname}
                                                </div>
                                                <div className="text-xs text-gray-400">{submission.student_id?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <Clock size={14} className="text-gray-400" />
                                            {new Date(submission.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${submission.status === 'reviewed' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                                            {submission.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {submission.file_details?.url && (
                                                <a 
                                                    href={submission.file_details.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-400 hover:text-primary-color-600 transition-colors"
                                                    title="Download Submission"
                                                >
                                                    <Download size={18} />
                                                </a>
                                            )}
                                            <CommonButton variant="outline" className="text-xs py-1 h-8">
                                                Review
                                            </CommonButton>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-500 italic">
                                    No submissions yet for this assignment.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubmissionReview;
