import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import StudentsPage from "./pages/StudentsPage";
import TeachersPage from "./pages/TeachersPage";
import ParentsPage from "./pages/ParentsPage";
import UsersPage from "./pages/UsersPage";
import PStudentsPage from "./pages/PStudentsPage";
import TimeTablePage from "./pages/TimeTablePage";
import TimeTableListPage from "./pages/TimeTableListPage";
import TimeTableDetailsPage from "./pages/TimeTableDetailsPage"; 
import AssignTeachersPage from "./pages/AssignTeachersPage";
import TeachersDetailsPage from "./pages/TeachersDetailsPage";


const AdminPanel = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/admin" element={<StudentsPage />} /> 
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/parents" element={<ParentsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/p-students" element={<PStudentsPage />} />
            <Route path="/time-table-list" element={<TimeTableListPage />} />
            <Route path="/time-table/create" element={<TimeTablePage />} />
            <Route path="/time-table/:id" element={<TimeTableDetailsPage />} />
            <Route path="/assign-teachers" element={<AssignTeachersPage />} />
            <Route path="/teachers-timetable/:teacherName" element={<TeachersDetailsPage />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AdminPanel;
