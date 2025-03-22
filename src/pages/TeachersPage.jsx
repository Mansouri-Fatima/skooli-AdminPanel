import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import TableComponent from "../components/Table";

// Importation des icônes depuis les assets
import ParametreIcon from "../assets/icons/parametre.png";
import NotificationIcon from "../assets/icons/notification.png";

const TeachersPage = () => {
  const [teachers, SetTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teacherss from the backend
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/admin/approved-teachers");
        SetTeachers(response.data);
      } catch (err) {
        setError("Failed to load teachers.", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter((teacher) =>
    Object.values(teacher).some((value) =>
      typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  //delete teacher
  const [deletingTeacher, setDeletingTeacher] = useState(-1);

  const handleDelete = async (id) => {
    
    setDeletingTeacher(id);
    try {
      await axios.delete(`http://localhost:5001/api/admin/users/${id}`);
      SetTeachers(teachers.filter(teacher => teacher.id !== id))
    } catch (err) {
      setError(err.message);
    }

    setDeletingTeacher(-1);
  };

//Disable and Enable teacher
  const [disablingTeacher, setDisablingTeacher] = useState(-1);

  const toggleStatus = async (id , is_active) => {

    setDisablingTeacher(id);
    
    try {
      await axios.put(`http://localhost:5001/api/admin/users/${id}/status` , {is_active });
      SetTeachers([...teachers.map(teacher => {
        if (teacher.id == id) {
          teacher.is_active = is_active;
          return teacher
        } 
        return teacher;
      })])

    } catch (err) {
      setError(err.message);
    }

    setDisablingTeacher(-1);
  };
  


  const columns = [
    { label: "Photo", field: "photo", render: () => <img src="/default-user.png" alt="User" className="w-10 h-10 rounded-full mx-auto" /> },
    { label: "First Name", field: "firstName", render: (row) => row.first_name },
    { label: "Last Name", field: "lastName", render: (row) => row.last_name },
    { label: "Subject", field: "subject", render: (row) => row.subject },
    { label: "Level", field: "level", render: (row) => row.level },
    { label: "Phone number", field: "phone number", render: (row) => row.phone_number },
    { label: "Email", field: "email", render: (row) => row.email },
    {
      label: "Action",
      field: "actions",
      render: (row) => (
        <div className="p-3 flex items-center justify-center space-x-2 h-full">
        {disablingTeacher == row.id ? <span className="text-red-200"> Disabling </span> :  
         <Button primary={!row.is_active} outlined={row.is_active} rounded onClick={() => toggleStatus(row.id , 1- row.is_active )}> {row.is_active ? "Disable" : "Enable"}</Button> }
        {deletingTeacher == row.id ? <span className="text-red-200"> </span> :
          <Button secondary rounded onClick={() => handleDelete(row.id)}>Delete</Button>}
        </div>
      )
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-[250px] h-screen fixed left-0 top-0 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 ml-[250px] p-6">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[#52BD94] font-bold text-[34px] ml-14">Teachers</h1>

          {/* Section Administration */}
          <div className="flex items-center space-x-4 mt-4 ">
            {/*<img src={ParametreIcon} alt="Paramètre" className="w-8 h-8" />
            <img src={NotificationIcon} alt="Notification" className="w-8 h-8" />*/}
            <div className="text-center">
              <p className="font-semibold text-[18px] text-gray-800">Administration</p>
              <p className="text-gray-500 text-[16px]">Admin</p>
            </div>
            <img src={`${process.env.PUBLIC_URL}/default-user.png`} alt="User" className="w-12 h-12 rounded-full object-cover" />
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        {/* Error Handling */}
        {error && <p className="text-red-500">{error}</p>}


        {/* Loading State */}
        {loading ? (
          <p className="text-gray-500">Loading teachers...</p>
        ) : (
          <TableComponent columns={columns} data={filteredTeachers} />
        )}

      </div>
    </div>
  );
};

export default TeachersPage;