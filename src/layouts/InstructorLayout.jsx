import React from 'react';
import { Outlet } from 'react-router-dom';

const InstructorLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h2 className="text-xl font-bold text-primary-color-600">Instructor Portal</h2>
                    {/* Add nav or user profile here */}
                </div>
            </header>
            <main className="flex-grow container mx-auto py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default InstructorLayout;
