export const useGetRegisteredCourses = () => {
  const registeredCourses = JSON.parse(localStorage.getItem("registeredCourses")) || [];
  return registeredCourses;
};
