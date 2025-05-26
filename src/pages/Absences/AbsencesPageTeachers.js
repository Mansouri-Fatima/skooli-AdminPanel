

import { useState, useEffect } from "react"
import { Bell, Settings,  ChevronDown , Loader, AlertCircle } from "lucide-react"
import SearchBar from "../../components/SearchBar"
import Sidebar from "../../components/Sidebar" 
import { Link , useLocation } from "react-router-dom"
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function TeachersAbsencesPage() {
  // State for absences data
  const [absences, setAbsences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { teacherId } = useParams(); 

  // State for filtering and pagination
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const current = pathname.includes("teachers") ? "Teachers" : "Students";
  

  const API_BASE_URL = "http://localhost:5001/api";

  // fetch  data
  useEffect(() => {
    setLoading(true)
    setError(null)

    /*
    // Mock data for Teachers
    setTimeout(() => {
      setAbsences([
        {
          id: 1,
          firstName: "Amel",
          lastName: "Bensalah",
          subject: "Maths",
          absences: 3,
          totalDays: 40,
          average: "3%",
          email: "amel.bensalah@skooli.dz",
        },
        {
          id: 2,
          firstName: "Karim",
          lastName: "Boukhalfa",
          subject: "Arabic",
          absences: 4,
          totalDays: 40,
          average: "5%",
          email: "karim.boukhalfa@skooli.dz",
        },
        {
          id: 3,
          firstName: "Yasmine",
          lastName: "Khelifi",
          subject: "Science",
          absences: 2,
          totalDays: 40,
          average: "2%",
          email: "yasmine.khelifi@skooli.dz",
        },
        {
          id: 4,
          firstName: "Nassim",
          lastName: "Zerrouki",
          subject: "Science",
          absences: 5,
          totalDays: 40,
          average: "10%",
          email: "nassim.zerrouki@skooli.dz",
        },
        {
          id: 5,
          firstName: "Houda",
          lastName: "Mebarki",
          subject: "Arabic",
          absences: 1,
          totalDays: 40,
          average: "1%",
          email: "houda.mebarki@skooli.dz",
        },
        {
          id: 6,
          firstName: "Tarek",
          lastName: "Saidi",
          subject: "History",
          absences: 2,
          totalDays: 40,
          average: "2%",
          email: "tarek.saidi@skooli.dz",
        },
      ])
      setLoading(false)
    }, 100)   */

    // Uncomment for real API later ofc after examse :
    /*
    const fetchAbsences = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/absences/teachers`, {
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
// Fetch ALL teachers using existing route
    axios.get(`${API_BASE_URL}/attendance/absences/teacher/all`)
        .then(res => {
            console.log("All Teachers Response:", res.data)
            setAbsences(res.data) // This is already formatted for your table
        })
        .catch(err => {
            console.error("API Error:", err)
            setError("Failed to load teachers data")
        })
        .finally(() => {
            setLoading(false)
        })
}, [currentPage, itemsPerPage, searchQuery])

  // pagination handlers
  const handlePageChange = (page) => setCurrentPage(page)

  // Filter absences based on search query
  const filteredAbsences = absences.filter((absence) => {
    const fullName = `${absence.firstName} ${absence.lastName}`.toLowerCase()
    return fullName.includes(searchQuery.toLowerCase())
  })

  return (
    <div className="flex-1  bg-[#e8f5f0] min-h-screen">
    <div className="w-[250px] h-screen fixed left-0 top-0 bg-white shadow-md">
    <Sidebar />
  </div>

      {/* Main Content */}
      <div className="flex-1 ml-[250px] p-6">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <div>
            <h1 className="text-4xl font-semibold font-poppins text-[#52BD94]">Absences</h1>

               {/* Dropdown */}
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

          {!loading && !error && filteredAbsences.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white h-[60px]">
  <tr className="border-b text-left">
    <th className="px-6 py-5  text-center font-bold text-[#6DC6A2]  ">Photo</th>
    <th className="px-6 py-5  font-semibold text-[#6DC6A2]  ">First Name</th>
    <th className="px-6 py-5 font-bold text-[#6DC6A2]  ">Last Name</th>
    <th className="px-6 py-5 font-bold text-[#6DC6A2]  ">Subject</th>
    <th className="px-6 py-5 font-bold text-[#6DC6A2]   text-center">Absences</th>
    <th className="px-6 py-5 font-bold text-[#6DC6A2]   text-center">Total Days</th>
    <th className="px-6 py-5 font-bold text-[#6DC6A2]   text-center">Average</th>
  </tr>
</thead>
          

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAbsences.map((absence) => (
                <tr key={absence.id} className="h-[80px]">
                  {/* Photo */}
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
          
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-700 text-left">
                    {absence.firstName}
                  </td>
          
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-700 text-left">
                    {absence.lastName}
                  </td>
          
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-700 text-left">
                    {absence.subject}
                  </td>
          
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-center text-gray-700">
                    {absence.absences}
                  </td>
          
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-center text-gray-700">
                    {absence.totalDays}
                  </td>
          
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-center text-gray-700">
                    {absence.average}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          )}

          {!loading && !error && filteredAbsences.length === 0 && (
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
