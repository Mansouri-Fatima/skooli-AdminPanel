import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ParametreIcon from "../assets/icons/parametre.png";
import NotificationIcon from "../assets/icons/notification.png";
import { ArrowLeft } from "lucide-react";

const TeachersDetailsPage = () => {
    const { teacherName } = useParams();
    const navigate = useNavigate();
    const [scheduleByDay, setScheduleByDay] = useState({});

    useEffect(() => {
        const savedTimetables = JSON.parse(localStorage.getItem("timetables")) || [];

        const teacherEntries = [];

        savedTimetables.forEach((tt) => {
            const { subjects, teachers, group,grade } = tt;
            Object.entries(subjects).forEach(([day, schedule]) => {
                Object.entries(schedule).forEach(([time, subject]) => {
                    const teacher = teachers[subject];
                    if (teacher === teacherName) {
                        teacherEntries.push({
                            day,
                            time,
                            subject,
                            group,
                            grade,
                        });
                    }
                });
            });
        });

        const groupedByDay = teacherEntries.reduce((acc, entry) => {
            if (!acc[entry.day]) acc[entry.day] = [];
            acc[entry.day].push(entry);
            return acc;
        }, {});

        setScheduleByDay(groupedByDay);
    }, [teacherName]);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-[#e8f5f0] h-screen fixed left-0 top-0">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 min-h-screen ml-64 px-10 py-6 overflow-auto bg-gray-50 border-x-2 border-gray-300">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate("/time-table-list?category=Teachers")}
                            className="text-primary transition"
                        >
                            <ArrowLeft className="w-8 h-8" />
                        </button>
                        <h1 className="text-[34px] font-bold text-primary">
                            Time Table of {teacherName}
                        </h1>
                    </div>

                    {/* Admin section */}
                    <div className="flex items-center gap-4">
                        <img src={ParametreIcon} alt="Paramètre" className="w-8 h-8" />
                        <img src={NotificationIcon} alt="Notification" className="w-8 h-8" />
                        <div className="text-center">
                            <p className="font-semibold text-[16px] text-gray-800">Administration</p>
                            <p className="text-gray-500 text-[14px]">Admin</p>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/default-user.png`} alt="User" className="w-10 h-10 rounded-full object-cover" />
                    </div>
                </div>

                {/* Schedule */}
                <div className="mt-10">
    {Object.keys(scheduleByDay).length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
            {Object.entries(scheduleByDay).map(([day, entries], index) => {
                // Sort the entries by time
                const sortedEntries = entries.sort((a, b) => {
                    // Time format: "08:00 - 09:00", so we need to split and compare the first time slot
                    const timeA = a.time.split(" - ")[0];
                    const timeB = b.time.split(" - ")[0];

                    // Convert times into a comparable format (e.g., "08:00" becomes 8 * 60 + 0 = 480)
                    const timeAInMinutes = parseInt(timeA.split(":")[0]) * 60 + parseInt(timeA.split(":")[1]);
                    const timeBInMinutes = parseInt(timeB.split(":")[0]) * 60 + parseInt(timeB.split(":")[1]);

                    return timeAInMinutes - timeBInMinutes;
                });

                return (
                    <div key={index} className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
                        <h3 className="text-lg font-bold text-white bg-[#52BD94] rounded-t-lg p-3 text-center">
                            {day}
                        </h3>
                        <ul className="text-gray-700 mt-3 space-y-3">
                            {sortedEntries.map((entry, idx) => (
                                <li key={idx} className="flex items-center justify-between shadow-sm">
                                    <span className="font-semibold text-gray-800">{entry.time}:</span>
                         
                                    <span className="text-gray-800">{entry.group} - {entry.grade || "No grade assigned"}</span>

                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    ) : (
        <p className="text-gray-500">No groups assigned to this teacher.</p>
    )}
</div>

            </div>
        </div>
    );
};

export default TeachersDetailsPage;
