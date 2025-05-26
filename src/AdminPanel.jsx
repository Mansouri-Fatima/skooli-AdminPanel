import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import Dashboard from "./pages/DashboardPage";
//import Absences from "./pages/Absences/AbsencesPage"; 
import StudentsAbsencesPage from "./pages/Absences/AbsencesPageStudents";
import TeachersAbsencesPage from "./pages/Absences/AbsencesPageTeachers";
import JustificationsLayout from "./pages/justifications/JustificationsLayout"
import JustificationsPage from "./pages/justifications/JustificationsPage"
import PendingJustificationsPage from "./pages/justifications/PendingJustificationsPage"
import AcceptedJustificationsPage from "./pages/justifications/AcceptedJustificationsPage"
import RejectedJustificationsPage from "./pages/justifications/RejectedJustificationsPage"


const AdminPanel = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<Dashboard />} /> 
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
            
            {/* Absences routes - modified to support separate views */}
            <Route path="/absences" element={<Navigate to="/absences/students" replace />} />
            <Route path="/absences/students" element={<StudentsAbsencesPage />} />
            <Route path="/absences/teachers" element={<TeachersAbsencesPage />} />
            
           {/* Justifications routes */}
        <Route path="/justifications" element={<JustificationsLayout />}>
          <Route index element={<JustificationsPage />} />
          <Route path="pending" element={<PendingJustificationsPage />} />
          <Route path="accepted" element={<AcceptedJustificationsPage />} />
          <Route path="rejected" element={<RejectedJustificationsPage />} />
        </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AdminPanel;
