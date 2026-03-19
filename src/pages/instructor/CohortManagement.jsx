import React from 'react';
import { useParams } from 'react-router-dom';

const CohortManagement = () => {
    const { cohortId } = useParams();
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Cohort Management</h1>
            <p>Managing Cohort ID: {cohortId}</p>
            {/* Add student list, live sessions management here */}
        </div>
    );
};

export default CohortManagement;
