// src/Notes.jsx
import { useState, useEffect } from 'react'
import './App.css'
import { useNavigate, useLocation } from 'react-router-dom'
function Notes() {
  const [notes, setNotes] = useState([])
  const [activeForm, setActiveForm] = useState('create')
  const [formData, setFormData] = useState({ id: '', note: '' })
  const location = useLocation()
  const role = location.state?.role;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch('http://localhost:4000/api/v1/note/read',  {
  method: 'GET',
  credentials: 'include',  
})
      const data = await res.json()
      console.log("Fetched notes:", data)
      if (data.success) setNotes(data.notes)
    }
    fetchNotes()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:4000/api/v1/note/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ note: formData.note }),
    })
    const data = await res.json()
    if (data.success) {
      const updated = await fetch('http://localhost:4000/api/v1/note/read',  {
  method: 'GET',
  credentials: 'include',   
})
      const updatedData = await updated.json()
      setNotes(updatedData.notes)
      setFormData({ id: '', note: '' })
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const res = await fetch(`http://localhost:4000/api/v1/note/update/${formData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ update_note: formData.note }),
    })
    const data = await res.json()
    if (data.success) {
      const updated = await fetch('http://localhost:4000/api/v1/note/read',  {
  method: 'GET',
  credentials: 'include',  
})
      const updatedData = await updated.json()
      setNotes(updatedData.notes)
      setFormData({ id: '', note: '' })
      setActiveForm('create')
    }
  }
  const logout=async()=>{
    const data = await fetch("http://localhost:4000/api/v1/user/logout", {
        method: "GET",
        credentials: "include",
  })
    let res = await data.json();
    if(res.success){
        alert("Logged out successfully")
        navigate("/")
    }
   
}
  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:4000/api/v1/note/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const data = await res.json()
    if (data.success) {
      setNotes(notes.filter(n => n._id !== id))
    }
  }

  return (
    <div
      id="center"
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '30px',
        width: '100%',
        marginTop: '20px',
      }}
    >
      {/* Notes list */}
      <div style={{ flex: 1, maxWidth: '400px', border: '1px solid var(--border)', padding: '20px', borderRadius: '8px' }}>
        <h3>All Notes</h3>
        {notes.map(note => (
          <div key={note._id} style={{ borderBottom: '1px solid var(--border)', padding: '10px 0' }}>
            <p><strong>ID:</strong> {note._id}</p>
            <p>{note.note}</p>
        {role === "admin" && ( <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <button className="counter" onClick={() => { setActiveForm('update'); setFormData({ id: note._id, note: note.note }) }}>Update</button>
              <button className="counter" onClick={() => handleDelete(note._id)}>Delete</button>
            </div>)}
          </div>
        ))}
      </div>

      {/* Form side */}
      {role==="admin" && (<div style={{ flex: 1, maxWidth: '400px', border: '1px solid var(--border)', padding: '20px', borderRadius: '8px' }}>
        {activeForm === 'create' ? (
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3>Create Note</h3>
            <input
              type="text"
              name="note"
              placeholder="Enter note content"
              value={formData.note}
              onChange={handleChange}
            />
            <button type="submit" className="counter">Save</button>
          </form>
        ) : (
          <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3>Update Note</h3>
            <input
              type="text"
              name="id"
              placeholder="Note ID"
              value={formData.id}
              readOnly
            />
            <input
              type="text"
              name="note"
              placeholder="Enter new content"
              value={formData.note}
              onChange={handleChange}
            />
            <button type="submit" className="counter">Update</button>
          </form>
        )}
        <div style={{ marginTop: '15px' }}>
          <button className="counter" onClick={() => { setActiveForm('create'); setFormData({ id: '', note: '' }) }}>
            Switch to Create
          </button>
        </div>
      </div>)}
      <button className='counter' onClick={logout}> Logout</button>
    </div>
  )

}

export default Notes