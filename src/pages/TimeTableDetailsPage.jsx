import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";

// Importation des icônes depuis les assets
import ParametreIcon from "../assets/icons/parametre.png";
import NotificationIcon from "../assets/icons/notification.png";

const subjects = [
  "Mathematics", "Physics-Chemistry", "Natural Sciences", "French", "English",
  "Arabic", "History-Geography", "Civic Education", "Islamic Education", "Computer Science",
  "Artistic Education", "Physical Education", "Free"
];

const TimeTableDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [timetable, setTimetable] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedSubjects, setEditedSubjects] = useState({});

    useEffect(() => {
        const savedTimetables = JSON.parse(localStorage.getItem("timetables")) || [];
        if (!savedTimetables[id]) {
            navigate("/time-table-list"); 
            return;
        }
        setTimetable(savedTimetables[id]);
        setEditedSubjects(savedTimetables[id].subjects || {});
    }, [id, navigate]);

    const handleEditClick = () => setIsEditing(true);
    
    const handleSaveClick = () => {
        const savedTimetables = JSON.parse(localStorage.getItem("timetables")) || [];
        savedTimetables[id] = { ...savedTimetables[id], subjects: editedSubjects };
        localStorage.setItem("timetables", JSON.stringify(savedTimetables));
        setTimetable(savedTimetables[id]);
        setIsEditing(false);
    };

    const handleSubjectChange = (day, time, newSubject) => {
        setEditedSubjects(prev => ({
            ...prev,
            [day]: {
                ...(prev[day] || {}),
                [time]: newSubject
            }
        }));
    };

    if (!timetable) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar  */}
            <div className="w-64 bg-gray-50 h-screen fixed left-0 top-0">
                <Sidebar />
            </div>

            {/* Contenu Principal  */}
            <div className="flex-1 min-h-screen ml-64 px-10 py-6 overflow-auto bg-gray-50 border-x-2 border-gray-300">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    
                    {/* Titre et Flèche de retour */}
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => navigate("/time-table-list")} 
                            className="text-primary transition"
                        >
                            <ArrowLeft className="w-8 h-8" />
                        </button>
                        <h1 className="text-[34px] font-bold text-primary">
                            Time Table of {timetable.name}
                        </h1>
                    </div>

                    {/* Section Administration */}
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

                <div className="mt-10 ">
                    {timetable.subjects && Object.keys(timetable.subjects).length > 0 ? (
                        <div className="mt-4 grid grid-cols-3 gap-6">
                            {Object.keys(timetable.subjects).map((day, index) => (
                                <div key={index} className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
                                    <h3 className="text-lg font-bold text-white bg-[#52BD94] rounded-t-lg p-3 text-center">
                                        {day}
                                    </h3>
                                    <ul className="text-gray-700 mt-3 space-y-3">
                                        {Object.entries(timetable.subjects[day]).map(([time, subject]) => (
                                            <li key={time} className="flex items-center justify-between  shadow-sm">
                                                <span className="font-semibold text-gray-800">{time}:</span>
                                                {isEditing ? (
                                                    <select
                                                        value={editedSubjects[day]?.[time] || subject}
                                                        onChange={(e) => handleSubjectChange(day, time, e.target.value)}
                                                        className="border-2 border-[#52BD94] p-2 rounded-lg bg-white w-[180px] h-[39px]"
                                                    >
                                                        {subjects.map((subj) => (
                                                            <option key={subj} value={subj}>{subj}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className="text-gray-800">{subject}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No subjects assigned.</p>
                    )}
                </div>

                <div className="flex justify-end mt-4">
                    {isEditing ? (
                        <Button third rounded onClick={handleSaveClick}>Save</Button>
                    ) : (
                        <Button third rounded onClick={handleEditClick}>Edit</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimeTableDetailPage;
