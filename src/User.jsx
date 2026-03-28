// src/Profile.jsx
import './App.css'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function User() {
  const location = useLocation()
  const user = location.state?.user
  const navigate = useNavigate();

  if (!user) {
    return (
      <div id="center">
        <h2>No Profile Found</h2>
        <p>Please login first.</p>
      </div>
    )
  }

  return (
    <div id="center">
      <h2>Profile</h2>
      <div style={{ border: '1px solid var(--border)', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <div>
        <button className="counter" onClick={() =>( navigate("/notes", {state: { role: user.role }}))}>Go to Notes</button>
      </div>
    </div>
  )
}

export default User