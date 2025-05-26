

import  React, { useState, useEffect } from "react"
import { Bell, Settings, Loader, ChevronDown , AlertCircle } from "lucide-react"
import SearchBar from "../../components/SearchBar"
import Sidebar from "../../components/Sidebar"
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom"
import axios from "axios"

export default function StudentsAbsencesPage() {
  // State for absences data
  const [absences, setAbsences] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { studentId } = useParams()

  // State for filtering and pagination
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)


  // rename the variable so ESLint doesn’t think you're using the global
  const { pathname } = useLocation();

  // local state for opening/closing the menu
  const [isOpen, setIsOpen] = useState(false);

  // decide which view is active based on the URL
  const current = pathname.includes("teachers") ? "Teachers" : "Students";





const API_BASE_URL = "http://localhost:5001/api"

  // so later  fetch  data
  useEffect(() => {
    setLoading(true)
    setError(null)
 
    /*
    // the fetching ... for Students
    setTimeout(() => {
      setAbsences([
        {
          id: 1,
          firstName: "Belmksn",
          lastName: "Souhaib",
          email: "BelmksnSouhaib@skooli.dz ",
          level: "Middle School",
          grade: "4th",
          group: "2",
          status: "Unjustified",
        },
        {
          id: 2,
          firstName: "Bengbi",
          lastName: "Amin",
          email: "BengbiAmin@skooli.dz",
          level: "middle School",
          grade: "4th",
          group: "2",
          status: "Accepted",
        },
        {
          id: 3,
          firstName: "anes",
          lastName: "mellal",
          email: "mellalanes@skooli.dz",
          level: "middle School",
          grade: "4th",
          group: "2",
          status: "Unjustified",
        },
        {
          id: 4,
          firstName: "khouloud",
          lastName: "guessi",
          email: "khouloudguessi@skool.dz",
          level: "Middle School",
          grade: "4th",
          group: "1",
          status: "Unjustified",
        },
        {
          id: 5,
          firstName: "mansouri",
          lastName: "fatima",
          email: "mansourifatima@skooli.dz",
          level: "Middle School",
          grade: "4th",
          group: "1",
          status: "Pending",
        },
        {
          id: 6,
          firstName: "aimer",
          lastName: "rihem",
          email: "aimerrihem@skooli.dz",
          level: "middle School",
          grade: "4th",
          group: "1",
          status: "Unjustified",
        },
      ])
      setLoading(false)
    }, 100)
      */
    //  for real API later when i start the link :
    /*
    const fetchAbsences = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/absences/students`, {
          params: { 
            page: currentPage, 
            size: itemsPerPage, 
            search: searchQuery || undefined
          },
        });
        const { content, totalElements, totalPages } = res.data;
        setAbsences(content);
        setTotalItems(totalElements);
        setTotalPages(totalPages);
      } catch (err) {
        console.error(err);
        setError("Failed to load absences data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAbsences();
    */
   // Fetch ALL students using existing route
    axios.get(`${API_BASE_URL}/attendance/absences/student/all`)
      .then(res => {
        console.log("All Students Response:", res.data)
        setStudents(res.data)
      })
      .catch(err => {
        console.error("API Error:", err)
        setError("Failed to load students data")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage, itemsPerPage, searchQuery])
  

  // pagination handlers
  const handlePageChange = (page) => setCurrentPage(page)

  // badge helper
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "unjustified":
        return "bg-[#FFE0E6] text-[#FF4974] border border-[#FF4974]"
      case "justified":
        return "bg-[#E0F2F1] text-[#52BD94] border border-[#52BD94]"
      case "No absences":
        return " bg-[#FFF5E0] text-[#FCC068] border border-[#FCC068]"
      default:
        return "bg-transparent border border-gray-200 text-gray-600"
    }
  }

 // ✅ CORRECT: Change this line
