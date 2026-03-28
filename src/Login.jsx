import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await fetch("http://localhost:4000/api/v1/user/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: "include",
    })

    const data = await result.json()
    console.log("Login response:", data)
     if (data.success) {
      navigate("/user", { state: { user: data.user } })
    } else {
      alert("Login failed")
    }

  }

  return (
    <div id="center">
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}
      >
        <div>
          <label htmlFor="email">Email</label><br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label><br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="counter">Login</button>
        </div>
        <Link to="/register">Register</Link>
      </form>
    </div>
  )
}

export default Login