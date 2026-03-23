import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchAssignmentTasks, useCreateAssignmentTask } from '@/hooks/instructor/use-assignment-management';
import { useFetchInstructorCohorts } from '@/hooks/instructor/use-fetch-instructor-cohorts';
import { 
    ChevronLeft, 
    Plus, 
    FileText, 
    Calendar, 
    Clock, 
    MoreVertical,
    CheckCircle2,
    X,
    Loader2
} from 'lucide-react';
import { CommonButton } from '@/Components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const assignmentSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    due_date: z.string().refine((date) => new Date(date) > new Date(), {
        message: "Due date must be in the future",
    }),
});

const AssignmentManagement = () => {
    const { cohortId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const { data: assignmentsData, isLoading } = useFetchAssignmentTasks(cohortId);
    const { data: cohortsData } = useFetchInstructorCohorts();
    const { mutate: createAssignment, isLoading: isCreating } = useCreateAssignmentTask();
    
    const cohort = cohortsData?.data?.cohorts?.find(c => c.id === cohortId);
    const assignments = assignmentsData?.data?.tasks || [];

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(assignmentSchema),
    });

    const onSubmit = (data) => {
        createAssignment({
            ...data,
            cohort_id: cohortId,
            course_id: cohort?.course_id?._id || cohort?.course_id?.id
        }, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-primary-color-600" size={32} />
            </div>
        );
    }

    return (
        <div>
            <Link to={`/instructor/cohort/${cohortId}`} className="flex items-center gap-2 text-gray-500 hover:text-primary-color-600 mb-6 transition-colors">
                <ChevronLeft size={16} />
                <span className="text-sm font-medium">Back to Cohort</span>
            </Link>

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
                    <p className="text-gray-500 mt-1">
                        {cohort?.course_id?.title} - {cohort?.cohort}
                    </p>
                </div>
                <CommonButton 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary-color-600 text-white"
                >
                    <Plus size={16} />
                    New Assignment
                </CommonButton>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {assignments.length > 0 ? (
                    assignments.map((assignment) => (
                        <div key={assignment.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="flex-grow">
                                    <Link to={`/instructor/assignments/${assignment.id}/submissions`} className="group inline-block mb-1">
                                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-color-600 transition-colors">
                                            {assignment.title}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-500 text-sm line-clamp-1 max-w-2xl">{assignment.description}</p>
                                    <div className="flex items-center gap-4 mt-3 text-xs font-medium uppercase tracking-wider">
                                        <span className="flex items-center gap-1 text-red-500">
                                            <Calendar size={14} />
                                            Due: {new Date(assignment.due_date).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <Clock size={14} />
                                            Posted: {new Date(assignment.created_at).toLocaleDateString()}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full ${assignment.status === 'Published' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'}`}>
                                            {assignment.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                        <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                        <h3 className="text-lg font-semibold text-gray-900">No Assignments Yet</h3>
                        <p className="text-gray-500 mt-1">Create your first assignment task for this cohort.</p>
                    </div>
                )}
            </div>

            {/* Create Assignment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Create New Assignment</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Assignment Title</label>
                                <input 
                                    {...register('title')}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-color-600 outline-none transition-all ${errors.title ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="e.g., Module 1: Data Analysis Project"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1 font-medium">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                <textarea 
                                    {...register('description')}
                                    rows={4}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-color-600 outline-none transition-all resize-none ${errors.description ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="Provide instructions for the students..."
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Due Date</label>
                                <input 
                                    {...register('due_date')}
                                    type="date"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-color-600 outline-none transition-all ${errors.due_date ? 'border-red-500' : 'border-gray-200'}`}
                                />
                                {errors.due_date && <p className="text-red-500 text-xs mt-1 font-medium">{errors.due_date.message}</p>}
                            </div>

                            <div className="pt-4 flex gap-3">
                                <CommonButton 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </CommonButton>
                                <CommonButton 
                                    type="submit" 
                                    className="flex-1 bg-primary-color-600 text-white flex items-center justify-center gap-2"
                                    disabled={isCreating}
                                >
                                    {isCreating ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                                    {isCreating ? 'Creating...' : 'Create Assignment'}
                                </CommonButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentManagement;
