import { createContext, useEffect, useState } from "react";

const initializeActiveTab = () => {
  const active = localStorage.getItem("active");
  return active ? Number(active) : 1;
};

export const CourseManagementContext = createContext();
const CourseManagementProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(initializeActiveTab);
  const [subTab, setSubTab] = useState(1);

  useEffect(() => {
    localStorage.setItem("active", activeTab.toString());
  }, [activeTab]);

  return (
    <CourseManagementContext.Provider
      value={{ activeTab, setActiveTab, subTab, setSubTab }}
    >
      {children}
    </CourseManagementContext.Provider>
  );
};

export default CourseManagementProvider;
