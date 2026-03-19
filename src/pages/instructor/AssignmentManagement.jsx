import React from 'react';
import { useParams } from 'react-router-dom';

const AssignmentManagement = () => {
    const { cohortId } = useParams();
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Assignment Management</h1>
            <p>Managing assignments for Cohort ID: {cohortId}</p>
            {/* Add create assignment form and submissions list here */}
        </div>
    );
};

export default AssignmentManagement;
