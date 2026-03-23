import React from 'react';
import { Link } from 'react-router-dom';

const InstructorErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-primary-color-600 mb-2">Oops!</h1>
            <p className="text-gray-600 mb-8 text-center text-lg">Something went wrong or you don't have access to this page.</p>
            <Link to="/instructor" className="bg-primary-color-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-color-700 transition-colors">
                Back to Dashboard
            </Link>
        </div>
    );
};

export default InstructorErrorPage;
