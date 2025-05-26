import { useState, useEffect } from "react"
import { Loader, AlertCircle } from 'lucide-react'
import Sidebar from "../../components/Sidebar"
import axios from "axios"

export default function PendingJustificationsPage() {
  // State for justifications data
  const [justifications, setJustifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [processingId, setProcessingId] = useState(null)
  const API_BASE_URL = "http://localhost:5001/api"

// Fetch pending justifications from backend
const fetchPendingJustifications = async () => {
  try {
    setLoading(true)
    setError(null)

    const response = await axios.get(`${API_BASE_URL}/attendance/justifications/pending`)
    console.log("Pending justifications response:", response.data)

    // Map backend data to match your table field names exactly
   const formattedJustifications = response.data.map((item) => ({
  id: item.id,
  studentName: `${item.first_name} ${item.last_name}`,
  grade: item.level, // This should now be "middle"
  group: item.study_year, // This should now be "4"
  absenceDate: item.date,
  document: item.document_url || "No document",
  status: "Pending",
  // Keep original fields too for other uses
  first_name: item.first_name,
  last_name: item.last_name,
  subject_name: item.subject_name,
  start_time: item.start_time,
  end_time: item.end_time,
  day: item.day,
  document_url: item.document_url,
}))

    setJustifications(formattedJustifications)
  } catch (err) {
    console.error("Error fetching pending justifications:", err)
    setError("Failed to load pending justifications")
  } finally {
    setLoading(false)
  }
}

// Generic function to handle justification review  
const handleReview = async (justificationId, decision) => {
  try {
    setProcessingId(justificationId)
    setError(null)

    const response = await axios.patch(`${API_BASE_URL}/attendance/justifications/review`, {
      justification_id: justificationId,
      decision: decision,
      admin_id: 1,
    })

    console.log(`Justification ${decision}:`, response.data)

    setJustifications((prev) => prev.filter((justification) => justification.id !== justificationId))

    alert(`Justification ${decision} successfully!`)
  } catch (err) {
    console.error(`Error ${decision} justification:`, err)
    setError(`Failed to ${decision} justification. Please try again.`)
  } finally {
    setProcessingId(null)
  }
}

// Handle accept justification
const handleAccept = async (justificationId) => {
  await handleReview(justificationId, "accepted")
}

// Handle reject justification
const handleReject = async (justificationId) => {
  await handleReview(justificationId, "rejected")
}

// Load data on component mount
useEffect(() => {
  fetchPendingJustifications()
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
  <thead className="bg-white h-[60px]">
    <tr className="font-semibold text-[#52BD94] text-left">
      <th className="px-6 py-5 text-sm">Photo</th>
      <th className="px-6 py-5 text-sm">Student Name</th>
      <th className="px-6 py-5 text-sm">Grade</th>
      <th className="px-6 py-5 text-sm ">Group</th>
      <th className="px-6 py-5 text-sm">Absence Date</th>
      <th className="px-6 py-5 text-sm text-center">Document</th>
      <th className="px-6 py-5 text-sm text-center">Status</th>
      <th className="px-6 py-5 text-sm text-center">Action</th>
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
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{justification.grade}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{justification.group}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{justification.absenceDate}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium text-center">
          <button className="flex items-center font-bold mx-auto">[View Doc]</button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <span className="px-4 py-1 rounded-full text-xs font-medium bg-[#FFF5E0] text-[#FCC068] border border-[#FCC068]">
            {justification.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleAccept(justification.id)}
              className="px-4 py-1 bg-[#52BD94] text-white rounded-md text-xs font-medium"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(justification.id)}
              className="px-4 py-1 bg-white text-[#52BD94] border border-[#52BD94] rounded-md text-xs font-medium"
            >
              Reject
            </button>
          </div>
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
