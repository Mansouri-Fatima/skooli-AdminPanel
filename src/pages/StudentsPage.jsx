import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import TableComponent from "../components/Table";
import Button from "../components/Button";

import ParametreIcon from "../assets/icons/parametre.png";
import NotificationIcon from "../assets/icons/notification.png";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/admin/approved-students");
        setStudents(response.data);
      } catch (err) {
        setError("Failed to load students.", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students 
  const filteredStudents = students.filter(student =>
    Object.values(student).some(value =>
      typeof value === "string" && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const [deletingStudent, setDeletingStudent] = useState(-1);

  const handleDelete = async (id) => {

    setDeletingStudent(id);
    try {
      await axios.delete(`http://localhost:5001/api/admin/users/${id}`);
      setStudents(students.filter(student => student.id !== id))
    } catch (err) {
      setError(err.message);
    }
    setDeletingStudent(-1);

  };

  const [disablingStudent, setDisablingStudent] = useState(-1);

  // enable & disable users 
  const toggleStatus = async (id , is_active) => {
    
    setDisablingStudent(id);

    try {
      await axios.put(`http://localhost:5001/api/admin/users/${id}/status` , {is_active });
      setStudents([...students.map(student => {
        if (student.id == id) {
          student.is_active = is_active;
          return student
        } 
        return student;
      })])


    } catch (err) {
      setError(err.message);
    }

    setDisablingStudent(-1);
  };

  const columns = [
    { label: "Photo", field: "photo", render: (row) => <img src={row.photo || "/default-user.png"} alt="User" className="w-10 h-10 rounded-full mx-auto" /> },
    { label: "First Name", field: "firstName", render: (row) => row.first_name },
    { label: "Last Name", field: "lastName", render: (row) => row.last_name },
    { label: "Parent Email", field: "parent", render: (row) => row.parent_email },
    { label: "Level", field: "level", render: (row) => row.level },
    { label: "Email", field: "email", render: (row) => row.email },
    {
      label: "Action",
      field: "actions",
      render: (row) => (
        <div className="p-3 flex items-center justify-center space-x-2 h-full">
          {disablingStudent == row.id ? <span className="text-red-200"> Disabling </span> :  
           <Button primary={!row.is_active} outlined={row.is_active} rounded onClick={() => toggleStatus(row.id , 1- row.is_active )}> {row.is_active ? "Disable" : "Enable"}</Button> }
          {deletingStudent == row.id ? <span className="text-red-200"> </span> :
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

      {/* Main Content */}
      <div className="flex-1 ml-[250px] p-4 ">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[#52BD94] font-bold text-[34px] ml-14 ">Students</h1>

          {/* Administration Section */}
          <div className="flex items-center space-x-4 mt-4 ">
          {/* <img src={ParametreIcon} alt="Paramètre" className="w-8 h-8" />
            <img src={NotificationIcon} alt="Notification" className="w-8 h-8" />*/}
            <div className="text-center">
              <p className="font-semibold text-[18px] text-gray-800">Administration</p>
              <p className="text-gray-500 text-[16px]">Admin</p>
            </div>
            <img src={`${process.env.PUBLIC_URL}/default-user.png`} alt="User" className="w-12 h-12 rounded-full object-cover" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Loading State */}
        {loading ? (
          <p className="text-gray-500 ">Loading students...</p>
        ) : (
          <TableComponent columns={columns} data={filteredStudents} />
        )}
      </div>
    </div>
  );
};

export default StudentsPage;

