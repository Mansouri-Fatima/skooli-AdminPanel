import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import eyeIcon from "../assets/icons/eye.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ArrowIcon from "../assets/icons/arrow.png";
import { useLocation } from "react-router-dom";
import ParametreIcon from "../assets/icons/parametre.png";
import NotificationIcon from "../assets/icons/notification.png";

const TimeTableListPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [timetables, setTimetables] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Students");
    const [isOpen, setIsOpen] = useState(false);
    const [savedFilters, setSavedFilters] = useState([]);
    const [savedAssignments, setSavedAssignments] = useState([]);
    const [teachersTT, setTeachersTT] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get("category");
        if (category) {
            setSelectedCategory(category);
        }
    }, [location]);

    const toTeachersTT = (savedTimetables) => {
        const teachersTT = [];
    
        savedTimetables.forEach((tt) => {
            // Sécurité : ignorer tt invalide
            if (!tt || !tt.subjects || !tt.teachers) return;
    
            const { subjects, teachers, group, grade } = tt;
    
            Object.entries(subjects).forEach(([day, schedule]) => {
                Object.entries(schedule || {}).forEach(([time, module]) => {
                    const teacher = teachers[module];
                    if (teacher) {
                        teachersTT.push({
                            teacher,
                            time: `${day} ${time}`,
                            module,
                            group,
                            grade
                        });
                    }
                });
            });
        });
    
        return teachersTT;
    };
    


    useEffect(() => {
        let savedTimetables = JSON.parse(localStorage.getItem("timetables"));
        setTeachersTT(toTeachersTT(savedTimetables || []));

        setSavedFilters(JSON.parse(localStorage.getItem("filters")));
        setSavedAssignments(JSON.parse(localStorage.getItem("teacherAssignments")));

        if (!savedTimetables) {
            console.log("Aucun emploi du temps trouvé, ajout d'un test...");
            savedTimetables = [
                {
                    name: "Test Student",
                    category: "Students",
                    subjects: {
                        Monday: { "08:00 - 09:00": "Math", "09:00 - 10:00": "Physics" }
                    },
                    teachers: {
                        Math: "Mr. Smith",
                        Physics: "Mrs. Johnson"
                    },
                    group: "Group 1",
                    grade: "1th" // Ensure grade is included here
                },
                {
                    name: "Test Teacher",
                    category: "Teachers",
                    subjects: {
                        Monday: { "10:00 - 11:00": "Computer Science", "11:00 - 12:00": "Physics" }
                    },
                    teachers: {
                        "Computer Science": "Mr. Thomas",
                        Physics: "Mrs. Johnson"
                    },
                    group: "Group 2",
                    grade: "2nd" // Ensure grade is included here
                }
            ];

            localStorage.setItem("timetables", JSON.stringify(savedTimetables));
        }

        setTimetables(savedTimetables);
    }, []);

    const handleDelete = (index) => {
        const updatedTimetables = timetables.filter((_, i) => i !== index);
        setTimetables(updatedTimetables);
        localStorage.setItem("timetables", JSON.stringify(updatedTimetables));
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-[250px] h-screen fixed left-0 top-0 bg-[#e8f5f0] shadow-md">
                <Sidebar />
            </div>

            <div className="flex-1 min-h-screen ml-64 px-10 py-6 overflow-auto bg-gray-50 relative">

                {/* Header */}
                <div className="absolute top-6 right-10 flex items-center gap-4">
                    <div className="text-center">
                        <p className="font-semibold text-[18px] text-gray-800">Administration</p>
                        <p className="text-gray-500 text-[16px]">Admin</p>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/default-user.png`} alt="User" className="w-12 h-12 rounded-full object-cover" />
                </div>

                <h1 className="text-[34px] font-bold text-primary ml-4">TimeTables for {selectedCategory}</h1>

                {/* Category selector */}
                <div className="relative mt-4 inline-block ml-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 text-[24px] font-poppins font-bold leading-none"
                    >
                        {selectedCategory === "Students" ? "Student" : "Teacher"}
                        <img src={ArrowIcon} alt="ArrowIcon" className={`w-2 h-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
                    </button>
                    {isOpen && (
                        <div className="absolute mt-2 bg-white shadow-lg rounded-lg w-40 z-10">
                            {["Students", "Teachers"].map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setIsOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    {category === "Students" ? "Student" : "Teacher"}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Search bar */}
                <div className="mt-4 ml-[-40px]">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>

                {/* Timetable Display */}
                {selectedCategory === "Students" ? (
                    timetables.length === 0 ? (
                        <p className="text-gray-500 text-lg mt-6 ml-10">No timetables available.</p>
                    ) : (
                        <div className="grid grid-cols-2 gap-6 mt-6 ml-4">
                            {timetables
                                .filter((table) => table.category === "Students" && table.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((table, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                                        <div>
                                            <h2 className="font-bold">{table.name}</h2>
                                            <div
                                                className="flex items-center gap-2 text-gray-500 cursor-pointer"
                                                onClick={() => navigate(`/time-table/${index}`)}
                                            >
                                                <img src={eyeIcon} alt="View" className="w-4 h-3" />
                                                <p>View Timetable</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                className="text-green-500 text-xl"
                                                onClick={() => navigate(`/time-table/${index}`)}
                                            >
                                                ➔
                                            </button>
                                            <button
                                                className="text-primary text-m"
                                                onClick={() => handleDelete(index)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )
                ) : (
                    <div className="grid grid-cols-2 gap-6 mt-6 ml-4">
                        {Object.entries(
                            teachersTT.reduce((acc, entry) => {
                                if (!acc[entry.teacher]) acc[entry.teacher] = [];
                                acc[entry.teacher].push(entry);
                                return acc;
                            }, {})
                        ).map(([teacher, entries], index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                                onClick={() => navigate(`/teachers-timetable/${encodeURIComponent(teacher)}`)}
                            >

                                <div>
                                    <h2 className="font-bold">{teacher} - {entries[0].module}</h2>
                                   
                                    <div className="text-gray-500 mt-1">
    {entries.length > 0 && entries[0]?.grade ? (
        <p>{entries[0].grade} - {entries[0]?.group}</p>
    ) : (
        <p>No grade available</p>
    )}
</div>

                                    <div
                                        className="flex items-center gap-2 text-gray-500 cursor-pointer"
                                        onClick={() => navigate(`/time-table/${index}`)}
                                    >
                                        <img src={eyeIcon} alt="View" className="w-4 h-3" />
                                        <p>View Timetable</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        className="text-green-500 text-xl"
                                        onClick={() => navigate(`/time-table/${index}`)}
                                    >
                                        ➔
                                    </button>
                                    <button
                                        className="text-primary text-m"
                                        onClick={() => handleDelete(index)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>

                )}

                <div className="flex justify-end mt-6">
                    <Button third rounded onClick={() => navigate("/assign-teachers")}>
                        Create more
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TimeTableListPage;
