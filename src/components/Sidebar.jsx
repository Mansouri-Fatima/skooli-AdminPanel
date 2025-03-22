import React from "react";
import { Link, useLocation } from "react-router-dom";
//importation des icons
import dashboardIcon from "../assets/icons/dashboard.png";
import dashboardIconActive from "../assets/icons/dashboard-active.png";
import studentIcon from "../assets/icons/student.png";
import studentIconActive from "../assets/icons/student-active.png";
import teacherIcon from "../assets/icons/teacher.png";
import teacherIconActive from "../assets/icons/teacher-active.png";
import parentIcon from "../assets/icons/parent.png";
import parentIconActive from "../assets/icons/parent-active.png";
import userIcon from "../assets/icons/user.png";
import userIconActive from "../assets/icons/User-active.png";
import pStudentIcon from "../assets/icons/p-student.png";
import pStudentIconActive from "../assets/icons/pstudent-active.png";
import logo from "../assets/icons/logo.png";
import calendarIcon from "../assets/icons/Calendar.png";
import calendarIconActive from "../assets/icons/Calendar-active.png";


const Sidebar = () => {
  const location = useLocation(); 

  return (
    <div className="fixed left-0 top-0 w-[268px] h-full bg-[#52BD94E8] text-white flex flex-col p-5  shadow-lg z-40  overflow-visible">
      {/* Logo */}
      <div className="mt-10 mb-8 ml-14 flex justify-center">
        <img src={logo} alt="Logo" className="w-[172px] h-[62px]" />
      </div>

      {/* Menu */}
      <nav className="flex-1 ">
        <ul className="space-y-3  ">
          <SidebarItem to="/" icon={dashboardIcon} iconActive={dashboardIconActive} text="Dashboard" active={location.pathname === "/"} />
          <SidebarItem to="/users" icon={userIcon} iconActive={userIconActive} text="New Users" active={location.pathname === "/users"} />
          <SidebarItem to="/students" icon={studentIcon} iconActive={studentIconActive} text="Students" active={location.pathname === "/students"} />
          <SidebarItem to="/teachers" icon={teacherIcon} iconActive={teacherIconActive} text="Teachers" active={location.pathname === "/teachers"} />
          <SidebarItem to="/parents" icon={parentIcon} iconActive={parentIconActive} text="Parents" active={location.pathname === "/parents"} />
          <SidebarItem to="/p-students" icon={pStudentIcon} iconActive={pStudentIconActive} text="P-Students" active={location.pathname === "/p-students"} />
          <SidebarItem 
  to="/time-table-list" 
  icon={calendarIcon} 
  iconActive={calendarIconActive} 
  text="Time Table" 
  active={location.pathname.startsWith("/time-table")} 
/>
</ul>
      </nav>
    </div>
  );
};

// Composant réutilisable pour les éléments du menu
const SidebarItem = ({ to, icon, iconActive, text, active }) => {
  return (
    <li className="relative">
      <Link to={to} className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer 
      transition duration-200 relative">

        {/* Rectangle de sélection */}
        {active && <div className="absolute left-0 top-0 w-full  inset-0
        h-full bg-white rounded-[30px]"></div>}

        {/* Icône (change selon l'état actif) */}
        <img
          src={active ? iconActive : icon}
          alt={text}
          className="w-[22px] h-[24px] relative z-10 transition duration-200"
        />

        {/* Texte */}
        <span className={`font-poppins text-[18px] font-medium relative z-10 transition duration-200 
          ${active ? "text-[#52BD94]" : "text-white"}`}>
          {text}
        </span>
      </Link>
    </li>
  );
};

export default Sidebar;
