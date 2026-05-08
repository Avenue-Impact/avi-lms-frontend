

export const BASE_URL = import.meta.env.VITE_ADMIN_BASE_URL;
export const INSTRUCTOR_BASE_URL = import.meta.env.VITE_INSTRUCTOR_BASE_URL || (BASE_URL ? BASE_URL.replace('/admins', '/instructor') : 'http://localhost:3500/api/v1/instructor');
export const STUDENT_BASE_URL = import.meta.env.VITE_STUDENT_BASE_URL;


