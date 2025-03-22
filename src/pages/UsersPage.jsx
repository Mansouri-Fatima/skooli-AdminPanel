import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import TableComponent from "../components/Table";
import Button from "../components/Button";
import axios from "axios";
// Importation des icônes
import ParametreIcon from "../assets/icons/parametre.png";
import NotificationIcon from "../assets/icons/notification.png";
import ArrowIcon from "../assets/icons/arrow.png";

const UsersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Students");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Données des tableaux
  // Fetch students from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [studentResponse, parentResponse, teacherResponse] = await Promise.all([axios.get("http://localhost:5001/api/admin/new-students"), axios.get("http://localhost:5001/api/admin/new-parents"), axios.get("http://localhost:5001/api/admin/new-teachers")]);

        setStudents(studentResponse.data);
        setTeachers(teacherResponse.data);
        setParents(parentResponse.data);
      } catch (err) {
        setError("Failed to load users.", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  //accept user
  const [acceptingUser, setAcceptingUser] = useState(-1);

  const handleAccept = async (id) => {
    setAcceptingUser(id);
    try {
       await axios.put(`http://localhost:5001/api/admin/approve/${id}`);

      setParents(parents.filter(parent => parent.id !== id))
      setStudents(students.filter(student => student.id !== id))
      setTeachers(teachers.filter(teacher => teacher.id !== id))


    } catch (e) {
      setError(e.message);
    }
    setAcceptingUser(-1);
  };
 //delete user
  const [deletingUser, setDeletingUser] = useState(-1);

  const handleDelete = async (id) => {
    
    setDeletingUser(id);
    try {

      await axios.delete(`http://localhost:5001/api/admin/users/${id}`);

      setParents(parents.filter(parent => parent.id !== id))
      setStudents(students.filter(student => student.id !== id))
      setTeachers(teachers.filter(teacher => teacher.id !== id))

    } catch (err) {
      setError(err.message);
    }

    setDeletingUser(-1);

  };


  const columnsConfig = {
    Students: [
      { label: "Photo", field: "photo", render: () => <img src="/default-user.png" alt="User" className="w-10 h-10 rounded-full mx-auto" /> },
      { label: "First Name", field: "firstName", render: (row) => row.first_name },
      { label: "Last Name", field: "lastName", render: (row) => row.last_name },
      { label: "Parent Email", field: "parent", render: (row) => row.parent_email },
      { label: "Study year", field: "study year", render: (row) => row.study_year },
      { label: "Level", field: "level", render: (row) => row.level },
      { label: "Email", field: "email", render: (row) => row.email },
      {
        label: "Action",
        field: "actions",
        render: (row) => (
          <div className="p-3 flex items-center justify-center space-x-2 h-full">
            {acceptingUser == row.id ? <span> Accepting </span> : <Button primary rounded onClick={() => handleAccept(row.id)}>Accept</Button>}
            {deletingUser == row.id ? <span className="text-red-200"> </span> :  
            <Button secondary rounded onClick={() => handleDelete(row.id)}>Refuse</Button> }
          </div>
        )
      },
    ],
    Teachers: [
      { label: "Photo", field: "photo", render: () => <img src="/default-user.png" alt="User" className="w-10 h-10 rounded-full mx-auto" /> },
      { label: "First Name", field: "firstName", render: (row) => row.first_name },
      { label: "Last Name", field: "lastName", render: (row) => row.last_name },
      { label: "Subject", field: "subject", render: (row) => row.subject },
      { label: "Phone number", field: "phone number", render: (row) => row.phone_number },
      { label: "Level", field: "level", render: (row) => row.level },
      { label: "Email", field: "email", render: (row) => row.email },
      {
        label: "Action",
        field: "actions",
        render: (row) => (
          <div className="p-3 flex items-center justify-center space-x-2 h-full">
            {acceptingUser == row.id ? <span> Accepting </span> : <Button primary rounded onClick={() => handleAccept(row.id)}>Accept</Button>}
            {deletingUser == row.id ? <span className="text-red-200"> deleting </span> :  
            <Button secondary rounded onClick={() => handleDelete(row.id)}>Refuse</Button> }
          </div>
        )
      },
    ],
    Parents: [
      { label: "Photo", field: "photo", render: () => <img src="/default-user.png" alt="User" className="w-10 h-10 rounded-full mx-auto" /> },
      { label: "First Name", field: "firstName", render: (row) => row.first_name },
      { label: "Last Name", field: "lastName", render: (row) => row.last_name },
      { label: "Phone number", field: "PhoneNumber", render: (row) => row.phone_number },
      { label: "Email", field: "email", render: (row) => row.email },
      {
        label: "Action",
        field: "actions",
        render: (row) => (
          <div className="p-3 flex items-center justify-center space-x-2 h-full">
            {acceptingUser == row.id ? <span> Accepting </span> : <Button primary rounded onClick={() => handleAccept(row.id)}>Accept</Button>}
        
            {deletingUser == row.id ? <span className="text-red-600"> </span> :  
            <Button secondary rounded onClick={() => handleDelete(row.id)}>Refuse</Button> }
          </div>
        )
      },
    ],
  };

  // Récupération des colonnes et des données
  const columns = columnsConfig[selectedCategory] || [];
  const rawData =
    selectedCategory === "Students" ? students :
      selectedCategory === "Teachers" ? teachers : parents;

  // Filtrage des données
  const filteredData = rawData.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const categories = ["Students", "Teachers", "Parents"];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };



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
          <h1 className="text-[#52BD94] font-bold text-[34px] ml-14">New Users</h1>

          {/* Section Administration */}
          <div className="flex items-center gap-x-2 mt-4 ">
            <div className="flex items-center gap-x-[-20]">
             {/*} <img src={ParametreIcon} alt="Paramètre" style={{ width: "10px", height: "10px" }} />
              <img src={NotificationIcon} alt="Notification" style={{ width: "10px", height: "10px" }} />*/}
            </div>
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


        {/* Menu de sélection */}
        <div className="relative mt-4 inline-block -mt-6 ml-8 mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex ml-8 items-center gap-2 text-[24px] font-poppins font-medium leading-none"
          >
            {selectedCategory}
            <img
              src={ArrowIcon}
              alt="ArrowIcon"
              className={`w-2 h-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute mt-2 bg-white shadow-lg rounded-lg w-40">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500">{error}</p>}


        {/* Loading State */}
        {loading ? (
          <p className="text-gray-500">Loading Users...</p>
        ) : (
          <TableComponent columns={columns} data={filteredData} />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
