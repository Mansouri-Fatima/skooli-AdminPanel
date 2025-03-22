import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import eyeIcon from "../assets/icons/eye.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ArrowIcon from "../assets/icons/arrow.png";

// Importation des icônes
import ParametreIcon from "../assets/icons/parametre.png";
import NotificationIcon from "../assets/icons/notification.png";

const TimeTableListPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [timetables, setTimetables] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Students");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let savedTimetables = JSON.parse(localStorage.getItem("timetables"));
        
        if (!savedTimetables) {
            console.log("Aucun emploi du temps trouvé, ajout d'un test...");
            
            // Création d'un emploi test si localStorage est vide
            savedTimetables = [
                {
                    name: "Test Student",
                    category: "Students",
                    subjects: {
                        Monday: { "08:00 - 09:00": "Math", "09:00 - 10:00": "Physics" }
                    }
                },
                {
                    name: "Test Teacher",
                    category: "Teachers",
                    subjects: {
                        Monday: { "10:00 - 11:00": "Computer Science", "11:00 - 12:00": "Physics" }
                    }
                }
            ];
            
            localStorage.setItem("timetables", JSON.stringify(savedTimetables));
        }
        
        setTimetables(savedTimetables);
    }, []);
    

    const handleDelete = (index) => {
        const updatedTimetables = timetables.filter((_, i) => i !== index);
        setTimetables(updatedTimetables);

    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-[250px] h-screen fixed left-0 top-0 bg-white shadow-md">
                <Sidebar />
            </div>
            <div className="flex-1 min-h-screen ml-64 px-10 py-6 overflow-auto bg-gray-50 relative">

                {/* Section administration */}
                <div className="absolute top-6 right-10 flex items-center gap-4">
                    {/*<img src={ParametreIcon} alt="Paramètre" className="w-8 h-8" />
                    <img src={NotificationIcon} alt="Notification" className="w-8 h-8" />*/}
                    <div className="text-center">
                        <p className="font-semibold text-[18px] text-gray-800">Administration</p>
                        <p className="text-gray-500 text-[16px]">Admin</p>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/default-user.png`} alt="User" className="w-12 h-12 rounded-full object-cover" />
                </div>

                <h1 className="text-[34px] font-bold text-primary ml-4">TimeTables for {selectedCategory}</h1>

                {/* Sélecteur de catégorie */}
                <div className="relative mt-4 inline-block ml-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 text-[24px] font-poppins font-bold leading-none"
                    >
                        {selectedCategory === "Students" ? "Student" : "Teacher"}
                        <img src={ArrowIcon} alt="ArrowIcon" className={`w-2 h-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
                    </button>
                    {isOpen && (
                        <div className="absolute mt-2 bg-white shadow-lg rounded-lg w-40">
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

                {/* Barre de recherche */}
                    <div className="mt-4 ml-[-40px]">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>

                {/*si la liste vide */}
                {timetables.length === 0 ? (
                    <p className="text-gray-500 text-lg mt-6 ml-10">No timetables available.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-6 mt-6 ml-4">
                        {timetables
                            .filter((table) => table.category === selectedCategory && table.name.toLowerCase().includes(searchTerm.toLowerCase())) 
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
                                            ➜
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
                    <Button third rounded onClick={() => navigate("/time-table/create")}>
                        Create more
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TimeTableListPage;
