import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import TimeTableGrid from "../components/timetable";
import FilterMenu from "../components/FilterMenu";
import DaySelector from "../components/DaySelector";
import { useNavigate } from "react-router-dom";

// Importation des icônes
import ParametreIcon from "../assets/icons/parametre.png";
import NotificationIcon from "../assets/icons/notification.png";
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
const levels = ["Middle School"];
const teachers = ["Mr. Smith", "Ms. Johnson", "Dr. Brown", "Mrs. White"];

export default function TimeTablePage() {
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [selectedCategory, setSelectedCategory] = useState("Students");
  const [filters, setFilters] = useState({
    level: "",
    grade: "",
    group: "",
    teacher: "",
    subject: ""
  });
  const navigate = useNavigate();

  const handleSubjectSelect = (day, time, subject) => {
    setSelectedSubjects((prev) => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [time]: subject,
      },
    }));
  };


  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Création et stockage de l'emploi du temps
  const handleCreateTimetable = () => {
    if (selectedCategory === "Students") {
      if (!filters.grade || !filters.group) {
        alert("Please select a grade and a group before creating the timetable.");
        return;
      }
    } else {
      if (!filters.teacher || !filters.group) {
        alert("Please select a teacher and a group before creating the timetable.");
        return;
      }
    }

    const newTimetable = {
      name: selectedCategory === "Students"
        ? `${filters.grade} - ${filters.group}`
        : `${filters.teacher} - ${filters.group}`,
      category: selectedCategory, 
      teacher: selectedCategory === "Teachers" ? filters.teacher : "",
      group: filters.group,
      level: filters.level,
      subjects: selectedSubjects,
    };

    // Sauvegarde dans le localStorage
    const savedTimetables = JSON.parse(localStorage.getItem("timetables")) || [];
    const updatedTimetables = [...savedTimetables, newTimetable];
    localStorage.setItem("timetables", JSON.stringify(updatedTimetables));
    
    console.log("Emplois du temps sauvegardés :", updatedTimetables);

   
    navigate("/time-table/list", { state: { newTimetableAdded: true } });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 h-screen fixed left-0 top-0">
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 min-h-screen ml-64 px-10 py-6 overflow-auto bg-gray-50 relative">
        
        {/* Section administration */}
        <div className="absolute top-6 right-10 flex items-center gap-4">
         {/* <img src={ParametreIcon} alt="Paramètre" className="w-8 h-8" />
          <img src={NotificationIcon} alt="Notification" className="w-8 h-8" />*/}
          <div className="text-center">
            <p className="font-semibold text-[18px] text-gray-800">Administration</p>
            <p className="text-gray-500 text-[16px]">Admin</p>
          </div>
          <img src={`${process.env.PUBLIC_URL}/default-user.png`} alt="User" className="w-12 h-12 rounded-full object-cover" />
        </div>

        {/* Titre et bouton retour */}
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate("/time-table/list")} className="text-primary transition">
            <ArrowLeft className="w-8 h-8" />
          </button>
          <h1 className="text-[34px] font-bold text-primary">Time Table</h1>
        </div>

        {/* Menu de filtre */}
        <FilterMenu
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          levels={levels}
          groups={groups}
          subjects={subjects}
          teachers={teachers}
          handleFilterChange={handleFilterChange}
          filters={filters}
        />

        <DaySelector days={days} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

        {/* emploi du temps */}
        <TimeTableGrid
          times={times}
          selectedDay={selectedDay}
          selectedSubjects={selectedSubjects[selectedDay] || {}}
          handleSubjectSelect={(time, subject) => handleSubjectSelect(selectedDay, time, subject)}
          selectedCategory={selectedCategory}
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
