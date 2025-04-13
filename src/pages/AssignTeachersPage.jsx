import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";

// Données de base
const subjects = [
  "Mathematics", "Physics-Chemistry", "Natural Sciences", "French", "English",
  "Arabic", "History-Geography", "Civic Education", "Islamic Education", 
  "Computer Science", "Artistic Education", "Physical Education"
];

const teachers = [
  "Mr. Smith", "Ms. Johnson", "Dr. Brown", "Mrs. White"
];

const levels = ["Middle School", "High School"];
const grades = ["1th", "2th", "3th", "4th"];
const groups = ["Group 1", "Group 2", "Group 3"];

const AssignTeachersPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    level: "",
    grade: "",
    group: "",
  });
  const [assignments, setAssignments] = useState({});
  const navigate = useNavigate();
  const location = useLocation();  // Get the location of the current page

  useEffect(() => {
    // Force reset the page when coming from "Create More"
    if (location.state?.fromCreateNew) {
      // Clear the localStorage
      localStorage.removeItem("filters");
      localStorage.removeItem("teacherAssignments");

      // Reset the state explicitly
      setSelectedFilters({
        level: "",
        grade: "",
        group: "",
      });
      setAssignments({});
    } else {
      // Otherwise, load data from localStorage
      const savedFilters = JSON.parse(localStorage.getItem("filters"));
      const savedAssignments = JSON.parse(localStorage.getItem("teacherAssignments"));

      // If saved filters exist, set them in the state
      if (savedFilters) {
        setSelectedFilters(savedFilters);
      }

      // If saved assignments exist, set them in the state
      if (savedAssignments) {
        setAssignments(savedAssignments.assignments);
      }
    }
  }, [location.state]); // Runs whenever location state changes

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAssignmentChange = (subject, teacher) => {
    setAssignments((prev) => ({
      ...prev,
      [subject]: teacher,
    }));
  };

  const handleSaveAssignments = () => {
    const { level, grade, group } = selectedFilters;

    if (!level || !grade || !group) {
      alert("Please select level, grade, and group before saving.");
      return;
    }

    const dataToSave = {
      level,
      grade,
      group,
      assignments,
    };

    // Save the selected filters and assignments in localStorage
    localStorage.setItem("filters", JSON.stringify(selectedFilters));
    localStorage.setItem("teacherAssignments", JSON.stringify(dataToSave));

    // Navigate to the TimeTablePage after saving
    navigate("/time-table/create");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 bg-gray-50 h-screen fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="flex-1 min-h-screen ml-64 px-10 py-6 overflow-auto bg-gray-50 relative">
        <h1 className="text-[34px] font-bold text-primary mb-6">Assign Teachers to Subjects</h1>

        {/* Filtres */}
        <div className="mt-4 grid grid-cols-3 gap-6">
          <div>
            <label className="block text-[17px] font-bold text-primary mb-2">Level :</label>
            <select
              name="level"
              value={selectedFilters.level}
              className="border-2 border-[#52BD94] p-2 rounded-lg bg-white w-full h-[49px]"
              onChange={handleFilterChange}
            >
              <option value="">Select Level</option>
              {levels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[17px] font-bold text-primary mb-2">Grade :</label>
            <select
              name="grade"
              value={selectedFilters.grade}
              className="border-2 border-[#52BD94] p-2 rounded-lg bg-white w-full h-[49px]"
              onChange={handleFilterChange}
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[17px] font-bold text-primary mb-2">Group :</label>
            <select
              name="group"
              value={selectedFilters.group}
              className="border-2 border-[#52BD94] p-2 rounded-lg bg-white w-full h-[49px]"
              onChange={handleFilterChange}
            >
              <option value="">Select Group</option>
              {groups.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Liste des matières */}
        <div className="grid grid-cols-2 gap-6 mt-10">
          {subjects.map((subject) => (
            <div key={subject} className="flex items-center justify-between bg-white p-4 rounded shadow">
              <span className="font-medium">{subject}</span>
              <select
                value={assignments[subject] || ""}
                onChange={(e) => handleAssignmentChange(subject, e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher} value={teacher}>{teacher}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <Button third rounded onClick={handleSaveAssignments}>
            Save and Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignTeachersPage;
