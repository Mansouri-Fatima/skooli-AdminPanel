import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import { Bell, Settings } from 'lucide-react'
import { Link, useLocation } from "react-router-dom"

export default function JustificationsLayout() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="min-h-screen bg-[#e8f5f0]">
    <div className="w-[250px] h-screen fixed left-0 top-0 bg-white shadow-md">
<Sidebar />
</div>
    <div className="flex min-h-screen">
   

      {/* Main Content */}
      <div className="flex-1 ml-[250px] p-6">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <div>
            <h1 className="text-4xl font-semibold font-poppins text-[#52BD94]">Manage justifications</h1>

            {/* Tab Navigation */}
            <div className="flex gap-4 mt-5">
              <Link
                to="/justifications/pending"
                className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                  currentPath.includes("/pending")
                    ? "bg-[#52BD943D] hover:bg-[#E0F2F1] text-[#52BD94]"
                    : "bg-[#f0f0f0] text-gray-500 hover:bg-gray-200"
                }`}
              >
                Pending
              </Link>
              <Link
                to="/justifications/accepted"
                className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                  currentPath.includes("/accepted")
                    ? "bg-[#52BD943D] hover:bg-[#E0F2F1] text-[#52BD94]"
                    : "bg-[#f0f0f0] text-gray-500 hover:bg-gray-200"
                }`}
              >
                Accepted
              </Link>
              <Link
                to="/justifications/rejected"
                className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                  currentPath.includes("/rejected")
                    ? "bg-[#52BD943D] hover:bg-[#E0F2F1] text-[#52BD94]"
                    : "bg-[#f0f0f0] text-gray-500 hover:bg-gray-200"
                }`}
              >
                Rejected
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
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

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
    </div>
  )
}
