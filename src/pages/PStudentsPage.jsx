import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import TableComponent from "../components/Table";

// Importation des icônes depuis les assets
import ParametreIcon from "../assets/icons/parametre.png";
import NotificationIcon from "../assets/icons/notification.png";


const PStudentsPage = () => {
  const [pstudents, setPStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch p-students from the backend
  useEffect(() => {
    const fetchPstudents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/admin/invalid-links");
        setPStudents(response.data);
      } catch (err) {
        setError("Failed to load user.", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPstudents();
  }, []);

  const filteredPStudents = pstudents.filter(pstudent =>
    Object.values(pstudent).some(value =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
   //accepter link 
  const [validatingUser, setValidatingUser] = useState(-1);

  const handleValidate = async ({student_id , parent_id }) => {
    
    setValidatingUser(student_id);
    try {
       await axios.put(`http://localhost:5001/api/admin/validate-link` , {
        parent_id , 
        student_id
       });
       setPStudents(pstudents.filter(row => (row.parent_id !== parent_id || row.student_id !== student_id)))

    } catch (e) {
      setError(e.message);
    }
    setValidatingUser(-1);
  };

    
  const columns = [
    { label: "parent full name", field: "parent_full_name", render: (row) => `${row.parent_first_name} ${row.parent_last_name}` },
    { label: "student full name", field: "student_full_name", render: (row) => `${row.student_first_name} ${row.student_last_name}` },
    { label: "Parent Email", field: "parent Email", render: (row) => row.parent_email },
    { label: "student Email", field: "student Email", render: (row) => row.student_email },
   
    { 
      label: "Action", 
      field: "actions", 
      render: (row) => (
        <div className="p-3 flex items-center justify-center space-x-2 h-full">
          {row.student_id == validatingUser ? <span> Validating .. </span> : 
        <Button primary rounded onClick={() => handleValidate(row)}>Validate</Button> }
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
          <h1 className="text-[#52BD94] font-bold text-[34px] ml-14 ">Parents-Students</h1>

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
          <p className="text-gray-500">Loading pstudents...</p>
        ) : (
          <TableComponent columns={columns} data={filteredPStudents} />
        )}
      </div>
    </div>
  );
};

export default PStudentsPage;
