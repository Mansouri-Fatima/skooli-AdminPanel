

import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"
import axios from "axios"

export default function AcceptedJustificationsPage() {
  // State for justifications data
  const [justifications, setJustifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
const API_BASE_URL = "http://localhost:5001/api"
  
  // REPLACE your entire useEffect with this:
useEffect(() => {
  const fetchAcceptedJustifications = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${API_BASE_URL}/attendance/justifications/accepted`)
      console.log("Accepted justifications response:", response.data)

      // Map backend data to frontend format
      const formattedJustifications = response.data.map((item) => ({
        id: item.id,
        studentName: `${item.first_name} ${item.last_name}`,
        grade: item.level, // This should now be "middle"
        group: item.study_year, // This should now be "4"
        absenceDate: item.date,
        document: item.document_url || "No document",
        status: "Accepted",
        subjectName: item.subject_name,
        timeSlot: `${item.start_time} - ${item.end_time}`,
        day: item.day,
      }))

      setJustifications(formattedJustifications)
    } catch (err) {
      console.error("Error fetching accepted justifications:", err)
      setError("Failed to load accepted justifications")
    } finally {
      setLoading(false)
    }
  }

  fetchAcceptedJustifications()
}, [])

  return (
    <div className="min-h-screen bg-[#e8f5f0]">
            <div className="w-[250px] h-screen fixed left-0 top-0 bg-white shadow-md">
        <Sidebar />
      </div>
    <div className="mx-6 mb-6">
      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#52BD94]"></div>
            <span className="ml-2 text-gray-600">Loading justifications...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center p-8 text-red-500">
            <span>{error}</span>
          </div>
        ) : (
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr className="text-left font-semibold text-[#52BD94]">
                <th className="px-6 py-5 text-sm   ">Photo</th>
                <th className="px-6 py-5 text-sm ">Student Name</th>
                <th className="px-6 py-5 text-sm ">Grade</th>
                <th className="px-6 py-5 text-sm ">Group</th>
                <th className="px-6 py-5 text-sm ">Absence Date</th>
                <th className="px-6 py-5 text-sm ">Document</th>
                <th className="px-6 py-5 text-sm ">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {justifications.map((justification) => (
                <tr key={justification.id} className="h-[80px]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 bg-[#E0F2F1] rounded-full"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {justification.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {justification.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {justification.group}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {justification.absenceDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    <button className="flex font-bold items-center">[View Doc]</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-4 py-1 rounded-full text-xs font-medium bg-[#E0F2F1] text-[#52BD94] border border-[#52BD94]">
                      {justification.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        )}
      </div>
    </div>
    </div>
  )
}