const filteredStudents = students.filter((student) => {  // ← Use 'students' instead
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
    return fullName.includes(searchQuery.toLowerCase())
})

  return (
    <div className="flex-1   bg-[#e8f5f0] min-h-screen">
        <div className="w-[250px] h-screen fixed left-0 top-0 bg-white shadow-md">
        <Sidebar />
      </div>
      
      <div className="flex-1 ml-[250px] p-6">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div>
          <h1 className="text-4xl font-semibold font-poppins text-[#52BD94]">Absences</h1>

     {/* Dropdown  */}
<div className="relative inline-block mt-5">
<button
  onClick={() => setIsOpen(o => !o)}
  className="flex items-center font-poppins font-semibold text-[24px] text-gray-700"
>
  {current}
  <ChevronDown className="ml-2 h-5 w-5" />
</button>

  {isOpen && (
    <div className="absolute left-1 h-24 right-0 mt-2 w-44  bg-white border rounded-lg shadow-lg z-20">
      <Link
        to="/absences/students"
        onClick={() => setIsOpen(false)}
        className={`block px-4 py-2 font-poppins ${
          current === "Students"
            ? "text-[#52BD94] font-semobold font-poppins text-[15px]"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Students
      </Link>
      <Link
        to="/absences/teachers"
        onClick={() => setIsOpen(false)}
        className={`block px-4 py-2 font-poppins ${
          current === "Teachers"
            ? "text-[#52BD94] font-semobold font-poppins text-[15px]"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Teachers
      </Link>
    </div>
  )}
</div>

        </div>

        <div className="flex items-center gap-6">
          <div className="mb-6 mr-24">
            <SearchBar searchTerm={searchQuery} setSearchTerm={setSearchQuery} />
          </div>

          <div className="relative">
            <Bell className="h-6 w-6 text-gray-500" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#6DC6A2] rounded-full" />
          </div>
          <Settings className="h-6 w-6 text-gray-500" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">Administration</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <div className="w-12 h-12 bg-[#6DC6A2] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Table  */}
      <div className="bg-white mx-6 rounded-lg shadow-sm overflow-hidden">
        {loading && (
          <div className="flex justify-center items-center p-8">
            <Loader className="h-8 w-8 text-emerald-400 animate-spin" />
            <span className="ml-2 text-gray-600">Loading absences data...</span>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center p-8 text-red-500">
            <AlertCircle className="h-6 w-6 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && filteredStudents.length > 0 && (
          <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white h-[60px]">
            <tr className="border-b text-center">
              <th className="px-6 py-3 font-bold text-[#6DC6A2] ">Photo</th>
              <th className="px-6 py-3 font-bold text-[#6DC6A2]  ">First Name</th>
              <th className="px-6 py-3 font-bold text-[#6DC6A2]  ">Last Name</th>
              <th className="px-6 py-3 font-bold text-[#6DC6A2]  ">Email</th>
              <th className="px-6 py-3 font-bold text-[#6DC6A2]  ">Level</th>
              <th className="px-6 py-3 font-bold text-[#6DC6A2]  ">Grade</th>
              <th className="px-6 py-3 font-bold text-[#6DC6A2]  ">Group</th>
              <th className="px-6 py-3 font-bold text-[#6DC6A2]  ">Status</th>
            </tr>
          </thead>
        
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (  // ← Use 'student' instead of 'absence'
              <tr key={student.id} className="h-[80px]">
                {/* 1.  */}
                <td className="px-6 py-4 text-center whitespace-nowrap">
                    <img
                      src={`${process.env.PUBLIC_URL}/default-user.png`}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover mx-auto"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/40";
                      }}
                    />
                  </td>
        
                {/* 2.  */}
                <td className="px-6 py-4 whitespace-nowrap text-center font-poppins text-sm text-gray-700">
                  {student.firstName}
                </td>
        
                {/* 3.  */}
                <td className="px-6 py-4 whitespace-nowrap text-center font-poppins text-sm text-gray-700">
                  {student.lastName}
                </td>
        
                {/* 4.  */}
                <td className="px-6 py-4 whitespace-nowrap text-center font-poppins text-sm text-gray-700">
                  {student.email}
                </td>
        
                {/* 5. */}
                <td className="px-6 py-4 whitespace-nowrap text-center font-poppins text-sm text-gray-700">
                  {student.level}
                </td>
        
                {/* 6. */}
                <td className="px-6 py-4 whitespace-nowrap text-center font-poppins text-sm text-gray-700">
                  {student.studyYear}
                </td>
        
                {/* 7.  */}
                <td className="px-6 py-4 whitespace-nowrap text-center font-poppins text-sm text-gray-700">
                  {student.groupNumber}
                  
                </td>
        
                {/* 8.  */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        )}

        {!loading && !error && filteredStudents.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <AlertCircle className="h-12 w-12 mb-2 text-gray-400" />
            <p>No absences match your search.</p>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
