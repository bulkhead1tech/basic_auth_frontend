import './App.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.")
      return
    }

    const result = await fetch("http://localhost:4000/api/v1/user/register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const data = await result.json()
    if(data.success){
      alert("Registration successful! Please login.")
      navigate("/");
    }
  }

  return (
    <div id="center">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
        <div>
          <label htmlFor="name">Name</label><br />
          <input type="text" onChange={handleChange} id="name" name="name" value={formData.name} placeholder="Enter your name" />
        </div>
        <div>
          <label htmlFor="email">Email</label><br />
          <input type="email" onChange={handleChange} id="email" name="email" value={formData.email} placeholder="Enter your email" />
        </div>
        <div>
          <label htmlFor="password">Password</label><br />
          <input type="password" onChange={handleChange} id="password" name="password" value={formData.password} placeholder="Enter your password" />
        </div>
        <div>
          <p>Role:</p>
          <label>
            <input type="radio" name="role" value="admin" onChange={handleChange} checked={formData.role === "admin"} /> Admin
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input type="radio" name="role" value="user" onChange={handleChange} checked={formData.role === "user"} /> User
          </label>
        </div>
        <div>
          <button type="submit" className="counter">Register</button>
        </div>
      </form>
      <Link to="/">Login</Link>
    </div>
  )
}

export default Register