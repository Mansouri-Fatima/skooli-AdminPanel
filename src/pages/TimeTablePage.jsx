import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import TimeTableGrid from "../components/timetable";
import DaySelector from "../components/DaySelector";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const times = {
  Sunday: ["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "2pm-3pm", "3pm-4pm"],
  Monday: ["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "2pm-3pm", "3pm-4pm"],
  Tuesday: ["8am-9am", "9am-10am", "10am-11am", "11am-12pm"],
  Wednesday: ["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "2pm-3pm", "3pm-4pm"],
  Thursday: ["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "2pm-3pm", "3pm-4pm"]
};

const subjects = [
  "Mathematics", "Physics-Chemistry", "Natural Sciences", "French", "English",
  "Arabic", "History-Geography", "Civic Education", "Islamic Education", "Computer Science",
  "Artistic Education", "Physical Education", "Free"
];

const groups = ["Group 1", "Group 2", "Group 3", "Group 4", "Group 5", "Free"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

export default function TimeTablePage() {
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [assignments, setAssignments] = useState({});
  const [filters, setFilters] = useState({
    level: "",
    grade: "",
    group: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve assignments and filters from localStorage
    const savedAssignments = JSON.parse(localStorage.getItem("teacherAssignments"));
    const savedFilters = JSON.parse(localStorage.getItem("filters"));

    if (savedAssignments) {
      setAssignments(savedAssignments.assignments);
    }

    if (savedFilters) {
      setFilters(savedFilters);
    } else {
      console.log("No saved filters found");
    }
  }, []);

  const handleSubjectSelect = (day, time, subject) => {
    setSelectedSubjects((prev) => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [time]: subject,
      },
    }));
  };

  const handleCreateTimetable = () => {
    const { level, grade, group } = filters;

    if (!level || !grade || !group) {
      alert("Grade, Group, and Level information are missing. Please go back to the Assign Teachers page.");
      return;
    }

    const timetableName = `${grade} - ${group} Timetable`;

    const newTimetable = {
      name: timetableName,
      category: "Students",
      group,
      level,
      subjects: selectedSubjects,
      teachers: assignments,
      grade
    };

    const savedTimetables = JSON.parse(localStorage.getItem("timetables")) || [];
    const updatedTimetables = [...savedTimetables, newTimetable];
    localStorage.setItem("timetables", JSON.stringify(updatedTimetables));

    // Redirect to Timetable List page after saving
    navigate("/time-table/list", { state: { newTimetableAdded: true } });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 bg-gray-50 h-screen fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="flex-1 min-h-screen ml-64 px-10 py-6 overflow-auto bg-gray-50 relative">
        <div className="absolute top-6 right-10 flex items-center gap-4">
          <div className="text-center">
            <p className="font-semibold text-[18px] text-gray-800">Administration</p>
            <p className="text-gray-500 text-[16px]">Admin</p>
          </div>
          <img src={`${process.env.PUBLIC_URL}/default-user.png`} alt="User" className="w-12 h-12 rounded-full object-cover" />
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => navigate("/assign-teachers")} className="text-primary transition">
            <ArrowLeft className="w-8 h-8" />
          </button>
          <h1 className="text-[34px] font-bold text-primary">Time Table</h1>
        </div>

        <DaySelector days={days} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

        <TimeTableGrid
          times={times}
          selectedDay={selectedDay}
          selectedSubjects={selectedSubjects[selectedDay] || {}}
          handleSubjectSelect={(time, subject) => handleSubjectSelect(selectedDay, time, subject)}
          selectedCategory="Students"
          subjects={subjects}
          groups={groups}
        />

        <div className="flex justify-end mt-4">
          <Button third rounded onClick={handleCreateTimetable}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
