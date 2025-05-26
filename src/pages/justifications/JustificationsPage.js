import { Navigate } from "react-router-dom"

// This is a redirect component to handle the /justifications route
export default function JustificationsPage() {
  return <Navigate to="/justifications/pending" replace />
}
